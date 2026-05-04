## Theme（主题）<- Resource（资源）

用于样式化/皮肤化 Control 和 Window 节点的资源。虽然可以使用局部主题覆盖（参见 `Control.add_theme_color_override`）对单个控件进行样式化，但主题资源允许您存储相同的设置并将其应用于所有共享相同类型的控件（例如，对所有 Button 应用相同的样式）。一个主题资源可用于整个项目，但也可以为控件节点的分支设置单独的主题资源。分配给控件的主题资源适用于该控件本身及其所有直接和间接子级（只要控件链是连续的）。使用 `ProjectSettings.gui/theme/custom` 设置项目范围的主题，该主题将应用于项目中的每个控件。使用任何控件节点的 `Control.theme` 设置主题，该主题将适用于该控件及其所有直接和间接子级。

**属性（Props）：**
- default_base_scale: float = 0.0 —— 默认基础缩放
- default_font: Font —— 默认字体
- default_font_size: int = -1 —— 默认字体大小

**方法（Methods）：**
- add_type(theme_type: StringName) —— 添加类型
- clear() —— 清除
- clear_color(name: StringName, theme_type: StringName) —— 清除颜色
- clear_constant(name: StringName, theme_type: StringName) —— 清除常量
- clear_font(name: StringName, theme_type: StringName) —— 清除字体
- clear_font_size(name: StringName, theme_type: StringName) —— 清除字体大小
- clear_icon(name: StringName, theme_type: StringName) —— 清除图标
- clear_stylebox(name: StringName, theme_type: StringName) —— 清除样式盒
- clear_theme_item(data_type: int, name: StringName, theme_type: StringName) —— 清除主题项
- clear_type_variation(theme_type: StringName) —— 清除类型变体
- get_color(name: StringName, theme_type: StringName) -> Color —— 获取颜色
- get_color_list(theme_type: String) -> PackedStringArray —— 获取颜色列表
- get_color_type_list() -> PackedStringArray —— 获取颜色类型列表
- get_constant(name: StringName, theme_type: StringName) -> int —— 获取常量
- get_constant_list(theme_type: String) -> PackedStringArray —— 获取常量列表
- get_constant_type_list() -> PackedStringArray —— 获取常量类型列表
- get_font(name: StringName, theme_type: StringName) -> Font —— 获取字体
- get_font_list(theme_type: String) -> PackedStringArray —— 获取字体列表
- get_font_size(name: StringName, theme_type: StringName) -> int —— 获取字体大小
- get_font_size_list(theme_type: String) -> PackedStringArray —— 获取字体大小列表
- get_font_size_type_list() -> PackedStringArray —— 获取字体大小类型列表
- get_font_type_list() -> PackedStringArray —— 获取字体类型列表
- get_icon(name: StringName, theme_type: StringName) -> Texture2D —— 获取图标
- get_icon_list(theme_type: String) -> PackedStringArray —— 获取图标列表
- get_icon_type_list() -> PackedStringArray —— 获取图标类型列表
- get_stylebox(name: StringName, theme_type: StringName) -> StyleBox —— 获取样式盒
- get_stylebox_list(theme_type: String) -> PackedStringArray —— 获取样式盒列表
- get_stylebox_type_list() -> PackedStringArray —— 获取样式盒类型列表
- get_theme_item(data_type: int, name: StringName, theme_type: StringName) -> Variant —— 获取主题项
- get_theme_item_list(data_type: int, theme_type: String) -> PackedStringArray —— 获取主题项列表
- get_theme_item_type_list(data_type: int) -> PackedStringArray —— 获取主题项类型列表
- get_type_list() -> PackedStringArray —— 获取类型列表
- get_type_variation_base(theme_type: StringName) -> StringName —— 获取类型变体基类
- get_type_variation_list(base_type: StringName) -> PackedStringArray —— 获取类型变体列表
- has_color(name: StringName, theme_type: StringName) -> bool —— 是否有颜色
- has_constant(name: StringName, theme_type: StringName) -> bool —— 是否有常量
- has_default_base_scale() -> bool —— 是否有默认基础缩放
- has_default_font() -> bool —— 是否有默认字体
- has_default_font_size() -> bool —— 是否有默认字体大小
- has_font(name: StringName, theme_type: StringName) -> bool —— 是否有字体
- has_font_size(name: StringName, theme_type: StringName) -> bool —— 是否有字体大小
- has_icon(name: StringName, theme_type: StringName) -> bool —— 是否有图标
- has_stylebox(name: StringName, theme_type: StringName) -> bool —— 是否有样式盒
- has_theme_item(data_type: int, name: StringName, theme_type: StringName) -> bool —— 是否有主题项
- is_type_variation(theme_type: StringName, base_type: StringName) -> bool —— 是否为类型变体
- merge_with(other: Theme) —— 合并
- remove_type(theme_type: StringName) —— 移除类型
- rename_color(old_name: StringName, name: StringName, theme_type: StringName) —— 重命名颜色
- rename_constant(old_name: StringName, name: StringName, theme_type: StringName) —— 重命名常量
- rename_font(old_name: StringName, name: StringName, theme_type: StringName) —— 重命名字体
- rename_font_size(old_name: StringName, name: StringName, theme_type: StringName) —— 重命名字体大小
- rename_icon(old_name: StringName, name: StringName, theme_type: StringName) —— 重命名图标
- rename_stylebox(old_name: StringName, name: StringName, theme_type: StringName) —— 重命名样式盒
- rename_theme_item(data_type: int, old_name: StringName, name: StringName, theme_type: StringName) —— 重命名主题项
- rename_type(old_theme_type: StringName, theme_type: StringName) —— 重命名类型
- set_color(name: StringName, theme_type: StringName, color: Color) —— 设置颜色
- set_constant(name: StringName, theme_type: StringName, constant: int) —— 设置常量
- set_font(name: StringName, theme_type: StringName, font: Font) —— 设置字体
- set_font_size(name: StringName, theme_type: StringName, font_size: int) —— 设置字体大小
- set_icon(name: StringName, theme_type: StringName, texture: Texture2D) —— 设置图标
- set_stylebox(name: StringName, theme_type: StringName, texture: StyleBox) —— 设置样式盒
- set_theme_item(data_type: int, name: StringName, theme_type: StringName, value: Variant) —— 设置主题项
- set_type_variation(theme_type: StringName, base_type: StringName) —— 设置类型变体

**枚举（Enums）：**
**DataType（数据类型）：** DATA_TYPE_COLOR=0（颜色），DATA_TYPE_CONSTANT=1（常量），DATA_TYPE_FONT=2（字体），DATA_TYPE_FONT_SIZE=3（字体大小），DATA_TYPE_ICON=4（图标），DATA_TYPE_STYLEBOX=5（样式盒），DATA_TYPE_MAX=6
