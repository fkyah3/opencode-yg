## AESContext（AES上下文） <- RefCounted（引用计数）

此类保存 AES（高级加密标准）加密和解密操作所需的上下文信息。支持 AES-ECB 和 AES-CBC 两种模式。

**Methods（方法）：**
- finish() —— 结束上下文
- get_iv_state() -> PackedByteArray —— 获取 IV 状态
- start(mode: int, key: PackedByteArray, iv: PackedByteArray = PackedByteArray()) -> int —— 启动上下文
- update(src: PackedByteArray) -> PackedByteArray —— 更新数据

**Enums（枚举）：**
**Mode（模式）：** MODE_ECB_ENCRYPT=0 —— ECB加密，MODE_ECB_DECRYPT=1 —— ECB解密，MODE_CBC_ENCRYPT=2 —— CBC加密，MODE_CBC_DECRYPT=3 —— CBC解密，MODE_MAX=4
