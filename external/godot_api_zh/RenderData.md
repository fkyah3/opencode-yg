## RenderData（渲染数据） <- Object（对象）

抽象渲染数据对象，在渲染单个视口的期间存在。另请参阅 RenderDataRD、RenderSceneData 和 RenderSceneDataRD。**注意：** 这是一个内部渲染服务器对象。请勿从脚本实例化此类。

**方法（Methods）：**
- get_camera_attributes() -> RID —— 获取摄像机属性
- get_environment() -> RID —— 获取环境
- get_render_scene_buffers() -> RenderSceneBuffers —— 获取渲染场景缓冲
- get_render_scene_data() -> RenderSceneData —— 获取渲染场景数据
