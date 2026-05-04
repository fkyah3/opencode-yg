## World3D（3D世界） <- Resource（资源）

包含世界所有相关要素的类：物理空间、视觉场景和声音空间。3D 节点将其资源注册到当前的 3D 世界中。

**属性（Props）：**
- camera_attributes: CameraAttributes —— 摄像机属性
- direct_space_state: PhysicsDirectSpaceState3D —— 直接空间状态
- environment: Environment —— 环境
- fallback_environment: Environment —— 后备环境
- navigation_map: RID —— 导航地图
- scenario: RID —— 场景
- space: RID —— 空间
