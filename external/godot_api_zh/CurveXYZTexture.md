## CurveXYZTexture（曲线XYZ纹理） <- Texture2D（纹理2D）

一种 1D 纹理，其中红、绿、蓝颜色通道分别对应 3 个单位 Curve 资源上的点。与使用单独的 CurveTexture 相比，这进一步简化了将曲线保存为图像文件的任务。如果只需要在单个纹理中存储一条曲线，请改用 CurveTexture。另见 GradientTexture1D 和 GradientTexture2D。

**Props（属性）：**
- curve_x: Curve —— X曲线
- curve_y: Curve —— Y曲线
- curve_z: Curve —— Z曲线
- resource_local_to_scene: bool = false —— 资源是否局部于场景
- width: int = 256 —— 宽度
