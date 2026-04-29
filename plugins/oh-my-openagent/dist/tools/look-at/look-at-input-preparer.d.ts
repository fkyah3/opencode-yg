import type { LookAtArgs } from "./types";
export interface LookAtFilePart {
    type: "file";
    mime: string;
    url: string;
    filename: string;
}
export interface PreparedLookAtInput {
    readonly filePart: LookAtFilePart;
    readonly isBase64Input: boolean;
    readonly sourceDescription: string;
    cleanup(): void;
}
type PrepareLookAtInputResult = {
    ok: true;
    value: PreparedLookAtInput;
} | {
    ok: false;
    error: string;
};
export declare function prepareLookAtInput(args: LookAtArgs): PrepareLookAtInputResult;
export {};
