## JavaScriptBridge <- Object（对象）

JavaScriptBridge 单例仅在 Web 导出中实现。它用于访问浏览器的 JavaScript 上下文。这允许与嵌入页面交互或调用第三方 JavaScript API。**注意：** 此单例可以在构建时禁用以提高安全性。默认情况下，JavaScriptBridge 单例是启用的。官方导出模板也启用了 JavaScriptBridge 单例。详情请参阅文档。

**方法（Methods）：**
- create_callback(callable: Callable) -> JavaScriptObject
- create_object(object: String) -> Variant
- download_buffer(buffer: PackedByteArray, name: String, mime: String = "application/octet-stream")
- eval(code: String, use_global_execution_context: bool = false) -> Variant
- force_fs_sync()
- get_interface(interface: String) -> JavaScriptObject
- is_js_buffer(javascript_object: JavaScriptObject) -> bool
- js_buffer_to_packed_byte_array(javascript_buffer: JavaScriptObject) -> PackedByteArray
- pwa_needs_update() -> bool
- pwa_update() -> int

**信号（Signals）：**
- pwa_update_available
