export interface ParsedCompartment {
    startMessage: number;
    endMessage: number;
    title: string;
    content: string;
}
export interface ParsedFact {
    category: string;
    content: string;
}
export interface ParsedCompartmentOutput {
    compartments: ParsedCompartment[];
    facts: ParsedFact[];
    unprocessedFrom: number | null;
    userObservations: string[];
}
export declare function parseCompartmentOutput(text: string): ParsedCompartmentOutput;
//# sourceMappingURL=compartment-parser.d.ts.map