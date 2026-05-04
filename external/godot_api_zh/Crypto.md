## Crypto（加密）<- RefCounted（引用计数）

Crypto 类提供对高级加密功能的访问。目前包括非对称密钥加密/解密、签名/验证，以及生成加密安全的随机字节、RSA 密钥、HMAC 摘要和自签名 X509Certificate。

**方法（Methods）：**
- constant_time_compare(trusted: PackedByteArray, received: PackedByteArray) -> bool —— 常量时间比较
- decrypt(key: CryptoKey, ciphertext: PackedByteArray) -> PackedByteArray —— 解密
- encrypt(key: CryptoKey, plaintext: PackedByteArray) -> PackedByteArray —— 加密
- generate_random_bytes(size: int) -> PackedByteArray —— 生成随机字节
- generate_rsa(size: int) -> CryptoKey —— 生成 RSA 密钥
- generate_self_signed_certificate(key: CryptoKey, issuer_name: String = "CN=myserver,O=myorganisation,C=IT", not_before: String = "20140101000000", not_after: String = "20340101000000") -> X509Certificate —— 生成自签名证书
- hmac_digest(hash_type: int, key: PackedByteArray, msg: PackedByteArray) -> PackedByteArray —— HMAC 摘要
- sign(hash_type: int, hash: PackedByteArray, key: CryptoKey) -> PackedByteArray —— 签名
- verify(hash_type: int, hash: PackedByteArray, signature: PackedByteArray, key: CryptoKey) -> bool —— 验证
