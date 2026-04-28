# TUI 实现分析与模块关系

> 编写日期：2026-04-28
> 基于 `opencode-yg` 代码库 `main` 分支
> 框架版本：`@opentui/core@0.1.99` + `@opentui/solid@0.1.99`

---

## 一、架构总览

TUI 是 OpenCode 的终端用户界面，采用 **双进程架构 + Solid.js 响应式渲染**。

```
┌─────────────────────────────────────────────────────────────────┐
│                    CLI 入口 (src/index.ts)                       │
│             注册 TuiThreadCommand + AttachCommand               │
└──────────────────────────┬──────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│  主线程 (thread.ts)                                             │
│  ├─ CLI 参数解析 (yargs)                                        │
│  ├─ 创建 Web Worker (worker.ts)                                 │
│  ├─ RPC 客户端 ↔ Worker 通信                                    │
│  ├─ 调用 tui() 启动渲染                                         │
│  └─ Win32 Ctrl+C 防护                                          │
│                           │
│              ┌────────────┼────────────┐                       │
│              │            │            │                       │
│              ▼            ▼            ▼                       │
│         RPC.fetch    RPC.event    RPC.snapshot                 │
│              │            │            │                       │
└──────────────┼────────────┼────────────┼───────────────────────┘
               │            │            │
               ▼            ▼            ▼
┌─────────────────────────────────────────────────────────────────┐
│  Worker 进程 (worker.ts)                                        │
│  ├─ Hono HTTP 服务器 (Server.Default().app.fetch)               │
│  ├─ 自动注入 Basic Auth (getAuthorizationHeader)                 │
│  ├─ GlobalBus → Rpc.emit("global.event") 事件转发               │
│  ├─ Instance 管理 (项目状态)                                    │
│  └─ 升级检查                                                    │
└─────────────────────────────────────────────────────────────────┘
```

### 关键设计决策

- **双进程分离**：渲染进程（主线程）与后端逻辑进程（Worker）分离，RPC 通信。这在 attach 模式下无需 Worker——直接走 HTTP。
- **OpenTUI**：原生 Zig 核心的终端渲染引擎，非 blessed/ink 等纯 JS 方案。60fps、鼠标支持、富文本。
- **Solid.js**：与 React 不同，Solid 使用细粒度响应式（无虚拟 DOM），适合终端渲染的性能敏感场景。
- **SSE 事件驱动**：服务器推送事件而非轮询，16ms 批处理窗口合并渲染。

---

## 二、框架层：OpenTUI + Solid.js

### @opentui/core（原生 Zig 核心）

```typescript
import { createCliRenderer, BoxRenderable, TextRenderable, RGBA } from "@opentui/core"
```

核心渲染原语（Renderable）：

| 原语 | 用途 | 定义位置 |
|------|------|---------|
| `BoxRenderable` | flexbox 布局容器 | `@opentui/core` |
| `TextRenderable` | 文本容器 | `@opentui/core` |
| `ScrollBoxRenderable` | 可滚动区域 | `@opentui/core` |
| `CodeRenderable` | 语法高亮代码 | `@opentui/core` |
| `DiffRenderable` | 统一/拆分 diff 视图 | `@opentui/core` |
| `MarkdownRenderable` | Markdown 渲染 | `@opentui/core` |
| `InputRenderable` | 单行输入 | `@opentui/core` |
| `TextareaRenderable` | 多行输入 | `@opentui/core` |

渲染器配置（`app.tsx:67-88`）：

```typescript
const rendererConfig = {
  externalOutputMode: "passthrough",
  targetFps: 60,
  exitOnCtrlC: false,          // 由 TUI 自己处理 Ctrl+C
  useKittyKeyboard: {},
  useMouse: mouseEnabled,       // 可关闭
  autoFocus: false,
  consoleOptions: {
    keyBindings: [{ name: "y", ctrl: true, action: "copy-selection" }],
  },
}
```

### @opentui/solid（Solid.js 集成）

```typescript
import { render, useKeyboard, useRenderer, useTerminalDimensions } from "@opentui/solid"
```

暴露 Solid 组件（JSX 元素）：
- 布局：`<box>`、`<text>`、`<scrollbox>`、`<ascii_font>`
- 输入：`<input>`、`<textarea>`、`<select>`、`<tab_select>`
- 代码：`<code>`、`<line_number>`、`<diff>`
- 行内修饰：`<span>`、`<strong>`/`<b>`、`<em>`/`<i>`、`<u>`、`<br>`、`<a>`

Hook：
- `useRenderer()` - 获取底层渲染器实例
- `useKeyboard(handler)` - 注册键盘事件
- `useTerminalDimensions()` - 响应式终宽高
- `usePaste(handler)` - 粘贴事件
- `TimeToFirstDraw` - 首帧时间组件

JSX 配置（`tsconfig.json:6`）：

```json
"jsx": "preserve",
"jsxImportSource": "@opentui/solid"
```

### solid-js（响应式引擎）

使用 Solid 的以下机制：
- `createSignal` / `createMemo` / `createEffect` — 响应式图
- `createStore` / `reconcile` / `produce` — 不可变 Store（sync.tsx 核心数据）
- `For` / `Show` / `Switch` / `Match` — 控制流组件
- `ErrorBoundary` — 错误捕获（app.tsx 外层）
- `onMount` / `onCleanup` — 生命周期

---

## 三、入口与启动流程

### 3.1 CLI 命令注册

文件：`src/index.ts`

```typescript
// 第 25-26 行
import { AttachCommand } from "./cli/cmd/tui/attach"
import { TuiThreadCommand } from "./cli/cmd/tui/thread"
// 第 162-163 行
.command(TuiThreadCommand)
.command(AttachCommand)
```

`TuiThreadCommand` 是 `$0` 默认命令——运行 `opencode` 不指定子命令时进入 TUI。

### 3.2 TUI 线程启动（thread.ts）

核心流程（`handler` 函数）：

```
1. win32DisableProcessedInput()          ← 禁用 Ctrl+C 事件（Windows 特化）
2. 解析 --project / --model / --continue 等参数
3. chdir(cwd)                            ← 切换到工作目录
4. new Worker(file, { env })              ← 创建 Worker 进程
5. Rpc.client<typeof rpc>(worker)        ← 建立 RPC 连接
6. await TuiConfig.get()                 ← 加载 TUI 配置
7. 决定传输模式 (internal/external)
8. await tui({ url, config, ...args })   ← 启动 TUI 渲染
9. finally: worker.terminate()           ← 清理
```

**两种传输模式**（`thread.ts:193-203`）：

```typescript
// 内部模式（默认）：所有 HTTP/事件通过 RPC 代理
const transport = external
  ? { url, fetch: undefined, events: undefined }           // 直连 HTTP
  : { url: "http://opencode.internal",                     // RPC 代理
      fetch: createWorkerFetch(client),
      events: createEventSource(client) }
```

### 3.3 Worker 进程（worker.ts）

Worker 暴露 RPC 接口：

```typescript
export const rpc = {
  async fetch(input)        // HTTP 请求代理 → Server.Default().app.fetch()
  snapshot()                // 堆快照
  async server(input)       // 启动 HTTP 服务器（用于外部连接）
  async checkUpgrade(input) // 检查更新
  async reload()            // 重载配置
  async shutdown()          // 关闭
}
```

**事件转发**（`worker.ts:43-45`）：

```typescript
GlobalBus.on("event", (event) => {
  Rpc.emit("global.event", event)   // 服务器总线 → TUI 事件流
})
```

### 3.4 tui() 函数（app.tsx）

TUI 渲染的根函数：

```typescript
export function tui(input: {
  url: string
  args: Args
  config: TuiConfig.Info
  directory?: string
  fetch?: typeof fetch
  headers?: RequestInit["headers"]
  events?: EventSource
}) {
  return new Promise<void>(async (resolve) => {
    // 1. Win32 保护
    // 2. 检测终端背景色 (light/dark)
    // 3. createCliRenderer(rendererConfig)
    // 4. render(组件树, renderer)
    //    15 秒安全超时
    // 5. clearTimeout
  })
}
```

### 3.5 Attach 模式（attach.ts）

无需 Worker，直接通过 HTTP 连接远程服务器：

```
opencode attach http://localhost:4096 --password xyz
```

`attach.ts` 简化了传输——直接使用 `fetch` + `headers`（Basic Auth），无 RPC 层。

---

## 四、组件树与路由

### 4.1 Provider 层级（app.tsx:146-215）

```
ErrorBoundary
  ArgsProvider                      ← CLI 参数 (--continue, --session, --prompt...)
    ExitProvider                    ← 退出生命周期 (onBeforeExit, onExit)
      KVProvider                    ← 键值持久化存储
        ToastProvider               ← 通知消息
          RouteProvider             ← 路由状态 (home/session/plugin)
            TuiConfigProvider       ← TUI 配置上下文
              SDKProvider           ← SDK 客户端 + SSE 事件流
                ProjectProvider     ← 当前项目信息
                  SyncProvider      ← 中央数据存储
                    ThemeProvider    ← 主题系统
                      LocalProvider  ← 本地 UI 状态 (模型/Agent)
                        KeybindProvider    ← 键绑定
                          PromptStashProvider  ← prompt 暂存
                            DialogProvider     ← 对话框栈
                              CommandProvider   ← 命令面板
                                FrecencyProvider  ← 频率排序
                                  PromptHistoryProvider  ← prompt 历史
                                    PromptRefProvider    ← prompt 引用
                                      <App>
```

**App 组件渲染**（`app.tsx:845-883`）：

```tsx
<box width={dimensions().width} height={dimensions().height}>
  <Show when={ready()}>
    <Switch>
      <Match when={route.data.type === "home"}>
        <Home />
      </Match>
      <Match when={route.data.type === "session"}>
        <Session />
      </Match>
    </Switch>
  </Show>
  {plugin()}                                {/* 插件自定义路由 */}
  <TuiPluginRuntime.Slot name="app" />       {/* 应用级插槽 */}
  <StartupLoading ready={ready()} />         {/* 启动加载动画 */}
</box>
```

### 4.2 路由系统（context/route.tsx）

三种路由类型：

```typescript
type Route =
  | { type: "home" }                                          // 首页
  | { type: "session"; sessionID: string }                     // 会话
  | { type: "plugin"; id: string; data?: Record<string, unknown> }  // 插件
```

使用 Solid `createStore` + `reconcile` 实现不可变导航。

### 4.3 Home 路由（routes/home.tsx）

- **Logo 显示**：`<Logo />` 组件
- **Prompt 输入**：支持 `--prompt` 参数自动提交
- **插槽**：home_logo、home_prompt、home_bottom、home_footer（通过插件系统）
- 首次加载时处理 `-c`（继续上一个会话）逻辑

### 4.4 Session 路由（routes/session/index.tsx）

最大文件（2258 行）。核心聊天视图：

**布局**：
```
┌──────────────────────────────────────────────────────┐
│  侧边栏 (sidebar.tsx)                  │ 消息列表     │
│  ├─ workspace 状态                     │ scrollbox    │
│  ├─ LSP 状态                          │ ├─ 用户消息  │
│  ├─ MCP 状态                          │ ├─ AI 消息   │
│  ├─ 文件变更                          │ │  ├─ Text   │
│  └─ TODOs                             │ │  ├─ Tool   │
│                                        │ │  └─ Reas.. │
│                                        │ ├─ 权限提示  │
│                                        │ └─ 问题提示  │
│                                        ├──────────────┤
│                                        │  Prompt 输入  │
│                                        └──────────────┘
│  底部状态栏 (footer.tsx)                               │
└──────────────────────────────────────────────────────┘
```

**消息分派**（`PART_MAPPING`）：

```typescript
const PART_MAPPING = {
  text: TextPart,         // Markdown/文本渲染
  tool: ToolPart,         // 工具调用渲染
  reasoning: ReasoningPart, // AI 推理过程
}
```

**工具渲染器清单**：Bash、Write、Read、Edit、Grep、Glob、WebFetch、CodeSearch、WebSearch、Task、ApplyPatch、TodoWrite、Question、Skill

---

## 五、状态管理

### 5.1 SyncProvider（context/sync.tsx，527 行）

中央数据 Store，使用 Solid `createStore`。核心数据结构：

```typescript
{
  status: "loading" | "partial" | "complete"
  provider: Provider[]
  provider_default: Record<string, string>
  provider_next: ProviderListResponse
  console_state: ConsoleState
  provider_auth: Record<string, ProviderAuthMethod[]>
  agent: Agent[]
  command: Command[]
  permission: { [sessionID]: PermissionRequest[] }
  question: { [sessionID]: QuestionRequest[] }
  config: Config
  session: Session[]
  session_status: { [sessionID]: SessionStatus }
  session_diff: { [sessionID]: FileDiff[] }
  todo: { [sessionID]: Todo[] }
  message: { [sessionID]: Message[] }
  part: { [messageID]: Part[] }
  lsp: LspStatus[]
  mcp: { [key]: McpStatus }
  vcs: VcsInfo
  formatter: FormatterStatus
  // ...
}
```

**Bootstrap 两阶段**（`sync.tsx:356-457`）：
- **Blocking**：providers、agents、config、project（UI 等待）
- **Non-blocking**：sessions、commands、LSP、MCP、VCS、formatters

**事件→Store 映射**（`sync.tsx:114-351`）：订阅 15+ 事件类型，使用 `produce`/`reconcile`/`Binary.search` 高效更新。

### 5.2 LocalProvider（context/local.tsx）

管理**当前 UI 状态**，非服务端数据：
- `local.model` — 当前模型选择（persisted to `model.json`）
- `local.agent` — 当前 Agent 选择
- `local.mcp` — MCP 启用状态

模型选择 fallback 链：Agent 配置 → Config 配置 → 最近使用 → 默认

### 5.3 KVProvider（context/kv.tsx）

轻量级键值存储，持久化到 `~/.opencode/state/tui.json`：

```typescript
// 使用方式
kv.get("sidebar", "auto")           // 侧边栏可见性
kv.get("thinking_visibility", true)  // 推理视图
kv.get("timestamps", "hide")         // 时间戳显示
kv.get("animations_enabled", true)   // 动画
kv.get("diff_wrap_mode", "word")     // diff 换行
kv.get("skipped_version")            // 跳过的更新版本
```

### 5.4 TuiConfigProvider（context/tui-config.tsx）

TUI 配置上下文，从 `tui.json` 加载。

---

## 六、数据流

### 6.1 服务端 → TUI（事件驱动）

```
服务端事件 (Bus.publish)
    │
    ▼
GlobalBus.on("event")        ← worker.ts:43
    │ Rpc.emit("global.event")
    ▼
createEventSource(client)    ← thread.ts:44-52
    │ client.on("global.event", handler)
    ▼
SDKProvider.handleEvent()    ← sdk.tsx:60-72
    │ 16ms 去抖批处理
    ▼
SyncProvider 事件 → produce/reconcile
    │
    ▼
Solid.js 响应式传播 → 重新渲染
```

### 6.2 TUI → 服务端（HTTP API）

```
用户操作 (键盘/鼠标)
    │
    ▼
CommandProvider.trigger() / SDK client 调用
    │
    ├─ 内部模式: createWorkerFetch(client)  → RPC ("fetch", request)
    │                                           → worker.rpc.fetch()
    │                                           → Server.Default().app.fetch()
    │
    └─ 外部模式: fetch(url, options)         → HTTP → Server
```

### 6.3 流式 AI 输出

AI 推理/文字/工具的流式更新通过事件实现：

| 事件 | 触发时机 | Store 更新 |
|------|---------|-----------|
| `message.part.delta` | AI 逐 token 生成 | `Binary.search` 追加到 text |
| `message.part.updated` | Part 状态变更 | `produce` 更新 part |
| `message.updated` | 消息状态变更 | `produce` 更新 message |
| `session.status` | 会话状态（idle/working） | `session_status` 更新 |

**ReasoningPart**（`session/index.tsx:1424-1455`）：配置了 `showThinking` 开关控制是否显示 AI 推理过程。

**TextPart**：支持 `streaming={true}` 属性实现打字机效果。

---

## 七、事件系统

### 7.1 TUI 内部事件（event.ts）

```typescript
export const TuiEvent = {
  PromptAppend:    BusEvent.define("tui.prompt.append", ...),    // 追加 prompt
  CommandExecute:  BusEvent.define("tui.command.execute", ...),  // 执行命令
  ToastShow:       BusEvent.define("tui.toast.show", ...),       // 显示通知
  SessionSelect:   BusEvent.define("tui.session.select", ...),   // 选择会话
}
```

### 7.2 事件消费（app.tsx:754-794）

```typescript
event.on(TuiEvent.CommandExecute.type, (evt) => command.trigger(evt.properties.command))
event.on(TuiEvent.ToastShow.type, (evt) => toast.show({ ... }))
event.on(TuiEvent.SessionSelect.type, (evt) => route.navigate({ type: "session", ... }))
event.on("session.deleted", ...)
event.on("session.error", ...)
event.on("installation.update-available", ...)
```

### 7.3 事件订阅（context/event.ts）

TUI 事件订阅器按 workspace/directory 过滤：

```typescript
function subscribe(handler) {
  return sdk.event.on("event", (event) => {
    if (event.payload.type === "sync") return                // 跳过 sync 事件
    if (event.directory === "global") return handler(...)    // 全局事件
    if (workspace) { ... }                                    // workspace 过滤
    if (event.directory === currentDirectory) return handler(...) // 目录匹配
  })
}
```

---

## 八、插件系统

### 8.1 架构

插件运行时位于 `plugin/runtime.ts`（1030 行），管理插件的完整生命周期。

**插件类型：**

```
内置插件 (INTERNAL_TUI_PLUGINS)      外部插件 (npm/本地文件)
        │                                    │
        ▼                                    ▼
    static import                     PluginLoader.loadExternal()
        │                                    │
        ▼                                    ▼
    PluginEntry { id, module, meta, enabled, scope }
        │
        ▼
    activatePluginEntry() → plugin(api, options, meta)
```

### 8.2 内置插件（internal.ts）

| 插件 | ID | 功能 |
|------|-----|------|
| HomeFooter | `home/footer` | 首页底部 |
| HomeTips | `home/tips` | 首页提示 |
| SidebarContext | `sidebar/context` | 侧边栏上下文 |
| SidebarMcp | `sidebar/mcp` | MCP 状态面板 |
| SidebarLsp | `sidebar/lsp` | LSP 状态面板 |
| SidebarTodo | `sidebar/todo` | TODO 面板 |
| SidebarFiles | `sidebar/files` | 文件变更面板 |
| SidebarFooter | `sidebar/footer` | 侧边栏底部 |
| PluginManager | `system/plugins` | 插件管理 |

### 8.3 Slot 系统（plugin/slots.tsx）

插件通过 Slot 系统向固定位置注入 UI：

```
app             — 应用级（根容器内）
home_logo       — 首页 Logo 区域
home_prompt     — 首页 Prompt 区域
home_prompt_right — 首页 Prompt 右侧
home_bottom     — 首页底部
home_footer     — 首页页脚
sidebar_title   — 侧边栏标题
sidebar_content — 侧边栏内容
sidebar_footer  — 侧边栏页脚
session_prompt  — 会话 Prompt 区域
session_prompt_right — 会话 Prompt 右侧
```

### 8.4 插件 API（plugin/api.tsx）

插件接收的 `TuiPluginApi` 接口：

```typescript
interface TuiPluginApi {
  app                       // 版本信息
  command                   // 命令注册/触发
  route                     // 路由注册/导航
  ui: { Dialog, DialogAlert, DialogConfirm, DialogPrompt, DialogSelect,
        Slot, Prompt, toast, dialog }
  keybind                   // 键绑定匹配/打印/创建
  tuiConfig                 // TUI 配置（只读）
  kv                        // 键值存储
  state                     // 服务端数据状态
  theme                     // 主题系统
  client                    // SDK 客户端（完全权限）
  event                     // 事件订阅
  renderer                  // OpenTUI 渲染器
  slots                     // Slot 注册
  plugins                   // 插件管理（列表/激活/安装）
  lifecycle                 // AbortSignal + onDispose
}
```

---

## 九、配置加载

### 9.1 TuiConfig Service（config/tui.ts）

Effect-based Service，多层配置合并：

**优先级从低到高：**
1. 全局配置目录 `tui.json`
2. `OPENCODE_TUI_CONFIG` 环境变量
3. 项目 tui 配置文件（root-first——根目录先加载，子目录覆盖）
4. `.opencode/tui.json`（从 cwd 向上遍历目录树）

**合并策略**：`mergeDeep`（remeda）+ 插件去重 + 键绑定合并

### 9.2 Schema（config/tui-schema.ts）

```typescript
export const TuiInfo = z.object({
  $schema: z.string().optional(),
  theme: z.string().optional(),               // 主题名称
  keybinds: KeybindOverride.optional(),        // 键绑定覆盖
  plugin: ConfigPlugin.Spec.zod.array().optional(),  // 插件列表
  plugin_enabled: z.record(z.string(), z.boolean()).optional(),
  scroll_speed: z.number().min(0.001).optional(),
  scroll_acceleration: z.object({...}).optional(),
  diff_style: z.enum(["auto", "stacked"]).optional(),
  mouse: z.boolean().optional(),
  show_thinking: z.boolean().optional(),
})
```

### 9.3 Win32 特殊处理（config/tui.ts:134-141）

```typescript
if (process.platform === "win32") {
  keybinds.terminal_suspend = "none"           // 无 POSIX 挂起
  keybinds.input_undo ??= unique([
    "ctrl+z",                                   // Ctrl+Z 改为撤销
    ...ConfigKeybinds.Keybinds.shape.input_undo.parse(undefined).split(","),
  ]).join(",")
}
```

---

## 十、键绑定系统

### 10.1 定义（config/keybinds.ts）

65+ 个键绑定，使用 Effect Schema 定义。按类别分：

| 类别 | 示例键绑定 |
|------|-----------|
| 导航 | `session.page.up/down`, `session.line.up/down`, `session.half.page.up/down`, `session.first/last` |
| 编辑 | `input.backspace`, `input.delete`, `input.undo/redo`, `input.cut/copy/paste` |
| 会话 | `session.new/list/share/fork/compact/interrupt` |
| 模型/Agent | `model_cycle_recent`, `agent_cycle`, `variant_cycle` |
| 系统 | `app.exit`, `theme_list`, `status_view`, `help.show`, `terminal_suspend` |

### 10.2 处理（context/keybind.tsx）

- 键序列支持 `<leader>`（默认 Ctrl+X），2 秒超时
- 可覆盖（通过 `tui.json` 的 `keybinds` 字段）
- 提供 `match()`/`print()`/`parse()` 方法

### 10.3 外部控制（server/routes/instance/tui.ts）

通过 HTTP API 触发 TUI 命令：

```typescript
POST /tui/execute-command → Bus.publish(TuiEvent.CommandExecute, { command: "session.new" })
POST /tui/open-help        → Bus.publish(TuiEvent.CommandExecute, { command: "help.show" })
POST /tui/open-sessions    → Bus.publish(TuiEvent.CommandExecute, { command: "session.list" })
POST /tui/show-toast       → Bus.publish(TuiEvent.ToastShow, { message, variant })
POST /tui/select-session   → Bus.publish(TuiEvent.SessionSelect, { sessionID })
POST /tui/append-prompt    → Bus.publish(TuiEvent.PromptAppend, { text })
POST /tui/submit-prompt    → Bus.publish(TuiEvent.CommandExecute, { command: "prompt.submit" })
```

---

## 十一、关键文件索引

### TUI 核心

| 文件 | 行数 | 职责 |
|------|------|------|
| `src/index.ts` | 250 | CLI 主入口，注册所有命令 |
| `src/cli/cmd/tui/thread.ts` | 239 | TUI 线程入口，Worker 管理，RPC 建立 |
| `src/cli/cmd/tui/worker.ts` | 105 | Worker 进程，HTTP 服务器代理，事件转发 |
| `src/cli/cmd/tui/attach.ts` | 83 | 远程连接模式 |
| `src/cli/cmd/tui/app.tsx` | 884 | TUI 根组件，Provider 树，渲染入口 |
| `src/cli/cmd/tui/layer.ts` | 6 | Effect 层组合 |
| `src/cli/cmd/tui/win32.ts` | 130 | Windows 控制台模式管理 |
| `src/cli/cmd/tui/event.ts` | 48 | TUI 事件定义 |

### 路由

| 文件 | 行数 | 职责 |
|------|------|------|
| `src/cli/cmd/tui/routes/home.tsx` | 90 | 首页路由 |
| `src/cli/cmd/tui/routes/session/index.tsx` | 2258 | 会话路由（主聊天视图） |
| `src/cli/cmd/tui/routes/session/sidebar.tsx` | - | 侧边栏 |
| `src/cli/cmd/tui/routes/session/footer.tsx` | - | 底部状态栏 |
| `src/cli/cmd/tui/routes/session/permission.tsx` | - | 权限提示 |
| `src/cli/cmd/tui/routes/session/question.tsx` | - | 问题提示 |
| `src/cli/cmd/tui/routes/session/subagent-footer.tsx` | - | 子 Agent 状态栏 |

### 上下文（状态管理）

| 文件 | 行数 | 职责 |
|------|------|------|
| `src/cli/cmd/tui/context/sdk.tsx` | 142 | SDK 客户端 + SSE 事件流 |
| `src/cli/cmd/tui/context/sync.tsx` | 527 | 中央数据 Store |
| `src/cli/cmd/tui/context/event.ts` | 45 | 事件订阅（按 workspace 过滤） |
| `src/cli/cmd/tui/context/route.tsx` | 52 | 路由状态 |
| `src/cli/cmd/tui/context/local.tsx` | ~400 | 本地 UI 状态 |
| `src/cli/cmd/tui/context/kv.tsx` | - | 键值持久化 |
| `src/cli/cmd/tui/context/keybind.tsx` | - | 键绑定处理 |
| `src/cli/cmd/tui/context/theme.tsx` | - | 主题系统 |
| `src/cli/cmd/tui/context/tui-config.tsx` | - | TUI 配置上下文 |
| `src/cli/cmd/tui/context/project.tsx` | - | 项目上下文 |

### 配置

| 文件 | 行数 | 职责 |
|------|------|------|
| `src/cli/cmd/tui/config/tui.ts` | 219 | 配置加载 Service |
| `src/cli/cmd/tui/config/tui-schema.ts` | 39 | Zod Schema |
| `src/cli/cmd/tui/config/tui-migrate.ts` | - | 配置迁移 |
| `src/cli/cmd/tui/config/cwd.ts` | - | 当前工作目录 |

### 插件系统

| 文件 | 行数 | 职责 |
|------|------|------|
| `src/cli/cmd/tui/plugin/runtime.ts` | 1030 | 插件运行时（加载/激活/生命周期） |
| `src/cli/cmd/tui/plugin/api.tsx` | 390 | 插件 API 桥接 |
| `src/cli/cmd/tui/plugin/slots.tsx` | - | Slot 系统 |
| `src/cli/cmd/tui/plugin/index.ts` | 3 | 桶导出 |
| `src/cli/cmd/tui/plugin/internal.ts` | 27 | 内置插件注册 |
| `src/cli/cmd/tui/feature-plugins/` | - | 内置插件实现 |

### 工具

| 文件 | 行数 | 职责 |
|------|------|------|
| `src/cli/cmd/tui/util/terminal.ts` | 135 | 终端颜色查询（OSC 转义） |
| `src/cli/cmd/tui/util/editor.ts` | - | 编辑器集成 |
| `src/cli/cmd/tui/util/clipboard.ts` | - | 剪贴板 |
| `src/cli/cmd/tui/util/scroll.ts` | - | 滚动加速 |
| `src/cli/cmd/tui/util/selection.ts` | - | 选择复制 |
| `src/cli/cmd/tui/util/model.ts` | - | Provider 模型索引 |
| `src/cli/cmd/tui/util/transcript.ts` | - | 对话导出 |
| `src/cli/cmd/tui/util/signal.ts` | - | 信号处理 |
| `src/cli/cmd/tui/util/revert-diff.ts` | - | diff 回滚 |

### 服务端 TUI 路由

| 文件 | 行数 | 职责 |
|------|------|------|
| `src/server/routes/instance/tui.ts` | 384 | TUI HTTP 控制 API |

### 外部接口定义

| 文件 | 行数 | 职责 |
|------|------|------|
| `packages/plugin/src/tui.ts` | 501 | 插件 TUI API 类型定义 |
| `packages/opencode/tsconfig.json` | 24 | `@tui/*` 路径别名 |

---

## 十二、破坏性改动影响分析

基于以上分析，以下是最脆弱的依赖关系——破坏性改动最容易导致 TUI 无法进入的环节：

### 高危区

1. **Worker 启动失败**（`thread.ts:138`）
   - `new Worker(file, { env })` — 如果 Worker 入口文件路径错误、环境变量异常或构建输出缺失，整个 TUI 无法启动。
   - 检查：`OPENCODE_WORKER_PATH`、`target()` 函数返回的路径

2. **RPC 握手失败**（`thread.ts:151` → `worker.ts`）
   - `Rpc.client<typeof rpc>(worker)` — 如果 Worker 内部初始化失败（`rpc.listen(rpc)` 未执行），TUI 卡死在调用 `client.call(...)` 处。
   - 检查：Worker 的 `ensureProcessMetadata("worker")`、`Log.init()`、`Heap.start()` 是否有异常

3. **Server 启动异常**（`worker.ts:73-77`）
   - `Server.listen(input)` — 端口占用、Hono 路由初始化失败都会让 `client.call("server", ...)` 返回错误。
   - 检查：`process.env.OPENCODE_SERVER_PORT`、防火墙

4. **SDK 客户端创建失败**（`sdk.tsx:24-32`）
   - `createOpencodeClient({ baseUrl, fetch, ... })` — 如果 baseUrl 不合法或 fetch 函数异常，所有 API 调用失败。
   - 特别是 internal 模式中 `createWorkerFetch(client)` 创建的 fetch 函数如果 RPC 不通，调用直接挂死。

5. **渲染器创建失败**（`app.tsx:138`）
   - `createCliRenderer(rendererConfig)` — OpenTUI 原生模块加载失败（Zig 动态库缺失或不兼容）会直接抛异常，15 秒安全超时后退出。
   - 检查：`@opentui/core` 原生模块编译是否正确（平台相关）

6. **Sync 初始化死锁**（`sync.tsx:356-457`）
   - 同步第一阶段（blocking phase）如果 provider/agent/config 加载超时或返回异常，store 会卡在 loading 状态，UI 停留在启动加载界面不动。
   - 检查：服务端 `/api/config`、`/api/provider` 路由是否正常

7. **插件加载崩溃**（`app.tsx:259-268`）
   - `TuiPluginRuntime.init({ api, config })` — 如果某个插件的 `tui()` 函数抛出未捕获异常，整个 `init()` 失败，`ready` 永远为 false，UI 永远显示 `<StartupLoading ready={false} />`。
   - 检查：内置插件（`INTERNAL_TUI_PLUGINS`）和外部插件配置

### 排查建议

如果 TUI 无法进入，按以下顺序排查：

1. **检查 Worker 进程是否启动** → 有无 `ensureProcessMetadata("worker")` 日志
2. **检查 RPC 连接** → `Rpc.listen(rpc)` 是否正常执行
3. **检查 Server 启动** → 端口监听是否成功
4. **检查 SDK 客户端** → `createOpencodeClient` fetch/headers 是否正常
5. **检查渲染器创建** → `createCliRenderer` 是否成功（最容易漏报的平台兼容性问题）
6. **检查插件加载** → 控制台有无 `[tui.plugin]` 错误日志
7. **检查 15 秒安全超时** → 有无 `[TUI] render timed out (15s), exiting` 输出
