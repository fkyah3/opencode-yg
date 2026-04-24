# OpenCode Kimi K2.6 reasoning_content 修复 - 现状与目标

## 当前状态 (2026-04-22)

### 问题现象
- **错误信息**: `thinking is enabled but reasoning_content is missing in assistant tool call message at index 111+`
- **触发时机**: 长对话历史回放阶段（index 111+），即时生成的新消息正常
- **影响**: 对话进行到一定长度后崩溃，无法继续工作

### 已尝试的修复（3次提交）

#### Commit 1: 560a1bb81
**文件**: `packages/opencode/src/provider/transform.ts`
**改动**: 将 `providerOptionsKey()` 中 `@ai-sdk/openai-compatible` 的返回值从 `"openaiCompatible"` 改为 `model.providerID`
```diff
- return "openaiCompatible"
+ return model.providerID
```
**结果**: 未解决问题

#### Commit 2: b44a2fcf6
**文件**: `packages/opencode/src/provider/transform.ts`
**改动**: 在 `normalizeMessages()` 中，为所有 assistant 消息（不仅仅是 last user 之后的）添加空的 reasoning_content
**结果**: 未解决问题

#### Commit 3: fc284c02a (当前状态)
**文件**: `packages/opencode/src/provider/transform.ts`
**改动**: 将 `providerOptionsKey()` 改回 `"openaiCompatible"`，与原始代码一致
```diff
- return model.providerID
+ return "openaiCompatible"
```
**结果**: 问题依旧，错误从 index 190+ 变为 index 111+

### 关键发现
1. **transform.ts 第 49-51 行注释**明确指出：
   > "@ai-sdk/openai-compatible's getOpenAIMetadata() hardcodes 'openaiCompatible' as the providerOptions key"
   
   这说明 OpenCode 团队已经知道这个硬编码问题，并强制使用 `"openaiCompatible"`

2. **错误发生在历史消息回放时**，而非即时生成阶段
3. **当前代码与原始代码在 `providerOptionsKey()` 上已完全一致**，说明问题根因不在这里

## 问题根因推测

### 推测 1: 历史消息序列化/反序列化丢失 reasoning parts
- 消息存储到 `opencode.db` 时，reasoning parts 可能未被正确保存
- 或从数据库加载时，reasoning parts 未被正确还原

### 推测 2: @ai-sdk/openai-compatible 包版本不匹配
- `node_modules/@ai-sdk/openai-compatible` 的行为可能与代码期望的不一致
- 可能需要升级或降级该包

### 推测 3: 消息合并/转换过程中丢失
- `normalizeMessages()` 中的某些转换逻辑可能意外移除 reasoning parts
- 特别是 ` Anthropic rejects messages` 相关的过滤逻辑

## 目标

### 短期目标
1. **添加日志/断点机制**，在触发错误时捕获消息结构
2. **对比原始代码和当前代码的全部差异**，确认是否有遗漏的修改
3. **定位真正的根因**（消息存储、加载、转换哪个环节丢失 reasoning）

### 中期目标
1. 实施正确的修复
2. 验证修复有效
3. 整理 commit 历史，准备 PR

### 长期目标
1. 提交 PR 到 anomalyco/opencode 上游
2. 确保修复不破坏其他 provider

## 下一步行动计划

### 方案 A: 日志调试法（推荐）
1. 在 `transform.ts` 的 `normalizeMessages()` 中添加日志，输出消息结构
2. 在错误触发时检查日志，确认 reasoning parts 在哪个阶段丢失
3. 根据日志定位根因

### 方案 B: 数据库检查法
1. 使用 SQLite 工具直接查看 `opencode.db` 中的消息存储格式
2. 确认 reasoning parts 是否被保存到数据库

### 方案 C: 版本对比法
1. 与原始代码（main 分支）做完整 diff
2. 确认除了已知的 3 次提交外，是否有其他文件被修改

## 关键文件路径

- **修改文件**: `E:\fkyah3\Agent\KIMI2.6\openode-fkyah3\opencode-fkyah3\packages\opencode\src\provider\transform.ts`
- **数据库**: `C:\Users\13248\.local\share\opencode\opencode.db`
- **数据库备份**: `E:\fkyah3\oepncode_db_backup\opencode\`
- **配置**: `C:\Users\13248\.config\opencode\opencode.json`

## 启动命令

```bash
opencodedev
```

## 备注

- 当前使用的是修复版本（fork），与预编译版本共享同一个数据库
- 错误在 index 111 触发（比之前的 190+ 提前），可能说明改动有细微影响
- 需要实证而非推测，建议优先添加日志

---

**文档创建**: 2026-04-22
**状态**: 进行中 - 需要定位真正根因
