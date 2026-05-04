## VehicleWheel3D <- Node3D（节点3D）

用作 VehicleBody3D 父节点的子节点，模拟其中一个车轮的行为。该节点还充当碰撞器，检测车轮是否接触表面。**注意：** 此类存在已知问题，并非设计用于提供逼真的 3D 车辆物理。如果需要高级车辆物理，可能需要使用其他 PhysicsBody3D 类编写自己的物理集成。

**属性（Props）：**
- brake: float = 0.0 —— 刹车
- damping_compression: float = 0.83 —— 减震压缩阻尼
- damping_relaxation: float = 0.88 —— 减震回弹阻尼
- engine_force: float = 0.0 —— 引擎驱动力
- physics_interpolation_mode: int (Node.PhysicsInterpolationMode) = 2 —— 物理插值模式
- steering: float = 0.0 —— 转向
- suspension_max_force: float = 6000.0 —— 悬挂最大力
- suspension_stiffness: float = 5.88 —— 悬挂刚度
- suspension_travel: float = 0.2 —— 悬挂行程
- use_as_steering: bool = false —— 用作转向轮
- use_as_traction: bool = false —— 用作驱动轮
- wheel_friction_slip: float = 10.5 —— 车轮摩擦滑动
- wheel_radius: float = 0.5 —— 车轮半径
- wheel_rest_length: float = 0.15 —— 车轮静止长度
- wheel_roll_influence: float = 0.1 —— 车轮滚动影响

**方法（Methods）：**
- get_contact_body() -> Node3D —— 获取接触的物体
- get_contact_normal() -> Vector3 —— 获取接触法线
- get_contact_point() -> Vector3 —— 获取接触点
- get_rpm() -> float —— 获取转速
- get_skidinfo() -> float —— 获取打滑信息
- is_in_contact() -> bool —— 是否接触
