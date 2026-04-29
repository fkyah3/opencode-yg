import type { AgentConfig } from "@opencode-ai/sdk";
import { z } from "zod";
export declare const MAGIC_CONTEXT_AGENT_OVERRIDE_KEYS: readonly ["historian", "dreamer", "sidekick"];
export declare const AgentOverrideConfigSchema: z.ZodObject<{
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
}, z.core.$strip>;
export type AgentOverrideConfig = z.infer<typeof AgentOverrideConfigSchema> & Partial<AgentConfig>;
//# sourceMappingURL=agent-overrides.d.ts.map