## PhysicsServer3DManager（物理服务器3D管理器） <- Object（对象）

PhysicsServer3DManager 是用于注册 PhysicsServer3D 实现以及设置默认实现的 API。**注意：** 无法在运行时切换物理服务器。此类仅在启动时的服务器初始化级别使用，由 Godot 本身以及可能的 GDExtension 使用。

**方法（Methods）：**
- register_server(name: String, create_callback: Callable) —— 注册服务器
- set_default_server(name: String, priority: int) —— 设置默认服务器
