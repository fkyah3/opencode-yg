## CanvasItem（画布项）<- Node（节点）

2D 空间中所有内容的抽象基类。画布项以树状结构排列；子项继承并扩展其父项的变换。CanvasItem 由 Control（用于 GUI 相关节点）和 Node2D（用于 2D 游戏对象）扩展。任何 CanvasItem 都可以绘制。为此，引擎调用 `queue_redraw`，然后在空闲时收到 `NOTIFICATION_DRAW` 以请求重新绘制。因此，画布项不需要每帧重新绘制，从而显著提高性能。CanvasItem 上提供了多个绘制函数（参见 `draw_*` 函数）。但是，它们只能在 `_draw`、其对应的 `Object._notification` 或连接到 `draw` 信号的方法内部使用。画布项按其画布层上的树顺序绘制。默认情况下，子项位于其父项之上，因此根 CanvasItem 将绘制在所有内容的后面。可以在每个项的基础上更改此行为。CanvasItem 可以隐藏，这也会隐藏其子项。通过调整 CanvasItem 的各种其他属性，你还可以调整其颜色（通过 `modulate` 或 `self_modulate`）、更改其 Z 索引、混合模式等。注意，变换、调制和可见性等属性仅传播到*直接* CanvasItem 子节点。如果中间存在非 CanvasItem 节点（如 Node 或 AnimationPlayer），则下方的 CanvasItem 节点将具有独立的位置和 `modulate` 链。另请参见 `top_level`。

**属性（Props）：**
- clip_children: int (CanvasItem.ClipChildrenMode) = 0 —— 裁剪子节点
- light_mask: int = 1 —— 光照掩码
- material: Material —— 材质
- modulate: Color = Color(1, 1, 1, 1) —— 整体调色
- self_modulate: Color = Color(1, 1, 1, 1) —— 自身调色
- show_behind_parent: bool = false —— 在父级后显示
- texture_filter: int (CanvasItem.TextureFilter) = 0 —— 纹理过滤
- texture_repeat: int (CanvasItem.TextureRepeat) = 0 —— 纹理重复
- top_level: bool = false —— 顶层
- use_parent_material: bool = false —— 使用父级材质
- visibility_layer: int = 1 —— 可见性层
- visible: bool = true —— 可见
- y_sort_enabled: bool = false —— 启用 Y 排序
- z_as_relative: bool = true —— Z 索引为相对值
- z_index: int = 0 —— Z 索引

**方法（Methods）：**
- draw_animation_slice(animation_length: float, slice_begin: float, slice_end: float, offset: float = 0.0) —— 绘制动画切片
- draw_arc(center: Vector2, radius: float, start_angle: float, end_angle: float, point_count: int, color: Color, width: float = -1.0, antialiased: bool = false) —— 绘制圆弧
- draw_char(font: Font, pos: Vector2, char: String, font_size: int = 16, modulate: Color = Color(1, 1, 1, 1), oversampling: float = 0.0) —— 绘制字符
- draw_char_outline(font: Font, pos: Vector2, char: String, font_size: int = 16, size: int = -1, modulate: Color = Color(1, 1, 1, 1), oversampling: float = 0.0) —— 绘制字符轮廓
- draw_circle(position: Vector2, radius: float, color: Color, filled: bool = true, width: float = -1.0, antialiased: bool = false) —— 绘制圆形
- draw_colored_polygon(points: PackedVector2Array, color: Color, uvs: PackedVector2Array = PackedVector2Array(), texture: Texture2D = null) —— 绘制彩色多边形
- draw_dashed_line(from: Vector2, to: Vector2, color: Color, width: float = -1.0, dash: float = 2.0, aligned: bool = true, antialiased: bool = false) —— 绘制虚线
- draw_ellipse(position: Vector2, major: float, minor: float, color: Color, filled: bool = true, width: float = -1.0, antialiased: bool = false) —— 绘制椭圆
- draw_ellipse_arc(center: Vector2, major: float, minor: float, start_angle: float, end_angle: float, point_count: int, color: Color, width: float = -1.0, antialiased: bool = false) —— 绘制椭圆弧
- draw_end_animation() —— 结束动画绘制
- draw_lcd_texture_rect_region(texture: Texture2D, rect: Rect2, src_rect: Rect2, modulate: Color = Color(1, 1, 1, 1)) —— 绘制 LCD 纹理矩形区域
- draw_line(from: Vector2, to: Vector2, color: Color, width: float = -1.0, antialiased: bool = false) —— 绘制线段
- draw_mesh(mesh: Mesh, texture: Texture2D, transform: Transform2D = Transform2D(1, 0, 0, 1, 0, 0), modulate: Color = Color(1, 1, 1, 1)) —— 绘制网格
- draw_msdf_texture_rect_region(texture: Texture2D, rect: Rect2, src_rect: Rect2, modulate: Color = Color(1, 1, 1, 1), outline: float = 0.0, pixel_range: float = 4.0, scale: float = 1.0) —— 绘制 MSDF 纹理矩形区域
- draw_multiline(points: PackedVector2Array, color: Color, width: float = -1.0, antialiased: bool = false) —— 绘制多线段
- draw_multiline_colors(points: PackedVector2Array, colors: PackedColorArray, width: float = -1.0, antialiased: bool = false) —— 绘制彩色多线段
- draw_multiline_string(font: Font, pos: Vector2, text: String, alignment: int = 0, width: float = -1, font_size: int = 16, max_lines: int = -1, modulate: Color = Color(1, 1, 1, 1), brk_flags: int = 3, justification_flags: int = 3, direction: int = 0, orientation: int = 0, oversampling: float = 0.0) —— 绘制多行字符串
- draw_multiline_string_outline(font: Font, pos: Vector2, text: String, alignment: int = 0, width: float = -1, font_size: int = 16, max_lines: int = -1, size: int = 1, modulate: Color = Color(1, 1, 1, 1), brk_flags: int = 3, justification_flags: int = 3, direction: int = 0, orientation: int = 0, oversampling: float = 0.0) —— 绘制多行字符串轮廓
- draw_multimesh(multimesh: MultiMesh, texture: Texture2D) —— 绘制多网格
- draw_polygon(points: PackedVector2Array, colors: PackedColorArray, uvs: PackedVector2Array = PackedVector2Array(), texture: Texture2D = null) —— 绘制多边形
- draw_polyline(points: PackedVector2Array, color: Color, width: float = -1.0, antialiased: bool = false) —— 绘制折线
- draw_polyline_colors(points: PackedVector2Array, colors: PackedColorArray, width: float = -1.0, antialiased: bool = false) —— 绘制彩色折线
- draw_primitive(points: PackedVector2Array, colors: PackedColorArray, uvs: PackedVector2Array, texture: Texture2D = null) —— 绘制图元
- draw_rect(rect: Rect2, color: Color, filled: bool = true, width: float = -1.0, antialiased: bool = false) —— 绘制矩形
- draw_set_transform(position: Vector2, rotation: float = 0.0, scale: Vector2 = Vector2(1, 1)) —— 设置绘制变换
- draw_set_transform_matrix(xform: Transform2D) —— 设置绘制变换矩阵
- draw_string(font: Font, pos: Vector2, text: String, alignment: int = 0, width: float = -1, font_size: int = 16, modulate: Color = Color(1, 1, 1, 1), justification_flags: int = 3, direction: int = 0, orientation: int = 0, oversampling: float = 0.0) —— 绘制字符串
- draw_string_outline(font: Font, pos: Vector2, text: String, alignment: int = 0, width: float = -1, font_size: int = 16, size: int = 1, modulate: Color = Color(1, 1, 1, 1), justification_flags: int = 3, direction: int = 0, orientation: int = 0, oversampling: float = 0.0) —— 绘制字符串轮廓
- draw_style_box(style_box: StyleBox, rect: Rect2) —— 绘制样式盒
- draw_texture(texture: Texture2D, position: Vector2, modulate: Color = Color(1, 1, 1, 1)) —— 绘制纹理
- draw_texture_rect(texture: Texture2D, rect: Rect2, tile: bool, modulate: Color = Color(1, 1, 1, 1), transpose: bool = false) —— 绘制纹理矩形
- draw_texture_rect_region(texture: Texture2D, rect: Rect2, src_rect: Rect2, modulate: Color = Color(1, 1, 1, 1), transpose: bool = false, clip_uv: bool = true) —— 绘制纹理矩形区域
- force_update_transform() —— 强制更新变换
- get_canvas() -> RID —— 获取画布
- get_canvas_item() -> RID —— 获取画布项
- get_canvas_layer_node() -> CanvasLayer —— 获取画布层节点
- get_canvas_transform() -> Transform2D —— 获取画布变换
- get_global_mouse_position() -> Vector2 —— 获取全局鼠标位置
- get_global_transform() -> Transform2D —— 获取全局变换
- get_global_transform_with_canvas() -> Transform2D —— 获取带画布的全局变换
- get_instance_shader_parameter(name: StringName) -> Variant —— 获取实例着色器参数
- get_local_mouse_position() -> Vector2 —— 获取本地鼠标位置
- get_screen_transform() -> Transform2D —— 获取屏幕变换
- get_transform() -> Transform2D —— 获取变换
- get_viewport_rect() -> Rect2 —— 获取视口矩形
- get_viewport_transform() -> Transform2D —— 获取视口变换
- get_visibility_layer_bit(layer: int) -> bool —— 获取可见性层位
- get_world_2d() -> World2D —— 获取 2D 世界
- hide() —— 隐藏
- is_local_transform_notification_enabled() -> bool —— 本地变换通知是否启用
- is_transform_notification_enabled() -> bool —— 变换通知是否启用
- is_visible_in_tree() -> bool —— 在场景树中是否可见
- make_canvas_position_local(viewport_point: Vector2) -> Vector2 —— 将视口坐标转为画布本地坐标
- make_input_local(event: InputEvent) -> InputEvent —— 将输入事件转为本地
- move_to_front() —— 移到前端
- queue_redraw() —— 请求重新绘制
- set_instance_shader_parameter(name: StringName, value: Variant) —— 设置实例着色器参数
- set_notify_local_transform(enable: bool) —— 设置本地变换通知
- set_notify_transform(enable: bool) —— 设置变换通知
- set_visibility_layer_bit(layer: int, enabled: bool) —— 设置可见性层位
- show() —— 显示

**信号（Signals）：**
- draw —— 绘制
- hidden —— 已隐藏
- item_rect_changed —— 项矩形已更改
- visibility_changed —— 可见性已更改

**枚举（Enums）：**
**常量（Constants）：** NOTIFICATION_TRANSFORM_CHANGED=2000 —— 变换已更改通知，NOTIFICATION_LOCAL_TRANSFORM_CHANGED=35 —— 本地变换已更改通知，NOTIFICATION_DRAW=30 —— 绘制通知，NOTIFICATION_VISIBILITY_CHANGED=31 —— 可见性已更改通知，NOTIFICATION_ENTER_CANVAS=32 —— 进入画布通知，NOTIFICATION_EXIT_CANVAS=33 —— 退出画布通知，NOTIFICATION_WORLD_2D_CHANGED=36 —— 2D 世界已更改通知
**TextureFilter（纹理过滤）：** TEXTURE_FILTER_PARENT_NODE=0 —— 继承父节点，TEXTURE_FILTER_NEAREST=1 —— 最近邻，TEXTURE_FILTER_LINEAR=2 —— 线性，TEXTURE_FILTER_NEAREST_WITH_MIPMAPS=3 —— 最近邻带 Mipmap，TEXTURE_FILTER_LINEAR_WITH_MIPMAPS=4 —— 线性带 Mipmap，TEXTURE_FILTER_NEAREST_WITH_MIPMAPS_ANISOTROPIC=5 —— 最近邻带 Mipmap 各向异性，TEXTURE_FILTER_LINEAR_WITH_MIPMAPS_ANISOTROPIC=6 —— 线性带 Mipmap 各向异性，TEXTURE_FILTER_MAX=7
**TextureRepeat（纹理重复）：** TEXTURE_REPEAT_PARENT_NODE=0 —— 继承父节点，TEXTURE_REPEAT_DISABLED=1 —— 禁用，TEXTURE_REPEAT_ENABLED=2 —— 启用，TEXTURE_REPEAT_MIRROR=3 —— 镜像，TEXTURE_REPEAT_MAX=4
**ClipChildrenMode（裁剪子节点模式）：** CLIP_CHILDREN_DISABLED=0 —— 禁用裁剪，CLIP_CHILDREN_ONLY=1 —— 仅裁剪，CLIP_CHILDREN_AND_DRAW=2 —— 裁剪并绘制，CLIP_CHILDREN_MAX=3
