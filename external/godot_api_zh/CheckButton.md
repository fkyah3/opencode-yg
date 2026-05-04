## CheckButton（勾选按钮）<- Button（按钮）

CheckButton 是一个显示为勾选字段的开关按钮。功能与 CheckBox 类似，但外观不同。为了遵循既定的 UX 模式，建议在切换 CheckButton 会对某事物产生**即时**影响时使用。例如，当按下它显示或隐藏高级设置时，无需用户确认此操作。另见 BaseButton，其中包含与此节点关联的公共属性和方法。

**属性（Props）：**
- alignment: int (HorizontalAlignment) = 0 —— 对齐方式
- toggle_mode: bool = true —— 开关模式
