## BoneConstraint3D（骨骼约束3D）<- SkeletonModifier3D

SkeletonModifier3D 的基类，根据 `get_reference_bone` 获取的骨骼变换修改 `set_apply_bone` 中设置的骨骼。

**方法（Methods）：**
- clear_setting()
- get_amount(index: int) -> float
- get_apply_bone(index: int) -> int
- get_apply_bone_name(index: int) -> String
- get_reference_bone(index: int) -> int
- get_reference_bone_name(index: int) -> String
- get_reference_node(index: int) -> NodePath
- get_reference_type(index: int) -> int
- get_setting_count() -> int
- set_amount(index: int, amount: float)
- set_apply_bone(index: int, bone: int)
- set_apply_bone_name(index: int, bone_name: String)
- set_reference_bone(index: int, bone: int)
- set_reference_bone_name(index: int, bone_name: String)
- set_reference_node(index: int, node: NodePath)
- set_reference_type(index: int, type: int)
- set_setting_count(count: int)

**枚举（Enums）：**
**ReferenceType（引用类型）：** REFERENCE_TYPE_BONE=0, REFERENCE_TYPE_NODE=1
