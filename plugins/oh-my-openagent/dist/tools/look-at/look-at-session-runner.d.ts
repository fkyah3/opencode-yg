import type { PluginInput } from "@opencode-ai/plugin";
import type { ToolContext } from "@opencode-ai/plugin/tool";
import type { LookAtFilePart } from "./look-at-input-preparer";
interface RunLookAtSessionInput {
    ctx: PluginInput;
    toolContext: ToolContext;
    goal: string;
    filePart: LookAtFilePart;
    isBase64Input: boolean;
}
export declare function runLookAtSession({ ctx, toolContext, goal, filePart, isBase64Input, }: RunLookAtSessionInput): Promise<string>;
export {};
