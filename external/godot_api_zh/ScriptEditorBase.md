## ScriptEditorBase（脚本编辑器基类）<- Control（控件）

用于在 ScriptEditor 中编辑脚本的基类编辑器。这不包括文档项。

**方法（Methods）：**
- add_syntax_highlighter(highlighter: EditorSyntaxHighlighter) —— 添加语法高亮器
- get_base_editor() -> Control —— 获取基类编辑器

**信号（Signals）：**
- edited_script_changed —— 已编辑脚本更改
- go_to_help(what: String) —— 跳转到帮助
- go_to_method(script: Object, method: String) —— 跳转到方法
- name_changed —— 名称已更改
- replace_in_files_requested(text: String) —— 请求文件中替换
- request_help(topic: String) —— 请求帮助
- request_open_script_at_line(script: Object, line: int) —— 请求在指定行打开脚本
- request_save_history —— 请求保存历史
- request_save_previous_state(state: Dictionary) —— 请求保存之前状态
- search_in_files_requested(text: String) —— 请求在文件中搜索
