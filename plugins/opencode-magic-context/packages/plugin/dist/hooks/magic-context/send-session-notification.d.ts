export interface NotificationParams {
    agent?: string;
    variant?: string;
    providerId?: string;
    modelId?: string;
}
export declare function sendIgnoredMessage(client: unknown, sessionId: string, text: string, params: NotificationParams): Promise<void>;
/**
 * Send a real user prompt that will be processed by the model (not ignored).
 * Used by /ctx-aug to inject the augmented prompt after sidekick completes.
 */
export declare function sendUserPrompt(client: unknown, sessionId: string, text: string): Promise<void>;
//# sourceMappingURL=send-session-notification.d.ts.map