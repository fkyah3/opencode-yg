## Dictionary（字典）

字典是关联容器，包含由唯一键引用的值。字典在添加新条目时会保留插入顺序。在其他编程语言中，此数据结构通常称为哈希映射或关联数组。你可以通过在大括号 `{}` 内放置逗号分隔的 `key: value` 对来定义字典。创建字典：你可以通过引用相应的键来访问字典的值。在上例中，`points_dict["White"]` 将返回 `50`。你也可以编写 `points_dict.White`，效果相同。但是，如果你访问字典的键不是固定字符串（如数字或变量），则必须使用括号语法。在以上代码中，`points` 将被分配与 `my_color` 中选择的颜色相对应的值。字典可以包含更复杂的数据：要为现有字典添加键，像访问已有的键一样访问它并赋值：最后，无类型字典可以在同一字典中包含不同类型的键和值：字典的键可以使用 `for` 关键字迭代：要为键和值强制指定特定类型，可以创建*类型化字典*。类型化字典只能包含给定类型的键和值，或继承自给定类的类型：**注意：** 字典始终通过引用传递。要获得可以独立于原字典修改的副本，请使用 `duplicate`。**注意：** 在迭代字典时擦除元素是**不**支持的，会导致不可预测的行为。**注意：** 在布尔上下文中，空字典（`{}`）将求值为 `false`，否则字典总是求值为 `true`。

**方法（Methods）：**
- assign(dictionary: Dictionary) —— 分配
- clear() —— 清除
- duplicate(deep: bool = false) -> Dictionary —— 复制
- duplicate_deep(deep_subresources_mode: int = 1) -> Dictionary —— 深度复制
- erase(key: Variant) -> bool —— 擦除
- find_key(value: Variant) -> Variant —— 查找键
- get(key: Variant, default: Variant = null) -> Variant —— 获取值
- get_or_add(key: Variant, default: Variant = null) -> Variant —— 获取或添加
- get_typed_key_builtin() -> int —— 获取类型化键的内置类型
- get_typed_key_class_name() -> StringName —— 获取类型化键的类名
- get_typed_key_script() -> Variant —— 获取类型化键的脚本
- get_typed_value_builtin() -> int —— 获取类型化值的内置类型
- get_typed_value_class_name() -> StringName —— 获取类型化值的类名
- get_typed_value_script() -> Variant —— 获取类型化值的脚本
- has(key: Variant) -> bool —— 是否包含键
- has_all(keys: Array) -> bool —— 是否包含所有键
- hash() -> int —— 哈希
- is_empty() -> bool —— 是否为空
- is_read_only() -> bool —— 是否只读
- is_same_typed(dictionary: Dictionary) -> bool —— 是否同一类型
- is_same_typed_key(dictionary: Dictionary) -> bool —— 键类型是否相同
- is_same_typed_value(dictionary: Dictionary) -> bool —— 值类型是否相同
- is_typed() -> bool —— 是否为类型化
- is_typed_key() -> bool —— 键是否为类型化
- is_typed_value() -> bool —— 值是否为类型化
- keys() -> Array —— 获取所有键
- make_read_only() —— 设为只读
- merge(dictionary: Dictionary, overwrite: bool = false) —— 合并
- merged(dictionary: Dictionary, overwrite: bool = false) -> Dictionary —— 合并并返回新字典
- recursive_equal(dictionary: Dictionary, recursion_count: int) -> bool —— 递归相等比较
- set(key: Variant, value: Variant) -> bool —— 设置值
- size() -> int —— 大小
- sort() —— 排序
- values() -> Array —— 获取所有值
