# fkyah3_dev — OpenCode Fork 公开入口

> 基于 [anomalyco/opencode](https://github.com/anomalyco/opencode) v1.14.19 分支
> 作者：fkyah3
> 许可：Apache 2.0（继承上游）

## 针对中文用户：中文乱码解决方案

Windows 中文系统（代码页 936 GBK）使用 OpenCode 时，bash tool 执行命令的中文输出可能显示为乱码。本 fork 已内置修复。

### 症状

```powershell
Write-Output "你好世界"
# 输出：ä½ å¥½ä¸ç\U+fffd\U+fffd（乱码）
```

### 修复原理

OpenCode 的 bash tool 通过 `child_process.spawn()` 创建子进程执行命令。在 Windows 上，这些子进程**不继承**父进程的控制台代码页设置，而是使用系统默认值（中文 Windows = 936 GBK）。但 bash tool 以 UTF-8 读取输出 → 乱码。

修复在 `packages/opencode/src/tool/bash.ts` 的 `cmd()` 函数中，确保每个子进程在运行用户命令前将三个编码出口全部设为 UTF-8：

| 编码出口 | 作用范围 | 修复方式 |
|---------|---------|---------|
| `chcp 65001` | 控制台窗口代码页 | 所有子进程 |
| `[Console]::OutputEncoding` | .NET 输出编码 | PowerShell 子进程 |
| `$OutputEncoding` | PowerShell 管道编码 | PowerShell 子进程 |

### 使用前提

1. 使用 `opencodesrc.ps1` 启动（设置父进程 UTF-8 环境）
2. 或直接 `cd packages/opencode && bun run --conditions=browser src/index.ts`（子进程修复在 bash.ts 中已内置）

### 验证

```powershell
Write-Output "你好世界"
$ Output: 你好世界  ✅
```

---

## 快速启动

> 详细文档位于私有仓库：`specs/opencode_fkyah3_doc/AGENTS.md`

```bash
cd packages/opencode
bun run --conditions=browser src/index.ts
```

## 验证版本

启动后看右下角是否显示 **`local-fkyah3-V1`**（黄色高亮）。

如果是 `local`，说明运行的是预编译版或插件未正确关闭。

## 编码验证

确认修复生效：

```powershell
Write-Output "你好世界"
```

输出应为 `你好世界` 而非乱码。

## 数据库

- 预编译版：`opencode.db`（共享对话记录）
- 源码开发版：`opencode-local.db`（空的，隔离）

## 子进程编码架构（供开发者参考）

Windows 中文编码问题涉及三层独立的编码出口：

```
┌─────────────────────────────────────────┐
│  opencodesrc.ps1  (父进程)               │
│  chcp 65001 → 控制台代码页               │
│  [Console]::OutputEncoding = UTF-8      │  ← 影响 .NET 输出
│  $OutputEncoding = UTF-8               │  ← 影响管道编码
└──────────────┬──────────────────────────┘
               │ spawn (不继承编码设置)
               ▼
┌─────────────────────────────────────────┐
│  bash.ts cmd()  (子进程注入)             │
│  ┌─ PowerShell: chcp + Console + $Oe   │
│  └─ cmd.exe:    chcp 65001             │
└─────────────────────────────────────────┘
```

- **父进程设置**（`opencodesrc.ps1`）：确保 Bun/OpenCode 自身在控制台正常显示 Unicode
- **子进程注入**（`bash.ts` `cmd()`）：确保每个 spawn 的命令正确输出 UTF-8

两者分工明确，缺一不可。

## 详细文档

所有约束、架构决策、调试笔记、待办清单：

**`specs/opencode_fkyah3_doc/AGENTS.md`**
