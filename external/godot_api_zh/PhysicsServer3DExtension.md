## PhysicsServer3DExtension（物理服务器3D扩展） <- PhysicsServer3D（物理服务器3D）

此类通过提供可覆盖的额外虚方法来扩展 PhysicsServer3D。当这些方法被覆盖时，它们将被调用以替代物理服务器的内部方法。旨在与 GDExtension 一起使用以创建 PhysicsServer3D 的自定义实现。

**Methods（方法）：**
- body_test_motion_is_excluding_body(body: RID) -> bool —— 测试运动是否排除了指定物体
- body_test_motion_is_excluding_object(object: int) -> bool —— 测试运动是否排除了指定对象
