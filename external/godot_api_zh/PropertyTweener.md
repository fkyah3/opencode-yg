## PropertyTweener（属性补间器） <- Tweener（补间器）

PropertyTweener 用于对对象的属性进行插值。更多使用信息请参见 `Tween.tween_property`。如果目标对象被释放，补间器将自动完成。**注意：** `Tween.tween_property` 是创建 PropertyTweener 的唯一正确方式。任何手动创建的 PropertyTweener 都无法正常工作。

**方法（Methods）：**
- as_relative() -> PropertyTweener —— 设为相对值
- from(value: Variant) -> PropertyTweener —— 设置起始值
- from_current() -> PropertyTweener —— 从当前值开始
- set_custom_interpolator(interpolator_method: Callable) -> PropertyTweener —— 设置自定义插值器
- set_delay(delay: float) -> PropertyTweener —— 设置延迟
- set_ease(ease: int) -> PropertyTweener —— 设置缓动类型
- set_trans(trans: int) -> PropertyTweener —— 设置过渡类型
