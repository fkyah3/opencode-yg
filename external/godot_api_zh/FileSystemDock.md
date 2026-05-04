## FileSystemDock（文件系统停靠面板） <- EditorDock（编辑器停靠面板）

此类仅在 EditorPlugin 中可用，且无法实例化。你可以通过 `EditorInterface.get_file_system_dock` 访问它。FileSystemDock 虽然不公开任何文件操作方法，但它可以监听各种与文件相关的信号。

**方法（Methods）：**
- add_resource_tooltip_plugin(plugin: EditorResourceTooltipPlugin) —— 添加资源工具提示插件
- navigate_to_path(path: String) —— 导航到路径
- remove_resource_tooltip_plugin(plugin: EditorResourceTooltipPlugin) —— 移除资源工具提示插件

**信号（Signals）：**
- display_mode_changed —— 显示模式改变
- file_removed(file: String) —— 文件已移除
- files_moved(old_file: String, new_file: String) —— 文件已移动
- folder_color_changed —— 文件夹颜色改变
- folder_moved(old_folder: String, new_folder: String) —— 文件夹已移动
- folder_removed(folder: String) —— 文件夹已移除
- inherit(file: String) —— 继承
- instantiate(files: PackedStringArray) —— 实例化
- resource_removed(resource: Resource) —— 资源已移除
- selection_changed —— 选择已改变
