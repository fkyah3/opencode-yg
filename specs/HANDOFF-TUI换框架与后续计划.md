# HANDOFF — TUI 换框架与后续计划

> 写于 2026-04-28，当前分支 `main`
> 下一阶段工作从本文件开始

---

## 一、TUI 现状

`opencode --tui` 崩溃，根因在 `@opentui/core` 的 Windows TTY 初始化。
排查全链路已归档：`specs/tui-调试总结与根因.md`

**当前方案：默认 headless**
- `opencode` → 启动 headless server（端口输出到终端）
- `opencode --tui` → 保留但不工作（等上游修复）
- `feat/tui-replacement` 分支已建，用于测试替代方案

**替代方案评估（未决定）：**

| 方案 | 代价 | 说明 |
|:----|:----|:-----|
| **Ink（React）** | 大 — 全部 40+ 组件重写 | Star 28k+，成熟 |
| **Cascade（@opentui fork）** | 中 — API 兼容 | 社区维护，规模小 |
| **Rubi** | 巨大 — 预研 | 纯 Bun/Zig，pre-alpha |
| **保持 headless** | 小 — 继续优化 CLI 体验 | 最务实 |

---

## 二、提示词工作（下一阶段重点）

愚公提示词已完成大框架（212 行，5 条哲学，0 条机械约束），但还有这些没做：

**已完成：**
- ✅ 7 个 omo agent 加上"请用中文语言思维方式"
- ✅ 5 条经典原文替换口语（谋定而后动、知人者智、工欲善其事、未虑胜先虑败、知行合一）
- ✅ 砍掉 plan/build mode + max-steps 锁死逻辑
- ✅ 工具汉化 T0（6 处错误消息）
- ✅ `fkyah3_dev` → `specs` 展平，文档体系建立

**待完成：**
- ⬜ 9 个不常用的 omo agent 是否也要加"中文思维"（已延后）
- ⬜ 代码全量注释汉化（P3，记入记忆了）
- ⬜ 验证 skill 系统能否正常实装
- ⬜ 设计全新的 prompt 体系（5 月 5 日目标）

---

## 三、headless 使用方法

```powershell
# 启动 headless server（新终端）
opencode

# 终端显示：
# opencode server listening on http://localhost:PORT
# password: xxxx

# 在同一台机器，浏览器打开 http://localhost:PORT
# 即可看到 Web 界面，和 TUI 完全一样的功能
```

**注意事项：**
- 首次启动时 server 打印端口和密码，用来在浏览器登录
- 需要和新 AI 交互时在当前这个终端里直接打字就行（AI 在 opencode 里）
- 子 agent 调用（`task()`）在 headless 下也正常工作

---

## 四、配置状态

| 文件 | 状态 |
|:-----|:-----|
| `bunfig.toml` — preload 已恢复 | ✅ |
| `opencode.json` — omo 已移回 MC 已移回 | ⬜ **需要用户加回** |
| `@opentui/solid/index.js` — createComponent 包装已应用 | ✅ |
| `thread.ts` — 默认 headless（--tui flag） | ✅ |
| `app.tsx` — setTimeout 安全兜底 | ✅ |
| `middleware.ts` — localhost 跳过 basicAuth | ⬜ 注释掉了，需要恢复 |

---

## 五、需要衔接的事项

1. **恢复 omo 和 MC 插件**（当前被注释了）
2. **恢复 middleware.ts 的 localhost 跳过**（当前被注释）
3. **在 `feat/tui-replacement` 分支上继续测试替代 TUI 方案**
4. **prompt 深化设计**（5 月 5 日目标）

---

## 六、关键文件索引

| 文件 | 内容 |
|:-----|:-----|
| `specs/交接文档-愚公开发记录.md` | 全量交接 |
| `specs/tui-调试总结与根因.md` | TUI 全链路排查记录 |
| `specs/HANDOFF-当前工作.md` | 未验证项清单 |
| `specs/分支-feat_tui-replacement.md` | 换框架分支说明 |
| `specs/当前状态-已完成与待办.md` | 进度清单 |
| `specs/工具输出语言漂移分析.md` | 实验猜想 |
| `specs/计划-砍掉plan_build_mode.md` | plan/build mode 方案 |
| `specs/omo运行机制研究报告.md` | omo 架构分析 |
| `specs/omo架构改进建议书.md` | 6 个改进点 |
