## NodePath（节点路径）

NodePath 是内置的 Variant 类型，表示节点层次结构中指向节点或属性的路径。它设计为能够高效地传递给许多内置方法（如 `Node.get_node`、`Object.set_indexed`、`Tween.tween_property` 等），而不依赖于它们所指的节点或属性。节点路径表示为由斜杠分隔（`/`）的节点名称和冒号分隔（`:`）的属性名称（也称为"子名称"）组成的字符串。类似于文件系统路径，`".."` 和 `"."` 是特殊的节点名称，分别指代父节点和当前节点。以下示例是相对于当前节点的路径：前导斜杠表示路径是绝对的，并从 SceneTree 开始：尽管名为节点路径，它也可以指向属性：在某些情况下，可以省略指向对象属性时的前导 `:`。例如，在 `Object.set_indexed` 和 `Tween.tween_property` 中就是如此，因为这些方法底层会调用 `NodePath.get_as_property_path`。不过，通常建议保留 `:` 前缀。节点路径无法检查其是否有效，可能指向不存在的节点或属性。它们的含义完全取决于使用它们的上下文。通常您无需担心 NodePath 类型，因为字符串在必要时会自动转换为该类型。但在某些情况下，定义节点路径仍然很有用。例如，导出的 NodePath 属性允许您轻松选择当前编辑场景中的任何节点。在场景树编辑器中移动、重命名或删除节点时，它们也会自动更新。另请参见 [annotation @GDScript.@export_node_path]。另请参见 StringName，这是为优化字符串设计的类似类型。**注意：** 在布尔上下文中，空的 NodePath（`NodePath("")`）将求值为 `false`，否则始终求值为 `true`。

**方法（Methods）：**
- get_as_property_path() -> NodePath —— 获取作为属性路径的 NodePath
- get_concatenated_names() -> StringName —— 获取连接后的名称
- get_concatenated_subnames() -> StringName —— 获取连接后的子名称
- get_name(idx: int) -> StringName —— 获取指定索引的名称
- get_name_count() -> int —— 获取名称数量
- get_subname(idx: int) -> StringName —— 获取指定索引的子名称
- get_subname_count() -> int —— 获取子名称数量
- hash() -> int —— 获取哈希值
- is_absolute() -> bool —— 是否为绝对路径
- is_empty() -> bool —— 是否为空
- slice(begin: int, end: int = 2147483647) -> NodePath —— 切片
