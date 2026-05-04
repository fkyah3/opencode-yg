## GridContainer（网格容器） <- Container（容器）

GridContainer 将其子控件排列为网格布局。列数由 `columns` 属性指定，而行数取决于子控件所需的数量。对于容器的每一种尺寸，行列数都保持不变。**注意：** GridContainer 仅适用于继承自 Control 的子节点。它不会重新排列继承自 Node2D 的子节点。

**Props（属性）：**
- columns: int = 1 —— 列数
