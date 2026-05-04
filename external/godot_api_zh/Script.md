## Script（脚本）<- Resource（资源）

作为资源存储的类。脚本扩展了所有实例化它的对象的功能。这是所有脚本的基类，不应直接使用。尝试使用此类创建新脚本将导致错误。脚本子类的 `new` 方法创建新实例。`Object.set_script` 扩展现有对象，前提是该对象的类匹配脚本的基类之一。

**属性（Props）：**
- source_code: String —— 源代码

**方法（Methods）：**
- can_instantiate() -> bool —— 是否可以实例化
- get_base_script() -> Script —— 获取基脚本
- get_global_name() -> StringName —— 获取全局名称
- get_instance_base_type() -> StringName —— 获取实例基类型
- get_property_default_value(property: StringName) -> Variant —— 获取属性默认值
- get_rpc_config() -> Variant —— 获取 RPC 配置
- get_script_constant_map() -> Dictionary —— 获取脚本常量映射
- get_script_method_list() -> Dictionary[] —— 获取脚本方法列表
- get_script_property_list() -> Dictionary[] —— 获取脚本属性列表
- get_script_signal_list() -> Dictionary[] —— 获取脚本信号列表
- has_script_signal(signal_name: StringName) -> bool —— 是否有脚本信号
- has_source_code() -> bool —— 是否有源代码
- instance_has(base_object: Object) -> bool —— 实例是否属于该脚本
- is_abstract() -> bool —— 是否为抽象脚本
- is_tool() -> bool —— 是否为工具脚本
- reload(keep_state: bool = false) -> int —— 重新加载
