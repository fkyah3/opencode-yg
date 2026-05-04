## CryptoKey（加密密钥）<- Resource（资源）

CryptoKey 类表示一个加密密钥。密钥可以像任何其他 Resource 一样加载和保存。它们可用于通过 `Crypto.generate_self_signed_certificate` 生成自签名 X509Certificate，以及作为 `StreamPeerTLS.accept_stream` 中的私钥配合相应的证书使用。

**方法（Methods）：**
- is_public_only() -> bool —— 是否仅公开
- load(path: String, public_only: bool = false) -> int —— 加载
- load_from_string(string_key: String, public_only: bool = false) -> int —— 从字符串加载
- save(path: String, public_only: bool = false) -> int —— 保存
- save_to_string(public_only: bool = false) -> String —— 保存为字符串
