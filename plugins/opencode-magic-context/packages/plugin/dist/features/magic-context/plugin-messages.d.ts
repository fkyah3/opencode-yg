import type { Database } from "bun:sqlite";
/**
 * SQLite-backed message bus for TUI ↔ server plugin communication.
 *
 * Both the server plugin and TUI plugin share the same `context.db`.
 * Messages are written by one side and consumed by the other via polling.
 *
 * Directions:
 *   - "server_to_tui": Server sends toasts, dialogs, state updates to TUI
 *   - "tui_to_server": TUI sends dialog confirmations, action triggers to server
 *
 * Message types:
 *   - "toast": Show a toast notification { message, variant?, duration? }
 *   - "dialog_confirm": Show a confirmation dialog { id, title, message }
 *   - "dialog_result": TUI response to a dialog { id, confirmed }
 *   - "state_update": State change hint { key, value }
 *
 * Messages are auto-cleaned after 5 minutes to prevent table bloat.
 */
export type MessageDirection = "server_to_tui" | "tui_to_server";
export type MessageType = "toast" | "dialog_confirm" | "dialog_result" | "state_update" | "action";
export interface PluginMessage {
    id: number;
    direction: MessageDirection;
    type: MessageType;
    payload: Record<string, unknown>;
    sessionId: string | null;
    createdAt: number;
    consumedAt: number | null;
}
/**
 * Send a message from server to TUI.
 */
export declare function sendToTui(db: Database, type: MessageType, payload: Record<string, unknown>, sessionId?: string): number;
/**
 * Send a message from TUI to server.
 */
export declare function sendToServer(db: Database, type: MessageType, payload: Record<string, unknown>, sessionId?: string): number;
/**
 * Consume unconsumed messages for a given direction.
 * Marks consumed messages and returns them.
 * Also cleans up old messages (>5min) to prevent table bloat.
 */
export declare function consumeMessages(db: Database, direction: MessageDirection, options?: {
    type?: MessageType;
    sessionId?: string;
}): PluginMessage[];
/**
 * Peek at unconsumed messages without consuming them.
 */
export declare function peekMessages(db: Database, direction: MessageDirection, options?: {
    type?: MessageType;
    sessionId?: string;
}): PluginMessage[];
/**
 * Convenience: send a toast to TUI.
 */
export declare function sendTuiToast(db: Database, message: string, options?: {
    variant?: "info" | "warning" | "error" | "success";
    duration?: number;
    sessionId?: string;
}): number;
/**
 * Convenience: send a confirmation dialog request to TUI.
 * Returns the message ID which the TUI will reference in its dialog_result response.
 */
export declare function sendTuiConfirmDialog(db: Database, id: string, title: string, message: string, sessionId?: string): number;
/**
 * Convenience: check for a dialog result from TUI.
 * Returns the confirmation result or null if not yet responded.
 */
export declare function checkDialogResult(db: Database, dialogId: string): {
    confirmed: boolean;
} | null;
//# sourceMappingURL=plugin-messages.d.ts.map