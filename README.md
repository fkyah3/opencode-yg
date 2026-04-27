<p align="center"><b>fkyah3/opencode-fkyah3</b><br>
<code>DeepSeek 优化 · Windows 适配 · AI 实现</code></p>

<p align="center">
  <a href="./SETUP.md"><b>🚀 从零搭建指南</b></a> · <a href="./README.en.md">English</a> · <a href="./README.zht.md">繁體中文</a>
</p>

---

## 🧠 语言锚定 —— LLM 多语言适配的系统方法

**核心发现**：LLM 会话的第一个主动输出语言，决定了整场对话的思维惯性。读中文 ≠ 用中文思考。

| 阶段 | 效果 | 干预措施 |
|------|------|---------|
| 纯 prompt 约束（4 条语言规则） | ~70% | 仅修改 prompt 文本 |
| + 翻译 16 个工具描述 | ~85% | 工具层中文对齐 |
| + 翻译 50+ 文件注释（新对话验证） | ~95%+ | 代码层加固 |
| + 锚定指令（7 行） | 接近全程中文 | 自回归惯性利用 |

锚定指令只有 7 行：

```
## 语言锚定（硬性要求）
收到用户的第一条消息后，在执行任何操作或开始推理之前，
你必须先用中文写一段简短总结：
1. 用户要你做什么
2. 你计划用什么步骤完成
3. 你还缺什么信息
这段中文是你的第一个输出。完成这段输出后才能开始执行具体任务。
```

**学术对照**：Contextual Inertia（[arXiv 2603.04783](https://arxiv.org/abs/2603.04783)）、Cognitive Inertia（[arXiv 2503.01307](https://arxiv.org/abs/2503.01307)）——这些研究的是"如何打破有害惯性"。我们的贡献是正面利用同一机制。

📖 [Discussion #1 — 语言锚定 RFC](https://github.com/fkyah3/opencode-fkyah3/discussions/1)
💬 [Discussion #2 — 我对AI的看法（中文）](https://github.com/fkyah3/opencode-fkyah3/discussions/2)
🌐 [Discussion #3 — How I Work with AI (English)](https://github.com/fkyah3/opencode-fkyah3/discussions/3)

### V2 对照实验（2026-04-27）

我们在**纯英文环境**（关闭 OMO 插件，禁用所有中文提示词）中做了三组对照实验，验证锚定理论的独立性：

| 测试 | 环境 | 指令 | 思考语言 | 漂移 |
|------|------|------|---------|------|
| 2 | 纯英文 | 无 | **英文**（全程稳定） | 无——符合预期 |
| 3 | 纯英文 | 锚定指令（7行） | 中文 → **约1600行后漂回英文** | ✅ 显著漂移 |
| 5 | 纯英文 | "请用中文语言思维"（一句话） | **中文**（全程稳定） | 无——零漂移 |

**核心结论：**
- 环境对齐提供了基线效果（约70-90%），不是锚定指令
- 锚定指令（输出约束）在长对话中会**衰减**——尤其是在处理大量英文代码/工具结果时
- 直接指定思维模式的指令（"用中文语言思维"）**远比锚定稳定**，零衰减
- **思维语言 ≠ 输出语言**——锚定约束的是输出格式，思维指令直接作用于认知方式

**完整实验报告：**[`fkyah3_dev/实验/语言对齐实验报告-v2.md`](./fkyah3_dev/实验/语言对齐实验报告-v2.md)

这不推翻 v1 发现，而是将其拆分为三层：

```
环境对齐（中文上下文）        → 约 70-90% 效果
输出锚定（首个输出约束）      → 约 30-50%，短期有效，会衰减
思维模式指令（直接指定框架）  → 约 90%+，长对话稳定
```

原始主张（"锚定指令单独驱动中文输出"）过于粗粒度。细化的认识更实用：**最有效的方法是环境对齐 + 思维模式指令，按此顺序组合。**

---

## 关于本项目

这是 [anomalyco/opencode](https://github.com/anomalyco/opencode) 的个人 Fork。所有修复、优化、功能均由 AI 完成——**DeepSeek V4 Flash (thinking mode) / Sisyphus**——在人类监督下执行。

上游是优秀项目。Windows 和 DeepSeek 并非他们的优先方向。我们自行处理。

> **代码实现：DeepSeek V4 Flash (thinking mode) / Sisyphus（AI）**  
> **人工审核与方向把控：fkyah3**  
> This fork is a live demonstration of what AI-built software looks like.  
> 详见 [`fkyah3_dev/`](./fkyah3_dev/)。

---

## 修复列表

| 修复项 | 领域 |
|--------|------|
| `reasoning_content` 丢失导致 API 400 —— DeepSeek 思考模式根因修复 | **核心** |
| OpenRouter `@openrouter/ai-sdk-provider` providerOptions key 不匹配 | **Provider** |
| 多窗口崩溃级联 —— OMO tool-pair-validator 增加熔断器 | **稳定性** |
| 每会话独立日志（重启不再截断 dev.log） | **开发体验** |
| Windows CJK 编码 —— 子进程管道三层 GBK/UTF-8 修复 | **Win32** |
| TUI 插件加载 —— Magic Context 侧边栏空白（Zod strict 模式） | **TUI** |
| MC 工具输出截断 —— `[truncated]` → `[tool: N lines, MKB \| preview]` 压缩展示 | **MC** |
| DeepSeek V4 架构研究 → 配置对齐：400K 上下文、90% MC 阈值、CSA 对齐压缩 | **V4** |
| 全局 Session 池 —— 任意目录下查看所有对话（2.0） | **Session** |
| 全中文系统提示：Sisyphus、keyword-detector、系统消息、环境信息 | **i18n** |
| **语言锚定** —— LLM 多语言适配的系统方法（含剂量关系验证数据） | **i18n** |

## 快速启动

```powershell
cd packages/opencode
bun run --conditions=browser src/index.ts
```

## 模型配置参考

### Flash（日常驱动——全部 Agent）

```jsonc
"deepseek-v4-flash": {
  "limit": { "context": 400000, "output": 393216 },
  "options": {
    "reasoningEffort": "max",
    "thinking": { "type": "enabled" }
  },
  "interleaved": { "field": "reasoning_content" }
}
```

- **`reasoningEffort`**: `high`（默认）或 `max`。Agent 工具会自动设为 `max`。
- **`interleaved`**: DeepSeek 思考模式通过 `@ai-sdk/openai-compatible` 时必须配置，否则 `reasoning_content` 不会转发。
- **`thinking`**: 推理模型必须配置 `{ type: "enabled" }`。

## 了解更多

| 链接 | 内容 |
|------|------|
| [`fkyah3_dev/`](./fkyah3_dev/) | 修复详情、分析文档、问题跟踪 |
| [`fkyah3_dev/internal/COMPLETION.md`](./fkyah3_dev/internal/COMPLETION.md) | 完成清单与当前状态 |
| [上游 Issue #24104](https://github.com/anomalyco/opencode/issues/24104) | reasoning_content 根因讨论 |

## Upstream

基于 [anomalyco/opencode](https://github.com/anomalyco/opencode)（Apache 2.0）。定期合并上游变更。

---

<p align="center"><i>Crafted by AI. Curated by human. Built for the real world.</i></p>
