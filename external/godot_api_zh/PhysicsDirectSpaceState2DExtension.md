## PhysicsDirectSpaceState2DExtension（物理直接空间状态2D扩展） <- PhysicsDirectSpaceState2D（物理直接空间状态2D）

此类通过提供可覆盖的附加虚拟方法来扩展 PhysicsDirectSpaceState2D。当这些方法被覆盖时，它们将被调用以替代物理服务器的内部方法。旨在与 GDExtension 一起使用，以创建 PhysicsDirectSpaceState2D 的自定义实现。

**方法（Methods）：**
- is_body_excluded_from_query(body: RID) -> bool —— 物理体是否被排除在查询之外
