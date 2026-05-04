## Sprite3D（精灵3D） <- SpriteBase3D（精灵基础3D）

一个在 3D 环境中显示 2D 纹理的节点。显示的纹理可以是更大图集纹理中的一个区域，也可以是精灵表单动画中的一帧。另见 SpriteBase3D，其中定义了公告板模式等属性。

**Props（属性）：**
- frame: int = 0 —— 帧编号
- frame_coords: Vector2i = Vector2i(0, 0) —— 帧坐标
- hframes: int = 1 —— 水平帧数
- region_enabled: bool = false —— 是否启用区域
- region_rect: Rect2 = Rect2(0, 0, 0, 0) —— 区域矩形
- texture: Texture2D —— 纹理
- vframes: int = 1 —— 垂直帧数

**Signals（信号）：**
- frame_changed —— 帧已更改
- texture_changed —— 纹理已更改
