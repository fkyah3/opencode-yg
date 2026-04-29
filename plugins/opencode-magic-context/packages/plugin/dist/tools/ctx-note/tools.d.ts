import type { Database } from "bun:sqlite";
import { type ToolDefinition } from "@opencode-ai/plugin";
export interface CtxNoteToolDeps {
    db: Database;
    dreamerEnabled?: boolean;
    projectIdentity?: string;
}
export declare function createCtxNoteTools(deps: CtxNoteToolDeps): Record<string, ToolDefinition>;
//# sourceMappingURL=tools.d.ts.map