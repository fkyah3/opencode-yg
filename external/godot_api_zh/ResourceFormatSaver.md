## ResourceFormatSaver（资源格式保存器） <- RefCounted（引用计数）

当你在编辑器中保存资源，或使用 ResourceSaver 单例时，引擎可以保存资源。这是通过多个 ResourceFormatSaver 实现的，每个处理自己的格式并由引擎自动调用。默认情况下，Godot 将资源保存为 `.tres`（基于文本）、`.res`（二进制）或其他内置格式，但你可以选择通过扩展此类来创建自己的格式。请务必遵守文档中指定的返回类型和值。你应该使用 `class_name` 为其指定全局类名以便注册。与内置的 ResourceFormatSaver 一样，它在保存其识别的类型的资源时会被自动调用。你也可以实现一个 ResourceFormatLoader。
