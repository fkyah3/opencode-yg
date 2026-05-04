## LightmapProbe <- Node3D（节点3D）

LightmapProbe 表示一个单独手动放置的探针位置，用于 LightmapGI 的动态对象照明。光照图探针影响 `GeometryInstance3D.gi_mode` 设置为 `GeometryInstance3D.GI_MODE_DYNAMIC` 的 GeometryInstance3D 派生节点的光照。通常，LightmapGI 探针通过将 `LightmapGI.generate_probes_subdiv` 设置为除 `LightmapGI.GENERATE_PROBES_DISABLED` 以外的值来自动放置。通过在烘焙光照图之前创建 LightmapProbe 节点，您可以在特定区域添加更多探针以获得更精细的细节，或者禁用自动生成而仅依赖手动放置的探针。**注意：** 在烘焙光照图之后放置的 LightmapProbe 节点将被动态对象忽略。您必须在创建或修改 LightmapProbe 后重新烘焙光照图，探针才能生效。
