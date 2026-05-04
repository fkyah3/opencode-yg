## FoldableContainer（可折叠容器） <- Container（容器）

一个可展开/折叠的容器，带有标题，标题中可以填充控件（如按钮）。这也称为手风琴（accordion）。标题可以位于容器的顶部或底部。可以通过点击标题或在聚焦时按下 `ui_accept` 来展开或折叠容器。容器折叠时，子控件节点将被隐藏。忽略非控件子节点。FoldableContainer 可以与其他 FoldableContainer 分组，以便一次只能打开其中一个；参见 `foldable_group` 和 FoldableGroup。

**属性（Props）：**
- focus_mode: int (Control.FocusMode) = 2 —— 焦点模式
- foldable_group: FoldableGroup —— 折叠组
- folded: bool = false —— 是否折叠
- language: String = "" —— 语言
- mouse_filter: int (Control.MouseFilter) = 0 —— 鼠标过滤
- title: String = "" —— 标题
- title_alignment: int (HorizontalAlignment) = 0 —— 标题对齐方式
- title_position: int (FoldableContainer.TitlePosition) = 0 —— 标题位置
- title_text_direction: int (Control.TextDirection) = 0 —— 标题文字方向
- title_text_overrun_behavior: int (TextServer.OverrunBehavior) = 0 —— 标题文字溢出行为

**方法（Methods）：**
- add_title_bar_control(control: Control) —— 添加标题栏控件
- expand() —— 展开
- fold() —— 折叠
- remove_title_bar_control(control: Control) —— 移除标题栏控件

**信号（Signals）：**
- folding_changed(is_folded: bool) —— 折叠状态改变

**枚举（Enums）：**
**TitlePosition（标题位置）：** POSITION_TOP=0（顶部）, POSITION_BOTTOM=1（底部）
