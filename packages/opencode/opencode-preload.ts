// opencode-preload.ts — local Solid transform plugin preload
// Uses @opentui/solid/bun-plugin (the package export key for scripts/solid-plugin.ts)
// Not @opentui/solid/scripts/solid-plugin.ts (that subpath isn't in exports map)
import { ensureSolidTransformPlugin } from "@opentui/solid/bun-plugin"
ensureSolidTransformPlugin()