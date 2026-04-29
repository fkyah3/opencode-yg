import type { MessageLike, ThinkingLikePart } from "./tag-messages";
export type ToolDropResult = "removed" | "truncated" | "absent" | "incomplete";
interface ToolCallObservation {
    callId: string;
    kind: "invocation" | "result";
}
export interface IndexedOccurrence {
    message: MessageLike;
    part: unknown;
    kind: "invocation" | "result";
}
export interface ToolCallIndexEntry {
    occurrences: IndexedOccurrence[];
    hasResult: boolean;
}
export type ToolCallIndex = Map<string, ToolCallIndexEntry>;
export declare function hasMeaningfulPart(part: unknown): boolean;
export declare function extractToolCallObservation(part: unknown): ToolCallObservation | null;
export declare class ToolMutationBatch {
    private partsToRemove;
    private affectedMessages;
    private messages;
    constructor(messages: MessageLike[]);
    markForRemoval(occurrence: IndexedOccurrence): void;
    finalize(): void;
}
export declare function createToolDropTarget(callId: string, thinkingParts: ThinkingLikePart[], index: ToolCallIndex, batch: ToolMutationBatch): {
    setContent: (content: string) => boolean;
    drop: () => ToolDropResult;
    truncate: () => ToolDropResult;
};
export {};
//# sourceMappingURL=tool-drop-target.d.ts.map