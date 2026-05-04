## AnimationNodeSub2（动画节点减法混合2） <- AnimationNodeSync（动画节点同步）

添加到 AnimationNodeBlendTree 的资源。基于数量值以减法方式混合两个动画。此动画节点通常用于预计算，以消除动画中的额外姿态，作为 AnimationNodeAdd2 或 AnimationNodeAdd3 中"加法"动画源的输入。一般来说，混合值应在 `[0.0, 1.0]` 范围内，但此范围之外的值可用于放大或反转动画。**注意：** 此计算与在 AnimationNodeAdd2 中使用负值不同，因为变换矩阵不满足交换律。AnimationNodeSub2 从左侧乘以反向动画的变换矩阵，而负的 AnimationNodeAdd2 从右侧乘以。
