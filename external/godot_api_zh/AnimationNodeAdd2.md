## AnimationNodeAdd2（动画节点相加2） <- AnimationNodeSync（动画节点同步）

添加到 AnimationNodeBlendTree 的资源。基于 amount 值将两个动画进行叠加混合。如果 amount 大于 `1.0`，连接到"in"端口的动画将与连接到"add"端口的增强动画混合。如果 amount 小于 `0.0`，连接到"in"端口的动画将与连接到"add"端口的反向动画混合。
