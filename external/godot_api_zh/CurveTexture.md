## CurveTexture（曲线纹理）<- Texture2D（纹理2D）

一种一维纹理，其中像素亮度对应单位 Curve 资源上的点，以灰度或红色显示。这种视觉表示简化了将曲线保存为图像文件的任务。如果需要在单个纹理中存储最多 3 条曲线，请使用 CurveXYZTexture。另见 GradientTexture1D 和 GradientTexture2D。

**属性（Props）：**
- curve: Curve —— 曲线
- resource_local_to_scene: bool = false —— 资源本地化到场景
- texture_mode: int (CurveTexture.TextureMode) = 0 —— 纹理模式
- width: int = 256 —— 宽度

**枚举（Enums）：**
**TextureMode：** TEXTURE_MODE_RGB=0 —— RGB模式, TEXTURE_MODE_RED=1 —— 红色通道模式
