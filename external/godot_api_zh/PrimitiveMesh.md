## PrimitiveMesh（基本体网格） <- Mesh（网格）

所有基本体网格的基类。处理将 Material 应用到基本体网格。示例包括 BoxMesh、CapsuleMesh、CylinderMesh、PlaneMesh、PrismMesh 和 SphereMesh。

**属性（Props）：**
- add_uv2: bool = false —— 是否添加 UV2
- custom_aabb: AABB = AABB(0, 0, 0, 0, 0, 0) —— 自定义 AABB
- flip_faces: bool = false —— 是否翻转面
- material: Material —— 材质
- uv2_padding: float = 2.0 —— UV2 填充

**方法（Methods）：**
- get_mesh_arrays() -> Array —— 获取网格数组
- request_update() —— 请求更新
