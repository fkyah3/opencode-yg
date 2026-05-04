## VisualShaderNodeFaceForward（可视化着色器朝向调整节点） <- VisualShaderNodeVectorBase（可视化着色器向量基类）

对应着色器语言中的 `faceforward(N, I, Nref)`。该函数包含三个向量参数：`N`（待定向向量）、`I`（入射向量）和 `Nref`（参考向量）。如果 `I` 与 `Nref` 的点积小于零，则返回 `N`，否则返回 `-N`。
