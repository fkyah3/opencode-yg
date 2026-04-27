# 从零搭建 fkyah3 版 OpenCode 开发环境

本指南覆盖 OpenCode 核心 + oh-my-openagent（Sisyphus 编排 Agent）+ Magic Context（上下文压缩）的完整安装流程。
三个组件已预先合并到单一仓库中，**无需分别克隆**。

面向零基础用户——每个步骤都写明了要做什么、为什么这么做。

## 前置条件

| 工具 | 最低版本 | 安装方式 |
|------|---------|---------|
| Git | 2.x | `winget install Git.Git` 或 [git-scm.com](https://git-scm.com) |
| Bun | 1.1.x | `powershell -c "irm bun.sh/install.ps1 | iex"` |
| Node.js | 22.x | Bun 自带，不单独需要 |

验证安装：
```powershell
git --version
bun --version
```

## 第一步：克隆本仓库

```powershell
git clone https://github.com/fkyah3/opencode-fkyah3.git
cd opencode-fkyah3

# 切换到主分支
git checkout main
```

**目录结构应如下：**
```
opencode-fkyah3\
├── packages/opencode\           # OpenCode 核心
├── plugins/oh-my-openagent\     # oh-my-openagent 插件（已合并）
├── plugins/opencode-magic-context\  # Magic Context 插件（已合并）
└── ...
```

## 第二步：构建

### 2.1 安装依赖

```powershell
cd opencode-fkyah3
bun install
```

**无需构建 OpenCode 核心**——它通过 `bun run` 直接运行源码。

### 2.2 构建 oh-my-openagent

```powershell
cd plugins/oh-my-openagent
bun run build
```

### 2.3 构建 Magic Context

```powershell
cd plugins/opencode-magic-context\packages\plugin
bun run build
```

## 第三步：配置 DeepSeek API Key

在系统环境变量中添加：
```
DEEPSEEK_API_KEY=sk-xxxxxxxxxxxxxxxx
```

**设置方法（Windows）：**
1. 按 `Win + R`，输入 `sysdm.cpl`
2. 高级 → 环境变量
3. 用户变量 → 新建
4. 变量名：`DEEPSEEK_API_KEY`，变量值：你的 API key
5. 确定

> API key 从 [platform.deepseek.com](https://platform.deepseek.com/api_keys) 获取。

## 第四步：放置配置文件

以下文件放到 `C:\Users\<你的用户名>\.config\opencode\` 目录：

### 4.1 `opencode.json`

> **⚠️ 插件路径需要改为你本机仓库的实际路径。**

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": [
    "file:///D:/path/to/opencode-fkyah3/plugins/oh-my-openagent",
    "file:///D:/path/to/opencode-fkyah3/plugins/opencode-magic-context/packages/plugin"
  ],
  "provider": {
    "deepseek": {
      "npm": "@ai-sdk/openai-compatible",
      "options": {
        "baseURL": "https://api.deepseek.com",
        "apiKey": "${DEEPSEEK_API_KEY}"
      },
      "models": {
        "deepseek-v4-flash": {
          "limit": { "context": 400000, "output": 393216 },
          "options": {
            "reasoningEffort": "max",
            "thinking": { "type": "enabled" }
          },
          "interleaved": { "field": "reasoning_content" }
        }
      }
    }
  },
  "models": {
    "deepseek-v4-pro": "deepseek/deepseek-v4-pro",
    "deepseek-v4-flash": "deepseek/deepseek-v4-flash"
  },
  "sisyphus": {
    "model": "deepseek-v4-pro",
    "fallbackModel": "deepseek-v4-flash",
    "maxTokens": 8192,
    "thinking": { "type": "enabled", "budgetTokens": 32000 }
  },
  "oracle": {
    "model": "deepseek-v4-pro",
    "fallbackModel": "deepseek-v4-flash"
  },
  "agents": {
    "defaultModel": "deepseek-v4-flash",
    "fallbackModel": "deepseek-v4-flash"
  }
}
```

### 4.2 `oh-my-openagent.json`

omo 插件需要一段额外配置，放在同目录下：

```jsonc
{
  "maxTurns": 50,
  "background_task": {
    "maxDepth": 1,
    "concurrency": 5
  }
}
```

> **`maxDepth: 1`** 表示子 agent 不能再创建子 agent，防止嵌套过深。如果你需要更灵活的编排，可以改成更高值或直接删掉此行使用默认值。

### 4.3 `magic-context.jsonc`

```jsonc
{
  "$schema": "https://raw.githubusercontent.com/cortexkit/opencode-magic-context/master/assets/magic-context.schema.json",
  "max_input_tokens": 800000,
  "historian": {
    "model": "deepseek/deepseek-v4-flash"
  },
  "execute_threshold_percentage": 65,
  "dreamer": {
    "enabled": false,
    "model": "deepseek/deepseek-v4-flash"
  }
}
```

> **注意**：`dreamer.enabled` 设为 `false` 避免后台任务消耗 API 额度。需要时改为 `true`。

## 第五步：启动

```powershell
cd opencode-fkyah3\packages\opencode
bun run --conditions=browser src/index.ts
```

## 验证一切正常

启动后检查以下几点：

### 1. TUI 底部版本号
应显示：`local-fkyah3-V1.2`

### 2. 右侧 Magic Context 面板
按 `Ctrl+P` 打开命令面板 → 搜索 "Magic Context" → 打开侧边栏。
应显示上下文用量百分比、Compartments 等信息。

### 3. 模型配置
在对话中输入任意内容，观察回复。Pro 模型用于主 Agent，Flash 用于子任务。

### 4. 推理深度
第一次对话后，日志文件 `dev-*.log`（在 `%USERPROFILE%\.local\share\opencode\log\`）中应包含：
```
modelID=deepseek-v4-pro
```

## 常见问题

**Q: 启动报 "cannot find module"？**
A: 回到第二步，重新 `bun install` 三个项目。

**Q: API 报 400 错误 "reasoning_content must be passed back"？**
A: 确认 `opencode.json` 里 `deepseek-v4-flash` 包含 `"interleaved": { "field": "reasoning_content" }`。这是本 fork 已修复的问题。

**Q: 中文乱码？**
A: 在 PowerShell 中先执行 `chcp 65001`，再启动 OpenCode。

**Q: 要更新怎么办？**
A: `git pull` 本仓库。然后按第二步重新构建 oh-my-openagent 和 magic-context，重启 OpenCode。

## 项目结构一览

| 目录 | 作用 | 构建方式 |
|------|------|---------|
| `packages/opencode/` | OpenCode 核心（TUI、LLM provider、工具系统） | `bun run` 直接跑源码 |
| `plugins/oh-my-openagent/` | Sisyphus 编排 Agent + OMO 插件系统 | `bun run build` → dist/ |
| `plugins/opencode-magic-context/` | 上下文压缩、historian、dreamer | `bun run build` → packages/plugin/dist/ |

## 相关链接

- [上游 OpenCode](https://github.com/anomalyco/opencode)
- [DeepSeek API 文档](https://api-docs.deepseek.com)
- [本 fork 的修复详情](./fkyah3_dev/)
