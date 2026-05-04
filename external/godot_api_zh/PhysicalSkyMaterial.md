## PhysicalSkyMaterial（物理天空材质） <- Material（材质）

PhysicalSkyMaterial 使用 Preetham 解析日光模型基于物理属性绘制天空。这会产生比 ProceduralSkyMaterial 更真实的天空，但速度稍慢且灵活性较低。PhysicalSkyMaterial 仅支持一个太阳。太阳的颜色、能量和方向取自场景树中的第一个 DirectionalLight3D。

**属性（Props）：**
- energy_multiplier: float = 1.0 —— 能量倍率
- ground_color: Color = Color(0.1, 0.07, 0.034, 1) —— 地面颜色
- mie_coefficient: float = 0.005 —— 米氏系数
- mie_color: Color = Color(0.69, 0.729, 0.812, 1) —— 米氏颜色
- mie_eccentricity: float = 0.8 —— 米氏离心率
- night_sky: Texture2D —— 夜空纹理
- rayleigh_coefficient: float = 2.0 —— 瑞利系数
- rayleigh_color: Color = Color(0.3, 0.405, 0.6, 1) —— 瑞利颜色
- sun_disk_scale: float = 1.0 —— 日盘缩放
- turbidity: float = 10.0 —— 浊度
- use_debanding: bool = true —— 使用去条带
