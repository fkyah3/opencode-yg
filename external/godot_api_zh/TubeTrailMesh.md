## TubeTrailMesh（管状拖尾网格）<- PrimitiveMesh（基本网格）

TubeTrailMesh 表示一个直管状网格，宽度可变。该管由多个圆柱段组成，每个段具有相同的 `section_length` 和 `section_rings` 数量。`curve` 沿管的整个长度采样，这意味着曲线决定了管沿其长度的半径。此基本网格通常用于粒子拖尾。

**属性（Props）：**
- cap_bottom: bool = true —— 底部封盖
- cap_top: bool = true —— 顶部封盖
- curve: Curve —— 曲线
- radial_steps: int = 8 —— 径向步数
- radius: float = 0.5 —— 半径
- section_length: float = 0.2 —— 段长度
- section_rings: int = 3 —— 段环数
- sections: int = 5 —— 分段数
