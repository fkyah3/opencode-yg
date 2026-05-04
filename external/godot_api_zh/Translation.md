## Translation <- Resource（资源）

Translation 将一组字符串映射到各自的翻译版本，并提供复数形式的便捷方法。一个 Translation 由多个消息组成。消息通过其上下文和未翻译的字符串来标识。与某些系统不同，在 Godot 中使用空上下文字符串表示不使用任何上下文。

**属性（Props）：**
- locale: String = "en" —— 语言区域
- plural_rules_override: String = "" —— 复数规则覆盖

**方法（Methods）：**
- add_message(src_message: StringName, xlated_message: StringName, context: StringName = &"") —— 添加消息翻译
- add_plural_message(src_message: StringName, xlated_messages: PackedStringArray, context: StringName = &"") —— 添加复数消息翻译
- erase_message(src_message: StringName, context: StringName = &"") —— 擦除消息
- get_message(src_message: StringName, context: StringName = &"") -> StringName —— 获取消息翻译
- get_message_count() -> int —— 获取消息数量
- get_message_list() -> PackedStringArray —— 获取消息列表
- get_plural_message(src_message: StringName, src_plural_message: StringName, n: int, context: StringName = &"") -> StringName —— 获取复数消息翻译
- get_translated_message_list() -> PackedStringArray —— 获取已翻译消息列表
