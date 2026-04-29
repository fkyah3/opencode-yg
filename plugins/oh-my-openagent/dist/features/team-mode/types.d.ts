import { z } from "zod";
export declare const MESSAGE_KINDS: readonly ["message", "shutdown_request", "shutdown_approved", "shutdown_rejected", "announcement"];
export declare const MEMBER_KINDS: readonly ["category", "subagent_type"];
export declare const TASK_STATUSES: readonly ["pending", "claimed", "in_progress", "completed", "deleted"];
export declare const RUNTIME_STATUSES: readonly ["creating", "active", "shutdown_requested", "deleting", "deleted", "failed", "orphaned"];
export declare const CategoryMemberSchema: z.ZodObject<{
    name: z.ZodString;
    cwd: z.ZodOptional<z.ZodString>;
    worktreePath: z.ZodOptional<z.ZodString>;
    subscriptions: z.ZodOptional<z.ZodArray<z.ZodString>>;
    backendType: z.ZodDefault<z.ZodEnum<{
        tmux: "tmux";
        "in-process": "in-process";
    }>>;
    color: z.ZodOptional<z.ZodString>;
    isActive: z.ZodDefault<z.ZodBoolean>;
    kind: z.ZodLiteral<"category">;
    category: z.ZodString;
    prompt: z.ZodString;
}, z.core.$strict>;
export declare const SubagentMemberSchema: z.ZodObject<{
    name: z.ZodString;
    cwd: z.ZodOptional<z.ZodString>;
    worktreePath: z.ZodOptional<z.ZodString>;
    subscriptions: z.ZodOptional<z.ZodArray<z.ZodString>>;
    backendType: z.ZodDefault<z.ZodEnum<{
        tmux: "tmux";
        "in-process": "in-process";
    }>>;
    color: z.ZodOptional<z.ZodString>;
    isActive: z.ZodDefault<z.ZodBoolean>;
    kind: z.ZodLiteral<"subagent_type">;
    subagent_type: z.ZodString;
    prompt: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export declare const MemberSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    name: z.ZodString;
    cwd: z.ZodOptional<z.ZodString>;
    worktreePath: z.ZodOptional<z.ZodString>;
    subscriptions: z.ZodOptional<z.ZodArray<z.ZodString>>;
    backendType: z.ZodDefault<z.ZodEnum<{
        tmux: "tmux";
        "in-process": "in-process";
    }>>;
    color: z.ZodOptional<z.ZodString>;
    isActive: z.ZodDefault<z.ZodBoolean>;
    kind: z.ZodLiteral<"category">;
    category: z.ZodString;
    prompt: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    name: z.ZodString;
    cwd: z.ZodOptional<z.ZodString>;
    worktreePath: z.ZodOptional<z.ZodString>;
    subscriptions: z.ZodOptional<z.ZodArray<z.ZodString>>;
    backendType: z.ZodDefault<z.ZodEnum<{
        tmux: "tmux";
        "in-process": "in-process";
    }>>;
    color: z.ZodOptional<z.ZodString>;
    isActive: z.ZodDefault<z.ZodBoolean>;
    kind: z.ZodLiteral<"subagent_type">;
    subagent_type: z.ZodString;
    prompt: z.ZodOptional<z.ZodString>;
}, z.core.$strict>], "kind">;
export declare const TeamSpecSchema: z.ZodObject<{
    version: z.ZodLiteral<1>;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodNumber;
    leadAgentId: z.ZodString;
    teamAllowedPaths: z.ZodOptional<z.ZodArray<z.ZodString>>;
    sessionPermission: z.ZodOptional<z.ZodString>;
    members: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
        name: z.ZodString;
        cwd: z.ZodOptional<z.ZodString>;
        worktreePath: z.ZodOptional<z.ZodString>;
        subscriptions: z.ZodOptional<z.ZodArray<z.ZodString>>;
        backendType: z.ZodDefault<z.ZodEnum<{
            tmux: "tmux";
            "in-process": "in-process";
        }>>;
        color: z.ZodOptional<z.ZodString>;
        isActive: z.ZodDefault<z.ZodBoolean>;
        kind: z.ZodLiteral<"category">;
        category: z.ZodString;
        prompt: z.ZodString;
    }, z.core.$strict>, z.ZodObject<{
        name: z.ZodString;
        cwd: z.ZodOptional<z.ZodString>;
        worktreePath: z.ZodOptional<z.ZodString>;
        subscriptions: z.ZodOptional<z.ZodArray<z.ZodString>>;
        backendType: z.ZodDefault<z.ZodEnum<{
            tmux: "tmux";
            "in-process": "in-process";
        }>>;
        color: z.ZodOptional<z.ZodString>;
        isActive: z.ZodDefault<z.ZodBoolean>;
        kind: z.ZodLiteral<"subagent_type">;
        subagent_type: z.ZodString;
        prompt: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>], "kind">>;
}, z.core.$strip>;
export declare const MessageSchema: z.ZodObject<{
    version: z.ZodLiteral<1>;
    messageId: z.ZodString;
    from: z.ZodString;
    to: z.ZodString;
    kind: z.ZodEnum<{
        message: "message";
        shutdown_request: "shutdown_request";
        shutdown_approved: "shutdown_approved";
        shutdown_rejected: "shutdown_rejected";
        announcement: "announcement";
    }>;
    body: z.ZodString;
    summary: z.ZodOptional<z.ZodString>;
    references: z.ZodOptional<z.ZodArray<z.ZodObject<{
        path: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>>;
    timestamp: z.ZodNumber;
    correlationId: z.ZodOptional<z.ZodString>;
    color: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const TaskSchema: z.ZodObject<{
    version: z.ZodLiteral<1>;
    id: z.ZodString;
    subject: z.ZodString;
    description: z.ZodString;
    activeForm: z.ZodOptional<z.ZodString>;
    status: z.ZodEnum<{
        pending: "pending";
        in_progress: "in_progress";
        completed: "completed";
        deleted: "deleted";
        claimed: "claimed";
    }>;
    owner: z.ZodOptional<z.ZodString>;
    blocks: z.ZodDefault<z.ZodArray<z.ZodString>>;
    blockedBy: z.ZodDefault<z.ZodArray<z.ZodString>>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    createdAt: z.ZodNumber;
    updatedAt: z.ZodNumber;
    claimedAt: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const RuntimeStateSchema: z.ZodObject<{
    version: z.ZodLiteral<1>;
    teamRunId: z.ZodString;
    teamName: z.ZodString;
    specSource: z.ZodEnum<{
        user: "user";
        project: "project";
    }>;
    createdAt: z.ZodNumber;
    status: z.ZodEnum<{
        deleted: "deleted";
        failed: "failed";
        active: "active";
        creating: "creating";
        shutdown_requested: "shutdown_requested";
        deleting: "deleting";
        orphaned: "orphaned";
    }>;
    leadSessionId: z.ZodOptional<z.ZodString>;
    members: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        sessionId: z.ZodOptional<z.ZodString>;
        tmuxPaneId: z.ZodOptional<z.ZodString>;
        agentType: z.ZodEnum<{
            leader: "leader";
            "general-purpose": "general-purpose";
        }>;
        status: z.ZodEnum<{
            pending: "pending";
            completed: "completed";
            running: "running";
            idle: "idle";
            errored: "errored";
            shutdown_approved: "shutdown_approved";
        }>;
        color: z.ZodOptional<z.ZodString>;
        worktreePath: z.ZodOptional<z.ZodString>;
        lastInjectedTurnMarker: z.ZodOptional<z.ZodString>;
        pendingInjectedMessageIds: z.ZodDefault<z.ZodArray<z.ZodString>>;
    }, z.core.$strict>>;
    shutdownRequests: z.ZodDefault<z.ZodArray<z.ZodObject<{
        memberId: z.ZodString;
        requestedAt: z.ZodNumber;
        approvedAt: z.ZodOptional<z.ZodNumber>;
        rejectedReason: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>>;
    bounds: z.ZodObject<{
        maxMembers: z.ZodDefault<z.ZodNumber>;
        maxParallelMembers: z.ZodDefault<z.ZodNumber>;
        maxMessagesPerRun: z.ZodDefault<z.ZodNumber>;
        maxWallClockMinutes: z.ZodDefault<z.ZodNumber>;
        maxMemberTurns: z.ZodDefault<z.ZodNumber>;
    }, z.core.$strict>;
}, z.core.$strip>;
export declare const AGENT_ELIGIBILITY_REGISTRY: Readonly<Record<string, {
    verdict: "eligible" | "conditional" | "hard-reject";
    rejectionMessage?: string;
}>>;
export type TeamSpec = z.infer<typeof TeamSpecSchema>;
export type Member = z.infer<typeof MemberSchema>;
export type CategoryMember = z.infer<typeof CategoryMemberSchema>;
export type SubagentMember = z.infer<typeof SubagentMemberSchema>;
export type Message = z.infer<typeof MessageSchema>;
export type Task = z.infer<typeof TaskSchema>;
export type RuntimeState = z.infer<typeof RuntimeStateSchema>;
