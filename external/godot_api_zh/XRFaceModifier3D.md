## XRFaceModifier3D（XR面部修改器3D） <- Node3D（3D节点）

此节点将 XRFaceTracker 的权重应用到具有面部混合形状支持的网格上。支持标准混合形状，以及 ARKit 和 SRanipal 混合形状。节点会尝试基于名称匹配来识别混合形状。混合形状的名称应与图表中列出的名称匹配。

**属性（Props）：**
- face_tracker: StringName = &"/user/face_tracker" —— 面部追踪器路径
- target: NodePath = NodePath("") —— 目标节点路径
