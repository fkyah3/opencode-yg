import type { CliLanguage } from "./types";
export declare function detectRegexMisuse(pattern: string): string | null;
export declare function detectLanguageSpecificMistake(pattern: string, lang: CliLanguage): string | null;
export declare function getPatternHint(pattern: string, lang: CliLanguage): string | null;
