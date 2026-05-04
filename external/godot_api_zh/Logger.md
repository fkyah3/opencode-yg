## Logger（日志记录器）<- RefCounted（引用计数）

用于接收内部错误/警告流消息的自定义日志记录器。日志记录器通过 `OS.add_logger` 注册。

**枚举（Enums）：**
**ErrorType（错误类型）：** ERROR_TYPE_ERROR=0 —— 错误, ERROR_TYPE_WARNING=1 —— 警告, ERROR_TYPE_SCRIPT=2 —— 脚本错误, ERROR_TYPE_SHADER=3 —— 着色器错误
