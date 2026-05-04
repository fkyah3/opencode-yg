## PinJoint2D（销关节2D） <- Joint2D（关节2D）

一种物理关节，将两个 2D 物理体连接在一个单点上，允许它们自由旋转。例如，可以将 RigidBody2D 连接到 StaticBody2D 来创建钟摆或跷跷板。

**属性（Props）：**
- angular_limit_enabled: bool = false —— 角度限制启用
- angular_limit_lower: float = 0.0 —— 角度限制下限
- angular_limit_upper: float = 0.0 —— 角度限制上限
- motor_enabled: bool = false —— 马达启用
- motor_target_velocity: float = 0.0 —— 马达目标速度
- softness: float = 0.0 —— 柔度
