/**
 * Stable hash for a project directory — scopes RPC port files per-project
 * so multiple OpenCode instances don't collide.
 */
export declare function projectHash(directory: string): string;
/** Per-project RPC port file path. */
export declare function rpcPortFilePath(storageDir: string, directory: string): string;
//# sourceMappingURL=rpc-utils.d.ts.map