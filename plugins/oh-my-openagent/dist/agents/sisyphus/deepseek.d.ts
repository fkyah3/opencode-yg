/**
 * DeepSeek 优化版 Sisyphus 提示词 —— 针对 128K 上下文窗口的精简变体。
 *
 * 设计原则：
 * - 精简，不包含 TypeScript 代码示例（DeepSeek 从上下文中学习模式，不需要示例）
 * - 去除冗余的验证段落（合并到统一检查中）
 * - 不在 NonClaude planner 段和并行委派段之间重复内容
 * - Intent Gate 压缩为必要映射
 * - 反查重规则缩短为核心约束
 *
 * 目标：~5K tokens vs 默认 ~10K
 */
import type { AvailableAgent, AvailableTool, AvailableSkill, AvailableCategory } from "../dynamic-agent-prompt-builder";
export declare function buildDeepSeekSisyphusPrompt(model: string, availableAgents: AvailableAgent[], availableTools?: AvailableTool[], availableSkills?: AvailableSkill[], availableCategories?: AvailableCategory[], useTaskSystem?: boolean): string;
