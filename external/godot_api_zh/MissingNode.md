## MissingNode（缺失节点）<- Node（节点）

这是一个内部编辑器类，用于保留未知类型节点（很可能是由某个已卸载的扩展提供的类型）的数据。无法手动实例化或将其放入场景中。**警告：** 除非你清楚自己在做什么，否则请忽略缺失节点。缺失节点上的现有属性可以在代码中自由修改，无论其预期类型是什么。

**属性（Props）：**
- original_class: String —— 原始类名
- original_scene: String —— 原始场景
- recording_properties: bool —— 是否录制属性
- recording_signals: bool —— 是否录制信号
