import type { Database } from "bun:sqlite";
import { type ToolDefinition } from "@opencode-ai/plugin";
export interface CtxReduceToolDeps {
    db: Database;
    protectedTags: number;
    getSessionTokens?: (sessionId: string) => number;
}
export declare function createCtxReduceTools(deps: CtxReduceToolDeps): Record<string, ToolDefinition>;
//# sourceMappingURL=tools.d.ts.map