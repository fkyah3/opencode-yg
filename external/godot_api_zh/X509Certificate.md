## X509Certificate（X509证书）<- Resource（资源）

X509Certificate 类表示一个 X509 证书。证书可以像其他任何 Resource 一样加载和保存。它们可以用作 `StreamPeerTLS.accept_stream` 中的服务器证书（配合适当的 CryptoKey），也可以在通过 `StreamPeerTLS.connect_to_stream` 连接到 TLS 服务器时指定唯一应接受的证书。

**方法（Methods）：**
- load(path: String) -> int
- load_from_string(string: String) -> int
- save(path: String) -> int
- save_to_string() -> String
