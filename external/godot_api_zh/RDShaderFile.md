## RDShaderFile（RD着色器文件） <- Resource（资源）

SPIR-V 形式的编译后着色器文件。另见 RDShaderSource。RDShaderFile 仅用于 RenderingDevice API。不应将其与 Godot 自身的 Shader 资源混淆，后者是 Godot 的各种节点用于高级着色器编程的资源。

**Props（属性）：**
- base_error: String = "" —— 基础错误信息

**Methods（方法）：**
- get_spirv(version: StringName = &"") -> RDShaderSPIRV —— 获取 SPIR-V
- get_version_list() -> StringName[] —— 获取版本列表
- set_bytecode(bytecode: RDShaderSPIRV, version: StringName = &"") —— 设置字节码
