## StaticBody3D（静态体3D）<- PhysicsBody3D（物理体3D）

静态 3D 物理体。它不能被外力或接触移动，但可以通过其他方式手动移动，例如代码、AnimationMixers（将 `AnimationMixer.callback_mode_process` 设置为 `AnimationMixer.ANIMATION_CALLBACK_MODE_PROCESS_PHYSICS`）和 RemoteTransform3D。移动 StaticBody3D 时，它会直接传送到新位置，不会影响路径上的其他物理体。如果不需要此行为，请改用 AnimatableBody3D。StaticBody3D 适用于完全静态的对象，如地板和墙壁，以及移动表面，如传送带和圆形旋转平台（通过使用 `constant_linear_velocity` 和 `constant_angular_velocity`）。

**属性（Props）：**
- constant_angular_velocity: Vector3 = Vector3(0, 0, 0) —— 恒定角速度
- constant_linear_velocity: Vector3 = Vector3(0, 0, 0) —— 恒定线速度
- physics_material_override: PhysicsMaterial —— 物理材质覆盖
