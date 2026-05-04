## TouchScreenButton（触摸屏按钮）<- Node2D（节点2D）

TouchScreenButton 允许您为触摸设备创建屏幕按钮。它用于游戏玩法目的，例如需要触摸才能移动的单位。与 Button 不同，TouchScreenButton 开箱即用地支持多点触控。多个 TouchScreenButton 可以同时通过触摸输入按下。此节点继承自 Node2D。与 Control 节点不同，您不能在它上面设置锚点。如果您想创建菜单或用户界面，建议改用 Button 节点。要使按钮节点响应触摸事件，可以在项目设置中启用 `ProjectSettings.input_devices/pointing/emulate_mouse_from_touch`。您可以将 TouchScreenButton 配置为仅在触摸设备上可见，帮助您同时为桌面和移动设备开发游戏。

**属性（Props）：**
- action: String = "" —— 动作
- bitmask: BitMap —— 位遮罩
- passby_press: bool = false —— 划过按下
- shape: Shape2D —— 形状
- shape_centered: bool = true —— 形状居中
- shape_visible: bool = true —— 形状可见
- texture_normal: Texture2D —— 正常状态纹理
- texture_pressed: Texture2D —— 按下状态纹理
- visibility_mode: int (TouchScreenButton.VisibilityMode) = 0 —— 可见性模式

**方法（Methods）：**
- is_pressed() -> bool —— 是否按下

**信号（Signals）：**
- pressed —— 按下
- released —— 释放

**枚举（Enums）：**
**VisibilityMode（可见性模式）：** VISIBILITY_ALWAYS=0（始终可见），VISIBILITY_TOUCHSCREEN_ONLY=1（仅触摸屏）
