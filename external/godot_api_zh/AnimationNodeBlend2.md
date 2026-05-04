## AnimationNodeBlend2（动画混合节点2） <- AnimationNodeSync（动画同步节点）

添加到 AnimationNodeBlendTree 的资源。根据 amount 值对两个动画进行线性混合。通常混合值应在 `[0.0, 1.0]` 范围内。超出此范围的值可以产生放大或反向的动画混合，但对于此目的，AnimationNodeAdd2 效果更好。
