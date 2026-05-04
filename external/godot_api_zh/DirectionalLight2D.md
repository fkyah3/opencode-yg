## DirectionalLight2D（方向光2D） <- Light2D（光源2D）

方向光是一种 Light2D 节点，模拟覆盖整个场景的无限平行光线。用于强度大且距离场景较远的灯光（例如：模拟日光或月光）。光线沿节点全局基底的 +Y 方向发射。对于未旋转的光源，这意味着光线向下发射。节点的位置被忽略；仅使用基底来确定光线方向。**注意：** DirectionalLight2D 不支持光的裁剪遮罩（但支持阴影裁剪遮罩）。它始终照亮 2D 节点，无论 2D 节点的 `CanvasItem.light_mask` 如何设置。

**属性（Props）：**
- height: float = 0.0 —— 高度
- max_distance: float = 10000.0 —— 最大距离
