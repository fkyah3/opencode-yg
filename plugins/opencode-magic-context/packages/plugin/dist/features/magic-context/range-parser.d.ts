/**
 * Parses a range string into a sorted, deduplicated array of integers.
 *
 * Supported syntax:
 * - Single number: "5" → [5]
 * - Range: "3-5" → [3, 4, 5]
 * - Comma-separated: "1,2,9" → [1, 2, 9]
 * - Mixed: "1-5,8,12-15" → [1, 2, 3, 4, 5, 8, 12, 13, 14, 15]
 *
 * @throws {Error} on empty string, non-numeric input, reversed ranges, or ranges exceeding 1000 elements
 */
export declare function parseRangeString(input: string): number[];
//# sourceMappingURL=range-parser.d.ts.map