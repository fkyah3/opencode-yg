# fkyah3_dev — fkyah3/opencode-fkyah3 修订记录

> 作者标记说明：
> - **DeepSeek v4Lite** (Sisyphus) ← 我，本次记录的主角
> - **Kimi K2.4** ← 前期阶段的其他 AI
>
> 本文档仅记录 DeepSeek v4Lite 的贡献。上游提交和 Kimi K2.4 的贡献不在此列。
>
> 基于 [anomalyco/opencode](https://github.com/anomalyco/opencode) v1.14.19 分支
> 许可证：Apache 2.0（继承上游）

---

## DeepSeek v4Lite (Sisyphus) 修订列表

### 1. TUI 外部插件加载修复

**提交**：[`c1a595acc`](https://github.com/fkyah3/opencode-fkyah3/commit/c1a595acc)

**作者**：DeepSeek v4Lite

**问题**：`tui.json` 中配置了 `"show_thinking": true`，但 Zod schema 使用 `.strict()` 拒绝未声明的字段。导致 `load()` 返回空配置 `{}`，`plugin_origins` 为空，所有外部 TUI 插件（如 Magic Context 侧边栏）静默不加载。

**修复**：在 `TuiOptions` schema 中新增 `show_thinking: z.boolean().optional()`。

**排查过程**：
1. 从用户反馈"重启后侧边栏消失"入手
2. 对比上游 anomalyco/opencode 的 tui-schema.ts，发现 fork 中 `.strict()` 的存在
3. 确认 `show_thinking` 字段不在 Zod schema 白名单中 → 整个 `tui.json` 被 `load()` 丢弃 → `plugin_origins` 为空
4. 验证：在 schema 中添加字段后重启，插件正常加载

**涉及文件**：
- `packages/opencode/src/cli/cmd/tui/config/tui-schema.ts`（+1 行）

**难度**：⭐⭐（中等 — 需要理解 Zod schema 验证链和 TUI 插件加载链路）

---

### 2. Magic Context 侧边栏汉化 & 加载路径根因诊断

**位置**：用户配置目录（`~/.cache/opencode/packages/`），非代码仓库层级

**作者**：DeepSeek v4Lite

**工作内容**：
- **根因诊断**：定位 Magic Context TUI 插件侧边栏的实际加载路径为 `Npm.add()` → `~/.cache/opencode/packages/`，而非直观上的 `~/.config/opencode/node_modules/`。`Npm.add()` 使用 `@npmcli/arborist` 安装到 `global.cache/packages/`，且检查目录存在即跳过更新（不检测新版本）
- **旧版本驻留问题**：缓存目录中驻留了 v0.12.0 的老版本（当前发布版为 v0.14.2）——因 `Npm.add()` 的 `existsSafe` 短路逻辑，永远不会自动升级
- **关键路径透视**：`tui.json` → `PluginLoader.resolve()` → `resolvePluginTarget()` → `Npm.add()` → 缓存目录 → `import(entry)` 加载 TSX 源文件。此前多次修改 `~/.config/opencode/node_modules/` 下的文件均不生效
- **全量汉化**：将所有 UI 标签（System/Compartments/Facts/Memories/Conversation/Tool Calls/Tool Defs + Overhead/Historian/Memory/Injected/Status/Queue/Notes/Smart Notes/Dreamer/Last run + 4 个时间单位）替换为中文
- **Locale 开关架构**：在文件顶部设置 `LOCALE` 常量（`"zh"` / `"en"`），配合 `t(zh, en)` 辅助函数实现全量标签的零成本中英文切换

**长期方向**：须在 opencode-magic-context fork 中实现正式 i18n 支持（从 `tui.json` 传入 locale 参数），避免缓存目录文件被版本更新覆盖。

**难度**：⭐⭐⭐⭐（复杂 — 涉及多层路径追溯、Npm 缓存机制、Solid.js TUI 渲染引擎）

---

### 3. Windows CJK 编码修复（中文乱码）

**提交**：[`f92d34554`](https://github.com/fkyah3/opencode-fkyah3/commit/f92d34554)

**作者**：DeepSeek v4Lite

**问题**：中文 Windows 系统默认控制台代码页为 936（GBK），但 OpenCode 的 bash tool 以 UTF-8 读取子进程输出。`opencodesrc.ps1` 中的 `chcp 65001` 仅影响父进程，每次 `powershell -Command` 或 `cmd.exe /c` 创建的子进程都使用系统默认代码页。

**更深层**：即使 `chcp` 显示 65001，PowerShell 的 `[Console]::OutputEncoding` 和 `$OutputEncoding` 独立于控制台代码页，默认仍为 936。三个编码出口必须全部设为 UTF-8 才能保证中文输出正常。

**修复**：在 `packages/opencode/src/tool/bash.ts` 的 `cmd()` 函数中：
- PowerShell 分支：注入 `chcp 65001` + `[Console]::OutputEncoding = [Text.UTF8Encoding]::new()` + `$OutputEncoding = [Text.UTF8Encoding]::new()`
- cmd.exe 分支：注入 `chcp 65001`（cmd 无 .NET 编码层）

**文档**：`opencodesrc.ps1` 保留父进程编码设置并加注释说明父子分工。

**排查过程**：
1. 用户报告中文命令输出乱码
2. 定位到 `bash.ts` 的 `cmd()` 函数用 `child_process.spawn()` 创建子进程
3. 用户通过新窗口测试确认 `chcp=65001` 正确但 `[Console]::OutputEncoding` 仍为 936
4. 补充 PowerShell 的 .NET 编码层修复

**涉及文件**：
- `packages/opencode/src/tool/bash.ts`（+13/-2 行）
- `opencodesrc.ps1`（新增）

**难度**：⭐⭐（中等 — 需要理解 Windows 编码三层架构：chcp / Console::OutputEncoding / $OutputEncoding，以及 spawn 进程继承规则）

---

## 设计原则

1. **最小侵入**——每次修复只改目标问题，不重构不重写
2. **单层追究**——不猜测，每步基于可验证的代码、日志、用户确认
3. **兼容上游**——不破坏其他模型/平台的支持
4. **可回溯**——每个分析和修复步骤可通过 git 或 context 记录追溯
