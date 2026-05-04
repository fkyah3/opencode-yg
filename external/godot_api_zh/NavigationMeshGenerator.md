## NavigationMeshGenerator（导航网格生成器）<- Object（对象）

此类负责创建和清除 3D 导航网格，这些网格用作 NavigationRegion3D 中的 NavigationMesh 资源。NavigationMeshGenerator 在 2D 中几乎没有用途，因为导航网格烘焙过程期望处理 3D 节点类型和 3D 源几何体。整个导航网格烘焙最好在单独的线程中进行，因为涉及的体素化、碰撞测试和网格优化步骤是非常慢且性能密集型的操作。导航网格烘焙分多个步骤进行，结果取决于 3D 源几何体和 NavigationMesh 资源的属性。第一步，从根节点开始，根据 NavigationMesh 属性从 SceneTree 中收集所有有效的 3D 源几何体节点。第二步，解析所有收集到的节点以提取其相关的 3D 几何数据，并构建一个组合的 3D 网格。由于可解析对象的类型众多——从普通的 MeshInstance3D 到 CSGShape3D 或各种 CollisionObject3D——收集几何数据的一些操作可能触发 RenderingServer 和 PhysicsServer3D 的同步。服务器同步可能对烘焙时间或帧率产生负面影响，因为它通常涉及 Mutex 锁定以确保线程安全。大量的可解析对象以及与其它线程化服务器的持续同步会显著增加烘焙时间。另一方面，少数但非常大且复杂的对象需要一些时间准备供服务器使用，这可能会明显延迟下一帧的渲染。作为一般规则，应平衡可解析对象的总数及其各自的规模和复杂度，以避免帧率问题或过长的烘焙时间。然后，组合后的网格被传递给 Recast Navigation Object，通过在网格包围区域周围创建体素世界来测试源几何体是否适合 NavigationMesh 代理属性的可通行地形。最终的导航网格被返回并存储在 NavigationMesh 资源中。

**方法（Methods）：**
- bake(navigation_mesh: NavigationMesh, root_node: Node) —— 烘焙导航网格
- bake_from_source_geometry_data(navigation_mesh: NavigationMesh, source_geometry_data: NavigationMeshSourceGeometryData3D, callback: Callable = Callable()) —— 从源几何数据烘焙导航网格
- clear(navigation_mesh: NavigationMesh) —— 清除导航网格
- parse_source_geometry_data(navigation_mesh: NavigationMesh, source_geometry_data: NavigationMeshSourceGeometryData3D, root_node: Node, callback: Callable = Callable()) —— 解析源几何数据
