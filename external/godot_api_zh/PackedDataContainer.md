## PackedDataContainer（打包数据容器） <- Resource（资源）

PackedDataContainer 可用于高效存储来自无类型容器的数据。数据被打包为原始字节，并可保存到文件。只能以这种方式存储 Array 和 Dictionary。可以通过迭代容器来检索数据，其效果如同迭代打包数据本身。如果打包容器是 Dictionary，则可以通过键名（仅限 String/StringName）检索数据。输出：[codeblock lang=text] key value lock (0, 0) another_key 123 [/codeblock]嵌套容器将被递归打包。迭代时，它们将作为 PackedDataContainerRef 返回。

**方法（Methods）：**
- pack(value: Variant) -> int —— 打包数据
- size() -> int —— 获取大小
