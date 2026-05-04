## ProgressBar（进度条） <- Range（范围）

用于百分比视觉表示的控件。在中心显示填充百分比。也可用于显示不确定进度。如需更多填充模式，请使用 TextureProgressBar。

**属性（Props）：**
- editor_preview_indeterminate: bool —— 编辑器预览不确定状态
- fill_mode: int = 0 —— 填充模式
- indeterminate: bool = false —— 是否不确定
- show_percentage: bool = true —— 显示百分比

**枚举（Enums）：**
**FillMode（填充模式）：** FILL_BEGIN_TO_END=0 —— 从头到尾, FILL_END_TO_BEGIN=1 —— 从尾到头, FILL_TOP_TO_BOTTOM=2 —— 从上到下, FILL_BOTTOM_TO_TOP=3 —— 从下到上
