/**
 * Resolve per-model context limits to match whatever OpenCode itself sees.
 *
 * Two layers:
 *
 *   1. API cache (primary): populated asynchronously via
 *      `client.config.providers()`. OpenCode's own provider service merges
 *      the live models.dev cache file, its compiled-in snapshot fallback,
 *      opencode.json custom provider overrides, and derived experimental
 *      modes. Whatever OpenCode reports is the source of truth.
 *
 *   2. File cache (fallback): read-from-disk parse of OpenCode's
 *      `models.json` plus `opencode.json(c)` custom provider entries.
 *      Used during cold starts before the API cache warms up and in any
 *      code path that cannot reach the SDK client.
 *
 * The public getters (`getModelsDevContextLimit()` and
 * `getModelsDevInterleavedField()`) are synchronous: they check the API cache
 * first, then the file cache. The plugin warms and refreshes the API cache
 * from `src/index.ts` at startup and on a timer.
 */
interface OpencodeClientLike {
    config: {
        providers: () => Promise<{
            data?: {
                providers?: unknown;
            };
        }>;
    };
}
/**
 * Asynchronously refresh the API-layer cache from OpenCode's SDK.
 *
 * Call this at plugin startup and periodically (e.g. every 5 minutes) from
 * `src/index.ts`. OpenCode's `/config/providers` endpoint returns every
 * provider with full model metadata — including `limit.context` — resolved
 * through the same path OpenCode itself uses (live cache + compiled-in
 * snapshot + opencode.json overrides + derived experimental modes).
 *
 * Safe to call concurrently; only overwrites the cache on success.
 */
export declare function refreshModelLimitsFromApi(client: OpencodeClientLike): Promise<void>;
/**
 * Returns the context limit for a provider/model.
 *
 * Lookup order:
 *   1. API cache (populated by {@link refreshModelLimitsFromApi}). Matches
 *      what OpenCode sees exactly, including snapshot-only models.
 *   2. File cache (parsed from models.json + opencode.json overrides).
 *      Used before the API cache warms and as a last resort.
 *
 * Returns `undefined` if neither layer knows the model.
 */
export declare function getModelsDevContextLimit(providerID: string, modelID: string): number | undefined;
/**
 * Returns the provider-specific interleaved reasoning field when the model
 * requires one (for example `reasoning_content` for Moonshot/Kimi style
 * providers). Undefined means the cache has no such capability recorded.
 */
export declare function getModelsDevInterleavedField(providerID: string, modelID: string): string | undefined;
/** Clear in-memory caches (for testing). */
export declare function clearModelsDevCache(): void;
/** Inspection helpers (for logging / debugging). */
export declare function getModelsDevCacheState(): {
    apiLoaded: boolean;
    apiCount: number;
    apiAgeMs: number;
    fileCount: number;
};
export {};
//# sourceMappingURL=models-dev-cache.d.ts.map