## WorldEnvironment（世界环境） <- Node（节点）

WorldEnvironment 节点用于配置场景的默认环境。WorldEnvironment 中定义的参数可以被当前 Camera3D 上设置的 Environment 节点覆盖。此外，每帧场景中只能同时实例化一个 WorldEnvironment。WorldEnvironment 允许用户指定默认光照参数（如环境光）、各种后处理效果（如 SSAO、DOF、色调映射）以及如何绘制背景（如纯色、天空盒）。通常，添加这些是为了改善场景的真实感/色彩平衡。

**属性（Props）：**
- camera_attributes: CameraAttributes —— 摄像机属性
- compositor: Compositor —— 合成器
- environment: Environment —— 环境
