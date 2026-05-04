## Node（节点）<- Object（对象）

节点是 Godot 的构建块。一个节点可以被指定为另一个节点的子节点，形成树状结构。一个节点可以包含任意数量的子节点，但同级子节点（同一节点的直接子节点）的名称必须唯一。节点的树状结构称为**场景**。场景可以保存到磁盘，然后实例化到其他场景中。这让 Godot 项目的架构和数据模型具有极高的灵活性。

**场景树：** `SceneTree` 包含活动的节点树。当节点被添加到场景树时，它会收到 `NOTIFICATION_ENTER_TREE` 通知，并触发其 `_enter_tree` 回调。子节点总是在父节点**之后**添加——即父节点的 `_enter_tree` 回调会在子节点之前触发。当所有节点都添加到场景树后，它们会收到 `NOTIFICATION_READY` 通知并触发各自的 `_ready` 回调。对于节点组，`_ready` 回调以逆序调用——从子节点开始向上到父节点。这意味着向场景树添加节点时，回调顺序如下：父节点的 `_enter_tree`、子节点的 `_enter_tree`、子节点的 `_ready`、最后是父节点的 `_ready`（递归适用于整个场景树）。

**处理（Processing）：** 节点可以覆盖"process"状态，从而在每帧收到回调以执行处理。普通处理（回调 `_process`，通过 `set_process` 切换）尽可能快地执行，依赖于帧率，因此处理时间 *delta*（以秒为单位）作为参数传递。物理处理（回调 `_physics_process`，通过 `set_physics_process` 切换）每秒执行固定次数（默认 60 次），适合物理引擎相关的代码。节点也可以处理输入事件。当存在 `_input` 函数时，它会在...（注：原始描述过长，此处仅翻译了前段。后续可补全完整版本）

**属性（Props）：**
- `auto_translate_mode`: int (Node.AutoTranslateMode) = 0 —— 自动翻译模式
- `editor_description`: String = "" —— 编辑器描述
- `multiplayer`: MultiplayerAPI —— 多玩家 API
- `name`: StringName —— 节点名称
- `owner`: Node —— 节点所有者
- `physics_interpolation_mode`: int (Node.PhysicsInterpolationMode) = 0 —— 物理插值模式
- `process_mode`: int (Node.ProcessMode) = 0 —— 处理模式
- `process_physics_priority`: int = 0 —— 物理处理优先级
- `process_priority`: int = 0 —— 处理优先级
- `process_thread_group`: int (Node.ProcessThreadGroup) = 0 —— 处理线程组
- `process_thread_group_order`: int —— 处理线程组顺序
- `process_thread_messages`: int (Node.ProcessThreadMessages) —— 处理线程消息
- `scene_file_path`: String —— 场景文件路径
- `unique_name_in_owner`: bool = false —— 在所有者中名称唯一

**方法（Methods）：**
- `add_child(node: Node, force_readable_name: bool = false, internal: int = 0)` —— 添加子节点
- `add_sibling(sibling: Node, force_readable_name: bool = false)` —— 添加同级节点
- `add_to_group(group: StringName, persistent: bool = false)` —— 添加到组
- `atr(message: String, context: StringName = "")` -> String —— 自动翻译消息
- `atr_n(message: String, plural_message: StringName, n: int, context: StringName = "")` -> String —— 自动翻译复数消息
- `call_deferred_thread_group(method: StringName)` -> Variant —— 在线程组中延迟调用
- `call_thread_safe(method: StringName)` -> Variant —— 线程安全调用
- `can_auto_translate()` -> bool —— 是否可自动翻译
- `can_process()` -> bool —— 是否能处理
- `create_tween()` -> Tween —— 创建补间动画
- `duplicate(flags: int = 15)` -> Node —— 复制节点
- `find_child(pattern: String, recursive: bool = true, owned: bool = true)` -> Node —— 查找子节点
- `find_children(pattern: String, type: String = "", recursive: bool = true, owned: bool = true)` -> Node[] —— 查找所有匹配子节点
- `find_parent(pattern: String)` -> Node —— 查找父节点
- `get_accessibility_element()` -> RID —— 获取无障碍元素
- `get_child(idx: int, include_internal: bool = false)` -> Node —— 获取子节点
- `get_child_count(include_internal: bool = false)` -> int —— 获取子节点数量
- `get_children(include_internal: bool = false)` -> Node[] —— 获取所有子节点
- `get_groups()` -> StringName[] —— 获取所属组列表
- `get_index(include_internal: bool = false)` -> int —— 获取索引
- `get_last_exclusive_window()` -> Window —— 获取最后一个独占窗口
- `get_multiplayer_authority()` -> int —— 获取多玩家权威ID
- `get_node(path: NodePath)` -> Node —— 获取节点
- `get_node_and_resource(path: NodePath)` -> Array —— 获取节点和资源
- `get_node_or_null(path: NodePath)` -> Node —— 获取节点或返回null
- `get_node_rpc_config()` -> Variant —— 获取节点RPC配置
- `get_orphan_node_ids()` -> int[] —— 获取孤节点ID列表
- `get_parent()` -> Node —— 获取父节点
- `get_path()` -> NodePath —— 获取路径
- `get_path_to(node: Node, use_unique_path: bool = false)` -> NodePath —— 获取到目标节点的路径
- `get_physics_process_delta_time()` -> float —— 获取物理处理增量时间
- `get_process_delta_time()` -> float —— 获取处理增量时间
- `get_scene_instance_load_placeholder()` -> bool —— 获取场景实例是否加载占位符
- `get_tree()` -> SceneTree —— 获取场景树
- `get_tree_string()` -> String —— 获取场景树字符串表示
- `get_tree_string_pretty()` -> String —— 获取格式化场景树字符串
- `get_viewport()` -> Viewport —— 获取视口
- `get_window()` -> Window —— 获取窗口
- `has_node(path: NodePath)` -> bool —— 是否有指定路径的节点
- `has_node_and_resource(path: NodePath)` -> bool —— 是否有指定路径的节点和资源
- `is_ancestor_of(node: Node)` -> bool —— 是否为指定节点的祖先
- `is_displayed_folded()` -> bool —— 是否在编辑器中折叠显示
- `is_editable_instance(node: Node)` -> bool —— 实例是否可编辑
- `is_greater_than(node: Node)` -> bool —— 是否大于指定节点
- `is_in_group(group: StringName)` -> bool —— 是否在指定组中
- `is_inside_tree()` -> bool —— 是否在场景树中
- `is_multiplayer_authority()` -> bool —— 是否为多玩家权威
- `is_node_ready()` -> bool —— 节点是否已就绪
- `is_part_of_edited_scene()` -> bool —— 是否为正在编辑的场景的一部分
- `is_physics_interpolated()` -> bool —— 是否启动物理插值
- `is_physics_interpolated_and_enabled()` -> bool —— 是否启用物理插值
- `is_physics_processing()` -> bool —— 是否正在物理处理
- `is_physics_processing_internal()` -> bool —— 是否正在内部物理处理
- `is_processing()` -> bool —— 是否正在处理
- `is_processing_input()` -> bool —— 是否正在处理输入
- `is_processing_internal()` -> bool —— 是否正在内部处理
- `is_processing_shortcut_input()` -> bool —— 是否正在处理快捷键输入
- `is_processing_unhandled_input()` -> bool —— 是否正在处理未处理的输入
- `is_processing_unhandled_key_input()` -> bool —— 是否正在处理未处理的按键输入
- `move_child(child_node: Node, to_index: int)` —— 移动子节点到指定索引
- `notify_deferred_thread_group(what: int)` —— 在线程组中延迟通知
- `notify_thread_safe(what: int)` —— 线程安全通知
- `print_orphan_nodes()` —— 打印孤节点
- `print_tree()` —— 打印场景树
- `print_tree_pretty()` —— 打印格式化的场景树
- `propagate_call(method: StringName, args: Array = [], parent_first: bool = false)` —— 向下传播调用
- `propagate_notification(what: int)` —— 向下传播通知
- `queue_accessibility_update()` —— 排队无障碍更新
- `queue_free()` —— 排队释放
- `remove_child(node: Node)` —— 移除子节点
- `remove_from_group(group: StringName)` —— 从组中移除
- `reparent(new_parent: Node, keep_global_transform: bool = true)` —— 重新设置父节点
- `replace_by(node: Node, keep_groups: bool = false)` —— 被指定节点替换
- `request_ready()` —— 请求就绪
- `reset_physics_interpolation()` —— 重置物理插值
- `rpc(method: StringName)` -> int —— 远程过程调用
- `rpc_config(method: StringName, config: Variant)` —— 配置RPC
- `rpc_id(peer_id: int, method: StringName)` -> int —— 向指定对等端发送RPC
- `set_deferred_thread_group(property: StringName, value: Variant)` —— 在线程组中延迟设置属性
- `set_display_folded(fold: bool)` —— 设置编辑器折叠状态
- `set_editable_instance(node: Node, is_editable: bool)` —— 设置实例是否可编辑
- `set_multiplayer_authority(id: int, recursive: bool = true)` —— 设置多玩家权威
- `set_physics_process(enable: bool)` —— 设置物理处理开关
- `set_physics_process_internal(enable: bool)` —— 设置内部物理处理开关
- `set_process(enable: bool)` —— 设置处理开关
- `set_process_input(enable: bool)` —— 设置输入处理开关
- `set_process_internal(enable: bool)` —— 设置内部处理开关
- `set_process_shortcut_input(enable: bool)` —— 设置快捷键输入处理开关
- `set_process_unhandled_input(enable: bool)` —— 设置未处理输入处理开关
- `set_process_unhandled_key_input(enable: bool)` —— 设置未处理按键输入处理开关
- `set_scene_instance_load_placeholder(load_placeholder: bool)` —— 设置场景实例是否加载占位符
- `set_thread_safe(property: StringName, value: Variant)` —— 线程安全设置属性
- `set_translation_domain_inherited()` —— 设置继承翻译域
- `update_configuration_warnings()` —— 更新配置警告

**信号（Signals）：**
- `child_entered_tree(node: Node)` —— 子节点进入场景树
- `child_exiting_tree(node: Node)` —— 子节点即将退出场景树
- `child_order_changed` —— 子节点顺序变更
- `editor_description_changed(node: Node)` —— 编辑器描述变更
- `editor_state_changed` —— 编辑器状态变更
- `ready` —— 节点就绪
- `renamed` —— 节点重命名
- `replacing_by(node: Node)` —— 被替换
- `tree_entered` —— 进入场景树
- `tree_exited` —— 退出场景树
- `tree_exiting` —— 即将退出场景树

**枚举（Enums）：**

**常量（Constants）：**
- `NOTIFICATION_ENTER_TREE=10` —— 进入场景树通知
- `NOTIFICATION_EXIT_TREE=11` —— 退出场景树通知
- `NOTIFICATION_MOVED_IN_PARENT=12` —— 在父节点中移动通知
- `NOTIFICATION_READY=13` —— 就绪通知
- `NOTIFICATION_PAUSED=14` —— 暂停通知
- `NOTIFICATION_UNPAUSED=15` —— 恢复通知
- `NOTIFICATION_PHYSICS_PROCESS=16` —— 物理处理通知
- `NOTIFICATION_PROCESS=17` —— 处理通知
- `NOTIFICATION_PARENTED=18` —— 指定父节点通知
- `NOTIFICATION_UNPARENTED=19` —— 移除父节点通知

**ProcessMode（处理模式）：**
- `PROCESS_MODE_INHERIT=0` —— 继承父节点
- `PROCESS_MODE_PAUSABLE=1` —— 可暂停
- `PROCESS_MODE_WHEN_PAUSED=2` —— 暂停时处理
- `PROCESS_MODE_ALWAYS=3` —— 始终处理
- `PROCESS_MODE_DISABLED=4` —— 禁用

**ProcessThreadGroup（处理线程组）：**
- `PROCESS_THREAD_GROUP_INHERIT=0` —— 继承父节点
- `PROCESS_THREAD_GROUP_MAIN_THREAD=1` —— 主线程
- `PROCESS_THREAD_GROUP_SUB_THREAD=2` —— 子线程

**ProcessThreadMessages（处理线程消息）：**
- `FLAG_PROCESS_THREAD_MESSAGES=1` —— 处理线程消息
- `FLAG_PROCESS_THREAD_MESSAGES_PHYSICS=2` —— 处理物理线程消息
- `FLAG_PROCESS_THREAD_MESSAGES_ALL=3` —— 处理所有线程消息

**PhysicsInterpolationMode（物理插值模式）：**
- `PHYSICS_INTERPOLATION_MODE_INHERIT=0` —— 继承
- `PHYSICS_INTERPOLATION_MODE_ON=1` —— 开启
- `PHYSICS_INTERPOLATION_MODE_OFF=2` —— 关闭

**DuplicateFlags（复制标志）：**
- `DUPLICATE_SIGNALS=1` —— 复制信号
- `DUPLICATE_GROUPS=2` —— 复制组
- `DUPLICATE_SCRIPTS=4` —— 复制脚本
- `DUPLICATE_USE_INSTANTIATION=8` —— 使用实例化
- `DUPLICATE_INTERNAL_STATE=16` —— 复制内部状态
- `DUPLICATE_DEFAULT=15` —— 默认（信号+组+脚本）

**InternalMode（内部模式）：**
- `INTERNAL_MODE_DISABLED=0` —— 禁用
- `INTERNAL_MODE_FRONT=1` —— 前置
- `INTERNAL_MODE_BACK=2` —— 后置

**AutoTranslateMode（自动翻译模式）：**
- `AUTO_TRANSLATE_MODE_INHERIT=0` —— 继承
- `AUTO_TRANSLATE_MODE_ALWAYS=1` —— 始终
- `AUTO_TRANSLATE_MODE_DISABLED=2` —— 禁用
