## RDPipelineMultisampleState（RD管线多重采样状态） <- RefCounted（引用计数）

RDPipelineMultisampleState 用于控制使用 RenderingDevice 渲染时如何执行多重采样或超采样抗锯齿。

**属性（Props）：**
- enable_alpha_to_coverage: bool = false —— 启用 Alpha 到覆盖
- enable_alpha_to_one: bool = false —— 启用 Alpha 到一
- enable_sample_shading: bool = false —— 启用样本着色
- min_sample_shading: float = 0.0 —— 最小样本着色率
- sample_count: int (RenderingDevice.TextureSamples) = 0 —— 样本数量
- sample_masks: int[] = [] —— 样本掩码
