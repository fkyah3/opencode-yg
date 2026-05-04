# Godot Markdown → BBCode 渲染调研

> 调研日期：2026-05-03
> 问题：AI 生成 Markdown 内容 → Godot RichTextLabel 无法渲染（只认 BBCode）
> 目标：找到合适的 Markdown→BBCode 转换方案

---

## 问题核心

```
AI 生成 (Markdown)                      Godot RichTextLabel
"# 标题\n`代码`\n**粗体**\n```块```"  →  ❌ 显示原始符号
                                        →  ✅ [b]粗体[/b] / [code]代码[/code]
```

RichTextLabel 只理解 BBCode，不理解 Markdown。必须桥接。

---

## 方案一：MarkdownLabel（推荐优先尝试）

**仓库**：https://github.com/daenvil/MarkdownLabel  
**Stars**：147 ★ | **License**：MIT | **Godot**：4.2+ | **最后更新**：2026-01-11（v1.4.0）

GDScript 写的自定义节点，继承 RichTextLabel，在运行时做 Markdown→BBCode 转换。

### 能力

| Markdown 语法 | 支持 | 对应 BBCode |
|:-------------|:----:|:-----------|
| `# ~ ######` 标题 | ✅ | `[font_size=X]` |
| `**粗体**` | ✅ | `[b]` |
| `*斜体*` / `_斜体_` | ✅ | `[i]` |
| `` `行内代码` `` | ✅ | `[code]` |
| ` ```代码块``` ` | ✅ | `[code]` |
| `> 引用` | ✅ | `[color]` |
| `- 无序列表` | ✅ | `[ul]` / `[li]` |
| `1. 有序列表` | ✅ | `[ol]` / `[li]` |
| `[链接](url)` | ✅ | `[url]` |
| `![图片](url)` | ✅ | `[img]` |
| `|表格|` | ⚠️ 有限支持 | `[table]` / `[cell]` |
| `~~删除线~~` | ✅ | `[s]` |
| `---` 分割线 | ✅ | `[hr]` |
| `行内HTML` | ❌ | — |

### 使用方式

```gdscript
# 用 MarkdownLabel 替换 RichTextLabel
# 设置 markdown_text 属性即可
$MarkdownLabel.markdown_text = "# 标题\n这是 `代码` 和 **粗体**"
```

### 评价

- **优点**：最成熟的 GDScript 方案，开箱即用 MIT 许可
- **限制**：不是完整 CommonMark 实现，受限于 BBCode 的能力边界
- **性能**：大文本频繁更新时有开销（每次转整个字符串）

---

## 方案二：AdvancedText（RakugoTeam）

**仓库**：https://github.com/rakugoteam/AdvancedText  
**Stars**：41 ★ | **License**：MIT | **Godot**：4.x | **最后更新**：2025-11-30（v3.1）

扩展 RichTextLabel，支持 Markdown 和 Ren'Py 标记语言。

### 架构特点

```
AdvancedTextLabel（RichTextLabel 子类）
  ├── TextParser（基类）
  │   ├── ExtendedBBCodeParser（扩展 BBCode）
  │   │   ├── RenPyMarkup（Ren'Py 标记解析器）
  │   │   └── MarkdownParser（Markdown 解析器）
  │   └── 自定义 TextParser（可扩展）
  └── AdvancedTextButton（按钮版本）
```

### 评价

- 架构更优雅（插件化的 TextParser 体系）
- 但 Stars 较少，更新频率不如 MarkdownLabel
- 如果你的项目以后还想要 Ren'Py 风格的对话标记，这是更合适的选择

---

## 方案三：Godot 内置 BBCode（如果不需要 Markdown）

RichTextLabel 原生支持的 BBCode 标签：

| 标签 | 示例 | 说明 |
|:----|:-----|:-----|
| `[b]` | `[b]粗体[/b]` | 粗体 |
| `[i]` | `[i]斜体[/i]` | 斜体 |
| `[u]` | `[u]下划线[/u]` | 下划线 |
| `[s]` | `[s]删除线[/s]` | 删除线 |
| `[code]` | `[code]代码[/code]` | 等宽字体代码 |
| `[color=X]` | `[color=red]红字[/color]` | 文字颜色 |
| `[font_size=X]` | `[font_size=24]大号[/font_size]` | 字体大小 |
| `[url]` | `[url]链接[/url]` | URL |
| `[center]` | `[center]居中[/center]` | 居中 |
| `[right]` | `[right]右对齐[/right]` | 右对齐 |
| `[fill]` | `[fill]两端对齐[/fill]` | 两端对齐 |
| `[table]` | `[table][cell]A[/cell][cell]B[/cell][/table]` | 表格 |
| `[ul]` / `[ol]` | `[ul][li]项[/li][/ul]` | 无序/有序列表 |
| `[img]` | `[img=widthxheight]path[/img]` | 图片 |
| `[hr]` | `[hr]` | 水平分割线 |
| `[hint]` | `[hint]提示文字[/hint]` | 提示文本 |
| `[dropcap]` | `[dropcap]首[/dropcap]字下沉` | 首字下沉 |
| `[lb]` / `[rb]` | `[lb]` | 转义 `[` / `]` |

**`append_text(bbcode)`** 是最高效的添加 BBCode 的方式——每次只解析新增的部分。

---

## 方案四：BBCode→Markdown（反方向 — Godot 已有）

**通过 Issue #108496**：Godot 的 GDScript LSP 中已包含一个 **BBCode→Markdown** 转换器（`godot_lsp.h` 第 1941-1991 行），用于将类文档中的 BBCode 转换为 Markdown 显示在外部编辑器中。

这个转换在 Godot 4.6 已修复完成。但你的需求是反方向（**Markdown→BBCode**），所以不能直接用。

---

## 方案五：GDScript 中手写 Markdown→BBCode 转换器

如果你不想引入外部依赖，可以手写一个简单的转换器——核心逻辑约 50-100 行 GDScript：

```gdscript
# 最简单的 Markdown→BBCode 转换核心
static func markdown_to_bbcode(md: String) -> String:
    var bb = md
    
    # 标题
    bb = bb.replace("# ", "[font_size=28]")  # 需要处理嵌套
    
    # 粗体
    bb = bb.replace("**", "[b]")  # 需要交替处理开/关
    
    # 行内代码
    bb = bb.replace("`", "[code]")  # 同上
    
    # 代码块
    bb = bb.replace("```", "")  # 直接用 [code] 包裹
    
    # 列表
    bb = bb.replace("- ", "[li]")
    
    return bb
```

**关键难点**：
- 标签需要交替（开→关→开→关），不能简单 replace
- 代码块需要保持等宽和空白
- 标题需要对应字号的收起
- 表格是最复杂的部分（需要计算列宽对齐）

---

## 决策建议

| 方案 | 开发成本 | 维护成本 | 完整度 | 推荐 |
|:----|:--------:|:--------:|:-----:|:----:|
| **MarkdownLabel**（方案一） | 最低 | 低 | ⭐⭐⭐ | ✅ **首选** |
| **AdvancedText**（方案二） | 最低 | 低 | ⭐⭐⭐ | ✅ 备选 |
| 手写转换器（方案五） | 高 | 高 | ⭐⭐ | ❌ 不值得 |
| 只用 BBCode（方案三） | 中 | 中 | — | 如果后端能控制输出格式 |

**推荐路线**：

**短期**：拉起 MarkdownLabel 的 GDScript 脚本，直接集成到 Godot 项目中。最简单的方案，MIT 许可无顾虑。AI 生成的 Markdown 内容直接设到 `markdown_text` 即可显示。

**长期**：如果需要更高性能（大文本频繁更新）或更好的表格支持，可以考虑基于 `parse_bbcode()` 和 `RichTextEffect` 机制写一个 GDScript 原生的 Markdown 解析器。

---

## 参考来源

| # | 来源 | 链接 |
|:-:|:----|:-----|
| 1 | MarkdownLabel (147★) | https://github.com/daenvil/MarkdownLabel |
| 2 | AdvancedText (41★) | https://github.com/rakugoteam/AdvancedText |
| 3 | Godot BBCode→Markdown LSP Issue | https://github.com/godotengine/godot/issues/108496 |
| 4 | RTL BBCode 解析改进 PR #92962 | https://github.com/godotengine/godot/pull/92962 |
| 5 | BBCode 文档 (4.6) | https://docs.godotengine.org/en/stable/tutorials/gui/bbcode_in_richtextlabel.html |
| 6 | RTL 类参考 (4.6) | https://docs.godotengine.org/en/stable/classes/class_richtextlabel.html |
| 7 | Custom BBCode (RichTextEffect) | https://docs.godotengine.org/en/stable/tutorials/gui/bbcode_in_richtextlabel.html#custom-bbcode-tags-and-text-effects |
| 8 | `strip_bbcode()` / `escape_bbcode()` PR #78310 | https://github.com/godotengine/godot/pull/78310 |
