## StatusIndicator（状态指示器）<- Node（节点）

**属性（Props）：**
- icon: Texture2D —— 图标纹理
- menu: NodePath = NodePath("") —— 菜单路径
- tooltip: String = "" —— 工具提示
- visible: bool = true —— 是否可见

**方法（Methods）：**
- get_rect() -> Rect2 —— 获取矩形区域

**信号（Signals）：**
- pressed(mouse_button: int, mouse_position: Vector2i) —— 按下时触发
