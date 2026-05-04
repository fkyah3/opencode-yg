## NavigationServer2DManager（导航服务器2D管理器） <- Object（对象）

NavigationServer2DManager 是用于注册 NavigationServer2D 实现和设置默认实现的 API。**注意：**运行时无法切换服务器。此类仅在启动时的服务器初始化层级使用。

**方法（Methods）：**
- register_server(name: String, create_callback: Callable) —— 注册导航服务器
- set_default_server(name: String, priority: int) —— 设置默认服务器
