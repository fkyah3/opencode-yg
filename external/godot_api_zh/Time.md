## Time（时间）<- Object（对象）

Time 单例允许在不同格式之间转换时间，以及从系统获取时间信息。此类尽可能符合 ISO 8601 标准。所有日期遵循先儒略历（Proleptic Gregorian calendar）。因此，`1582-10-15` 的前一天是 `1582-10-14`，而不是 `1582-10-04`。公元 1 年（即公元前 1 年）的前一年是数字 `0`，再前一年（公元前 2 年）是 `-1`，依此类推。转换方法假定"相同时区"，不会自动处理时区转换或夏令时。闰秒也不处理，如果需要必须手动处理。诸如"Z"之类的后缀不处理，您需要手动去除它们。从系统获取时间信息时，时间可以是本地时区或 UTC，具体取决于 `utc` 参数。但是，`get_unix_time_from_system` 方法始终使用 UTC，因为它返回自  以来的秒数。**重要提示：** `_from_system` 方法使用用户可以手动设置的系统时钟。**切勿**将此方法用于精确时间计算，因为其结果受用户或操作系统的自动调整影响。**始终使用** `get_ticks_usec` 或 `get_ticks_msec` 进行精确时间计算，因为它们保证是单调的（即永不减少）。

**方法（Methods）：**
- get_date_dict_from_system(utc: bool = false) -> Dictionary —— 从系统获取日期字典
- get_date_dict_from_unix_time(unix_time_val: int) -> Dictionary —— 从Unix时间获取日期字典
- get_date_string_from_system(utc: bool = false) -> String —— 从系统获取日期字符串
- get_date_string_from_unix_time(unix_time_val: int) -> String —— 从Unix时间获取日期字符串
- get_datetime_dict_from_datetime_string(datetime: String, weekday: bool) -> Dictionary —— 从日期时间字符串获取日期时间字典
- get_datetime_dict_from_system(utc: bool = false) -> Dictionary —— 从系统获取日期时间字典
- get_datetime_dict_from_unix_time(unix_time_val: int) -> Dictionary —— 从Unix时间获取日期时间字典
- get_datetime_string_from_datetime_dict(datetime: Dictionary, use_space: bool) -> String —— 从日期时间字典获取日期时间字符串
- get_datetime_string_from_system(utc: bool = false, use_space: bool = false) -> String —— 从系统获取日期时间字符串
- get_datetime_string_from_unix_time(unix_time_val: int, use_space: bool = false) -> String —— 从Unix时间获取日期时间字符串
- get_offset_string_from_offset_minutes(offset_minutes: int) -> String —— 从偏移分钟数获取偏移字符串
- get_ticks_msec() -> int —— 获取毫秒滴答
- get_ticks_usec() -> int —— 获取微秒滴答
- get_time_dict_from_system(utc: bool = false) -> Dictionary —— 从系统获取时间字典
- get_time_dict_from_unix_time(unix_time_val: int) -> Dictionary —— 从Unix时间获取时间字典
- get_time_string_from_system(utc: bool = false) -> String —— 从系统获取时间字符串
- get_time_string_from_unix_time(unix_time_val: int) -> String —— 从Unix时间获取时间字符串
- get_time_zone_from_system() -> Dictionary —— 从系统获取时区
- get_unix_time_from_datetime_dict(datetime: Dictionary) -> int —— 从日期时间字典获取Unix时间
- get_unix_time_from_datetime_string(datetime: String) -> int —— 从日期时间字符串获取Unix时间
- get_unix_time_from_system() -> float —— 从系统获取Unix时间

**枚举（Enums）：**
**Month（月份）：** MONTH_JANUARY=1（一月），MONTH_FEBRUARY=2（二月），MONTH_MARCH=3（三月），MONTH_APRIL=4（四月），MONTH_MAY=5（五月），MONTH_JUNE=6（六月），MONTH_JULY=7（七月），MONTH_AUGUST=8（八月），MONTH_SEPTEMBER=9（九月），MONTH_OCTOBER=10（十月），...
**Weekday（星期）：** WEEKDAY_SUNDAY=0（星期日），WEEKDAY_MONDAY=1（星期一），WEEKDAY_TUESDAY=2（星期二），WEEKDAY_WEDNESDAY=3（星期三），WEEKDAY_THURSDAY=4（星期四），WEEKDAY_FRIDAY=5（星期五），WEEKDAY_SATURDAY=6（星期六）
