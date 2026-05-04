## XRInterfaceExtension（XR接口扩展） <- XRInterface（XR接口）

外部 XR 接口插件应继承此类。

**方法（Methods）：**
- add_blit(render_target: RID, src_rect: Rect2, dst_rect: Rect2i, use_layer: bool, layer: int, apply_lens_distortion: bool, eye_center: Vector2, k1: float, k2: float, upscale: float, aspect_ratio: float) —— 添加 Blit 操作
- get_color_texture() -> RID —— 获取颜色纹理
- get_depth_texture() -> RID —— 获取深度纹理
- get_render_target_texture(render_target: RID) -> RID —— 获取渲染目标纹理
- get_velocity_texture() -> RID —— 获取速度纹理
