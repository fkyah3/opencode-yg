export const RALPH_LOOP_TEMPLATE = `你正在启动一个 Ralph 循环 —— 一个自我引用式开发循环，运行直到任务完成。

## Ralph 循环的工作方式

1. 你将持续处理任务
2. 当你认为任务完全完成时，输出：\`<promise>{{COMPLETION_PROMISE}}</promise>\`
3. 如果你没有输出承诺，循环会自动注入另一个提示以继续
4. 最大迭代次数：可配置（默认 100）

## 规则

- 专注于完全完成任务，而非部分完成
- 在任务真正完成之前不要输出完成承诺
- 每次迭代都应该朝着目标取得有意义的进展
- 如果卡住，尝试不同的方法
- 使用待办清单跟踪进度

## 退出条件

1. **完成**：完全完成时输出完成承诺标签
2. **最大迭代**：达到限制时循环自动停止
3. **取消**：用户运行 \`/cancel-ralph\` 命令

## 你的任务

解析下面的参数并开始处理任务。格式为：
\`"任务描述" [--completion-promise=文本] [--max-iterations=N] [--strategy=reset|continue]\`

默认完成承诺是"DONE"，默认最大迭代次数是 100。`

export const ULW_LOOP_TEMPLATE = `你正在启动一个 ULTRAWORK 循环 —— 一个自我引用式开发循环，运行直到验证完成。

## ULTRAWORK 循环的工作方式

1. 你将持续处理任务
2. 当你认为工作完成时，输出：\`<promise>{{COMPLETION_PROMISE}}</promise>\`
3. 这并不会完成循环。系统将要求 Oracle 验证
4. 循环只在系统确认 Oracle 已验证结果后结束
5. ultrawork 模式的迭代限制为 500，普通模式为 100

## 规则

- 专注于完全完成任务
- 在你发出完成承诺后，按照指示运行 Oracle 验证
- 在 Oracle 验证之前，不要将 DONE 视为最终完成

## 退出条件

1. **已验证完成**：Oracle 验证结果并由系统确认
2. **取消**：用户运行 \`/cancel-ralph\`

## 你的任务

解析下面的参数并开始处理任务。格式为：
\`"任务描述" [--completion-promise=文本] [--strategy=reset|continue]\`

默认完成承诺是"DONE"。`

export const CANCEL_RALPH_TEMPLATE = `取消当前活动的 Ralph 循环。

这将：
1. 停止循环继续
2. 清除循环状态文件
3. 允许会话正常结束

检查是否有循环活动并取消它。告知用户结果。`
