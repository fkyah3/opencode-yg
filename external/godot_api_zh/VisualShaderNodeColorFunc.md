## VisualShaderNodeColorFunc（可视化着色器颜色函数节点） <- VisualShaderNode（可视化着色器节点）

接收颜色输入并根据 `function` 对颜色进行变换。

**属性（Props）：**
- function: int (VisualShaderNodeColorFunc.Function) = 0 —— 函数类型

**枚举（Enums）：**
**Function（函数）：** FUNC_GRAYSCALE=0 —— 灰度化, FUNC_HSV2RGB=1 —— HSV转RGB, FUNC_RGB2HSV=2 —— RGB转HSV, FUNC_SEPIA=3 —— 棕褐色调, FUNC_LINEAR_TO_SRGB=4 —— 线性转sRGB, FUNC_SRGB_TO_LINEAR=5 —— sRGB转线性, FUNC_MAX=6 —— 最大值
