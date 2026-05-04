## LabelSettings <- Resource（资源）

LabelSettings 是一种资源，提供通用设置以自定义 Label 中的文本。它将优先于 `Control.theme` 中定义的属性。该资源可以在多个标签之间共享并随时更改，因此这是一种设置文本样式的方便灵活的方式。

**属性（Props）：**
- font: Font
- font_color: Color = Color(1, 1, 1, 1)
- font_size: int = 16
- line_spacing: float = 3.0
- outline_color: Color = Color(1, 1, 1, 1)
- outline_size: int = 0
- paragraph_spacing: float = 0.0
- shadow_color: Color = Color(0, 0, 0, 0)
- shadow_offset: Vector2 = Vector2(1, 1)
- shadow_size: int = 1
- stacked_outline_count: int = 0
- stacked_shadow_count: int = 0

**方法（Methods）：**
- add_stacked_outline(index: int = -1)
- add_stacked_shadow(index: int = -1)
- get_stacked_outline_color(index: int) -> Color
- get_stacked_outline_size(index: int) -> int
- get_stacked_shadow_color(index: int) -> Color
- get_stacked_shadow_offset(index: int) -> Vector2
- get_stacked_shadow_outline_size(index: int) -> int
- move_stacked_outline(from_index: int, to_position: int)
- move_stacked_shadow(from_index: int, to_position: int)
- remove_stacked_outline(index: int)
- remove_stacked_shadow(index: int)
- set_stacked_outline_color(index: int, color: Color)
- set_stacked_outline_size(index: int, size: int)
- set_stacked_shadow_color(index: int, color: Color)
- set_stacked_shadow_offset(index: int, offset: Vector2)
- set_stacked_shadow_outline_size(index: int, size: int)
