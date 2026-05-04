## ScriptEditor（脚本编辑器）<- PanelContainer（面板容器）

Godot 编辑器的脚本编辑器。**注意：** 此类不应直接实例化。而是使用 `EditorInterface.get_script_editor` 访问单例。

**方法（Methods）：**
- clear_docs_from_script(script: Script) —— 清除脚本文档
- get_breakpoints() -> PackedStringArray —— 获取断点
- get_current_editor() -> ScriptEditorBase —— 获取当前编辑器
- get_current_script() -> Script —— 获取当前脚本
- get_open_script_editors() -> ScriptEditorBase[] —— 获取打开的脚本编辑器列表
- get_open_scripts() -> Script[] —— 获取打开的脚本列表
- goto_help(topic: String) —— 跳转到帮助主题
- goto_line(line_number: int) —— 跳转到指定行
- open_script_create_dialog(base_name: String, base_path: String) —— 打开创建脚本对话框
- register_syntax_highlighter(syntax_highlighter: EditorSyntaxHighlighter) —— 注册语法高亮器
- save_all_scripts() —— 保存所有脚本
- unregister_syntax_highlighter(syntax_highlighter: EditorSyntaxHighlighter) —— 注销语法高亮器
- update_docs_from_script(script: Script) —— 从脚本更新文档

**信号（Signals）：**
- editor_script_changed(script: Script) —— 编辑器脚本已更改
- script_close(script: Script) —— 脚本关闭
