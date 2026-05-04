## SpinBox（数值输入框）<- Range（范围）

SpinBox 是一个数值输入文本字段。允许输入整数和浮点数。SpinBox 还有上下按钮，可单击以增加或减少数值。也可以通过上下拖动鼠标到 SpinBox 的箭头上方来改变数值。此外，还可以输入数学表达式。当用户在编辑 SpinBox 文本字段时按 [kbd]Enter[/kbd] 键，表达式将被计算。这使用 Expression 类来解析和求值表达式。表达式的结果将设置为 SpinBox 的值。一些有效表达式的示例包括 `5 + 2 * 3`、`pow(2, 4)` 和 `PI + sin(0.5)`。表达式区分大小写。**示例：** 创建一个 SpinBox，禁用其上下文菜单并将其文本对齐设置为右对齐。有关 SpinBox 的更多选项，请参见 Range 类。**注意：** 禁用 SpinBox 的上下文菜单后，可以右键单击数值输入框的下半部分将值设置为其最小值，而右键单击上半部分将值设置为其最大值。**注意：** SpinBox 依赖于底层的 LineEdit 节点。要设置 SpinBox 背景的主题，请为 LineEdit 添加主题项并进行自定义。LineEdit 具有 `SpinBoxInnerLineEdit` 主题变体，因此你可以为其赋予与常规 LineEdit 不同的外观。**注意：** 如果要对底层的 LineEdit 实现拖放，可以在 `get_line_edit` 返回的节点上使用 `Control.set_drag_forwarding`。

**属性（Props）：**
- alignment: int (HorizontalAlignment) = 0 —— 对齐
- custom_arrow_round: bool = false —— 自定义箭头取整
- custom_arrow_step: float = 0.0 —— 自定义箭头步长
- editable: bool = true —— 可编辑
- prefix: String = "" —— 前缀
- select_all_on_focus: bool = false —— 聚焦时全选
- size_flags_vertical: int (Control.SizeFlags) = 1 —— 垂直大小标志
- step: float = 1.0 —— 步长
- suffix: String = "" —— 后缀
- update_on_text_changed: bool = false —— 文本更改时更新

**方法（Methods）：**
- apply() —— 应用
- get_line_edit() -> LineEdit —— 获取底层 LineEdit
