## AnimationNodeBlendTree（动画节点混合树）<- AnimationRootNode

此动画节点可以包含任何其他类型动画节点的子树，例如 AnimationNodeTransition、AnimationNodeBlend2、AnimationNodeBlend3、AnimationNodeOneShot 等。这是最常用的动画节点根之一。默认情况下会创建一个名为 `output` 的 AnimationNodeOutput 节点。

**属性（Props）：**
- graph_offset: Vector2 = Vector2(0, 0)

**方法（Methods）：**
- add_node(name: StringName, node: AnimationNode, position: Vector2 = Vector2(0, 0))
- connect_node(input_node: StringName, input_index: int, output_node: StringName)
- disconnect_node(input_node: StringName, input_index: int)
- get_node(name: StringName) -> AnimationNode
- get_node_list() -> StringName[]
- get_node_position(name: StringName) -> Vector2
- has_node(name: StringName) -> bool
- remove_node(name: StringName)
- rename_node(name: StringName, new_name: StringName)
- set_node_position(name: StringName, position: Vector2)

**信号（Signals）：**
- node_changed(node_name: StringName)

**枚举（Enums）：**
**常量（Constants）：** CONNECTION_OK=0, CONNECTION_ERROR_NO_INPUT=1, CONNECTION_ERROR_NO_INPUT_INDEX=2, CONNECTION_ERROR_NO_OUTPUT=3, CONNECTION_ERROR_SAME_NODE=4, CONNECTION_ERROR_CONNECTION_EXISTS=5
