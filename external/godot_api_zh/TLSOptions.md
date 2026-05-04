## TLSOptions（TLS 选项） <- RefCounted（引用计数）

TLSOptions 抽象了 StreamPeerTLS 和 PacketPeerDTLS 类的配置选项。此类的对象不能直接实例化，应改用静态方法 `client`、`client_unsafe` 或 `server` 之一。

**方法（Methods）：**
- client(trusted_chain: X509Certificate = null, common_name_override: String = "") -> TLSOptions —— 创建客户端 TLS 选项
- client_unsafe(trusted_chain: X509Certificate = null) -> TLSOptions —— 创建不安全的客户端 TLS 选项
- get_common_name_override() -> String —— 获取通用名称覆盖
- get_own_certificate() -> X509Certificate —— 获取自有证书
- get_private_key() -> CryptoKey —— 获取私钥
- get_trusted_ca_chain() -> X509Certificate —— 获取受信任的 CA 链
- is_server() -> bool —— 是否为服务器模式
- is_unsafe_client() -> bool —— 是否为不安全客户端
- server(key: CryptoKey, certificate: X509Certificate) -> TLSOptions —— 创建服务器 TLS 选项
