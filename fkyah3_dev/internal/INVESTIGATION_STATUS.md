# OpenCode Win32 $env: Injection Investigation — Status Report

## Problem
OpenCode on win32 automatically injects PowerShell `$env:VAR=value` syntax into bash commands, causing failures when the shell is Git Bash.

## Investigation Progress

### Files Examined (No injection found yet)
1. `packages/opencode/src/tool/bash.ts` — Core bash tool implementation. `cmd()` function uses `ChildProcess.make()` directly with no `$env:` manipulation.
2. `packages/opencode/src/effect/cross-spawn-spawner.ts` — Effect-based spawn wrapper. Uses `cross-spawn` library. No `$env:` manipulation.
3. `packages/opencode/src/shell/shell.ts` — Shell detection/resolution. No `$env:` manipulation.
4. `cross-spawn@7.0.6` (`lib/parse.js`, `lib/util/escape.js`, `lib/util/resolveCommand.js`) — Handles Windows command wrapping and escaping. No `$env:` manipulation.

### Current Hypothesis
The `$env:` injection is NOT in the TypeScript source code or `cross-spawn` dependency we've searched so far. It may be:
- In a compiled/bundled artifact (e.g., `opencode.exe` compiled output)
- In a plugin or external module we haven't checked
- In a runtime wrapper that creates `.bat` files (observed at `%TEMP%/opencode/shell-*/cmd.bat`)

### Next Steps
1. Search for any `.bat` generation logic in OpenCode source
2. Check if the injection happens in the `opencode.exe` compiled binary rather than source
3. Verify whether the issue reproduces when running from source (`bun run dev`) vs installed binary

## Environment
- OpenCode version: 1.14.20 (installed binary at `D:\software\opencode\opencode.exe`)
- Source repo: `anomalyco/opencode` (TypeScript + Bun 1.3.11)
- Platform: win32 + Git Bash
- Observed temp files: `%TEMP%/opencode/shell-*/cmd.bat`

## Date
2026-04-22
