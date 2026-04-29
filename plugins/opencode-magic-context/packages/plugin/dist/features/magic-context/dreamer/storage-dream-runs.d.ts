import type { Database } from "bun:sqlite";
export interface DreamRunTaskSummary {
    name: string;
    durationMs: number;
    resultChars: number;
    error?: string;
}
export interface DreamRunMemoryChanges {
    written: number;
    deleted: number;
    archived: number;
    merged: number;
}
export interface DreamRunRow {
    id: number;
    project_path: string;
    started_at: number;
    finished_at: number;
    holder_id: string;
    tasks_json: string;
    tasks_succeeded: number;
    tasks_failed: number;
    smart_notes_surfaced: number;
    smart_notes_pending: number;
    memory_changes_json: string | null;
}
export interface DreamRunInput {
    projectPath: string;
    startedAt: number;
    finishedAt: number;
    holderId: string;
    tasks: DreamRunTaskSummary[];
    tasksSucceeded: number;
    tasksFailed: number;
    smartNotesSurfaced: number;
    smartNotesPending: number;
    memoryChanges?: DreamRunMemoryChanges | null;
}
export declare function insertDreamRun(db: Database, run: DreamRunInput): void;
export declare function getDreamRuns(db: Database, projectPath: string, limit?: number): DreamRunRow[];
//# sourceMappingURL=storage-dream-runs.d.ts.map