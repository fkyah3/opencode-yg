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
$opencodeDir = "$scriptDir\packages\opencode"

if (-not (Test-Path "$opencodeDir\src\index.ts")) {
    Write-Host "❌ 错误: 找不到 $opencodeDir\src\index.ts" -ForegroundColor Red
    Write-Host "   当前脚本位置: $scriptDir" -ForegroundColor Yellow
    Write-Host "   建议: 检查脚本是否在 opencode-fkyah3 仓库根目录中" -ForegroundColor Yellow
    Read-Host "按 Enter 退出"
    exit 1
}

Set-Location $opencodeDir
Write-Host "🚀 启动 OpenCode (main, 三合一)" -ForegroundColor Cyan
bun run --conditions=browser src/index.ts $here
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ OpenCode 异常退出，错误码: $LASTEXITCODE" -ForegroundColor Red
    Read-Host "按 Enter 关闭"
}