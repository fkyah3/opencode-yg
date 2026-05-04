## ClassDB（类数据库）<- Object（对象）

提供对存储的每个可用引擎类元数据的访问。**注意：** 使用 `class_name` 定义的脚本类不属于 ClassDB，因此它们不会返回反射数据（如方法或属性列表）。但是，GDExtension 定义的类*属于* ClassDB，因此它们将返回反射数据。

**方法（Methods）：**
- can_instantiate(class: StringName) -> bool —— 是否可以实例化
- class_call_static(class: StringName, method: StringName) -> Variant —— 调用类静态方法
- class_exists(class: StringName) -> bool —— 类是否存在
- class_get_api_type(class: StringName) -> int —— 获取类 API 类型
- class_get_enum_constants(class: StringName, enum: StringName, no_inheritance: bool = false) -> PackedStringArray —— 获取枚举常量
- class_get_enum_list(class: StringName, no_inheritance: bool = false) -> PackedStringArray —— 获取枚举列表
- class_get_integer_constant(class: StringName, name: StringName) -> int —— 获取整型常量
- class_get_integer_constant_enum(class: StringName, name: StringName, no_inheritance: bool = false) -> StringName —— 获取整型常量的枚举
- class_get_integer_constant_list(class: StringName, no_inheritance: bool = false) -> PackedStringArray —— 获取整型常量列表
- class_get_method_argument_count(class: StringName, method: StringName, no_inheritance: bool = false) -> int —— 获取方法参数数量
- class_get_method_list(class: StringName, no_inheritance: bool = false) -> Dictionary[] —— 获取方法列表
- class_get_property(object: Object, property: StringName) -> Variant —— 获取对象属性
- class_get_property_default_value(class: StringName, property: StringName) -> Variant —— 获取属性默认值
- class_get_property_getter(class: StringName, property: StringName) -> StringName —— 获取属性 getter
- class_get_property_list(class: StringName, no_inheritance: bool = false) -> Dictionary[] —— 获取属性列表
- class_get_property_setter(class: StringName, property: StringName) -> StringName —— 获取属性 setter
- class_get_signal(class: StringName, signal: StringName) -> Dictionary —— 获取信号
- class_get_signal_list(class: StringName, no_inheritance: bool = false) -> Dictionary[] —— 获取信号列表
- class_has_enum(class: StringName, name: StringName, no_inheritance: bool = false) -> bool —— 是否有枚举
- class_has_integer_constant(class: StringName, name: StringName) -> bool —— 是否有整型常量
- class_has_method(class: StringName, method: StringName, no_inheritance: bool = false) -> bool —— 是否有方法
- class_has_signal(class: StringName, signal: StringName) -> bool —— 是否有信号
- class_set_property(object: Object, property: StringName, value: Variant) -> int —— 设置对象属性
- get_class_list() -> PackedStringArray —— 获取类列表
- get_inheriters_from_class(class: StringName) -> PackedStringArray —— 获取类的继承者
- get_parent_class(class: StringName) -> StringName —— 获取父类
- instantiate(class: StringName) -> Variant —— 实例化
- is_class_enabled(class: StringName) -> bool —— 类是否启用
- is_class_enum_bitfield(class: StringName, enum: StringName, no_inheritance: bool = false) -> bool —— 枚举是否为位域
- is_parent_class(class: StringName, inherits: StringName) -> bool —— 是否为父类

**枚举（Enums）：**
**APIType（API 类型）：** API_CORE=0 —— 核心 API，API_EDITOR=1 —— 编辑器 API，API_EXTENSION=2 —— 扩展 API，API_EDITOR_EXTENSION=3 —— 编辑器扩展 API，API_NONE=4 —— 无
