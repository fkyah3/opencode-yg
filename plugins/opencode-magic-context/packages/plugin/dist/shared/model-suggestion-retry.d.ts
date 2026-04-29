import type { createOpencodeClient } from "@opencode-ai/sdk";
type Client = ReturnType<typeof createOpencodeClient>;
type PromptBody = {
    model?: {
        providerID: string;
        modelID: string;
    };
    [key: string]: unknown;
};
type PromptArgs = {
    path: {
        id: string;
    };
    body: PromptBody;
    signal?: AbortSignal;
    [key: string]: unknown;
};
export interface PromptRetryOptions {
    timeoutMs?: number;
    /** External abort signal — cancels the in-flight LLM prompt immediately when aborted */
    signal?: AbortSignal;
}
export interface ModelSuggestionInfo {
    providerID: string;
    modelID: string;
    suggestion: string;
}
export declare function parseModelSuggestion(error: unknown): ModelSuggestionInfo | null;
export declare function promptSyncWithModelSuggestionRetry(client: Client, args: PromptArgs, options?: PromptRetryOptions): Promise<void>;
export {};
//# sourceMappingURL=model-suggestion-retry.d.ts.map