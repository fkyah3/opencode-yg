# 未执行改动方案 — 砍掉 plan/build mode

> 记录于 2026-04-27，已讨论确认但未执行
> 
> **改动理由**：西方 agent 框架的"模式切换"（plan 模式 / build 模式）本质上是"不信任 agent 能自己判断该做什么"。这与愚公哲学矛盾——愚公始终是愚公，不需要切换身份。
> 
> 中国哲学支撑：**理一分殊**——道理只有一个（5 条哲学），但应用在不同场景表现出不同形态。经（不变）与权（变通）的关系。

---

## 方案摘要

取消 plan/build 模式，回归同一个 agent。愚公 5 条哲学已涵盖所有场景：
- **谋定而后动** — 需要规划时自然会先想再干，不需要外部"plan 模式"强制
- **工欲善其事** — 需要执行时自然会调动工具，不需要"build 模式"授权
- **过犹不及** — 步骤耗尽了自然会告知用户，不需要锁死工具

## 改动范围

### Phase 1 — 核心代码（3 个文件）

| 文件 | 改动 | 行数 |
|:----|:-----|:----:|
| `prompt.ts:20-21` | 删 `import PROMPT_PLAN`、`BUILD_SWITCH` | 2 行 |
| `prompt.ts:219-290+` | 删整个 `insertReminders` 函数（plan/build 注入） | ~70 行 |
| `prompt.ts:1403` | 删 `insertReminders()` 调用 | 1 行 |
| `agent.ts:108-150` | 删 `name:"plan"` agent 定义 | ~25 行 |
| `agent.ts:291` | 改 `default_agent` 回退 | 1 行 |

### Phase 2 — 权限层

| 文件 | 改动 |
|:----|:-----|
| `permission.ts` | 删 `plan_enter` / `plan_exit` 权限类型 |

### Phase 3 — 物理文件

| 文件 | 操作 |
|:-----|:-----|
| `session/prompt/plan.txt` | 删 |
| `session/prompt/build-switch.txt` | 删 |
| `session/prompt/max-steps.txt` | 重写（不锁工具，只提示） |

### Phase 4 — UI 层

| 范围 | 改动 |
|:-----|:-----|
| command/ | 删 plan/build 模式切换命令 |
| session/status 相关 | 删 mode 显示 |

## 设计前后对比

```
之前：用户 → 界面判断 mode → 选 agent → 注���对应提示词 → 限制权限
之后：用户 → 愚公（同一个身份，5 条哲学自然涵盖所有场景）
```

## 当前状态

- [ ] 已讨论确认（2026-04-27）
- [ ] 暂缓执行，等待合适时机
- [ ] 执行前需同步 magic-context 汉化完成
