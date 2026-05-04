## Marshalls（编组工具） <- Object（对象）

提供数据变换和编码工具函数。

**方法（Methods）：**
- base64_to_raw(base64_str: String) -> PackedByteArray —— Base64 转原始字节
- base64_to_utf8(base64_str: String) -> String —— Base64 转 UTF-8
- base64_to_variant(base64_str: String, allow_objects: bool = false) -> Variant —— Base64 转变体
- raw_to_base64(array: PackedByteArray) -> String —— 原始字节转 Base64
- utf8_to_base64(utf8_str: String) -> String —— UTF-8 转 Base64
- variant_to_base64(variant: Variant, full_objects: bool = false) -> String —— 变体转 Base64
