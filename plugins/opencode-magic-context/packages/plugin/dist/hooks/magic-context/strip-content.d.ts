import type { MessageLike, ThinkingLikePart } from "./tag-messages";
/**
 * Neutralize system-injected messages (notifications, reminders, internal markers).
 * These are internal plumbing messages that should never reach the LLM.
 * Only neutralizes messages BEFORE `protectedTailStart` — recent messages in the
 * protected tail may contain actionable info (e.g., background task completion
 * notifications with task IDs the agent needs for background_output).
 *
 * Returns both the count of neutralized messages and the set of their IDs so
 * callers can persist-and-replay the decision across defer passes (cache-safe
 * — OpenCode rebuilds messages from its DB every turn, so the sentinel needs
 * to be re-applied each transform).
 *
 * Cache safety: replaces each matched message's parts with a single empty-text
 * sentinel instead of splicing the message out of the array. Preserves array
 * length so proxy providers that hash message-array structure see a stable
 * prefix. For Anthropic/Bedrock, the provider's upstream filter drops
 * empty-content messages on the wire anyway — same effective behavior, no
 * mid-pipeline array mutation.
 */
export declare function stripSystemInjectedMessages(messages: MessageLike[], protectedTailStart: number): {
    stripped: number;
    sentineledIds: string[];
};
/**
 * Neutralize messages that consist entirely of [dropped §N§] placeholders.
 * These are leftover shells after ctx_reduce drops their content — keeping
 * their original text wastes tokens without providing any value since there
 * is no recall mechanism.
 *
 * User-role messages are NEVER neutralized, even if their only text is a
 * dropped placeholder. Removing (or emptying) a user message between two
 * assistants collapses the turn boundary, which causes the AI SDK's Anthropic
 * adapter to merge consecutive assistants into a single "latest assistant"
 * block containing signed thinking. The merged block's signature no longer
 * matches the original, triggering:
 *   "thinking or redacted_thinking blocks in the latest assistant message
 *    cannot be modified"
 *
 * For user messages whose content the agent wanted to drop, apply-operations
 * emits a `[truncated §N§]` preview instead of a full `[dropped §N§]`, which
 * keeps the shell visible and preserves the turn boundary.
 *
 * Cache safety: replaces matched messages' parts with a single empty-text
 * sentinel instead of splicing the messages out of the array. Preserves array
 * length so proxy providers that hash message-array structure see a stable
 * prefix. For Anthropic/Bedrock, OpenCode's upstream filter drops empty
 * content messages on the wire — same effective behavior, no mid-pipeline
 * array mutation.
 *
 * Returns both count and sentineled IDs so callers can persist-and-replay.
 */
export declare function stripDroppedPlaceholderMessages(messages: MessageLike[]): {
    stripped: number;
    sentineledIds: string[];
};
/**
 * Replay persisted reasoning clearing on every pass (including defer).
 * Clears reasoning for all messages with tag <= persistedWatermark.
 * This ensures clearing is sticky across passes even when OpenCode
 * rebuilds messages fresh from its own DB.
 */
export declare function replayClearedReasoning(messages: MessageLike[], reasoningByMessage: Map<MessageLike, ThinkingLikePart[]>, messageTagNumbers: Map<MessageLike, number>, persistedWatermark: number, skipTypedReasoningCleanup?: boolean): number;
/**
 * Replay persisted inline thinking stripping on every pass (including defer).
 * Strips inline <thinking> tags for all messages with tag <= persistedWatermark.
 */
export declare function replayStrippedInlineThinking(messages: MessageLike[], messageTagNumbers: Map<MessageLike, number>, persistedWatermark: number): number;
export declare function clearOldReasoning(messages: MessageLike[], reasoningByMessage: Map<MessageLike, ThinkingLikePart[]>, messageTagNumbers: Map<MessageLike, number>, clearReasoningAge: number, skipTypedReasoningCleanup?: boolean): number;
/**
 * Neutralize cleared reasoning parts (those with thinking or text set to
 * "[cleared]" by clearOldReasoning). Replaces them in place with empty-text
 * sentinels so message.parts length stays constant between passes.
 *
 * See strip-structural-noise.ts for the cache-safety rationale. For
 * Anthropic/Bedrock, OpenCode's provider/transform.ts:65 drops empty text
 * parts before the wire, so the sentinel never reaches the provider — same
 * effective wire shape as the previous filter-based behavior but no
 * mid-pipeline array mutation.
 *
 * Gate: `skipTypedReasoningCleanup=true` short-circuits for providers whose
 * capability.interleaved.field requires typed reasoning_content on the wire
 * (Moonshot/Kimi).
 */
export declare function stripClearedReasoning(messages: MessageLike[], skipTypedReasoningCleanup?: boolean): number;
export declare function stripInlineThinking(messages: MessageLike[], messageTagNumbers: Map<MessageLike, number>, clearReasoningAge: number): number;
export declare function truncateErroredTools(messages: MessageLike[], watermark: number, messageTagNumbers: Map<MessageLike, number>): number;
/**
 * Work around @ai-sdk/anthropic's groupIntoBlocks behavior plus opus-4.7's
 * strict thinking-block position validation.
 *
 * Two structural sources of invalid payloads exist, both triggering:
 *   "thinking or redacted_thinking blocks in the latest assistant message
 *    cannot be modified. These blocks must remain as they were in the
 *    original response."
 *
 * (1) ACROSS assistants: @ai-sdk/anthropic's groupIntoBlocks merges
 *     consecutive OpenCode assistant messages into one Anthropic assistant
 *     block. Each source assistant's signed reasoning gets emitted as its
 *     own thinking block — the merged block ends up with thinking
 *     INTERLEAVED between text/tool_use.
 *
 * (2) WITHIN ONE assistant: opus-4.7 with interleaved thinking produces
 *     multiple reasoning parts in a single OpenCode assistant message
 *     (observed: up to 12 reasoning parts per message). AI SDK passes each
 *     through verbatim, again producing interleaved thinking.
 *
 * Both cases can coexist. The only layout opus-4.7 reliably accepts is:
 *   [thinking at index 0 (optional)] followed by text/tool_use only,
 * i.e. AT MOST ONE thinking block per consecutive assistant run, and that
 * thinking block must be the very first non-metadata part.
 *
 * Rule enforced here:
 *   - For each consecutive assistant run, keep AT MOST ONE reasoning part.
 *   - That reasoning part must be the first non-metadata content part of
 *     the first assistant in the run. Otherwise strip all reasoning from
 *     the run.
 *
 * Trade-off: the model loses visibility into its own intermediate-step
 * reasoning for multi-step turns. The first step's reasoning is preserved
 * when possible, which carries enough cache continuity for Anthropic.
 *
 * Upstream bug (track with smart note #38, remove this workaround when
 * fixed): @ai-sdk/anthropic's groupIntoBlocks +
 * convert-to-anthropic-messages-prompt.ts (case 'assistant'). Same class
 * fixed for Bedrock in vercel/ai#13583/#13972.
 */
export declare function stripReasoningFromMergedAssistants(messages: MessageLike[]): number;
/**
 * Neutralize large image-data-URL file parts on already-processed user
 * messages. Replaces them in place with empty-text sentinels so message
 * parts length stays constant between passes — cache-prefix stability on
 * proxy providers, unchanged wire shape on Anthropic/Bedrock where
 * OpenCode's upstream filter drops empty text parts.
 */
export declare function stripProcessedImages(messages: MessageLike[], watermark: number, messageTagNumbers: Map<MessageLike, number>): number;
//# sourceMappingURL=strip-content.d.ts.map