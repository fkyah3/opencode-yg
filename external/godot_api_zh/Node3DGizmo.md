## Node3DGizmo（3D节点辅助工具）<- RefCounted（引用计数）

此类是抽象类，用于将 Node3D 场景与编辑器专属的 EditorNode3DGizmo 类连接起来。Node3DGizmo 本身没有公开的 API，请参考 `Node3D.add_gizmo` 并传入一个 EditorNode3DGizmo 实例。
