## JNISingleton（JNI单例） <- Object（对象）

JNISingleton 仅在 Android 导出中实现。用于调用用 Java 或 Kotlin 编写的 Android 插件的方法和连接信号。方法和信号可以像操作 Node 一样在 JNISingleton 上调用和连接。有关更多信息，请参阅《Android 插件》文档。

**方法（Methods）：**
- has_java_method(method: StringName) -> bool —— 检查是否存在指定 Java 方法
