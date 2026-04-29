import type { ContextDatabase } from "../../features/magic-context/storage";
import type { Tagger } from "../../features/magic-context/tagger";
import { type ToolCallIndex, type ToolDropResult, ToolMutationBatch } from "./tool-drop-target";
export type MessageInfo = {
    id?: string;
    role?: string;
    sessionID?: string;
};
export interface ThinkingLikePart {
    type: string;
    thinking?: string;
    text?: string;
}
export type MessageLike = {
    info: MessageInfo;
    parts: unknown[];
};
export type TagTarget = {
    setContent: (content: string) => boolean;
    getContent?: () => string | null;
    drop?: () => ToolDropResult;
    truncate?: () => ToolDropResult;
    message?: MessageLike;
};
export interface TagMessagesResult {
    targets: Map<number, TagTarget>;
    reasoningByMessage: Map<MessageLike, ThinkingLikePart[]>;
    messageTagNumbers: Map<MessageLike, number>;
    toolCallIndex: ToolCallIndex;
    batch: ToolMutationBatch;
    hasRecentReduceCall: boolean;
    /** Whether recent assistant messages contain git commit hash patterns */
    hasRecentCommit: boolean;
}
export declare function tagMessages(sessionId: string, messages: MessageLike[], tagger: Tagger, db: ContextDatabase): TagMessagesResult;
//# sourceMappingURL=tag-messages.d.ts.map