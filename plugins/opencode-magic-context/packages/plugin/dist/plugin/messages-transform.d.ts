type MessageWithParts = {
    info: import("@opencode-ai/sdk").Message;
    parts: import("@opencode-ai/sdk").Part[];
};
type MessagesTransformOutput = {
    messages: MessageWithParts[];
};
/**
 * Top-level transform wrapper. Catches errors so OpenCode's prompt loop
 * always proceeds — without this guard, a transient DB contention event can
 * crash the user's turn through OpenCode's Effect pipeline. See issue #23:
 * https://github.com/cortexkit/opencode-magic-context/issues/23
 *
 * Error handling is tiered:
 *
 * - **SQLITE_BUSY**: Transient, expected from concurrent plugin processes
 *   (second OpenCode instance, long dreamer/historian child session, slow
 *   WAL checkpoint). Logged tersely; next pass will retry naturally. No
 *   persistent telemetry needed.
 *
 * - **Non-BUSY errors**: Schema corruption, programming bugs, type errors.
 *   These can silently disable magic-context for the entire session if the
 *   error repeats on every pass. We:
 *     1. Log with full detail (code, name, message, stack).
 *     2. Persist a short error summary into `session_meta.last_transform_error`
 *        so the sidebar/dashboard surfaces the failure state. The sidebar
 *        already reads this field; runPostTransformPhase's catch only fires
 *        for errors that reach it, and an error thrown early enough bypasses
 *        it entirely. Writing it here at the outer boundary guarantees
 *        observability.
 *     3. Return with messages unmodified for this pass.
 *
 * In both cases we NEVER rethrow — OpenCode's Effect pipeline turns thrown
 * errors into user-visible prompt failures. We accept degraded behavior
 * (no injection / no drops this turn) rather than blocking the user.
 *
 * Correctness is preserved because all persistent state mutations inside
 * the inner transform are idempotent across passes.
 */
export declare function createMessagesTransformHandler(args: {
    magicContext: {
        "experimental.chat.messages.transform"?: (input: Record<string, never>, output: MessagesTransformOutput) => Promise<void>;
    } | null;
}): (input: Record<string, never>, output: MessagesTransformOutput) => Promise<void>;
export {};
//# sourceMappingURL=messages-transform.d.ts.map