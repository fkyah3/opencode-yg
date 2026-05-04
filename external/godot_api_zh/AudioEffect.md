## AudioEffect（音频效果）<- Resource（资源）

所有音频效果的基类资源。在编辑器中，可以通过音频面板将音频效果添加到当前总线布局中。在运行时，也可以通过 `AudioServer.add_bus_effect`、`AudioServer.remove_bus_effect` 和 `AudioServer.get_bus_effect` 操作音频效果。当应用于总线时，音频效果会创建对应的 AudioEffectInstance。该实例基于原始音频效果的属性直接负责操控声音。
