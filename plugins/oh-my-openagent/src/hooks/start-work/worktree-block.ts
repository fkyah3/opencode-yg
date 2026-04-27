export function createWorktreeActiveBlock(worktreePath: string): string {
  return `
## Worktree 激活

**Worktree**: \`${worktreePath}\`

**关键——不要忘记**：你在 git worktree 中工作。**所有**操作必须在此 worktree 目录中执行。
- 每次文件读、写、编辑和 git 操作都必须针对 \`${worktreePath}\` 下的路径
- 当委派任务给子 Agent 时，必须在委派 prompt 中包含 worktree 路径，使他们也在此 worktree 中操作
- **绝不**操作主仓库目录——始终使用上面的 worktree 路径`
}
