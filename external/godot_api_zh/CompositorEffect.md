## CompositorEffect（合成器效果）<- Resource（资源）

此资源定义了一个自定义渲染效果，可以通过视口的环境应用于视口。你可以实现一个回调，该回调在渲染过程中的给定阶段被调用，并允许你插入额外的通道。注意，此回调发生在渲染线程上。CompositorEffect 是一个抽象基类，必须扩展以实现特定的渲染逻辑。

**属性（Props）：**
- access_resolved_color: bool —— 访问已解析的颜色
- access_resolved_depth: bool —— 访问已解析的深度
- effect_callback_type: int (CompositorEffect.EffectCallbackType) —— 效果回调类型
- enabled: bool —— 启用
- needs_motion_vectors: bool —— 需要运动向量
- needs_normal_roughness: bool —— 需要法线粗糙度
- needs_separate_specular: bool —— 需要分离的镜面

**枚举（Enums）：**
**EffectCallbackType（效果回调类型）：** EFFECT_CALLBACK_TYPE_PRE_OPAQUE=0 —— 不透明前，EFFECT_CALLBACK_TYPE_POST_OPAQUE=1 —— 不透明后，EFFECT_CALLBACK_TYPE_POST_SKY=2 —— 天空后，EFFECT_CALLBACK_TYPE_PRE_TRANSPARENT=3 —— 透明前，EFFECT_CALLBACK_TYPE_POST_TRANSPARENT=4 —— 透明后，EFFECT_CALLBACK_TYPE_MAX=5
