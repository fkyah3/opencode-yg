import type { Config } from "@opencode-ai/sdk";
export declare const MAGIC_CONTEXT_COMMAND_NAMES: readonly ["ctx-status", "ctx-recomp", "ctx-flush", "ctx-aug", "ctx-dream"];
export type MagicContextCommandName = (typeof MAGIC_CONTEXT_COMMAND_NAMES)[number];
export type BuiltinCommandConfig = NonNullable<Config["command"]>;
//# sourceMappingURL=types.d.ts.map