## Shader（着色器） <- Resource（资源）

用 Godot 着色语言实现的自定义着色器程序，保存为 `.gdshader` 扩展名。该类由 ShaderMaterial 使用，允许你编写自己的自定义行为来渲染视觉项或更新粒子信息。有关详细说明和用法，请参见下方链接的教程。

**属性（Props）：**
- code: String = "" —— 代码

**方法（Methods）：**
- get_default_texture_parameter(name: StringName, index: int = 0) -> Texture —— 获取默认纹理参数
- get_mode() -> int —— 获取模式
- get_shader_uniform_list(get_groups: bool = false) -> Array —— 获取着色器 uniform 列表
- inspect_native_shader_code() —— 检查原生着色器代码
- set_default_texture_parameter(name: StringName, texture: Texture, index: int = 0) —— 设置默认纹理参数

**枚举（Enums）：**
**Mode（模式）：** MODE_SPATIAL=0, MODE_CANVAS_ITEM=1, MODE_PARTICLES=2, MODE_SKY=3, MODE_FOG=4, MODE_TEXTURE_BLIT=5
