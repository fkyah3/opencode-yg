## RenderSceneData（渲染场景数据） <- Object（对象）

抽象的场景数据对象，在渲染单个视口的期间存在。另见 RenderSceneDataRD、RenderData 和 RenderDataRD。**注意：** 这是一个内部渲染服务器对象。请勿从脚本实例化此类。

**Methods（方法）：**
- get_cam_projection() -> Projection —— 获取相机投影矩阵
- get_cam_transform() -> Transform3D —— 获取相机变换
- get_uniform_buffer() -> RID —— 获取统一缓冲区
- get_view_count() -> int —— 获取视图数量
- get_view_eye_offset(view: int) -> Vector3 —— 获取视图的眼部偏移
- get_view_projection(view: int) -> Projection —— 获取视图投影矩阵
