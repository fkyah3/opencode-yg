class_name OpenCodeAPI
extends Node

## OpenCode headless server API 客户端
##
## 连接到 http://127.0.0.1:4096/api/ 的 REST 端点。
## 使用持久 HTTPRequest 节点，通过 cancel_request 避免并发冲突。
## 请求完成后自动清理，等待结果再处理下一个请求。

signal connection_ok()
signal connection_failed(reason: String)

var _base_url: String = "http://127.0.0.1:4096"
var _http: HTTPRequest
var _reply_http: HTTPRequest


## 修改服务器地址。调用后后续请求使用新地址。
func set_base_url(url: String) -> void:
	_base_url = url.trim_suffix("/")


## 健康检查。成功返回 true。
func health_check() -> bool:
	var url := _base_url + "/global/health"
	var data = await _request(url, "GET")
	if not (data is Dictionary):
		return false
	var healthy = data.get("healthy", false)
	if healthy:
		connection_ok.emit()
		return true
	connection_failed.emit("服务器响应 unhealthy")
	return false


## 获取会话列表。返回 Session.Info 数组（Dictionary[]），失败返回 []。
func list_sessions() -> Array:
	var data = await _request(_base_url + "/session", "GET")
	if data is Array:
		return data as Array
	return []


## 创建新会话。可选参数 title。返回 Dictionary，失败返回 {}。
func create_session(title: String = "") -> Dictionary:
	var body_str := "{}"
	if not title.is_empty():
		body_str = JSON.stringify({"title": title})
	var data = await _request(_base_url + "/session", "POST", body_str)
	if data is Dictionary:
		return data as Dictionary
	return {}


## 获取指定会话的消息列表。返回 MessageV2 数组（Dictionary[]），失败返回 []。
## before: 可选游标，用于加载更旧的下一页消息。
func get_messages(session_id: String, limit: int = 50, before: String = "") -> Array:
	var url := _base_url + "/session/%s/message?limit=%d" % [session_id, limit]
	if not before.is_empty():
		url += "&before=" + before
	var data = await _request(url, "GET")
	if data is Array:
		return data as Array
	return []


## 分页取消息，返回 {items, cursor, more}。cursor 为空时没有更多数据。
func get_messages_page(session_id: String, limit: int = 50, before: String = "") -> Dictionary:
	var url := _base_url + "/session/%s/message?limit=%d" % [session_id, limit]
	if not before.is_empty():
		url += "&before=" + before
	var resp = await _request_full(url, "GET")
	if resp.is_empty() or not (resp.result is Array):
		return {"items": [], "cursor": "", "more": false}
	var cursor := ""
	for h in resp.headers:
		if h is String:
			var hstr: String = h as String
			var trimmed: String = hstr.strip_edges()
			if trimmed.begins_with("X-Next-Cursor: "):
				cursor = trimmed.trim_prefix("X-Next-Cursor: ")
	return {"items": resp.result as Array, "cursor": cursor, "more": not cursor.is_empty()}



## 发送消息到指定会话。返回响应 Dictionary（{info, parts}），失败返回 {}。
func send_message(session_id: String, text: String) -> Dictionary:
	var url := _base_url + "/session/%s/message" % session_id
	var body_str := JSON.stringify({"parts": [{"type": "text", "text": text}]})
	var data = await _request(url, "POST", body_str)
	if data is Dictionary:
		return data as Dictionary
	return {}


## 发送消息，不等待返回（由 SSE 流式渲染驱动）。
## 使用独立的 HTTPRequest 节点避免与同步 API 冲突。
func send_message_async(session_id: String, text: String) -> void:
	var url := _base_url + "/session/%s/message" % session_id
	var body_str := JSON.stringify({"parts": [{"type": "text", "text": text}]})
	var http := HTTPRequest.new()
	http.use_threads = true
	add_child(http)
	var headers := PackedStringArray(["Content-Type: application/json"])
	http.request(url, headers, HTTPClient.METHOD_POST, body_str)
	# 请求完成后自清理，不等待不处理返回
	var _resp = await http.request_completed
	http.queue_free()


## 中止会话。
func abort_session(session_id: String) -> bool:
	var url := _base_url + "/session/%s/abort" % session_id
	var data = await _request(url, "POST", "{}")
	return data != null


## 回复权限请求。reply_type: "once" / "always" / "reject"。message 可选。
func reply_permission(request_id: String, reply_type: String, message: String = "") -> bool:
	var url := _base_url + "/permission/%s/reply" % request_id
	var body := {"reply": reply_type}
	if not message.is_empty():
		body["message"] = message
	var data = await _reply_request(url, "POST", JSON.stringify(body))
	return data != null


## 回答问题。answers 是标签字符串数组。
func reply_question(request_id: String, answers: Array) -> bool:
	var url := _base_url + "/question/%s/reply" % request_id
	var body := JSON.stringify({"answers": answers})
	var data = await _reply_request(url, "POST", body)
	return data != null


## 获取路径信息。返回 Dictionary，失败返回 null。
func get_path_info() -> Variant:
	return await _request(_base_url + "/path", "GET")

func get_lsp_info() -> Variant:
	return await _request(_base_url + "/lsp", "GET")

func get_agent_info() -> Variant:
	return await _request(_base_url + "/agent", "GET")

## 获取当前主 Agent（mode=primary）的信息字典，包含 name/model/options。
## 返回 Dictionary {name, model:{providerID,modelID}}，失败返回 {}。
func get_primary_agent() -> Dictionary:
	var agents = await get_agent_info()
	if agents is Array:
		for a in agents:
			if a is Dictionary and a.get("mode") == "primary":
				return a as Dictionary
	return {}

## 获取全局配置。返回 Dictionary，失败返回 {}。
func get_config() -> Dictionary:
	var data = await _request(_base_url + "/global/config", "GET")
	if data is Dictionary:
		return data as Dictionary
	return {}


# ── 核心请求方法 ──

func _lazy_init_http() -> void:
	if _http and is_instance_valid(_http):
		return
	_http = HTTPRequest.new()
	_http.name = "OpenCodeAPI_HTTP"
	_http.use_threads = true
	add_child(_http)


func _lazy_init_reply_http() -> void:
	if _reply_http and is_instance_valid(_reply_http):
		return
	_reply_http = HTTPRequest.new()
	_reply_http.name = "OpenCodeAPI_ReplyHTTP"
	_reply_http.use_threads = true
	add_child(_reply_http)


func _request(url: String, method: String, body: String = "") -> Variant:
	## 首次调用时初始化持久 HTTP 节点，后续复用。
	## 每次请求前 cancel_request 避免信号冲突。

	_lazy_init_http()
	_http.cancel_request()

	var headers := PackedStringArray()
	var http_method: int

	if method == "GET":
		http_method = HTTPClient.METHOD_GET
	else:
		headers = PackedStringArray(["Content-Type: application/json"])
		http_method = HTTPClient.METHOD_POST if method == "POST" else HTTPClient.METHOD_PATCH

	var err = _http.request(url, headers, http_method, body)

	if err != OK:
		push_error("[OpenCodeAPI] ", method, " 失败: ", url, " error=", err)
		return null

	var resp = await _http.request_completed

	var req_result: int = resp[0]
	var resp_code: int = resp[1]
	var resp_body: PackedByteArray = resp[3]

	if req_result != HTTPRequest.RESULT_SUCCESS:
		push_error("[OpenCodeAPI] 请求失败 result=", str(req_result), " url=", url)
		return null

	if resp_code != 200:
		var body_text := resp_body.get_string_from_utf8()
		push_error("[OpenCodeAPI] 非 200: code=", str(resp_code), " body=", body_text.left(300))
		return null

	var body_text := resp_body.get_string_from_utf8()
	var parsed = JSON.parse_string(body_text)
	if parsed == null:
		push_error("[OpenCodeAPI] JSON 解析失败: ", url)
		return null

	return parsed


## 与 _request 相同但返回完整响应 {result, headers}。
## 用于需要读取响应头（如 X-Next-Cursor）的分页请求。
func _request_full(url: String, method: String, body: String = "") -> Dictionary:
	_lazy_init_http()
	_http.cancel_request()
	var headers := PackedStringArray()
	var http_method: int
	if method == "GET":
		http_method = HTTPClient.METHOD_GET
	else:
		headers = PackedStringArray(["Content-Type: application/json"])
		http_method = HTTPClient.METHOD_POST if method == "POST" else HTTPClient.METHOD_PATCH
	var err = _http.request(url, headers, http_method, body)
	if err != OK:
		push_error("[OpenCodeAPI] _request_full ", method, " 失败: ", url, " error=", err)
		return {}
	var resp = await _http.request_completed
	var req_result: int = resp[0]
	var resp_code: int = resp[1]
	var resp_headers: PackedStringArray = resp[2]
	var resp_body: PackedByteArray = resp[3]
	if req_result != HTTPRequest.RESULT_SUCCESS or resp_code != 200:
		return {}
	var body_text := resp_body.get_string_from_utf8()
	var parsed = JSON.parse_string(body_text)
	if parsed == null:
		return {}
	return {"result": parsed, "headers": resp_headers}


## 独立 HTTP 请求（使用 _reply_http 节点，不与 _request 共享 _http）。
## 用于 permission/question 回复，避免与主 HTTP 请求竞争。
func _reply_request(url: String, method: String, body: String = "") -> Variant:
	_lazy_init_reply_http()
	var headers := PackedStringArray(["Content-Type: application/json"])
	var http_method: int = HTTPClient.METHOD_POST if method == "POST" else HTTPClient.METHOD_PATCH if method == "PATCH" else HTTPClient.METHOD_GET
	var err = _reply_http.request(url, headers, http_method, body)
	if err != OK:
		push_error("[OpenCodeAPI] _reply_request ", method, " 失败: ", url, " error=", err)
		return null
	var resp = await _reply_http.request_completed
	var req_result: int = resp[0]
	var resp_code: int = resp[1]
	var resp_body: PackedByteArray = resp[3]
	if req_result != HTTPRequest.RESULT_SUCCESS:
		push_error("[OpenCodeAPI] _reply_request 失败 result=", str(req_result), " url=", url)
		return null
	if resp_code != 200:
		var body_text := resp_body.get_string_from_utf8()
		push_error("[OpenCodeAPI] _reply_request 非 200: code=", str(resp_code), " body=", body_text.left(300))
		return null
	var body_text := resp_body.get_string_from_utf8()
	var parsed = JSON.parse_string(body_text)
	return parsed
