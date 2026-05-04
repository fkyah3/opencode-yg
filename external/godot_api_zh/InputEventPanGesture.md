## InputEventPanGesture（平移手势输入事件） <- InputEventGesture（手势输入事件）

存储关于平移手势的信息。平移手势由用户在触摸屏上双指滑动时触发，通常用于平移/滚动。**注意：**在 Android 上，需要启用 `ProjectSettings.input_devices/pointing/android/enable_pan_and_scale_gestures` 项目设置。

**属性（Props）：**
- delta: Vector2 = Vector2(0, 0) —— 平移增量
