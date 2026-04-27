/**
 * Build script: injects git-based prompt revision into prompt-version template.
 *
 * Replaces `@BUILD_REVISION@` with "{branch}@{short_hash} ({date})" 
 * in `src/features/builtin-commands/templates/prompt-version.ts`.
 *
 * Run before `bun run build` (already part of the build pipeline).
 */

import { execSync } from "child_process"
import { readFileSync, writeFileSync } from "fs"
import { join } from "path"

const TEMPLATE_FILE = join(
  __dirname,
  "..",
  "src",
  "features",
  "builtin-commands",
  "templates",
  "prompt-version.ts",
)

function getGitRevision(): string {
  try {
    const branch = execSync("git rev-parse --abbrev-ref HEAD", {
      encoding: "utf-8",
    }).trim()
    const hash = execSync("git rev-parse --short HEAD", {
      encoding: "utf-8",
    }).trim()
    const date = execSync("git log -1 --format=%cd --date=short", {
      encoding: "utf-8",
    }).trim()
    return `${branch}@${hash} (${date})`
  } catch {
    return "unknown (no git)"
  }
}

function main() {
  const revision = getGitRevision()
  let content = readFileSync(TEMPLATE_FILE, "utf-8")
  content = content.replace(/\/\/ @BUILD_REVISION@[\s\S]*?(?=\n)/, `"${revision}"`)
  writeFileSync(TEMPLATE_FILE, content, "utf-8")
  console.log(`[prompt-revision] Injected: ${revision}`)
}

main()
