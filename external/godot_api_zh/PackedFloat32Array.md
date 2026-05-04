## PackedFloat32Array（打包32位浮点数数组）

专门设计用于存储 32 位浮点值（float）的数组。数据紧密打包，因此对于大型数组可以节省内存。如果需要紧密打包 64 位浮点数，请参见 PackedFloat64Array。**注意：** 打包数组始终通过引用传递。要获取可以独立于原始数组修改的副本，请使用 `duplicate`。但内置属性和方法的情况*并非如此*，它们返回的打包数组是副本，修改它不会影响原始值。要更新此类型的内置属性，请修改返回的数组然后重新赋值给属性。**注意：** 在布尔上下文中，空数组将求值为 `false`，否则始终求值为 `true`。

**方法（Methods）：**
- append(value: float) -> bool —— 追加值
- append_array(array: PackedFloat32Array) —— 追加数组
- bsearch(value: float, before: bool = true) -> int —— 二分搜索
- clear() —— 清除
- count(value: float) -> int —— 计数
- duplicate() -> PackedFloat32Array —— 复制
- erase(value: float) -> bool —— 擦除值
- fill(value: float) —— 填充
- find(value: float, from: int = 0) -> int —— 查找
- get(index: int) -> float —— 获取元素
- has(value: float) -> bool —— 是否包含值
- insert(at_index: int, value: float) -> int —— 插入
- is_empty() -> bool —— 是否为空
- push_back(value: float) -> bool —— 追加到末尾
- remove_at(index: int) —— 移除指定索引
- resize(new_size: int) -> int —— 调整大小
- reverse() —— 反转
- rfind(value: float, from: int = -1) -> int —— 反向查找
- set(index: int, value: float) —— 设置元素
- size() -> int —— 获取大小
- slice(begin: int, end: int = 2147483647) -> PackedFloat32Array —— 切片
- sort() —— 排序
- to_byte_array() -> PackedByteArray —— 转换为字节数组
