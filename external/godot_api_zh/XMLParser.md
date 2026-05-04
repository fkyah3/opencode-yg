## XMLParser <- RefCounted（引用计数）

提供用于创建文件解析器的低级接口。此类可作为自定义 XML 解析器的基础。要解析 XML，必须使用 `open` 方法打开文件，或使用 `open_buffer` 方法打开缓冲区。然后，必须调用 `read` 方法来解析下一个节点。大多数方法会考虑当前正在解析的节点。以下是使用 XMLParser 解析 SVG 文件（基于 XML）的示例，将每个元素及其属性作为字典打印：

**方法（Methods）：**
- get_attribute_count() -> int —— 获取属性数量
- get_attribute_name(idx: int) -> String —— 获取属性名称
- get_attribute_value(idx: int) -> String —— 获取属性值
- get_current_line() -> int —— 获取当前行
- get_named_attribute_value(name: String) -> String —— 获取命名属性的值
- get_named_attribute_value_safe(name: String) -> String —— 安全获取命名属性的值
- get_node_data() -> String —— 获取节点数据
- get_node_name() -> String —— 获取节点名称
- get_node_offset() -> int —— 获取节点偏移
- get_node_type() -> int —— 获取节点类型
- has_attribute(name: String) -> bool —— 是否包含属性
- is_empty() -> bool —— 是否为空
- open(file: String) -> int —— 打开文件
- open_buffer(buffer: PackedByteArray) -> int —— 打开缓冲区
- read() -> int —— 读取
- seek(position: int) -> int —— 定位
- skip_section() —— 跳过部分

**枚举（Enums）：**
**NodeType（节点类型）：** NODE_NONE=0（无）, NODE_ELEMENT=1（元素）, NODE_ELEMENT_END=2（元素结束）, NODE_TEXT=3（文本）, NODE_COMMENT=4（注释）, NODE_CDATA=5（CDATA）, NODE_UNKNOWN=6（未知）
