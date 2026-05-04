## AnimatedSprite3D（动画精灵3D）<- SpriteBase3D

AnimatedSprite3D 与 Sprite3D 节点类似，区别在于它携带多张纹理作为动画 `sprite_frames`。动画通过 SpriteFrames 资源创建，允许导入图像文件（或包含这些文件的文件夹）来为精灵提供动画帧。SpriteFrames 资源可以在编辑器中通过 SpriteFrames 底部面板进行配置。

**属性（Props）：**
- animation: StringName = &"default"
- autoplay: String = ""
- frame: int = 0
- frame_progress: float = 0.0
- speed_scale: float = 1.0
- sprite_frames: SpriteFrames

**方法（Methods）：**
- get_playing_speed() -> float
- is_playing() -> bool
- pause()
- play(name: StringName = &"", custom_speed: float = 1.0, from_end: bool = false)
- play_backwards(name: StringName = &"")
- set_frame_and_progress(frame: int, progress: float)
- stop()

**信号（Signals）：**
- animation_changed
- animation_finished
- animation_looped
- frame_changed
- sprite_frames_changed
