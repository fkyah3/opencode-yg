## JavaClassWrapper（Java类包装器） <- Object（对象）

JavaClassWrapper 单例为 Godot 应用程序提供通过 Java 原生接口（JNI）发送和接收数据的方式。**注意：**此单例仅在 Android 构建中可用。**警告：**调用 Java 方法时，务必检查 `JavaClassWrapper.get_exception` 以确认方法是否抛出了异常。

**方法（Methods）：**
- get_exception() -> JavaObject —— 获取异常
- wrap(name: String) -> JavaClass —— 包装 Java 类
