# DeepSeek v4Lite 贡献总结

> 时间范围：2026-04-24 起
> 相关仓库：opencode-fkyah3（OpenCode fork）、oh-my-openagent-fkyah3（OMO fork）、opencode-magic-context-fkyah3（Magic Context fork）
>
> **这些 bug 社区几十个 issue 挂了几个月但没人愿意修 Windows 平台的问题。**

---

## 1. Windows CJK 编码修复

**发现**：用户在对话中反馈中文命令输出乱码。验证后确认是 Windows 中文系统代码页 936 GBK 导致子进程输出编码不一致。

**做了什么**：
- 修复 `packages/opencode/src/tool/bash.ts` 的 `cmd()` 函数，在 PowerShell 子进程中注入 `chcp 65001` + `[Console]::OutputEncoding` + `$OutputEncoding` 三层 UTF-8 设置，cmd.exe 子进程注入 `chcp 65001`
- 更新 `opencodesrc.ps1` 加注释说明父子编码分工
- 撰写 `fkyah3_dev/README.md` 中文乱码解决方案节，含症状、修复原理、验证方法、编码架构图

**涉及文件**：`bash.ts`、`opencodesrc.ps1`、`fkyah3_dev/README.md`、`fkyah3_dev/ACHIEVEMENTS.md`

---

## 2. Magic Context TUI 侧边栏修复

**发现**：用户反馈 Magic Context 侧边栏不渲染。服务端 RPC 数据正常，但 TUI 面板始终空白。用户此前怀疑是 OpenCode fork 的 TUI 插件系统不兼容。

**做了什么**：
- 追踪 TUI 插件加载链路（`tui.json → PluginLoader → Npm.add() → import(entry)`），发现加载在 `readV1Plugin()` 和 `activatePluginEntry()` 阶段均正常
- 定位根因为 OpenCode fork 的 `TuiOptions` Zod schema 使用 `.strict()` 拒绝未声明的 `show_thinking: true` 字段，导致 `load()` 返回空 `{}`，`plugin_origins` 为空，外部插件永不加载
- 在 `tui-schema.ts` 中新增 `show_thinking: z.boolean().optional()`，重启后侧边栏正常渲染
- 提交：`c1a595acc`

**涉及文件**：`packages/opencode/src/cli/cmd/tui/config/tui-schema.ts`

---

## 3. Magic Context 侧边栏汉化 & 加载路径根因诊断

**发现**：用户提出汉化侧边栏需求。初始修改 `~/.config/opencode/node_modules/` 下的文件无效，发现运行时加载的是另一个路径。

**做了什么**：
- 系统检查所有 magic-context 副本，发现插件通过 `Npm.add()` 安装到 `~/.cache/opencode/packages/`，而非直观的 `~/.config/opencode/node_modules/`
- 定位 `Npm.add()` 使用 `@npmcli/arborist` 安装，且检测目录存在即跳过更新（不检测新版本），导致驻留 v0.12.0 老版本
- 全量汉化 16 个 UI 标签 + 4 个时间单位，设计 `LOCALE` 常量和 `t(zh, en)` 辅助函数实现中英文一键切换
- 在侧边栏头部增加 OMO 版本号显示

**涉及文件**：缓存目录 TSX 文件（非仓库层级）

---

## 4. Git-master 前缀注入根治（3 层漏洞）

**发现**：`disabled_skills` 配置仅过滤 skill 列表，但 ultrawork 指令模板硬编码 `load_skills=["git-master"]` 绕过此配置。此外还有两处后备值在默认值清空后仍重新生成 `"GIT_MASTER=1"`。

**做了什么**：
- 新增 OMO fork 分支 `fix/git-master-disable-default`
- **第 1 层**：`src/config/schema/git-env-prefix.ts` 默认值 `"GIT_MASTER=1"` → `""`
- **第 2 层**：`src/hooks/keyword-detector/ultrawork/default.ts` 去掉 `load_skills=["git-master"]`
- **第 3 层**：`injectGitMasterConfig` 函数后备值 `?? "GIT_MASTER=1"` → `?? ""`
- 在 `oh-my-openagent.json` 配置中加 `disabled_skills: ["git-master"]`
- 撰写完整问题文档 `fkyah3_dev/git-master-issue.md`

**涉及文件**：`git-env-prefix.ts`、`default.ts`、`oh-my-openagent.json`、`fkyah3_dev/git-master-issue.md`

---

## 5. Non-interactive-env Hook Windows 兼容修复

**发现**：Windows 上 git 命令自动注入 `export CI=true ...` 前缀，PowerShell 不识别 `export` 报错。与 git-master 无关，是 OMO 的 `non-interactive-env` hook 的行为。

**做了什么**：
- 定位根因：`detectShellType()` 检测到 `MSYSTEM`（Git Bash 安装后永久设置）返回 `"unix"`，生成 `export` 语法，但实际执行环境是 PowerShell
- **源码修复**：`non-interactive-env-hook.ts` 在 Windows 上固定使用 `"powershell"` 类型，生成 `$env:KEY='val';` 语法
- **配置修复**：`oh-my-openagent.json` 的 `disabled_hooks` 加 `"non-interactive-env"` 双重保险
- 撰写问题文档 `fkyah3_dev/non-interactive-env-fix.md`
- 已保存到 Magic Context 项目记忆

**涉及文件**：`non-interactive-env-hook.ts`、`oh-my-openagent.json`、`fkyah3_dev/non-interactive-env-fix.md`

---

## 开源协议注意事项

三个上游仓库协议各不相同：

| 仓库 | 协议 | 注意事项 |
|------|------|---------|
| **opencode** | MIT | ✅ 可自由修改/商用/闭源。仅需分发时保留版权声明 |
| **magic-context** | MIT | ✅ 同上 |
| **oh-my-openagent** | **SUL-1.0** | ⚠️ **严格限制**。仅允许个人使用、修改和内部部署。禁止商用、再分发、SaaS。修改版须附原许可声明 |

你的 fork 当前全部为私有，无合规问题。若未来计划公开或商用，**OMO 的 SUL-1.0** 是最紧的约束——它的限制会绑定到你的 fork 上。
