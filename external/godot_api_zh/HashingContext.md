## HashingContext（哈希上下文）<- RefCounted（引用计数）

HashingContext 类提供用于在多次迭代中计算加密哈希的接口。适用于计算大文件（无需全部加载到内存）、网络流以及一般数据流的哈希。`HashType` 枚举显示了支持的哈希算法。

**方法（Methods）：**
- finish() -> PackedByteArray —— 完成哈希计算并返回结果
- start(type: int) -> int —— 开始哈希计算
- update(chunk: PackedByteArray) -> int —— 更新哈希数据

**枚举（Enums）：**
**HashType：** HASH_MD5=0, HASH_SHA1=1, HASH_SHA256=2
