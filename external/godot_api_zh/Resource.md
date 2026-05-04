## Resource（资源） <- RefCounted（引用计数）

Resource 是所有 Godot 特定资源类型的基类，主要作为数据容器。由于继承自 RefCounted，资源是引用计数的，在不再使用时释放。它们也可以嵌套在其他资源中，并保存到磁盘。PackedScene 是 Godot 项目中最常见的对象之一，也是一种资源，其独特之处在于能够存储和实例化其包含的节点，次数不限。在 GDScript 中，可以通过 `@GDScript.load` 或 `@GDScript.preload` 按 `resource_path` 从磁盘加载资源。引擎维护所有已加载资源的全局缓存，按路径引用（参见 `ResourceLoader.has_cached`）。资源在首次加载时被缓存，并在所有引用释放时从缓存中移除。当资源被缓存时，后续使用其路径的加载将返回缓存的引用。**注意：** 在 C# 中，资源在不再使用后不会立即释放。相反，垃圾回收会定期运行，释放不再使用的资源。这意味着未使用的资源会在移除前在内存中保留一段时间。

**属性（Props）：**
- resource_local_to_scene: bool = false —— 资源本地化到场景
- resource_name: String = "" —— 资源名称
- resource_path: String = "" —— 资源路径
- resource_scene_unique_id: String —— 资源场景唯一 ID

**方法（Methods）：**
- duplicate(deep: bool = false) -> Resource —— 复制
- duplicate_deep(deep_subresources_mode: int = 1) -> Resource —— 深层复制
- emit_changed() —— 发出更改信号
- generate_scene_unique_id() -> String —— 生成场景唯一 ID
- get_id_for_path(path: String) -> String —— 获取路径的 ID
- get_local_scene() -> Node —— 获取本地场景
- get_rid() -> RID —— 获取 RID
- is_built_in() -> bool —— 是否为内置
- reset_state() —— 重置状态
- set_id_for_path(path: String, id: String) —— 设置路径的 ID
- set_path_cache(path: String) —— 设置路径缓存
- setup_local_to_scene() —— 设置为本地到场景
- take_over_path(path: String) —— 接管路径

**信号（Signals）：**
- changed —— 已更改
- setup_local_to_scene_requested —— 已请求设置为本地到场景

**枚举（Enums）：**
**DeepDuplicateMode（深层复制模式）：** DEEP_DUPLICATE_NONE=0 —— 不深层复制, DEEP_DUPLICATE_INTERNAL=1 —— 深层复制内部, DEEP_DUPLICATE_ALL=2 —— 深层复制全部
