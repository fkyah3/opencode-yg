## RemoteTransform3D（远程变换3D） <- Node3D（节点3D）

RemoteTransform3D 将其自身的 Transform3D 推送到场景中另一个继承自 Node3D 的节点（称为远程节点）。可以设置为更新另一个节点的位置、旋转和/或缩放。可以使用全局或局部坐标。

**Props（属性）：**
- remote_path: NodePath = NodePath("") —— 远程节点路径
- update_position: bool = true —— 是否更新位置
- update_rotation: bool = true —— 是否更新旋转
- update_scale: bool = true —— 是否更新缩放
- use_global_coordinates: bool = true —— 是否使用全局坐标

**Methods（方法）：**
- force_update_cache() —— 强制更新缓存
