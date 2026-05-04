## CameraTexture（相机纹理） <- Texture2D（2D纹理）

此纹理提供对 CameraFeed 所提供相机纹理的访问。**注意：** 许多相机提供 YCbCr 图像，需要在着色器中进行转换。

**属性（Props）：**
- camera_feed_id: int = 0 —— 相机源ID
- camera_is_active: bool = false —— 相机是否激活
- resource_local_to_scene: bool = false —— 资源是否局部于场景
- which_feed: int (CameraServer.FeedImage) = 0 —— 使用的相机源类型
