import type { NudgePlacementStore } from "./nudge-placement-store";
import type { MessageLike } from "./tag-messages";
export declare function reinjectNudgeAtAnchor(messages: MessageLike[], nudgeText: string, nudgePlacements: NudgePlacementStore, sessionId: string): boolean;
export declare function appendNudgeToAssistant(messages: MessageLike[], nudge: string, nudgePlacements: NudgePlacementStore, sessionId: string): void;
export declare function appendSupplementalNudgeToAssistant(messages: MessageLike[], nudge: string, nudgePlacements: NudgePlacementStore, sessionId: string): boolean;
export declare function canAppendSupplementalNudgeToAssistant(messages: MessageLike[], nudgePlacements: NudgePlacementStore, sessionId: string): boolean;
//# sourceMappingURL=nudge-injection.d.ts.map