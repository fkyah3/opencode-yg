## EncodedObjectAsID（编码对象为ID） <- RefCounted（引用计数）

持有 Object 实例内部标识符引用的工具类，由 `Object.get_instance_id` 提供。此 ID 可用于通过 `@GlobalScope.instance_from_id` 检索对象实例。此类在编辑器的检查器和脚本调试器内部使用，也可在插件中用于传递和显示对象及其 ID。

**属性（Props）：**
- object_id: int = 0 —— 对象 ID
