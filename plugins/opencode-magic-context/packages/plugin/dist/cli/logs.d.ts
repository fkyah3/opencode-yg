import { type DiagnosticReport } from "./diagnostics";
/**
 * Replace absolute home paths and usernames in captured log lines so users
 * can share reports publicly without leaking their local paths.
 */
export declare function sanitizeLogContent(content: string): string;
export interface BundledIssueReport {
    path: string;
    bodyMarkdown: string;
}
export declare function bundleIssueReport(report: DiagnosticReport, description: string, _title: string): Promise<BundledIssueReport>;
//# sourceMappingURL=logs.d.ts.map