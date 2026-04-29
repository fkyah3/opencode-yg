type RpcHandler = (params: Record<string, unknown>) => Promise<Record<string, unknown>>;
export declare class MagicContextRpcServer {
    private server;
    private port;
    private handlers;
    private portFilePath;
    constructor(storageDir: string, directory: string);
    /** Register an RPC method handler. */
    handle(method: string, handler: RpcHandler): void;
    /** Start the server on a random port, write port to disk. */
    start(): Promise<number>;
    /** Stop the server and clean up port file. */
    stop(): void;
    private dispatch;
}
export {};
//# sourceMappingURL=rpc-server.d.ts.map