## SkeletonModification2DStackHolder（骨架修改2D栈持有者）<- SkeletonModification2D（骨架修改2D）

此 SkeletonModification2D 持有对 SkeletonModificationStack2D 的引用，允许你在单个 Skeleton2D 上使用多个修改栈。**注意：** 所持有的 SkeletonModificationStack2D 中的修改仅在它们的执行模式与 SkeletonModification2DStackHolder 的执行模式匹配时才会被执行。

**方法（Methods）：**
- get_held_modification_stack() -> SkeletonModificationStack2D —— 获取持有的修改栈
- set_held_modification_stack(held_modification_stack: SkeletonModificationStack2D) —— 设置持有的修改栈
