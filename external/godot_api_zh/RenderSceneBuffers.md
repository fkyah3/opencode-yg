## RenderSceneBuffers（渲染场景缓冲） <- RefCounted（引用计数）

抽象场景缓冲对象，为每个进行 3D 渲染的视口创建。它管理渲染过程中使用的任何额外缓冲区，并在视口调整大小时丢弃缓冲区。另请参阅 RenderSceneBuffersRD。**注意：** 这是一个内部渲染服务器对象。请勿从脚本实例化此类。

**方法（Methods）：**
- configure(config: RenderSceneBuffersConfiguration) —— 配置
