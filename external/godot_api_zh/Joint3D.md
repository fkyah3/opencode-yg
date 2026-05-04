## Joint3D（关节3D） <- Node3D（节点3D）

所有 3D 物理关节的抽象基类。3D 关节将两个物理体（`node_a` 和 `node_b`）绑定在一起并施加约束。如果只定义了一个体，它将附加到没有碰撞形状的固定 StaticBody3D 上。

**属性（Props）：**
- exclude_nodes_from_collision: bool = true —— 排除节点之间的碰撞
- node_a: NodePath = NodePath("") —— 节点 A
- node_b: NodePath = NodePath("") —— 节点 B
- solver_priority: int = 1 —— 求解器优先级

**方法（Methods）：**
- get_rid() -> RID —— 获取 RID
