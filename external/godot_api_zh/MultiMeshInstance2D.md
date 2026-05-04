## MultiMeshInstance2D（多网格实例2D）<- Node2D（节点2D）

MultiMeshInstance2D 是一个专用节点，用于在 2D 中实例化 MultiMesh 资源。相比于显示许多带大透明区域的 Sprite2D 节点，这可以提高渲染速度，特别是当节点在高视口分辨率下占用大量屏幕空间时。这是因为使用设计为适合精灵不透明区域的网格可以减少 GPU 填充率使用（以增加顶点处理使用为代价）。用法与 MultiMeshInstance3D 相同。

**属性（Props）：**
- multimesh: MultiMesh —— 多网格
- texture: Texture2D —— 纹理

**信号（Signals）：**
- texture_changed —— 纹理已更改
