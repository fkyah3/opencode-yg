## SliderJoint3D（滑动关节3D）<- Joint3D（关节3D）

一种物理关节，限制 3D 物理体沿轴相对于另一个物理体的运动。例如，物体 A 可以是代表活塞底座的 StaticBody3D，而物体 B 可以是代表活塞头的 RigidBody3D，上下移动。

**属性（Props）：**
- angular_limit/damping: float = 0.0 —— 角度限制阻尼
- angular_limit/lower_angle: float = 0.0 —— 角度限制下限
- angular_limit/restitution: float = 0.7 —— 角度限制弹性
- angular_limit/softness: float = 1.0 —— 角度限制柔度
- angular_limit/upper_angle: float = 0.0 —— 角度限制上限
- angular_motion/damping: float = 1.0 —— 角度运动阻尼
- angular_motion/restitution: float = 0.7 —— 角度运动弹性
- angular_motion/softness: float = 1.0 —— 角度运动柔度
- angular_ortho/damping: float = 1.0 —— 角度正交阻尼
- angular_ortho/restitution: float = 0.7 —— 角度正交弹性
- angular_ortho/softness: float = 1.0 —— 角度正交柔度
- linear_limit/damping: float = 1.0 —— 线性限制阻尼
- linear_limit/lower_distance: float = -1.0 —— 线性限制下距
- linear_limit/restitution: float = 0.7 —— 线性限制弹性
- linear_limit/softness: float = 1.0 —— 线性限制柔度
- linear_limit/upper_distance: float = 1.0 —— 线性限制上距
- linear_motion/damping: float = 0.0 —— 线性运动阻尼
- linear_motion/restitution: float = 0.7 —— 线性运动弹性
- linear_motion/softness: float = 1.0 —— 线性运动柔度
- linear_ortho/damping: float = 1.0 —— 线性正交阻尼
- linear_ortho/restitution: float = 0.7 —— 线性正交弹性
- linear_ortho/softness: float = 1.0 —— 线性正交柔度

**方法（Methods）：**
- get_param(param: int) -> float —— 获取参数
- set_param(param: int, value: float) —— 设置参数

**枚举（Enums）：**
**Param（参数）：** PARAM_LINEAR_LIMIT_UPPER=0 —— 线性限制上限, PARAM_LINEAR_LIMIT_LOWER=1 —— 线性限制下限, PARAM_LINEAR_LIMIT_SOFTNESS=2 —— 线性限制柔度, PARAM_LINEAR_LIMIT_RESTITUTION=3 —— 线性限制弹性, PARAM_LINEAR_LIMIT_DAMPING=4 —— 线性限制阻尼, PARAM_LINEAR_MOTION_SOFTNESS=5 —— 线性运动柔度, PARAM_LINEAR_MOTION_RESTITUTION=6 —— 线性运动弹性, PARAM_LINEAR_MOTION_DAMPING=7 —— 线性运动阻尼, PARAM_LINEAR_ORTHOGONAL_SOFTNESS=8 —— 线性正交柔度, PARAM_LINEAR_ORTHOGONAL_RESTITUTION=9 —— 线性正交弹性, ...
