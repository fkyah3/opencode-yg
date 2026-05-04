## AnimationNodeBlend3（动画节点混合3）<- AnimationNodeSync（动画节点同步）

添加到 AnimationNodeBlendTree 的资源。基于 amount 值从三个输入中线性混合两个动画。此动画节点有三个输入：- 要混合的基础动画 - 当混合量为负时使用的 "-blend" 动画 - 当混合量为正时使用的 "+blend" 动画。通常，混合值应在 `[-1.0, 1.0]` 范围内。超出此范围的值可以混合放大后的动画，但 AnimationNodeAdd3 更适合此用途。
