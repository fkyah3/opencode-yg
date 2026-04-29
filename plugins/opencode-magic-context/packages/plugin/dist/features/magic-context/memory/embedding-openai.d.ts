import type { EmbeddingProvider } from "./embedding-provider";
interface OpenAICompatibleEmbeddingProviderOptions {
    endpoint?: string;
    model?: string;
    apiKey?: string;
}
type CircuitState = "closed" | "open" | "half_open";
export declare class OpenAICompatibleEmbeddingProvider implements EmbeddingProvider {
    readonly modelId: string;
    private readonly endpoint;
    private readonly model;
    private readonly apiKey;
    private initialized;
    private failureTimes;
    private circuitOpenUntil;
    private openLogged;
    /** True while a half-open probe is in flight. Only the caller who set this
     *  to true is allowed to make a real HTTP call; everyone else short-
     *  circuits as if the circuit were still OPEN. */
    private halfOpenProbeInFlight;
    constructor(options: OpenAICompatibleEmbeddingProviderOptions);
    initialize(): Promise<boolean>;
    embed(text: string, signal?: AbortSignal): Promise<Float32Array | null>;
    embedBatch(texts: string[], signal?: AbortSignal): Promise<(Float32Array | null)[]>;
    dispose(): Promise<void>;
    isLoaded(): boolean;
    /**
     * Decide what this caller should do:
     *   - "allow":         CLOSED — proceed with a real request, not as a probe
     *   - "probe":         HALF_OPEN — this caller owns the probe slot
     *   - "short_circuit": OPEN or half-open probe already in flight — return nulls
     *
     * Claiming the probe slot (setting `halfOpenProbeInFlight = true`) is done
     * here, synchronously, so concurrent callers see the flag and short-circuit.
     */
    private claimProbeOrShortCircuit;
    private recordFailure;
    private recordSuccess;
    _getCircuitState(): CircuitState;
    _getFailureCount(): number;
    _resetCircuit(): void;
}
export {};
//# sourceMappingURL=embedding-openai.d.ts.map