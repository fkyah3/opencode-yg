## Texture3DRD（RD3D纹理） <- Texture3D（3D纹理）

此纹理类允许你将直接在 RenderingDevice 上创建的3D纹理用作材质、网格等的纹理。**注意：** Texture3DRD 用于与 RenderingDevice 的底层交互。大多数情况下，请使用 Texture3D。

**属性（Props）：**
- texture_rd_rid: RID —— 纹理的RenderingDevice RID
