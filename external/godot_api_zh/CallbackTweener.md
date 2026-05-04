## CallbackTweener（回调补间器） <- Tweener（补间器）

CallbackTweener 用于在补间序列中调用方法。更多使用信息请参阅 `Tween.tween_callback`。如果回调的目标对象被释放，补间器将自动完成。**注意：** `Tween.tween_callback` 是创建 CallbackTweener 的唯一正确方式。手动创建的任何 CallbackTweener 将无法正常工作。

**方法（Methods）：**
- set_delay(delay: float) -> CallbackTweener —— 设置延迟
