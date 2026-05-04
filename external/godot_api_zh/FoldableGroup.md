## FoldableGroup（可折叠组） <- Resource（资源）

一组从 FoldableContainer 派生的节点。同一时间只能展开一个容器。

**属性（Props）：**
- allow_folding_all: bool = false —— 是否允许全部折叠
- resource_local_to_scene: bool = true —— 资源是否局部于场景

**方法（Methods）：**
- get_containers() -> FoldableContainer[] —— 获取所有容器
- get_expanded_container() -> FoldableContainer —— 获取当前展开的容器

**信号（Signals）：**
- expanded(container: FoldableContainer) —— 展开时触发
