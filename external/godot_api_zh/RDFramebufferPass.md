## RDFramebufferPass（帧缓冲通道） <- RefCounted（引用计数）

此类包含帧缓冲通道的附件描述列表。每个描述通过索引指向先前提供的纹理附件列表。多通道帧缓冲可以在移动设备上优化某些配置，在桌面平台上几乎没有优势。此对象由 RenderingDevice 使用。

**属性（Props）：**
- color_attachments: PackedInt32Array = PackedInt32Array() —— 颜色附件
- depth_attachment: int = -1 —— 深度附件
- input_attachments: PackedInt32Array = PackedInt32Array() —— 输入附件
- preserve_attachments: PackedInt32Array = PackedInt32Array() —— 保留附件
- resolve_attachments: PackedInt32Array = PackedInt32Array() —— 解析附件

**枚举（Enums）：**
**常量（Constants）：** ATTACHMENT_UNUSED=-1 —— 未使用的附件
