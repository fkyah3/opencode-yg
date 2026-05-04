## RDTextureFormat（RD纹理格式）<- RefCounted（引用计数）

此对象由 RenderingDevice 使用。

**属性（Props）：**
- array_layers: int = 1
- depth: int = 1
- format: int (RenderingDevice.DataFormat) = 8
- height: int = 1
- is_discardable: bool = false
- is_resolve_buffer: bool = false
- mipmaps: int = 1
- samples: int (RenderingDevice.TextureSamples) = 0
- texture_type: int (RenderingDevice.TextureType) = 1
- usage_bits: int (RenderingDevice.TextureUsageBits) = 0
- width: int = 1

**方法（Methods）：**
- add_shareable_format(format: int)
- remove_shareable_format(format: int)
