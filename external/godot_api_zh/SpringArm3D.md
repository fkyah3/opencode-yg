## SpringArm3D（弹簧臂3D）<- Node3D（节点3D）

SpringArm3D 沿其 Z 轴发射射线或形状，并将所有直接子节点移动到碰撞点，可选留有边距。这适用于第三人称摄像机在狭小空间中靠近玩家的行为（你可能需要从 SpringArm3D 的碰撞检测中排除玩家的碰撞体）。

**属性（Props）：**
- collision_mask: int = 1 —— 碰撞掩码
- margin: float = 0.01 —— 边距
- shape: Shape3D —— 形状
- spring_length: float = 1.0 —— 弹簧长度

**方法（Methods）：**
- add_excluded_object(RID: RID) —— 添加排除对象
- clear_excluded_objects() —— 清除排除对象
- get_hit_length() -> float —— 获取命中长度
- remove_excluded_object(RID: RID) -> bool —— 移除排除对象
