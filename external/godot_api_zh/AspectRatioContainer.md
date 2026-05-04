## AspectRatioContainer（宽高比容器） <- Container（容器）

一种容器类型，在调整容器大小时会自动保持其子控件的比例。适用于容器具有动态大小且子节点必须相应调整大小而不损失宽高比的情况。

**属性（Props）：**
- alignment_horizontal: int (AspectRatioContainer.AlignmentMode) = 1 —— 水平对齐
- alignment_vertical: int (AspectRatioContainer.AlignmentMode) = 1 —— 垂直对齐
- ratio: float = 1.0 —— 宽高比
- stretch_mode: int (AspectRatioContainer.StretchMode) = 2 —— 拉伸模式

**枚举（Enums）：**
**StretchMode（拉伸模式）：** STRETCH_WIDTH_CONTROLS_HEIGHT=0 —— 宽度控制高度, STRETCH_HEIGHT_CONTROLS_WIDTH=1 —— 高度控制宽度, STRETCH_FIT=2 —— 适应, STRETCH_COVER=3 —— 覆盖
**AlignmentMode（对齐模式）：** ALIGNMENT_BEGIN=0 —— 起始对齐, ALIGNMENT_CENTER=1 —— 居中对齐, ALIGNMENT_END=2 —— 末尾对齐
