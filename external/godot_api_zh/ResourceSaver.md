## ResourceSaver（资源保存器）<- Object（对象）

用于将资源类型保存到文件系统的单例。它使用引擎中注册的众多 ResourceFormatSaver 类（内置或来自插件）将资源数据保存为基于文本（如 `.tres` 或 `.tscn`）或二进制文件（如 `.res` 或 `.scn`）。

**方法（Methods）：**
- add_resource_format_saver(format_saver: ResourceFormatSaver, at_front: bool = false) —— 添加资源格式保存器
- get_recognized_extensions(type: Resource) -> PackedStringArray —— 获取可识别的扩展名
- get_resource_id_for_path(path: String, generate: bool = false) -> int —— 获取路径对应的资源 ID
- remove_resource_format_saver(format_saver: ResourceFormatSaver) —— 移除资源格式保存器
- save(resource: Resource, path: String = "", flags: int = 0) -> int —— 保存资源
- set_uid(resource: String, uid: int) -> int —— 设置资源 UID

**枚举（Enums）：**
**SaverFlags（保存器标志）：** FLAG_NONE=0 —— 无标志, FLAG_RELATIVE_PATHS=1 —— 相对路径, FLAG_BUNDLE_RESOURCES=2 —— 打包资源, FLAG_CHANGE_PATH=4 —— 更改路径, FLAG_OMIT_EDITOR_PROPERTIES=8 —— 省略编辑器属性, FLAG_SAVE_BIG_ENDIAN=16 —— 大端保存, FLAG_COMPRESS=32 —— 压缩, FLAG_REPLACE_SUBRESOURCE_PATHS=64 —— 替换子资源路径
