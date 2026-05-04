## GDExtensionManager <- Object（对象）

GDExtensionManager 加载、初始化并跟踪项目中所有可用的 GDExtension 库。**注意：** 除非你知道自己在做什么，否则不必担心 GDExtension。

**方法（Methods）：**
- get_extension(path: String) -> GDExtension —— 获取扩展
- get_loaded_extensions() -> PackedStringArray —— 获取已加载的扩展列表
- is_extension_loaded(path: String) -> bool —— 扩展是否已加载
- load_extension(path: String) -> int —— 加载扩展
- load_extension_from_function(path: String, init_func: const GDExtensionInitializationFunction*) -> int —— 通过函数加载扩展
- reload_extension(path: String) -> int —— 重新加载扩展
- unload_extension(path: String) -> int —— 卸载扩展

**信号（Signals）：**
- extension_loaded(extension: GDExtension) —— 扩展已加载
- extension_unloading(extension: GDExtension) —— 扩展正在卸载
- extensions_reloaded —— 扩展已重新加载

**枚举（Enums）：**
**LoadStatus（加载状态）：** LOAD_STATUS_OK=0（成功）, LOAD_STATUS_FAILED=1（失败）, LOAD_STATUS_ALREADY_LOADED=2（已加载）, LOAD_STATUS_NOT_LOADED=3（未加载）, LOAD_STATUS_NEEDS_RESTART=4（需要重启）
