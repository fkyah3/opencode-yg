## BoxContainer（盒式容器） <- Container（容器）

一种容器，可在水平或垂直方向上排列其子控件，并在子控件的最小尺寸变化时自动重新排列。

**属性（Props）：**
- alignment: int (BoxContainer.AlignmentMode) = 0 —— 对齐方式
- vertical: bool = false —— 是否垂直排列

**方法（Methods）：**
- add_spacer(begin: bool) -> Control —— 添加分隔控件

**枚举（Enums）：**
**AlignmentMode（对齐模式）：** ALIGNMENT_BEGIN=0（开头对齐）, ALIGNMENT_CENTER=1（居中对齐）, ALIGNMENT_END=2（末尾对齐）
