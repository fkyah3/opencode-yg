## RDShaderSource（RD着色器源码） <- RefCounted（引用计数）

文本形式的着色器源代码。另请参见 RDShaderFile。RDShaderSource 仅用于与 RenderingDevice API 一起使用。不应与 Godot 自己的 Shader 资源混淆，后者是 Godot 的各种节点用于高级着色器编程的资源。

**属性（Props）：**
- language: int (RenderingDevice.ShaderLanguage) = 0 —— 语言
- source_any_hit: String = "" —— 任意命中着色器源码
- source_closest_hit: String = "" —— 最近命中着色器源码
- source_compute: String = "" —— 计算着色器源码
- source_fragment: String = "" —— 片段着色器源码
- source_intersection: String = "" —— 交集着色器源码
- source_miss: String = "" —— 未命中着色器源码
- source_raygen: String = "" —— 光线生成着色器源码
- source_tesselation_control: String = "" —— 曲面细分控制着色器源码
- source_tesselation_evaluation: String = "" —— 曲面细分评估着色器源码
- source_vertex: String = "" —— 顶点着色器源码

**方法（Methods）：**
- get_stage_source(stage: int) -> String —— 获取阶段源码
- set_stage_source(stage: int, source: String) —— 设置阶段源码
