## SpriteBase3D（精灵基础3D）<- GeometryInstance3D（几何体实例3D）

在 3D 环境中显示 2D 纹理信息的节点。另请参阅 Sprite3D，其中定义了许多其他属性。

**属性（Props）：**
- alpha_antialiasing_edge: float = 0.0 —— Alpha抗锯齿边缘
- alpha_antialiasing_mode: int (BaseMaterial3D.AlphaAntiAliasing) = 0 —— Alpha抗锯齿模式
- alpha_cut: int (SpriteBase3D.AlphaCutMode) = 0 —— Alpha裁剪
- alpha_hash_scale: float = 1.0 —— Alpha哈希缩放
- alpha_scissor_threshold: float = 0.5 —— Alpha裁剪阈值
- axis: int (Vector3.Axis) = 2 —— 轴
- billboard: int (BaseMaterial3D.BillboardMode) = 0 —— 公告板模式
- centered: bool = true —— 居中
- double_sided: bool = true —— 双面
- fixed_size: bool = false —— 固定大小
- flip_h: bool = false —— 水平翻转
- flip_v: bool = false —— 垂直翻转
- modulate: Color = Color(1, 1, 1, 1) —— 调制颜色
- no_depth_test: bool = false —— 无深度测试
- offset: Vector2 = Vector2(0, 0) —— 偏移
- pixel_size: float = 0.01 —— 像素大小
- render_priority: int = 0 —— 渲染优先级
- shaded: bool = false —— 着色
- texture_filter: int (BaseMaterial3D.TextureFilter) = 3 —— 纹理过滤
- transparent: bool = true —— 透明

**方法（Methods）：**
- generate_triangle_mesh() -> TriangleMesh —— 生成三角形网格
- get_draw_flag(flag: int) -> bool —— 获取绘制标志
- get_item_rect() -> Rect2 —— 获取项目矩形
- set_draw_flag(flag: int, enabled: bool) —— 设置绘制标志

**枚举（Enums）：**
**DrawFlags（绘制标志）：** FLAG_TRANSPARENT=0（透明），FLAG_SHADED=1（着色），FLAG_DOUBLE_SIDED=2（双面），FLAG_DISABLE_DEPTH_TEST=3（禁用深度测试），FLAG_FIXED_SIZE=4（固定大小），FLAG_MAX=5
**AlphaCutMode（Alpha裁剪模式）：** ALPHA_CUT_DISABLED=0（禁用），ALPHA_CUT_DISCARD=1（丢弃），ALPHA_CUT_OPAQUE_PREPASS=2（不透明预pass），ALPHA_CUT_HASH=3（哈希）
