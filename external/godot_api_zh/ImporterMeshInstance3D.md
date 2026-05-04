## ImporterMeshInstance3D（导入器网格实例3D） <- Node3D（节点3D）

**属性（Props）：**
- cast_shadow: int (GeometryInstance3D.ShadowCastingSetting) = 1 —— 投射阴影
- layer_mask: int = 1 —— 图层掩码
- mesh: ImporterMesh —— 网格
- skeleton_path: NodePath = NodePath("") —— 骨骼路径
- skin: Skin —— 皮肤
- visibility_range_begin: float = 0.0 —— 可见范围起点
- visibility_range_begin_margin: float = 0.0 —— 可见范围起点边距
- visibility_range_end: float = 0.0 —— 可见范围终点
- visibility_range_end_margin: float = 0.0 —— 可见范围终点边距
- visibility_range_fade_mode: int (GeometryInstance3D.VisibilityRangeFadeMode) = 0 —— 可见范围淡入淡出模式
