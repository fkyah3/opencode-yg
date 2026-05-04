## SeparationRayShape3D（分离射线形状3D） <- Shape3D（形状3D）

一种 3D 射线形状，用于物理系统。通常用于为 CollisionShape3D 提供形状。当 SeparationRayShape3D 与对象碰撞时，它会尝试通过将其端点移动到碰撞点来与对象分离。例如，角色旁边的 SeparationRayShape3D 可以在接触到楼梯时立即向上移动。

**属性（Props）：**
- length: float = 1.0 —— 长度
- slide_on_slope: bool = false —— 在斜坡上滑动
