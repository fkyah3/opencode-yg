## RID

RID 变体类型用于通过唯一 ID 访问底层资源。RID 是不透明的，这意味着它们本身不提供对资源的访问。它们由底层服务器类使用，例如 DisplayServer、RenderingServer、TextServer 等。底层资源可能对应高级资源，如 Texture 或 Mesh。**注意：** RID 仅在当前会话中有用。如果通过网络发送或稍后从文件加载，它不会对应到类似的资源。**注意：** 在布尔上下文中，如果 RID 的 ID 为无效的 `0`，则求值为 `false`。否则，RID 始终求值为 `true`。这相当于调用 `is_valid`。

**方法（Methods）：**
- get_id() -> int —— 获取 ID
- is_valid() -> bool —— 是否有效
