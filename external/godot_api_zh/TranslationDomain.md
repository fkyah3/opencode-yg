## TranslationDomain <- RefCounted（引用计数）

TranslationDomain 是一个自包含的 Translation 资源集合。可以向其中添加或移除翻译。如果你正在处理主翻译域，使用 TranslationServer 的包装方法更为便捷。

**属性（Props）：**
- enabled: bool = true —— 是否启用
- pseudolocalization_accents_enabled: bool = true —— 是否启用伪本地化重音
- pseudolocalization_double_vowels_enabled: bool = false —— 是否启用伪本地化双元音
- pseudolocalization_enabled: bool = false —— 是否启用伪本地化
- pseudolocalization_expansion_ratio: float = 0.0 —— 伪本地化扩展比例
- pseudolocalization_fake_bidi_enabled: bool = false —— 是否启用伪本地化假双向文本
- pseudolocalization_override_enabled: bool = false —— 是否启用伪本地化覆盖
- pseudolocalization_prefix: String = "[" —— 伪本地化前缀
- pseudolocalization_skip_placeholders_enabled: bool = true —— 是否跳过占位符的伪本地化
- pseudolocalization_suffix: String = "]" —— 伪本地化后缀

**方法（Methods）：**
- add_translation(translation: Translation) —— 添加翻译
- clear() —— 清除所有翻译
- find_translations(locale: String, exact: bool) -> Translation[] —— 查找指定区域设置的翻译
- get_locale_override() -> String —— 获取区域设置覆盖
- get_translation_object(locale: String) -> Translation —— 获取指定区域设置的翻译对象
- get_translations() -> Translation[] —— 获取所有翻译
- has_translation(translation: Translation) -> bool —— 是否包含指定翻译
- has_translation_for_locale(locale: String, exact: bool) -> bool —— 是否包含指定区域设置的翻译
- pseudolocalize(message: StringName) -> StringName —— 伪本地化消息
- remove_translation(translation: Translation) —— 移除翻译
- set_locale_override(locale: String) —— 设置区域覆盖
- translate(message: StringName, context: StringName = &"") -> StringName —— 翻译消息
- translate_plural(message: StringName, message_plural: StringName, n: int, context: StringName = &"") -> StringName —— 翻译复数消息
