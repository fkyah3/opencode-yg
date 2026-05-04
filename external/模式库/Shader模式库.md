# Shader 模式库

> **按视觉风格分类的 Shader 实现范例** - 每个模式包含：效果描述、Shader代码、使用场景、参数说明
> 
> **目标**：快速实现游戏视觉风格（CRT扫描线、原子朋克、像素艺术等）
> **适用**：AI助手、美术技术、视觉效果实现参考
> **最后更新**：2026-04-20

---

## 1. UI 效果 Shader

### 1.1 按钮状态反馈（亮度调节）
- **效果**：按钮悬停时提亮，按下时压暗，提供视觉反馈
- **使用场景**：所有交互式按钮、图标、可点击元素
- **Shader 代码**：
  ```gdshader
  // button_state.gdshader
  shader_type canvas_item;
  
  // 亮度调节参数：0.0=全黑，1.0=原色，2.0=两倍亮
  uniform float brightness : hint_range(0.0, 2.0) = 1.0;
  
  void fragment() {
      COLOR = texture(TEXTURE, UV);
      COLOR.rgb *= brightness;
  }
  ```
- **GDScript 控制示例**：
  ```gdscript
  extends TextureButton
  
  func _ready():
      mouse_entered.connect(_on_mouse_entered)
      mouse_exited.connect(_on_mouse_exited)
      button_down.connect(_on_button_down)
      button_up.connect(_on_button_up)
  
  func _on_mouse_entered():
      $Sprite2D.material.set_shader_parameter("brightness", 1.2)
  
  func _on_mouse_exited():
      $Sprite2D.material.set_shader_parameter("brightness", 1.0)
  
  func _on_button_down():
      $Sprite2D.material.set_shader_parameter("brightness", 0.8)
  
  func _on_button_up():
      if is_hovered():
          $Sprite2D.material.set_shader_parameter("brightness", 1.2)
      else:
          $Sprite2D.material.set_shader_parameter("brightness", 1.0)
  ```
- **参数说明**：
  - `brightness`：亮度乘数，建议值：默认=1.0，悬停=1.2，按下=0.8
- **参考文件**：`game/core/scene/channel/button_state.gdshader`

### 1.2 高亮边框/发光效果
- **效果**：元素周围添加发光边框，用于选中状态、重要提示
- **使用场景**：选中物品、任务目标、警告提示
- **Shader 代码**：
  ```gdshader
  shader_type canvas_item;
  render_mode unshaded;
  
  uniform vec4 glow_color : source_color = vec4(1.0, 0.8, 0.2, 1.0);
  uniform float glow_width : hint_range(0.0, 0.1) = 0.02;
  uniform float glow_intensity : hint_range(0.0, 2.0) = 1.0;
  
  void fragment() {
      vec4 tex_color = texture(TEXTURE, UV);
      
      // 计算边缘检测
      float edge = 0.0;
      vec2 pixel_size = 1.0 / TEXTURE_PIXEL_SIZE;
      
      // 采样周围像素
      float left = texture(TEXTURE, UV + vec2(-pixel_size.x, 0.0)).a;
      float right = texture(TEXTURE, UV + vec2(pixel_size.x, 0.0)).a;
      float top = texture(TEXTURE, UV + vec2(0.0, -pixel_size.y)).a;
      float bottom = texture(TEXTURE, UV + vec2(0.0, pixel_size.y)).a;
      
      // 当前像素透明但周围有内容 = 边缘
      if (tex_color.a < 0.5 && (left > 0.5 || right > 0.5 || top > 0.5 || bottom > 0.5)) {
          edge = 1.0;
      }
      
      // 混合原纹理和发光边缘
      vec3 final_color = mix(tex_color.rgb, glow_color.rgb, edge * glow_intensity);
      float final_alpha = max(tex_color.a, edge * glow_color.a);
      
      COLOR = vec4(final_color, final_alpha);
  }
  ```
- **使用技巧**：
  - 动态改变 `glow_color` 实现颜色变化（红色=警告，绿色=可用，黄色=选中）
  - 结合 `TIME` 变量实现脉动效果：`sin(TIME * 2.0) * 0.5 + 0.5`

---

## 2. 屏幕后处理效果

### 2.1 CRT 扫描线效果
- **效果**：模拟老式CRT显示器的扫描线、轻微弯曲、荧光余晖
- **使用场景**：全屏后处理，营造复古科幻氛围
- **Shader 代码**：
  ```gdshader
  shader_type canvas_item;
  
  // CRT 效果参数
  uniform float scanline_intensity : hint_range(0.0, 1.0) = 0.3;
  uniform float scanline_count : hint_range(100.0, 1000.0) = 480.0;
  uniform float curvature : hint_range(0.0, 0.1) = 0.02;
  uniform float vignette : hint_range(0.0, 1.0) = 0.3;
  uniform float chroma_aberration : hint_range(0.0, 0.01) = 0.002;
  
  void fragment() {
      // 弯曲变形（桶形畸变）
      vec2 uv = SCREEN_UV - 0.5;
      float dist = length(uv);
      uv *= 1.0 + curvature * dist * dist;
      uv += 0.5;
      
      // 色差效果
      float r = texture(SCREEN_TEXTURE, uv + vec2(chroma_aberration, 0.0)).r;
      float g = texture(SCREEN_TEXTURE, uv).g;
      float b = texture(SCREEN_TEXTURE, uv - vec2(chroma_aberration, 0.0)).b;
      
      // 扫描线
      float scanline = sin(uv.y * scanline_count * 3.14159);
      scanline = (scanline * 0.5 + 0.5) * scanline_intensity + (1.0 - scanline_intensity);
      
      // 晕影（四角暗角）
      vec2 from_center = uv - 0.5;
      float vignette_factor = 1.0 - length(from_center) * vignette;
      
      // 最终颜色
      vec3 color = vec3(r, g, b);
      color *= scanline * vignette_factor;
      
      COLOR = vec4(color, 1.0);
  }
  ```
- **参数说明**：
  - `scanline_intensity`：扫描线强度，0=无，1=强烈
  - `scanline_count`：扫描线数量，匹配屏幕分辨率（480=NTSC，576=PAL）
  - `curvature`：屏幕弯曲程度，模拟CRT球面
  - `vignette`：四角暗角强度
  - `chroma_aberration`：色差偏移量
- **优化建议**：
  - 在性能敏感场景降低 `scanline_count`
  - 动态调整强度：战斗时降低，菜单时增强

### 2.2 像素网格交换效果
- **效果**：将图像分割为网格，随时间随机交换非空网格，创造 glitch 效果
- **使用场景**：故障艺术、系统错误、黑客入侵视觉效果
- **Shader 代码**：（简化版，完整见参考文件）
  ```gdshader
  shader_type canvas_item;
  
  uniform vec2 grid_count = vec2(16.0, 16.0);     // 网格数量
  uniform float swap_probability = 0.3;           // 交换概率
  uniform float time_factor = 15.0;               // 时间因子
  
  // 哈希函数生成伪随机数
  float hash(vec2 p) {
      p = fract(p * vec2(123.34, 345.45));
      p += dot(p, p + 34.345);
      return fract(p.x * p.y);
  }
  
  void fragment() {
      vec2 grid_size = 1.0 / grid_count;
      vec2 grid_key = floor(SCREEN_UV / grid_size);
      
      // 基于时间和位置生成随机数
      int time_seed = int(mod(time_factor * TIME, 64.0));
      float rand = hash(grid_key + vec2(float(time_seed), 0.0));
      
      // 决定是否交换
      if (rand < swap_probability) {
          // 查找交换目标（简化版：随机偏移）
          vec2 offset = vec2(hash(grid_key + vec2(1.23, 0.0)), 
                           hash(grid_key + vec2(0.0, 4.56))) * 2.0 - 1.0;
          vec2 target_key = mod(grid_key + offset * 3.0, grid_count);
          
          // 计算目标UV
          vec2 local_uv = fract(SCREEN_UV / grid_size);
          vec2 target_uv = target_key * grid_size + local_uv;
          
          COLOR = texture(TEXTURE, target_uv);
      } else {
          COLOR = texture(TEXTURE, SCREEN_UV);
      }
  }
  ```
- **完整实现**：参考文件中的完整版本包含：
  - 只交换包含非透明像素的网格
  - 边框高亮显示交换的网格
  - 最大尝试次数限制性能
- **参数说明**：
  - `grid_count`：网格划分，值越小网格越大
  - `swap_probability`：每帧网格交换概率
  - `time_factor`：交换速度
- **参考文件**：`game/assets/shader/pixel_grid_swap.gdshader`（145行完整实现）

### 2.3 色差/扭曲效果
- **效果**：RGB通道轻微偏移，模拟镜头色差或故障效果
- **使用场景**：能量冲击、魔法效果、系统过载
- **Shader 代码**：
  ```gdshader
  // distortion.gdshader
  shader_type canvas_item;
  
  uniform sampler2D SCREEN_TEXTURE : hint_screen_texture, filter_linear_mipmap;
  
  instance uniform vec2 offset_r;
  instance uniform vec2 offset_g;
  instance uniform vec2 offset_b;
  
  void fragment() {
      COLOR = vec4(
          texture(SCREEN_TEXTURE, SCREEN_UV + SCREEN_PIXEL_SIZE * offset_r).r,
          texture(SCREEN_TEXTURE, SCREEN_UV + SCREEN_PIXEL_SIZE * offset_g).g,
          texture(SCREEN_TEXTURE, SCREEN_UV + SCREEN_PIXEL_SIZE * offset_b).b,
          1.0);
  }
  ```
- **参数说明**：
  - `offset_r`, `offset_g`, `offset_b`：各通道的像素偏移量
  - 典型值：`offset_r = vec2(2.0, 0.0)`, `offset_g = vec2(0.0, 0.0)`, `offset_b = vec2(-2.0, 0.0)`
- **动态效果**：
  ```gdscript
  # 随时间变化的色差
  func _process(delta):
      var t = sin(TIME * 3.0) * 2.0
      material.set_shader_parameter("offset_r", Vector2(t, 0))
      material.set_shader_parameter("offset_g", Vector2(0, 0))
      material.set_shader_parameter("offset_b", Vector2(-t, 0))
  ```
- **参考文件**：`game/assets/shader/distortion.gdshader`

### 2.4 屏幕模糊效果
- **效果**：高斯模糊，可调节强度
- **使用场景**：背景模糊（对话框弹出时）、速度线、眩晕效果
- **Shader 代码**：
  ```gdshader
  // blur.gdshader
  shader_type canvas_item;
  render_mode unshaded;
  
  uniform sampler2D screen_texture : source_color, hint_screen_texture, filter_linear_mipmap, repeat_disable;
  instance uniform float strength : hint_range(0.0, 8.0) = 0.0;
  
  void fragment() {
      COLOR = textureLod(screen_texture, SCREEN_UV, strength);
  }
  ```
- **参数说明**：
  - `strength`：模糊强度，0=无模糊，8=最强模糊
  - Godot 的 `textureLod` 自动处理多级纹理模糊
- **性能注意**：
  - 此shader使用硬件支持的mipmap模糊，性能较好
  - 对于大范围模糊，考虑降低分辨率渲染
- **参考文件**：`game/assets/shader/blur.gdshader`

---

## 3. 3D 空间效果

### 3.1 地面雾效
- **效果**：基于高度的雾效，模拟地面薄雾、毒气、能量场
- **使用场景**：场景氛围、区域效果、视觉引导
- **Shader 代码**：
  ```gdshader
  // ground_fog.gdshader
  shader_type spatial;
  render_mode unshaded, depth_test_disabled;
  
  uniform sampler2D screen_texture : hint_screen_texture, filter_linear_mipmap;
  uniform sampler2D depth_texture : hint_depth_texture, filter_linear_mipmap;
  uniform sampler2D fog_noise_1: filter_linear_mipmap, repeat_enable;
  uniform sampler2D fog_noise_2: filter_linear_mipmap, repeat_enable;
  uniform vec4 fog_color: source_color;
  
  void fragment() {
      // 深度重建世界位置
      float depth = texture(depth_texture, SCREEN_UV).x;
      vec3 ndc = vec3(SCREEN_UV * 2.0 - 1.0, depth);
      vec4 view = INV_PROJECTION_MATRIX * vec4(ndc, 1.0);
      view.xyz /= view.w;
      vec4 world = INV_VIEW_MATRIX * INV_PROJECTION_MATRIX * vec4(ndc, 1.0);
      vec3 world_position = world.xyz / world.w;
      
      // 基于噪声纹理的雾密度
      float fog_alpha = texture(fog_noise_1, 0.01 * world_position.xz + vec2(0.0, 0.035 * TIME)).x;
      fog_alpha *= texture(fog_noise_2, 0.01 * world_position.xz + vec2(0.0, 0.01 * TIME)).x;
      
      // 高度衰减（接近地面时雾更浓）
      float height_factor = smoothstep(0.5, -0.0, world_position.y);
      
      ALBEDO = fog_color.rgb;
      ALPHA = height_factor * fog_color.a * fog_alpha;
  }
  ```
- **参数说明**：
  - `fog_color`：雾的颜色和基础透明度
  - `fog_noise_1`, `fog_noise_2`：噪声纹理，创造不均匀的雾效
  - 噪声纹理移动 (`0.035 * TIME`, `0.01 * TIME`) 创造飘动效果
- **使用技巧**：
  - 使用不同颜色的雾区分区域（绿色=毒气，蓝色=冷气，红色=岩浆蒸汽）
  - 调整 `0.01` 系数改变噪声缩放，值越小雾越均匀
- **参考文件**：`game/assets/shader/ground_fog.gdshader`

### 3.2 云阴影效果
- **效果**：动态云层阴影投射到地面
- **使用场景**：室外场景、天空盒补充、动态光照变化
- **Shader 代码**：
  ```gdshader
  // cloud_shadow.gdshader
  shader_type spatial;
  render_mode unshaded, depth_test_disabled, fog_disabled, ambient_light_disabled;
  
  uniform sampler2D screen_texture : hint_screen_texture, filter_linear_mipmap;
  uniform sampler2D depth_texture : hint_depth_texture, filter_linear_mipmap;
  uniform sampler2D cloud_noise: filter_linear_mipmap, repeat_enable;
  uniform vec4 cloud_color: source_color;
  
  void fragment() {
      // 重建世界位置（与地面雾相同）
      float depth = texture(depth_texture, SCREEN_UV).x;
      vec3 ndc = vec3(SCREEN_UV * 2.0 - 1.0, depth);
      vec4 world = INV_VIEW_MATRIX * INV_PROJECTION_MATRIX * vec4(ndc, 1.0);
      vec3 world_position = world.xyz / world.w;
      
      // 基于噪声纹理的云密度
      float cloud_density = texture(cloud_noise, 0.01 * world_position.xz + vec2(0.0, 0.015 * TIME)).x;
      
      ALBEDO = cloud_color.rgb;
      ALPHA = cloud_color.a * cloud_density;
  }
  ```
- **参数说明**：
  - `cloud_noise`：云噪声纹理（推荐Perlin噪声）
  - `cloud_color`：云阴影颜色（通常为灰/蓝色）
  - `0.015 * TIME`：云移动速度
- **性能优化**：
  - 使用较低分辨率的深度纹理
  - 限制云阴影投射距离（远距离不计算）
- **参考文件**：`game/assets/shader/cloud_shadow.gdshader`

---

## 4. 风格化效果

### 4.1 原子朋克风格 - 扫描线网格
- **效果**：叠加网格线、仪表盘元素、故障艺术，营造原子朋克美学
- **使用场景**：UI背景、特效覆盖、场景过渡
- **Shader 代码**：
  ```gdshader
  shader_type canvas_item;
  
  // 原子朋克参数
  uniform float grid_intensity : hint_range(0.0, 1.0) = 0.2;
  uniform vec2 grid_cells = vec2(64.0, 36.0);  // 16:9比例网格
  uniform vec4 grid_color : source_color = vec4(0.0, 1.0, 0.2, 1.0);  // 经典终端绿
  uniform float scan_speed : hint_range(0.0, 5.0) = 1.0;
  uniform float glitch_frequency : hint_range(0.0, 1.0) = 0.01;
  
  void fragment() {
      vec4 base_color = texture(TEXTURE, SCREEN_UV);
      
      // 网格线
      vec2 grid_uv = SCREEN_UV * grid_cells;
      vec2 grid_lines = abs(fract(grid_uv - 0.5) - 0.5) / fwidth(grid_uv);
      float grid_line = 1.0 - min(min(grid_lines.x, grid_lines.y), 1.0);
      
      // 扫描线（水平移动）
      float scan_line = step(fract(SCREEN_UV.y * 100.0 + TIME * scan_speed), 0.1);
      
      // 随机故障
      float glitch = step(hash(vec2(TIME * 10.0, SCREEN_UV.y)), glitch_frequency);
      vec2 glitch_uv = SCREEN_UV + vec2(glitch * 0.02 * hash(vec2(TIME, SCREEN_UV.x)), 0.0);
      vec4 glitch_color = texture(TEXTURE, glitch_uv);
      
      // 混合所有效果
      vec3 final_color = base_color.rgb;
      final_color = mix(final_color, grid_color.rgb, grid_line * grid_intensity);
      final_color = mix(final_color, glitch_color.rgb, glitch * 0.3);
      final_color += scan_line * 0.1 * grid_color.rgb;
      
      COLOR = vec4(final_color, base_color.a);
  }
  
  // 哈希函数
  float hash(vec2 p) {
      p = fract(p * vec2(123.34, 345.45));
      p += dot(p, p + 34.345);
      return fract(p.x * p.y);
  }
  ```
- **参数说明**：
  - `grid_cells`：网格密度，匹配屏幕比例（64×36对应1920×1080的30像素网格）
  - `grid_color`：经典终端绿色 `#00FF33` 或其他原子朋克色（橙、青）
  - `scan_speed`：扫描线移动速度
  - `glitch_frequency`：故障发生概率
- **视觉组合**：
  1. 绿色网格线（原子时代计算机美学）
  2. 移动扫描线（CRT显示器）
  3. 随机故障（系统不稳定）
  4. 叠加在原UI/场景上

### 4.2 像素艺术风格
- **效果**：强制像素化，有限颜色，边缘抗锯齿
- **使用场景**：复古模式、迷你游戏、特效风格化
- **Shader 代码**：
  ```gdshader
  shader_type canvas_item;
  
  uniform float pixel_size : hint_range(1.0, 32.0) = 8.0;
  uniform int color_count : hint_range(2, 64) = 16;
  uniform float dither_intensity : hint_range(0.0, 1.0) = 0.3;
  
  // 有序抖动矩阵
  float dither_matrix[16] = float[](
      0.0,  8.0,  2.0, 10.0,
      12.0, 4.0, 14.0, 6.0,
      3.0, 11.0, 1.0,  9.0,
      15.0, 7.0, 13.0, 5.0
  ) / 16.0;
  
  void fragment() {
      // 像素化
      vec2 pixel_scale = vec2(pixel_size) / TEXTURE_PIXEL_SIZE;
      vec2 pixel_uv = floor(SCREEN_UV * pixel_scale) / pixel_scale;
      vec4 color = texture(TEXTURE, pixel_uv);
      
      // 颜色量化
      float color_step = 1.0 / float(color_count - 1);
      color.rgb = floor(color.rgb / color_step + 0.5) * color_step;
      
      // 有序抖动
      int x = int(mod(SCREEN_UV.x * TEXTURE_PIXEL_SIZE.x, 4.0));
      int y = int(mod(SCREEN_UV.y * TEXTURE_PIXEL_SIZE.y, 4.0));
      float dither = dither_matrix[y * 4 + x] * 2.0 - 1.0;
      
      color.rgb += dither * dither_intensity * color_step;
      
      COLOR = color;
  }
  ```
- **参数说明**：
  - `pixel_size`：像素块大小（屏幕像素）
  - `color_count`：颜色数量限制（16色、32色等）
  - `dither_intensity`：抖动强度，模拟CRT显示器的颜色混合

---

## 5. 性能优化技巧

### 5.1 Shader 复杂度分级
| 复杂度 | 效果示例 | 建议使用场景 |
|--------|----------|------------|
| **低** | 亮度调节、简单颜色混合 | 每帧所有UI元素 |
| **中** | 边缘发光、网格叠加 | 选中状态、重要UI |
| **高** | 全屏后处理（CRT、像素交换） | 场景过渡、特效时刻 |
| **极高** | 3D空间效果（雾、阴影） | 有限数量，性能监控 |

### 5.2 参数优化建议
1. **降低分辨率**：全屏效果使用 `viewport_scale = 0.5`
2. **限制更新频率**：非关键效果每2-3帧更新一次
3. **使用实例 uniform**：相同shader不同参数时性能更好
4. **避免分支**：尽量使用 `mix()` 而非 `if`
5. **纹理尺寸**：使用合适mipmap级别

### 5.3 调试工具
```gdscript
# Shader性能监控
func _process(delta):
    var shader_count = get_tree().get_nodes_in_group("shader_effects").size()
    if shader_count > 20:
        print("警告：Shader数量过多 (%d)" % shader_count)
        # 自动降低低优先级效果质量
```

---

## 6. 文件索引

### 6.1 项目内 Shader 文件
| 文件路径 | 效果类型 | 简要说明 |
|----------|----------|----------|
| `game/core/scene/channel/button_state.gdshader` | UI效果 | 按钮亮度调节 |
| `game/assets/shader/pixel_grid_swap.gdshader` | 后处理 | 网格交换故障艺术 |
| `game/assets/shader/distortion.gdshader` | 后处理 | 色差/通道偏移 |
| `game/assets/shader/blur.gdshader` | 后处理 | 屏幕模糊 |
| `game/assets/shader/ground_fog.gdshader` | 3D空间 | 地面雾效 |
| `game/assets/shader/cloud_shadow.gdshader` | 3D空间 | 云阴影 |
| `game/assets/shader/plant.gdshader` | 3D物体 | 植物着色器 |
| `game/Stylized_Smoke_Shader.gdshader` | 粒子 | 风格化烟雾 |
| `game/core/script/video_animation/green_screen_*.gdshader` | 视频 | 绿屏抠像 |

### 6.2 外部资源参考
- **Godot Shader Library**：官方示例和社区shader
- **Shadertoy**：创意shader灵感（需适配Godot语法）
- **原子朋克视觉参考**：电影《银翼杀手》、游戏《原子之心》风格

---

## 7. 创作流程

### 7.1 为新效果创建Shader
1. **明确需求**：描述想要的效果（如"扫描线+网格+轻微故障"）
2. **查找相似**：在本库中寻找接近的模式
3. **组合修改**：组合多个简单效果，调整参数
4. **性能测试**：在不同硬件上测试帧率
5. **参数暴露**：将关键参数作为uniform，方便调整

### 7.2 参数调节指南
```gdscript
# 创建调节界面（开发用）
func create_shader_tweaker(shader_material: ShaderMaterial):
    var sliders = {}
    for param in ["intensity", "speed", "scale"]:
        var slider = HSlider.new()
        slider.value_changed.connect(func(value):
            shader_material.set_shader_parameter(param, value)
        )
        sliders[param] = slider
    # 添加到调试UI
```

### 7.3 提交新模式
1. 测试shader在项目中的实际效果
2. 按现有格式添加文档：效果描述、代码、参数说明
3. 提供参考文件路径或外部来源
4. 更新"最后更新"日期

---

*Shader模式库 - 视觉风格的技术实现*