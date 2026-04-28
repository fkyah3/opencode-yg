---
name: godot
description: |
  Godot 4.6+ (GDScript) 开发技能。覆盖 HTTP 请求、SSE 流式接收、RichTextLabel 富文本、
  Control 节点布局、WebSocket、以及 opencode Godot 客户端开发所需的全部 Godot API 用法。
  当任务需要使用 Godot 引擎 API 时加载此技能。
---

# Godot 开发技能

> **适用版本**: Godot 4.6.2+  
> **文档来源**: `specs/frankenstein-workflow-constraints/Godot开发流程规范/` 及 Godot 4.6 官方文档

## 目录

1. [核心原则](#1-核心原则)
2. [GDScript 语法](#2-gdscript-语法)
3. [HTTP 请求（HTTPRequest）](#3-http-请求httprequest)
4. [SSE 流式接收（HTTPClient）](#4-sse-流式接收httpclient)
5. [RichTextLabel 富文本](#5-richtextlabel-富文本)
6. [UI 布局（Control 节点体系）](#6-ui-布局control-节点体系)
7. [WebSocket 客户端](#7-websocket-客户端)
8. [Godot 客户端项目参考](#8-godot-客户端项目参考)

---

## 1. 核心原则

### 1.1 类型优先
- 函数参数和返回值必须显式类型
- 类成员变量 `@export` 的必须显式类型
- 所有数组必须参数化 `Array[类型]`

### 1.2 节点访问
```gdscript
# ✅ 正确
@onready var http := $HTTPRequest as HTTPRequest
@onready var chat_label := %ChatLabel as RichTextLabel

# ❌ 不要用硬编码绝对路径
```

### 1.3 信号连接
```gdscript
# ✅ 安全连接
if not http.request_completed.is_connected(_on_completed):
    http.request_completed.connect(_on_completed)

# ✅ 带自定义参数的信号
signal item_collected(item: Item, amount: int)
```

### 1.4 空值安全
```gdscript
# ✅ 安全导航
var label := $Label as RichTextLabel
if label:
    label.text = "Hello"

# ✅ as 转换后检查
var node := %SomeNode as Control
if not node:
    push_error("SomeNode not found")
    return
```

---

## 2. GDScript 语法

### 2.1 类型系统

```gdscript
# 基础类型
var health: float = 100.0
var name: String = "Player"
var is_alive: bool = true
var count: int = 0

# 集合类型参数化
var items: Array[Item] = []
var scores: Dictionary[String, int] = {}

# 枚举
enum Direction {UP, DOWN, LEFT, RIGHT}
var dir: Direction = Direction.UP

# 自定义类
class_name PlayerController
extends CharacterBody2D
```

### 2.2 Lambda / 回调

```gdscript
# 类型化 lambda
var callback: Callable = func(amount: float) -> void:
    take_damage(amount)

# 作为信号连接
http_request_completed.connect(func(result, code, headers, body):
    if result == HTTPRequest.RESULT_SUCCESS:
        var data := JSON.parse_string(body.get_string_from_utf8())
)
```

### 2.3 Match 语句

```gdscript
match result:
    HTTPRequest.RESULT_SUCCESS:
        process_response(body)
    HTTPRequest.RESULT_TIMEOUT:
        retry()
    HTTPRequest.RESULT_CONNECTION_ERROR:
        show_error("连接失败")
    _:
        push_error("未知错误")
```

### 2.4 属性访问器

```gdscript
var _health: float = 100.0
var health: float:
    get:
        return _health
    set(value):
        _health = clamp(value, 0.0, max_health)
		emit_signal("health_changed", _health)
```

### 2.5 信号与 Callable

```gdscript
# 自定义信号
signal health_changed(old_value: float, new_value: float)
signal item_collected(item_name: String, count: int)

# 释放时断开
func _exit_tree() -> void:
    if request_completed.is_connected(_on_completed):
        request_completed.disconnect(_on_completed)
```

---

## 3. HTTP 请求（HTTPRequest）

> 文档: `classes/class_httprequest.html` - Godot 4.6 的 REST HTTP 节点

**使用场景**: 向 opencode headless server 发送 GET/POST 请求（会话列表、发送消息等）。

### 3.1 基本用法

```gdscript
extends Node

@onready var http := $HTTPRequest as HTTPRequest

func _ready() -> void:
    # 连接到 localhost 的 opencode headless server
    var base_url := "http://127.0.0.1:4096/api"

    # GET: 获取会话列表
    var error := http.request(base_url + "/session")
    if error != OK:
        push_error("HTTP 请求失败: ", error)

# 响应处理
func _on_http_request_completed(result: int, response_code: int,
		headers: PackedStringArray, body: PackedByteArray) -> void:

    if result != HTTPRequest.RESULT_SUCCESS:
        push_error("请求失败, code=", response_code)
        return

    var json := JSON.parse_string(body.get_string_from_utf8())
    if json == null:
        push_error("JSON 解析失败")
        return

    # json 是 Dictionary 或 Array，根据端点而定
    if json is Array:
        for session in json:
            var session_id := session["id"] as String
            var title := session.get("title", "") as String
    else:
        process_session_data(json as Dictionary)
```

### 3.2 POST 请求（发送消息）

```gdscript
func send_message(session_id: String, text: String) -> void:
    var url := "http://127.0.0.1:4096/api/session/%s/message" % session_id
    var headers := PackedStringArray(["Content-Type: application/json"])

    var body_dict := {
        "parts": [{"type": "text", "text": text}]
    }
    var body_str := JSON.stringify(body_dict)

    var error := http.request(url, headers, HTTPClient.METHOD_POST, body_str)
    if error != OK:
        push_error("发送消息失败")
```

### 3.3 请求方法常量

```gdscript
HTTPClient.METHOD_GET
HTTPClient.METHOD_POST
HTTPClient.METHOD_PUT
HTTPClient.METHOD_PATCH
HTTPClient.METHOD_DELETE
```

### 3.4 注意事项
- 单个 HTTPRequest 节点不能同时发起多个请求
- 需要并行请求时，用多个 HTTPRequest 节点或实例化多个
- 要使用 `use_threads=true`（属性面板可设置）避免阻塞主线程
- `body.get_string_from_utf8()` 将 `PackedByteArray` 转为字符串

---

## 4. SSE 流式接收（HTTPClient）

> 文档: `classes/class_httpclient.html` - 底层 HTTP 客户端

**使用场景**: 连接 opencode 的 `/api/event` SSE 端点，实时接收 AI 流式消息。

### 4.1 SSE 客户端实现

```gdscript
class_name SSEClient
extends Node

signal connected()
signal event_received(event_type: String, properties: Dictionary)
signal disconnected()
signal connection_error(message: String)

var base_url: String = "http://127.0.0.1:4096"
var _client: HTTPClient
var _connected := false
var _buffer: String = ""
var _event_path: String = "/api/event"

func _ready() -> void:
    _client = HTTPClient.new()

func connect_to_sse() -> void:
    if _connected:
        return

    var error := _client.connect_to_host(
        "127.0.0.1",   # host
        4096,           # port
        "/",            # prefix path
        false           # use ssl (HTTPS)
    )
    if error != OK:
        connection_error.emit("连接失败: " + error_message(error))
        return

func _process(_delta: float) -> void:
    if not _client or _client.get_status() == HTTPClient.STATUS_DISCONNECTED:
        if _connected:
            _connected = false
            disconnected.emit()
        return

    _client.poll()

    match _client.get_status():
        HTTPClient.STATUS_CONNECTING:
            pass  # 等待连接
        HTTPClient.STATUS_CONNECTED:
            if not _connected:
                _connected = true
                _send_sse_request()
                connected.emit()
        HTTPClient.STATUS_REQUESTING:
            pass  # 请求已发送，等待响应
        HTTPClient.STATUS_BODY:
            _read_sse_body()
        HTTPClient.STATUS_DISCONNECTED:
            if _connected:
                _connected = false
                disconnected.emit()

func _send_sse_request() -> void:
    var headers := PackedStringArray([
        "Accept: text/event-stream",
        "Cache-Control: no-cache",
        "Connection: keep-alive"
    ])
    var error := _client.request(HTTPClient.METHOD_GET, _event_path, headers)
    if error != OK:
        connection_error.emit("SSE 请求失败")

func _read_sse_body() -> void:
    # 读取可用数据块
    while _client.get_status() == HTTPClient.STATUS_BODY:
        var chunk := _client.read_response_body_chunk()
        if chunk.size() == 0:
            break

        _buffer += chunk.get_string_from_utf8()

        # 解析 SSE 事件 (data: {...}\n\n)
        while "\n\n" in _buffer:
            var idx := _buffer.find("\n\n")
            var sse_line := _buffer.substr(0, idx)
            _buffer = _buffer.substr(idx + 2)

            _parse_sse_line(sse_line)

func _parse_sse_line(line: String) -> void:
    line = line.strip_edges()

    # 只处理 data: 开头的事件
    if not line.begins_with("data: "):
        return

    var json_str := line.substr(6)  # 去掉 "data: " 前缀
    var parsed := JSON.parse_string(json_str) as Dictionary
    if parsed == null:
        return

    var event_type := parsed.get("type", "") as String
    var properties := parsed.get("properties", {}) as Dictionary
    event_received.emit(event_type, properties)

func disconnect_from_sse() -> void:
    if _client:
        _client.close()
    _connected = false
    _buffer = ""

func error_message(error: int) -> String:
    match error:
        ERR_CANT_CONNECT: return "无法连接"
        ERR_CANT_RESOLVE: return "DNS 解析失败"
        ERR_TIMEOUT: return "连接超时"
        _: return "错误码: " + str(error)

# 清理
func _exit_tree() -> void:
    disconnect_from_sse()
```

### 4.2 SSE 事件类型（opencode）

```
server.connected     → {}                                              # 初始连接
server.heartbeat     → {}                                              # 10s 心跳
message.part.delta   → { sessionID, messageID, partID, field, delta } # AI 流式输出
message.part.updated → { sessionID, part }                            # Part 完整更新
message.updated      → { sessionID, info }                            # 消息状态更新
session.status       → { sessionID, status }                          # session 状态变更
permission.asked     → { id, sessionID, permission, patterns }        # AI 请求权限
question.asked       → { id, sessionID, questions }                   # AI 提问
```

---

## 5. RichTextLabel 富文本

> 文档: `classes/class_richtextlabel.html` - Godot 富文本显示控件

**使用场景**: 显示 AI 回复消息（支持 BBCode 格式的文本、代码块、链接等）。

### 5.1 基本属性

```gdscript
# 在 _ready 中设置
@onready var label := %MessageLabel as RichTextLabel

func _ready() -> void:
    label.bbcode_enabled = true    # 启用 BBCode
    label.fit_content = true       # 自适应高度
    label.scroll_active = true     # 启用滚动
    label.selection_enabled = true # 允许选择文本
```

### 5.2 BBCode 标签（Godot 支持的富文本格式）

```gdscript
# 基本样式
"[b]粗体[/b]"
"[i]斜体[/i]"
"[u]下划线[/u]"
"[s]删除线[/s]"
"[color=red]红色文字[/color]"
"[color=#ff8800]橙色文字[/color]"

# 字体大小
"[font_size=18]大号文字[/font_size]"

# 链接
"[url=http://example.com]点击打开链接[/url]"

# 列表
"[ol]有序列表[/ol]"
"[ul]无序列表[/ul]"
"[*]列表项"

# 代码块（使用自定义颜色）
"[color=#e6db74]代码文本[/color]"

# 图片
"[img]res://icon.svg[/img]"
```

### 5.3 追加文本（流式输出）

```gdscript
# ✅ 流式追加（发消息后收到 delta 时调用）
func append_delta(delta_text: String) -> void:
    label.append_text(delta_text)

# ✅ 清理后重新设置
func show_message(text: String) -> void:
    label.text = ""  # 或 label.clear()
    label.append_text(text)

# ✅ 安全添加（避免标签未关闭）
func add_safe_text(text: String) -> void:
    # Godot BBCode 不支持跨 append_text 调用的标签
    # 需要在一个字符串内完成所有标签
    var bbcode := "[b]标题:[/b]\n" + text
    label.append_text(bbcode)
```

### 5.4 代码块格式化

```gdscript
# 将 AI 回复中的代码块转为 BBCode
func format_code_block(language: String, code: String) -> String:
    var lines := code.split("\n")
    var result := ""
    for line in lines:
        result += "[color=#e6db74]" + line.uri_encode() + "[/color]\n"
    return result

# 更好的方式：直接使用纯文本块，设置背景
func wrap_in_code_block(code: String) -> String:
    var bg_color := "#2d2d2d"
    var fg_color := "#f8f8f2"
    return "[bgcolor=" + bg_color + "][color=" + fg_color + "]" \
        + code.replace("\n", "\n") + "[/color][/bgcolor]"
```

### 5.5 滚动到底部

```gdscript
func scroll_to_bottom() -> void:
    # RichTextLabel 继承自 Control
    # 使用 ScrollContainer 包裹时:
    var scroll := %ScrollContainer as ScrollContainer
    scroll.scroll_vertical = int(scroll.get_v_scroll_bar().max_value)
```

### 5.6 注意事项

- `append_text()` 不能跨调用闭合 BBCode 标签
- 设置 `text` 属性会重建所有内容，移除之前 append 的内容
- 推荐用 `append_text()` 追加，需要清空时手动 `text = ""` 再重新 append
- `parse_bbcode(bbc)` = 清空后一次性设置全部内容（相当于 `text = bbc` + `bbcode_enabled`）

---

## 6. UI 布局（Control 节点体系）

> 文档: `tutorials/ui/index.html` (UI 章节) 及 `classes/class_control.html`

### 6.1 容器节点选择

| 节点 | 用途 | 典型使用场景 |
|:----|:----|:-----------|
| `Panel` | 基础背景面板 | 窗口背景、消息气泡 |
| `PanelContainer` | 带主题样式的面板 | 代码块背景 |
| `ScrollContainer` | 可滚动区域 | 消息列表 |
| `VBoxContainer` | 垂直排列 | 消息列表布局 |
| `HBoxContainer` | 水平排列 | 按钮组 |
| `CenterContainer` | 居中 | 加载/错误提示 |
| `MarginContainer` | 边缘留白 | 窗口内边距 |
| `GridContainer` | 网格排列 | 设置面板 |

### 6.2 布局锚点与容器

```gdscript
# 场景树结构建议（opencode 聊天界面）
# MainScene (Node2D)
# └── Panel (全屏背景)
#     └── VBoxContainer (垂直布局)
#         ├── Panel (标题栏)
#         ├── ScrollContainer (消息区域, 水平拉伸)
#         │   └── VBoxContainer (消息列表)
#         │       └── 消息气泡 (Panel > RichTextLabel)
#         ├── Panel (分割线)
#         └── Panel (输入区域)
#             └── HBoxContainer
#                 ├── TextEdit (输入框, 水平拉伸)
#                 └── Button (发送按钮)
```

### 6.3 消息气泡模板

```gdscript
# 创建一个消息气泡节点
func create_message_bubble(text: String, is_user: bool) -> Panel:
    var panel := Panel.new()
    var label := RichTextLabel.new()

    # 设置布局
    panel.size_flags_horizontal = Control.SIZE_EXPAND_FILL
    label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
    label.bbcode_enabled = true
    label.fit_content = true

    # 主题颜色
    if is_user:
        panel.add_theme_stylebox_override("panel", user_bubble_style())
    else:
        panel.add_theme_stylebox_override("panel", ai_bubble_style())

    # 添加内容
    label.append_text(text)
    panel.add_child(label)

    return panel

func user_bubble_style() -> StyleBoxFlat:
    var style := StyleBoxFlat.new()
    style.bg_color = Color("#3d8fcc")     # 蓝色
    style.corner_radius_top_left = 8
    style.corner_radius_top_right = 8
    style.corner_radius_bottom_left = 8
    style.corner_radius_bottom_right = 2
    style.content_margin_left = 12
    style.content_margin_right = 12
    style.content_margin_top = 6
    style.content_margin_bottom = 6
    return style

func ai_bubble_style() -> StyleBoxFlat:
    var style := StyleBoxFlat.new()
    style.bg_color = Color("#3c3c3c")     # 深灰
    style.corner_radius_top_left = 2
    style.corner_radius_top_right = 8
    style.corner_radius_bottom_left = 8
    style.corner_radius_bottom_right = 8
    style.content_margin_left = 12
    style.content_margin_right = 12
    style.content_margin_top = 6
    style.content_margin_bottom = 6
    return style
```

### 6.4 主题系统

```gdscript
# 全局主题设置
func apply_dark_theme() -> void:
    var theme := Theme.new()

    # 默认字体
    var font := ThemeDB.fallback_font
    theme.default_font = font

    # 全局颜色
    var bg_color := Color("#1e1e1e")
    var fg_color := Color("#d4d4d4")
    var accent_color := Color("#3d8fcc")

    # 应用到控件类型
    theme.set_color("font_color", "Label", fg_color)
    theme.set_color("font_color", "RichTextLabel", fg_color)
    theme.set_color("font_color", "Button", accent_color)
    theme.set_stylebox("panel", "Panel", panel_style(bg_color))

    # 应用
    get_tree().root.add_theme_override(theme)
```

### 6.5 动态添加/移除节点

```gdscript
# 添加到消息列表
func add_message_to_list(text: String, is_user: bool) -> void:
    var msg_list := %MessageList as VBoxContainer
    var bubble := create_message_bubble(text, is_user)
    msg_list.add_child(bubble)

    # 延迟一帧滚动到底部
    await get_tree().process_frame
    scroll_to_bottom()

# 清理时移除
func clear_messages() -> void:
    var list := %MessageList as VBoxContainer
    for child in list.get_children():
        child.queue_free()
```

---

## 7. WebSocket 客户端

> 文档: `classes/class_websocketpeer.html`

**使用场景**: 连接 opencode PTY 终端（用于计划外功能，P0 不一定需要）。

```gdscript
extends Node

signal connected()
signal message_received(message: String)
signal disconnected()

var _socket := WebSocketPeer.new()
var url: String = "ws://127.0.0.1:4096/api/pty"

func connect_ws(pty_url: String) -> void:
    url = pty_url
    var error := _socket.connect_to_url(url)
    if error != OK:
        push_error("WebSocket 连接失败")

func _process(_delta: float) -> void:
    _socket.poll()

    match _socket.get_ready_state():
        WebSocketPeer.STATE_OPEN:
            while _socket.get_available_packet_count() > 0:
                var packet := _socket.get_packet()
                message_received.emit(packet.get_string_from_utf8())

        WebSocketPeer.STATE_CLOSING:
            pass

        WebSocketPeer.STATE_CLOSED:
            var code := _socket.get_close_code()
            disconnected.emit()
            _socket = WebSocketPeer.new()

func send_text(text: String) -> void:
    if _socket.get_ready_state() == WebSocketPeer.STATE_OPEN:
        _socket.send_text(text)

func disconnect_ws() -> void:
    _socket.close()
```

---

## 8. Godot 客户端项目参考

### 8.1 opencode Godot 客户端项目结构

```
godot-opencode/
├── project.godot
├── Scenes/
│   ├── Main/MainScene.tscn          # 主场景（窗口管理 + 连接管理）
│   ├── SessionList/SessionList.tscn  # 会话列表
│   ├── Chat/Chat.tscn                # 聊天界面
│   └── Components/
│       ├── MessageBubble.tscn        # 消息气泡
│       └── ConnectionBar.tscn        # 连接状态条
├── Scripts/
│   ├── api.gd                        # HTTP API 封装（REST 请求）
│   ├── sse_client.gd                 # SSE 客户端
│   ├── session_manager.gd            # 会话管理
│   └── config.gd                     # 服务器地址等配置
├── Themes/
│   └── dark_theme.tres               # 主题资源
└── Assets/
    └── icons/                        # UI 图标
```

### 8.2 关键 GDScript API

```gdscript
# 字符串处理
var json_str := JSON.stringify(dict)        # Dictionary → JSON String
var parsed := JSON.parse_string(json_str)   # String → Variant (null if invalid)
var body_text := body.get_string_from_utf8() # PackedByteArray → String

# 节点操作
var node := preload("res://scene.tscn").instantiate() as Control
add_child(node)
node.queue_free()

# 延迟执行
await get_tree().create_timer(1.0).timeout   # 等待1秒

# 信号
user_signal.connect(_on_user_signal, CONNECT_ONE_SHOT)
```

### 8.3 项目设置参考

`project.godot` 关键设置：
```ini
[application]
config/name="Opencode Client"
run/main_scene="res://Scenes/Main/MainScene.tscn"

[display]
window/size/viewport_width=1200
window/size/viewport_height=800
window/size/mode=2              # Windowed
window/dpi/allow_hidpi=true

[gui]
theme/custom="res://Themes/dark_theme.tres"
```

---

## 9. 常见陷阱与最佳实践

### 9.1 节点生命周期
- `_ready()`: 场景树就绪后调用，此时所有 `@onready` 变量已初始化
- `_exit_tree()`: 节点移出场景树时调用，用于断开信号和释放资源
- `queue_free()`: 安全移除节点，当前帧结束后实际释放

### 9.2 字符串处理
- 使用 `String` 类型方法如 `.trim_prefix("data: ")`、`.begins_with("http")`
- `JSON.stringify()` / `JSON.parse_string()` 是核心序列化工具
- PackedByteArray 转 String: `array.get_string_from_utf8()`

### 9.3 性能注意
- 不要频繁设置 `RichTextLabel.text`（重建全量内容），用 `append_text()`
- 大量子节点用 `VBoxContainer` 时考虑虚拟滚动
- `ScrollContainer` 内含大量子节点时设置 `clip_contents=true`

### 9.4 调试
```gdscript
print("调试信息: ", variable)       # 输出到 Output 面板
push_error("错误信息")              # 红色错误（方便在 Output 中定位）
push_warning("警告信息")            # 黄色警告
```

---

> 参考: Godot 4.6 官方文档（本地路径: `E:\fkyah3\project\Frankenstein-of-The-Babel-fkyah3\external\godot-docs-html-stable\`）
