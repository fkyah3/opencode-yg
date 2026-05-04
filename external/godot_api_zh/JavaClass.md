## JavaClass（Java类） <- RefCounted（引用计数）

表示来自 Java 本地接口的类。它从 `JavaClassWrapper.wrap` 返回。**注意：** 此类仅适用于 Android。在任何其他平台上，此类不执行任何操作。**注意：** 不要将此类与 JavaScriptObject 混淆。

**方法（Methods）：**
- get_java_class_name() -> String —— 获取 Java 类名
- get_java_method_list() -> Dictionary[] —— 获取 Java 方法列表
- get_java_parent_class() -> JavaClass —— 获取 Java 父类
- has_java_method(method: StringName) -> bool —— 是否有指定 Java 方法
