# HANDOFF — 当前工作状态

> 2026-04-27
> 注意：大量改动已提交但**未验证**。启动可能异常。
> 此文档只列未验证项。已完成项见 `specs/当前状态-已完成与待办.md`。

---

## 启动障碍检查（优先级最高）

### ❌ 未验证 — opencode.cmd 路径
改了 `C:\Users\13248\bin\opencode.cmd` 中的路径为 `E:\agent\opencode-yg`，但**未实际启动测试**。
- 如果改错了 → 直接启动失败
- 如果 `bun` 或 `packages/opencode/src/index.ts` 有问题 → 也能启动但立刻报错

### ❌ 未验证 — plugins/ 加载路径
`opencode.json` 中插件路径指向 `plugins/oh-my-openagent`，相对路径依赖工作目录。如果启动目录不对 → 插件加载失败。

### ❌ 未验证 — bun 版本兼容
当前 `bun 1.3.11`，之前在新路径下产生过 `Object is not a constructor` 错误。已清 `.bun` 缓存 + 重装依赖，但**未验证修复效果**。

### ❌ 未验证 — plan.txt / build-switch.txt / max-steps.txt 已删除
三个文件已被删除。opencode 启动时静态 import 这三个文件，如果 import 链上还有引用 → **启动即崩**。
- **风险最高**：`prompt.ts:20-22` 的 import 语句。需要确认已删除或改为可选 fallback。
- 当前 commit `8d5968bda` 中，这三个文件的删除已提交。如果在 `prompt.ts` 中仍有 `import ... from "...prompt/plan.txt"` → 启动崩溃。

### ❌ 未验证 — session-ses_2423.md 已移除
无关会话文件已 `git rm`，但工作目录中可能残留。

---

## 功能验证缺失

### ❌ 未验证 — 愚公提示词实际效果
- 已改 `deepseek.ts` 并 `bun run build`（dist 已生成），但**未重启 opencode 验证**
- `dist/index.js` 是否真的包含了 212 行新 prompt？需要确认
- 重启后第一轮回复应该自称"愚公"、以中文回答

### ❌ 未验证 — 子 agent spawn
- `plugin/index.ts` + `server/middleware.ts` 的 AuthMiddleware 修复已提交，但**未在新路径下验证**
- 执行 `task()` 应该能正常 spawn 子 agent，不再报 `Unauthorized`

### ❌ 未验证 — 子 agent 中文思维
- 7 个 agent 已改 prompt（硬约束→中文思维），但**未实际调用它们验证**
- 调用 `task(subagent_type="oracle")` 应显示中文思考

### ❌ 未验证 — T0 工具汉化
- 6 处错误消息已中文化，但**未触发这些错误场景验证**
- 可验证：给一个无效的参数看是否显示中文错误

### ❌ 未验证 — 工具调用语言漂移
- 猜想已记录到 `specs/工具输出语言漂移分析.md`
- 工具输出（bash、grep、read）是否保持中文回复？需要长对话测试

### ❌ 未验证 — magic-context
- `magic-context.jsonc` 配置了 historian + dreamer，但 `execute_threshold_percentage` 被删回默认值
- 启动后是否还有配置 warning？需要检查

---

## 未完成工作

### ⬜ 砍 plan/build mode
- 文档已写（`specs/计划-砍掉plan_build_mode.md`），代码**未改**
- 目标：删除 `prompt.ts` 中的 plan/build switch + `agent.ts` 中 plan agent 定义 + 删除权限类型
- 影响：20 处要改，如果先启动了但没改，plan/build 模式会报错

### ⬜ magic-context prompt 汉化
- 已定位 historian prompt 文件（`agents/compartment-prompt.ts`），**未改**
- 优先级 T1

### ⬜ omo skill 验证
- 未开始

### ⬜ 提示词体系重设计
- 计划 5月5 目标，未开始

---

## 如果启动失败，排障路径

```
1. git status → 确认工作区干净
2. bun --version → 确认 bun 1.3.11
3. bun install → 重新安装依赖
4. 检查 prompt.ts:20-22 是否删了 plan/build-switch/max-steps 的 import
5. 如果 import 残留 → git checkout origin/main -- packages/opencode/src/session/prompt/ 恢复三个文件
6. 启动 opencode
```

## 成功标准

- [ ] 启动无报错
- [ ] 自称"愚公"，中文回复
- [ ] `task()` 能正常 spawn
- [ ] 工具错误显示中文
