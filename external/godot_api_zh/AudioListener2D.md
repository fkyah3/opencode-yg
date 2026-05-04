## AudioListener2D（音频监听器2D） <- Node2D（节点2D）

一旦添加到场景树并使用 `make_current` 启用，此节点将覆盖声音的听到位置。同一时间只能有一个 AudioListener2D 为当前状态。使用 `make_current` 将禁用之前的 AudioListener2D。如果当前视口没有活动的 AudioListener2D，则使用屏幕中心作为音频的听点。AudioListener2D 需要位于 SceneTree 内才能正常工作。

**Methods（方法）：**
- clear_current() —— 清除当前状态
- is_current() -> bool —— 是否为当前监听器
- make_current() —— 设为当前监听器
