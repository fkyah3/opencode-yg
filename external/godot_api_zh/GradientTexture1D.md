## GradientTexture1D（渐变纹理1D） <- Texture2D（纹理2D）

一种 1D 纹理，从 Gradient 获取颜色来填充纹理数据。纹理通过对每个像素采样渐变来填充。因此，纹理不一定精确复制渐变，如果像素不足可能会丢失一些颜色。另见 GradientTexture2D、CurveTexture 和 CurveXYZTexture。

**Props（属性）：**
- gradient: Gradient —— 渐变
- resource_local_to_scene: bool = false —— 资源是否局部于场景
- use_hdr: bool = false —— 是否使用 HDR
- width: int = 256 —— 宽度
