## RDPipelineColorBlendState（RD管线颜色混合状态） <- RefCounted（引用计数）

此对象由 RenderingDevice 使用。

**属性（Props）：**
- attachments: RDPipelineColorBlendStateAttachment[] = [] —— 附件数组
- blend_constant: Color = Color(0, 0, 0, 1) —— 混合常量颜色
- enable_logic_op: bool = false —— 是否启用逻辑操作
- logic_op: int (RenderingDevice.LogicOperation) = 0 —— 逻辑操作类型
