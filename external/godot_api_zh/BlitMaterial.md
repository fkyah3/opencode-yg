## BlitMaterial（拷贝材质） <- Material（材质）

一种材质资源，可由 DrawableTexture 在处理拷贝调用时用于绘制。

**属性（Props）：**
- blend_mode: int (BlitMaterial.BlendMode) = 0 —— 混合模式

**枚举（Enums）：**
**BlendMode（混合模式）：** BLEND_MODE_MIX=0 —— 混合, BLEND_MODE_ADD=1 —— 相加, BLEND_MODE_SUB=2 —— 相减, BLEND_MODE_MUL=3 —— 相乘, BLEND_MODE_DISABLED=4 —— 禁用
