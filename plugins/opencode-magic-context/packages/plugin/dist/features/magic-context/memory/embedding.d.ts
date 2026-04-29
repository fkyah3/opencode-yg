import type { Database } from "bun:sqlite";
import type { EmbeddingConfig } from "../../../config/schema/magic-context";
import { cosineSimilarity } from "./cosine-similarity";
export declare function initializeEmbedding(config: EmbeddingConfig): void;
export declare function isEmbeddingEnabled(): boolean;
export declare function ensureEmbeddingModel(): Promise<boolean>;
export declare function embedText(text: string, signal?: AbortSignal): Promise<Float32Array | null>;
export declare function embedBatch(texts: string[], signal?: AbortSignal): Promise<(Float32Array | null)[]>;
export declare function embedUnembeddedMemories(db: Database, projectPath: string, config: EmbeddingConfig, batchSize?: number): Promise<number>;
/**
 * Sweep ALL projects for unembedded memories, draining each fully before
 * moving to the next. Projects are ordered by most-recent memory activity
 * (MAX(updated_at)), so the project you're actively working in gets
 * embedded first after a provider switch.
 *
 * Within one invocation:
 *   - Each project is drained in batches of `batchSize` until `embedUnembeddedMemoriesForProject`
 *     returns 0 (nothing left, or a batch failure).
 *   - Wall-clock deadline + consecutive-empty fail-safe prevent runaway
 *     or infinite looping when the provider is unhealthy.
 *
 * Between invocations:
 *   - The module-level `sweepInProgress` flag guards against parallel runs
 *     from the same process. If a sweep is still running when the next
 *     15-min tick fires, that tick is a no-op.
 *
 * Used by the dream timer for proactive embedding coverage. After a
 * provider change wipes embeddings, this path drains the full backlog on
 * a single tick (bounded by wall clock) instead of trickling 10/15min.
 */
export declare function embedAllUnembeddedMemories(db: Database, config: EmbeddingConfig, batchSize?: number): Promise<number>;
/** Test-only: reset the in-progress guard. */
export declare function _resetEmbeddingSweepGuard(): void;
export declare function getEmbeddingModelId(): string;
export { cosineSimilarity };
export declare function disposeEmbeddingModel(): Promise<void>;
//# sourceMappingURL=embedding.d.ts.map