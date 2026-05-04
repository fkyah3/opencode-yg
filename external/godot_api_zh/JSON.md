## JSON <- Resource（资源）

JSON 类使所有数据类型能够与 JSON 字符串相互转换。这对于序列化数据非常有用，例如保存到文件或通过网络发送。`stringify` 用于将任何数据类型转换为 JSON 字符串。`parse` 用于将任何现有 JSON 数据转换为可以在 Godot 中使用的 Variant。如果成功解析，使用 `data` 检索 Variant，并使用 `@GlobalScope.typeof` 检查 Variant 的类型是否符合预期。JSON 对象被转换为 Dictionary，但 JSON 数据可用于存储数组、数字、字符串甚至布尔值。或者，您可以使用静态 `parse_string` 方法解析字符串，但它不处理错误。**注意：** 两种解析方法都不完全符合 JSON 规范：- 数组或对象中的尾部逗号被忽略，而不是导致解析错误。- 字符串字面量中接受换行符和制表符，并视为其对应的转义序列 `\n` 和 `\t`。- 数字使用 `String.to_float` 解析，这通常比 JSON 规范更宽松。- 某些错误（如无效的 Unicode 序列）不会导致解析错误。相反，字符串被清理并在控制台中记录错误。

**属性（Props）：**
- data: Variant = null

**方法（Methods）：**
- from_native(variant: Variant, full_objects: bool = false) -> Variant
- get_error_line() -> int
- get_error_message() -> String
- get_parsed_text() -> String
- parse(json_text: String, keep_text: bool = false) -> int
- parse_string(json_string: String) -> Variant
- stringify(data: Variant, indent: String = "", sort_keys: bool = true, full_precision: bool = false) -> String
- to_native(json: Variant, allow_objects: bool = false) -> Variant
