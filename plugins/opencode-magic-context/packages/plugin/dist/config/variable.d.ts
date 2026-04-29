export interface SubstituteInput {
    /** Raw config text before JSONC parsing. */
    text: string;
    /**
     * Path of the config file the text came from. Used to resolve relative
     * `{file:...}` references and to emit useful warnings. Pass undefined for
     * virtual/synthetic inputs (tests) — in that case `{file:}` tokens with
     * relative paths resolve against `cwd`, which is rarely what callers want,
     * so callers should prefer passing a real path when one exists.
     */
    configPath?: string;
}
export interface SubstituteResult {
    /** Config text with all `{env:X}` and `{file:path}` tokens replaced. */
    text: string;
    /**
     * Human-readable warnings for missing env vars, unreadable files, and
     * unresolved tokens that fell back to empty string. Safe to surface to the
     * user via logger/toast/startup notification.
     */
    warnings: string[];
}
/**
 * Expand `{env:VAR}` and `{file:path}` tokens in raw config text.
 *
 * Mirrors OpenCode's `ConfigVariable.substitute` semantics so users can share
 * the same patterns across `opencode.json(c)` and `magic-context.jsonc`:
 *   - `{env:VAR}` → `process.env.VAR` (trimmed key), empty string when missing
 *   - `{file:~/path}` → contents of `~/path`, JSON-escaped for safe inlining
 *   - `{file:./rel}` or `{file:rel}` → resolved against the config file's dir
 *   - `{file:/abs}` → resolved as absolute
 *
 * Unlike OpenCode we treat missing values as warnings rather than hard errors:
 * magic-context config is less critical than the main OpenCode config, and a
 * typo in an optional embedding key should not prevent the plugin from loading
 * with other (valid) settings.
 *
 * File content substitution is JSON-escaped (wrapped then unwrapped through
 * `JSON.stringify`) so line breaks, quotes, and backslashes in file contents
 * survive the subsequent JSONC parse. Env value substitution is NOT escaped,
 * matching OpenCode — env values are typically API keys without JSON-special
 * characters. Users who need to embed a value with quotes or newlines should
 * use `{file:...}`.
 */
export declare function substituteConfigVariables(input: SubstituteInput): SubstituteResult;
//# sourceMappingURL=variable.d.ts.map