## RDPipelineColorBlendStateAttachment（渲染设备管线颜色混合状态附件） <- RefCounted（引用计数）

控制使用 RenderingDevice 时源片段与目标片段之间的混合方式。作为参考，以下是 Godot 2D 渲染器中常见用户混合模式的实现方式：**混合（Mix）：** **相加（Add）：** **相减（Subtract）：** **相乘（Multiply）：** **预乘 Alpha（Pre-multiplied alpha）：**

**属性（Props）：**
- alpha_blend_op: int (RenderingDevice.BlendOperation) = 0 —— Alpha 混合操作
- color_blend_op: int (RenderingDevice.BlendOperation) = 0 —— 颜色混合操作
- dst_alpha_blend_factor: int (RenderingDevice.BlendFactor) = 0 —— 目标 Alpha 混合因子
- dst_color_blend_factor: int (RenderingDevice.BlendFactor) = 0 —— 目标颜色混合因子
- enable_blend: bool = false —— 启用混合
- src_alpha_blend_factor: int (RenderingDevice.BlendFactor) = 0 —— 源 Alpha 混合因子
- src_color_blend_factor: int (RenderingDevice.BlendFactor) = 0 —— 源颜色混合因子
- write_a: bool = true —— 写入 Alpha
- write_b: bool = true —— 写入 B
- write_g: bool = true —— 写入 G
- write_r: bool = true —— 写入 R

**方法（Methods）：**
- set_as_mix() —— 设置为混合模式
