# OMO / OpenCode / Magic Context 操作指南

> 适用场景：验证 fork 的 DeepSeek 优化改动是否生效、排查插件加载问题、日常维护
> 最后更新：2026-04-23

---

## 一、启动与关闭

### 启动 OpenCode（源码版）

```powershell
# 方式 1：直接跑脚本
E:\fkyah3\project\Frankenstein-of-The-Babel-fkyah3\opencodesrc.ps1

# 方式 2：手工启动（定位到 opencode 目录后执行）
cd E:\fkyah3\Agent\deepseek\opecode\opencode-fkyah3\packages\opencode
bun run --conditions=browser src/index.ts
```

`opencodesrc.ps1` 会记住你当前的工作目录，启动后自动切回去。

### 关闭 OpenCode

- 在输入框输入 `exit` 回车
- 或直接关终端窗口

---

## 二、验证 OMO 插件是否正常加载

### 2.1 确认插件来源（npm vs 本地 fork）

看配置文件里 `plugin` 数组怎么写：

```
C:\Users\13248\.config\opencode\opencode.json
```

```json
"plugin": [
  "file:///E:/fkyah3/Agent/deepseek/oh-my-openagent",  ← 本地 fork 加载
  "@cortexkit/opencode-magic-context@latest"            ← npm 加载
]
```

- ** `file:///` 开头** = 从本地 fork 加载
- **纯名字**（如 `"oh-my-openagent"`）= 从 npm 缓存加载

### 2.2 确认 OMO 是否被 OpenCode 识别

启动 OpenCode 后，输入 `/` 看命令列表里有没有 `/ultrawork` 或 `/ulw`。如果有，说明 OMO 已正常加载。

### 2.3 检查本地 fork 的构建状态

```powershell
# 1. 确认 dist/index.js 存在（这个文件就是插件本体）
ls E:\fkyah3\Agent\deepseek\oh-my-openagent\dist\index.js

# 2. 看 build 时间（比源码修改时间新就没问题）
(Get-Item E:\fkyah3\Agent\deepseek\oh-my-openagent\dist\index.js).LastWriteTime
```

### 2.4 如果本地 fork 加载失败——切回 npm 版

改 `opencode.json`，把：

```json
"file:///E:/fkyah3/Agent/deepseek/oh-my-openagent"
```

改回：

```json
"oh-my-openagent"
```

然后重启 OpenCode。

---

## 三、修改源码后的重建流程

如果你改了 fork 里的代码（比如继续精简 Sisyphus 提示词），需要重新 build 才能生效。

### 3.1 查看当前哪些文件被改了

```powershell
cd E:\fkyah3\Agent\deepseek\oh-my-openagent
git status
```

### 3.2 重建

```powershell
cd E:\fkyah3\Agent\deepseek\oh-my-openagent
bun run build
```

大约 10-20 秒，成功后 `dist/index.js` 会被更新。然后重启 OpenCode 让新构建生效。

### 3.3 重建后验证 DeepSeek 变体已打包

快速检查构建产物里有没有 deepseek 关键字：

```powershell
# 搜 sisyphus deepseek 路由
Select-String -Path "E:\fkyah3\Agent\deepseek\oh-my-openagent\dist\index.js" -Pattern "isDeepSeekModel" -SimpleMatch

# 搜 ultrawork deepseek 分支
Select-String -Path "E:\fkyah3\Agent\deepseek\oh-my-openagent\dist\index.js" -Pattern "deepseek" -SimpleMatch
```

有输出说明 deepseek 变体已经打进 bundle 了。

### 3.4 提交改动（如果需要回滚点）

```powershell
cd E:\fkyah3\Agent\deepseek\oh-my-openagent
git add .
git commit -m "feat: DeepSeek Sisyphus 提示词精简变体"
```

每个阶段的改动独立 commit，方便选择性回滚。

---

## 四、验证 DeepSeek 变体是否正在生效

> 这一步需要在 OpenCode **运行时**检查（当前 session 就可以做）。

### 4.1 检查当前 agent 模型

输入：

```
你是谁
```

或者：

```
/context
```

你应该看到 `model: deepseek/deepseek-reasoner`（或者类似 `deepseek/` 开头的模型名）。只要模型是 `deepseek/` 前缀，OMO 就会自动走 DeepSeek 变体的 Sisyphus 提示词和 Ultrawork 提示词。

### 4.2 确认 model routing 逻辑

fork 里 `src/agents/types.ts` 中：

```typescript
export function isDeepSeekModel(model: string): boolean {
  return model.startsWith("deepseek/")
}
```

只要模型名以 `deepseek/` 开头就会触发路由。你现在用的就是 `deepseek/deepseek-reasoner`，所以必定走 DeepSeek 变体。

### 4.3 如何验证"变体确实比原来短"（选做）

如果你想确认提示词确实更精简了，可以在 OMO 的 config 里临时加一行，让 agent 报告 prompt 长度：

```
# 在 oh-my-openagent.json 里 temporary 加上
"verbose_logging": true
```

然后重启 OpenCode，看 `/tmp/oh-my-opencode.log` 里的 prompt token 计数。但这只是参考——更直接的验证是**感受回复响应速度**。

---

## 五、Magic Context

### 5.1 验证是否加载

OpenCode 启动后，输入：

```
/ctx-status
```

如果能正常返回上下文状态信息，说明 Magic Context 已加载且在工作。

### 5.2 当前状态

Magic Context 的 fork 在 `E:\fkyah3\Agent\deepseek\magic context\opencode-magic-context-fkyah3\`，但目前**没有构建产物**（`dist/` 不存在），所以配置里仍然用 npm 版本：

```
"@cortexkit/opencode-magic-context@latest"
```

如果你以后改了 Magic Context 的 fork 源码，同样需要：

```powershell
cd "E:\fkyah3\Agent\deepseek\magic context\opencode-magic-context-fkyah3"
# 先看它的 package.json 里 build 命令是什么
cat package.json | Select-String "build"
# 然后执行对应 build 命令
# 再改 opencode.json 把插件路径指向本地 fork
```

### 5.3 日志位置

```
C:\Users\13248\.config\opencode\                         ← 配置文件
%USERPROFILE%\.local\share\opencode\                      ← OpenCode 缓存 / 数据
/tmp/oh-my-opencode.log                                   ← OMO 日志（if exists on windows）
```

Windows 上没有 `/tmp`，OMO 日志可能在：

```
$env:TEMP\oh-my-opencode.log
```

---

## 六、排查路线图

| 现象 | 排查顺序 |
|------|---------|
| OpenCode 打不开 / 闪退 | ① 检查 `opencode.json` 语法 → ② 检查 `plugin` 路径是否存在 → ③ 检查 `dist/index.js` 是否存在 |
| OMO 命令不出现（没有 `/ultrawork`） | ① 检查 `opencode.json` 的 `plugin` 字段 → ② 改回 npm 版 `"oh-my-openagent"` 排除 fork 问题 → ③ 检查 OMO 是否 build 过 |
| 效果和之前一样，没感觉变快 | ① `git status` 确认 fork 里 deepseek 文件是否存在 → ② 检查 `dist/index.js` 是否包含 `isDeepSeekModel` → ③ 确认模型名以 `deepseek/` 开头 |
| 配置文件写错了打不开 | ① 备份副本（`opencode.json.bak`）恢复 → ② 检查 JSON 格式（逗号、引号） → ③ 用 `jq` 或在线 JSON 校验器验证 |

### 快速回滚三板斧

```
# 1. 插件加载问题 → 切回 npm 版
编辑 opencode.json，把 file:/// 路径改回 "oh-my-openagent"

# 2. 启动脚本问题 → 恢复备份
copy opencodesrc.ps1.bak opencodesrc.ps1

# 3. fork 代码改坏了 → 切回 dev 分支
cd E:\fkyah3\Agent\deepseek\oh-my-openagent
git checkout dev
bun run build
```

---

## 七、当前完整的依赖关系

```
opencodesrc.ps1
  └─→ bun run src/index.ts
        └─→ 读取 ~/.config/opencode/opencode.json
              ├─ plugin[0]: file:///E:/.../oh-my-openagent  ← 本地 fork
              │     └─ dist/index.js  ← 插件本体
              │           └─ OMO hook: sisyphus agent
              │                 ├─ prompt: deepseek.ts（精简版）
              │                 └─ ultrawork: deepseek.ts（精简版）
              └─ plugin[1]: @cortexkit/opencode-magic-context  ← npm
                    └─ context 压缩 / nudge 系统
```

改动任何一环需要重建时，**只需要关注两件事**：
1. `bun run build`（重新打包 fork）
2. 重启 OpenCode（重新加载插件）
