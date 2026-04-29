import type { CandidateCompartment } from "./compartment-runner-types";
export declare function mapParsedCompartmentsToChunk(compartments: Array<{
    startMessage: number;
    endMessage: number;
    title: string;
    content: string;
}>, chunk: {
    startIndex: number;
    endIndex: number;
    lines: Array<{
        ordinal: number;
        messageId: string;
    }>;
}, sequenceOffset: number): {
    ok: true;
    compartments: CandidateCompartment[];
} | {
    ok: false;
    error: string;
};
export declare function mapParsedCompartmentsToSession(compartments: Array<{
    startMessage: number;
    endMessage: number;
    title: string;
    content: string;
}>, sessionId: string): {
    ok: true;
    compartments: CandidateCompartment[];
} | {
    ok: false;
    error: string;
};
//# sourceMappingURL=compartment-runner-mapping.d.ts.map