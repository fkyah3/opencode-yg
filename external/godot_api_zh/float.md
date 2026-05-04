## float（浮点数）

[float] 内置类型是一个 64 位双精度浮点数，相当于 C++ 中的 `double`。此类型有 14 位可靠的十进制精度。[float] 的最大值约为 `1.79769e308`，最小值约为 `-1.79769e308`。引擎中的许多方法和属性使用 32 位单精度浮点数，相当于 C++ 中的 [code skip-lint]float[/code]，它们有 6 位可靠的十进制精度。对于 Vector2 和 Vector3 等数据结构，Godot 默认使用 32 位浮点数，但如果使用 `precision=double` 选项编译 Godot，则可以改为使用 64 位双精度数。使用 [float] 类型进行的数学运算不能保证精确，通常会产生微小误差。在比较 [float] 值的相等性时，通常应使用 `@GlobalScope.is_equal_approx` 和 `@GlobalScope.is_zero_approx` 方法，而不是 `==`。**注意：** 在布尔上下文中，如果 [float] 恰好等于 `0.0`，则求值为 `false`，否则为 `true`。
