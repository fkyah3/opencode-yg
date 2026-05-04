## IP <- Object（对象）

IP 包含互联网协议（IP）的支持函数。TCP/IP 支持在不同类中（参见 StreamPeerTCP 和 TCPServer）。IP 提供 DNS 主机名解析支持，包括阻塞和线程两种方式。

**方法（Methods）：**
- clear_cache(hostname: String = "")
- erase_resolve_item(id: int)
- get_local_addresses() -> PackedStringArray
- get_local_interfaces() -> Dictionary[]
- get_resolve_item_address(id: int) -> String
- get_resolve_item_addresses(id: int) -> Array
- get_resolve_item_status(id: int) -> int
- resolve_hostname(host: String, ip_type: int = 3) -> String
- resolve_hostname_addresses(host: String, ip_type: int = 3) -> PackedStringArray
- resolve_hostname_queue_item(host: String, ip_type: int = 3) -> int

**枚举（Enums）：**
**ResolverStatus：** RESOLVER_STATUS_NONE=0, RESOLVER_STATUS_WAITING=1, RESOLVER_STATUS_DONE=2, RESOLVER_STATUS_ERROR=3
**常量（Constants）：** RESOLVER_MAX_QUERIES=256, RESOLVER_INVALID_ID=-1
**Type：** TYPE_NONE=0, TYPE_IPV4=1, TYPE_IPV6=2, TYPE_ANY=3
