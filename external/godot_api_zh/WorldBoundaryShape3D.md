## WorldBoundaryShape3D（世界边界 3D 形状） <- Shape3D（3D 形状）

一种 3D 世界边界形状，用于物理系统。WorldBoundaryShape3D 像一面无限平面，强制所有物理体保持在其上方。`plane` 的法线决定哪个方向被视为"上方"，在编辑器中，平面上的线条代表此方向。例如，可用于无限平坦的地板。**注意：** 当物理引擎在项目设置中设置为 **Jolt Physics**（`ProjectSettings.physics/3d/physics_engine`）时，WorldBoundaryShape3D 具有有限大小（以形状原点为中心）。可以通过更改 `ProjectSettings.physics/jolt_physics_3d/limits/world_boundary_shape_size` 来调整。

**属性（Props）：**
- plane: Plane = Plane(0, 1, 0, 0) —— 平面
