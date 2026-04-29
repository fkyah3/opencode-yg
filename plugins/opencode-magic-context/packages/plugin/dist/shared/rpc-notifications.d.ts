/**
 * In-memory notification queue for server→TUI push.
 * Replaces SQLite plugin_messages table.
 *
 * Also tracks whether a TUI client is actively connected (polling).
 * The server plugin cannot use `process.env.OPENCODE_CLIENT` to detect TUI
 * because the server runs in a separate process from the TUI client.
 */
export interface RpcNotification {
    type: string;
    payload: Record<string, unknown>;
    sessionId?: string;
}
/** Push a notification for TUI to pick up via polling. */
export declare function pushNotification(type: string, payload: Record<string, unknown>, sessionId?: string): void;
/** Drain and return all pending notifications atomically.
 *  Also marks TUI as connected since only TUI polls this. */
export declare function drainNotifications(): RpcNotification[];
/** Whether a TUI client has connected and is polling for notifications. */
export declare function isTuiConnected(): boolean;
//# sourceMappingURL=rpc-notifications.d.ts.map