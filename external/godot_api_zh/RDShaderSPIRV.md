## RDShaderSPIRV（渲染设备着色器SPIR-V） <- Resource（资源）

RDShaderSPIRV 表示 RDShaderFile 在各个着色器阶段的代码，以及可能的编译错误消息。SPIR-V 是一种低级中间着色器表示形式。这种中间表示形式不直接用于 GPU 渲染，但可以编译为 GPU 能理解的二进制着色器。与已编译的着色器不同，SPIR-V 可跨 GPU 型号和驱动版本移植。此对象由 RenderingDevice 使用。

**属性（Props）：**
- bytecode_any_hit: PackedByteArray = PackedByteArray() —— 任意命中字节码
- bytecode_closest_hit: PackedByteArray = PackedByteArray() —— 最近命中字节码
- bytecode_compute: PackedByteArray = PackedByteArray() —— 计算字节码
- bytecode_fragment: PackedByteArray = PackedByteArray() —— 片元字节码
- bytecode_intersection: PackedByteArray = PackedByteArray() —— 相交字节码
- bytecode_miss: PackedByteArray = PackedByteArray() —— 未命中字节码
- bytecode_raygen: PackedByteArray = PackedByteArray() —— 光线生成字节码
- bytecode_tesselation_control: PackedByteArray = PackedByteArray() —— 曲面细分控制字节码
- bytecode_tesselation_evaluation: PackedByteArray = PackedByteArray() —— 曲面细分评估字节码
- bytecode_vertex: PackedByteArray = PackedByteArray() —— 顶点字节码
- compile_error_any_hit: String = "" —— 任意命中编译错误
- compile_error_closest_hit: String = "" —— 最近命中编译错误
- compile_error_compute: String = "" —— 计算编译错误
- compile_error_fragment: String = "" —— 片元编译错误
- compile_error_intersection: String = "" —— 相交编译错误
- compile_error_miss: String = "" —— 未命中编译错误
- compile_error_raygen: String = "" —— 光线生成编译错误
- compile_error_tesselation_control: String = "" —— 曲面细分控制编译错误
- compile_error_tesselation_evaluation: String = "" —— 曲面细分评估编译错误
- compile_error_vertex: String = "" —— 顶点编译错误

**方法（Methods）：**
- get_stage_bytecode(stage: int) -> PackedByteArray —— 获取阶段字节码
- get_stage_compile_error(stage: int) -> String —— 获取阶段编译错误
- set_stage_bytecode(stage: int, bytecode: PackedByteArray) —— 设置阶段字节码
- set_stage_compile_error(stage: int, compile_error: String) —— 设置阶段编译错误
