/**
 * Resolve a stable project identity from the working directory.
 *
 * Strategy:
 *   1. Git repo with commits → root commit hash (same across worktrees, clones, forks)
 *   2. Git repo with no commits → fallback to directory basename
 *   3. No git repo → fallback to directory basename
 *
 * The root commit hash is immutable and survives remote renames, host
 * migrations, and SSH/HTTPS URL changes. It is the same across all
 * worktrees and clones of the same repository.
 */
/**
 * Resolve the project identity for the given directory.
 *
 * Returns a stable string suitable for use as a database key:
 *   - `"git:<sha>"` for git repositories with at least one commit
 *   - `"dir:<basename>"` for non-git directories or empty repos
 *
 * Results are cached per directory path for the lifetime of the process.
 */
export declare function resolveProjectIdentity(directory: string): string;
//# sourceMappingURL=project-identity.d.ts.map