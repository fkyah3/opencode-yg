## PackedDataContainerRef（打包数据容器引用） <- RefCounted（引用计数）

当使用 PackedDataContainer 打包嵌套容器时，它们会被递归打包为 PackedDataContainerRef（仅适用于 Array 和 Dictionary）。其数据的访问方式与 PackedDataContainer 相同。输出示例：`1 2 3 ::nested1 ::nested2 4 5 6`

**方法（Methods）：**
- size() -> int —— 获取容器大小
