## GDExtension（GDExtension）<- Resource（资源）

GDExtension 资源类型表示一个可以扩展引擎功能的动态库。GDExtensionManager 单例负责加载、重载和卸载 GDExtension 资源。**注意：** GDExtension 本身不是脚本语言，与 GDScript 资源无关。

**方法（Methods）：**
- get_minimum_library_initialization_level() -> int —— 获取最小库初始化级别
- is_library_open() -> bool —— 库是否已打开

**枚举（Enums）：**
**InitializationLevel：** INITIALIZATION_LEVEL_CORE=0 —— 核心初始化级别, INITIALIZATION_LEVEL_SERVERS=1 —— 服务器初始化级别, INITIALIZATION_LEVEL_SCENE=2 —— 场景初始化级别, INITIALIZATION_LEVEL_EDITOR=3 —— 编辑器初始化级别
