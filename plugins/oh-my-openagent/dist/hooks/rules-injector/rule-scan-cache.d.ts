export type RuleScanCache = {
    get: (key: string) => string[] | undefined;
    set: (key: string, value: string[]) => void;
    clear: () => void;
};
export declare function createRuleScanCache(): RuleScanCache;
