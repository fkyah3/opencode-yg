/**
 * Note nudge state machine.
 *
 * State: idle → (trigger fires + notes exist) → nudged → (any trigger fires again) → nudged → ...
 * Suppression: after a nudge fires, suppress until the NEXT trigger event (any of 3).
 *
 * Triggers:
 *   1. Post-historian completion — compartments just compressed history
 *   2. Post-commit detection — agent committed work, natural boundary
 *   3. Todos complete — agent finished planned work, receptive to deferred items
 *
 * The nudge itself is a short reminder folded into the existing nudge anchor.
 * It does NOT include note content — just a count and "use ctx_note read" hint.
 */
import type { Database } from "bun:sqlite";
export type NoteNudgeTrigger = "historian_complete" | "commit_detected" | "todos_complete";
/**
 * Signal that a trigger event occurred. Call from hook layer when any of the 3 triggers fire.
 */
export declare function onNoteTrigger(db: Database, sessionId: string, trigger: NoteNudgeTrigger): void;
/**
 * Peek at whether a note nudge should be injected during this transform pass.
 * Returns the nudge text if yes, null if no.
 * Does NOT clear triggerPending — call markNoteNudgeDelivered() after successful placement.
 *
 * @param currentUserMessageId - The latest user message ID in this transform pass.
 *   If it matches the trigger-time message, delivery is deferred to avoid busting
 *   the Anthropic prompt-cache prefix (the trigger fired during the agent's turn,
 *   so injecting into the current user message would mutate cached content).
 */
export declare function peekNoteNudgeText(db: Database, sessionId: string, currentUserMessageId?: string | null, projectIdentity?: string): string | null;
/**
 * Mark the note nudge as delivered after successful placement.
 * Only call after appendReminderToLatestUserMessage returns an anchor (or null if no user message exists).
 */
export declare function markNoteNudgeDelivered(db: Database, sessionId: string, text: string, messageId: string | null): void;
/**
 * Get sticky note nudge for replay on subsequent transform passes.
 * Returns { text, messageId } if a delivered nudge needs re-injection, null otherwise.
 */
export declare function getStickyNoteNudge(db: Database, sessionId: string): {
    text: string;
    messageId: string;
} | null;
/**
 * Legacy wrapper — peek + mark in one call.
 * Kept for tests; prefer peekNoteNudgeText + markNoteNudgeDelivered in production.
 */
export declare function getNoteNudgeText(db: Database, sessionId: string): string | null;
/**
 * Call when session is deleted or notes are read to clear persisted state.
 */
export declare function clearNoteNudgeState(db: Database, sessionId: string, options?: {
    persist?: boolean;
}): void;
//# sourceMappingURL=note-nudger.d.ts.map