## Material（材质）<- Resource（资源）

Material 是用于着色和着色几何体的基础资源。所有材质都继承自它，几乎所有 VisualInstance3D 派生节点都携带 Material。一些标志和参数在所有材质类型间共享，在此处配置。重要的是，你可以通过继承 Material 在脚本或 GDExtension 中创建自己的自定义材质类型。

**属性（Props）：**
- next_pass: Material —— 下一遍次
- render_priority: int —— 渲染优先级

**方法（Methods）：**
- create_placeholder() -> Resource —— 创建占位符
- inspect_native_shader_code() —— 检查原生着色器代码

**枚举（Enums）：**
**Constants（常量）：** RENDER_PRIORITY_MAX=127 —— 渲染优先级最大值，RENDER_PRIORITY_MIN=-128 —— 渲染优先级最小值
