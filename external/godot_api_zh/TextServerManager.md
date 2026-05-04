## TextServerManager（文本服务器管理器） <- Object（对象）

TextServerManager 是用于加载、枚举和切换 TextServer 的 API 后端。**注意：** 运行时切换文本服务器是可能的，但会使所有字体和文本缓冲区失效。请确保在执行此操作之前卸载所有控件、字体和主题。

**方法（Methods）：**
- add_interface(interface: TextServer) —— 添加接口
- find_interface(name: String) -> TextServer —— 查找接口
- get_interface(idx: int) -> TextServer —— 获取接口
- get_interface_count() -> int —— 获取接口数量
- get_interfaces() -> Dictionary[] —— 获取所有接口
- get_primary_interface() -> TextServer —— 获取主接口
- remove_interface(interface: TextServer) —— 移除接口
- set_primary_interface(index: TextServer) —— 设置主接口

**信号（Signals）：**
- interface_added(interface_name: StringName) —— 接口已添加
- interface_removed(interface_name: StringName) —— 接口已移除
