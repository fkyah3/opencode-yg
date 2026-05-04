## PhysicsServer2DManager（物理服务器2D管理器） <- Object（对象）

PhysicsServer2DManager 是用于注册 PhysicsServer2D 实现以及设置默认实现的 API。**注意：** 运行时无法切换物理服务器。此类仅在启动时由 Godot 自身或可能的 GDExtension 在服务器初始化级别使用。

**Methods（方法）：**
- register_server(name: String, create_callback: Callable)
- set_default_server(name: String, priority: int)
