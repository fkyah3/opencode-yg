# ── Parent process UTF-8 (for Bun/OpenCode console display) ──
chcp 65001 > $null
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
# ── Child processes (bash tool spawned commands) are covered by ──
#    packages/opencode/src/tool/bash.ts cmd() which injects these
#    same settings into every spawned PowerShell/cmd command.
# ──────────────────────────────────────────────────────────────────
$here = Get-Location
# Ensure we're in the opencode package directory (works with any clone path)
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location "$scriptDir\packages\opencode"
bun run --conditions=browser src/index.ts $here