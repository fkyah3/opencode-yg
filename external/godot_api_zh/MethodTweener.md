## MethodTweener（方法补间器）<- Tweener（补间器）

MethodTweener 类似于 CallbackTweener 和 PropertyTweener 的组合。它调用一个方法，将插值后的值作为参数传递。更多使用信息请参见 `Tween.tween_method`。如果回调的目标对象被释放，补间器将自动完成。**注意：** `Tween.tween_method` 是创建 MethodTweener 的唯一正确方式。手动创建的 MethodTweener 将无法正常工作。

**方法（Methods）：**
- set_delay(delay: float) -> MethodTweener —— 设置延迟
- set_ease(ease: int) -> MethodTweener —— 设置缓动类型
- set_trans(trans: int) -> MethodTweener —— 设置过渡类型
