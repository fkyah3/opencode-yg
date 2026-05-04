## InputEventMagnifyGesture（放大手势输入事件） <- InputEventGesture（手势输入事件）

存储放大触摸手势的缩放因子。通常由用户在触摸屏上捏合时触发，用于放大/缩小。**注意：**在 Android 上，需要启用 `ProjectSettings.input_devices/pointing/android/enable_pan_and_scale_gestures` 项目设置。

**属性（Props）：**
- factor: float = 1.0 —— 缩放因子
