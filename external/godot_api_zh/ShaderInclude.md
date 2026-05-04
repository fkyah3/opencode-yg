## ShaderInclude（着色器包含文件） <- Resource（资源）

以 `.gdshaderinc` 扩展名保存的着色器包含文件。通过此类可以定义自定义着色器代码片段，并在 Shader 中使用预处理器指令 `#include` 后跟文件路径进行包含（例如 `#include "res://shader_lib.gdshaderinc"`）。代码片段本身不必是完整的有效着色器。

**属性（Props）：**
- code: String = "" —— 着色器代码
