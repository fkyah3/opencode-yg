## VehicleBody3D <- RigidBody3D（刚体3D）

该物理体实现了模拟汽车所需的所有物理逻辑。它基于物理引擎中常见的射线检测车辆系统。除了用于车身的 CollisionShape3D 外，还必须为每个车轮添加 VehicleWheel3D 节点。还应向此节点添加 MeshInstance3D 用于车辆的 3D 模型，但此模型通常不应包含车轮的网格。可以通过 `brake`、`engine_force` 和 `steering` 属性来控制车辆。不应直接更改此节点的位置或方向。**注意：** 此节点的局部正向为 `Vector3.MODEL_FRONT`。**注意：** VehicleBody3D 的原点将决定车辆的重心。为使车辆更贴近地面，原点通常保持较低，将 CollisionShape3D 和 MeshInstance3D 向上移动。**注意：** 此类存在已知问题，并非设计用于提供逼真的 3D 车辆物理。如果需要高级车辆物理，可能需要使用 CharacterBody3D 或 RigidBody3D 编写自己的物理集成。

**属性（Props）：**
- brake: float = 0.0 —— 刹车
- engine_force: float = 0.0 —— 引擎驱动力
- mass: float = 40.0 —— 质量
- steering: float = 0.0 —— 转向
