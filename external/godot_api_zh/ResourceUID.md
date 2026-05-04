## ResourceUID（资源UID） <- Object（对象）

资源 UID（唯一标识符）允许引擎在文件被重命名或移动时保持资源间的引用完整。可以通过 `uid://` 访问。ResourceUID 跟踪项目中所有已注册的资源 UID，生成新的 UID，并在其字符串和整数表示之间进行转换。

**方法（Methods）：**
- add_id(id: int, path: String) —— 添加ID
- create_id() -> int —— 创建ID
- create_id_for_path(path: String) -> int —— 为路径创建ID
- ensure_path(path_or_uid: String) -> String —— 确保路径
- get_id_path(id: int) -> String —— 获取ID路径
- has_id(id: int) -> bool —— 是否有ID
- id_to_text(id: int) -> String —— ID转文本
- path_to_uid(path: String) -> String —— 路径转UID
- remove_id(id: int) —— 移除ID
- set_id(id: int, path: String) —— 设置ID
- text_to_id(text_id: String) -> int —— 文本转ID
- uid_to_path(uid: String) -> String —— UID转路径

**枚举（Enums）：**
**常量（Constants）：** INVALID_ID=-1
