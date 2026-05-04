## ResourceLoader（资源加载器）<- Object（对象）

用于从文件系统加载资源文件的单例。它使用引擎中注册的众多 ResourceFormatLoader 类（内置或来自插件）将文件加载到内存并转换为引擎可用的格式。**注意：** 你首先需要将文件导入引擎，然后才能使用 `load` 加载它们。如果要在运行时加载图像，可以使用 `Image.load`。如果要导入音频文件，可以使用 `AudioStreamMP3.data` 中描述的代码片段。**注意：** 非资源文件（如纯文本文件）不能使用 ResourceLoader 读取。请改用 FileAccess 读取此类文件，并注意非资源文件默认不会导出（有关导出说明，请参见 FileAccess 类描述中的注释）。

**方法（Methods）：**
- add_resource_format_loader(format_loader: ResourceFormatLoader, at_front: bool = false) —— 添加资源格式加载器
- exists(path: String, type_hint: String = "") -> bool —— 检查资源是否存在
- get_cached_ref(path: String) -> Resource —— 获取缓存的资源引用
- get_dependencies(path: String) -> PackedStringArray —— 获取依赖项
- get_recognized_extensions_for_type(type: String) -> PackedStringArray —— 获取指定类型的可识别扩展名
- get_resource_uid(path: String) -> int —— 获取资源 UID
- has_cached(path: String) -> bool —— 是否有缓存
- list_directory(directory_path: String) -> PackedStringArray —— 列出目录中的资源
- load(path: String, type_hint: String = "", cache_mode: int = 1) -> Resource —— 加载资源
- load_threaded_get(path: String) -> Resource —— 获取线程加载结果
- load_threaded_get_status(path: String, progress: Array = []) -> int —— 获取线程加载状态
- load_threaded_request(path: String, type_hint: String = "", use_sub_threads: bool = false, cache_mode: int = 1) -> int —— 请求线程加载
- remove_resource_format_loader(format_loader: ResourceFormatLoader) —— 移除资源格式加载器
- set_abort_on_missing_resources(abort: bool) —— 设置缺失资源时是否中止

**枚举（Enums）：**
**ThreadLoadStatus（线程加载状态）：** THREAD_LOAD_INVALID_RESOURCE=0 —— 无效资源, THREAD_LOAD_IN_PROGRESS=1 —— 加载中, THREAD_LOAD_FAILED=2 —— 加载失败, THREAD_LOAD_LOADED=3 —— 加载完成
**CacheMode（缓存模式）：** CACHE_MODE_IGNORE=0 —— 忽略缓存, CACHE_MODE_REUSE=1 —— 复用缓存, CACHE_MODE_REPLACE=2 —— 替换缓存, CACHE_MODE_IGNORE_DEEP=3 —— 深层忽略缓存, CACHE_MODE_REPLACE_DEEP=4 —— 深层替换缓存
