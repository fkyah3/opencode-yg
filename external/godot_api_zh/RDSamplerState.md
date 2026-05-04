## RDSamplerState（渲染设备采样器状态） <- RefCounted（引用计数）

此对象由 RenderingDevice 使用。

**属性（Props）：**
- anisotropy_max: float = 1.0 —— 最大各向异性
- border_color: int (RenderingDevice.SamplerBorderColor) = 2 —— 边框颜色
- compare_op: int (RenderingDevice.CompareOperator) = 7 —— 比较操作
- enable_compare: bool = false —— 是否启用比较
- lod_bias: float = 0.0 —— LOD 偏置
- mag_filter: int (RenderingDevice.SamplerFilter) = 0 —— 放大过滤
- max_lod: float = 1e+20 —— 最大 LOD
- min_filter: int (RenderingDevice.SamplerFilter) = 0 —— 缩小过滤
- min_lod: float = 0.0 —— 最小 LOD
- mip_filter: int (RenderingDevice.SamplerFilter) = 0 —— MIP 过滤
- repeat_u: int (RenderingDevice.SamplerRepeatMode) = 2 —— U 方向重复模式
- repeat_v: int (RenderingDevice.SamplerRepeatMode) = 2 —— V 方向重复模式
- repeat_w: int (RenderingDevice.SamplerRepeatMode) = 2 —— W 方向重复模式
- unnormalized_uvw: bool = false —— 是否使用非归一化 UVW
- use_anisotropy: bool = false —— 是否使用各向异性
