## RDUniform（渲染设备统一变量） <- RefCounted（引用计数）

该对象由 RenderingDevice 使用。

**属性（Props）：**
- binding: int = 0
- uniform_type: int (RenderingDevice.UniformType) = 3

**方法（Methods）：**
- add_id(id: RID) —— 添加 ID
- clear_ids() —— 清除所有 ID
- get_ids() -> RID[] —— 获取 ID 数组
