## GrooveJoint2D（2D滑槽关节） <- Joint2D（2D关节）

一种物理关节，将两个2D物理体的运动限制在固定轴线上。例如，表示活塞底座的 StaticBody2D 可以连接到表示活塞头的 RigidBody2D，使其上下运动。

**属性（Props）：**
- initial_offset: float = 25.0 —— 初始偏移量
- length: float = 50.0 —— 长度
