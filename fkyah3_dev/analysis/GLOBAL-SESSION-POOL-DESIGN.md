# 全局 Session 池架构设计方案

> **基于**: INDEX.md + project.ts + session.sql.ts 源码分析  
> **目标**: Session 不再绑定 projectID（git root commit hash），实现全局 session 池

---

## 当前模型（分析结果）

### Session 存储（session.sql.ts:15-45）

```sql
session:
  id            TEXT PRIMARY KEY    -- session UUID
  project_id    TEXT NOT NULL       -- ← 硬绑定！references project(id) ON DELETE CASCADE
  workspace_id  TEXT                -- 可选 workspace
  parent_id     TEXT                -- 子 agent 的父 session
  directory     TEXT NOT NULL       -- 工具执行目录
  slug, title, version, ...
  INDEX session_project_idx ON (project_id)
```

### ProjectID 解析链（project.ts:169-220）

```
fromDirectory(dir)
  → 找 .git 
    → 无 git: ProjectID.global ("global")  
    → 有 git: git rev-list --max-parents=0 HEAD → 首个 root commit hash = ProjectID
    → 也尝试读 .git/opencode 文件缓存
```

### Session 绑死 projectID 的地方（project.ts:316-324）

```typescript
// 当 projectID 被解析后，将 "global" session 迁移到具体 projectID
if (data.id !== ProjectID.global) {
    db.update(SessionTable)
      .set({ project_id: data.id })
      .where(and(
        eq(SessionTable.project_id, ProjectID.global),
        eq(SessionTable.directory, data.worktree),  // ← 还按 directory 过滤！
      ))
}
```

**总结: Session 先创建在 `"global"` 下，等 git 解析完后迁移到具体 projectID。而且迁移时还加了 directory 条件——不同目录的 session 即使同 project 也会分开。**

---

## 目标模型

```
Session 池（一个大表）
 ├── session 1: 聊了 opencode fork bug
 ├── session 2: 穿插 MC 配置 + OMO 汉化  
 ├── session 3: Frutiger Aero 图生成
 └── ...
 
工作目录 = 提示词里的一行弱约束，不是存储层硬绑定
```

---

## 改动点分析

### 方案 A: 最小改动 — 停留在 "global"（推荐）

**不改数据库 schema，不改 projectID 逻辑，只改两处行为：**

| 改点 | 位置 | 改法 |
|------|------|------|
| 1. 阻止 session 迁移 | `project.ts:316-324` | if (data.id !== ProjectID.global) 分支改为 NO-OP 或条件关闭 |
| 2. TUI session 列表显示全部 | TUI 组件 | 去掉 project_id 过滤，显示所有 session |

**优点**: 零 schema 变更，一条 if 注释掉就行  
**缺点**: project_id 字段仍然存在（值全是 "global"），session 仍然有 ON DELETE CASCADE 依赖 project 表  
**风险**: 需确认 `ProjectID.global` 对应的 project 行不会意外删除

### 方案 B: Schema 层改动 — project_id 改为可选

| 改点 | 位置 | 改法 |
|------|------|------|
| 1. project_id 改为可选 | `session.sql.ts:19-22` | `.notNull()` → 去掉，改为 `.default("global")` |
| 2. 移除 ON DELETE CASCADE | `session.sql.ts:22` | 改为 NO ACTION 或直接去掉 references |
| 3. 移除迁移逻辑 | `project.ts:316-324` | 删掉 |
| 4. TUI session 列表 | TUI | 全局显示 |

**优点**: 语义正确（session 不再依赖 project）  
**缺点**: 需要数据库迁移（ALTER TABLE），风险较大  

### 方案 C: 新建全局视图层（不改存储）

| 改点 | 位置 | 改法 |
|------|------|------|
| 1. 所有 session 用 ProjectID.global | 不改变 | 利用现有 "global" 阶段 |
| 2. 关闭迁移步骤 | `project.ts:316-324` | feature flag 控制 |
| 3. TUI 增加全局视图 | TUI | 新 tab 或 `/sessions --all` 命令 |
| 4. system.ts 注入工作目录 | `system.ts` | 每个 session 开头自动注入当前工作目录 |

**优点**: 不破坏上游兼容性，可用 feature flag 开关  
**缺点**: 不完全"解绑"（project 表仍然存在但闲置）

---

## 推荐: 方案 C — 渐进式

理由:
1. **零数据库变更** — 不碰 schema，不写 migration
2. **feature flag 控制** — 出问题一条 revert 回退
3. **符合用户流** — 每次对话开头 system.ts 注入了工作目录，AI 自动知道在哪干活
4. **TUI 改动最小** — 只需要给 session 列表加一个 `--all` 选项

### 具体实现步骤

```
Step 1: system.ts 注入工作目录 (1 行, 10 秒)
  └→ 当前工作目录: E:\fkyah3\project\...

Step 2: project.ts 关闭迁移 (1 个 if, 10 秒)
  └→ 加 OPENCODE_FKYAH3_GLOBAL_SESSIONS flag

Step 3: TUI session 列表加 --all (后续)
  └→ /sessions --all 命令
```

---

## 风险评估

| 风险 | 概率 | 缓解 |
|------|------|------|
| "global" project 行被删除 → 所有 session cascade 删除 | 低 | 确保 "global" project 存在且不被删除 |
| 上游更新覆盖 project.ts | 中 | feature flag 隔离，冲突时手动 merge |
| TUI session 列表过多 | 低 | 懒加载 + 搜索过滤 |
