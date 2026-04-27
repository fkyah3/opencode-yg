/**
 * `prompt-version` command template
 *
 * Displays the current prompt revision.
 * Update PROMPT_REVISION when prompts change significantly.
 */

// Human-readable prompt revision string.
// Update this when prompt content changes meaningfully.
// Format: "{branch}@{short_hash} ({date}) - {description}"
// Example: "feat/chinese-system-prompt@85983b73 (2026-04-25) - Chinese"
export const PROMPT_REVISION = "feat/chinese-system-prompt (2026-04-25) - Chinese"

export function getPromptVersionTemplate(): string {
  return `当前提示词版本：${PROMPT_REVISION}

这个版本号标记了当前加载的系统提示词的版本。
当你执行 /reload-prompt 后，这里的版本号会更新为新的提示词版本。

约定格式：{来源} (更新日期) - {语言描述}

如果版本包含"Chinese"字样，说明是中文提示词版本。`
}
