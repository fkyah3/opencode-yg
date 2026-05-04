## HTTPRequest（HTTP 请求） <- Node（节点）

具有发送 HTTP 请求能力的节点。内部使用 HTTPClient。可用于发出 HTTP 请求，即通过 HTTP 下载或上传文件或网页内容。**警告：** 请参阅 HTTPClient 上的说明和警告以了解限制，尤其是关于 TLS 安全性的限制。**注意：** 导出到 Android 时，请确保在 Android 导出预设中启用 `INTERNET` 权限，然后再导出项目或使用一键部署。否则，Android 将阻止任何类型的网络通信。**示例：** 联系 REST API 并打印其返回的字段之一：**示例：** 使用 HTTPRequest 加载图像并显示：**注意：** HTTPRequest 节点会自动处理响应体的解压缩。除非已指定，否则将自动为每个请求添加 `Accept-Encoding` 头。任何带有 `Content-Encoding: gzip` 头的响应都将自动解压缩，并以未压缩的字节形式提供给你。

**属性（Props）：**
- accept_gzip: bool = true —— 接受 gzip 压缩
- body_size_limit: int = -1 —— 响应体大小限制
- download_chunk_size: int = 65536 —— 下载块大小
- download_file: String = "" —— 下载文件路径
- max_redirects: int = 8 —— 最大重定向次数
- timeout: float = 0.0 —— 超时时间
- use_threads: bool = false —— 是否使用线程

**方法（Methods）：**
- cancel_request() —— 取消请求
- get_body_size() -> int —— 获取响应体大小
- get_downloaded_bytes() -> int —— 获取已下载字节数
- get_http_client_status() -> int —— 获取 HTTP 客户端状态
- request(url: String, custom_headers: PackedStringArray = PackedStringArray(), method: int = 0, request_data: String = "") -> int —— 发送请求
- request_raw(url: String, custom_headers: PackedStringArray = PackedStringArray(), method: int = 0, request_data_raw: PackedByteArray = PackedByteArray()) -> int —— 发送原始请求
- set_http_proxy(host: String, port: int) —— 设置 HTTP 代理
- set_https_proxy(host: String, port: int) —— 设置 HTTPS 代理
- set_tls_options(client_options: TLSOptions) —— 设置 TLS 选项

**信号（Signals）：**
- request_completed(result: int, response_code: int, headers: PackedStringArray, body: PackedByteArray) —— 请求完成

**枚举（Enums）：**
**Result（结果）：** RESULT_SUCCESS=0（成功）, RESULT_CHUNKED_BODY_SIZE_MISMATCH=1（分块响应体大小不匹配）, RESULT_CANT_CONNECT=2（无法连接）, RESULT_CANT_RESOLVE=3（无法解析）, RESULT_CONNECTION_ERROR=4（连接错误）, RESULT_TLS_HANDSHAKE_ERROR=5（TLS 握手错误）, RESULT_NO_RESPONSE=6（无响应）, RESULT_BODY_SIZE_LIMIT_EXCEEDED=7（超出响应体大小限制）, RESULT_BODY_DECOMPRESS_FAILED=8（响应体解压缩失败）, RESULT_REQUEST_FAILED=9（请求失败）, ...
