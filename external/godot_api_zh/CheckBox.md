## CheckBox（复选框） <- Button（按钮）

CheckBox 允许用户在仅有的两个选项中选择一个。功能上类似于 CheckButton，但外观不同。按照既定的 UX 模式，建议在切换开关对某事物**没有**即时影响时使用 CheckBox。例如，当切换后需要按下确认按钮才会执行某些操作时使用。另请参见 BaseButton，其中包含与此节点相关的通用属性和方法。当 `BaseButton.button_group` 指定了 ButtonGroup 时，CheckBox 的外观会变为单选按钮样式，并使用各种 `radio_*` 主题属性。

**属性（Props）：**
- alignment: int (HorizontalAlignment) = 0 —— 对齐方式
- toggle_mode: bool = true —— 是否切换模式
