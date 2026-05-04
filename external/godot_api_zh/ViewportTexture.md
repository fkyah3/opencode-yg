## ViewportTexture <- Texture2D（纹理2D）

ViewportTexture 将 Viewport 的内容作为动态 Texture2D 提供。可用于组合 Control、Node2D 和 Node3D 节点的渲染。例如，可以在 TextureRect 中显示 3D 场景，或在 Sprite3D 中显示 2D 叠加层。要在代码中获取 ViewportTexture，使用目标视口上的 `Viewport.get_texture` 方法。**注意：** ViewportTexture 始终是其场景的本地资源（参见 `Resource.resource_local_to_scene`）。如果场景根节点未就绪，可能返回不正确的数据（参见 `Node.ready`）。**注意：** 实例化包含高分辨率 ViewportTexture 的场景可能导致明显的卡顿。**注意：** 当使用 `Viewport.use_hdr_2d` 设置为 `true` 的视口时，返回的纹理将是使用线性编码的 HDR 图像。直接显示在屏幕上时可能看起来比正常情况更暗。要转换为非线性 sRGB 编码，可执行以下操作：**注意：** 某些节点（如 Decal、Light3D 和 PointLight2D）不支持直接使用 ViewportTexture。要在这些节点中使用 ViewportTexture 的纹理数据，需要通过调用 `Texture2D.get_image` 在 ViewportTexture 上创建 ImageTexture，并将结果传递给 `ImageTexture.create_from_image`。此转换是慢速操作，不应每帧执行。

**属性（Props）：**
- viewport_path: NodePath = NodePath("") —— 视口路径
