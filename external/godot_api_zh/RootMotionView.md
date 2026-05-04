## RootMotionView（根运动视图） <- VisualInstance3D（可视实例3D）

*根运动*指的是一种动画技术，使用网格的骨骼为角色提供冲量。在处理3D动画时，一种流行的方法是让动画师使用根骨骼骨来带动其余骨骼的运动。这样可以在动画中让脚步与实际地面匹配，还允许在过场动画中与物体进行精确交互。另请参见 AnimationMixer。**注意：** RootMotionView 仅在编辑器中可见，在运行项目中会自动隐藏。

**属性（Props）：**
- animation_path: NodePath = NodePath("") —— 动画路径
- cell_size: float = 1.0 —— 单元格大小
- color: Color = Color(0.5, 0.5, 1, 1) —— 颜色
- radius: float = 10.0 —— 半径
- zero_y: bool = true —— Y轴归零
