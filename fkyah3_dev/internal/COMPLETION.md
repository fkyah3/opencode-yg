# 状态与完成清单

最后更新：2026-04-26 01:45（北京时间）

## 本日完成

### 配置层
- [x] `reasoningEffort: max` — opencode.json 显式设置，与 V4 Think Max 对齐
- [x] Pro/Flash split — Sisyphus + Oracle 走 Pro，其余 Flash（折扣到 2026/05/05）
- [x] `limit.context` 500K → 800K — 对齐 V4 1M 上下文能力
- [x] `execute_threshold_percentage` 70 → 85 — 推迟 MC 压缩触发
- [x] `DEFAULT_COMPRESSOR_GRACE_COMPARTMENTS` 10 → 15 — 对齐 V4 CSA sliding window
- [x] `HISTORIAN_CHUNK_MAX` 50K → 80K — 对齐 800K 上下文

### 代码修复
- [x] MC tool truncation — `[truncated]` → `[tool: N lines, MKB | preview]`
- [x] OMO tool-pair-validator 熔断 — 同一 session 修复 > 5 次自动停
- [x] normalizeMessages 诊断日志 — `[sisyphus-debug] normalizeMessages #N`
- [x] dev.log session 标记 — 每 session 独立日志文件
- [x] 中文 prompt 汉化 — Sisyphus + keyword-detector + system.ts + prompt.ts
- [x] OMO providerOptionsKey OpenRouter 修复

### 调研与文档
- [x] DeepSeek V4 架构研究 → 工作流优化建议
- [x] MC 压缩与 V4 CSA 分层对标文档
- [x] Historian thinking mode 设计决策文档
- [x] Startup race condition 记录
- [x] SETUP.md 零基础指南
- [x] 三仓库 README 更新（中文 + 英文 + AI 署名）

### 上游沟通
- [x] PR #24218 — provider.ts interleaved 默认值修复（pending review）
- [x] Issue #24104 回复 — reasoning_content 社区讨论

## 当前状态

| 组件 | 分支 | 构建 |
|------|------|------|
| opencode-fkyah3 | `main` | ✅ `bun run` 源码 |
| OMO | `dev` | ✅ 已构建 |
| MC | `master` | ✅ 已构建 |

## 重启后生效

所有 config 修改 + OMO/MC 重建需要重启 OpenCode。当前 session 不生效。

## 待办

- [ ] Bash 英文标签修复
- [ ] DeepSeek 反馈邮件
- [ ] MC tool truncation 验证（等自然触发压缩）
