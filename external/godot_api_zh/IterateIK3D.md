## IterateIK3D <- ChainIK3D（链式IK3D）

SkeletonModifier3D 的基类，通过重复小旋转来接近目标。每个骨骼链（设置）有一个效应器，按照设置列表的顺序处理。您可以为每个关节设置一些限制。

**属性（Props）：**
- angular_delta_limit: float = 0.034906585
- deterministic: bool = false
- max_iterations: int = 4
- min_distance: float = 0.001
- setting_count: int = 0

**方法（Methods）：**
- get_joint_limitation(index: int, joint: int) -> JointLimitation3D
- get_joint_limitation_right_axis(index: int, joint: int) -> int
- get_joint_limitation_right_axis_vector(index: int, joint: int) -> Vector3
- get_joint_limitation_rotation_offset(index: int, joint: int) -> Quaternion
- get_joint_rotation_axis(index: int, joint: int) -> int
- get_joint_rotation_axis_vector(index: int, joint: int) -> Vector3
- get_target_node(index: int) -> NodePath
- set_joint_limitation(index: int, joint: int, limitation: JointLimitation3D)
- set_joint_limitation_right_axis(index: int, joint: int, direction: int)
- set_joint_limitation_right_axis_vector(index: int, joint: int, vector: Vector3)
- set_joint_limitation_rotation_offset(index: int, joint: int, offset: Quaternion)
- set_joint_rotation_axis(index: int, joint: int, axis: int)
- set_joint_rotation_axis_vector(index: int, joint: int, axis_vector: Vector3)
- set_target_node(index: int, target_node: NodePath)
