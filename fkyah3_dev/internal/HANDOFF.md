# OpenCode Fork 交接文档

> 最后更新：2026-04-25
> 维护人：fkyah3 / Sisyphus

---

## 当前状态

- **默认分支**: `main`（稳定构建版本）
- **开发分支**: `fix/permission-reasoning-truncation`
- **当前活动分支**: `fix/cve-2026-22812-auth`
- **版本标识**: `local-fkyah3-V1.2`（TUI 右下角）
- **核心修复**: `packages/opencode/src/provider/transform.ts` — `normalizeMessages()`
- **运行方式**: `bun run --conditions=browser src/index.ts`（源码启动）

---

## 已修复问题

### 1. reasoning_content 丢失 — ✅ 已验证全覆盖

**位置**: `packages/opencode/src/provider/transform.ts` normalizeMessages()

**修复 commit**: `b5b6ad05d`

**机制**: 当模型配置了 `interleaved`（或 `capabilities.reasoning`，或消息中已有 reasoning parts）时，对所有 assistant 消息无条件注入 `reasoning_content` 字段（有原文保留原文，无原文注入空字符串 `""`）。

**辅助配置** (`opencode.json`):
```json
"deepseek-v4-flash": {
    "interleaved": { "field": "reasoning_content" },
    "options": { "thinking": { "type": "enabled" } }
}
```

**实证验证** (2026-04-25):
- 添加了 `[sisyphus-debug]` 诊断日志（commit `7f7e25635`）
- 正常会话 + 2-tab 多窗口实测均显示 `normalizeMessages()` 在每轮 API 调用前被触发
- 日志确认消息计数随对话正常递增（22→78 条消息，9→36 条 assistant）
- 无 `reasoning_content must be passed back` 报错

### 2. OpenRouter providerOptionsKey 映射错误 — ✅ 已修复

**位置**: `packages/opencode/src/provider/transform.ts` providerOptionsKey()

**修复 commit**: `b4f7284b6`

**问题**: `@openrouter/ai-sdk-provider` 包装了 `@ai-sdk/openai-compatible`，但 `sdkKey()` 映射返回了 `"openrouter"` 而非 `"openaiCompatible"`。后者是底层 SDK 硬编码读取的 key。

**修复**: 在 `providerOptionsKey()` 中同时识别 `@openrouter/ai-sdk-provider`，返回 `"openaiCompatible"`。

### 3. 多窗口崩溃预测护 — ✅ 已加固

**分析文档**: `fkyah3_dev/issues/001-reasoning_content-thinking-mode.md`

**现象**: 同时打开 3+ TUI 窗口，短时间进程 OOM 崩溃，终端残留 raw mode 乱码。

**根因**: 崩澜源头不在 normalizeMessages()（已证实全覆盖），而是 OMO `tool-pair-validator` 在 `reasoning_content` 丢失后进入修复死循环，叠加多窗口并发写入 DB 导致 SQLITE_BUSY → 消息状态不一致 → 内存爆炸。

**OMO 熔断** (commit `f556f9a2`): 同 session 修复超过 5 次自动断，日志记录 "Circuit breaker tripped"。

### 4. 日志系统改进 — ✅ 已完成

**位置**: `packages/opencode/src/util/log.ts` + `index.ts`

**改变** (commit `7f7e25635`):
- dev.log → `dev-{ISO时间戳}.log`（每次重启独立文件，互不覆盖）
- 启动时写 `=== SESSION START ===` 标记
- 每轮 API 调用写 `[sisyphus-debug] normalizeMessages #N: ...`（含累计调用编号）

---

## 上游贡献

| PR | 状态 | 说明 |
|----|------|------|
| #24218 | OPEN | 1-line fix: provider.ts → `interleaved` for reasoning models |
| #24150 | CLOSED | 完整 normalizeMessages 修复（被 #24218 替代） |

---

## 已删除的过期文档

以下文件已删除（`git rm`），因为它们描述的是旧版状态或已完成任务：
- `internal/HANDOFF_FIX_REASONING_CONTENT.md` — Kimi K2.6 修复文档，已超驰（由 root cause 分析替代）
- `internal/INVESTIGATION_STATUS.md` — Win32 $env 注入调查，已关闭
- `internal/STATUS_AND_GOALS.md` — 4月22日旧状态，已超驰
- `analysis/sisyphus-system-prompt-structure.md` — 中文提示词分析，已完成
- `做了什么/*.md` — 与 ACHIEVEMENTS.md 重复

---

## 当前文件结构

```
fkyah3_dev/
├── README.md               # Fork 总览（修复清单、索引）
├── ACHIEVEMENTS.md         # 贡献成就记录
├── analysis/
│   ├── README.md           # 技术分析索引
│   ├── reasoning_content-loss-root-cause-analysis.md  # reasoning_content 根因分析
│   ├── thinking-mode-reasoning_content-loss-issue.md  # 初次排查日志
│   └── subagent-permission-inheritance.md             # 子 agent 权限分析
├── issues/
│   ├── README.md           # Issue 跟踪索引
│   ├── 001-reasoning_content-thinking-mode.md         # reasoning_content issue
│   └── 002-chinese-system-prompt.md                    # 中文提示词 issue
├── workflows/
│   └── ocwatch-monitor.md   # OpenCode 监控仪表盘
└── internal/
    ├── HANDOFF.md           # 本文件 — 当前交接状态
    ├── DEV_STARTUP.md       # 开发环境启动指南
    └── OMO_OpenCode_MagicContext_操作指南.md  # 操作手册
```

---

## 关键命令

```bash
# 启动 OpenCode（源码版）
bun run --conditions=browser src/index.ts

# 构建 OMO
cd E:\fkyah3\Agent\deepseek\oh-my-openagent && bun run build

# 查看日志
ls C:\Users\13248\.local\share\opencode\log\dev-*.log

# 查看 DB schema
bun run C:\Users\13248\.local\share\opencode\check_schema.ts
```

---

## 关键路径

| 路径 | 说明 |
|------|------|
| `packages/opencode/src/provider/transform.ts` | normalizeMessages + providerOptionsKey |
| `packages/opencode/src/session/llm.ts` | AI SDK middleware（调用 normalizeMessages 的入口） |
| `packages/opencode/src/util/log.ts` | 日志文件路径和 init |
| `packages/opencode/src/index.ts` | SESSION START 标记 |
| `oh-my-openagent/src/hooks/tool-pair-validator/hook.ts` | 修复循环熔断 |
| `C:\Users\13248\.config\opencode\opencode.json` | 主配置（provider、permission） |
| `C:\Users\13248\.config\opencode\oh-my-openagent.json` | OMO 配置 |
| `C:\Users\13248\.config\opencode\magic-context.jsonc` | Magic Context 配置 |

