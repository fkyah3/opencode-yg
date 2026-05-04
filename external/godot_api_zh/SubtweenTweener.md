## SubtweenTweener（子补间动画器） <- Tweener（补间动画器）

SubtweenTweener 用于在另一个 Tween 定义的序列中，将某个 Tween 作为一个步骤执行。更多用法信息请参见 `Tween.tween_subtween`。**注意：**`Tween.tween_subtween` 是创建 SubtweenTweener 的唯一正确方式。手动创建的 SubtweenTweener 无法正常工作。

**方法（Methods）：**
- set_delay(delay: float) -> SubtweenTweener —— 设置延迟
