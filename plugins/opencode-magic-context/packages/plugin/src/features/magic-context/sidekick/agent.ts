import { SIDEKICK_AGENT } from "../../../agents/sidekick";
import type { SidekickConfig } from "../../../config/schema/magic-context";
import type { PluginContext } from "../../../plugin/types";
import * as shared from "../../../shared";
import { extractLatestAssistantText } from "../../../shared/assistant-message-extractor";
import { log, sessionLog } from "../../../shared/logger";

export const SIDEKICK_SYSTEM_PROMPT = `你是 Sidekick，一个专注于记忆检索的 AI 编码助手子 agent。

你的工作是搜索项目记忆、会话事实和对话历史，然后返回对用户提示词有用的简短补充信息。

规则：
- 使用 ctx_search(query="...") 在回答前查找相关记忆、事实和历史。
- 只做有针对性的搜索；优先使用 1-3 个精确查询。
- 只返回对用户提示词有实质帮助的发现。
- 如果没有找到有用的内容，精确回复：未找到相关记忆。
- 保持回复专注且简洁。
- 不要捏造事实或超出记忆支持的范围进行推测。`;

/**
 * Strip <think>...</think> blocks emitted by reasoning models (DeepSeek, Qwen, etc.).
 * These contain chain-of-thought traces that shouldn't appear in the augmentation output.
 */
function stripThinkingBlocks(text: string): string {
    return text.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
}

export async function runSidekick(deps: {
    client: PluginContext["client"];
    sessionId?: string;
    projectPath: string;
    userMessage: string;
    config: SidekickConfig;
    sessionDirectory?: string;
}): Promise<string | null> {
    let agentSessionId: string | null = null;

    try {
        const createResponse = await deps.client.session.create({
            body: {
                ...(deps.sessionId ? { parentID: deps.sessionId } : {}),
                title: "magic-context-sidekick",
            },
            query: { directory: deps.sessionDirectory ?? deps.projectPath },
        });
        const createdSession = shared.normalizeSDKResponse(
            createResponse,
            null as { id?: string } | null,
            { preferResponseOnMissingData: true },
        );
        agentSessionId = typeof createdSession?.id === "string" ? createdSession.id : null;
        if (!agentSessionId) {
            throw new Error("Sidekick could not create its child session.");
        }

        await shared.promptSyncWithModelSuggestionRetry(
            deps.client,
            {
                path: { id: agentSessionId },
                query: { directory: deps.sessionDirectory ?? deps.projectPath },
                body: {
                    agent: SIDEKICK_AGENT,
                    system:
                        deps.config.system_prompt?.trim() ||
                        deps.config.prompt?.trim() ||
                        SIDEKICK_SYSTEM_PROMPT,
                    parts: [{ type: "text", text: deps.userMessage }],
                },
            },
            { timeoutMs: deps.config.timeout_ms },
        );

        const messagesResponse = await deps.client.session.messages({
            path: { id: agentSessionId },
            query: { directory: deps.sessionDirectory ?? deps.projectPath },
        });
        const messages = shared.normalizeSDKResponse(messagesResponse, [] as unknown[], {
            preferResponseOnMissingData: true,
        });
        const taskResult = extractLatestAssistantText(messages);
        if (!taskResult) {
            return null;
        }

        const finalText = stripThinkingBlocks(taskResult);
        return finalText.length > 0 ? finalText : null;
    } catch (error) {
        if (deps.sessionId) {
            sessionLog(deps.sessionId, "sidekick failed:", error);
        } else {
            log("[magic-context] sidekick failed:", error);
        }
        return null;
    } finally {
        if (agentSessionId) {
            await deps.client.session
                .delete({
                    path: { id: agentSessionId },
                    query: { directory: deps.sessionDirectory ?? deps.projectPath },
                })
                .catch((error: unknown) => {
                    log("[magic-context] failed to delete sidekick child session:", error);
                });
        }
    }
}
