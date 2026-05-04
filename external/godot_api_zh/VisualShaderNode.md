## VisualShaderNode <- Resource（资源）

可视化着色器图形由各种节点组成。图中的每个节点都是一个独立对象，表示为带有标题和一组属性的矩形框。每个节点还有连接端口，允许连接到其他节点并控制着色器的流程。

**属性（Props）：**
- linked_parent_graph_frame: int = -1 —— 关联的父图形框架
- output_port_for_preview: int = -1 —— 预览输出端口

**方法（Methods）：**
- clear_default_input_values() —— 清除默认输入值
- get_default_input_port(type: int) -> int —— 获取默认输入端口
- get_default_input_values() -> Array —— 获取默认输入值
- get_input_port_default_value(port: int) -> Variant —— 获取输入端口默认值
- remove_input_port_default_value(port: int) —— 移除输入端口默认值
- set_default_input_values(values: Array) —— 设置默认输入值
- set_input_port_default_value(port: int, value: Variant, prev_value: Variant = null) —— 设置输入端口默认值

**枚举（Enums）：**
**PortType（端口类型）：** PORT_TYPE_SCALAR=0（标量）, PORT_TYPE_SCALAR_INT=1（整数标量）, PORT_TYPE_SCALAR_UINT=2（无符号整数标量）, PORT_TYPE_VECTOR_2D=3（2D向量）, PORT_TYPE_VECTOR_3D=4（3D向量）, PORT_TYPE_VECTOR_4D=5（4D向量）, PORT_TYPE_BOOLEAN=6（布尔）, PORT_TYPE_TRANSFORM=7（变换）, PORT_TYPE_SAMPLER=8（采样器）, PORT_TYPE_MAX=9（最大值）
