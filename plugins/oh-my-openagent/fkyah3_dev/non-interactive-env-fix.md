# non-interactive-env Hook Windows 兼容性修复

## 问题

在 Windows 上使用 git 命令时，OMO 自动注入 `export CI=true DEBIAN_FRONTEND=noninteractive ...` 前缀，但 PowerShell 不识别 `export`，报错：
```
export : 无法将“export”项识别为 cmdlet、函数、脚本文件或可运行程序的名称。
```

## 根因

`non-interactive-env` hook 通过 `tool.execute.before` 拦截所有 bash 命令，检测到 git 命令时自动注入环境变量（`CI=true, GIT_TERMINAL_PROMPT=0, GIT_EDITOR=:` 等），防止交互式编辑器/分页器卡死。

`detectShellType()` 检测到 `MSYSTEM` 环境变量（Git Bash 安装后永久设置）→ 返回 `"unix"` → 生成 `export KEY=val;` 语法 → 但实际执行环境是 PowerShell → 语法错误。

## 修复

### 方式一：源码修复（推荐）

`src/hooks/non-interactive-env/non-interactive-env-hook.ts:56`：

```typescript
// Before:
const shellType = detectShellType()

// After:
const shellType = process.platform === "win32" ? "powershell" : detectShellType()
```

**原理**：OpenCode 的 bash tool 在 Windows 上始终使用 `powershell -Command ...`。MSYSTEM/SHELL 检测的是父进程 shell，不是实际执行 shell。对 win32 直接固定为 PowerShell 语法（`$env:KEY='val';`）。

### 方式二：配置绕过（无需改源码）

在 `oh-my-openagent.json` 的 `disabled_hooks` 中加入：

```json
"disabled_hooks": [
    "non-interactive-env"
]
```

副作用：git 命令不再受防护（不能自动阻止交互式编辑器弹出）。在 OpenCode 的 bash tool 环境中，交互式编辑器的调用路径已由 AI guidelines + CJK 编码修复覆盖。

## 验证

修复后 git 命令正常运行，不再出现 `export` 报错。
