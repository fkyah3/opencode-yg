import type { ThinkingLikePart } from "./tag-messages";
export declare function byteSize(value: string): number;
export declare function stripTagPrefix(value: string): string;
export declare function prependTag(tagId: number, value: string): string;
export declare function isThinkingPart(part: unknown): part is ThinkingLikePart;
//# sourceMappingURL=tag-content-primitives.d.ts.map