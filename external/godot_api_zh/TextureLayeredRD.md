## TextureLayeredRD（渲染设备分层纹理） <- TextureLayered（分层纹理）

Texture2DArrayRD、TextureCubemapRD 和 TextureCubemapArrayRD 的基类。不能直接使用，但包含访问派生资源类型所需的全部函数。**注意：**TextureLayeredRD 旨在用于 RenderingDevice 的低级操作。大多数情况下应使用 TextureLayered。

**属性（Props）：**
- texture_rd_rid: RID —— 渲染设备纹理 RID
