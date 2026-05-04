## Range（范围）<- Control（控件）

Range 是表示某个范围内数值的控件的抽象基类，使用配置的 `step` 和 `page` 大小。参见 ScrollBar 和 Slider 等使用 Range 的高级节点示例。

**属性（Props）：**
- allow_greater: bool = false —— 允许大于最大值
- allow_lesser: bool = false —— 允许小于最小值
- exp_edit: bool = false —— 指数编辑
- max_value: float = 100.0 —— 最大值
- min_value: float = 0.0 —— 最小值
- page: float = 0.0 —— 页面大小
- ratio: float —— 比例
- rounded: bool = false —— 四舍五入
- size_flags_vertical: int (Control.SizeFlags) = 0 —— 垂直大小标志
- step: float = 0.01 —— 步长
- value: float = 0.0 —— 值

**方法（Methods）：**
- set_value_no_signal(value: float) —— 设置值（无信号）
- share(with: Node) —— 共享
- unshare() —— 取消共享

**信号（Signals）：**
- changed —— 已更改
- value_changed(value: float) —— 值已更改
