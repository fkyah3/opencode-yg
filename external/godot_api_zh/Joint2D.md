## Joint2D（2D关节） <- Node2D（2D节点）

2D 物理系统中所有关节的抽象基类。2D 关节将两个物理体（`node_a` 和 `node_b`）绑定在一起，并施加约束。

**属性（Props）：**
- bias: float = 0.0 —— 约束偏向
- disable_collision: bool = true —— 是否禁用两物体间的碰撞
- node_a: NodePath = NodePath("") —— 关节连接的物理体A
- node_b: NodePath = NodePath("") —— 关节连接的物理体B

**方法（Methods）：**
- get_rid() -> RID —— 获取 RID
