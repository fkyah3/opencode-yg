import { type SessionChunkLine } from "./read-session-formatting";
import { type RawMessage } from "./read-session-raw";
export { extractTexts, hasMeaningfulUserText } from "./read-session-formatting";
/** Strip system-reminder blocks and OMO markers from user text for chunk compaction. */
export declare function cleanUserText(text: string): string;
export interface SessionChunk {
    startIndex: number;
    endIndex: number;
    startMessageId: string;
    endMessageId: string;
    messageCount: number;
    tokenEstimate: number;
    hasMore: boolean;
    text: string;
    lines: SessionChunkLine[];
    /** Number of distinct commit clusters — assistant blocks with commits separated by meaningful user turns */
    commitClusterCount: number;
    /**
     * Contiguous ranges of raw message ordinals whose visible chunk content was
     * tool-only (TC: lines, no narrative text). Historian frequently skips such
     * ranges entirely — that's safe, so validation absorbs gaps that fall fully
     * within these ranges regardless of size. Gaps outside these ranges still
     * fail validation and trigger a repair retry.
     */
    toolOnlyRanges: Array<{
        start: number;
        end: number;
    }>;
}
export declare function withRawSessionMessageCache<T>(fn: () => T): T;
export declare function readRawSessionMessages(sessionId: string): RawMessage[];
export declare function getRawSessionMessageCount(sessionId: string): number;
export declare function getRawSessionTagKeysThrough(sessionId: string, upToMessageIndex: number): string[];
export declare function getProtectedTailStartOrdinal(sessionId: string): number;
export declare function readSessionChunk(sessionId: string, tokenBudget: number, offset?: number, eligibleEndOrdinal?: number): SessionChunk;
export declare function getRawSessionMessageIdsThrough(sessionId: string, endOrdinal: number): string[];
//# sourceMappingURL=read-session-chunk.d.ts.map