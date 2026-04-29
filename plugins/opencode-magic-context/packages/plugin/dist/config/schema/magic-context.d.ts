import { z } from "zod";
export declare const DEFAULT_NUDGE_INTERVAL_TOKENS = 10000;
export declare const DEFAULT_EXECUTE_THRESHOLD_PERCENTAGE = 65;
export declare const DEFAULT_HISTORIAN_TIMEOUT_MS = 300000;
export declare const DEFAULT_HISTORY_BUDGET_PERCENTAGE = 0.15;
export declare const DEFAULT_LOCAL_EMBEDDING_MODEL = "Xenova/all-MiniLM-L6-v2";
/** Compressor defaults — see CompressorConfigSchema below for details. */
export declare const DEFAULT_COMPRESSOR_MIN_COMPARTMENT_RATIO = 1000;
export declare const DEFAULT_COMPRESSOR_MAX_MERGE_DEPTH = 5;
export declare const DEFAULT_COMPRESSOR_COOLDOWN_MS = 600000;
/** Max compartments merged in one LLM pass. LLM quality degrades with larger inputs,
 *  and smaller batches reduce ordinal-drift risk when the model outputs merged boundaries. */
export declare const DEFAULT_COMPRESSOR_MAX_COMPARTMENTS_PER_PASS = 15;
/** Number of newest compartments always excluded from compression.
 *  Protects freshly-published historian compartments from immediate re-compression,
 *  which would lose narrative quality before the agent has even used the compartment. */
export declare const DEFAULT_COMPRESSOR_GRACE_COMPARTMENTS = 15;
/** Output count at each depth = ceil(input / ratio).
 *  Lower ratios = gentler compression. Depth 5 is title-only (no LLM call). */
export declare const COMPRESSOR_MERGE_RATIO_BY_DEPTH: Record<number, number>;
export declare const DREAMER_TASKS: readonly ["consolidate", "verify", "archive-stale", "improve", "maintain-docs"];
export declare const DreamingTaskSchema: z.ZodEnum<{
    consolidate: "consolidate";
    verify: "verify";
    "archive-stale": "archive-stale";
    improve: "improve";
    "maintain-docs": "maintain-docs";
}>;
export type DreamingTask = z.infer<typeof DreamingTaskSchema>;
export declare const DEFAULT_DREAMER_TASKS: DreamingTask[];
/** Combined dreamer agent + scheduling configuration */
export declare const DreamerConfigSchema: z.ZodObject<{
    model: z.ZodOptional<z.ZodString>;
    temperature: z.ZodOptional<z.ZodNumber>;
    top_p: z.ZodOptional<z.ZodNumber>;
    prompt: z.ZodOptional<z.ZodString>;
    tools: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodBoolean>>;
    disable: z.ZodOptional<z.ZodBoolean>;
    description: z.ZodOptional<z.ZodString>;
    mode: z.ZodOptional<z.ZodEnum<{
        subagent: "subagent";
        primary: "primary";
        all: "all";
    }>>;
    color: z.ZodOptional<z.ZodString>;
    maxSteps: z.ZodOptional<z.ZodNumber>;
    permission: z.ZodOptional<z.ZodObject<{
        edit: z.ZodOptional<z.ZodEnum<{
            ask: "ask";
            allow: "allow";
            deny: "deny";
        }>>;
        bash: z.ZodOptional<z.ZodUnion<readonly [z.ZodEnum<{
            ask: "ask";
            allow: "allow";
            deny: "deny";
        }>, z.ZodRecord<z.ZodString, z.ZodEnum<{
            ask: "ask";
            allow: "allow";
            deny: "deny";
        }>>]>>;
        webfetch: z.ZodOptional<z.ZodEnum<{
            ask: "ask";
            allow: "allow";
            deny: "deny";
        }>>;
        doom_loop: z.ZodOptional<z.ZodEnum<{
            ask: "ask";
            allow: "allow";
            deny: "deny";
        }>>;
        external_directory: z.ZodOptional<z.ZodEnum<{
            ask: "ask";
            allow: "allow";
            deny: "deny";
        }>>;
    }, z.core.$strip>>;
    maxTokens: z.ZodOptional<z.ZodNumber>;
    variant: z.ZodOptional<z.ZodString>;
    fallback_models: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
    enabled: z.ZodDefault<z.ZodBoolean>;
    schedule: z.ZodDefault<z.ZodString>;
    max_runtime_minutes: z.ZodDefault<z.ZodNumber>;
    tasks: z.ZodDefault<z.ZodArray<z.ZodEnum<{
        consolidate: "consolidate";
        verify: "verify";
        "archive-stale": "archive-stale";
        improve: "improve";
        "maintain-docs": "maintain-docs";
    }>>>;
    task_timeout_minutes: z.ZodDefault<z.ZodNumber>;
    inject_docs: z.ZodDefault<z.ZodBoolean>;
    user_memories: z.ZodDefault<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodBoolean>;
        promotion_threshold: z.ZodDefault<z.ZodNumber>;
    }, z.core.$strip>>;
    pin_key_files: z.ZodDefault<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodBoolean>;
        token_budget: z.ZodDefault<z.ZodNumber>;
        min_reads: z.ZodDefault<z.ZodNumber>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type DreamerConfig = z.infer<typeof DreamerConfigSchema>;
export declare const SidekickConfigSchema: z.ZodOptional<z.ZodObject<{
    model: z.ZodOptional<z.ZodString>;
    temperature: z.ZodOptional<z.ZodNumber>;
    top_p: z.ZodOptional<z.ZodNumber>;
    prompt: z.ZodOptional<z.ZodString>;
    tools: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodBoolean>>;
    disable: z.ZodOptional<z.ZodBoolean>;
    description: z.ZodOptional<z.ZodString>;
    mode: z.ZodOptional<z.ZodEnum<{
        subagent: "subagent";
        primary: "primary";
        all: "all";
    }>>;
    color: z.ZodOptional<z.ZodString>;
    maxSteps: z.ZodOptional<z.ZodNumber>;
    permission: z.ZodOptional<z.ZodObject<{
        edit: z.ZodOptional<z.ZodEnum<{
            ask: "ask";
            allow: "allow";
            deny: "deny";
        }>>;
        bash: z.ZodOptional<z.ZodUnion<readonly [z.ZodEnum<{
            ask: "ask";
            allow: "allow";
            deny: "deny";
        }>, z.ZodRecord<z.ZodString, z.ZodEnum<{
            ask: "ask";
            allow: "allow";
            deny: "deny";
        }>>]>>;
        webfetch: z.ZodOptional<z.ZodEnum<{
            ask: "ask";
            allow: "allow";
            deny: "deny";
        }>>;
        doom_loop: z.ZodOptional<z.ZodEnum<{
            ask: "ask";
            allow: "allow";
            deny: "deny";
        }>>;
        external_directory: z.ZodOptional<z.ZodEnum<{
            ask: "ask";
            allow: "allow";
            deny: "deny";
        }>>;
    }, z.core.$strip>>;
    maxTokens: z.ZodOptional<z.ZodNumber>;
    variant: z.ZodOptional<z.ZodString>;
    fallback_models: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
    enabled: z.ZodDefault<z.ZodBoolean>;
    timeout_ms: z.ZodDefault<z.ZodNumber>;
    system_prompt: z.ZodOptional<z.ZodString>;
}, z.core.$strip>>;
export type SidekickConfig = NonNullable<z.infer<typeof SidekickConfigSchema>>;
/** Historian agent configuration — includes all agent overrides plus two_pass mode.
 *  Two-pass mode runs a second editor pass after the initial historian pass to clean
 *  up low-signal U: lines and cross-compartment duplicates. Recommended for models
 *  without extended thinking; not needed for Claude Sonnet/Opus when reasoning is
 *  enabled via OpenCode variant config. */
export declare const HistorianConfigSchema: z.ZodOptional<z.ZodObject<{
    model: z.ZodOptional<z.ZodString>;
    temperature: z.ZodOptional<z.ZodNumber>;
    top_p: z.ZodOptional<z.ZodNumber>;
    prompt: z.ZodOptional<z.ZodString>;
    tools: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodBoolean>>;
    disable: z.ZodOptional<z.ZodBoolean>;
    description: z.ZodOptional<z.ZodString>;
    mode: z.ZodOptional<z.ZodEnum<{
        subagent: "subagent";
        primary: "primary";
        all: "all";
    }>>;
    color: z.ZodOptional<z.ZodString>;
    maxSteps: z.ZodOptional<z.ZodNumber>;
    permission: z.ZodOptional<z.ZodObject<{
        edit: z.ZodOptional<z.ZodEnum<{
            ask: "ask";
            allow: "allow";
            deny: "deny";
        }>>;
        bash: z.ZodOptional<z.ZodUnion<readonly [z.ZodEnum<{
            ask: "ask";
            allow: "allow";
            deny: "deny";
        }>, z.ZodRecord<z.ZodString, z.ZodEnum<{
            ask: "ask";
            allow: "allow";
            deny: "deny";
        }>>]>>;
        webfetch: z.ZodOptional<z.ZodEnum<{
            ask: "ask";
            allow: "allow";
            deny: "deny";
        }>>;
        doom_loop: z.ZodOptional<z.ZodEnum<{
            ask: "ask";
            allow: "allow";
            deny: "deny";
        }>>;
        external_directory: z.ZodOptional<z.ZodEnum<{
            ask: "ask";
            allow: "allow";
            deny: "deny";
        }>>;
    }, z.core.$strip>>;
    maxTokens: z.ZodOptional<z.ZodNumber>;
    variant: z.ZodOptional<z.ZodString>;
    fallback_models: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
    two_pass: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>>;
export type HistorianConfig = NonNullable<z.infer<typeof HistorianConfigSchema>>;
export declare const EmbeddingConfigSchema: z.ZodPipe<z.ZodObject<{
    provider: z.ZodDefault<z.ZodEnum<{
        local: "local";
        "openai-compatible": "openai-compatible";
        off: "off";
    }>>;
    model: z.ZodOptional<z.ZodString>;
    endpoint: z.ZodOptional<z.ZodString>;
    api_key: z.ZodOptional<z.ZodString>;
}, z.core.$strip>, z.ZodTransform<{
    provider: "local";
    model: string;
} | {
    api_key?: string | undefined;
    provider: "openai-compatible";
    model: string;
    endpoint: string;
} | {
    provider: "off";
    model?: undefined;
}, {
    provider: "local" | "openai-compatible" | "off";
    model?: string | undefined;
    endpoint?: string | undefined;
    api_key?: string | undefined;
}>>;
export type EmbeddingConfig = z.infer<typeof EmbeddingConfigSchema>;
export interface MagicContextConfig {
    enabled: boolean;
    /** When false, ctx_reduce tool is not registered, all nudges are disabled,
     *  and prompt guidance about ctx_reduce is stripped. Heuristic cleanup,
     *  compartments, memory, and other features continue to work. Default: true. */
    ctx_reduce_enabled: boolean;
    historian?: HistorianConfig;
    dreamer?: DreamerConfig;
    cache_ttl: string | {
        default: string;
        [modelKey: string]: string;
    };
    nudge_interval_tokens: number;
    execute_threshold_percentage: number | {
        default: number;
        [modelKey: string]: number;
    };
    /** Absolute token thresholds per model. When set for a given model (or via `default`),
     *  this overrides `execute_threshold_percentage` for that model. Useful for hard caps
     *  matching provider input limits. Values above 80% × context_limit are clamped with a warning. */
    execute_threshold_tokens?: {
        default?: number;
        [modelKey: string]: number | undefined;
    };
    protected_tags: number;
    auto_drop_tool_age: number;
    drop_tool_structure: boolean;
    clear_reasoning_age: number;
    iteration_nudge_threshold: number;
    history_budget_percentage: number;
    historian_timeout_ms: number;
    commit_cluster_trigger: {
        enabled: boolean;
        min_clusters: number;
    };
    compaction_markers: boolean;
    compressor: {
        enabled: boolean;
        min_compartment_ratio: number;
        max_merge_depth: number;
        cooldown_ms: number;
        max_compartments_per_pass: number;
        grace_compartments: number;
    };
    experimental: {
        /** Inject elapsed-time markers between user messages and date ranges on
         *  compartments so the agent has a wall-clock sense of the session. */
        temporal_awareness: boolean;
        /** Index git commit messages from HEAD into a new ctx_search source so
         *  agents can recall recent regressions, fixes, and decisions from
         *  commit history without running git log manually. */
        git_commit_indexing: {
            enabled: boolean;
            /** Days of history to index (default: 365) */
            since_days: number;
            /** Max commits kept per project; oldest evicted (default: 2000) */
            max_commits: number;
        };
        /** Appends a compact hint to new user messages when ctx_search finds
         *  highly-related memories, facts, or git commits. Does NOT inject
         *  full content — just vague fragments that nudge the agent to run
         *  ctx_search for full context if relevant. */
        auto_search: {
            enabled: boolean;
            /** Top hit score must exceed this threshold for the hint to fire. */
            score_threshold: number;
            /** Minimum user message length in characters (skip short prompts). */
            min_prompt_chars: number;
        };
    };
    embedding: EmbeddingConfig;
    memory: {
        enabled: boolean;
        injection_budget_tokens: number;
        auto_promote: boolean;
        retrieval_count_promotion_threshold: number;
    };
    sidekick?: SidekickConfig;
}
export declare const MagicContextConfigSchema: z.ZodPipe<z.ZodObject<{
    enabled: z.ZodDefault<z.ZodBoolean>;
    ctx_reduce_enabled: z.ZodDefault<z.ZodBoolean>;
    historian: z.ZodOptional<z.ZodObject<{
        model: z.ZodOptional<z.ZodString>;
        temperature: z.ZodOptional<z.ZodNumber>;
        top_p: z.ZodOptional<z.ZodNumber>;
        prompt: z.ZodOptional<z.ZodString>;
        tools: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodBoolean>>;
        disable: z.ZodOptional<z.ZodBoolean>;
        description: z.ZodOptional<z.ZodString>;
        mode: z.ZodOptional<z.ZodEnum<{
            subagent: "subagent";
            primary: "primary";
            all: "all";
        }>>;
        color: z.ZodOptional<z.ZodString>;
        maxSteps: z.ZodOptional<z.ZodNumber>;
        permission: z.ZodOptional<z.ZodObject<{
            edit: z.ZodOptional<z.ZodEnum<{
                ask: "ask";
                allow: "allow";
                deny: "deny";
            }>>;
            bash: z.ZodOptional<z.ZodUnion<readonly [z.ZodEnum<{
                ask: "ask";
                allow: "allow";
                deny: "deny";
            }>, z.ZodRecord<z.ZodString, z.ZodEnum<{
                ask: "ask";
                allow: "allow";
                deny: "deny";
            }>>]>>;
            webfetch: z.ZodOptional<z.ZodEnum<{
                ask: "ask";
                allow: "allow";
                deny: "deny";
            }>>;
            doom_loop: z.ZodOptional<z.ZodEnum<{
                ask: "ask";
                allow: "allow";
                deny: "deny";
            }>>;
            external_directory: z.ZodOptional<z.ZodEnum<{
                ask: "ask";
                allow: "allow";
                deny: "deny";
            }>>;
        }, z.core.$strip>>;
        maxTokens: z.ZodOptional<z.ZodNumber>;
        variant: z.ZodOptional<z.ZodString>;
        fallback_models: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        two_pass: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>>;
    dreamer: z.ZodOptional<z.ZodObject<{
        model: z.ZodOptional<z.ZodString>;
        temperature: z.ZodOptional<z.ZodNumber>;
        top_p: z.ZodOptional<z.ZodNumber>;
        prompt: z.ZodOptional<z.ZodString>;
        tools: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodBoolean>>;
        disable: z.ZodOptional<z.ZodBoolean>;
        description: z.ZodOptional<z.ZodString>;
        mode: z.ZodOptional<z.ZodEnum<{
            subagent: "subagent";
            primary: "primary";
            all: "all";
        }>>;
        color: z.ZodOptional<z.ZodString>;
        maxSteps: z.ZodOptional<z.ZodNumber>;
        permission: z.ZodOptional<z.ZodObject<{
            edit: z.ZodOptional<z.ZodEnum<{
                ask: "ask";
                allow: "allow";
                deny: "deny";
            }>>;
            bash: z.ZodOptional<z.ZodUnion<readonly [z.ZodEnum<{
                ask: "ask";
                allow: "allow";
                deny: "deny";
            }>, z.ZodRecord<z.ZodString, z.ZodEnum<{
                ask: "ask";
                allow: "allow";
                deny: "deny";
            }>>]>>;
            webfetch: z.ZodOptional<z.ZodEnum<{
                ask: "ask";
                allow: "allow";
                deny: "deny";
            }>>;
            doom_loop: z.ZodOptional<z.ZodEnum<{
                ask: "ask";
                allow: "allow";
                deny: "deny";
            }>>;
            external_directory: z.ZodOptional<z.ZodEnum<{
                ask: "ask";
                allow: "allow";
                deny: "deny";
            }>>;
        }, z.core.$strip>>;
        maxTokens: z.ZodOptional<z.ZodNumber>;
        variant: z.ZodOptional<z.ZodString>;
        fallback_models: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        enabled: z.ZodDefault<z.ZodBoolean>;
        schedule: z.ZodDefault<z.ZodString>;
        max_runtime_minutes: z.ZodDefault<z.ZodNumber>;
        tasks: z.ZodDefault<z.ZodArray<z.ZodEnum<{
            consolidate: "consolidate";
            verify: "verify";
            "archive-stale": "archive-stale";
            improve: "improve";
            "maintain-docs": "maintain-docs";
        }>>>;
        task_timeout_minutes: z.ZodDefault<z.ZodNumber>;
        inject_docs: z.ZodDefault<z.ZodBoolean>;
        user_memories: z.ZodDefault<z.ZodObject<{
            enabled: z.ZodDefault<z.ZodBoolean>;
            promotion_threshold: z.ZodDefault<z.ZodNumber>;
        }, z.core.$strip>>;
        pin_key_files: z.ZodDefault<z.ZodObject<{
            enabled: z.ZodDefault<z.ZodBoolean>;
            token_budget: z.ZodDefault<z.ZodNumber>;
            min_reads: z.ZodDefault<z.ZodNumber>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    cache_ttl: z.ZodDefault<z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        default: z.ZodString;
    }, z.core.$catchall<z.ZodString>>]>>;
    nudge_interval_tokens: z.ZodDefault<z.ZodNumber>;
    execute_threshold_percentage: z.ZodDefault<z.ZodUnion<readonly [z.ZodNumber, z.ZodObject<{
        default: z.ZodNumber;
    }, z.core.$catchall<z.ZodNumber>>]>>;
    execute_threshold_tokens: z.ZodOptional<z.ZodObject<{
        default: z.ZodOptional<z.ZodNumber>;
    }, z.core.$catchall<z.ZodNumber>>>;
    protected_tags: z.ZodOptional<z.ZodNumber>;
    auto_drop_tool_age: z.ZodDefault<z.ZodNumber>;
    drop_tool_structure: z.ZodDefault<z.ZodBoolean>;
    clear_reasoning_age: z.ZodDefault<z.ZodNumber>;
    iteration_nudge_threshold: z.ZodDefault<z.ZodNumber>;
    history_budget_percentage: z.ZodDefault<z.ZodNumber>;
    historian_timeout_ms: z.ZodDefault<z.ZodNumber>;
    commit_cluster_trigger: z.ZodDefault<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodBoolean>;
        min_clusters: z.ZodDefault<z.ZodNumber>;
    }, z.core.$strip>>;
    compaction_markers: z.ZodDefault<z.ZodBoolean>;
    compressor: z.ZodDefault<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodBoolean>;
        min_compartment_ratio: z.ZodDefault<z.ZodNumber>;
        max_merge_depth: z.ZodDefault<z.ZodNumber>;
        cooldown_ms: z.ZodDefault<z.ZodNumber>;
        max_compartments_per_pass: z.ZodDefault<z.ZodNumber>;
        grace_compartments: z.ZodDefault<z.ZodNumber>;
    }, z.core.$strip>>;
    embedding: z.ZodDefault<z.ZodPipe<z.ZodObject<{
        provider: z.ZodDefault<z.ZodEnum<{
            local: "local";
            "openai-compatible": "openai-compatible";
            off: "off";
        }>>;
        model: z.ZodOptional<z.ZodString>;
        endpoint: z.ZodOptional<z.ZodString>;
        api_key: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>, z.ZodTransform<{
        provider: "local";
        model: string;
    } | {
        api_key?: string | undefined;
        provider: "openai-compatible";
        model: string;
        endpoint: string;
    } | {
        provider: "off";
        model?: undefined;
    }, {
        provider: "local" | "openai-compatible" | "off";
        model?: string | undefined;
        endpoint?: string | undefined;
        api_key?: string | undefined;
    }>>>;
    experimental: z.ZodDefault<z.ZodObject<{
        temporal_awareness: z.ZodDefault<z.ZodBoolean>;
        git_commit_indexing: z.ZodDefault<z.ZodObject<{
            enabled: z.ZodDefault<z.ZodBoolean>;
            since_days: z.ZodDefault<z.ZodNumber>;
            max_commits: z.ZodDefault<z.ZodNumber>;
        }, z.core.$strip>>;
        auto_search: z.ZodDefault<z.ZodObject<{
            enabled: z.ZodDefault<z.ZodBoolean>;
            score_threshold: z.ZodDefault<z.ZodNumber>;
            min_prompt_chars: z.ZodDefault<z.ZodNumber>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    memory: z.ZodDefault<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodBoolean>;
        injection_budget_tokens: z.ZodDefault<z.ZodNumber>;
        auto_promote: z.ZodDefault<z.ZodBoolean>;
        retrieval_count_promotion_threshold: z.ZodDefault<z.ZodNumber>;
    }, z.core.$strip>>;
    sidekick: z.ZodOptional<z.ZodObject<{
        model: z.ZodOptional<z.ZodString>;
        temperature: z.ZodOptional<z.ZodNumber>;
        top_p: z.ZodOptional<z.ZodNumber>;
        prompt: z.ZodOptional<z.ZodString>;
        tools: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodBoolean>>;
        disable: z.ZodOptional<z.ZodBoolean>;
        description: z.ZodOptional<z.ZodString>;
        mode: z.ZodOptional<z.ZodEnum<{
            subagent: "subagent";
            primary: "primary";
            all: "all";
        }>>;
        color: z.ZodOptional<z.ZodString>;
        maxSteps: z.ZodOptional<z.ZodNumber>;
        permission: z.ZodOptional<z.ZodObject<{
            edit: z.ZodOptional<z.ZodEnum<{
                ask: "ask";
                allow: "allow";
                deny: "deny";
            }>>;
            bash: z.ZodOptional<z.ZodUnion<readonly [z.ZodEnum<{
                ask: "ask";
                allow: "allow";
                deny: "deny";
            }>, z.ZodRecord<z.ZodString, z.ZodEnum<{
                ask: "ask";
                allow: "allow";
                deny: "deny";
            }>>]>>;
            webfetch: z.ZodOptional<z.ZodEnum<{
                ask: "ask";
                allow: "allow";
                deny: "deny";
            }>>;
            doom_loop: z.ZodOptional<z.ZodEnum<{
                ask: "ask";
                allow: "allow";
                deny: "deny";
            }>>;
            external_directory: z.ZodOptional<z.ZodEnum<{
                ask: "ask";
                allow: "allow";
                deny: "deny";
            }>>;
        }, z.core.$strip>>;
        maxTokens: z.ZodOptional<z.ZodNumber>;
        variant: z.ZodOptional<z.ZodString>;
        fallback_models: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        enabled: z.ZodDefault<z.ZodBoolean>;
        timeout_ms: z.ZodDefault<z.ZodNumber>;
        system_prompt: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>, z.ZodTransform<MagicContextConfig, {
    enabled: boolean;
    ctx_reduce_enabled: boolean;
    cache_ttl: string | {
        [x: string]: string;
        default: string;
    };
    nudge_interval_tokens: number;
    execute_threshold_percentage: number | {
        [x: string]: number;
        default: number;
    };
    auto_drop_tool_age: number;
    drop_tool_structure: boolean;
    clear_reasoning_age: number;
    iteration_nudge_threshold: number;
    history_budget_percentage: number;
    historian_timeout_ms: number;
    commit_cluster_trigger: {
        enabled: boolean;
        min_clusters: number;
    };
    compaction_markers: boolean;
    compressor: {
        enabled: boolean;
        min_compartment_ratio: number;
        max_merge_depth: number;
        cooldown_ms: number;
        max_compartments_per_pass: number;
        grace_compartments: number;
    };
    embedding: {
        provider: "local";
        model: string;
    } | {
        api_key?: string | undefined;
        provider: "openai-compatible";
        model: string;
        endpoint: string;
    } | {
        provider: "off";
        model?: undefined;
    };
    experimental: {
        temporal_awareness: boolean;
        git_commit_indexing: {
            enabled: boolean;
            since_days: number;
            max_commits: number;
        };
        auto_search: {
            enabled: boolean;
            score_threshold: number;
            min_prompt_chars: number;
        };
    };
    memory: {
        enabled: boolean;
        injection_budget_tokens: number;
        auto_promote: boolean;
        retrieval_count_promotion_threshold: number;
    };
    historian?: {
        two_pass: boolean;
        model?: string | undefined;
        temperature?: number | undefined;
        top_p?: number | undefined;
        prompt?: string | undefined;
        tools?: Record<string, boolean> | undefined;
        disable?: boolean | undefined;
        description?: string | undefined;
        mode?: "subagent" | "primary" | "all" | undefined;
        color?: string | undefined;
        maxSteps?: number | undefined;
        permission?: {
            edit?: "ask" | "allow" | "deny" | undefined;
            bash?: "ask" | "allow" | "deny" | Record<string, "ask" | "allow" | "deny"> | undefined;
            webfetch?: "ask" | "allow" | "deny" | undefined;
            doom_loop?: "ask" | "allow" | "deny" | undefined;
            external_directory?: "ask" | "allow" | "deny" | undefined;
        } | undefined;
        maxTokens?: number | undefined;
        variant?: string | undefined;
        fallback_models?: string | string[] | undefined;
    } | undefined;
    dreamer?: {
        enabled: boolean;
        schedule: string;
        max_runtime_minutes: number;
        tasks: ("consolidate" | "verify" | "archive-stale" | "improve" | "maintain-docs")[];
        task_timeout_minutes: number;
        inject_docs: boolean;
        user_memories: {
            enabled: boolean;
            promotion_threshold: number;
        };
        pin_key_files: {
            enabled: boolean;
            token_budget: number;
            min_reads: number;
        };
        model?: string | undefined;
        temperature?: number | undefined;
        top_p?: number | undefined;
        prompt?: string | undefined;
        tools?: Record<string, boolean> | undefined;
        disable?: boolean | undefined;
        description?: string | undefined;
        mode?: "subagent" | "primary" | "all" | undefined;
        color?: string | undefined;
        maxSteps?: number | undefined;
        permission?: {
            edit?: "ask" | "allow" | "deny" | undefined;
            bash?: "ask" | "allow" | "deny" | Record<string, "ask" | "allow" | "deny"> | undefined;
            webfetch?: "ask" | "allow" | "deny" | undefined;
            doom_loop?: "ask" | "allow" | "deny" | undefined;
            external_directory?: "ask" | "allow" | "deny" | undefined;
        } | undefined;
        maxTokens?: number | undefined;
        variant?: string | undefined;
        fallback_models?: string | string[] | undefined;
    } | undefined;
    execute_threshold_tokens?: {
        [x: string]: number;
        default?: number | undefined;
    } | undefined;
    protected_tags?: number | undefined;
    sidekick?: {
        enabled: boolean;
        timeout_ms: number;
        model?: string | undefined;
        temperature?: number | undefined;
        top_p?: number | undefined;
        prompt?: string | undefined;
        tools?: Record<string, boolean> | undefined;
        disable?: boolean | undefined;
        description?: string | undefined;
        mode?: "subagent" | "primary" | "all" | undefined;
        color?: string | undefined;
        maxSteps?: number | undefined;
        permission?: {
            edit?: "ask" | "allow" | "deny" | undefined;
            bash?: "ask" | "allow" | "deny" | Record<string, "ask" | "allow" | "deny"> | undefined;
            webfetch?: "ask" | "allow" | "deny" | undefined;
            doom_loop?: "ask" | "allow" | "deny" | undefined;
            external_directory?: "ask" | "allow" | "deny" | undefined;
        } | undefined;
        maxTokens?: number | undefined;
        variant?: string | undefined;
        fallback_models?: string | string[] | undefined;
        system_prompt?: string | undefined;
    } | undefined;
}>>;
//# sourceMappingURL=magic-context.d.ts.map