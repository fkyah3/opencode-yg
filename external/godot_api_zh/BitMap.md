## BitMap（位图） <- Resource（资源）

一个二维布尔值数组，可用于高效存储二进制矩阵（每个矩阵元素仅占一位）并使用自然笛卡尔坐标查询值。

**方法（Methods）：**
- convert_to_image() -> Image —— 转换为图像
- create(size: Vector2i) —— 创建位图
- create_from_image_alpha(image: Image, threshold: float = 0.1) —— 从图像的 Alpha 通道创建
- get_bit(x: int, y: int) -> bool —— 获取位值
- get_bitv(position: Vector2i) -> bool —— 通过向量位置获取位值
- get_size() -> Vector2i —— 获取尺寸
- get_true_bit_count() -> int —— 获取 true 位的数量
- grow_mask(pixels: int, rect: Rect2i) —— 扩展遮罩
- opaque_to_polygons(rect: Rect2i, epsilon: float = 2.0) -> PackedVector2Array[] —— 将不透明区域转换为多边形
- resize(new_size: Vector2i) —— 调整大小
- set_bit(x: int, y: int, bit: bool) —— 设置位值
- set_bit_rect(rect: Rect2i, bit: bool) —— 设置矩形区域内的位值
- set_bitv(position: Vector2i, bit: bool) —— 通过向量位置设置位值
