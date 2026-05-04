## CollisionObject3D（碰撞对象3D）<- Node3D

3D 物理对象的抽象基类。CollisionObject3D 可以持有任意数量的用于碰撞的 Shape3D。每个形状必须分配给一个*形状所有者*。形状所有者不是节点，不会在编辑器中显示，但可以通过代码使用 `shape_owner_*` 方法访问。**警告：** 如果使用了非均匀缩放，此节点可能无法按预期工作。建议保持所有轴上的缩放一致，并改为调整其碰撞形状。

**属性（Props）：**
- collision_layer: int = 1 —— 碰撞层
- collision_mask: int = 1 —— 碰撞掩码
- collision_priority: float = 1.0 —— 碰撞优先级
- disable_mode: int (CollisionObject3D.DisableMode) = 0 —— 禁用模式
- input_capture_on_drag: bool = false —— 拖动时捕获输入
- input_ray_pickable: bool = true —— 可射线拾取输入

**方法（Methods）：**
- create_shape_owner(owner: Object) -> int —— 创建形状所有者
- get_collision_layer_value(layer_number: int) -> bool —— 获取碰撞层值
- get_collision_mask_value(layer_number: int) -> bool —— 获取碰撞掩码值
- get_rid() -> RID —— 获取 RID
- get_shape_owners() -> PackedInt32Array —— 获取所有形状所有者
- is_shape_owner_disabled(owner_id: int) -> bool —— 形状所有者是否禁用
- remove_shape_owner(owner_id: int) —— 移除形状所有者
- set_collision_layer_value(layer_number: int, value: bool) —— 设置碰撞层值
- set_collision_mask_value(layer_number: int, value: bool) —— 设置碰撞掩码值
- shape_find_owner(shape_index: int) -> int —— 查找形状所有者
- shape_owner_add_shape(owner_id: int, shape: Shape3D) —— 添加形状到所有者
- shape_owner_clear_shapes(owner_id: int) —— 清除所有者的所有形状
- shape_owner_get_owner(owner_id: int) -> Object —— 获取所有者对象
- shape_owner_get_shape(owner_id: int, shape_id: int) -> Shape3D —— 获取所有者的形状
- shape_owner_get_shape_count(owner_id: int) -> int —— 获取所有者的形状数量
- shape_owner_get_shape_index(owner_id: int, shape_id: int) -> int —— 获取所有者的形状索引
- shape_owner_get_transform(owner_id: int) -> Transform3D —— 获取所有者的变换
- shape_owner_remove_shape(owner_id: int, shape_id: int) —— 移除所有者的形状
- shape_owner_set_disabled(owner_id: int, disabled: bool) —— 设置所有者禁用
- shape_owner_set_transform(owner_id: int, transform: Transform3D) —— 设置所有者的变换

**信号（Signals）：**
- input_event(camera: Node, event: InputEvent, event_position: Vector3, normal: Vector3, shape_idx: int) —— 输入事件
- mouse_entered —— 鼠标进入
- mouse_exited —— 鼠标退出

**枚举（Enums）：**
**DisableMode（禁用模式）：** DISABLE_MODE_REMOVE=0 —— 移除，DISABLE_MODE_MAKE_STATIC=1 —— 设为静态，DISABLE_MODE_KEEP_ACTIVE=2 —— 保持活动
