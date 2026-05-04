## InstancePlaceholder <- Node（节点）

在编辑器中为实例化场景启用 **加载为占位符** 选项后，运行游戏时该场景将被替换为 InstancePlaceholder，这不会替换编辑器中的节点。这样可以延迟实际加载场景，直到调用 `create_instance`。这对于避免一次性加载大型场景（通过选择性地加载部分场景）非常有用。**注意：** 与 Node 一样，InstancePlaceholder 没有变换（transform）。这会导致任何子节点相对于视口原点定位，而不是像编辑器中显示的那样相对于其父节点。将占位符替换为带有变换的场景后，子节点将再次相对于其父节点进行变换。

**方法（Methods）：**
- create_instance(replace: bool = false, custom_scene: PackedScene = null) -> Node
- get_instance_path() -> String
- get_stored_values(with_order: bool = false) -> Dictionary
