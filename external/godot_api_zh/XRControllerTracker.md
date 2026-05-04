## XRControllerTracker（XR控制器追踪器） <- XRPositionalTracker（XR位置追踪器）

此对象的实例表示一个被追踪的控制器。当控制器开启且 XRInterface 检测到它们时，此对象的实例会自动添加到通过 XRServer 可访问的活动追踪对象列表中。XRController3D 使用此类型的对象，应在您的项目中使用。

**属性（Props）：**
- type: int (XRServer.TrackerType) = 2 —— 类型
