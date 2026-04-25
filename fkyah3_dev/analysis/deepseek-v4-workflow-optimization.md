# DeepSeek V4 架构研究 → 工作流优化

状态：✅ 完成 · 2026-04-25

来源：DeepSeek_V4.pdf（官方技术报告）→ 豆包 Research 模式提取 → Sisyphus 审读

## 核心架构创新

| 技术 | 作用 | 与工作流的关系 |
|------|------|--------------|
| **CSA** (Compressed Sparse Attention) | m=4 压缩 KV → Lightning Indexer top-k 稀疏选择 → MQA | 与 MC historian "压缩+选择" 策略理念一致 |
| **HCA** (Heavily Compressed Attention) | m'=128 重度压缩 + 密集注意力 | 对应 MC 的 deep compression 层 |
| **mHC** (Manifold-Constrained Hyper-Connections) | 约束残差矩阵到 doubly stochastic 流形 | 训练稳定性，不直接影响工作流 |
| **Muon Optimizer** | 替代 AdamW，万亿参数级更快收敛 | 不影响推理 |
| **Interleaved Thinking** | **工具调用场景下保留全部 reasoning 历史** | **与我们 normalizeMessages() 修复对齐** |

## 关键数字

| 指标 | V4-Flash | V4-Pro | V3.2（对比） |
|------|---------|--------|------------|
| 总参数 / 激活 | 284B / 13B | 1.6T / 49B | 671B / 37B |
| 1M 上下文 FLOPs | V3.2 的 10% | V3.2 的 27% | 基线 |
| 1M 上下文 KV Cache | V3.2 的 7% | V3.2 的 10% | 基线 |
| CSA top-k | 512 | 1024 | — |
| 隐藏维度 | 4096 | 7168 | 7168 |

## 与当前工作流的关系

### 1. Interleaved Thinking — 验证了我们 normalizeMessages() 修复

```
论文原话（§5.1.1）：
"In tool-calling scenarios, all reasoning content is fully preserved
 throughout the entire conversation. Unlike DeepSeek-V3.2, which
 discarded thinking traces upon each new user turn..."

→ 我们 b5b6ad05d 的 normalizeMessages() 修复正好保证
  reasoning_content 在每轮工具调用后不丢失 ✓
```

### 2. Think Max 指令 — 与 Sisyphus prompt 一致

```
论文 Table 3 注入的系统提示：
"Reasoning Effort: Absolute maximum with no shortcuts permitted.
 You MUST be very thorough in your thinking..."

→ 我们在 oh-my-openagent 中汉化的 Sisyphus prompt
  使用了相同的语义 ✓
```

### 3. CSA 压缩与 MC historian 的理念对齐

| CSA | MC historian |
|-----|-------------|
| m=4 token 压缩成一个 KV 块 | 旧消息压缩成摘要 |
| Lightning Indexer 选 top-k | historian 选相关 compartment |
| 后续层只关注选中的块 | 模型只看注入 `<session-history>` |
| 滑动窗口保留局部依赖 | 新消息保留完整内容 |

→ P1 分层压缩可以按 CSA 的 block size 对齐

### 4. 1M 上下文效率 — 参数调整依据

V4-Flash 在 1M 上下文下仅用 V3.2 10% 的 FLOPs。
→ 当前 `max_input_tokens: 500K` 偏保守
→ `execute_threshold_percentage: 70` 可放宽到 85

## 已应用的优化

| 改动 | 文件 | 效果 |
|------|------|------|
| limit.context 500K → 800K | opencode.json | 更充分利用 1M 上下文 |
| max_input_tokens 500K → 800K | magic-context.jsonc | 更多上下文保留 |
| execute_threshold 70 → 85 | magic-context.jsonc | 更晚触发压缩，更少打断 |
| reasoningEffort: "max" | opencode.json | 与 Think Max 模式对齐 |

## 设计决策

### Historian/Dreamer 启用 thinking 模式

MC historian 和 dreamer 均使用 `deepseek-v4-flash` + `thinking: enabled`。理由：

- **质量优先**：压缩/记忆任务的质量直接影响后续对话的上下文质量。Flash 的成本极低（¥0.14/M 输入），多出的 thinking token 可忽略
- **实测对比**：待补充（fkyah3 提供 token 消耗和费用数据）
- **用户选择**：如果你对成本敏感，可创建 `deepseek-v4-flash-nothink` 变体（去掉 `thinking` 字段），将 historian/dreamer 指向它

### 上下文上限与压缩阈值

- `limit.context: 800K`：足够覆盖绝大多数长对话，距 V4 1M 上限留 20% 缓冲
- `execute_threshold_percentage: 85`：推迟 MC 压缩触发点，减少长对话中断

## 后续方向

- P1 分层压缩：按 CSA m=4 block size 对齐 MC 压缩粒度
- Enabling Dreamer：后台 batch 任务利用 V4 长上下文
- Context-window monitor：运行时追踪上下文用量与 V4 效率指标
