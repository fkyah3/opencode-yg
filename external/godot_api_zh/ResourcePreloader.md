## ResourcePreloader（资源预加载器） <- Node（节点）

此节点用于预加载场景中的子资源，以便在场景加载时所有资源即可使用，并可以从预加载器中获取。选中节点时，可以使用 ResourcePreloader 标签页添加资源。GDScript 有一个简化的 `@GDScript.preload` 内置方法，可用于大多数情况，而 ResourcePreloader 则用于更高级的场景。

**方法（Methods）：**
- add_resource(name: StringName, resource: Resource) —— 添加资源
- get_resource(name: StringName) -> Resource —— 获取资源
- get_resource_list() -> PackedStringArray —— 获取资源列表
- has_resource(name: StringName) -> bool —— 是否存在指定名称的资源
- remove_resource(name: StringName) —— 移除资源
- rename_resource(name: StringName, newname: StringName) —— 重命名资源
