## AudioEffectInstance（音频效果实例） <- RefCounted（引用计数）

音频效果实例用于操控特定效果接收到的音频。当 AudioEffect 被添加到总线时，引擎会自动创建此实例，通常不应直接创建。如有需要，可在运行时通过 `AudioServer.get_bus_effect_instance` 获取。
