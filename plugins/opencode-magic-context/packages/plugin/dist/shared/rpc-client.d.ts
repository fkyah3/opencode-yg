export declare class MagicContextRpcClient {
    private port;
    private portFilePath;
    private healthChecked;
    constructor(storageDir: string, directory: string);
    /** Call an RPC method. Retries port resolution if the server isn't ready yet. */
    call<T = Record<string, unknown>>(method: string, params?: Record<string, unknown>): Promise<T>;
    /** Check if the RPC server is reachable. */
    isAvailable(): Promise<boolean>;
    private resolvePort;
    private readPortFile;
    private healthCheck;
    private fetchWithTimeout;
    reset(): void;
}
//# sourceMappingURL=rpc-client.d.ts.map