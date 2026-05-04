## SkeletonModificationStack2D（骨架修改栈2D）<- Resource（资源）

此资源由骨架使用，保存一组 SkeletonModification2D。它控制修改的顺序及其应用方式。修改顺序对于全身 IK 设置尤为重要，因为需要按正确的顺序执行修改才能获得期望的结果。例如，在人体骨架中，需要在手臂*之前*对脊柱执行修改。此资源还控制所有修改对 Skeleton2D 的应用强度。

**属性（Props）：**
- enabled: bool = false —— 启用
- modification_count: int = 0 —— 修改数量
- strength: float = 1.0 —— 强度

**方法（Methods）：**
- add_modification(modification: SkeletonModification2D) —— 添加修改
- delete_modification(mod_idx: int) —— 删除修改
- enable_all_modifications(enabled: bool) —— 启用所有修改
- execute(delta: float, execution_mode: int) —— 执行
- get_is_setup() -> bool —— 是否已设置
- get_modification(mod_idx: int) -> SkeletonModification2D —— 获取修改
- get_skeleton() -> Skeleton2D —— 获取骨架
- set_modification(mod_idx: int, modification: SkeletonModification2D) —— 设置修改
- setup() —— 设置
