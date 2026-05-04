## Node3D（3D节点）<- Node（节点）

Node3D 节点是 3D 空间中节点的基本表示。所有其他 3D 节点都继承自此类。仿射变换（平移、旋转、缩放）在相对于父节点的坐标系中计算，除非 Node3D 的 `top_level` 为 `true`。在此坐标系中，仿射变换对应 Node3D 的 `transform` 上的直接仿射变换。术语*父空间（parent space）*即指此坐标系。附着在 Node3D 本身的坐标系称为对象局部坐标系，或*局部空间（local space）*。**注意：** 除非另有说明，所有需要角度参数的方法必须接收*弧度*值。要将角度转换为弧度，请使用 `@GlobalScope.deg_to_rad`。**注意：** 在 Godot 3 及更早版本中，Node3D 被命名为 *Spatial*。

**属性（Props）：**
- basis: Basis —— 基
- global_basis: Basis —— 全局基
- global_position: Vector3 —— 全局位置
- global_rotation: Vector3 —— 全局旋转（弧度）
- global_rotation_degrees: Vector3 —— 全局旋转（角度）
- global_transform: Transform3D —— 全局变换
- position: Vector3 = Vector3(0, 0, 0) —— 位置
- quaternion: Quaternion —— 四元数
- rotation: Vector3 = Vector3(0, 0, 0) —— 旋转（弧度）
- rotation_degrees: Vector3 —— 旋转（角度）
- rotation_edit_mode: int (Node3D.RotationEditMode) = 0 —— 旋转编辑模式
- rotation_order: int (EulerOrder) = 2 —— 旋转顺序
- scale: Vector3 = Vector3(1, 1, 1) —— 缩放
- top_level: bool = false —— 是否为顶层
- transform: Transform3D = Transform3D(1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0) —— 变换
- visibility_parent: NodePath = NodePath("") —— 可见性父节点
- visible: bool = true —— 是否可见

**方法（Methods）：**
- add_gizmo(gizmo: Node3DGizmo) —— 添加 gizmo
- clear_gizmos() —— 清除所有 gizmo
- clear_subgizmo_selection() —— 清除子 gizmo 选择
- force_update_transform() —— 强制更新变换
- get_gizmos() -> Node3DGizmo[] —— 获取所有 gizmo
- get_global_transform_interpolated() -> Transform3D —— 获取插值后的全局变换
- get_parent_node_3d() -> Node3D —— 获取父 Node3D
- get_world_3d() -> World3D —— 获取 3D 世界
- global_rotate(axis: Vector3, angle: float) —— 全局旋转
- global_scale(scale: Vector3) —— 全局缩放
- global_translate(offset: Vector3) —— 全局平移
- hide() —— 隐藏
- is_local_transform_notification_enabled() -> bool —— 局部变换通知是否启用
- is_scale_disabled() -> bool —— 缩放是否禁用
- is_transform_notification_enabled() -> bool —— 变换通知是否启用
- is_visible_in_tree() -> bool —— 在场景树中是否可见
- look_at(target: Vector3, up: Vector3 = Vector3(0, 1, 0), use_model_front: bool = false) —— 看向目标
- look_at_from_position(position: Vector3, target: Vector3, up: Vector3 = Vector3(0, 1, 0), use_model_front: bool = false) —— 从指定位置看向目标
- orthonormalize() —— 正交归一化
- rotate(axis: Vector3, angle: float) —— 旋转
- rotate_object_local(axis: Vector3, angle: float) —— 绕局部轴旋转对象
- rotate_x(angle: float) —— 绕 X 轴旋转
- rotate_y(angle: float) —— 绕 Y 轴旋转
- rotate_z(angle: float) —— 绕 Z 轴旋转
- scale_object_local(scale: Vector3) —— 局部缩放对象
- set_disable_scale(disable: bool) —— 设置禁用缩放
- set_identity() —— 设置为单位变换
- set_ignore_transform_notification(enabled: bool) —— 设置忽略变换通知
- set_notify_local_transform(enable: bool) —— 设置通知局部变换
- set_notify_transform(enable: bool) —— 设置通知变换
- set_subgizmo_selection(gizmo: Node3DGizmo, id: int, transform: Transform3D) —— 设置子 gizmo 选择
- show() —— 显示
- to_global(local_point: Vector3) -> Vector3 —— 局部坐标转全局坐标
- to_local(global_point: Vector3) -> Vector3 —— 全局坐标转局部坐标
- translate(offset: Vector3) —— 平移
- translate_object_local(offset: Vector3) —— 局部平移对象
- update_gizmos() —— 更新 gizmo

**信号（Signals）：**
- visibility_changed —— 可见性改变时触发

**枚举（Enums）：**
**常量（Constants）：** NOTIFICATION_TRANSFORM_CHANGED=2000 —— 变换改变通知, NOTIFICATION_ENTER_WORLD=41 —— 进入世界通知, NOTIFICATION_EXIT_WORLD=42 —— 退出世界通知, NOTIFICATION_VISIBILITY_CHANGED=43 —— 可见性改变通知, NOTIFICATION_LOCAL_TRANSFORM_CHANGED=44 —— 局部变换改变通知
**RotationEditMode（旋转编辑模式）：** ROTATION_EDIT_MODE_EULER=0 —— 欧拉角, ROTATION_EDIT_MODE_QUATERNION=1 —— 四元数, ROTATION_EDIT_MODE_BASIS=2 —— 基
