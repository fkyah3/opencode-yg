## MeshInstance2D <- Node2D（节点2D）

用于在 2D 中显示 Mesh 的节点。与具有大面积透明区域的 Sprite2D 节点相比，这可以更快地渲染，特别是当节点在高视口分辨率下占据大量屏幕空间时。这是因为使用设计为适合精灵不透明区域的网格可以减少 GPU 填充率利用率（以增加顶点处理利用率为代价）。当需要实例化数千个靠近的 Mesh 时，请考虑在 MultiMeshInstance2D 中使用 MultiMesh。可以通过编辑器工具栏中的工具从现有的 Sprite2D 创建 MeshInstance2D。选择 Sprite2D 节点，然后在 2D 编辑器视口顶部选择 **Sprite2D > 转换为 MeshInstance2D**。

**属性（Props）：**
- mesh: Mesh
- texture: Texture2D

**信号（Signals）：**
- texture_changed
