## VoxelGI <- VisualInstance3D（可视化实例3D）

VoxelGI 用于为场景提供高质量的实时间接光和反射。它预计算发光物体的效果和静态几何体的行为，以实时模拟复杂光照的行为。VoxelGI 需要先烘焙才能产生可见效果。然而，一旦烘焙完成，动态对象将接收来自它的光照。此外，灯光可以是完全动态的或烘焙的。**注意：** VoxelGI 仅在 Forward+ 渲染方法中受支持，不支持 Mobile 或 Compatibility。**程序化生成：** VoxelGI 可以在导出的项目中进行烘焙，这使其适用于程序化生成或用户构建的关卡，只要所有几何体都是预先生成的。对于在游戏过程中随时生成几何体的游戏，SDFGI 更合适（参见 `Environment.sdfgi_enabled`）。**性能：** VoxelGI 对 GPU 的要求相对较高，不适合低端硬件（如集成显卡，请考虑 LightmapGI）。要提高性能，请在项目设置中调整 `ProjectSettings.rendering/global_illumination/voxel_gi/quality` 并启用 `ProjectSettings.rendering/global_illumination/gi/use_half_resolution`。为了给低端硬件提供备选方案，请考虑在项目选项菜单中添加禁用 VoxelGI 的选项。VoxelGI 节点可以通过隐藏来禁用。**注意：** 网格应具有足够厚的墙壁以避免漏光（避免单面墙壁）。对于室内关卡，请使用足够大的盒子包围关卡几何体，并桥接循环以闭合网格。为进一步防止漏光，还可以策略性地放置临时 MeshInstance3D 节点，将其 `GeometryInstance3D.gi_mode` 设置为 `GeometryInstance3D.GI_MODE_STATIC`。然后可以在烘焙 VoxelGI 节点后隐藏这些临时节点。

**属性（Props）：**
- camera_attributes: CameraAttributes —— 相机属性
- data: VoxelGIData —— 体素GI数据
- size: Vector3 = Vector3(20, 20, 20) —— 大小
- subdiv: int (VoxelGI.Subdiv) = 1 —— 细分

**方法（Methods）：**
- bake(from_node: Node = null, create_visual_debug: bool = false) —— 烘焙
- debug_bake() —— 调试烘焙

**枚举（Enums）：**
**Subdiv（细分）：** SUBDIV_64=0（64）, SUBDIV_128=1（128）, SUBDIV_256=2（256）, SUBDIV_512=3（512）, SUBDIV_MAX=4（最大值）
