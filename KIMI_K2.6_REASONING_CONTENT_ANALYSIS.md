# OpenCode v1.14.19 Kimi K2.6 reasoning_content 缺失问题分析

## 问题概述

**问题描述**: 在使用 OpenCode v1.14.19 时，当使用 `moonshotai-cn` provider 的 Kimi K2.6 模型时，出现错误：
```
thinking is enabled but reasoning_content is missing in assistant tool call message at index 161
```

**触发条件**: 
- 长对话（消息索引 190+）
- 消息回放（message replay）阶段
- 使用 `moonshotai-cn` provider 的 `kimi-k2.6` 模型

## 问题根因分析

### 1. Kimi K2.6 的 API 响应格式
Kimi K2.6 通过 OpenAI-compatible API 返回 `reasoning_content` 字段，而不是标准的 `type: "reasoning"` message part。

### 2. OpenCode 的消息处理流程
OpenCode 期望标准的 `type: "reasoning"` message part，但 Kimi 返回的是 `reasoning_content` 字段。

### 3. 配置已添加但未完全解决问题
在 `C:\Users\13248\.config\opencode\opencode.json` 中已正确配置：
```json
{
  "moonshotai-cn": {
    "models": {
      "kimi-k2.5": {
        "reasoning": true,
        "interleaved": { "field": "reasoning_content" }
      },
      "kimi-k2.6": {
        "reasoning": true,
        "interleaved": { "field": "reasoning_content" }
      }
    }
  }
}
```

### 4. 核心问题：消息回放时的数据剥离
**GitHub Issue #19081** 描述了此问题：`reasoning_content` 在 message replay 时被静默剥离。

`interleaved` 配置解决了即时解析问题，但无法阻止历史消息中的 `reasoning_content` 在回放时被剥离。

## 代码分析

### 关键文件位置

#### 1. 模型配置定义
- `packages/opencode/src/provider/models.ts` (第 54-63 行)
  ```typescript
  interleaved: z
    .union([
      z.literal(true),
      z
        .object({
          field: z.enum(["reasoning_content", "reasoning_details"]),
        })
        .strict(),
    ])
    .optional(),
  ```

#### 2. 消息转换逻辑
- `packages/opencode/src/provider/transform.ts` (第 183-193 行)
  ```typescript
  // Include reasoning_content | reasoning_details directly on the message for all assistant messages
  if (reasoningText) {
    return {
      ...msg,
      content: filteredContent,
      providerOptions: {
        ...msg.providerOptions,
        reasoning_content: reasoningText,
      },
    };
  }
  ```

#### 3. Provider 特定处理
- `packages/opencode/src/provider/transform.ts` (第 872-881 行)
  ```typescript
  // Enable thinking for reasoning models on alibaba-cn (DashScope).
  // DashScope's OpenAI-compatible API requires `enable_thinking: true` in the request body
  // to return reasoning_content. Without it, models like kimi-k2.5, qwen-plus, qwen3, qwq,
  // deepseek-r1, etc. never output thinking/reasoning tokens.
  // Note: kimi-k2-thinking is excluded as it returns reasoning_content by default.
  ```

#### 4. 消息回放逻辑
- `packages/opencode/src/session/message-v2.ts` - `toModelMessages()` 函数
- `packages/opencode/src/session/session.ts` - 消息存储和检索逻辑

### 消息生命周期流程

```
1. API 响应解析
   Kimi K2.6 → reasoning_content 字段 → OpenCode 解析

2. 消息存储
   session.updateMessage() → SQLite 数据库存储

3. 消息回放
   MessageV2.page() → hydrate() → toModelMessages()

4. 问题发生点
   reasoning_content 在回放时被剥离 → 错误触发
```

## 相关 GitHub Issues/PRs

### 已确认 Issues
- **#19081**: reasoning_content 在 message replay 时被剥离（核心问题）

### 相关 PRs（未合并）
1. **PR #19480**: `preserveInterruptedResponse` 选项
   - 状态: Open
   - 不直接解决此问题

2. **PR #14637**: 支持 Anthropic SDK 的 interleaved reasoning
   - 状态: Open
   - 提供 workaround

3. **PR #14641**: 更完整的 Anthropic SDK 修复
   - 状态: Draft
   - 更完整的修复方案

4. **PR #16981**: 处理非 Anthropic provider 的 system messages
   - 状态: Open
   - 包含 `reasoning_content` 支持

## 修复方案

### 方案 A：修改消息序列化/反序列化逻辑（推荐）

**目标**: 确保 `reasoning_content` 在消息回放时不被剥离

**修改文件**:
1. `packages/opencode/src/session/message-v2.ts`
   - 修改 `toModelMessages()` 函数
   - 确保 `reasoning_content` 从存储的消息中正确提取并添加到回放消息中

2. `packages/opencode/src/session/session.ts`
   - 修改消息存储逻辑
   - 确保 `reasoning_content` 与 `reasoning` parts 一起存储

**具体修改**:
```typescript
// 在 toModelMessages() 函数中添加
if (part.type === "reasoning" && model.interleaved?.field === "reasoning_content") {
  // 将 reasoning part 转换为 reasoning_content 字段
  result.providerOptions = {
    ...result.providerOptions,
    reasoning_content: part.text,
  };
}
```

### 方案 B：增强 interleaved 配置支持

**目标**: 扩展 interleaved 配置以处理回放场景

**修改文件**:
1. `packages/opencode/src/provider/transform.ts`
   - 增强 `normalizeMessages()` 函数
   - 在消息回放时重新应用 interleaved 转换

2. `packages/opencode/src/config/provider.ts`
   - 扩展 interleaved 配置选项
   - 添加 `preserve_in_replay` 标志

### 方案 C：消息回放时的特殊处理

**目标**: 在消息回放时检测并修复 reasoning_content 缺失

**修改文件**:
1. `packages/opencode/src/session/compaction.ts`
   - 修改 `filterCompacted()` 函数
   - 确保 reasoning_content 不被过滤

2. `packages/opencode/src/session/processor.ts`
   - 在消息处理流水线中插入 reasoning_content 恢复逻辑

## 测试验证方案

### 1. 创建测试用例
```typescript
// 测试 reasoning_content 在回放时的保留
test("reasoning_content preserved in message replay", async () => {
  // 模拟 Kimi K2.6 响应
  const response = {
    choices: [{
      message: {
        role: "assistant",
        content: "思考过程",
        reasoning_content: "详细的推理内容",
      },
    }],
  };
  
  // 验证存储
  const stored = await session.updateMessage(...);
  
  // 验证回放
  const replayed = await MessageV2.toModelMessages(stored);
  
  // 断言 reasoning_content 存在
  expect(replayed.providerOptions?.reasoning_content).toBeDefined();
});
```

### 2. 集成测试
- 模拟长对话场景（200+ 消息）
- 验证 reasoning_content 在索引 190+ 时仍然存在
- 测试跨 provider 兼容性

### 3. 性能测试
- 验证修复不影响消息回放性能
- 测试内存使用情况

## 编译和部署步骤

### 1. 环境准备
```bash
cd E:\fkyah3\Agent\KIMI2.6\openode-fkyah3\opencode-fkyah3
bun install
```

### 2. 应用修复
```bash
# 应用方案 A 的修改
git apply reasoning-content-fix.patch

# 或手动修改文件
```

### 3. 编译测试
```bash
bun run typecheck
bun test packages/opencode/test/session/message-v2.test.ts
```

### 4. 构建
```bash
# 构建 TUI 版本
bun run build:tui

# 或构建完整版本
bun run build
```

### 5. 安装测试
```bash
# 备份原版本
mv ~/.local/bin/opencode ~/.local/bin/opencode.backup

# 安装新版本
cp dist/opencode ~/.local/bin/opencode
```

## 风险与缓解措施

### 风险 1：破坏现有功能
- **缓解**: 充分测试，确保标准 `type: "reasoning"` 消息仍然正常工作
- **缓解**: 添加功能开关，可回退到旧行为

### 风险 2：性能影响
- **缓解**: 优化代码，避免不必要的序列化/反序列化
- **缓解**: 添加缓存机制

### 风险 3：跨 provider 兼容性
- **缓解**: 为每个 provider 单独测试
- **缓解**: 添加 provider-specific 的回退逻辑

## 时间估算

### 阶段 1：代码分析和方案设计（已完成）
- 时间: 2-3 小时
- 状态: ✅ 完成

### 阶段 2：代码修改和单元测试
- 时间: 4-6 小时
- 任务:
  - 修改核心文件
  - 编写单元测试
  - 本地验证

### 阶段 3：集成测试和性能测试
- 时间: 2-3 小时
- 任务:
  - 集成测试
  - 性能基准测试
  - 跨 provider 测试

### 阶段 4：构建和部署
- 时间: 1-2 小时
- 任务:
  - 构建验证
  - 安装测试
  - 用户验收测试

**总时间**: 9-14 小时

## 结论

Kimi K2.6 的 `reasoning_content` 缺失问题根源于 OpenCode 消息回放逻辑与 Kimi API 响应格式的不兼容。`interleaved` 配置解决了即时解析问题，但无法阻止历史消息中的 `reasoning_content` 在回放时被剥离。

**推荐修复方案**: 方案 A（修改消息序列化/反序列化逻辑），直接解决核心问题，影响范围可控，测试验证相对简单。

修复后，Kimi K2.6 在长对话中将不再出现 `reasoning_content is missing` 错误，同时保持与其他模型和 provider 的兼容性。

---

*文档版本: 1.0*
*创建时间: 2026-04-22*
*最后更新: 2026-04-22*