## CameraFeed（摄像机馈送）<- RefCounted（引用计数）

摄像机馈送让你可以访问设备上连接的单个物理摄像机。启用后，Godot 将开始从摄像机捕获帧，然后可以使用这些帧。另请参见 CameraServer。**注意：** 许多摄像机将返回 YCbCr 图像，这些图像被分割成两个纹理，需要在着色器中组合。如果你将环境设置为在背景中显示摄像机图像，Godot 会自动为你执行此操作。**注意：** 此类目前仅在 Linux、Android、macOS 和 iOS 上实现。在其他平台上将没有可用的 CameraFeed。要在 iOS 上获取 CameraFeed，需要来自的摄像机插件。

**属性（Props）：**
- feed_is_active: bool = false —— 馈送是否活动
- feed_transform: Transform2D = Transform2D(1, 0, 0, -1, 0, 1) —— 馈送变换
- formats: Array = [] —— 格式

**方法（Methods）：**
- get_datatype() -> int —— 获取数据类型
- get_id() -> int —— 获取 ID
- get_name() -> String —— 获取名称
- get_position() -> int —— 获取位置
- get_texture_tex_id(feed_image_type: int) -> int —— 获取纹理 ID
- set_external(width: int, height: int) —— 设置外部
- set_format(index: int, parameters: Dictionary) -> bool —— 设置格式
- set_name(name: String) —— 设置名称
- set_position(position: int) —— 设置位置
- set_rgb_image(rgb_image: Image) —— 设置 RGB 图像
- set_ycbcr_image(ycbcr_image: Image) —— 设置 YCbCr 图像
- set_ycbcr_images(y_image: Image, cbcr_image: Image) —— 设置 YCbCr 双图像

**信号（Signals）：**
- format_changed —— 格式已更改
- frame_changed —— 帧已更改

**枚举（Enums）：**
**FeedDataType（馈送数据类型）：** FEED_NOIMAGE=0 —— 无图像，FEED_RGB=1 —— RGB，FEED_YCBCR=2 —— YCbCr，FEED_YCBCR_SEP=3 —— 分离 YCbCr，FEED_EXTERNAL=4 —— 外部
**FeedPosition（馈送位置）：** FEED_UNSPECIFIED=0 —— 未指定，FEED_FRONT=1 —— 前置，FEED_BACK=2 —— 后置
