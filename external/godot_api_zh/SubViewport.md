## SubViewport（子视口）<- Viewport（视口）

SubViewport 将场景的矩形区域隔离出来独立显示。例如，可用于在 3D 空间中显示 UI。**注意：** SubViewport 是一个不是 Window 的 Viewport，即它本身不绘制任何内容。要显示内容，SubViewport 必须具有非零大小，并且要么放入 SubViewportContainer 中，要么分配给 ViewportTexture。**注意：** 默认情况下，InputEvents 不会传递给独立的 SubViewport。为确保 InputEvent 传播，可以将 SubViewport 放置在 SubViewportContainer 内部。

**属性（Props）：**
- render_target_clear_mode: int (SubViewport.ClearMode) = 0 —— 渲染目标清除模式
- render_target_update_mode: int (SubViewport.UpdateMode) = 2 —— 渲染目标更新模式
- size: Vector2i = Vector2i(512, 512) —— 大小
- size_2d_override: Vector2i = Vector2i(0, 0) —— 2D大小覆盖
- size_2d_override_stretch: bool = false —— 2D大小覆盖拉伸

**枚举（Enums）：**
**ClearMode（清除模式）：** CLEAR_MODE_ALWAYS=0（始终），CLEAR_MODE_NEVER=1（从不），CLEAR_MODE_ONCE=2（一次）
**UpdateMode（更新模式）：** UPDATE_DISABLED=0（禁用），UPDATE_ONCE=1（更新一次），UPDATE_WHEN_VISIBLE=2（可见时更新），UPDATE_WHEN_PARENT_VISIBLE=3（父级可见时更新），UPDATE_ALWAYS=4（始终更新）
