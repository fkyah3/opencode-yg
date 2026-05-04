## ImageTexture3D（图像纹理3D）<- Texture3D（纹理3D）

ImageTexture3D 是一个三维的 ImageTexture，具有宽度、高度和深度。另见 ImageTextureLayered。3D 纹理通常用于存储 FogMaterial 的密度图、Environment 的颜色校正 LUT、GPUParticlesAttractorVectorField3D 的向量场以及 GPUParticlesCollisionSDF3D 的碰撞图。3D 纹理也可用于自定义着色器。

**方法（Methods）：**
- create(format: int, width: int, height: int, depth: int, use_mipmaps: bool, data: Image[]) -> int
- update(data: Image[])
