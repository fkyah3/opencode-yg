# 子 Agent 权限继承问题 / Sub-Agent Permission Inheritance

> GitHub Issue: [#20549](https://github.com/anomalyco/opencode/issues/20549)
> 分析日期: 2026-04-24

---

## ⚠️ 风险声明 / Risk Warning

**本文档描述的配置层 workaround 不是安全机制，不能替代真正的权限隔离。**

This config-level workaround is NOT a security mechanism. It does NOT replace proper permission isolation.

| 风险 | 说明 |
|------|------|
| **遗漏的子 agent** | 只对已知 agent 名生效。如果 sisyphus 创建了一个不在声明列表里的子 agent（如 `"my-custom-agent"`），该 agent 将拥有完全权限 |
| **误报安全感** | 配置了 oracle 的权限不等于所有子 agent 都被限制。必须逐个 agent 声明 |
| **维护成本** | 新增子 agent 变种时必须同步更新配置，忘记添加即是安全漏洞 |
| **上游不兼容风险** | OpenCode 权限系统设计为每 agent 独立评估，不是继承模型。如果上游改动 `ctx.ask()` 合并逻辑或 `task.ts` 规则集策略，此 workaround 可能失效 |
| **设计意图冲突** | 子 agent 以自己的身份运行是 OpenCode 的刻意设计。限制过严可能影响子 agent 正常功能 |

**如果你需要真正的权限隔离（不可绕过），此 workaround 不满足需求。请等待上游官方修复。**

---

## 问题概述 / Problem

父 agent 通过 `task()` 创建子 agent 时，子 agent 的权限不会继承父 agent 的限制。父 agent 声明了 `write: false`，子 agent 仍然可以通过 `task()` 绕过限制执行写操作。

When a parent agent calls `task()` to spawn a sub-agent, the sub-agent does not inherit the parent's permission restrictions. A parent with `write: false` can bypass the restriction by delegating to a sub-agent via `task()`.

---

## 根因追踪 / Root Cause

### 代码路径 / Code Path

```
parent agent                   child agent
    │                               │
    ├─ tool/task.ts                  │
    │  create sub-session ──────────►│
    │  ruleset = {                   │
    │    deny: [todowrite, task],    │  ← 只限制 task 和 todowrite
    │    allow: [tools, primary]     │  ← 其他工具全部放行
    │  }                             │
    │                               ├─ prompt.ts ctx.ask()
    │                               │  merge rulesets:
    │                               │    agent.{name}.permission ← 读自己的 opencode.json
    │                               │    session.permission      ← 来自 task.ts
    │                               │
    │        ← 规则集合并完成，开始工作    
```

### 关键发现 / Key Findings

1. **`task()` 创建子 session** (`tool/task.ts`): 子 session 的 permission 限制非常宽松——只禁了 `todowrite` 和 `task` 递归
2. **`ctx.ask()` 合并规则** (`prompt.ts`): 两个规则来源——`agent.{name}.permission`（opencode.json）+ `session.permission`（task.ts）
3. **父 agent 的规则不传递**: 父 session 的已缓存规则集不会被带到子 session
4. **子 agent 从零评估**: 每次创建子 agent 都重新评估权限，没有继承概念

---

## 配置层 Workaround / Config-Level Workaround

### 原理 / How It Works

`ctx.ask()` 在合并规则时会读取 `agent.{name}.permission`（opencode.json 的已文档化字段）。只要为已知子 agent 类型声明权限，它们就会遵循自己的规则。

`ctx.ask()` reads `agent.{name}.permission` (a documented opencode.json field) when merging rulesets. Declare permissions for known sub-agent types and they'll follow their own rules.

### 示例配置 / Example Config

```jsonc
{
  "agent": {
    "oracle": {
      "mode": "primary",
      "permission": {
        "read":  { "pattern": "*", "action": "allow" },
        "grep":  { "pattern": "*", "action": "allow" },
        "glob":  { "pattern": "*", "action": "allow" },
        "edit":  { "pattern": "*", "action": "deny" },
        "write": { "pattern": "*", "action": "deny" },
        "bash":  { "pattern": "*", "action": "ask" }
      }
    },
    "explore": {
      "mode": "primary",
      "permission": {
        "read":  { "pattern": "*", "action": "allow" },
        "grep":  { "pattern": "*", "action": "allow" },
        "glob":  { "pattern": "*", "action": "allow" },
        "edit":  { "pattern": "*", "action": "deny" },
        "write": { "pattern": "*", "action": "deny" },
        "bash":  { "pattern": "*", "action": "ask" }
      }
    },
    "librarian": { /* same as above */ }
  }
}
```

### 验证方法 / Verification

检查 dev.log 中的 `permission.evaluate` 日志：

```
INFO service=permission permission=bash pattern=git status
  ruleset=[agent.oracle.permission, session.permission]
  action=ask evaluated
```

---

## 局限性 / Limitations

| 限制 | 说明 | Impact |
|------|------|--------|
| 仅限已知 agent 名 | 任意名称的子 agent 不在声明列表中就管不到 | 只能在已知 agent 类型上生效 |
| 不是真正的继承 | 父 agent 点了 allow 不等于子 agent 也 allow | 子 agent 独立重新弹窗 |
| 源码未动 | 根因在 OpenCode 的 task() 创建路径中 | 上游不修就一直需要配置维护 |

---

## 上游讨论 / Upstream Discussion

- Issue: [#20549 Improve transitive permissions for agents subagents and tasks](https://github.com/anomalyco/opencode/issues/20549)
- Our reply: [#issuecomment-4315071222](https://github.com/anomalyco/opencode/issues/20549#issuecomment-4315071222)
- 相关 issues: #6527, #8852, #7474, #11324, #4267, #5894

### 修复方向建议 / Suggested Fix Directions

| 方案 | 描述 | 风险 |
|------|------|------|
| **A. 源码修复：传递父级规则集** | 在 `task.ts` 创建子 session 时，传入父 session 的有效规则集 | 可能破坏 OpenCode 的安全设计边界：子 agent 获得父级全部权限，oracle 可以 edit |
| **B. 配置层 workaround（✅ 已采用）** | 在 `opencode.json` 中为已知子 agent 声明独立权限 | 只能约束已知名称的 agent |
| **C. 改进 getLegacyPlugins** | 在 legacy plugin 加载器中跳过 class constructor | 只解决了插件加载问题，不涉及权限 |

---
