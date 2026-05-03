extends RefCounted
class_name SSEHandler


# ═══════════════════ SSE 事件路由器 ═══════════════════
# 接收 SSE 事件并转发给回调函数。不操作 UI、不管理状态。
# 回调用 Callable 注入，无信号生命周期问题。


# ── 回调（由 MainScene 在初始化时注入） ──
var on_part_delta: Callable  # Callable(sessionID, partID, field, delta)
var on_session_status: Callable  # Callable(sessionID, status_dict)
var on_tool_updated: Callable  # Callable(sessionID, tool_name, status, title)
var on_message_updated: Callable  # Callable(sessionID)
var on_permission_asked: Callable  # Callable(properties)
var on_question_asked: Callable  # Callable(properties)
var on_server_connected: Callable  # Callable()
var on_server_info: Callable  # Callable(info_dict)
var on_heartbeat: Callable  # Callable()


func handle_event(event_type: String, properties: Dictionary) -> void:
	match event_type:
		"server.connected":
			if on_server_connected.is_valid():
				on_server_connected.call()

		"server.heartbeat":
			if on_heartbeat.is_valid():
				on_heartbeat.call()

		"server.info":
			if on_server_info.is_valid():
				on_server_info.call(properties)

		"message.part.delta":
			var sid: String = properties.get("sessionID", "")
			var part_id: String = properties.get("partID", "")
			var field: String = properties.get("field", "")
			var delta: String = properties.get("delta", "")
			if on_part_delta.is_valid():
				on_part_delta.call(sid, part_id, field, delta)

		"message.updated":
			var sid: String = properties.get("sessionID", "")
			if on_message_updated.is_valid():
				on_message_updated.call(sid)

		"sync":
			var sync_data: Dictionary = properties.get("syncEvent", {})
			var sync_type: String = sync_data.get("type", "")
			if sync_type == "message.part.updated":
				var data: Dictionary = sync_data.get("data", {})
				var part: Dictionary = data.get("part", {})
				var part_type: String = part.get("type", "")
				if part_type == "tool":
					var sid: String = data.get("sessionID", "")
					var tool_name: String = part.get("tool", "?")
					var state: Dictionary = part.get("state", {})
					var status: String = state.get("status", "running")
					var title: String = state.get("title", "")
					if on_tool_updated.is_valid():
						on_tool_updated.call(sid, tool_name, status, title)

		"session.status":
			var sid: String = properties.get("sessionID", "")
			var status: Dictionary = properties.get("status", {})
			if on_session_status.is_valid():
				on_session_status.call(sid, status)

		"permission.asked":
			if on_permission_asked.is_valid():
				on_permission_asked.call(properties)

		"question.asked":
			if on_question_asked.is_valid():
				on_question_asked.call(properties)
