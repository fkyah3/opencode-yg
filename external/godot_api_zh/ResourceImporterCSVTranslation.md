## ResourceImporterCSVTranslation（CSV翻译资源导入器） <- ResourceImporter（资源导入器）

逗号分隔值是一种纯文本表格存储格式。其格式简单，易于在任何文本编辑器或电子表格软件中编辑。这使其成为游戏本地化的常见选择。在用于翻译的 CSV 文件中，第一列包含字符串标识符，第一行作为表头。第一列的标头可以是任何值。其余列的标头表示该列的区域设置。标头以下划线（`_`）开头的列将被忽略。**CSV 文件示例：** [codeblock lang=text] keys,en,es,ja GREET,"Hello, friend!","Hola, amigo!",こんにちは ASK,How are you?,Cómo está?,元気ですか BYE,Goodbye,Adiós,さようなら QUOTE,"""Hello"" said the man.","""Hola"" dijo el hombre.",「こんにちは」男は言いました [/codeblock] 虽然第一列中的键通常使用大写字符串标识符，但直接使用游戏中出现的字符串作为键也很常见。为避免字符串歧义，您可以使用特殊的 `?context` 列来指定与 `Object.tr` 一起使用的上下文。[codeblock lang=text] en,?context,fr,ja,zh Letter,Alphabet,Lettre,字母,字母 Letter,Message,Courrier,手紙,信件 [/codeblock] 要设置与 `Object.tr_n` 一起使用的字符串复数形式，请添加特殊的 `?plural` 列。在此列中设置源字符串的复数形式后，您可以添加额外的行来提供更多复数形式的翻译。这些复数形式行中的第一列和所有特殊列必须为空。Godot 为某些语言内置了复数规则。您也可以使用特殊的 `?pluralrule` 行自定义它们。请参阅相关文档获取示例和更多信息。[codeblock lang=text] en,?plural,fr,ru,zh,_Comment ?pluralrule,,nplurals=2; plural=(n >= 2);,,,Customize the plural rule for French There is %d apple,There are %d apples,Il y a %d pomme,Есть %d яблоко,那里有%d个苹果, ,,Il y a %d pommes,Есть %d яблока,, ,,,Есть %d яблок,, [/codeblock]

**属性（Props）：**
- compress: int = 1 —— 压缩
- delimiter: int = 0 —— 分隔符
- unescape_keys: bool = false —— 取消转义键
- unescape_translations: bool = true —— 取消转义翻译
