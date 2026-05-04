## AnimationRootNode（动画根节点） <- AnimationNode（动画节点）

AnimationRootNode 是 AnimationNode 的基类，用于持有完整的动画。完整的动画指的是 AnimationNodeBlendTree 中 AnimationNodeOutput 的输出，或其他 AnimationRootNode 的输出。用于 `AnimationTree.tree_root` 或其他 AnimationRootNode 中。内置根节点的示例包括 AnimationNodeBlendTree（允许使用多种模式在节点之间混合）、AnimationNodeStateMachine（允许使用状态机模式在节点之间配置混合和过渡）、AnimationNodeBlendSpace2D（允许在**三个** AnimationNode 之间进行线性混合）、AnimationNodeBlendSpace1D（仅允许在**两个** AnimationNode 之间进行线性混合）。
