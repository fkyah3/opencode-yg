## AnimationNodeExtension（动画节点扩展） <- AnimationNode（动画节点）

AnimationNodeExtension 公开了 AnimationRootNode 的 API，允许用户从 GDScript、C# 或 C++ 进行扩展。此类不能直接使用，而是由其他类扩展。它用于为 AnimationTree 系统创建自定义节点。

**方法（Methods）：**
- get_remaining_time(node_info: PackedFloat32Array, break_loop: bool) -> float —— 获取剩余时间
- is_looping(node_info: PackedFloat32Array) -> bool —— 是否循环
