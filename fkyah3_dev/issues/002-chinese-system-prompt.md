# Issue 002: Sisyphus 系统提示词中文本地化

> 状态：已实施 | 分支：feat/chinese-system-prompt | 2026-04-25

## 概述

将 Sisyphus agent 的系统提示词由英文改为中文，便于中文母语用户在"副驾驶"模式下阅读理解推理过程。

## 背景

用户（fkyah3）在长期使用中反馈：
- 英文推理过程"车速太快"，作为副驾驶跟不上思路
- 改用中文后可以边看边学，迭代自己的思考模式
- 已有论文证据（arXiv 2507.15849）表明提示词语言不影响 DeepSeek 模型推理质量

## 改动内容

**源文件**：`oh-my-openagent/src/agents/sisyphus/deepseek.ts`

**翻译范围**：
- Role identity → 中文（"你是 Sisyphus —— 来自 OhMyOpenCode 的编排型 AI Agent"）
- Behavior_Instructions（阶段0-3）→ 中文
- Tone & Style → 中文
- Constraints → 中文
- Task/Checklist 管理段 → 中文

**未翻译**：
- 动态生成辅助段（tool selection table、agent descriptions 等）—— 因包含标识符和代码
- 代码示例 —— 保持语法正确性
- 结构标签（`<Role>` 等）—— 保持解析器兼容性

## 技术细节

- 构建命令：`bun build src/index.ts --outdir dist --target bun --format esm`
- bun build 会自动将非 ASCII 字符转义为 `\uXXXX` 序列，功能上无影响
- 运行时加载路径：`~/.cache/opencode/packages/oh-my-openagent@latest/node_modules/oh-my-openagent/dist/index.js`
- 在 `sisyphus.ts` 中注册 DeepSeek 路由后生效（`isDeepSeekModel()` → `buildDeepSeekSisyphusPrompt()`）

## 部署

1. 修改 `deepseek.ts` 中的静态文本
2. 构建 dist：`bun build`
3. 同步到 cache 路径：`Copy-Item dist/index.js <cache-path>`
4. 重启 OpenCode 后生效

## 后续可能

- 考虑向 OMO 提 feature request（中文 i18n 支持）
- 但不适合合入上游 —— 对所有用户来说不是通用功能
- 如果 OMO 社区有兴趣，可以抽象为语言模板或配置项

## 引用

- 论文：arXiv 2507.15849 — The Impact of Language Mixing on Bilingual LLM Reasoning
- 分析文档：fkyah3_dev/analysis/sisyphus-system-prompt-structure.md
