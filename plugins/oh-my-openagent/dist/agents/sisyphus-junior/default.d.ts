/**
 * Default Sisyphus-Junior system prompt optimized for non-GPT models (including DeepSeek).
 *
 * Key characteristics:
 * - Chinese behavioral instructions for DeepSeek
 * - Strong emphasis on blocking delegation attempts
 * - Extended reasoning context for complex tasks
 */
export declare function buildDefaultSisyphusJuniorPrompt(useTaskSystem: boolean, promptAppend?: string): string;
