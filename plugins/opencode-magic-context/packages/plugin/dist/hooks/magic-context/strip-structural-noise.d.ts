import type { MessageLike } from "./tag-messages";
/**
 * Replace structural/cleared parts with empty-text sentinels instead of removing
 * them. Preserves message.parts length between passes so providers that hash
 * the serialized message array (proxy providers like Antigravity, some
 * OpenRouter configs) see a stable cache prefix across turns.
 *
 * For Anthropic/Bedrock/Google, OpenCode's provider/transform.ts drops empty
 * text/reasoning parts before the wire, so the sentinel disappears anyway —
 * producing the same wire shape as the previous behavior but avoiding
 * mid-pipeline array mutation.
 *
 * Idempotent: sentinels are themselves recognized on subsequent passes and
 * skipped (not re-mutated, not re-counted).
 */
export declare function stripStructuralNoise(messages: MessageLike[]): number;
//# sourceMappingURL=strip-structural-noise.d.ts.map