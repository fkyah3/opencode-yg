/**
 * Live verification of an OpenAI-compatible embeddings endpoint.
 *
 * Used by `doctor` (Node) and shared in spirit with the dashboard Rust
 * `test_embedding_endpoint` command — both POST `{model, input}` to
 * `${endpoint}/embeddings` and classify the response. Keeping the two
 * implementations parallel is intentional: doctor runs in the plugin's Node
 * runtime where `fetch` + `AbortSignal.timeout` are available, while the
 * dashboard uses Rust `reqwest` for reasons of its own async stack.
 */
export type EmbeddingProbeOutcome = {
    kind: "ok";
    status: number;
    dimensions: number | null;
} | {
    kind: "auth_failed";
    status: number;
    preview: string;
} | {
    kind: "endpoint_unsupported";
    status: number;
    preview: string;
} | {
    kind: "http_error";
    status: number;
    preview: string;
} | {
    kind: "network_error";
    message: string;
} | {
    kind: "timeout";
    timeoutMs: number;
} | {
    kind: "invalid_scheme";
    endpoint: string;
};
export interface EmbeddingProbeOptions {
    /**
     * Base endpoint (e.g. `https://api.openai.com/v1`). `/embeddings` is
     * appended by the probe. Trailing slashes are trimmed so both
     * `https://host/v1` and `https://host/v1/` work.
     */
    endpoint: string;
    model: string;
    apiKey?: string;
    /** Milliseconds before aborting the request. Defaults to 10000. */
    timeoutMs?: number;
    /**
     * Optional fetch override, used only by tests to avoid hitting real
     * network endpoints. Matches the signature of the global `fetch` loosely
     * so callers can drop a mock implementation in without overloads.
     */
    fetch?: typeof fetch;
}
/**
 * Probe an embeddings endpoint and classify the outcome.
 *
 * - 2xx with at least one `data[].embedding` array → `ok` with dimension count
 * - 2xx without `data[].embedding` → `endpoint_unsupported` (e.g. routers
 *   that accept the URL but don't implement the embeddings spec)
 * - 401 / 403 → `auth_failed`
 * - 404 / 405 → `endpoint_unsupported` (route not available at this URL)
 * - Other non-2xx → `http_error` with preview
 * - `AbortError` from timeout → `timeout`
 * - Any other thrown error → `network_error`
 * - Missing or non-http(s) scheme → `invalid_scheme` (no request made)
 */
export declare function probeEmbeddingEndpoint(options: EmbeddingProbeOptions): Promise<EmbeddingProbeOutcome>;
//# sourceMappingURL=embedding-probe.d.ts.map