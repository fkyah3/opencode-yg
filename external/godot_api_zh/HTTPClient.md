## HTTPClient（HTTP 客户端） <- RefCounted（引用计数）

超文本传输协议客户端（有时称为"用户代理"）。用于发送 HTTP 请求以下载网页内容、上传文件和其他数据，或与各种服务通信等。参见 HTTPRequest 节点以获得更高级的替代方案。**注意：** 此客户端只需连接主机一次（参见 `connect_to_host`）即可发送多个请求。因此，接受 URL 的方法通常只接受主机名后面的部分，而不是完整 URL，因为客户端已经连接到主机。参见 `request` 以获取完整示例和入门指南。HTTPClient 应在多个请求之间重复使用，或用于连接到不同的主机，而不是为每个请求创建一个新客户端。支持传输层安全（TLS），包括服务器证书验证。2xx 范围内的 HTTP 状态码表示成功，3xx 表示重定向（即"再试一次，但去那里"），4xx 表示请求有误，5xx 表示服务器端出现问题。有关 HTTP 的更多信息，请参见（或阅读以获取第一手资料）。**注意：** 导出到 Android 时，请确保在 Android 导出预设中启用 `INTERNET` 权限，然后再导出项目或使用一键部署。否则，Android 将阻止任何类型的网络通信。**注意：** 建议使用传输加密（TLS），并避免在 HTTP GET URL 参数中发送敏感信息（如登录凭据）。建议使用 HTTP POST 请求或 HTTP 头部来发送此类信息。**注意：** 当从导出到 Web 的项目执行 HTTP 请求时，请注意远程服务器可能由于跨域问题而不允许来自外部来源的请求。如果你托管相关服务器，应修改其后端以添加 `Access-Control-Allow-Origin: *` HTTP 头来允许来自外部来源的请求。**注意：** TLS 支持目前仅限于 TLSv1.2 和 TLSv1.3。尝试连接到仅支持较旧 TLS 版本的服务器将返回 `...

**属性（Props）：**
- blocking_mode_enabled: bool = false —— 是否启用阻塞模式
- connection: StreamPeer —— 连接
- read_chunk_size: int = 65536 —— 读取块大小

**方法（Methods）：**
- close() —— 关闭
- connect_to_host(host: String, port: int = -1, tls_options: TLSOptions = null) -> int —— 连接到主机
- get_response_body_length() -> int —— 获取响应体长度
- get_response_code() -> int —— 获取响应码
- get_response_headers() -> PackedStringArray —— 获取响应头
- get_response_headers_as_dictionary() -> Dictionary —— 以字典形式获取响应头
- get_status() -> int —— 获取状态
- has_response() -> bool —— 是否有响应
- is_response_chunked() -> bool —— 响应是否为分块
- poll() -> int —— 轮询
- query_string_from_dict(fields: Dictionary) -> String —— 从字典生成查询字符串
- read_response_body_chunk() -> PackedByteArray —— 读取响应体块
- request(method: int, url: String, headers: PackedStringArray, body: String = "") -> int —— 发送请求
- request_raw(method: int, url: String, headers: PackedStringArray, body: PackedByteArray) -> int —— 发送原始请求
- set_http_proxy(host: String, port: int) —— 设置 HTTP 代理
- set_https_proxy(host: String, port: int) —— 设置 HTTPS 代理

**枚举（Enums）：**
**Method（方法）：** METHOD_GET=0（GET）, METHOD_HEAD=1（HEAD）, METHOD_POST=2（POST）, METHOD_PUT=3（PUT）, METHOD_DELETE=4（DELETE）, METHOD_OPTIONS=5（OPTIONS）, METHOD_TRACE=6（TRACE）, METHOD_CONNECT=7（CONNECT）, METHOD_PATCH=8（PATCH）, METHOD_MAX=9（最大）
**Status（状态）：** STATUS_DISCONNECTED=0（已断开）, STATUS_RESOLVING=1（解析中）, STATUS_CANT_RESOLVE=2（无法解析）, STATUS_CONNECTING=3（连接中）, STATUS_CANT_CONNECT=4（无法连接）, STATUS_CONNECTED=5（已连接）, STATUS_REQUESTING=6（请求中）, STATUS_BODY=7（正文中）, STATUS_CONNECTION_ERROR=8（连接错误）, STATUS_TLS_HANDSHAKE_ERROR=9（TLS 握手错误）
**ResponseCode（响应码）：** RESPONSE_CONTINUE=100（继续）, RESPONSE_SWITCHING_PROTOCOLS=101（切换协议）, RESPONSE_PROCESSING=102（处理中）, RESPONSE_OK=200（成功）, RESPONSE_CREATED=201（已创建）, RESPONSE_ACCEPTED=202（已接受）, RESPONSE_NON_AUTHORITATIVE_INFORMATION=203（非权威信息）, RESPONSE_NO_CONTENT=204（无内容）, RESPONSE_RESET_CONTENT=205（重置内容）, RESPONSE_PARTIAL_CONTENT=206（部分内容）, ...
