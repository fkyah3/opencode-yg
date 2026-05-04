# Godot API 文档索引

本目录包含 Godot 引擎的完整 API 文档，采用两级索引系统。

## 索引系统

### 1. 常用类索引 (`_common.md`)
包含128个最常用的Godot类，按字母顺序排列。

### 2. 其他类索引 (`_other.md`)
包含其他734个Godot类，按字母顺序排列。

### 3. 具体类文档 (`{ClassName}.md`)
单个Godot类的完整API文档。

## 查询流程

```
需要API参考 → 扫描_common.md → 找到类 → 加载[ClassName].md
              ↓
          未找到 → 扫描_other.md → 找到类 → 加载[ClassName].md
```

## 使用示例

```bash
# 查询CharacterBody2D类
Read("${CLAUDE_SKILL_DIR}/godot_api/CharacterBody2D.md")

# 查询Sprite2D类  
Read("${CLAUDE_SKILL_DIR}/godot_api/Sprite2D.md")
```

## 常用类速查

### 2D开发核心类
| 类名 | 描述 | 文档 |
|------|------|------|
| `Node2D` | 2D节点基类 | [Node2D.md](Node2D.md) |
| `Sprite2D` | 2D精灵 | [Sprite2D.md](Sprite2D.md) |
| `CharacterBody2D` | 2D角色物理体 | [CharacterBody2D.md](CharacterBody2D.md) |
| `Area2D` | 2D区域检测 | [Area2D.md](Area2D.md) |
| `CollisionShape2D` | 2D碰撞形状 | [CollisionShape2D.md](CollisionShape2D.md) |
| `Camera2D` | 2D摄像机 | [Camera2D.md](Camera2D.md) |
| `TileMap` | 瓦片地图 | [TileMap.md](TileMap.md) |

### 3D开发核心类
| 类名 | 描述 | 文档 |
|------|------|------|
| `Node3D` | 3D节点基类 | [Node3D.md](Node3D.md) |
| `MeshInstance3D` | 3D网格实例 | [MeshInstance3D.md](MeshInstance3D.md) |
| `CharacterBody3D` | 3D角色物理体 | [CharacterBody3D.md](CharacterBody3D.md) |
| `Camera3D` | 3D摄像机 | [Camera3D.md](Camera3D.md) |

### UI开发核心类
| 类名 | 描述 | 文档 |
|------|------|------|
| `Control` | UI控件基类 | [Control.md](Control.md) |
| `Button` | 按钮 | [Button.md](Button.md) |
| `Label` | 标签 | [Label.md](Label.md) |
| `VBoxContainer` | 垂直布局容器 | [VBoxContainer.md](VBoxContainer.md) |
| `HBoxContainer` | 水平布局容器 | [HBoxContainer.md](HBoxContainer.md) |

### 动画系统
| 类名 | 描述 | 文档 |
|------|------|------|
| `AnimationPlayer` | 动画播放器 | [AnimationPlayer.md](AnimationPlayer.md) |
| `AnimationTree` | 动画树 | [AnimationTree.md](AnimationTree.md) |

### 资源管理
| 类名 | 描述 | 文档 |
|------|------|------|
| `Resource` | 资源基类 | [Resource.md](Resource.md) |
| `PackedScene` | 打包场景 | [PackedScene.md](PackedScene.md) |
| `ImageTexture` | 图像纹理 | [ImageTexture.md](ImageTexture.md) |

## 文档格式

每个类文档包含以下部分：

```markdown
# {ClassName}

**继承链**: {ParentClass} <- {GrandparentClass} <- ...

**描述**: {类描述}

## 属性
| 属性 | 类型 | 描述 |
|------|------|------|

## 方法  
| 方法 | 返回类型 | 描述 |
|------|----------|------|

## 信号
| 信号 | 参数 | 描述 |
|------|------|------|

## 常量
| 常量 | 值 | 描述 |
|------|-----|------|

## 示例
{GDScript示例代码}
```

## 最佳实践

### 1. 按需查询
不要一次性加载所有文档，按需查询具体类。

### 2. 继承链理解
查看类的继承链，了解可用属性和方法。

### 3. 示例参考
参考文档中的示例代码，了解正确用法。

### 4. 类型检查
注意GDScript的类型系统，避免类型推断错误。

## 常见问题

### 1. 找不到类
如果 `_common.md` 中没有，检查 `_other.md`。

### 2. 文档不完整
某些类可能没有完整文档，参考父类文档。

### 3. 版本差异
注意Godot版本差异，文档基于Godot 4.x。

## 文档来源
这些文档基于 `e:\fkyah3\project\Frankenstein-of-The-Babel\知识库\06_api_doc\godot_doc_api\` 中的完整文档。

## 更新记录
- **版本**: 1.0.0
- **创建日期**: 2026年3月31日
- **类数量**: 862个
- **索引系统**: 两级索引（常用128 + 其他734）
