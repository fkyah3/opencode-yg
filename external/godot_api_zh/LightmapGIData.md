## LightmapGIData（光照贴图 GI 数据） <- Resource（资源）

LightmapGIData 包含用于 LightmapGI 的烘焙光照贴图和动态对象探针数据。每次在 LightmapGI 中烘焙光照贴图时都会被替换。

**属性（Props）：**
- light_texture: TextureLayered —— 光照纹理
- lightmap_textures: TextureLayered[] = [] —— 光照贴图纹理数组
- shadowmask_textures: TextureLayered[] = [] —— 阴影遮罩纹理数组

**方法（Methods）：**
- add_user(path: NodePath, uv_scale: Rect2, slice_index: int, sub_instance: int) —— 添加用户
- clear_users() —— 清除所有用户
- get_user_count() -> int —— 获取用户数量
- get_user_path(user_idx: int) -> NodePath —— 获取用户路径
- is_using_spherical_harmonics() -> bool —— 是否使用球谐函数
- set_uses_spherical_harmonics(uses_spherical_harmonics: bool) —— 设置是否使用球谐函数

**枚举（Enums）：**
**ShadowmaskMode（阴影遮罩模式）：** SHADOWMASK_MODE_NONE=0 —— 无, SHADOWMASK_MODE_REPLACE=1 —— 替换, SHADOWMASK_MODE_OVERLAY=2 —— 叠加
