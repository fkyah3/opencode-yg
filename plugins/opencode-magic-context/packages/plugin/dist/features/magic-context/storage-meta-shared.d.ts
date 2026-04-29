import type { Database } from "bun:sqlite";
import type { SessionMeta } from "./types";
export interface SessionMetaRow {
    session_id: string;
    last_response_time: number;
    cache_ttl: string;
    counter: number;
    last_nudge_tokens: number;
    last_nudge_band: string;
    last_transform_error: string;
    is_subagent: number;
    last_context_percentage: number;
    last_input_tokens: number;
    times_execute_threshold_reached: number;
    compartment_in_progress: number;
    compression_total_messages: number;
    compression_processed_messages: number;
    system_prompt_hash: string | number;
    system_prompt_tokens: number;
    conversation_tokens: number;
    tool_call_tokens: number;
    cleared_reasoning_through_tag: number;
}
export declare const META_COLUMNS: Record<string, string>;
export declare const BOOLEAN_META_KEYS: Set<string>;
export declare function isSessionMetaRow(row: unknown): row is SessionMetaRow;
export declare function getDefaultSessionMeta(sessionId: string): SessionMeta;
export declare function ensureSessionMetaRow(db: Database, sessionId: string): void;
export declare function toSessionMeta(row: SessionMetaRow): SessionMeta;
//# sourceMappingURL=storage-meta-shared.d.ts.map