## ShaderIncludeDB（着色器包含数据库） <- Object（对象）

此对象包含来自 Godot 内部着色器的着色器片段。当需要访问内部统一缓冲区和/或内部函数时（例如编写合成器效果或计算着色器），可以使用这些片段。仅加载当前渲染设备的片段。

**Methods（方法）：**
- get_built_in_include_file(filename: String) -> String —— 获取内置包含文件
- has_built_in_include_file(filename: String) -> bool —— 是否具有指定的内置包含文件
- list_built_in_include_files() -> PackedStringArray —— 列出所有内置包含文件
