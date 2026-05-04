## Sprite2D（精灵2D）<- Node2D（节点2D）

显示 2D 纹理的节点。显示的纹理可以是较大图集纹理中的一个区域，也可以是精灵表动画中的一帧。

**属性（Props）：**
- centered: bool = true —— 居中
- flip_h: bool = false —— 水平翻转
- flip_v: bool = false —— 垂直翻转
- frame: int = 0 —— 帧
- frame_coords: Vector2i = Vector2i(0, 0) —— 帧坐标
- hframes: int = 1 —— 水平帧数
- offset: Vector2 = Vector2(0, 0) —— 偏移
- region_enabled: bool = false —— 启用区域
- region_filter_clip_enabled: bool = false —— 启用区域过滤裁剪
- region_rect: Rect2 = Rect2(0, 0, 0, 0) —— 区域矩形
- texture: Texture2D —— 纹理
- vframes: int = 1 —— 垂直帧数

**方法（Methods）：**
- get_rect() -> Rect2 —— 获取矩形
- is_pixel_opaque(pos: Vector2) -> bool —— 像素是否不透明

**信号（Signals）：**
- frame_changed —— 帧已更改
- texture_changed —— 纹理已更改
