## AnimatedTexture（动画纹理）<- Texture2D

AnimatedTexture 是一种用于基于帧的动画的资源格式，其中多张纹理可以按每帧预定义的延迟自动串联播放。与 AnimationPlayer 或 AnimatedSprite2D 不同，它不是节点，但优势在于任何可以使用 Texture2D 资源的地方都可以使用它，例如在 TileSet 中。动画的播放由 `speed_scale` 属性以及每帧的时长控制（参见 `set_frame_duration`）。动画支持循环播放，即在播放完最后一帧后自动从第 0 帧重新开始。AnimatedTexture 当前要求所有帧纹理具有相同大小，否则较大的纹理将被裁剪以匹配最小的纹理。**注意：** AnimatedTexture 不支持使用 AtlasTexture。每帧需要是单独的 Texture2D。**警告：** 当前实现在现代渲染器中效率不高。

**属性（Props）：**
- current_frame: int
- frames: int = 1
- one_shot: bool = false
- pause: bool = false
- resource_local_to_scene: bool = false
- speed_scale: float = 1.0

**方法（Methods）：**
- get_frame_duration(frame: int) -> float
- get_frame_texture(frame: int) -> Texture2D
- set_frame_duration(frame: int, duration: float)
- set_frame_texture(frame: int, texture: Texture2D)

**枚举（Enums）：**
**常量（Constants）：** MAX_FRAMES=256
