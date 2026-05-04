# UI 模式库

> **按功能分类的 UI 实现范例** - 每个模式包含：问题描述、解决方案、代码示例、参考文件
> 
> **目标**：快速查找"如何实现 X 功能"，而非阅读长篇规范
> **适用**：AI 助手、新开发者、UI 重构参考
> **最后更新**：2026-04-20

---

## 1. 分辨率适配模式

### 1.1 16:9 全屏背景 + 响应式 UI
- **问题**：确保 UI 在 1920×1080 及常见宽屏比例下正确显示，不依赖固定像素坐标
- **解决方案**：Control 根节点 + anchors_preset=15 + grow 标志 + 项目级拉伸设置
- **项目设置**（`project.godot`）：
  ```ini
  window/size/viewport_width = 1920
  window/size/viewport_height = 1080
  window/stretch/mode = "canvas_items"  # 或 "viewport"
  window/stretch/aspect = "keep"
  ```
- **场景结构**：
  ```tscn
  [node name="RootUI" type="Control"]
  layout_mode = 3
  anchors_preset = 15          # FULL_RECT
  anchor_right = 1.0
  anchor_bottom = 1.0
  grow_horizontal = 2          # GROW_DIRECTION_BOTH
  grow_vertical = 2
  ```
- **GDScript 代码**：
  ```gdscript
  # 设置全屏响应式 Control
  node.anchors_preset = Control.PRESET_FULL_RECT
  node.grow_horizontal = Control.GROW_DIRECTION_BOTH
  node.grow_vertical = Control.GROW_DIRECTION_BOTH
  ```
- **参考文件**：
  - `game/core/scene/channel/通道.tscn` (第 11-18 行) - Control 根节点设置
  - `project.godot` - 项目窗口与拉伸设置

### 1.2 视口变化监听与自适应
- **问题**：窗口大小改变时 UI 需要重新布局
- **解决方案**：监听 `get_viewport().size_changed` 信号
- **代码示例**：
  ```gdscript
  extends Control

  func _ready():
      get_viewport().size_changed.connect(_on_viewport_size_changed)
  
  func _on_viewport_size_changed():
      var viewport_size = get_viewport().get_visible_rect().size
      # 根据新尺寸重新计算布局
      update_layout(viewport_size)
  
  func update_layout(size: Vector2):
      # 示例：保持底部按钮栏比例
      $HBoxContainer.offset_bottom = size.y - 40  # 距底部40px
      $HBoxContainer.offset_right = size.x - 20   # 距右侧20px
  ```
- **学习来源**：GodotOS 项目的窗口系统

---

## 2. 布局模式

### 2.1 底部按钮栏（固定间距）
- **问题**：在屏幕底部放置水平排列的按钮，按钮间需要精确、独立的间距
- **解决方案**：HBoxContainer + Control 间距节点（禁用容器全局 separation）
- **场景示例**：
  ```tscn
  [node name="HBoxContainer" type="HBoxContainer"]
  layout_mode = 1
  anchors_preset = 12          # BOTTOM_WIDE
  anchor_top = 1.0
  anchor_right = 1.0
  anchor_bottom = 1.0
  offset_left = 944.0
  offset_top = -158.0
  offset_right = -325.0
  offset_bottom = 6.0
  theme_override_constants/separation = 0  # 关键：禁用容器间距
  
  [node name="WorkshopBtn" type="TextureButton" parent="HBoxContainer"]
  custom_minimum_size = Vector2(180, 0)
  
  [node name="间距1" type="Control" parent="HBoxContainer"]
  custom_minimum_size = Vector2(22.5, 0)   # 固定宽度间距
  
  [node name="ComponentBtn" type="TextureButton" parent="HBoxContainer"]
  custom_minimum_size = Vector2(235, 0)
  
  [node name="间距2" type="Control" parent="HBoxContainer"]
  custom_minimum_size = Vector2(22.5, 0)
  
  [node name="SettingsBtn" type="TextureButton" parent="HBoxContainer"]
  custom_minimum_size = Vector2(180, 0)
  ```
- **优势**：
  - 每个间距可独立设置不同宽度
  - 可添加视觉效果（分隔线、渐变）
  - 配合 grow 标志可实现百分比间距
- **参考文件**：
  - `game/core/scene/channel/通道.tscn` (第 58-104 行) - 完整实现

### 2.2 居中对话框（模态/非模态）
- **问题**：在屏幕中心显示对话框，背景半透明遮罩
- **解决方案**：两层结构 + anchors_preset=8 + StyleBoxFlat 背景
- **场景结构**：
  ```
  Control (根节点，全屏)
  ├── BackgroundPanel (Panel，全屏，StyleBoxFlat 半透明黑)
  └── DialogContainer (Control，居中)
      ├── DialogPanel (Panel，圆角边框)
      ├── TitleLabel (Label)
      ├── ContentLabel (Label)
      └── ButtonContainer (HBoxContainer)
  ```
- **代码示例**：
  ```gdscript
  # 创建居中对话框
  var dialog = preload("res://ui/components/dialog.tscn").instantiate()
  add_child(dialog)
  
  # 居中设置
  dialog.anchors_preset = Control.PRESET_CENTER
  dialog.offset_left = -200    # 宽 400px
  dialog.offset_right = 200
  dialog.offset_top = -150     # 高 300px  
  dialog.offset_bottom = 150
  ```
- **背景遮罩**：
  ```gdscript
  var bg_style = StyleBoxFlat.new()
  bg_style.bg_color = Color(0, 0, 0, 0.7)  # 70% 黑色
  $BackgroundPanel.add_theme_stylebox_override("panel", bg_style)
  ```

### 2.3 网格物品栏（固定列数）
- **问题**：显示 N×M 网格的物品/技能图标
- **解决方案**：GridContainer + 预设列数 + 动态行数
- **场景设置**：
  ```tscn
  [node name="InventoryGrid" type="GridContainer"]
  layout_mode = 1
  anchors_preset = 15
  offset_left = 50
  offset_right = -50
  offset_top = 100
  offset_bottom = -100
  columns = 5                    # 固定 5 列
  theme_override_constants/h_separation = 10
  theme_override_constants/v_separation = 10
  ```
- **动态添加物品**：
  ```gdscript
  func add_items(items: Array):
      for item in items:
          var slot = preload("res://ui/components/inventory_slot.tscn").instantiate()
          slot.texture = item.icon
          slot.tooltip_text = item.name
          $InventoryGrid.add_child(slot)
  ```

---

## 3. 交互模式

### 3.1 循环菜单（垂直/水平滚动）
- **问题**：实现有限空间内显示多个选项，当前项高亮，支持键盘/手柄导航
- **解决方案**：Marker2D 锚点 + Tween 动画 + 面板对象池（从 stylish-menu-demo 学习）
- **核心组件**：
  1. **CyclingMenu**：管理器，处理输入、动画、状态
  2. **MenuPanel**：单个选项面板，可复用
  3. **Marker2D**：定义间距、高度、位置锚点
- **代码要点**：
  ```gdscript
  # CyclingMenu.gd 关键逻辑
  var panel_pool: Array = []
  var current_index: int = 0
  
  func _input(event):
      if event.is_action_pressed("ui_down"):
          cycle_to(current_index + 1)
      elif event.is_action_pressed("ui_up"):
          cycle_to(current_index - 1)
      elif event.is_action_pressed("ui_accept"):
          select_current()
  
  func cycle_to(new_index: int):
      var tween = create_tween()
      # 滑动动画
      tween.tween_property(panels[current_index], "position", 
                          offscreen_position, 0.3)
      tween.parallel().tween_property(panels[new_index], "position",
                                      center_position, 0.3)
      # 尺寸变化（当前项放大）
      tween.parallel().tween_property(panels[new_index], "scale",
                                      Vector2(1.1, 1.1), 0.3)
      current_index = new_index
  ```
- **视觉反馈**：
  - 当前项：放大 + 高亮边框
  - 相邻项：正常大小 + 半透明
  - 远距离项：缩小 + 高度透明
- **参考文件**：
  - `external/stylish-menu-demo-main/Menu.tscn` - 完整场景结构
  - `external/stylish-menu-demo-main/Code/CyclingMenu.gd` - 核心逻辑
  - `external/stylish-menu-demo-main/Basic_panel.tscn` - 可复用面板

### 3.2 按钮状态反馈（悬停/按下/禁用）
- **问题**：按钮需要视觉反馈，区分不同交互状态
- **解决方案**：Shader + 信号监听 + StyleBoxFlat 状态覆盖
- **Shader 方案**（简单亮度调节）：
  ```gdshader
  // button_state.gdshader
  shader_type canvas_item;
  uniform float brightness : hint_range(0.0, 2.0) = 1.0;
  
  void fragment() {
      COLOR = texture(TEXTURE, UV);
      COLOR.rgb *= brightness;
  }
  ```
- **GDScript 控制**：
  ```gdscript
  extends TextureButton
  
  func _ready():
      # 连接信号
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
      $Sprite2D.material.set_shader_parameter("brightness", 1.2) if is_hovered() else 1.0
  ```
- **StyleBoxFlat 方案**（纯 GDScript）：
  ```gdscript
  func update_button_state():
      var style = StyleBoxFlat.new()
      if disabled:
          style.bg_color = Color(0.3, 0.3, 0.3)
      elif pressed:
          style.bg_color = Color(0.5, 0.5, 0.8)
      elif hovered:
          style.bg_color = Color(0.7, 0.7, 1.0)
      else:
          style.bg_color = Color(0.6, 0.6, 0.9)
      
      add_theme_stylebox_override("normal", style)
  ```
- **参考文件**：
  - `game/core/scene/channel/button_state.gdshader` - 简单亮度 shader
  - 项目中的按钮场景（查看具体实现）

---

## 4. 动画模式

### 4.1 通用 UI 动画单例
- **问题**：多个 UI 元素需要相同动画效果，避免重复代码
- **解决方案**：自动加载单例模式（从 godot-ui-animation-library 学习）
- **单例结构**：
  ```gdscript
  # UiAnimationHandler.gd
  extends Node
  
  # 自动加载为 "UIAnimation"
  
  # 从左滑入
  func slide_from_left(node: Control, offset: float = 8.0, speed: float = 0.3) -> Signal:
      var start_pos = Vector2(-node.size.x - offset, node.position.y)
      var end_pos = node.position
      node.position = start_pos
      
      var tween = node.create_tween()
      tween.tween_property(node, "position", end_pos, speed)\
           .set_trans(Tween.TRANS_BACK).set_ease(Tween.EASE_OUT)
      return tween.finished
  
  # 从右滑入
  func slide_from_right(node: Control, offset: float = 8.0, speed: float = 0.3) -> Signal:
      var viewport_size = node.get_viewport().get_visible_rect().size
      var start_pos = Vector2(viewport_size.x + offset, node.position.y)
      var end_pos = node.position
      node.position = start_pos
      
      var tween = node.create_tween()
      tween.tween_property(node, "position", end_pos, speed)\
           .set_trans(Tween.TRANS_BACK).set_ease(Tween.EASE_OUT)
      return tween.finished
  
  # 弹出效果
  func pop_in(node: Control, speed: float = 0.3) -> Signal:
      node.scale = Vector2.ZERO
      node.pivot_offset = node.size / 2  # 从中心缩放
      
      var tween = node.create_tween()
      tween.tween_property(node, "scale", Vector2.ONE, speed)\
           .set_trans(Tween.TRANS_BACK).set_ease(Tween.EASE_OUT)
      return tween.finished
  
  # 收缩消失
  func pop_out(node: Control, speed: float = 0.3) -> Signal:
      var tween = node.create_tween()
      tween.tween_property(node, "scale", Vector2.ZERO, speed)\
           .set_trans(Tween.TRANS_BACK).set_ease(Tween.EASE_IN)
      return tween.finished
  
  # 淡入淡出
  func fade_in(node: CanvasItem, speed: float = 0.3) -> Signal:
      node.modulate = Color.TRANSPARENT
      var tween = node.create_tween()
      tween.tween_property(node, "modulate", Color.WHITE, speed)
      return tween.finished
  
  func fade_out(node: CanvasItem, speed: float = 0.3) -> Signal:
      var tween = node.create_tween()
      tween.tween_property(node, "modulate", Color.TRANSPARENT, speed)
      return tween.finished
  ```
- **使用方法**：
  ```gdscript
  # 任何脚本中直接调用
  UIAnimation.slide_from_left($MyPanel).connect(_on_slide_complete)
  UIAnimation.pop_in($Dialog).connect(_on_pop_in_complete)
  
  # 链式调用
  await UIAnimation.slide_from_left($Panel1)
  await UIAnimation.fade_in($Label1)
  await UIAnimation.pop_in($Button1)
  ```
- **配置为自动加载**：
  1. 场景文件：`UIAnimationHandler.tscn`（根节点为 Node，脚本为 UiAnimationHandler.gd）
  2. 项目设置：`Project → Project Settings → Autoload` 添加 `UIAnimationHandler.tscn` 作为 `UIAnimation`
- **参考文件**：
  - `external/godot-ui-animation-library-main/addons/godot_ui_animations/UiAnimationHandler.gd` - 完整实现
  - `external/godot-ui-animation-library-main/addons/godot_ui_animations/UIAnimationHandler.tscn` - 单例场景
  - `external/godot-ui-animation-library-main/addons/godot_ui_animations/godot_ui_anims.gd` - 编辑器插件

### 4.2 快速 Tween 工具类
- **问题**：常用动画效果（弹跳、翻转、平滑起伏）需要快速调用
- **解决方案**：静态工具类 QuickTweens（从 stylish-menu-demo 学习）
- **代码示例**：
  ```gdscript
  # QuickTweens.gd
  class_name QuickTweens
  
  static func bounce(node: Node2D, property: String, amount: float, duration: float = 0.3) -> Tween:
      var tween = node.create_tween()
      var original = node.get(property)
      tween.tween_property(node, property, original + amount, duration/2)\
           .set_trans(Tween.TRANS_BACK).set_ease(Tween.EASE_OUT)
      tween.tween_property(node, property, original, duration/2)\
           .set_trans(Tween.TRANS_BACK).set_ease(Tween.EASE_IN)
      return tween
  
  static func flip(node: Node2D, duration: float = 0.5) -> Tween:
      var tween = node.create_tween()
      tween.tween_property(node, "scale:x", 0, duration/2)
      tween.tween_property(node, "scale:x", 1, duration/2)
      return tween
  
  static func smooth_rise_and_fall(node: Node2D, rise_amount: float, 
                                   rise_time: float, fall_time: float) -> Tween:
      var tween = node.create_tween()
      tween.tween_property(node, "position:y", node.position.y - rise_amount, rise_time)\
           .set_trans(Tween.TRANS_SINE).set_ease(Tween.EASE_OUT)
      tween.tween_property(node, "position:y", node.position.y, fall_time)\
           .set_trans(Tween.TRANS_SINE).set_ease(Tween.EASE_IN)
      return tween
  ```
- **使用方法**：
  ```gdscript
  # 无需实例化，直接调用静态方法
  QuickTweens.bounce($Button, "position:y", -20, 0.4)
  QuickTweens.flip($Card)
  ```
- **参考文件**：
  - `external/stylish-menu-demo-main/addons/QuickTweens.gd` - 完整实现

---

## 5. 外部项目索引

| 项目 | 路径 | 核心学习点 | 适用场景 |
|------|------|------------|----------|
| **GodotOS** | `external/GodotOS-main/` | 窗口系统、拖拽交互、主题覆盖、视口变化监听 | 复杂桌面式 UI、多窗口管理 |
| **stylish-menu-demo** | `external/stylish-menu-demo-main/` | 循环菜单、面板动画、主题资源管理、拉伸适配 | 菜单系统、动画交互、视觉反馈 |
| **godot-ui-animation-library** | `external/godot-ui-animation-library-main/` | 自动加载单例、通用动画函数、视口感知定位 | UI 动画工具库、常见动效 |
| **通道界面（内部）** | `game/core/scene/channel/通道.tscn` | Control 间距节点、底部按钮栏、全屏响应式 | 游戏内 UI、精确布局控制 |

### 5.1 GodotOS 关键文件
- `窗口系统`：学习如何管理多个可拖拽、可调整大小的窗口
- `主题系统`：查看如何使用 Theme 资源统一控制样式
- `布局管理`：观察复杂 UI 的层级结构和锚点设置

### 5.2 stylish-menu-demo 关键文件
1. **`Menu.tscn`**：完整菜单场景，包含背景 shader、循环菜单、按钮
2. **`CyclingMenu.gd`**：核心导航逻辑，输入处理，动画控制
3. **`Basic_panel.tscn`**：可复用面板组件，圆角边框，阴影效果
4. **`special_button.tscn`**：自定义按钮组件，图标居中，状态反馈
5. **`QuickTweens.gd`**：动画工具类，弹跳、翻转等常见效果

### 5.3 godot-ui-animation-library 关键文件
1. **`UiAnimationHandler.gd`**：12+ 个动画函数，适用于 Control 节点
2. **`UIAnimationHandler.tscn`**：单例场景配置示例
3. **插件系统**：查看如何通过插件注册自动加载单例

---

## 6. 验证清单（创建 UI 场景后检查）

- [ ] **根节点选择**：纯 UI 场景使用 `Control`，混合场景合理分层
- [ ] **锚点设置**：使用 `anchors_preset` 而非硬编码 `position`
- [ ] **grow 标志**：如需响应式，设置 `grow_horizontal/grow_vertical = 2`
- [ ] **间距控制**：优先使用 `Control` 节点而非容器 `separation`
- [ ] **最小尺寸**：交互元素设置 `custom_minimum_size`（建议最小 44×44）
- [ ] **状态反馈**：按钮有悬停/按下/禁用视觉区分
- [ ] **动画性能**：使用 `Tween` 而非每帧手动插值
- [ ] **分辨率测试**：在 1920×1080 和 2560×1440 下验证布局
- [ ] **输入区域**：触摸/鼠标点击区域足够大
- [ ] **信号连接**：交互元素正确连接信号（`pressed`、`mouse_entered`等）

---

## 7. 后续扩展

**待添加模式**（发现新需求时补充）：
- 滚动列表虚拟化（大量项目性能优化）
- 拖拽排序系统（物品栏、技能栏）
- 键盘快捷键提示
- 手柄/触摸双模式适配
- 本地化文本布局（多语言支持）
- 无障碍访问（屏幕阅读器支持）

**贡献指南**：
1. 发现新的 UI 模式时，按现有格式添加新章节
2. 确保每个模式包含：问题、解决方案、代码示例、参考文件
3. 链接到可运行的实际文件，而非仅理论描述
4. 更新"最后更新"日期

---

*UI 模式库 - 专注于"如何实现"，而非"应该怎么做"*