class_name SSEClient
extends Node

## Server-Sent Events 客户端
##
## 连接 opencode headless server 的 /api/event SSE 端点。
## 在 _process 中轮询 HTTPClient 来持续接收事件。

signal connected()
signal disconnected()
signal event_received(event_type: String, properties: Dictionary)
signal connection_error(msg: String)

var host: String = "127.0.0.1"
var port: int = 4096
var event_path: String = "/global/event"


## 修改服务器地址。断开当前连接，后续 start() 使用新地址。
func set_url(url: String) -> void:
	if _should_run:
		stop()
	var trimmed := url.trim_suffix("/")
	if trimmed.begins_with("http://"):
		trimmed = trimmed.trim_prefix("http://")
	elif trimmed.begins_with("https://"):
		trimmed = trimmed.trim_prefix("https://")
	var parts := trimmed.split(":")
	host = parts[0]
	port = int(parts[1]) if parts.size() > 1 else 4096


var is_connected: bool:
	get:
		return _client != null and _client.get_status() == HTTPClient.STATUS_BODY

var _client: HTTPClient
var _buffer: String = ""
var _should_run: bool = false


func _ready() -> void:
	_client = HTTPClient.new()


func start() -> void:
	if _should_run:
		return
	_should_run = true
	_buffer = ""

	var err = _client.connect_to_host(host, port)
	if err != OK:
		connection_error.emit("连接失败: " + _err_str(err))
		_should_run = false


func stop() -> void:
	_should_run = false
	if _client:
		_client.close()
	_buffer = ""


func _process(_delta: float) -> void:
	if not _should_run:
		return

	_client.poll()

	match _client.get_status():
		HTTPClient.STATUS_CONNECTING:
			# 等待连接建立
			pass

		HTTPClient.STATUS_CONNECTED:
			var headers := PackedStringArray([
				"Accept: text/event-stream",
				"Cache-Control: no-cache",
			])
			var err = _client.request(HTTPClient.METHOD_GET, event_path, headers)
			if err != OK:
				connection_error.emit("SSE 请求失败: " + _err_str(err))
				stop()

		HTTPClient.STATUS_BODY:
			if not _client.has_response():
				return
			connected.emit()
			_read_chunks()

		HTTPClient.STATUS_DISCONNECTED:
			if _should_run:
				_should_run = false
				disconnected.emit()

		HTTPClient.STATUS_CONNECTION_ERROR:
			connection_error.emit("连接出错")
			stop()

		_:
			# REQUESTING / BODY 之间不需要额外处理
			pass


func _read_chunks() -> void:
	while _client.get_status() == HTTPClient.STATUS_BODY:
		var chunk = _client.read_response_body_chunk()
		if chunk.size() == 0:
			break
		_buffer += chunk.get_string_from_utf8()

		# 按 \n\n 分割事件
		while "\n\n" in _buffer:
			var idx := _buffer.find("\n\n")
			var raw := _buffer.substr(0, idx)
			_buffer = _buffer.substr(idx + 2)
			_parse_event(raw.strip_edges())


func _parse_event(line: String) -> void:
	# 跳过非 data: 开头的行
	if not line.begins_with("data: "):
		return

	# 解析 JSON 负载
	var json_str := line.substr(6)
	var parsed = JSON.parse_string(json_str) as Dictionary
	if parsed == null:
		return

	# 全局 SSE (/global/event) 事件格式:
	#   { directory, project?, workspace?, payload: { type, properties } }
	# 直发事件格式 (server.connected, heartbeat):
	#   { type, properties }
	var event_type: String
	var properties: Dictionary

	if parsed.has("payload"):
		# 从 GlobalBus 包装中解出实际事件
		var payload: Dictionary = parsed.get("payload", {})
		event_type = payload.get("type", "")
		properties = payload.get("properties", {})
	else:
		# 直发格式
		event_type = parsed.get("type", "")
		properties = parsed.get("properties", {})

	# 发射到监听方（MainScene）
	event_received.emit(event_type, properties)


func _err_str(err: int) -> String:
	match err:
		ERR_CANT_CONNECT:
			return "无法连接"
		ERR_CANT_RESOLVE:
			return "DNS 解析失败"
		ERR_TIMEOUT:
			return "连接超时"
		_:
			return "错误码: " + str(err)


func _exit_tree() -> void:
	stop()
