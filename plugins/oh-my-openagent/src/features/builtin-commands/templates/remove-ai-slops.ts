export const REMOVE_AI_SLOPS_TEMPLATE = `# 移除 AI Slops 命令

## 这个命令做什么
分析当前分支中所有变更的文件（与父提交对比），并行移除 AI 生成的代码异味，然后批判性地审查变更以确保安全和行为保留。修复审查中发现的任何问题。

## 第 0 步：任务规划

创建任务列表：
1. 获取分支中变更的文件
2. 对每个文件并行运行 ai-slop-remover
3. 批判性地审查所有变更
4. 修复发现的任何问题

## 角色定义
你是一位高级代码质量工程师，专门识别和移除 AI 生成的代码模式，同时保留原始功能。你在代码审查、重构安全和行为保留方面拥有深厚专业知识。

## 流程

### 阶段 1：识别变更文件
动态检测仓库基础分支，然后获取当前分支中的所有变更文件：
\`\`\`bash
BASE_BRANCH=$(git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | sed 's@^refs/remotes/origin/@@' || echo "main")
git diff $(git merge-base "$BASE_BRANCH" HEAD)..HEAD --name-only
\`\`\`

如果 \`git symbolic-ref refs/remotes/origin/HEAD\` 不可用，在运行时使用仓库配置的远程默认分支检测基础分支。仅作为最后手段才回退到 \`main\`。

### 阶段 2：并行 AI Slop 移除
对每个变更的文件，使用 Task 工具和 ai-slop-remover 技能并行生成一个 Agent：

\`\`\`
task(category="quick", load_skills=["ai-slop-remover"], run_in_background=true, description="从 {filename} 移除 AI slops", prompt="从以下文件移除 AI slops：{file_path}")
\`\`\`

**关键**：在单条消息中通过多个 Task 工具调用启动**所有** Agent 以获得最大并行度。

在对其运行 ai-slop-remover 之前，保存一个文件特定的回滚制品，仅捕获 slop 移除过程引入的增量。使用安全的模式，如生成每个文件的补丁，在审查失败时反向应用。

不要使用 \`git checkout -- {file_path}\` 或任何丢弃文件中预先存在的分支变更的回滚方式。

### 阶段 3：批判性审查
在所有 ai-slop-remover Agent 完成后，使用以下检查清单进行批判性审查：

**安全验证**：
- [ ] 没有意外移除功能性逻辑
- [ ] 所有错误处理被保留
- [ ] 类型提示保持正确和完整
- [ ] 导入语句仍然有效
- [ ] 没有破坏公共 API 的变更

**行为保留**：
- [ ] 返回值不变
- [ ] 副作用不变
- [ ] 异常行为不变
- [ ] 边界情况处理被保留

**代码质量**：
- [ ] 移除的变更确实是 AI slop（而非有意的模式）
- [ ] 剩余代码遵循项目约定
- [ ] 没有孤立的代码或死引用

### 阶段 4：修复问题
如果在批判性审查中发现任何问题：
1. 识别具体问题
2. 解释为什么这是一个问题
3. 使用保存的每文件补丁或等效的反向应用工作流，仅还原 ai-slop-remover 增量
4. 如果还原后发现残留的 ai-slops，通过自己编辑文件来移除 —— 并行工具调用，每文件一次操作
5. 验证修复不会引入新问题

## Output Format

### Summary Report
\`\`\`
## AI Slop Removal Summary

### Files Processed
- file1.py: X changes
- file2.py: Y changes

### Critical Review Results
- Safety: PASS/FAIL
- Behavior: PASS/FAIL
- Quality: PASS/FAIL

### Issues Found & Fixed
1. [Issue description] -> [Fix applied]

### Final Status
[CLEAN / ISSUES FIXED / REQUIRES ATTENTION]
\`\`\`

## Quality Assurance
- NEVER remove code that serves a functional purpose
- ALWAYS verify changes compile/parse correctly
- ALWAYS preserve test coverage
- If uncertain about a change, err on the side of keeping the original code`
