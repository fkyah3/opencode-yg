import type { FallbackEntry } from "../../shared/model-requirements";
import type { ModelFallbackStateController } from "./fallback-state-controller";
export type ModelFallbackControllerAccessor = {
    register: (controller: ModelFallbackStateController) => void;
    setSessionFallbackChain: (sessionID: string, fallbackChain: FallbackEntry[] | undefined) => void;
    clearSessionFallbackChain: (sessionID: string) => void;
};
export declare function createModelFallbackControllerAccessor(): ModelFallbackControllerAccessor;
