## LookAtModifier3D <- SkeletonModifier3D（骨架修改器3D）

此 SkeletonModifier3D 旋转骨骼以看向目标。这对于移动角色头部看向玩家、旋转炮塔瞄准目标，或任何其他需要让骨骼快速轻松地朝向某个物体的场景非常有用。当应用多个 LookAtModifier3D 时，分配给父骨骼的 LookAtModifier3D 必须放在列表中分配给子骨骼的 LookAtModifier3D 之上，这样子骨骼的结果才能正确。

**属性（Props）：**
- bone: int = -1
- bone_name: String = ""
- duration: float = 0.0
- ease_type: int (Tween.EaseType) = 0
- forward_axis: int (SkeletonModifier3D.BoneAxis) = 4
- origin_bone: int
- origin_bone_name: String
- origin_external_node: NodePath
- origin_from: int (LookAtModifier3D.OriginFrom) = 0
- origin_offset: Vector3 = Vector3(0, 0, 0)
- origin_safe_margin: float = 0.1
- primary_damp_threshold: float
- primary_limit_angle: float
- primary_negative_damp_threshold: float
- primary_negative_limit_angle: float
- primary_positive_damp_threshold: float
- primary_positive_limit_angle: float
- primary_rotation_axis: int (Vector3.Axis) = 1
- relative: bool = false
- secondary_damp_threshold: float
- secondary_limit_angle: float
- secondary_negative_damp_threshold: float
- secondary_negative_limit_angle: float
- secondary_positive_damp_threshold: float
- secondary_positive_limit_angle: float
- symmetry_limitation: bool
- target_node: NodePath = NodePath("")
- transition_type: int (Tween.TransitionType) = 0
- use_angle_limitation: bool = false
- use_secondary_rotation: bool = true

**方法（Methods）：**
- get_interpolation_remaining() -> float
- is_interpolating() -> bool
- is_target_within_limitation() -> bool

**枚举（Enums）：**
**OriginFrom：** ORIGIN_FROM_SELF=0, ORIGIN_FROM_SPECIFIC_BONE=1, ORIGIN_FROM_EXTERNAL_NODE=2
