## Tween <- RefCounted（引用计数）

Tween 主要用于需要在数值范围内插值的动画。名称 *tween* 来源于 *in-betweening*（补间动画），这是一种指定*关键帧*、由计算机插值中间帧的动画技术。用 Tween 做动画称为补间。对于无法预知最终值的动画，Tween 比 AnimationPlayer 更合适。例如，插值动态变化的相机缩放值最好使用 Tween；用 AnimationPlayer 节点实现同样功能会很困难。Tween 也比 AnimationPlayer 更轻量，非常适合简单动画或不需要编辑器可视化调整的通用任务。它们可以以"即用即弃"的方式处理一些通常由代码完成的逻辑。例如，你可以使用带延迟的循环 CallbackTweener 让某个物体周期性射击。Tween 可以通过 `SceneTree.create_tween` 或 `Node.create_tween` 创建。手动创建（即使用 `Tween.new()`）的 Tween 是无效的，不能用于补间值。补间动画通过向 Tween 对象添加 Tweener 来创建，使用 `tween_property`、`tween_interval`、`tween_callback` 或 `tween_method`。默认情况下，Tweener 按顺序依次执行。可以使用 `parallel` 和 `set_parallel` 改变此行为。使用 `tween_*` 方法创建 Tweener 时，可以通过链式方法调用调整该 Tweener 的属性。例如，要设置不同的过渡类型，可以使用 `set_trans`。大多数 Tween 方法也可以这样链式调用。以下示例中，Tween 绑定到运行脚本的节点，并为其 Tweener 设置了默认过渡。另一个重要用途是绑定到任意节点，这在异步调用和实例化场景中非常有用。**注意：** SceneTree.create_tween 创建的 Tween 会自动绑定自身，不需要手动调用 bind_node。**注意：** 在释放 Tween 引用时，Tween 不会自动停止。如果垃圾回收机制回收 Tween 时它仍在运行，补间将在后台线程继续执行。因此，在 Tween 上调用 `kill` 或让它在补间完成时自动销毁很重要。**注意：** 从被绑定节点的 `_ready` 调用的 Tween 会在该帧的 idle 阶段之前启动（即节点准备好的第一帧就能看到补间效果）。

**方法（Methods）：**
- bind_node(node: Node) -> Tween —— 绑定节点
- chain() -> Tween —— 链式执行
- custom_step(delta: float) -> bool —— 自定义步进
- get_loops_left() -> int —— 获取剩余循环次数
- get_total_elapsed_time() -> float —— 获取总耗时
- interpolate_value(initial_value: Variant, delta_value: Variant, elapsed_time: float, duration: float, trans_type: int, ease_type: int) -> Variant —— 插值计算值
- is_running() -> bool —— 是否运行中
- is_valid() -> bool —— 是否有效
- kill() —— 终止
- parallel() -> Tween —— 并行模式
- pause() —— 暂停
- play() —— 播放
- set_ease(ease: int) -> Tween —— 设置缓动类型
- set_ignore_time_scale(ignore: bool = true) -> Tween —— 忽略时间缩放
- set_loops(loops: int = 0) -> Tween —— 设置循环次数
- set_parallel(parallel: bool = true) -> Tween —— 设置并行模式
- set_pause_mode(mode: int) -> Tween —— 设置暂停模式
- set_process_mode(mode: int) -> Tween —— 设置处理模式
- set_speed_scale(speed: float) -> Tween —— 设置速度缩放
- set_trans(trans: int) -> Tween —— 设置过渡类型
- stop() —— 停止
- tween_callback(callback: Callable) -> CallbackTweener —— 创建回调补间
- tween_interval(time: float) -> IntervalTweener —— 创建间隔补间
- tween_method(method: Callable, from: Variant, to: Variant, duration: float) -> MethodTweener —— 创建方法补间
- tween_property(object: Object, property: NodePath, final_val: Variant, duration: float) -> PropertyTweener —— 创建属性补间
- tween_subtween(subtween: Tween) -> SubtweenTweener —— 创建子补间

**信号（Signals）：**
- finished —— 完成
- loop_finished(loop_count: int) —— 循环完成
- step_finished(idx: int) —— 步骤完成

**枚举（Enums）：**
**TweenProcessMode（补间处理模式）：** TWEEN_PROCESS_PHYSICS=0（物理帧）, TWEEN_PROCESS_IDLE=1（空闲帧）
**TweenPauseMode（补间暂停模式）：** TWEEN_PAUSE_BOUND=0（跟随节点）, TWEEN_PAUSE_STOP=1（暂停停止）, TWEEN_PAUSE_PROCESS=2（暂停继续处理）
**TransitionType（过渡类型）：** TRANS_LINEAR=0（线性）, TRANS_SINE=1（正弦）, TRANS_QUINT=2（五次）, TRANS_QUART=3（四次）, TRANS_QUAD=4（二次）, TRANS_EXPO=5（指数）, TRANS_ELASTIC=6（弹性）, TRANS_CUBIC=7（三次）, TRANS_CIRC=8（圆形）, TRANS_BOUNCE=9（弹跳）, ...
**EaseType（缓动类型）：** EASE_IN=0（缓入）, EASE_OUT=1（缓出）, EASE_IN_OUT=2（缓入缓出）, EASE_OUT_IN=3（缓出缓入）
