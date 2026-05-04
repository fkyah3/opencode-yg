@echo off
chcp 65001 >nul
title Godot OpenCode Client

set "GODOT_EXE=E:\fkyah3\software\godot\Godot_v4.6.2-stable_win64\Godot_v4.6.2-stable_win64.exe"
set "GODOT_PROJECT=E:\agent\opencode-yg\godot-opencode"

start "" "%GODOT_EXE%" --path "%GODOT_PROJECT%"
