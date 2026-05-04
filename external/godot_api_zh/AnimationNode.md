## AnimationNode（动画节点）<- Resource

AnimationTree 节点的基资源。通常不直接使用，但可以创建带有自定义混合公式的自定义节点。在创建主要用于 AnimationNodeBlendTree 的动画节点时继承此类，否则应使用 AnimationRootNode。除 AnimationNodeOutput 外，所有节点都可以将时间信息作为只读参数访问，这些信息在前一帧中处理和存储。**注意：** 如果 AnimationNode 中存在多个输入，时间信息的优先级取决于 AnimationNode 的类型。

**属性（Props）：**
- filter_enabled: bool

**方法（Methods）：**
- add_input(name: String) -> bool
- blend_animation(animation: StringName, time: float, delta: float, seeked: bool, is_external_seeking: bool, blend: float, looped_flag: int = 0)
- blend_input(input_index: int, time: float, seek: bool, is_external_seeking: bool, blend: float, filter: int = 0, sync: bool = true, test_only: bool = false) -> float
- blend_node(name: StringName, node: AnimationNode, time: float, seek: bool, is_external_seeking: bool, blend: float, filter: int = 0, sync: bool = true, test_only: bool = false) -> float
- find_input(name: String) -> int
- get_input_count() -> int
- get_input_name(input: int) -> String
- get_parameter(name: StringName) -> Variant
- get_processing_animation_tree_instance_id() -> int
- is_path_filtered(path: NodePath) -> bool
- is_process_testing() -> bool
- remove_input(index: int)
- set_filter_path(path: NodePath, enable: bool)
- set_input_name(input: int, name: String) -> bool
- set_parameter(name: StringName, value: Variant)

**信号（Signals）：**
- animation_node_removed(object_id: int, name: String)
- animation_node_renamed(object_id: int, old_name: String, new_name: String)
- tree_changed

**枚举（Enums）：**
**FilterAction（过滤操作）：** FILTER_IGNORE=0, FILTER_PASS=1, FILTER_STOP=2, FILTER_BLEND=3
