import type { EmbeddingProvider } from "./embedding-provider";
export declare class LocalEmbeddingProvider implements EmbeddingProvider {
    readonly modelId: string;
    private readonly model;
    private pipeline;
    private initPromise;
    constructor(model?: string);
    initialize(): Promise<boolean>;
    embed(text: string, signal?: AbortSignal): Promise<Float32Array | null>;
    embedBatch(texts: string[], signal?: AbortSignal): Promise<(Float32Array | null)[]>;
    dispose(): Promise<void>;
    isLoaded(): boolean;
}
//# sourceMappingURL=embedding-local.d.ts.map