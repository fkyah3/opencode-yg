## FlowContainer（流式容器） <- Container（容器）

一种容器，水平或垂直排列其子控件，并在到达边界时自动换行。类似于书籍中的文本在行满时换行的方式。

**属性（Props）：**
- alignment: int (FlowContainer.AlignmentMode) = 0 —— 对齐方式
- last_wrap_alignment: int (FlowContainer.LastWrapAlignmentMode) = 0 —— 最后一行的换行对齐方式
- reverse_fill: bool = false —— 反向填充
- vertical: bool = false —— 是否垂直排列

**方法（Methods）：**
- get_line_count() -> int —— 获取行数

**枚举（Enums）：**
**AlignmentMode（对齐模式）：** ALIGNMENT_BEGIN=0 —— 起始对齐, ALIGNMENT_CENTER=1 —— 居中对齐, ALIGNMENT_END=2 —— 末尾对齐
**LastWrapAlignmentMode（最后换行对齐模式）：** LAST_WRAP_ALIGNMENT_INHERIT=0 —— 继承, LAST_WRAP_ALIGNMENT_BEGIN=1 —— 起始, LAST_WRAP_ALIGNMENT_CENTER=2 —— 居中, LAST_WRAP_ALIGNMENT_END=3 —— 末尾
