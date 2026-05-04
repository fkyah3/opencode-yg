## CapsuleShape2D（2D胶囊形状） <- Shape2D（2D形状）

用于物理系统的 2D 胶囊形状。通常用于为 CollisionShape2D 提供形状。**性能：** CapsuleShape2D 的碰撞检测速度较快，但慢于 RectangleShape2D 和 CircleShape2D。

**属性（Props）：**
- height: float = 30.0 —— 胶囊总高度
- mid_height: float —— 胶囊中部高度（只读）
- radius: float = 10.0 —— 胶囊半径
