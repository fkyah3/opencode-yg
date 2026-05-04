## SkinReference（皮肤引用） <- RefCounted（引用计数）

一个内部对象，包含从特定 MeshInstance3D 上下文中使用的 Skin 到 RenderingServer 中骨骼 RID 的映射。另请参见 `MeshInstance3D.get_skin_reference` 和 `RenderingServer.instance_attach_skeleton`。请注意，尽管名称相似，但 RenderingServer 中使用的骨骼 RID 与 Skeleton3D 节点没有直接的一对一对应关系。特别是，没有 MeshInstance3D 子节点的 Skeleton3D 节点可能对 RenderingServer 来说是未知的。另一方面，具有多个 MeshInstance3D 节点且每个节点都有不同 `MeshInstance3D.skin` 对象的 Skeleton3D 可能有多个 SkinReference 实例（因此有多个骨骼 RID）。

**方法（Methods）：**
- get_skeleton() -> RID —— 获取骨骼
- get_skin() -> Skin —— 获取皮肤
