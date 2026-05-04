## ResourceImporterBMFont（BMFont 资源导入器） <- ResourceImporter（资源导入器）

BMFont 格式由 BMFont 程序创建。此外还有许多兼容 BMFont 的程序。与 ResourceImporterImageFont 相比，ResourceImporterBMFont 支持具有不同字形宽度/高度的位图字体。另请参见 ResourceImporterDynamicFont。

**属性（Props）：**
- compress: bool = true —— 是否压缩
- fallbacks: Array = [] —— 后备字体数组
- scaling_mode: int = 2 —— 缩放模式
