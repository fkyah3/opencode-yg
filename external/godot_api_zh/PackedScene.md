## PackedScene（打包场景）<- Resource（资源）

场景文件的简化接口。提供对场景资源本身可执行的操作和检查的访问。可用于将节点保存到文件。保存时，该节点及其拥有的所有节点都会被保存（参见 `Node.owner` 属性）。**注意：** 节点不需要拥有自身。**示例：** 加载保存的场景：**示例：** 保存具有不同所有者的节点。以下示例创建 3 个对象：Node2D（`node`）、RigidBody2D（`body`）和 CollisionObject2D（`collision`）。`collision` 是 `body` 的子节点，`body` 是 `node` 的子节点。只有 `body` 由 `node` 拥有，因此 `pack` 只会保存这两个节点，而不会保存 `collision`。

**方法（Methods）：**
- can_instantiate() -> bool —— 是否可以实例化
- get_state() -> SceneState —— 获取场景状态
- instantiate(edit_state: int = 0) -> Node —— 实例化场景
- pack(path: Node) -> int —— 打包节点为场景

**枚举（Enums）：**
**GenEditState（生成编辑状态）：** GEN_EDIT_STATE_DISABLED=0 —— 禁用, GEN_EDIT_STATE_INSTANCE=1 —— 实例, GEN_EDIT_STATE_MAIN=2 —— 主场景, GEN_EDIT_STATE_MAIN_INHERITED=3 —— 继承的主场景
