## JavaObject（Java对象） <- RefCounted（引用计数）

表示来自 Java 本地接口的对象。它可以从对 JavaClass 或其他 JavaObject 调用的 Java 方法返回。示例请参阅 JavaClassWrapper。**注意：** 此类仅适用于 Android。在任何其他平台上，此类不执行任何操作。**注意：** 不要将此类与 JavaScriptObject 混淆。

**方法（Methods）：**
- get_java_class() -> JavaClass —— 获取 Java 类
- has_java_method(method: StringName) -> bool —— 是否有指定 Java 方法
