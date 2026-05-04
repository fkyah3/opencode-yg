## ResourceFormatLoader（资源格式加载器） <- RefCounted（引用计数）

Godot 使用 ResourceFormatLoader 在编辑器或导出的游戏中加载资源。它们通过 ResourceLoader 单例自动查询，或者当加载具有内部依赖关系的资源时使用。每种文件类型可能加载为不同的资源类型，因此引擎中注册了多个 ResourceFormatLoader。扩展此类可让您定义自己的加载器。请务必遵守文档中说明的返回类型和值。您应使用 `class_name` 为其指定全局类名称以便注册。与内置的 ResourceFormatLoader 一样，在加载其处理类型的资源时将自动调用它。您也可以实现 ResourceFormatSaver。**注意：** 如果您需要的资源类型存在但 Godot 无法加载其格式，您也可以扩展 EditorImportPlugin。选择哪种方式取决于该格式是否适合最终导出的游戏。例如，最好先将 `.png` 纹理导入为 `.ctex`（CompressedTexture2D），这样可以在显卡上以更高效率加载。

**枚举（Enums）：**
**CacheMode（缓存模式）：** CACHE_MODE_IGNORE=0 —— 忽略, CACHE_MODE_REUSE=1 —— 重用, CACHE_MODE_REPLACE=2 —— 替换, CACHE_MODE_IGNORE_DEEP=3 —— 深层忽略, CACHE_MODE_REPLACE_DEEP=4 —— 深层替换
