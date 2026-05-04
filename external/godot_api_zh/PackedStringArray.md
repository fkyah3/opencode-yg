## PackedStringArray（打包字符串数组）

专门设计用于存储 String 的数组。数据紧密打包，因此对于大型数组可以节省内存。如果要连接数组中的字符串，请使用 `String.join`。**打包数组、类型化数组和非类型化数组之间的区别：** 打包数组通常比同类型的类型化数组（例如 PackedStringArray 对比 `ArrayString`）迭代和修改速度更快。此外，打包数组消耗更少的内存。缺点是打包数组不够灵活，因为它们没有 `Array.map` 等便利方法。类型化数组则比非类型化数组迭代和修改速度更快。**注意：** 打包数组始终通过引用传递。要获取可以独立于原始数组修改的副本，请使用 `duplicate`。但内置属性和方法的情况*并非如此*，它们返回的打包数组是副本，修改它不会影响原始值。要更新此类型的内置属性，请修改返回的数组然后重新赋值给属性。**注意：** 在布尔上下文中，空数组将求值为 `false`，否则始终求值为 `true`。

**方法（Methods）：**
- append(value: String) -> bool —— 追加值
- append_array(array: PackedStringArray) —— 追加数组
- bsearch(value: String, before: bool = true) -> int —— 二分搜索
- clear() —— 清除
- count(value: String) -> int —— 计数
- duplicate() -> PackedStringArray —— 复制
- erase(value: String) -> bool —— 擦除值
- fill(value: String) —— 填充
- find(value: String, from: int = 0) -> int —— 查找
- get(index: int) -> String —— 获取元素
- has(value: String) -> bool —— 是否包含值
- insert(at_index: int, value: String) -> int —— 插入
- is_empty() -> bool —— 是否为空
- push_back(value: String) -> bool —— 追加到末尾
- remove_at(index: int) —— 移除指定索引
- resize(new_size: int) -> int —— 调整大小
- reverse() —— 反转
- rfind(value: String, from: int = -1) -> int —— 反向查找
- set(index: int, value: String) —— 设置元素
- size() -> int —— 获取大小
- slice(begin: int, end: int = 2147483647) -> PackedStringArray —— 切片
- sort() —— 排序
- to_byte_array() -> PackedByteArray —— 转换为字节数组
