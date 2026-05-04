## VideoStreamPlayer（视频流播放器） <- Control（控件）

用于播放 VideoStream 资源的控件。支持的视频格式为 `.ogv`（VideoStreamTheora）和通过 GDExtension 插件公开的任何格式。**警告：** 在 Web 上，由于缺少特定于架构的汇编优化，视频播放性能会较差。

**属性（Props）：**
- audio_track: int = 0 —— 音频轨道
- autoplay: bool = false —— 自动播放
- buffering_msec: int = 500 —— 缓冲毫秒数
- bus: StringName = &"Master" —— 音频总线
- expand: bool = false —— 扩展
- loop: bool = false —— 循环
- paused: bool = false —— 暂停
- speed_scale: float = 1.0 —— 速度缩放
- stream: VideoStream —— 视频流
- stream_position: float —— 流位置
- volume: float —— 音量
- volume_db: float = 0.0 —— 音量分贝

**方法（Methods）：**
- get_stream_length() -> float —— 获取流长度
- get_stream_name() -> String —— 获取流名称
- get_video_texture() -> Texture2D —— 获取视频纹理
- is_playing() -> bool —— 是否正在播放
- play() —— 播放
- stop() —— 停止

**信号（Signals）：**
- finished —— 播放完成
