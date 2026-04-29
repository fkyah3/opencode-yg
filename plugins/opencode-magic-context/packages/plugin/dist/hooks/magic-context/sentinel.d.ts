/**
 * Create an empty-text sentinel to replace a stripped message part while
 * preserving the array's length and index positions across passes.
 *
 * Why sentinels exist: some providers (Antigravity/Gemini-routed-Claude,
 * some OpenRouter configs) hash the full serialized messages[] array as
 * their prompt-cache key. Any array-length change between turns busts the
 * cache. Replacing removed parts with inert `{type:"text", text:""}`
 * placeholders keeps the array shape stable so subsequent turns can hit
 * cache on the unchanged prefix.
 *
 * For Anthropic/Bedrock/Google-SDK providers, `provider/transform.ts:55-73`
 * (or the SDK itself) filters out parts where `text === ""`, so the
 * sentinel never reaches the wire. Wire behavior stays identical to the
 * previous `.filter()`/`.splice()` behavior.
 *
 * `cache_control` inheritance: if the original part carried provider-side
 * cache-breakpoint metadata (`cache_control` / `cacheControl`), the
 * sentinel inherits it. OpenCode currently only sets cache markers on the
 * last two system+non-system messages (never on mid-history parts we
 * strip), so this is defensive, but cheap.
 */
export declare function makeSentinel(originalPart: unknown): {
    type: "text";
    text: "";
} & Record<string, unknown>;
/**
 * Detect whether a part is already an empty-text sentinel produced by
 * `makeSentinel`. Used by strip functions to stay idempotent — don't
 * re-count or re-mutate a sentinel we already installed.
 */
export declare function isSentinel(part: unknown): boolean;
/**
 * Replay a previously-persisted set of message IDs by replacing each
 * matching message's parts with a single empty-text sentinel. Used to keep
 * the wire shape stable across defer passes when OpenCode rebuilds messages
 * from its DB — any message whose ID is in `ids` was neutralized on a prior
 * bust pass and should be neutralized again now.
 *
 * Returns the number of messages replayed + the set of IDs that were NOT
 * found in the current message array (caller can prune them from the
 * persisted set so we stop carrying stale IDs forever).
 */
export declare function replaySentinelByMessageIds(messages: Array<{
    info: {
        id?: string;
    };
    parts: unknown[];
}>, ids: Set<string>): {
    replayed: number;
    missingIds: string[];
};
//# sourceMappingURL=sentinel.d.ts.map