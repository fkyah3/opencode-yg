<p align="center"><b>fkyah3/opencode-fkyah3</b> — Windows 優先 + DeepSeek 優化分支</p>

---

[English](./README.md) · [简体中文](./README.zh.md) · **繁體中文**

---

這是 [anomalyco/opencode](https://github.com/anomalyco/opencode) 的個人維護分支，專注於 Windows 平台相容性與 DeepSeek 模型支援。

上游是個優秀的專案，但 Windows 和 DeepSeek 不是他們的優先方向。與其等待 issue 被處理，我們選擇自己解決這些問題，按自己的節奏推進。

> **程式碼實作：AI（DeepSeek v4Lite / Sisyphus）**  
> **回饋與品質監督：fkyah3（人工）**  
> 所有修復與優化由 AI 完成，人類負責發現問題、確認方向、緊急煞車。  
> 詳見 [`fkyah3_dev/`](./fkyah3_dev/)。

## 修復列表

- **[Windows CJK 編碼]** 子程式中文輸出亂碼（GBK → UTF-8 三層注入）
- **[TUI 插件載入]** Magic Context 側邊欄空白（Zod schema `show_thinking` 未宣告）
- **[DeepSeek 思考模式]** `reasoning_content` 遺失導致 API 400（核心修復，upstream issue [#24104](https://github.com/anomalyco/opencode/issues/24104)）

## 了解更多

| 位置 | 內容 |
|------|------|
| [`fkyah3_dev/README.md`](./fkyah3_dev/README.md) | 完整修復詳情與根因分析入口 |
| [`fkyah3_dev/issues/`](./fkyah3_dev/issues/) | 問題追蹤與修復記錄 |
| [`fkyah3_dev/analysis/`](./fkyah3_dev/analysis/) | 深度分析文件 |

## Upstream

基於 [anomalyco/opencode](https://github.com/anomalyco/opencode)（Apache 2.0），定期合併上游變更。
