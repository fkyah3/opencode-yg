## AnimationNodeAdd3（动画节点加法3）<- AnimationNodeSync（动画节点同步）

添加到 AnimationNodeBlendTree 的资源。基于 amount 值从三个输入中加法混合两个动画。此动画节点有三个输入：- 要加法混合的基础动画 - 当混合量为负时使用的 "-add" 动画 - 当混合量为正时使用的 "+add" 动画。如果 amount 的绝对值大于 `1.0`，则连接到 "in" 端口的动画将与 "-add"/"+add" 端口的放大动画进行混合。
