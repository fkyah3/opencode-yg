## JSONRPC <- Object（对象）

JSON-RPC 是一种将方法调用封装在 JSON 对象中的标准。该对象具有特定的结构，标识被调用的方法、该函数的参数，并携带一个 ID 来跟踪响应。此类在 Dictionary 之上实现了该标准；您需要与其他函数在 Dictionary 和 JSON 之间进行转换。

**方法（Methods）：**
- make_notification(method: String, params: Variant) -> Dictionary
- make_request(method: String, params: Variant, id: Variant) -> Dictionary
- make_response(result: Variant, id: Variant) -> Dictionary
- make_response_error(code: int, message: String, id: Variant = null) -> Dictionary
- process_action(action: Variant, recurse: bool = false) -> Variant
- process_string(action: String) -> String
- set_method(name: String, callback: Callable)

**枚举（Enums）：**
**ErrorCode：** PARSE_ERROR=-32700, INVALID_REQUEST=-32600, METHOD_NOT_FOUND=-32601, INVALID_PARAMS=-32602, INTERNAL_ERROR=-32603
