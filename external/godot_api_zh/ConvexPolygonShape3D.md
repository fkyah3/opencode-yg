## ConvexPolygonShape3D（凸多边形形状3D）<- Shape3D（3D形状）

一种 3D 凸多面体形状，旨在用于物理。通常用于为 CollisionShape3D 提供形状。ConvexPolygonShape3D 是*实心*的，这意味着它能检测到完全在其内部的物体的碰撞，而 ConcavePolygonShape3D 是空心的。这使得它更适合检测和物理。**凸分解：** 凹多面体可以分割成多个凸多面体。这使得动态物理体能够具有复杂的凹面碰撞（以性能为代价），可以通过使用多个 ConvexPolygonShape3D 节点来实现。要从网格生成凸分解，选择 MeshInstance3D 节点，转到视口上方出现的 **Mesh** 菜单，然后选择 **Create Multiple Convex Collision Siblings**。或者在脚本中调用 `MeshInstance3D.create_multiple_convex_collisions` 在运行时执行此分解。**性能：** ConvexPolygonShape3D 的碰撞检测速度比 ConcavePolygonShape3D 快，但比原始碰撞形状（如 SphereShape3D 和 BoxShape3D）慢。其使用通常应限于无法用原始形状准确表示碰撞的中等大小对象。

**属性（Props）：**
- points: PackedVector3Array = PackedVector3Array() —— 点集
