## VisualShaderNodeGroupBase <- VisualShaderNodeResizableBase（可调整大小的基础节点）

目前没有直接用途，请改用派生类。

**方法（Methods）：**
- add_input_port(id: int, type: int, name: String) —— 添加输入端口
- add_output_port(id: int, type: int, name: String) —— 添加输出端口
- clear_input_ports() —— 清除输入端口
- clear_output_ports() —— 清除输出端口
- get_free_input_port_id() -> int —— 获取空闲输入端口ID
- get_free_output_port_id() -> int —— 获取空闲输出端口ID
- get_input_port_count() -> int —— 获取输入端口数量
- get_inputs() -> String —— 获取输入配置
- get_output_port_count() -> int —— 获取输出端口数量
- get_outputs() -> String —— 获取输出配置
- has_input_port(id: int) -> bool —— 是否包含指定输入端口
- has_output_port(id: int) -> bool —— 是否包含指定输出端口
- is_valid_port_name(name: String) -> bool —— 是否是有效的端口名称
- remove_input_port(id: int) —— 移除输入端口
- remove_output_port(id: int) —— 移除输出端口
- set_input_port_name(id: int, name: String) —— 设置输入端口名称
- set_input_port_type(id: int, type: int) —— 设置输入端口类型
- set_inputs(inputs: String) —— 设置输入配置
- set_output_port_name(id: int, name: String) —— 设置输出端口名称
- set_output_port_type(id: int, type: int) —— 设置输出端口类型
- set_outputs(outputs: String) —— 设置输出配置
