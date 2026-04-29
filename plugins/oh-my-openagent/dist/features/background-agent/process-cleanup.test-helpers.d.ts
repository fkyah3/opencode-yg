type ProcessCleanupEvent = NodeJS.Signals | "beforeExit" | "exit" | "uncaughtException" | "unhandledRejection";
export declare function getNewListener(signal: ProcessCleanupEvent, existingListeners: Function[]): () => void;
export declare function flushMicrotasks(): Promise<void>;
export {};
