import type { Database } from "bun:sqlite";
import type { PluginContext } from "../../../plugin/types";
interface ReviewUserMemoriesArgs {
    db: Database;
    client: PluginContext["client"];
    parentSessionId: string | undefined;
    sessionDirectory: string | undefined;
    holderId: string;
    deadline: number;
    promotionThreshold: number;
}
interface ReviewResult {
    promoted: number;
    merged: number;
    dismissed: number;
    candidatesConsumed: number;
}
export declare function reviewUserMemories(args: ReviewUserMemoriesArgs): Promise<ReviewResult>;
export {};
//# sourceMappingURL=review-user-memories.d.ts.map