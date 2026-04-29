import type { CommandDefinition } from "./types";
export declare function getCommandLoaderCacheKey(directory?: string): Promise<string>;
export declare function getCachedCommands(cacheKey: string): Promise<Record<string, CommandDefinition>> | undefined;
export declare function setCachedCommands(cacheKey: string, commands: Promise<Record<string, CommandDefinition>>): void;
export declare function deleteCachedCommands(cacheKey: string): void;
export declare function clearCommandLoaderCache(): void;
