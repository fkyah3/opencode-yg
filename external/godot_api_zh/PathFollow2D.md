## PathFollow2D（路径跟随2D）<- Node2D（节点2D）

此节点以其父节点 Path2D 为基准，根据距第一个顶点的距离返回其中的一个点坐标。它对于让其他节点跟随路径而无需编写移动模式代码非常有用。为此，这些节点必须作为此节点的子节点。设置此节点中的 `progress` 时，子节点将相应地移动。

**属性（Props）：**
- cubic_interp: bool = true —— 三次插值
- h_offset: float = 0.0 —— 水平偏移
- loop: bool = true —— 循环
- progress: float = 0.0 —— 进度
- progress_ratio: float = 0.0 —— 进度比例
- rotates: bool = true —— 是否旋转
- v_offset: float = 0.0 —— 垂直偏移
