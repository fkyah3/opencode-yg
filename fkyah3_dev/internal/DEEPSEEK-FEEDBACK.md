# DeepSeek 反馈邮件

收件人：research@deepseek.com
发送邮箱：（QQ 邮箱）

---

**主题：DeepSeek V4 thinking mode 在 OpenCode agent 场景下的使用反馈与架构对齐**

你好 DeepSeek 团队，

我是 fkyah3，声乐专业出身，意外踏入了 AI 工具链的世界。我维护了一个个人 fork 的 OpenCode（开源 CLI AI 编程助手），所有代码和优化均由 **DeepSeek V4 Flash（thinking mode）配合 Sisyphus agent 框架**完成，我只负责方向把控和结果验证。

从 4 月 22 日 fork 建仓到 4 月 26 日，我们在日均 50+ 轮重度工具调用场景下深度使用 V4，以下是反馈和研究结果。

---

## 一、reasoning_content 的两种行为模式：官方文档未覆盖的灰色地带

根据 V4 技术报告 §5.1.1，工具调用场景下应"完全保留思考历史"。但实际 API 行为是：

- **纯对话场景**：上一轮 reasoning_content 可省略，API 自动忽略
- **工具调用场景**：上一轮 reasoning_content 必须完整回传，否则返回 400

OpenCode 作为 CLI 编程助手，每一轮都调用工具（读文件、搜索、执行命令），所以 400 是必然的。我们的修复（commit b5b6ad05d）在 normalizeMessages 层对所有 assistant 消息无条件注入 reasoning_content（空字符串兜底）。验证后 crash 率归零。

## 二、interleaved 默认值不适用于 agent 配置

通过 @ai-sdk/openai-compatible + `thinking: {type: "enabled"}` 使用 V4 时，`interleaved` 默认 `false` 导致 reasoning_content 在 SDK 消息转换时被丢弃。在上游提交了 1 行修复（PR #24218）：当 reasoning=true 时 interleaved 默认启用。

## 三、OpenRouter 网关兼容问题

OpenRouter 网关会删除空字符串 reasoning_content（""）后再转发，破坏 API 合约。使用 OpenRouter 的用户即使前端配置正确仍会报 400。我们已在 fork 中修复了 providerOptionsKey 映射。

## 四、V4 架构研究与工作流对齐

我们阅读了完整的 DeepSeek V4 技术报告，发现 CSA 架构（m=4 压缩 + Lightning Indexer top-k 稀疏选择）与我们的 Magic Context historian 压缩策略高度一致。据此做了配置对齐：

| V4 特性 | 我们的调整 |
|---------|-----------|
| 1M 上下文 + 10% KV cache（vs V3.2） | context 上限 500K → 800K |
| Think Max 模式 | `reasoningEffort: "max"` 显式启用 |
| CSA sliding window（128 token） | MC compression grace 10 → 15 compartments |
| CSA block compression（m=4） | historian chunk max 50K → 80K |

## 五、项目入口

所有代码、文档、架构决策在：
**github.com/fkyah3/opencode-fkyah3**（main 分支）

`fkyah3_dev/analysis/` 下有完整的技术分析文档。`SETUP.md` 提供了从零搭建的指南。三仓库（OpenCode + OMO agent + Magic Context）配合使用。

---

## 我的核心信念

我相信 **AI 和人类应该是相互促进、协同发展的关系**，而不是替代。DeepSeek V4 作为开源模型，正在把高质量的 AI 能力交到更多手中——不只是专业工程师，也包括我这样的、从声乐专业偶然跨到这个领域的人。我们在做的事本质上是 AI 和人类深度协作的一个实况案例——AI 负责执行和实现，人类负责方向和质量判断。这种模式应该是未来。

如果你们对我的使用方式、测试数据、或者"一个声乐专业的人怎么走到这里"的故事有任何想了解的，随时欢迎问我。

---

fkyah3
github.com/fkyah3
2026 年 4 月 26 日
