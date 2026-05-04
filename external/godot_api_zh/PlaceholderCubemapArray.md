## PlaceholderCubemapArray（占位立方贴图数组） <- PlaceholderTextureLayered（占位分层纹理）

此类在以下两种情况下替换 CubemapArray 或 CubemapArray 派生类：- 在专用服务器模式下，图像数据不应影响游戏逻辑。这可以显著减小导出的 PCK 文件大小。- 当 CubemapArray 派生类缺失时，例如使用不同的引擎版本。**注意：** 此类不适用于渲染或在着色器中使用。计算 UV 等操作不保证有效。
