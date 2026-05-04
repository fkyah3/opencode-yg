## VisualShaderNodeParticleEmit（可视化着色器节点粒子发射） <- VisualShaderNode（可视化着色器节点）

此节点内部调用 `emit_subparticle` 着色器方法。它将从配置的子发射器中发射一个粒子，并允许自定义其发射方式。需要使用此着色器的粒子节点上已分配子发射器。

**Props（属性）：**
- flags: int (VisualShaderNodeParticleEmit.EmitFlags) = 31 —— 标志

**Enums（枚举）：**
**EmitFlags（发射标志）：** EMIT_FLAG_POSITION=1 —— 位置，EMIT_FLAG_ROT_SCALE=2 —— 旋转缩放，EMIT_FLAG_VELOCITY=4 —— 速度，EMIT_FLAG_COLOR=8 —— 颜色，EMIT_FLAG_CUSTOM=16 —— 自定义
