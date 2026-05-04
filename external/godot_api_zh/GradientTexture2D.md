## GradientTexture2D（渐变纹理2D） <- Texture2D（纹理2D）

一种 2D 纹理，从 Gradient 获取颜色来填充纹理数据。该纹理能够将颜色过渡转换为不同的图案，如线性渐变或径向渐变。纹理通过从 `fill_from` 到 `fill_to` 的偏移量插值颜色来填充，但渐变填充可以重复以覆盖整个纹理。渐变是逐像素采样的，因此不一定精确表示渐变的副本（参见 `width` 和 `height`）。另请参见 GradientTexture1D、CurveTexture 和 CurveXYZTexture。

**属性（Props）：**
- fill: int (GradientTexture2D.Fill) = 0 —— 填充方式
- fill_from: Vector2 = Vector2(0, 0) —— 填充起点
- fill_to: Vector2 = Vector2(1, 0) —— 填充终点
- gradient: Gradient —— 渐变
- height: int = 64 —— 高度
- repeat: int (GradientTexture2D.Repeat) = 0 —— 重复模式
- resource_local_to_scene: bool = false —— 资源是否局部于场景
- use_hdr: bool = false —— 是否使用 HDR
- width: int = 64 —— 宽度

**枚举（Enums）：**
**Fill（填充方式）：** FILL_LINEAR=0（线性）, FILL_RADIAL=1（径向）, FILL_SQUARE=2（方形）, FILL_CONIC=3（锥形）
**Repeat（重复模式）：** REPEAT_NONE=0（不重复）, REPEAT=1（重复）, REPEAT_MIRROR=2（镜像重复）
