## VisualShaderNodeBillboard（可视化着色器节点公告板） <- VisualShaderNode（可视化着色器节点）

此节点的输出端口需要连接到 VisualShaderNodeOutput 的 `Model View Matrix` 端口。

**属性（Props）：**
- billboard_type: int (VisualShaderNodeBillboard.BillboardType) = 1 —— 公告板类型
- keep_scale: bool = false —— 是否保持缩放

**枚举（Enums）：**
**BillboardType（公告板类型）：** BILLBOARD_TYPE_DISABLED=0（禁用）, BILLBOARD_TYPE_ENABLED=1（启用）, BILLBOARD_TYPE_FIXED_Y=2（固定Y轴）, BILLBOARD_TYPE_PARTICLES=3（粒子）, BILLBOARD_TYPE_MAX=4（最大值）
