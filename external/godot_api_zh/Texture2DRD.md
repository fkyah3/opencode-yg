## Texture2DRD（渲染设备2D纹理） <- Texture2D（2D纹理）

此纹理类允许使用直接在 RenderingDevice 上创建的 2D 纹理作为材质、网格等的纹理。**注意：** Texture2DRD 适用于与 RenderingDevice 的低层级使用场景。对大多数用例，请使用 Texture2D。

**属性（Props）：**
- resource_local_to_scene: bool = false —— 资源是否局部于场景
- texture_rd_rid: RID —— 渲染设备纹理的 RID
