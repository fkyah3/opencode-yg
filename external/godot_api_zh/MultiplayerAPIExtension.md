## MultiplayerAPIExtension（多人游戏API扩展）<- MultiplayerAPI（多人游戏API）

此类可用于通过脚本或扩展来扩展或替换默认的 MultiplayerAPI 实现。以下示例通过记录每个正在执行的 RPC 和每个为复制而配置的对象来扩展默认实现（SceneMultiplayer）。然后在主场景或自动加载中调用 `SceneTree.set_multiplayer` 以开始使用自定义 MultiplayerAPI。原生扩展也可以在初始化期间使用 `MultiplayerAPI.set_default_interface` 方法将自身配置为默认实现。
