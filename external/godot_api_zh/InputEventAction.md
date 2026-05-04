## InputEventAction（输入事件动作） <- InputEvent（输入事件）

包含一个通用的动作，可以由多种类型的输入触发。动作及其事件可以在 **项目 > 项目设置** 的 **输入映射** 标签页中设置，或使用 InputMap 类。**注意：** 与其他映射到唯一物理事件的 InputEvent 子类不同，这个虚拟事件不由引擎发出。此类适用于使用 `Input.parse_input_event` 手动发出动作，然后动作会在 `Node._input` 中被接收。要检查物理事件是否匹配输入映射中的动作，请使用 `InputEvent.is_action` 和 `InputEvent.is_action_pressed`。

**属性（Props）：**
- action: StringName = &"" —— 动作名称
- event_index: int = -1 —— 事件索引
- pressed: bool = false —— 是否按下
- strength: float = 1.0 —— 强度
