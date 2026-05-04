## Container（容器） <- Control（控件）

所有 GUI 容器的基类。Container 以特定方式自动排列其子控件。可以继承此类来创建自定义容器类型。

**Props（属性）：**
- accessibility_region: bool = false —— 无障碍区域
- mouse_filter: int (Control.MouseFilter) = 1 —— 鼠标过滤

**Methods（方法）：**
- fit_child_in_rect(child: Control, rect: Rect2) —— 将子控件适配到矩形中
- queue_sort() —— 排队进行重新排序

**Signals（信号）：**
- pre_sort_children —— 子节点排序前
- sort_children —— 子节点排序

**Enums（枚举）：**
**Constants（常量）：** NOTIFICATION_PRE_SORT_CHILDREN=50 —— 子节点排序前通知，NOTIFICATION_SORT_CHILDREN=51 —— 子节点排序通知
