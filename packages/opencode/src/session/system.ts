import { Context, Effect, Layer } from "effect"

import { Instance } from "../project/instance"

import PROMPT_ANTHROPIC from "./prompt/anthropic.txt"
import PROMPT_DEFAULT from "./prompt/default.txt"
import PROMPT_BEAST from "./prompt/beast.txt"
import PROMPT_GEMINI from "./prompt/gemini.txt"
import PROMPT_GPT from "./prompt/gpt.txt"
import PROMPT_KIMI from "./prompt/kimi.txt"

import PROMPT_CODEX from "./prompt/codex.txt"
import PROMPT_TRINITY from "./prompt/trinity.txt"
import type { Provider } from "@/provider"
import type { Agent } from "@/agent/agent"
import { Permission } from "@/permission"
import { Skill } from "@/skill"

export function provider(model: Provider.Model) {
  if (model.api.id.includes("gpt-4") || model.api.id.includes("o1") || model.api.id.includes("o3"))
    return [PROMPT_BEAST]
  if (model.api.id.includes("gpt")) {
    if (model.api.id.includes("codex")) {
      return [PROMPT_CODEX]
    }
    return [PROMPT_GPT]
  }
  if (model.api.id.includes("gemini-")) return [PROMPT_GEMINI]
  if (model.api.id.includes("claude")) return [PROMPT_ANTHROPIC]
  if (model.api.id.toLowerCase().includes("trinity")) return [PROMPT_TRINITY]
  if (model.api.id.toLowerCase().includes("kimi")) return [PROMPT_KIMI]
  return [PROMPT_DEFAULT]
}

export interface Interface {
  readonly environment: (model: Provider.Model) => string[]
  readonly skills: (agent: Agent.Info) => Effect.Effect<string | undefined>
}

export class Service extends Context.Service<Service, Interface>()("@opencode/SystemPrompt") {}

export const layer = Layer.effect(
  Service,
  Effect.gen(function* () {
    const skill = yield* Skill.Service

    return Service.of({
      environment(model) {
        const project = Instance.project
        return [
          [
            `你当前使用的模型是 ${model.api.id}。完整模型 ID 为 ${model.providerID}/${model.api.id}`,
            `以下是运行环境的参考信息：`,
            `<env>`,
            `  语言: 中文（所有内部推理必须使用中文，技术术语和代码保持原样）`,
            `  工作目录: ${Instance.directory}`,
            `  工作区根目录: ${Instance.worktree}`,
            `  是否为 git 仓库: ${project.vcs === "git" ? "是" : "否"}`,
            `  平台: ${process.platform}`,
            `  当前时间: ${new Date().toLocaleString("zh-CN", { timeZone: "Asia/Shanghai", hour12: false })} (Asia/Shanghai UTC+8)`,
            `  版本: opencode-fkyah3 (官方渠道: github.com/fkyah3/opencode-fkyah3)`,
            `</env>`,
          ].join("\n"),
        ]
      },

      skills: Effect.fn("SystemPrompt.skills")(function* (agent: Agent.Info) {
        if (Permission.disabled(["skill"], agent.permission).has("skill")) return

        const list = yield* skill.available(agent)

        return [
          "技能提供针对特定任务的专用指令和工作流程。",
          "当任务匹配某个技能描述时，使用 skill 工具加载该技能。",
          Skill.fmt(list, { verbose: true }),
        ].join("\n")
      }),
    })
  }),
)

export const defaultLayer = layer.pipe(Layer.provide(Skill.defaultLayer))

export * as SystemPrompt from "./system"
