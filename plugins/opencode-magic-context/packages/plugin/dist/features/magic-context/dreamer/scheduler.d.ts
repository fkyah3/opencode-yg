import type { Database } from "bun:sqlite";
export interface DreamScheduleConfig {
    /** Time range string like "02:00-06:00" */
    schedule: string;
}
/** Parse "HH:MM-HH:MM" into start/end minutes since midnight. */
export declare function parseScheduleWindow(schedule: string): {
    startMinutes: number;
    endMinutes: number;
} | null;
/** Check if the current time is inside the schedule window. Handles overnight windows (e.g. 23:00-05:00). */
export declare function isInScheduleWindow(schedule: string, now?: Date): boolean;
/** Find projects that have memory updates or pending smart notes since their per-project last dream time. */
export declare function findProjectsNeedingDream(db: Database): string[];
/**
 * Check schedule and enqueue eligible projects.
 * Called periodically from the hook layer (debounced to once per hour).
 * Returns the number of projects enqueued.
 */
export declare function checkScheduleAndEnqueue(db: Database, schedule: string): number;
//# sourceMappingURL=scheduler.d.ts.map