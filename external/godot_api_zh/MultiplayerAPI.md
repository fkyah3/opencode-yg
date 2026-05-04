## MultiplayerAPI <- RefCounted（引用计数）

高级多人 API 实现的基类。另请参见 MultiplayerPeer。默认情况下，SceneTree 持有对此类实现的引用，并使用它在整个场景中提供多人能力（即 RPC）。可以通过调用 `SceneTree.set_multiplayer` 方法来覆盖特定树分支使用的 MultiplayerAPI 实例，从而有效地允许在同一场景中同时运行客户端和服务器。也可以通过脚本或原生扩展来扩展或替换默认实现。有关扩展的详细信息，请参见 MultiplayerAPIExtension；有关默认实现的详细信息，请参见 SceneMultiplayer。

**属性（Props）：**
- multiplayer_peer: MultiplayerPeer

**方法（Methods）：**
- create_default_interface() -> MultiplayerAPI
- get_default_interface() -> StringName
- get_peers() -> PackedInt32Array
- get_remote_sender_id() -> int
- get_unique_id() -> int
- has_multiplayer_peer() -> bool
- is_server() -> bool
- object_configuration_add(object: Object, configuration: Variant) -> int
- object_configuration_remove(object: Object, configuration: Variant) -> int
- poll() -> int
- rpc(peer: int, object: Object, method: StringName, arguments: Array = []) -> int
- set_default_interface(interface_name: StringName)

**信号（Signals）：**
- connected_to_server
- connection_failed
- peer_connected(id: int)
- peer_disconnected(id: int)
- server_disconnected

**枚举（Enums）：**
**RPCMode：** RPC_MODE_DISABLED=0, RPC_MODE_ANY_PEER=1, RPC_MODE_AUTHORITY=2
