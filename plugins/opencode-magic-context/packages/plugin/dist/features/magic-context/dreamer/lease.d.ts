import type { Database } from "bun:sqlite";
export declare function isLeaseActive(db: Database): boolean;
export declare function getLeaseHolder(db: Database): string | null;
export declare function acquireLease(db: Database, holderId: string): boolean;
export declare function renewLease(db: Database, holderId: string): boolean;
export declare function releaseLease(db: Database, holderId: string): void;
//# sourceMappingURL=lease.d.ts.map