## InputEventMIDI <- InputEvent（输入事件）

InputEventMIDI 存储来自 MIDI（乐器数字接口）设备消息的信息。这些设备可能包括电子键盘、合成器和鼓机。MIDI 消息可以通过 5 针 MIDI 接口或 USB 接收。如果您的设备支持两者，请务必检查设备设置以确认使用的是哪种输出。默认情况下，Godot 不会检测 MIDI 设备。您需要先调用 `OS.open_midi_inputs`。您可以使用 `OS.get_connected_midi_inputs` 检查检测到的设备，并使用 `OS.close_midi_inputs` 关闭连接。**注意：** Godot 不支持 MIDI 输出，因此无法从 Godot 发出 MIDI 消息。仅支持 MIDI 输入。**注意：** 在 Web 平台上，使用 MIDI 输入需要先授予浏览器权限。该权限请求在调用 `OS.open_midi_inputs` 时执行。在用户接受权限请求之前，MIDI 输入将无法工作。

**属性（Props）：**
- channel: int = 0
- controller_number: int = 0
- controller_value: int = 0
- instrument: int = 0
- message: int (MIDIMessage) = 0
- pitch: int = 0
- pressure: int = 0
- velocity: int = 0
