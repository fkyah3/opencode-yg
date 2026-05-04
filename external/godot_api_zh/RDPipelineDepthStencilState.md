## RDPipelineDepthStencilState（渲染设备管线深度模板状态） <- RefCounted（引用计数）

RDPipelineDepthStencilState 控制使用 RenderingDevice 采样深度和模板值时进行比较的方式。

**属性（Props）：**
- back_op_compare: int (RenderingDevice.CompareOperator) = 7 —— 背面比较操作
- back_op_compare_mask: int = 0 —— 背面比较掩码
- back_op_depth_fail: int (RenderingDevice.StencilOperation) = 1 —— 背面深度失败操作
- back_op_fail: int (RenderingDevice.StencilOperation) = 1 —— 背面失败操作
- back_op_pass: int (RenderingDevice.StencilOperation) = 1 —— 背面通过操作
- back_op_reference: int = 0 —— 背面参考值
- back_op_write_mask: int = 0 —— 背面写入掩码
- depth_compare_operator: int (RenderingDevice.CompareOperator) = 7 —— 深度比较运算符
- depth_range_max: float = 0.0 —— 深度范围最大值
- depth_range_min: float = 0.0 —— 深度范围最小值
- enable_depth_range: bool = false —— 启用深度范围
- enable_depth_test: bool = false —— 启用深度测试
- enable_depth_write: bool = false —— 启用深度写入
- enable_stencil: bool = false —— 启用模板
- front_op_compare: int (RenderingDevice.CompareOperator) = 7 —— 正面比较操作
- front_op_compare_mask: int = 0 —— 正面比较掩码
- front_op_depth_fail: int (RenderingDevice.StencilOperation) = 1 —— 正面深度失败操作
- front_op_fail: int (RenderingDevice.StencilOperation) = 1 —— 正面失败操作
- front_op_pass: int (RenderingDevice.StencilOperation) = 1 —— 正面通过操作
- front_op_reference: int = 0 —— 正面参考值
- front_op_write_mask: int = 0 —— 正面写入掩码
