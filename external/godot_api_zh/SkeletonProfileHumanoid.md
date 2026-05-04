## SkeletonProfileHumanoid（人体骨骼配置文件）<- SkeletonProfile（骨骼配置文件）

针对人体形态优化的预设 SkeletonProfile。此配置用于标准化，因此所有参数均为只读。人体骨骼配置文件包含 56 块骨骼，分为 4 组：`"Body"`（身体）、`"Face"`（面部）、`"LeftHand"`（左手）和`"RightHand"`（右手）。其结构如下：Root └─ Hips ├─ LeftUpperLeg │ └─ LeftLowerLeg │ └─ LeftFoot │ └─ LeftToes ├─ RightUpperLeg │ └─ RightLowerLeg │ └─ RightFoot │ └─ RightToes └─ Spine └─ Chest └─ UpperChest ├─ Neck │ └─ Head │ ├─ Jaw │ ├─ LeftEye │ └─ RightEye ├─ LeftShoulder │ └─ LeftUpperArm │ └─ LeftLowerArm │ └─ LeftHand │ ├─ LeftThumbMetacarpal │ │ └─ LeftThumbProximal │ │ └─ LeftThumbDistal │ ├─ LeftIndexProximal │ │ └─ LeftIndexIntermediate │ │ └─ LeftIndexDistal │ ├─ LeftMiddleProximal │ │ └─ LeftMiddleIntermediate │ │ └─ LeftMiddleDistal │ ├─ LeftRingProximal │ │ └─ LeftRingIntermediate │ │ └─ LeftRingDistal │ └─ LeftLittleProximal │ └─ LeftLittleIntermediate │ └─ LeftLittleDistal └─ RightShoulder └─ RightUpperArm └─ RightLowerArm └─ RightHand ├─ RightThumbMetacarpal │ └─ RightThumbProximal │ └─ RightThumbDistal ├─ RightIndexProximal │ └─ RightIndexIntermediate │ └─ RightIndexDistal ├─ RightMiddleProximal │ └─ RightMiddleIntermediate │ └─ RightMiddleDistal ├─ RightRingProximal │ └─ RightRingIntermediate │ └─ RightRingDistal └─ RightLittleProximal └─ RightLittleIntermediate └─ RightLittleDistal

**属性（Props）：**
- bone_size: int = 56 —— 骨骼数量
- group_size: int = 4 —— 组数量
- root_bone: StringName = &"Root" —— 根骨骼
- scale_base_bone: StringName = &"Hips" —— 缩放基准骨骼
