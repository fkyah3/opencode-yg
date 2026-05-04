## InputEventShortcut（快捷键输入事件） <- InputEvent（输入事件）

InputEventShortcut 是一种特殊事件，可在 `Node._input`、`Node._shortcut_input` 和 `Node._unhandled_input` 中接收。通常由编辑器的命令面板发送以触发操作，也可通过 `Viewport.push_input` 手动发送。

**属性（Props）：**
- shortcut: Shortcut —— 快捷键
