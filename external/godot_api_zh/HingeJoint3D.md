## HingeJoint3D（铰链关节3D） <- Joint3D（关节3D）

一种物理关节，限制 3D 物理体围绕轴相对于另一个物理体旋转。例如，Body A 可以是一个表示门铰链的 StaticBody3D，一个 RigidBody3D 围绕它旋转。

**属性（Props）：**
- angular_limit/bias: float = 0.3 —— 角度限制偏差
- angular_limit/enable: bool = false —— 启用角度限制
- angular_limit/lower: float = -1.5707964 —— 角度下限
- angular_limit/relaxation: float = 1.0 —— 角度限制松弛
- angular_limit/softness: float = 0.9 —— 角度限制柔软度
- angular_limit/upper: float = 1.5707964 —— 角度上限
- motor/enable: bool = false —— 启用马达
- motor/max_impulse: float = 1.0 —— 马达最大冲量
- motor/target_velocity: float = 1.0 —— 马达目标速度
- params/bias: float = 0.3 —— 参数偏差

**方法（Methods）：**
- get_flag(flag: int) -> bool —— 获取标志
- get_param(param: int) -> float —— 获取参数
- set_flag(flag: int, enabled: bool) —— 设置标志
- set_param(param: int, value: float) —— 设置参数

**枚举（Enums）：**
**Param（参数）：** PARAM_BIAS=0（偏差）, PARAM_LIMIT_UPPER=1（限制上限）, PARAM_LIMIT_LOWER=2（限制下限）, PARAM_LIMIT_BIAS=3（限制偏差）, PARAM_LIMIT_SOFTNESS=4（限制柔软度）, PARAM_LIMIT_RELAXATION=5（限制松弛）, PARAM_MOTOR_TARGET_VELOCITY=6（马达目标速度）, PARAM_MOTOR_MAX_IMPULSE=7（马达最大冲量）, PARAM_MAX=8（最大参数）
**Flag（标志）：** FLAG_USE_LIMIT=0（使用限制）, FLAG_ENABLE_MOTOR=1（启用马达）, FLAG_MAX=2（最大标志）
