/**
 * Compaction Marker Manager
 *
 * Coordinates compaction marker injection/update/removal with historian
 * publication. Called after compartments are published, behind the
 * `compaction_markers` config flag (default: true).
 *
 * The marker summary text is a static placeholder — the real <session-history>
 * is injected by the transform pipeline via inject-compartments.ts. The marker
 * exists solely to make OpenCode's filterCompacted stop at the boundary so the
 * transform receives only the live tail.
 */
import type { Database } from "bun:sqlite";
/**
 * After historian publishes new compartments, inject or move the compaction marker.
 * Only moves the boundary forward; summary text is a static placeholder.
 */
export declare function updateCompactionMarkerAfterPublication(db: Database, sessionId: string, lastCompartmentEnd: number, directory?: string): void;
/**
 * Remove the compaction marker for a session (e.g. on session.deleted).
 */
export declare function removeCompactionMarkerForSession(db: Database, sessionId: string): void;
/**
 * Close the writable OpenCode DB connection used for marker injection.
 */
export declare function closeCompactionMarkerConnection(): void;
/**
 * Startup consistency check for compaction markers.
 *
 * Magic Context persists marker state in context.db's `session_meta`, while the
 * actual marker rows (compaction part + summary message + summary part) live in
 * OpenCode's separate `opencode.db`. There is no cross-DB transaction between
 * the two stores, so a crash between writes — or any external cleanup of
 * OpenCode's DB — can leave the two in an inconsistent state:
 *
 * - Phantom state: persisted in context.db but the referenced rows no longer
 *   exist in opencode.db. On next publication, the manager tries to remove a
 *   marker that isn't there, ignores the failure, and re-injects, but the
 *   stale persisted state can also confuse readers that trust it.
 * - Orphaned rows: rows in opencode.db exist without matching context.db
 *   state. Those can't be surfaced from here (we don't track them), but the
 *   natural-healing path already handles them: the next historian publication
 *   moves the boundary forward and the new injection replaces the orphans by
 *   moving filterCompacted past them.
 *
 * This function scans all persisted marker states and, for each one, verifies
 * that the referenced rows still exist in opencode.db. If any referenced row
 * is missing, it treats the marker as inconsistent, attempts to remove
 * whatever rows ARE still present (best-effort cleanup of half-written
 * markers), and clears the persisted state so the next publication can
 * re-inject cleanly.
 *
 * Called once at plugin startup. Safe to call multiple times (idempotent).
 */
export declare function checkCompactionMarkerConsistency(db: Database): void;
//# sourceMappingURL=compaction-marker-manager.d.ts.map