## OptimizedTranslation（优化翻译） <- Translation（翻译）

一种优化翻译。使用实时压缩翻译，产生非常小的字典。此类为优化目的不存储未翻译的字符串。因此，`Translation.get_message_list` 始终返回空数组，`Translation.get_message_count` 始终返回 `0`。

**方法（Methods）：**
- generate(from: Translation) —— 从指定翻译生成优化翻译
