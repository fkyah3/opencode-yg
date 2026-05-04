## ConcavePolygonShape2D（凹多边形形状2D）<- Shape2D（2D形状）

一种 2D 折线形状，旨在用于物理。在 `CollisionPolygon2D.BUILD_SEGMENTS` 模式下，在 CollisionPolygon2D 内部使用。作为仅由相互连接的线段组成的集合，ConcavePolygonShape2D 是最灵活可配置的单一 2D 形状。它可用于形成任何性质的多边形，甚至是不包围区域的形状。但是，即使相互连接的线段确实包围了一个区域，ConcavePolygonShape2D 也是*空心*的，这通常使其不适合物理或检测。**注意：** 当用于碰撞时，ConcavePolygonShape2D 旨在与静态 CollisionShape2D 节点（如 StaticBody2D）配合使用，在非 Static 模式下可能不适用于 CharacterBody2D 或 RigidBody2D。**警告：** 较小的物理体在快速移动时有可能穿过此形状。这是因为在一帧中，物理体可能位于形状的"外部"，而在下一帧可能位于"内部"。ConcavePolygonShape2D 是空心的，因此无法检测到碰撞。**性能：** 由于其复杂性，ConcavePolygonShape2D 是碰撞检测最慢的 2D 碰撞形状。其使用通常应限于关卡几何体。如果折线是闭合的，可以使用 CollisionPolygon2D 的 `CollisionPolygon2D.BUILD_SOLIDS` 模式，该模式将多边形分解为凸多边形；有关说明，请参见 ConvexPolygonShape2D 的文档。

**属性（Props）：**
- segments: PackedVector2Array = PackedVector2Array() —— 线段
