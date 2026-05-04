## ConeTwistJoint3D（锥形扭转关节3D） <- Joint3D（关节3D）

一种物理关节，以模拟球窝关节的方式连接两个 3D 物理体。扭转轴初始化为 ConeTwistJoint3D 的 X 轴。物理体摆动后，扭转轴计算为关节在两个物理体局部空间中 X 轴的中间值。适用于肢体（如肩膀和臀部）、悬挂在天花板上的灯等。

**属性（Props）：**
- bias: float = 0.3 —— 偏差
- relaxation: float = 1.0 —— 松弛
- softness: float = 0.8 —— 柔软度
- swing_span: float = 0.7853982 —— 摆动范围
- twist_span: float = 3.1415927 —— 扭转范围

**方法（Methods）：**
- get_param(param: int) -> float —— 获取参数
- set_param(param: int, value: float) —— 设置参数

**枚举（Enums）：**
**Param（参数）：** PARAM_SWING_SPAN=0, PARAM_TWIST_SPAN=1, PARAM_BIAS=2, PARAM_SOFTNESS=3, PARAM_RELAXATION=4, PARAM_MAX=5
