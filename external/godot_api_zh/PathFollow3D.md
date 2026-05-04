## PathFollow3D（3D路径跟随） <- Node3D（3D节点）

该节点以其父节点 Path3D 为基础，返回其中给定距离第一个顶点的坐标。它有助于让其他节点跟随路径，而无需编写移动模式代码。为此，其他节点必须是此节点的子节点。当设置此节点的 `progress` 时，子节点将相应地移动。

**属性（Props）：**
- cubic_interp: bool = true —— 立方插值
- h_offset: float = 0.0 —— 水平偏移
- loop: bool = true —— 是否循环
- progress: float = 0.0 —— 进度
- progress_ratio: float = 0.0 —— 进度比例
- rotation_mode: int (PathFollow3D.RotationMode) = 3 —— 旋转模式
- tilt_enabled: bool = true —— 是否启用倾斜
- use_model_front: bool = false —— 是否使用模型正面方向
- v_offset: float = 0.0 —— 垂直偏移

**方法（Methods）：**
- correct_posture(transform: Transform3D, rotation_mode: int) -> Transform3D —— 修正姿态

**枚举（Enums）：**
**RotationMode（旋转模式）：** ROTATION_NONE=0 —— 无旋转, ROTATION_Y=1 —— 绕Y轴, ROTATION_XY=2 —— 绕XY轴, ROTATION_XYZ=3 —— 绕XYZ轴, ROTATION_ORIENTED=4 —— 定向
