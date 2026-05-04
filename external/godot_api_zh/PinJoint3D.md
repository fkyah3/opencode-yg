## PinJoint3D（销关节3D） <- Joint3D（关节3D）

一种物理关节，将两个 3D 物理体连接在一个点上，允许它们自由旋转。例如，可以将 RigidBody3D 连接到 StaticBody3D 来创建摆锤或跷跷板。

**Props（属性）：**
- params/bias: float = 0.3 —— 偏差
- params/damping: float = 1.0 —— 阻尼
- params/impulse_clamp: float = 0.0 —— 冲量钳位

**Methods（方法）：**
- get_param(param: int) -> float —— 获取参数
- set_param(param: int, value: float) —— 设置参数

**Enums（枚举）：**
**Param（参数）：** PARAM_BIAS=0 —— 偏差，PARAM_DAMPING=1 —— 阻尼，PARAM_IMPULSE_CLAMP=2 —— 冲量钳位
