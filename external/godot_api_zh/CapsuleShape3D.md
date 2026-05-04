## CapsuleShape3D（3D胶囊形状） <- Shape3D（3D形状）

用于物理系统的 3D 胶囊形状。通常用于为 CollisionShape3D 提供形状。**性能：** CapsuleShape3D 的碰撞检测速度较快。快于 CylinderShape3D，但慢于 SphereShape3D 和 BoxShape3D。

**属性（Props）：**
- height: float = 2.0 —— 胶囊总高度
- mid_height: float —— 胶囊中部高度（只读）
- radius: float = 0.5 —— 胶囊半径
