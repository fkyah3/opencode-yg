## SceneTree（场景树）<- MainLoop（主循环）

作为最重要的类之一，SceneTree 管理场景中节点的层次结构以及场景本身。可以添加、获取和移除节点。整个场景树（以及当前场景）可以暂停。可以加载、切换和重新加载场景。你还可以使用 SceneTree 将节点组织到**组**中：每个节点可以添加到任意多个组中，例如"敌人"组。然后可以遍历这些组，甚至可以在属于任何给定组的所有节点上调用方法和设置属性。SceneTree 是引擎使用的默认 MainLoop 实现，因此负责游戏循环。

**属性（Props）：**
- auto_accept_quit: bool = true —— 自动接受退出
- current_scene: Node —— 当前场景
- debug_collisions_hint: bool = false —— 调试碰撞提示
- debug_navigation_hint: bool = false —— 调试导航提示
- debug_paths_hint: bool = false —— 调试路径提示
- edited_scene_root: Node —— 编辑中的场景根节点
- multiplayer_poll: bool = true —— 多轮询
- paused: bool = false —— 暂停
- physics_interpolation: bool = false —— 物理插值
- quit_on_go_back: bool = true —— 返回时退出
- root: Window —— 根窗口

**方法（Methods）：**
- call_group(group: StringName, method: StringName) —— 调用组方法
- call_group_flags(flags: int, group: StringName, method: StringName) —— 带标志调用组方法
- change_scene_to_file(path: String) -> int —— 切换到文件场景
- change_scene_to_node(node: Node) -> int —— 切换到节点场景
- change_scene_to_packed(packed_scene: PackedScene) -> int —— 切换到打包场景
- create_timer(time_sec: float, process_always: bool = true, process_in_physics: bool = false, ignore_time_scale: bool = false) -> SceneTreeTimer —— 创建计时器
- create_tween() -> Tween —— 创建补间动画
- get_first_node_in_group(group: StringName) -> Node —— 获取组中第一个节点
- get_frame() -> int —— 获取帧数
- get_multiplayer(for_path: NodePath = NodePath("")) -> MultiplayerAPI —— 获取多玩家 API
- get_node_count() -> int —— 获取节点数
- get_node_count_in_group(group: StringName) -> int —— 获取组中节点数
- get_nodes_in_group(group: StringName) -> Node[] —— 获取组中所有节点
- get_processed_tweens() -> Tween[] —— 获取已处理的补间动画
- has_group(name: StringName) -> bool —— 是否存在组
- is_accessibility_enabled() -> bool —— 是否启用辅助功能
- is_accessibility_supported() -> bool —— 是否支持辅助功能
- notify_group(group: StringName, notification: int) —— 通知组
- notify_group_flags(call_flags: int, group: StringName, notification: int) —— 带标志通知组
- queue_delete(obj: Object) —— 队列删除对象
- quit(exit_code: int = 0) —— 退出
- reload_current_scene() -> int —— 重新加载当前场景
- set_group(group: StringName, property: String, value: Variant) —— 设置组属性
- set_group_flags(call_flags: int, group: StringName, property: String, value: Variant) —— 带标志设置组属性
- set_multiplayer(multiplayer: MultiplayerAPI, root_path: NodePath = NodePath("")) —— 设置多玩家 API
- unload_current_scene() —— 卸载当前场景

**信号（Signals）：**
- node_added(node: Node) —— 节点已添加
- node_configuration_warning_changed(node: Node) —— 节点配置警告已更改
- node_removed(node: Node) —— 节点已移除
- node_renamed(node: Node) —— 节点已重命名
- physics_frame —— 物理帧
- process_frame —— 处理帧
- scene_changed —— 场景已更改
- tree_changed —— 树已更改
- tree_process_mode_changed —— 树处理模式已更改

**枚举（Enums）：**
**GroupCallFlags（组调用标志）：** GROUP_CALL_DEFAULT=0 —— 默认, GROUP_CALL_REVERSE=1 —— 反向, GROUP_CALL_DEFERRED=2 —— 延迟, GROUP_CALL_UNIQUE=4 —— 唯一
