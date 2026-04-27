<p align="center"><b>fkyah3/oh-my-openagent-fkyah3</b><br>
<code>中文系统提示词 · DeepSeek 原生适配 · AI 构建</code></p>

---

这是 [code-yeongyu/oh-my-openagent](https://github.com/code-yeongyu/oh-my-openagent) 的个人维护分支。本仓库中的所有修改均由 AI — **DeepSeek V4 Flash（思考模式）/ Sisyphus** — 在人工监督下完成。

> **代码实现：DeepSeek V4 Flash（思考模式）/ Sisyphus**  
> **人工反馈与方向确认：fkyah3**  
> 这个分支是 AI 构建软件的真实案例。

---

## 改动内容

| 改动 | 领域 |
|------|------|
| Sisyphus 全中文系统提示词（含所有子 Agent + keyword-detector hooks 翻译） | **提示词** |
| `reasoning_content` 熔断机制 — tool-pair-validator 每个 session 最多修复 5 次 | **稳定性** |
| non-interactive-env hook 跨平台修复（Windows PowerShell + Git Bash 兼容） | **Win32** |

## 上游

基于 [code-yeongyu/oh-my-openagent](https://github.com/code-yeongyu/oh-my-openagent)，定期合并上游变更。

---

<p align="center"><i>AI 构建 · 人工把关 · 真实世界验证</i></p>
