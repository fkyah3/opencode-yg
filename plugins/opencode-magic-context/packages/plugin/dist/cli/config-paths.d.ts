export interface ConfigPaths {
    configDir: string;
    opencodeConfig: string;
    opencodeConfigFormat: "json" | "jsonc" | "none";
    magicContextConfig: string;
    omoConfig: string | null;
    tuiConfig: string;
    tuiConfigFormat: "json" | "jsonc" | "none";
}
export declare function detectConfigPaths(): ConfigPaths;
//# sourceMappingURL=config-paths.d.ts.map