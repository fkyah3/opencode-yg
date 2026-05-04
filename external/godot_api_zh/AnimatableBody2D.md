## AnimatableBody2D（可动画刚体2D）<- StaticBody2D（静态刚体2D）

一个可动画的 2D 物理刚体。它不能由外力或接触推动，但可以通过其他方式手动移动，例如代码、AnimationMixers（需将 `AnimationMixer.callback_mode_process` 设置为 `AnimationMixer.ANIMATION_CALLBACK_MODE_PROCESS_PHYSICS`）和 RemoteTransform2D。当 AnimatableBody2D 移动时，其线速度和角速度会被估算并用于影响路径上的其他物理刚体。这使得它非常适合用于移动平台、门和其他移动物体。

**属性（Props）：**
- sync_to_physics: bool = true —— 同步到物理
