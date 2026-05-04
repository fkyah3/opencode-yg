## VisualShader <- Shader（着色器）

此类提供了一个类似图形的可视化编辑器，用于创建 Shader。虽然 VisualShader 不需要编码，但它们与脚本着色器共享相同的逻辑。它们使用可以相互连接的 VisualShaderNode 来控制着色器的流程。可视化着色器图形在后台会转换为脚本着色器。

**属性（Props）：**
- graph_offset: Vector2 —— 图形偏移

**方法（Methods）：**
- add_node(type: int, node: VisualShaderNode, position: Vector2, id: int) —— 添加节点
- add_varying(name: String, mode: int, type: int) —— 添加 varying 变量
- attach_node_to_frame(type: int, id: int, frame: int) —— 将节点附加到框架
- can_connect_nodes(type: int, from_node: int, from_port: int, to_node: int, to_port: int) -> bool —— 是否可以连接节点
- connect_nodes(type: int, from_node: int, from_port: int, to_node: int, to_port: int) -> int —— 连接节点
- connect_nodes_forced(type: int, from_node: int, from_port: int, to_node: int, to_port: int) —— 强制连接节点
- detach_node_from_frame(type: int, id: int) —— 从框架分离节点
- disconnect_nodes(type: int, from_node: int, from_port: int, to_node: int, to_port: int) —— 断开节点连接
- get_node(type: int, id: int) -> VisualShaderNode —— 获取节点
- get_node_connections(type: int) -> Dictionary[] —— 获取节点连接
- get_node_list(type: int) -> PackedInt32Array —— 获取节点列表
- get_node_position(type: int, id: int) -> Vector2 —— 获取节点位置
- get_valid_node_id(type: int) -> int —— 获取有效节点ID
- has_varying(name: String) -> bool —— 是否包含指定 varying
- is_node_connection(type: int, from_node: int, from_port: int, to_node: int, to_port: int) -> bool —— 是否是节点连接
- remove_node(type: int, id: int) —— 移除节点
- remove_varying(name: String) —— 移除 varying
- replace_node(type: int, id: int, new_class: StringName) —— 替换节点
- set_mode(mode: int) —— 设置模式
- set_node_position(type: int, id: int, position: Vector2) —— 设置节点位置

**枚举（Enums）：**
**Type（类型）：** TYPE_VERTEX=0（顶点）, TYPE_FRAGMENT=1（片段）, TYPE_LIGHT=2（光照）, TYPE_START=3（开始）, TYPE_PROCESS=4（处理）, TYPE_COLLIDE=5（碰撞）, TYPE_START_CUSTOM=6（自定义开始）, TYPE_PROCESS_CUSTOM=7（自定义处理）, TYPE_SKY=8（天空）, TYPE_FOG=9（雾）, ...
**VaryingMode（Varying模式）：** VARYING_MODE_VERTEX_TO_FRAG_LIGHT=0（顶点到片段/光照）, VARYING_MODE_FRAG_TO_LIGHT=1（片段到光照）, VARYING_MODE_MAX=2（最大值）
**VaryingType（Varying类型）：** VARYING_TYPE_FLOAT=0（浮点）, VARYING_TYPE_INT=1（整数）, VARYING_TYPE_UINT=2（无符号整数）, VARYING_TYPE_VECTOR_2D=3（2D向量）, VARYING_TYPE_VECTOR_3D=4（3D向量）, VARYING_TYPE_VECTOR_4D=5（4D向量）, VARYING_TYPE_BOOLEAN=6（布尔）, VARYING_TYPE_TRANSFORM=7（变换）, VARYING_TYPE_MAX=8（最大值）
**Constants（常量）：** NODE_ID_INVALID=-1（无效节点ID）, NODE_ID_OUTPUT=0（输出节点ID）
