import type { CandidateCompartment } from "./compartment-runner-types";
export declare function buildExistingStateXml(compartments: Array<{
    startMessage: number;
    endMessage: number;
    startMessageId: string;
    endMessageId: string;
    title: string;
    content: string;
}>, facts: Array<{
    category: string;
    content: string;
}>, memoryBlock?: string): string;
export declare function mergePriorCompartments(priorCompartments: Array<{
    startMessage: number;
    endMessage: number;
    startMessageId: string;
    endMessageId: string;
    title: string;
    content: string;
}>, newCompartments: CandidateCompartment[]): CandidateCompartment[];
//# sourceMappingURL=compartment-runner-state-xml.d.ts.map