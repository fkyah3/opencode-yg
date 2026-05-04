## RDPipelineRasterizationState（RD管线光栅化状态） <- RefCounted（引用计数）

此对象由 RenderingDevice 使用。

**Props（属性）：**
- cull_mode: int (RenderingDevice.PolygonCullMode) = 0 —— 剔除模式
- depth_bias_clamp: float = 0.0 —— 深度偏差钳位
- depth_bias_constant_factor: float = 0.0 —— 深度偏差常量因子
- depth_bias_enabled: bool = false —— 是否启用深度偏差
- depth_bias_slope_factor: float = 0.0 —— 深度偏差斜率因子
- discard_primitives: bool = false —— 是否丢弃图元
- enable_depth_clamp: bool = false —— 是否启用深度钳位
- front_face: int (RenderingDevice.PolygonFrontFace) = 0 —— 正面朝向
- line_width: float = 1.0 —— 线宽
- patch_control_points: int = 1 —— 面片控制点数量
- wireframe: bool = false —— 是否线框模式
