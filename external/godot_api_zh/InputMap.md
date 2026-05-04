## InputMap <- Object（对象）

管理所有 InputEventAction（输入事件动作），这些动作可以从项目设置菜单 **项目 > 项目设置 > 输入映射** 或在代码中使用 `add_action` 和 `action_add_event` 创建/修改。参见 `Node._input`。

**方法（Methods）：**
- action_add_event(action: StringName, event: InputEvent)
- action_erase_event(action: StringName, event: InputEvent)
- action_erase_events(action: StringName)
- action_get_deadzone(action: StringName) -> float
- action_get_events(action: StringName) -> InputEvent[]
- action_has_event(action: StringName, event: InputEvent) -> bool
- action_set_deadzone(action: StringName, deadzone: float)
- add_action(action: StringName, deadzone: float = 0.2)
- erase_action(action: StringName)
- event_is_action(event: InputEvent, action: StringName, exact_match: bool = false) -> bool
- get_action_description(action: StringName) -> String
- get_actions() -> StringName[]
- has_action(action: StringName) -> bool
- load_from_project_settings()
