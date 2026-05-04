## MovieWriter <- Object（对象）

Godot 可以使用非实时模拟录制视频。与 `--fixed-fps` 类似，这会强制 `Node._process` 函数中报告的 `delta` 在帧之间保持一致，无论实际渲染该帧花费了多长时间。这可以用来录制高质量、帧节奏完美的视频，不受硬件能力的限制。Godot 有 3 个内置的 MovieWriter：- OGV 容器，使用 Theora 视频编码和 Vorbis 音频编码（`.ogv` 文件扩展名）。有损压缩，文件大小适中，编码速度快。有损压缩质量可以通过更改 `ProjectSettings.editor/movie_writer/video_quality` 和 `ProjectSettings.editor/movie_writer/ogv/audio_quality` 来调整。生成的文件可以在 Godot 中使用 VideoStreamPlayer 和大多数视频播放器查看，但不能在 Web 浏览器中查看，因为它们不支持 Theora。- AVI 容器，使用 MJPEG 视频编码和未压缩音频（`.avi` 文件扩展名）。有损压缩，文件大小适中，编码速度快。有损压缩质量可以通过更改 `ProjectSettings.editor/movie_writer/video_quality` 来调整。生成的文件可以在大多数视频播放器中查看，但必须转换为其他格式才能在 Web 上查看或由 Godot 的 VideoStreamPlayer 查看。MJPEG 不支持透明度。AVI 输出目前最大限制为 4 GB 文件大小。- PNG 图像序列用于视频，WAV 用于音频（`.png` 文件扩展名）。无损压缩，文件大，编码速度慢。设计用于在录制后使用其他工具编码为视频文件。目前不支持透明度，即使根视口设置为透明也不行。如果您需要编码为不同格式或通过第三方软件传输流，可以扩展 MovieWriter 类以创建自己的电影写入器。出于性能原因，通常应使用 GDExtension 来实现。

**方法（Methods）：**
- add_writer(writer: MovieWriter)
