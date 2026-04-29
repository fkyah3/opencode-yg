import { type MagicContextConfig } from "./schema/magic-context";
export interface MagicContextPluginConfig extends MagicContextConfig {
    disabled_hooks?: string[];
    command?: Record<string, {
        template: string;
        description?: string;
        agent?: string;
        model?: string;
        subtask?: boolean;
    }>;
}
export declare function loadPluginConfig(directory: string): MagicContextPluginConfig & {
    configWarnings?: string[];
};
//# sourceMappingURL=index.d.ts.map