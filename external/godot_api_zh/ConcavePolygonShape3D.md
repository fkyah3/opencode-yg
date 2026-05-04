## ConcavePolygonShape3D（凹多边形形状3D）<- Shape3D（3D形状）

一种 3D 三角网格形状，旨在用于物理。通常用于为 CollisionShape3D 提供形状。作为仅由相互连接的三角形组成的集合，ConcavePolygonShape3D 是最灵活可配置的单一 3D 形状。它可用于形成任何性质的多面体，甚至是不包围体积的形状。但是，即使相互连接的三角形确实包围了一个体积，ConcavePolygonShape3D 也是*空心*的，这通常使其不适合物理或检测。**注意：** 当用于碰撞时，ConcavePolygonShape3D 旨在与静态 CollisionShape3D 节点（如 StaticBody3D）配合使用，在非 Static 模式下可能不适用于 CharacterBody3D 或 RigidBody3D。**警告：** 较小的物理体在快速移动时有可能穿过此形状。这是因为在一帧中，物理体可能位于形状的"外部"，而在下一帧可能位于"内部"。ConcavePolygonShape3D 是空心的，因此无法检测到碰撞。**性能：** 由于其复杂性，ConcavePolygonShape3D 是碰撞检测最慢的 3D 碰撞形状。其使用通常应限于关卡几何体。对于凸几何体，应使用 ConvexPolygonShape3D。对于需要凹面碰撞的动态物理体，可以使用多个 ConvexPolygonShape3D 通过凸分解来表示其碰撞；有关说明，请参见 ConvexPolygonShape3D 的文档。

**属性（Props）：**
- backface_collision: bool = false —— 背面碰撞

**方法（Methods）：**
- get_faces() -> PackedVector3Array —— 获取面
- set_faces(faces: PackedVector3Array) —— 设置面
