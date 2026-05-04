## XRCamera3D（XR相机3D）<- Camera3D（相机3D）

一个基于 XR 追踪数据自动定位的相机节点。与 XRController3D 相比，渲染线程可以访问更即时的追踪数据，而 XRCamera3D 节点的位置可能比用于渲染的位置滞后几毫秒。**注意：** 如果 `Viewport.use_xr` 为 `true`，大多数相机属性将被活动的 XRInterface 覆盖。唯一可信的属性是近平面和远平面。

**属性（Props）：**
- physics_interpolation_mode: int (Node.PhysicsInterpolationMode) = 2 —— 物理插值模式
