## CylinderShape3D（圆柱体形状3D） <- Shape3D（形状3D）

一种 3D 圆柱体形状，用于物理系统。通常用于为 CollisionShape3D 提供形状。**注意：** 圆柱体碰撞形状存在若干已知问题。建议改用 CapsuleShape3D 或 BoxShape3D。**性能：** CylinderShape3D 的碰撞检测速度较快，但慢于 CapsuleShape3D、BoxShape3D 和 SphereShape3D。

**属性（Props）：**
- height: float = 2.0 —— 高度
- radius: float = 0.5 —— 半径
