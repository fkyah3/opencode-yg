## RDPipelineSpecializationConstant（RD管线特化常量） <- RefCounted（引用计数）

*特化常量*是一种在不实际增加已编译着色器版本数量的情况下创建额外着色器变体的方式。这通过减少着色器版本数量和减少`if`分支来提高性能，同时仍然允许着色器适应不同用例。此对象由 RenderingDevice 使用。

**Props（属性）：**
- constant_id: int = 0 —— 常量ID
- value: Variant —— 值
