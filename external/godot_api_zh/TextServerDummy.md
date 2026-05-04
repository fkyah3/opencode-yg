## TextServerDummy（文本服务器虚拟实现） <- TextServerExtension（文本服务器扩展）

一个不执行任何操作的虚拟 TextServer 接口。当不需要渲染文本时，可用于释放内存，因为文本服务器资源消耗较高。它还可以用于复杂 GUI 中的性能比较，以检查文本渲染的影响。虚拟文本服务器在项目启动时始终可用。以下是访问方式：命令行参数 `--text-driver Dummy`（区分大小写）可用于强制任何项目使用"Dummy"TextServer。
