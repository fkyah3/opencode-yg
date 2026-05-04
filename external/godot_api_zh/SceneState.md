## SceneState（场景状态）<- RefCounted（引用计数）

维护与场景关联的资源、节点、导出和覆盖属性以及内置脚本的列表。不能从 SceneState 修改它们，只能访问。用于在不实例化 PackedScene 的情况下窥探其内容。此类不能直接实例化，可通过 `PackedScene.get_state` 为给定场景获取。

**方法（Methods）：**
- get_base_scene_state() -> SceneState —— 获取基场景状态
- get_connection_binds(idx: int) -> Array —— 获取连接绑定
- get_connection_count() -> int —— 获取连接数
- get_connection_flags(idx: int) -> int —— 获取连接标志
- get_connection_method(idx: int) -> StringName —— 获取连接方法
- get_connection_signal(idx: int) -> StringName —— 获取连接信号
- get_connection_source(idx: int) -> NodePath —— 获取连接源
- get_connection_target(idx: int) -> NodePath —— 获取连接目标
- get_connection_unbinds(idx: int) -> int —— 获取连接解绑数
- get_node_count() -> int —— 获取节点数
- get_node_groups(idx: int) -> PackedStringArray —— 获取节点所属组
- get_node_index(idx: int) -> int —— 获取节点索引
- get_node_instance(idx: int) -> PackedScene —— 获取节点实例
- get_node_instance_placeholder(idx: int) -> String —— 获取节点实例占位符
- get_node_name(idx: int) -> StringName —— 获取节点名称
- get_node_owner_path(idx: int) -> NodePath —— 获取节点所有者路径
- get_node_path(idx: int, for_parent: bool = false) -> NodePath —— 获取节点路径
- get_node_property_count(idx: int) -> int —— 获取节点属性数
- get_node_property_name(idx: int, prop_idx: int) -> StringName —— 获取节点属性名称
- get_node_property_value(idx: int, prop_idx: int) -> Variant —— 获取节点属性值
- get_node_type(idx: int) -> StringName —— 获取节点类型
- get_path() -> String —— 获取路径
- is_node_instance_placeholder(idx: int) -> bool —— 是否为节点实例占位符

**枚举（Enums）：**
**GenEditState（生成编辑状态）：** GEN_EDIT_STATE_DISABLED=0 —— 禁用, GEN_EDIT_STATE_INSTANCE=1 —— 实例, GEN_EDIT_STATE_MAIN=2 —— 主场景, GEN_EDIT_STATE_MAIN_INHERITED=3 —— 继承的主场景
