## ProceduralSkyMaterial（程序化天空材质） <- Material（材质）

ProceduralSkyMaterial 提供了一种通过定义太阳、天空和地面的程序化参数来快速创建有效背景的方法。天空和地面由主颜色、地平线颜色以及用于在它们之间插值的缓动曲线定义。太阳由天空中的位置、颜色以及缓动曲线结束处距太阳的最大角度来描述。因此，最大角度定义了天空中太阳的大小。ProceduralSkyMaterial 支持最多 4 个太阳，使用场景中前四个 DirectionalLight3D 节点的颜色、能量、方向和角距离。这意味着太阳由其对应 DirectionalLight3D 的属性单独定义，并由 `sun_angle_max` 和 `sun_curve` 全局定义。ProceduralSkyMaterial 使用轻量级着色器绘制天空，因此适合实时更新。这使其成为简单、计算成本低廉但不逼真的天空的绝佳选择。如果您需要更逼真的程序化选项，请使用 PhysicalSkyMaterial。

**属性（Props）：**
- energy_multiplier: float = 1.0 —— 能量倍数
- ground_bottom_color: Color = Color(0.2, 0.169, 0.133, 1) —— 地面底部颜色
- ground_curve: float = 0.02 —— 地面曲线
- ground_energy_multiplier: float = 1.0 —— 地面能量倍数
- ground_horizon_color: Color = Color(0.6463, 0.6558, 0.6708, 1) —— 地面地平线颜色
- sky_cover: Texture2D —— 天空覆盖纹理
- sky_cover_modulate: Color = Color(1, 1, 1, 1) —— 天空覆盖颜色调制
- sky_curve: float = 0.15 —— 天空曲线
- sky_energy_multiplier: float = 1.0 —— 天空能量倍数
- sky_horizon_color: Color = Color(0.6463, 0.6558, 0.6708, 1) —— 天空地平线颜色
- sky_top_color: Color = Color(0.385, 0.454, 0.55, 1) —— 天空顶部颜色
- sun_angle_max: float = 30.0 —— 太阳最大角度
- sun_curve: float = 0.15 —— 太阳曲线
- use_debanding: bool = true —— 使用去条带
