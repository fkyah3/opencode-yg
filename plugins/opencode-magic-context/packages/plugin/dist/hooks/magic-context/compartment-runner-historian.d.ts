import type { PluginContext } from "../../plugin/types";
import type { HistorianProgressCallbacks, StoredCompartmentRange, ValidatedHistorianPassResult } from "./compartment-runner-types";
export declare function runValidatedHistorianPass(args: {
    client: PluginContext["client"];
    parentSessionId: string;
    sessionDirectory: string;
    prompt: string;
    chunk: {
        startIndex: number;
        endIndex: number;
        lines: Array<{
            ordinal: number;
            messageId: string;
        }>;
        /** Tool-only ordinal ranges — passed through to validator so gaps
         *  inside these ranges heal regardless of size. */
        toolOnlyRanges?: ReadonlyArray<{
            start: number;
            end: number;
        }>;
    };
    priorCompartments: StoredCompartmentRange[];
    sequenceOffset: number;
    dumpLabelBase: string;
    timeoutMs?: number;
    fallbackModelId?: string;
    callbacks?: HistorianProgressCallbacks;
    /** When true, run a second editor pass after successful historian output
     *  to clean low-signal U: lines and cross-compartment duplicates. If editor
     *  validation fails, falls back to the draft (first-pass) result. */
    twoPass?: boolean;
}): Promise<ValidatedHistorianPassResult>;
//# sourceMappingURL=compartment-runner-historian.d.ts.map