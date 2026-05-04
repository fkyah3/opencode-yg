## MainLoop <- Object（对象）

MainLoop 是 Godot 项目游戏循环的抽象基类。它被 SceneTree 继承，SceneTree 是 Godot 项目中使用的默认游戏循环实现，不过也可以编写和使用自己的 MainLoop 子类来替代场景树。在应用程序启动时，必须向操作系统提供 MainLoop 实现；否则应用程序将退出。除非从命令行提供了 MainLoop 脚本（例如使用 `godot -s my_loop.gd`）或覆盖了 `ProjectSettings.application/run/main_loop_type` 项目设置，否则这会自动发生（并创建一个 SceneTree）。以下是一个实现简单 MainLoop 的示例脚本：

**信号（Signals）：**
- on_request_permissions_result(permission: String, granted: bool)

**枚举（Enums）：**
**常量（Constants）：** NOTIFICATION_OS_MEMORY_WARNING=2009, NOTIFICATION_TRANSLATION_CHANGED=2010, NOTIFICATION_WM_ABOUT=2011, NOTIFICATION_CRASH=2012, NOTIFICATION_OS_IME_UPDATE=2013, NOTIFICATION_APPLICATION_RESUMED=2014, NOTIFICATION_APPLICATION_PAUSED=2015, NOTIFICATION_APPLICATION_FOCUS_IN=2016, NOTIFICATION_APPLICATION_FOCUS_OUT=2017, NOTIFICATION_TEXT_SERVER_CHANGED=2018
