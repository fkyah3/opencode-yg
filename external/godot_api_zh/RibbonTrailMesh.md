## RibbonTrailMesh（带状拖尾网格）<- PrimitiveMesh（基本网格）

RibbonTrailMesh 表示一个直带状网格，宽度可变。该带由多个扁平或十字形段组成，每个段具有相同的 `section_length` 和 `section_segments` 数量。`curve` 沿带的整个长度采样，这意味着曲线决定了带沿其长度的大小。此基本网格通常用于粒子拖尾。

**属性（Props）：**
- curve: Curve —— 曲线
- section_length: float = 0.2 —— 段长度
- section_segments: int = 3 —— 段分段数
- sections: int = 5 —— 分段数
- shape: int (RibbonTrailMesh.Shape) = 1 —— 形状
- size: float = 1.0 —— 大小

**枚举（Enums）：**
**Shape（形状）：** SHAPE_FLAT=0 —— 扁平，SHAPE_CROSS=1 —— 十字
