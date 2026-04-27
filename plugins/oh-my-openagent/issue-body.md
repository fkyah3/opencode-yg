### detectShellType() returns "unix" on Windows when MSYSTEM is set, generating invalid shell syntax

**Describe the bug**

On Windows, when `MSYSTEM` environment variable is set (default when Git Bash is installed), `detectShellType()` returns `"unix"` before checking `PSModulePath`. This causes the `non-interactive-env` hook to generate `export KEY=val;` syntax (Bourne shell), which is invalid in PowerShell — the shell that actually executes the command.

Error:
```
export : 无法将"export"项识别为 cmdlet、函数、脚本文件或可运行程序的名称。
```

**Root cause**

In `src/shared/shell-env.ts`, MSYSTEM is checked before PSModulePath:

```
SHELL exists → unix
MSYSTEM exists → unix   ← triggers before PSModulePath
PSModulePath exists → powershell
win32 fallback → cmd
```

MSYSTEM is a permanent env var set by Git Bash installation. It doesn't mean OpenCode's bash tool is running in a Unix shell — on Windows, the bash tool always spawns `powershell -Command ...` or `cmd.exe /c ...`.

**To reproduce**

1. Install Git Bash on Windows (sets MSYSTEM=MINGW64)
2. Run any git command in OpenCode with OMO loaded
3. non-interactive-env hook injects `export CI=true ...` prefix
4. PowerShell errors on `export`

**Suggested fix**

In `non-interactive-env-hook.ts`, the shell type for the env prefix should match the actual execution environment, not the parent process:

```typescript
const shellType = process.platform === "win32" ? "powershell" : detectShellType()
```

Or adjust `detectShellType()` to check `process.platform` before `MSYSTEM`.

**Environment**

- OS: Windows
- Git Bash: installed (sets MSYSTEM)
- OMO: latest
