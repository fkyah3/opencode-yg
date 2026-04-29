export interface JsoncParseResult<T> {
    data: T | null;
    errors: Array<{
        message: string;
        offset: number;
        length: number;
    }>;
}
type DetectPluginConfigResult = {
    format: "json" | "jsonc" | "none";
    path: string;
    legacyPath?: string;
};
export declare function parseJsonc<T = unknown>(content: string): T;
export declare function parseJsoncSafe<T = unknown>(content: string): JsoncParseResult<T>;
export declare function readJsoncFile<T = unknown>(filePath: string): T | null;
export declare function detectConfigFile(basePath: string): {
    format: "json" | "jsonc" | "none";
    path: string;
};
export declare function clearPluginConfigFileDetectionCache(): void;
export declare function detectPluginConfigFile(dir: string): DetectPluginConfigResult;
export {};
