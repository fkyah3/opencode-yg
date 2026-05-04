## HMACContext（HMAC上下文） <- RefCounted（引用计数）

HMACContext 类适用于高级 HMAC 使用场景，例如流式消息处理——它支持分阶段构建消息，而非一次性提供全部数据。

**方法（Methods）：**
- finish() -> PackedByteArray —— 完成HMAC计算并返回结果
- start(hash_type: int, key: PackedByteArray) -> int —— 初始化HMAC上下文，指定哈希类型和密钥
- update(data: PackedByteArray) -> int —— 更新HMAC消息数据
