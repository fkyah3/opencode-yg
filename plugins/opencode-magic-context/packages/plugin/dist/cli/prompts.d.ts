import { intro, log, note, outro, spinner } from "@clack/prompts";
export { intro, log, note, outro, spinner };
export declare function confirm(message: string, defaultYes?: boolean): Promise<boolean>;
export declare function text(message: string, options?: {
    placeholder?: string;
    initialValue?: string;
    validate?: (value: string) => string | undefined;
}): Promise<string>;
export declare function selectOne(message: string, options: {
    label: string;
    value: string;
    recommended?: boolean;
}[]): Promise<string>;
//# sourceMappingURL=prompts.d.ts.map