import type { MessageLike } from "./transform-operations";
export declare function findSessionId(messages: MessageLike[]): string | null;
export declare function findLastUserMessageId(messages: MessageLike[]): string | null;
export declare function appendReminderToLatestUserMessage(messages: MessageLike[], reminder: string): string | null;
export declare function appendReminderToUserMessageById(messages: MessageLike[], messageId: string, reminder: string): boolean;
export declare function countMessagesSinceLastUser(messages: MessageLike[]): number;
//# sourceMappingURL=transform-message-helpers.d.ts.map