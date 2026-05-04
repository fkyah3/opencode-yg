## Generic6DOFJoint3D（通用六自由度关节3D） <- Joint3D（关节3D）

Generic6DOFJoint3D（6 自由度）关节通过锁定某些轴的旋转和平移来实现自定义关节类型。前 3 个自由度表示物理体的线性运动，后 3 个自由度表示物理体的角运动。每个轴可以是锁定或受限的。

**属性（Props）：**
- angular_limit_x/damping: float = 1.0 —— X 轴角度限制阻尼
- angular_limit_x/enabled: bool = true —— X 轴角度限制启用
- angular_limit_x/erp: float = 0.5 —— X 轴角度限制 ERP
- angular_limit_x/force_limit: float = 0.0 —— X 轴角度限制力限制
- angular_limit_x/lower_angle: float = 0.0 —— X 轴角度下限
- angular_limit_x/restitution: float = 0.0 —— X 轴角度限制恢复
- angular_limit_x/softness: float = 0.5 —— X 轴角度限制柔软度
- angular_limit_x/upper_angle: float = 0.0 —— X 轴角度上限
- angular_limit_y/damping: float = 1.0 —— Y 轴角度限制阻尼
- angular_limit_y/enabled: bool = true —— Y 轴角度限制启用
- angular_limit_y/erp: float = 0.5 —— Y 轴角度限制 ERP
- angular_limit_y/force_limit: float = 0.0 —— Y 轴角度限制力限制
- angular_limit_y/lower_angle: float = 0.0 —— Y 轴角度下限
- angular_limit_y/restitution: float = 0.0 —— Y 轴角度限制恢复
- angular_limit_y/softness: float = 0.5 —— Y 轴角度限制柔软度
- angular_limit_y/upper_angle: float = 0.0 —— Y 轴角度上限
- angular_limit_z/damping: float = 1.0 —— Z 轴角度限制阻尼
- angular_limit_z/enabled: bool = true —— Z 轴角度限制启用
- angular_limit_z/erp: float = 0.5 —— Z 轴角度限制 ERP
- angular_limit_z/force_limit: float = 0.0 —— Z 轴角度限制力限制
- angular_limit_z/lower_angle: float = 0.0 —— Z 轴角度下限
- angular_limit_z/restitution: float = 0.0 —— Z 轴角度限制恢复
- angular_limit_z/softness: float = 0.5 —— Z 轴角度限制柔软度
- angular_limit_z/upper_angle: float = 0.0 —— Z 轴角度上限
- angular_motor_x/enabled: bool = false —— X 轴角度马达启用
- angular_motor_x/force_limit: float = 300.0 —— X 轴角度马达力限制
- angular_motor_x/target_velocity: float = 0.0 —— X 轴角度马达目标速度
- angular_motor_y/enabled: bool = false —— Y 轴角度马达启用
- angular_motor_y/force_limit: float = 300.0 —— Y 轴角度马达力限制
- angular_motor_y/target_velocity: float = 0.0 —— Y 轴角度马达目标速度
- angular_motor_z/enabled: bool = false —— Z 轴角度马达启用
- angular_motor_z/force_limit: float = 300.0 —— Z 轴角度马达力限制
- angular_motor_z/target_velocity: float = 0.0 —— Z 轴角度马达目标速度
- angular_spring_x/damping: float = 0.0 —— X 轴角度弹簧阻尼
- angular_spring_x/enabled: bool = false —— X 轴角度弹簧启用
- angular_spring_x/equilibrium_point: float = 0.0 —— X 轴角度弹簧平衡点
- angular_spring_x/stiffness: float = 0.0 —— X 轴角度弹簧刚度
- angular_spring_y/damping: float = 0.0 —— Y 轴角度弹簧阻尼
- angular_spring_y/enabled: bool = false —— Y 轴角度弹簧启用
- angular_spring_y/equilibrium_point: float = 0.0 —— Y 轴角度弹簧平衡点
- angular_spring_y/stiffness: float = 0.0 —— Y 轴角度弹簧刚度
- angular_spring_z/damping: float = 0.0 —— Z 轴角度弹簧阻尼
- angular_spring_z/enabled: bool = false —— Z 轴角度弹簧启用
- angular_spring_z/equilibrium_point: float = 0.0 —— Z 轴角度弹簧平衡点
- angular_spring_z/stiffness: float = 0.0 —— Z 轴角度弹簧刚度
- linear_limit_x/damping: float = 1.0 —— X 轴线性限制阻尼
- linear_limit_x/enabled: bool = true —— X 轴线性限制启用
- linear_limit_x/lower_distance: float = 0.0 —— X 轴线性下限距离
- linear_limit_x/restitution: float = 0.5 —— X 轴线性限制恢复
- linear_limit_x/softness: float = 0.7 —— X 轴线性限制柔软度
- linear_limit_x/upper_distance: float = 0.0 —— X 轴线性上限距离
- linear_limit_y/damping: float = 1.0 —— Y 轴线性限制阻尼
- linear_limit_y/enabled: bool = true —— Y 轴线性限制启用
- linear_limit_y/lower_distance: float = 0.0 —— Y 轴线性下限距离
- linear_limit_y/restitution: float = 0.5 —— Y 轴线性限制恢复
- linear_limit_y/softness: float = 0.7 —— Y 轴线性限制柔软度
- linear_limit_y/upper_distance: float = 0.0 —— Y 轴线性上限距离
- linear_limit_z/damping: float = 1.0 —— Z 轴线性限制阻尼
- linear_limit_z/enabled: bool = true —— Z 轴线性限制启用
- linear_limit_z/lower_distance: float = 0.0 —— Z 轴线性下限距离
- linear_limit_z/restitution: float = 0.5 —— Z 轴线性限制恢复
- linear_limit_z/softness: float = 0.7 —— Z 轴线性限制柔软度
- linear_limit_z/upper_distance: float = 0.0 —— Z 轴线性上限距离
- linear_motor_x/enabled: bool = false —— X 轴线性马达启用
- linear_motor_x/force_limit: float = 0.0 —— X 轴线性马达力限制
- linear_motor_x/target_velocity: float = 0.0 —— X 轴线性马达目标速度
- linear_motor_y/enabled: bool = false —— Y 轴线性马达启用
- linear_motor_y/force_limit: float = 0.0 —— Y 轴线性马达力限制
- linear_motor_y/target_velocity: float = 0.0 —— Y 轴线性马达目标速度
- linear_motor_z/enabled: bool = false —— Z 轴线性马达启用
- linear_motor_z/force_limit: float = 0.0 —— Z 轴线性马达力限制
- linear_motor_z/target_velocity: float = 0.0 —— Z 轴线性马达目标速度
- linear_spring_x/damping: float = 0.01 —— X 轴线性弹簧阻尼
- linear_spring_x/enabled: bool = false —— X 轴线性弹簧启用
- linear_spring_x/equilibrium_point: float = 0.0 —— X 轴线性弹簧平衡点
- linear_spring_x/stiffness: float = 0.01 —— X 轴线性弹簧刚度
- linear_spring_y/damping: float = 0.01 —— Y 轴线性弹簧阻尼
- linear_spring_y/enabled: bool = false —— Y 轴线性弹簧启用
- linear_spring_y/equilibrium_point: float = 0.0 —— Y 轴线性弹簧平衡点
- linear_spring_y/stiffness: float = 0.01 —— Y 轴线性弹簧刚度
- linear_spring_z/damping: float = 0.01 —— Z 轴线性弹簧阻尼
- linear_spring_z/enabled: bool = false —— Z 轴线性弹簧启用
- linear_spring_z/equilibrium_point: float = 0.0 —— Z 轴线性弹簧平衡点
- linear_spring_z/stiffness: float = 0.01 —— Z 轴线性弹簧刚度

**方法（Methods）：**
- get_flag_x(flag: int) -> bool —— 获取 X 轴标志
- get_flag_y(flag: int) -> bool —— 获取 Y 轴标志
- get_flag_z(flag: int) -> bool —— 获取 Z 轴标志
- get_param_x(param: int) -> float —— 获取 X 轴参数
- get_param_y(param: int) -> float —— 获取 Y 轴参数
- get_param_z(param: int) -> float —— 获取 Z 轴参数
- set_flag_x(flag: int, value: bool) —— 设置 X 轴标志
- set_flag_y(flag: int, value: bool) —— 设置 Y 轴标志
- set_flag_z(flag: int, value: bool) —— 设置 Z 轴标志
- set_param_x(param: int, value: float) —— 设置 X 轴参数
- set_param_y(param: int, value: float) —— 设置 Y 轴参数
- set_param_z(param: int, value: float) —— 设置 Z 轴参数

**枚举（Enums）：**
**Param（参数）：** PARAM_LINEAR_LOWER_LIMIT=0（线性下限）, PARAM_LINEAR_UPPER_LIMIT=1（线性上限）, PARAM_LINEAR_LIMIT_SOFTNESS=2（线性限制柔软度）, PARAM_LINEAR_RESTITUTION=3（线性恢复）, PARAM_LINEAR_DAMPING=4（线性阻尼）, PARAM_LINEAR_MOTOR_TARGET_VELOCITY=5（线性马达目标速度）, PARAM_LINEAR_MOTOR_FORCE_LIMIT=6（线性马达力限制）, PARAM_LINEAR_SPRING_STIFFNESS=7（线性弹簧刚度）, PARAM_LINEAR_SPRING_DAMPING=8（线性弹簧阻尼）, PARAM_LINEAR_SPRING_EQUILIBRIUM_POINT=9（线性弹簧平衡点）, ...
**Flag（标志）：** FLAG_ENABLE_LINEAR_LIMIT=0（启用线性限制）, FLAG_ENABLE_ANGULAR_LIMIT=1（启用角度限制）, FLAG_ENABLE_LINEAR_SPRING=3（启用线性弹簧）, FLAG_ENABLE_ANGULAR_SPRING=2（启用角度弹簧）, FLAG_ENABLE_MOTOR=4（启用马达）, FLAG_ENABLE_LINEAR_MOTOR=5（启用线性马达）, FLAG_MAX=6（最大标志）
