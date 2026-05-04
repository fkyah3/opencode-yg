## BoxShape3D（3D盒形碰撞体） <- Shape3D（3D形状）

用于物理系统的 3D 盒形形状。通常用于为 CollisionShape3D 提供形状。**性能：** BoxShape3D 的碰撞检测速度很快。快于 CapsuleShape3D 和 CylinderShape3D，但慢于 SphereShape3D。

**属性（Props）：**
- size: Vector3 = Vector3(1, 1, 1) —— 盒体尺寸
