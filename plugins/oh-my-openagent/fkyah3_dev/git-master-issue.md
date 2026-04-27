# Git-master 前缀注入问题

## 症状

在 oh-my-openagent 环境下，每次执行 git 命令时 PowerShell 报错：

```
export : 无法将"export"项识别为 cmdlet、函数、脚本文件或可运行程序的名称。
```

原因是 AI 被要求在所有 git 命令前加 `GIT_MASTER=1` 环境变量前缀，而在 Windows PowerShell 中 `export` 不存在。

## 根因

问题涉及三层机制：

### 1. Schema 默认值

`src/config/schema/git-env-prefix.ts:28` — `git_env_prefix` 默认值为 `"GIT_MASTER=1"`。git-master skill 检测到此值非空时，会在提示词中注入强制前缀指令。

### 2. Ultrawork 指令硬编码

`src/hooks/keyword-detector/ultrawork/default.ts:166` — ultrawork 模式指令模板中示例使用 `load_skills=["git-master"]`，导致 AI 在 ultrawork 模式下仍被推荐使用 git-master。

### 3. `disabled_skills` 不够用

`schema/oh-my-opencode-config.ts:37` 定义了 `disabled_skills` 配置，但它只影响 skill 列表过滤，不影响：
- ultrawork 指令模板中的硬编码引用
- Hephaestus agent 提示词中的硬编码引用
- review-work skill 中的硬编码引用

## 修复

### fork `fix/git-master-disable-default` 分支

| 文件 | 改动前 | 改动后 |
|------|--------|--------|
| `src/config/schema/git-env-prefix.ts` | `.default("GIT_MASTER=1")` | `.default("")` |
| `src/features/opencode-skill-loader/git-master-template-injection.ts` | `config?.git_env_prefix ?? "GIT_MASTER=1"` | `config?.git_env_prefix ?? ""` |
| `src/hooks/keyword-detector/ultrawork/default.ts` | `load_skills=["git-master"]` | `load_skills=[]` |

另外在 `oh-my-openagent.json` 配置中添加：
```json
"disabled_skills": ["git-master"]
```

### 已知残留硬编码引用（暂未修复，不影响 Sisyphus windows 使用）

- `src/agents/hephaestus/gpt-5-4.ts:297` — Hephaestus 提示词
- `src/agents/hephaestus/gpt-5-3-codex.ts:376` — Hephaestus 提示词
- `src/features/builtin-skills/skills/review-work.ts:401` — review skill 提示词

## 验证

1. 重启 OpenCode 后，git 命令不应再带环境变量前缀
2. `git status` 等命令不应再出现 `export` 报错
3. 中文输出不应乱码（CJK 编码修复在 opencode-fkyah3 fork 中）

## 相关提交

- `775201dc` — 首次修复：Windows PowerShell 检测后注入平台语法（`$env:KEY="val"`）
- `7a63185b` — 根本修复：默认前缀改为空、ultrawork 指令去除硬编码
- `be8a86f5` — 补充修复：`injectGitMasterConfig` 中硬编码的 `?? "GIT_MASTER=1"` 后备值改为 `""`
