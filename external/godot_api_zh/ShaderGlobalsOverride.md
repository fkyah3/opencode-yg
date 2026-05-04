## ShaderGlobalsOverride（着色器全局变量覆盖）<- Node（节点）

类似于 WorldEnvironment 节点可用于在加载特定场景时覆盖环境，ShaderGlobalsOverride 可用于临时覆盖全局着色器参数。节点被移除后，全局着色器参数的项目范围值将被恢复。有关更多信息，请参见 RenderingServer 的 `global_shader_parameter_*` 方法。**注意：** 每个场景只能使用一个 ShaderGlobalsOverride。如果场景树中有多个 ShaderGlobalsOverride 节点，只有第一个节点（按树顺序）生效。**注意：** 所有 ShaderGlobalsOverride 节点在添加到场景树时会被加入 `"shader_overrides_group"` 组。当前激活的 ShaderGlobalsOverride 节点还会被添加一个 `"shader_overrides_group_active"` 组。你可以使用此组检查哪个 ShaderGlobalsOverride 节点当前处于激活状态。
