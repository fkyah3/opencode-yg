## ConvexPolygonShape2D（凸多边形形状2D）<- Shape2D（2D形状）

一种 2D 凸多边形形状，旨在用于物理。在 `CollisionPolygon2D.BUILD_SOLIDS` 模式下，在 CollisionPolygon2D 内部使用。ConvexPolygonShape2D 是*实心*的，这意味着它能检测到完全在其内部的物体的碰撞，而 ConcavePolygonShape2D 是空心的。这使得它更适合检测和物理。**凸分解：** 凹多边形可以分割成多个凸多边形。这使得动态物理体能够具有复杂的凹面碰撞（以性能为代价），可以通过使用多个 ConvexPolygonShape2D 节点或使用 `CollisionPolygon2D.BUILD_SOLIDS` 模式的 CollisionPolygon2D 节点来实现。要从精灵生成碰撞多边形，选择 Sprite2D 节点，转到视口上方出现的 **Sprite2D** 菜单，然后选择 **Create Polygon2D Sibling**。**性能：** ConvexPolygonShape2D 的碰撞检测速度比 ConcavePolygonShape2D 快，但比原始碰撞形状（如 CircleShape2D 和 RectangleShape2D）慢。其使用通常应限于无法用原始形状准确表示碰撞的中等大小对象。

**属性（Props）：**
- points: PackedVector2Array = PackedVector2Array() —— 点集

**方法（Methods）：**
- set_point_cloud(point_cloud: PackedVector2Array) —— 设置点云
