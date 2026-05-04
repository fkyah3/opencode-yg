## ScriptCreateDialog（脚本创建对话框）<- ConfirmationDialog（确认对话框）

ScriptCreateDialog 根据给定模板为指定脚本语言创建脚本文件。标准用法是在调用 `Window.popup` 方法前配置其字段。

**属性（Props）：**
- dialog_hide_on_ok: bool = false
- ok_button_text: String = "Create"
- title: String = "Attach Node Script"

**方法（Methods）：**
- config(inherits: String, path: String, built_in_enabled: bool = true, load_enabled: bool = true)

**信号（Signals）：**
- script_created(script: Script) —— 脚本已创建
