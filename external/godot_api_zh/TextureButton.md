## TextureButton（纹理按钮）<- BaseButton（基础按钮）

TextureButton 具有与 Button 相同的功能，但它使用精灵而不是 Godot 的 Theme 资源。它创建更快，但不像更复杂的 Control 那样支持本地化。另请参阅 BaseButton，其中包含与此节点关联的公共属性和方法。**注意：** 建议为"normal"状态设置纹理（`texture_normal`）。如果未设置 `texture_normal`，TextureButton 仍会接收输入事件并可点击，但用户无法看到它，除非他们激活了其他已分配纹理的状态（例如，悬停显示 `texture_hover`）。

**属性（Props）：**
- flip_h: bool = false —— 水平翻转
- flip_v: bool = false —— 垂直翻转
- ignore_texture_size: bool = false —— 忽略纹理尺寸
- stretch_mode: int (TextureButton.StretchMode) = 2 —— 拉伸模式
- texture_click_mask: BitMap —— 点击遮罩纹理
- texture_disabled: Texture2D —— 禁用状态纹理
- texture_focused: Texture2D —— 聚焦状态纹理
- texture_hover: Texture2D —— 悬停状态纹理
- texture_normal: Texture2D —— 正常状态纹理
- texture_pressed: Texture2D —— 按下状态纹理

**枚举（Enums）：**
**StretchMode（拉伸模式）：** STRETCH_SCALE=0（缩放），STRETCH_TILE=1（平铺），STRETCH_KEEP=2（保持），STRETCH_KEEP_CENTERED=3（保持居中），STRETCH_KEEP_ASPECT=4（保持宽高比），STRETCH_KEEP_ASPECT_CENTERED=5（保持宽高比居中），STRETCH_KEEP_ASPECT_COVERED=6（保持宽高比覆盖）
