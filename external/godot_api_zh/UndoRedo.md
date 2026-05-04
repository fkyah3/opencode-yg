## UndoRedo <- Object（对象）

UndoRedo 通过在"操作（actions）"中注册方法和属性变更来工作。你可以创建一个操作，然后使用方法调用和属性变更来提供执行和撤销该操作的方式，最后提交该操作。当操作被提交时，所有 `do_*` 方法都会执行。如果使用 `undo` 方法，`undo_*` 方法会执行。如果使用 `redo` 方法，则所有 `do_*` 方法再次执行。以下是添加操作的示例：在调用任何 `add_(un)do_*` 方法之前，需要先调用 `create_action`。之后需要调用 `commit_action`。如果不需要注册方法，可以省略 `add_do_method` 和 `add_undo_method`；属性同理。也可以注册多个方法/属性。如果你正在编写 EditorPlugin 并希望集成到编辑器的撤销历史中，请使用 EditorUndoRedoManager。如果注册了相互依赖的多个属性/方法，请注意默认情况下撤销操作会按添加顺序执行。因此，不要将执行操作与撤销操作分组在一起，而应将所有执行操作放在一侧，撤销操作放在另一侧。

**属性（Props）：**
- max_steps: int = 0 —— 最大步骤数

**方法（Methods）：**
- add_do_method(callable: Callable) —— 添加执行方法
- add_do_property(object: Object, property: StringName, value: Variant) —— 添加执行属性变更
- add_do_reference(object: Object) —— 添加执行引用
- add_undo_method(callable: Callable) —— 添加撤销方法
- add_undo_property(object: Object, property: StringName, value: Variant) —— 添加撤销属性变更
- add_undo_reference(object: Object) —— 添加撤销引用
- clear_history(increase_version: bool = true) —— 清除历史
- commit_action(execute: bool = true) —— 提交操作
- create_action(name: String, merge_mode: int = 0, backward_undo_ops: bool = false) —— 创建操作
- end_force_keep_in_merge_ends() —— 结束强制保持在合并末端
- get_action_name(id: int) -> String —— 获取操作名称
- get_current_action() -> int —— 获取当前操作
- get_current_action_name() -> String —— 获取当前操作名称
- get_history_count() -> int —— 获取历史计数
- get_version() -> int —— 获取版本
- has_redo() -> bool —— 是否有重做
- has_undo() -> bool —— 是否有撤销
- is_committing_action() -> bool —— 是否正在提交操作
- redo() -> bool —— 重做
- start_force_keep_in_merge_ends() —— 开始强制保持在合并末端
- undo() -> bool —— 撤销

**信号（Signals）：**
- version_changed —— 版本已变更

**枚举（Enums）：**
**MergeMode（合并模式）：** MERGE_DISABLE=0（禁用合并）, MERGE_ENDS=1（合并两端）, MERGE_ALL=2（合并全部）
