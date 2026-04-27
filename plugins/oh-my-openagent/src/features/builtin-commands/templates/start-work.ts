export const START_WORK_TEMPLATE = `你正在开始一个 Sisyphus 工作会话。

## 参数

- \`/start-work [计划名称] [--worktree <路径>]\`
  - \`计划名称\`（可选）：要开始的工作计划名称或部分匹配
  - \`--worktree <路径>\`（可选）：现有的 git worktree 的绝对路径
    - 如果指定且有效：hook 在 boulder.json 中预设置 worktree_path
    - 如果指定但无效：你必须先运行 \`git worktree add <路径> <分支>\`
    - 如果省略：直接在当前项目目录中工作（无 worktree）

## 做什么

1. **查找可用计划**：在 \`.sisyphus/plans/\` 中搜索 Prometheus 生成的计划文件

2. **检查活跃的 boulder 状态**：如果存在，读取 \`.sisyphus/boulder.json\`

3. **决策逻辑**：
   - 如果 \`.sisyphus/boulder.json\` 存在且计划**未**完成（有未勾选的框）：
     - 将当前会话**追加**到 session_ids
     - 继续处理现有计划
   - 如果没有活跃计划或计划已完成：
     - 列出可用的计划文件
     - 如果只有一个计划：自动选择它
     - 如果有多个计划：显示带时间戳的列表，请用户选择

4. **Worktree 设置**（仅当显式指定了 \`--worktree\` 且 boulder.json 中尚未设置 \`worktree_path\` 时）：
   1. \`git worktree list --porcelain\` - 查看可用的 worktree
   2. 创建：\`git worktree add <绝对路径> <分支或HEAD>\`
   3. 更新 boulder.json，添加 \`"worktree_path": "<绝对路径>"\`
   4. 所有工作在该 worktree 目录内进行

5. **创建/更新 boulder.json**：
   \`\`\`json
   {
     "active_plan": "/absolute/path/to/plan.md",
     "started_at": "ISO_TIMESTAMP",
     "session_ids": ["session_id_1", "session_id_2"],
     "plan_name": "plan-name",
     "worktree_path": "/absolute/path/to/git/worktree"
   }
   \`\`\`

6. **读取计划文件**并开始根据 atlas 工作流执行任务

## 输出格式

当列出计划供选择时：
\`\`\`
可用的工作计划

当前时间：{ISO 时间戳}
会话 ID：{当前 session id}

1. [计划名称-1.md] - 修改时间：{日期} - 进度：3/10 任务
2. [计划名称-2.md] - 修改时间：{日期} - 进度：0/5 任务

你想处理哪个计划？（输入编号或计划名称）
\`\`\`

当恢复现有工作时：
\`\`\`
恢复工作会话

活跃计划：{计划名称}
进度：{已完成}/{总计} 任务
会话数：{计数}（正在追加当前会话）
Worktree：{worktree_path}

读取计划并从最后一个未完成任务继续...
\`\`\`

当自动选择单个计划时：
\`\`\`
开始工作会话

计划：{计划名称}
会话 ID：{session_id}
开始时间：{时间戳}
Worktree：{worktree_path}

读取计划并开始执行...
\`\`\`

## 关键

- session_id 由 hook 注入 —— 直接使用它
- 在开始工作前**始终**更新 boulder.json
- 如果在 boulder.json 中设置了 worktree_path，所有工作在该 worktree 目录内进行
- 在委派任何任务前阅读完整的计划文件
- 遵循 atlas 委派协议（7 段格式）

## 任务分解（强制）

读取计划文件后，你必须将每个计划任务分解为粒度化的、可实现级别的子步骤，并在开始任何工作前将它们全部注册为 task/todo 项。

**如何分解**：
- 每个计划复选框项（例如 \`- [ ] Add user authentication\`）必须拆分为具体的、可操作的子任务
- 子任务应足够具体，使每项触及一组明确的文件/函数
- 包括：要修改的文件、要更改的内容、预期行为以及如何验证
- 不要让任何任务模糊 —— "实现功能 X" 是不可接受的；"在 src/auth/middleware.ts 中添加检查 JWT 到期并返回 401 的 validateToken()" 是可接受的

**示例分解**：
计划任务：\`- [ ] Add rate limiting to API\`
→ 待办项：
  1. 使用滑动窗口算法创建 \`src/middleware/rate-limiter.ts\`（每个 IP 最大 100 次请求/分钟）
  2. 将 RateLimiter 中间件添加到 \`src/app.ts\` 路由链中，在 auth 中间件之前
  3. 在 \`rate-limiter.ts\` 的响应中添加速率限制头部（X-RateLimit-Limit、X-RateLimit-Remaining）
  4. 添加测试：在 \`src/middleware/rate-limiter.test.ts\` 中验证超过限制后的 429 响应
  5. 添加测试：验证正常响应中存在速率限制头部

将这些注册为 task/todo 项，以便在整个会话中跟踪和查看进度。

## WORKTREE 完成

当在 worktree 中工作（boulder.json 中设置了 \`worktree_path\`）且所有计划任务完成后：
1. 提交 worktree 中的所有剩余变更
2. **同步 .sisyphus 状态回来**：在移除前将 \`.sisyphus/\` 从 worktree 复制到主仓库。
   当 \`.sisyphus/\` 被 gitignore 时这很关键 —— 否则在 worktree 执行期间写入的状态会丢失。
   \`\`\`bash
   cp -r <worktree-path>/.sisyphus/* <main-repo>/.sisyphus/ 2>/dev/null || true
   \`\`\`
3. 切换到主工作目录（原始仓库，不是 worktree）
4. 将 worktree 分支合并到当前分支：\`git merge <worktree-branch>\`
5. 如果合并成功，清理：\`git worktree remove <worktree-path>\`
6. 移除 boulder.json 状态

这是使用 \`--worktree\` 时的默认行为。只有用户明确指示时才跳过合并（例如，要求创建 PR 而不是合并）。`
