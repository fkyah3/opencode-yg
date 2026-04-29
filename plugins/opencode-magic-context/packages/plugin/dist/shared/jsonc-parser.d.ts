export declare function parseJsonc<T = unknown>(content: string): T;
export declare function readJsoncFile<T = unknown>(filePath: string): T | null;
export declare function detectConfigFile(basePath: string): {
    format: "json" | "jsonc" | "none";
    path: string;
};
//# sourceMappingURL=jsonc-parser.d.ts.map