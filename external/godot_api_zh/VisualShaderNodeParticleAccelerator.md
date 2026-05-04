## VisualShaderNodeParticleAccelerator（可视化着色器粒子加速器节点） <- VisualShaderNode（可视化着色器节点）

粒子加速器可用于粒子着色器的"处理"步骤，用于加速粒子。将其连接到速度输出端口。

**属性（Props）：**
- mode: int (VisualShaderNodeParticleAccelerator.Mode) = 0 —— 加速模式

**枚举（Enums）：**
**Mode（模式）：** MODE_LINEAR=0 —— 线性加速, MODE_RADIAL=1 —— 径向加速, MODE_TANGENTIAL=2 —— 切向加速, MODE_MAX=3 —— 最大值
