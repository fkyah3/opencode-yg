# TUI 调试总结与根因

> 2026-04-28 | 耗时约 4 小时 | 级别：历史级别 BUG 追查
> 从 `opencode --tui` 崩溃到默认 headless 的完整推理链

---

## 一句话精华

**TUI 在 Windows 上挂了，但原因不是 "上游 Zig 问题"——而是六层故障的级联崩溃。每层单独看都不致命，合起来就是完美的末日。** 最痛的不是最后一层的 DLL 崩溃，而是第一层的 `bunfig.toml` 注释掉了 preload。

---

## 全景图：六层故障的级联

```
第1层  bunfig.toml 注释 preload
    ↓
第2层  Solid JSX 插件未注册 → jsx: "preserve" 下 JSX 未转换
    ↓
第3层  jsx-runtime 导出指向 .d.ts (重复 key 覆盖) → Bun 找不到运行时
    ↓
第4层  babel-preset-solid + moduleName + generate: "universal" 组合 BUG
        → 内建元素 (<text>, <box>) 走 createComponent("text") 而非 createElement("text")
    ↓
第5层  createCliRenderer → opentui.dll → 原生 FFI 崩溃 (Windows TTY)
    ↓
第6层  stub renderer 无动画循环 + 无 Yoga 布局驱动 → Solid 渲染树挂载但屏幕无输出
```

每一层都足以让 TUI 不进。第 1-4 层是独立可控问题。第 5-6 层是上游依赖问题。

---

## 完整排查链（6 层，细节归档）

### 第 1 层 — 编译配置层

**触发**：`opencode --headless` 正常，`opencode`（默认 TUI）崩溃

**线索**：
- `TuiConfig context must be used within a context provider` 错误
- TuiConfigProvider 函数从未被执行（`[DIAG-PROVIDER]` 未出现）
- 非 TTY 下（bash tool）TUI 渲染完全正常

**交付**：怀疑组件树未构建，排查 JSX 运行时

### 第 2 层 — 权限层（假阳性）

**触发**：第一次成功 `createCliRenderer` 后 TUI 进入交替屏

**线索**：AuthMiddleware 可能拦截了内部请求，但验证后发现 localhost 跳过 basicAuth

**结果**：❌ 假阳性，崩溃不变

### 第 3 层 — 插件层（假阳性）

**触发**：第 1 层诊断确认 `TuiConfig context` 错误

**线索**：怀疑 omo/MC 插件污染上下文，删除后崩溃仍存在

**结果**：❌ 假阳性，崩溃不变

### 第 4 层 — 原生 DLL 层（初期判断）

**触发**：`opentui.dll` 在真实 TTY 下 `new CliRenderer()` 原生崩溃

**线索**：
- `setClearOnShutdown` 和 `setTerminalEnvVar` 的 FFI 调用在 TTY 路径触发 panic
- `createRenderer()` 返回有效指针（`ptr=1956325425152`）
- 崩溃点：JavaScript `try/catch` 无法捕获的原生异常（Bun 恢复后报 `safetyTimer is not defined` 误导性错误）

**结果**：打补丁绕过——用 `Object.setPrototypeOf` 创建 stub CliRenderer

**核心发现**：第 4 层的 DLL 崩溃是独立问题，但不是 TUI 不进的根本原因。TUI 不进的真正根因在 JSX 编译层（第 1-3 层）。

### 第 5 层 — JSX 运行时层

**触发**：恢复 `bunfig.toml` 的 preload 后，`jsxDEV` 正常触发

**新错误**：`Comp is not a function. (In 'Comp(props || {})', 'Comp' is "text")`

**根因**：
- `babel-preset-solid` + `moduleName: "@opentui/solid"` + `generate: "universal"` 组合导致：
  - 函数组件 ✅ → `createComponent(TuiConfigProvider, props)`
  - 内建元素 ❌ → `createComponent("text", props)` **而非** `createElement("text", props)`
- `generate: "universal"` 本应区分函数/字符串，但 `moduleName` 设置了自定义导入路径后，preset 的 createElement 路由被 `createComponent` 覆盖

**修复**：在 `jsx-runtime.js` 的 `jsxDEV` 中添加字符串类型判断——遇到字符串 type 时调用 `createElement` 而非 `createComponent`

**交付**：组件树正常挂载，Solid _render 成功

### 第 6 层 — 渲染输出层

**触发**：`_render` 成功，mountSolidRoot 完成，无崩溃

**现象**：TUI 闪现后屏幕无输出（Solid 树挂载但没绘制）

**根因**：
- stub CliRenderer 没有动画循环（`setFrameCallback` 存储了回调但不触发）
- 没有 Yoga 布局引擎（layout 在 native 层）
- 没有 ANSI terminal 输出（render 在 native 层）
- 屏幕没有任何视觉输出

**结论**：stub renderer 只能绕过崩溃，不能真正渲染。要看到画面必须拥有完整的 native renderer。

---

## 关键发现汇总

| # | 发现 | 类型 | 可修复 |
|:-:|:-----|:-----|:------:|
| 1 | `bunfig.toml` preload 注释 → Solid JSX 插件未注册 | 配置错误 | ✅ |
| 2 | `package.json` 导出 `.d.ts` 重复 key 覆盖 `.js` 路由 | 配置错误 | ✅ |
| 3 | `babel-preset-solid` 的 `moduleName` 覆盖 `generate: "universal"` 的内建元素路由 | babel-preset bug | ✅ 运行时兜底 |
| 4 | `opentui.dll` 在真实 Windows TTY 下 FFI 崩溃 | 上游 Zig 问题 | ⛔ 依赖 Bun 修复 |
| 5 | stub renderer 绕过崩溃但无渲染输出 | 代价 | ⛔ 无 native=无画面 |
| 6 | 非 TTY 下（bash tool、--headless）一切正常 | 环境差异 | N/A |

---

## 经验教训（方法论）

### 1. 不要信"上游问题"——先证明它

最初说 "上游 Zig 有问题" 是未经证实的猜测。实际上 6 层故障中只有 1 层是上游问题，其他 5 层都在我们可控范围内。在排除其他 5 层之前就跳到"上游问题"的判断，浪费了非常大的精力。

经验：**任何"外部依赖有问题"的猜测，必须在前几层的证据链彻底排除所有内部问题后再做。**

### 2. 分层排查法的价值

6 层故障逐个排查，从应用层 → JSX 编译层 → 运行时层 → 原生层。每一层都明确了交付物：
- 第 1 层：TuiConfig context 错误 ✅
- 第 2 层：非 TTY 正常，TTY 崩溃 ✅
- 第 3 层：preload 恢复后 jsxDEV 触发 ✅
- 第 4 层：createComponent("text", ...) 内建元素崩溃 ✅
- 第 5 层：DLL 原生 FFI 崩溃 ✅
- 第 6 层：无渲染输出 ✅

经验：**不加诊断直接猜"哪里有问题"是效率最低的方式。每一层加 console.error 定点打标记，让执行路径自己说话。**

### 3. 诊断输出去哪了很重要

整场调试最大的障碍不是找不到问题，而是看不到输出。`console.error` 写 stderr，`bun run` 默认只显示 stdout。`--print-logs` 只影响 Log 系统，不影响 `console.error`。大量诊断输出在进程快速退出时被终端缓冲吞掉。

经验：**把诊断写到 file 或用 `process.stderr.write` 避免缓冲丢失。**

### 4. 破坏性改动留清单

从投入时间看，如果我们的「极端破坏性改动」有清单，第一时间就能检查到 `bunfig.toml` preload 被注释了。最痛的不是 DLL 崩，是第一层的 preload 注释。

经验：**破坏性改动的清单比改代码本身更重要。**

### 5. 多 Agent 协作的效率与开销

多个 AI Agent 协作排查同一问题时，信息同步成本非常高。每次「另一边看了你的回复说……」的沟通链路增加了 30%+ 的延迟。

经验：**多 Agent 排查问题应该在同一文档/回话中实时协作，或者指定唯一一个 AI 负责诊断，另一个只负责实施。**

---

## TUI 框架替换建议

既然决定替换 OpenTUI，以下是基于本次调试的关键约束：

### 核心痛点在最终报告中

| 约束 | 必须满足 | 原因 |
|:-----|:--------:|:-----|
| 纯 JS 运行时 | ✅ | 不再依赖 native（Zig/Rust/C）模块 |
| Windows TTY 兼容 | ✅ | Linux TUI 框架在 Windows 上全是坑 |
| Solid.js + JSX 支持 | ✅ | 现有 TUI 组件基于 Solid 的责任模式 |
| 不依赖 preload/bun-plugin | ✅ | preload 是本次事件主因，减少隐式依赖 |
| 组件级复用 | ✅ | 已有大量 TUI 组件（dialog、router、command 等） |

### 候选框架快速评估

| 框架 | 架构 | 纯 JS？ | Windows？ | Solid？ | 评估 |
|:-----|:-----|:-------:|:---------:|:-------:|:----|
| **Ink** | React + Yoga | ✅ | ✅ | ❌ React | 成熟，但重写全部组件（换 React） |
| **Blessed** | curses 封装 | ✅ | ⚠️ 较老 | ❌ | 维护状态不明 |
| **NCCA** | Node.js Canvas | ✅ | ✅ | ❌ | 非终端渲染 |
| **自建** | 纯 JS + Yoga | ✅ | ✅ | ✅ Solid | 可控但工作量大 |

### 推荐路径

1. **短期（现在）**：默认 headless 已跑通，不影响开发
2. **中期（0.5-1 周）**：调研 Ink 生态，验证组件模型可移植性。关键看 `<box>`/`<text>` 等内建元素映射到 Ink 的 `<Box>`/`<Text>`
3. **决策点**：如果组件树移植复杂度 < 2000 行改动 → 换 Ink。如果 > 5000 行 → 考虑自建。
4. **长期**：设计一个框架无关的 TUI 内核层，以后换框架不重写业务组件

---

## 参考

- `anomalyco/opentui#152` — Windows 综合追踪
- `anomalyco/opentui#940` — DllMain static init invalid enum value panic
- `anomalyco/opentui#933` — XTVERSION 顺序导致终端卡顿
- `specs/当前状态-已完成与待办.md`
- `specs/tui实现分析与模块关系.md`
