import type { CompartmentRunnerDeps } from "./compartment-runner-types";
/** Clean up module-level session state on session deletion. */
export declare function clearHistorianAlertState(sessionId: string): void;
export declare function runCompartmentAgent(deps: CompartmentRunnerDeps): Promise<void>;
//# sourceMappingURL=compartment-runner-incremental.d.ts.map