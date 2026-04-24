# Sisyphus 系统提示词结构与汉化方案

> 本文档分析 oh-my-openagent 中 Sisyphus agent 的系统提示词（system prompt）结构，
> 明确各文本段的来源、语言、大小，为汉化提供决策依据。

---

## 1. 概述

Sisyphus agent 的提示词由 `src/agents/sisyphus.ts` 中的 `createSisyphusAgent()` 函数动态生成。
根据模型类型（DeepSeek / GPT / Gemini / 其他），路由到不同的 prompt builder：

| 路由 | 函数 | 文件 |
|------|------|------|
| DeepSeek V4 | `buildDeepSeekSisyphusPrompt()` | `src/agents/sisyphus/deepseek.ts` |
| GPT-5.4 | `buildGpt54SisyphusPrompt()` | `src/agents/sisyphus/gpt-5-4.ts` |
| Gemini | `buildDynamicSisyphusPrompt()` + Gemini overrides | `src/agents/sisyphus.ts` (内联) |
| 其他 (fallback) | `buildDynamicSisyphusPrompt()` | `src/agents/sisyphus.ts` (内联) |

当前使用 DeepSeek-v4-flash，因此实际生效的是 **`deepseek.ts`**。

---

## 2. 提示词构成（按出现顺序）

提示词由静态文本 + 动态函数生成两部分拼接而成。

### 2.1 静态文本（直接写在 deepseek.ts 中）

| 段落 | 行号 | 内容概要 | 预估 token |
|------|------|---------|-----------|
| Role identity | 117-129 | "Sisyphus — orchestrator from OhMyOpenCode" | ~80 |
| Intent Gate | 133-173 | 意图分类表 + 模糊性检查 + 委派检查 | ~250 |
| Phase 1 Codebase | 177-185 | 代码库风格评估（disciplined/chaotic 等） | ~100 |
| Phase 2A Explore | 189-220 | 探索与研究（并行执行规则） | ~300 |
| Phase 2B Impl | 224-273 | 实施流程（分解→委派→验证） | ~500 |
| Phase 2C Recovery | 277-284 | 失败恢复（3次失败后停手） | ~80 |
| Phase 3 Complete | 288-294 | 完成条件 | ~80 |
| Tone & Style | 301-306 | 沟通风格 | ~80 |
| Constraints | 308-317 | 硬限制 + 软指南 | ~60 |

**静态文本合计：~1,530 tokens**

### 2.2 动态函数生成（分散在多个文件中）

| 函数 | 文件 | 内容概要 | 预估 token |
|------|------|---------|-----------|
| `buildAgentIdentitySection()` | core-sections.ts:15 | agent identity 声明（3行） | ~40 |
| `buildKeyTriggersSection()` | core-sections.ts:26 | 关键触发器列表 | 可变（~100） |
| `buildToolSelectionTable()` | core-sections.ts:44 | 工具/agent 选择表 | 可变（~150） |
| `buildExploreSection()` | core-sections.ts:77 | Explore agent 使用指南 | ~80 |
| `buildLibrarianSection()` | core-sections.ts:99 | Librarian agent 使用指南 | ~80 |
| `buildAntiDuplicationSection()` | policy-sections.ts:127 | 反重复搜索规则 | ~200 |
| `buildCategorySkillsDelegationGuide()` | category-skills-guide.ts:48 | 分类+技能委派指南 | ~300 |
| `buildDelegationTable()` | core-sections.ts:118 | 委派表 | 可变（~100） |
| `buildOracleSection()` | core-sections.ts:130 | Oracle 使用说明 | ~200 |
| `buildHardBlocksSection()` | policy-sections.ts:7 | 硬限制列表 | ~80 |
| `buildAntiPatternsSection()` | policy-sections.ts:22 | 反模式列表 | ~120 |
| `buildParallelDelegationSection()` | core-sections.ts:191 | 并行委派（仅在非Claude模型显示） | ~150 |
| `buildDeepSeekTaskSection()` | deepseek.ts:36 | Task/checklist 管理 | ~200 |

**动态文本合计：~1,800 tokens（根据配置可变）**

### 2.3 总量

| 分类 | tokens |
|------|--------|
| 静态文本（deepseek.ts） | ~1,530 |
| 动态函数生成 | ~1,800 |
| **合计** | **~3,330 tokens** |

（对比：完整版 `buildDynamicSisyphusPrompt()` 含更多示例代码和冗余说明，约 6-8K tokens）

---

## 3. 需要翻译的文件清单

| 文件 | 函数 | 需要翻译 | 工作量 |
|------|------|---------|--------|
| `src/agents/sisyphus/deepseek.ts` | `buildDeepSeekSisyphusPrompt()` | 全部静态文本 | **主要**（~200行） |
| `src/agents/sisyphus/deepseek.ts` | `buildDeepSeekTaskSection()` | 全部 | 小（~40行） |
| `src/agents/dynamic-agent-core-sections.ts` | 所有导出函数 | 全部 | **中**（~150行） |
| `src/agents/dynamic-agent-category-skills-guide.ts` | `buildCategorySkillsDelegationGuide()` | 全部 | **中**（~100行） |
| `src/agents/dynamic-agent-policy-sections.ts` | `buildHardBlocksSection()` | 全部 | 小（~20行） |
| `src/agents/dynamic-agent-policy-sections.ts` | `buildAntiPatternsSection()` | 全部 | 小（~15行） |
| `src/agents/dynamic-agent-policy-sections.ts` | `buildAntiDuplicationSection()` | 全部 | 小（~40行） |

**共 7 个函数文件需要改动。**

---

## 4. 不需要翻译的部分

- Agent 名称、工具名、分类名等标识符（保持英文便于调试）
- 代码示例（TypeScript 代码不翻译）
- Agent metadata 中的描述字段（由 OMO 配置提供，动态注入）
- `buildAgentIdentitySection()` 中的占位符模板（仅替换名称参数）

---

## 5. 构建与部署流程

修改完 TS 源文件后：

```powershell
# 1. 构建 OMO dist
cd E:\fkyah3\Agent\deepseek\oh-my-openagent
bun build

# 2. 同步到运行时加载路径
#    当前运行时从 cache 加载:
#    ~/.cache/opencode/packages/oh-my-openagent@latest/node_modules/oh-my-openagent/dist/
#    同时 ~/.config/opencode/node_modules/ 也有副本
```

---

## 6. 决策建议

| 方案 | 改动范围 | 工作量 | 效果 |
|------|---------|--------|------|
| **A: 只改 deepseek.ts** | 1 个文件 | 小 | 核心行为汉化，辅助描述仍英文 |
| **B: 全改** | 7 个文件 | 中 | 完全汉化 |
| **C: 不改** | 0 | 无 | 根据论文结论，英文推理不影响质量 |

根据 `arXiv 2507.15849` 论文结论，强制单一语言推理反而会降低准确率（-5.6%）。提示词语言对推理质量无实质影响。如果你只是想让提示词更易读/维护，选方案 A 足够。

---

## 7. 实施状态

| 项目 | 状态 |
|------|------|
| 方案选择 | A（只改 deepseek.ts） |
| 分支 | `feat/chinese-system-prompt` |
| 是否部署 | ✅ 已构建并同步到运行时路径 |
| 生效条件 | 重启 OpenCode |
| 本地 Issue | `fkyah3_dev/issues/002-chinese-system-prompt.md` |
