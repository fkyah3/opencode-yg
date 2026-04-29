import type { Database } from "bun:sqlite";
import type { RawMessage } from "../../hooks/magic-context/read-session-raw";
export type SearchSource = "memory" | "message" | "git_commit";
export interface UnifiedSearchOptions {
    limit?: number;
    memoryEnabled?: boolean;
    embeddingEnabled?: boolean;
    readMessages?: (sessionId: string) => RawMessage[];
    embedQuery?: (text: string, signal?: AbortSignal) => Promise<Float32Array | null>;
    isEmbeddingRuntimeEnabled?: () => boolean;
    /** Only return message-history hits with ordinal ≤ this value (e.g. last compartment end). -1 or omit to search all. */
    maxMessageOrdinal?: number;
    /** Include indexed git commits in the result set. Default false — the
     *  feature is gated behind experimental.git_commit_indexing config. */
    gitCommitsEnabled?: boolean;
    /** Restrict results to these sources. Omit or pass undefined to search all
     *  enabled sources. Empty array is treated as "no sources enabled" → [].
     *  Facts are NOT a source — they're already always rendered in the
     *  <session-history> block injected into message[0]. */
    sources?: SearchSource[];
    /** Hard-filter memories already rendered in <session-history>. The agent
     *  can see them in message[0] — surfacing them via ctx_search wastes
     *  tokens and crowds out high-signal raw-history hits. Pass null or omit
     *  to disable filtering (for callers outside the transform context that
     *  can't resolve the visible set). */
    visibleMemoryIds?: Set<number> | null;
    /** Abort signal — if provided, cancels in-flight embedding requests
     *  (and any downstream HTTP calls) when the caller gives up. Used by
     *  transform-hot-path callers like auto-search whose own 3s timeout
     *  needs to cancel the 30s embedding fetch. */
    signal?: AbortSignal;
    /** When true (default), increment retrieval_count on memory hits. Explicit
     *  `ctx_search` tool calls from the agent SHOULD count — the agent asked
     *  for the memory, saw it, and used it. Plugin-internal automatic surfacing
     *  (e.g. auto-search hints appended to every user prompt) should NOT count
     *  because the agent may never actually consume the hint, and even if they
     *  do, automatic surfacing doesn't indicate usefulness. Mis-counting drives
     *  spurious retrieval-count-based memory promotion decisions. */
    countRetrievals?: boolean;
}
export interface MemorySearchResult {
    source: "memory";
    content: string;
    score: number;
    memoryId: number;
    category: string;
    matchType: "semantic" | "fts" | "hybrid";
}
export interface MessageSearchResult {
    source: "message";
    content: string;
    score: number;
    messageOrdinal: number;
    messageId: string;
    role: string;
}
export interface GitCommitSearchResult {
    source: "git_commit";
    content: string;
    score: number;
    sha: string;
    shortSha: string;
    author: string | null;
    committedAtMs: number;
    matchType: "semantic" | "fts" | "hybrid";
}
export type UnifiedSearchResult = MemorySearchResult | MessageSearchResult | GitCommitSearchResult;
export declare function unifiedSearch(db: Database, sessionId: string, projectPath: string, query: string, options?: UnifiedSearchOptions): Promise<UnifiedSearchResult[]>;
//# sourceMappingURL=search.d.ts.map