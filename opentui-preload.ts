// opentui-preload.ts — wrapper for @opentui/solid/preload
// Bun 1.3.13 has a bug resolving subpath exports from .bun-cached packages.
// This wrapper provides a resolvable entry point.
import { ensureSolidTransformPlugin } from "./node_modules/@opentui/solid/scripts/solid-plugin.ts"
ensureSolidTransformPlugin()
