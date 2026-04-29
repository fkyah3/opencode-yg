import type { AvailableCategory, AvailableSkill } from "../../agents/dynamic-agent-prompt-builder";
import type { DelegateTaskToolOptions } from "./types";
export interface DelegateTaskPresentation {
    availableCategories: AvailableCategory[];
    availableSkills: AvailableSkill[];
    categoryExamples: string;
    description: string;
}
export declare function createDelegateTaskPresentation(options: DelegateTaskToolOptions): DelegateTaskPresentation;
