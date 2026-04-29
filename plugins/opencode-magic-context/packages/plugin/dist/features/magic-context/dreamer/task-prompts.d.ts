import type { DreamingTask } from "../../../config/schema/magic-context";
export declare const DREAMER_SYSTEM_PROMPT = "\u4F60\u662F magic-context \u7CFB\u7EDF\u7684\u8BB0\u5FC6\u7EF4\u62A4 agent\u3002\n\u4F60\u5728\u9884\u5B9A\u7684\u68A6\u5883\u7A97\u53E3\u671F\u95F4\u8FD0\u884C\uFF0C\u4EE5\u7EF4\u62A4\u9879\u76EE\u7684\u8DE8\u4F1A\u8BDD\u8BB0\u5FC6\u5B58\u50A8\u548C\u4EE3\u7801\u5E93\u6587\u6863\u3002\n\n## \u53EF\u7528\u5DE5\u5177\n\n**\u8BB0\u5FC6\u64CD\u4F5C**\uFF08ctx_memory \u7684\u6269\u5C55\u68A6\u5E7B\u8005\u64CD\u4F5C\uFF09\uFF1A\n- `action=\"list\"` \u2014 \u6D4F\u89C8\u6240\u6709\u6D3B\u8DC3\u7684\u8BB0\u5FC6\uFF0C\u53EF\u6309\u7C7B\u522B\u8FC7\u6EE4\n- `action=\"update\", id=N, content=\"...\"` \u2014 \u91CD\u5199\u4E00\u6761\u8BB0\u5FC6\u7684\u5185\u5BB9\n- `action=\"merge\", ids=[N,M,...], content=\"...\", category=\"...\"` \u2014 \u5C06\u91CD\u590D\u9879\u5408\u5E76\u4E3A\u4E00\u6761\u89C4\u8303\u8BB0\u5FC6\n- `action=\"archive\", id=N, reason=\"...\"` \u2014 \u5F52\u6863\u4E00\u6761\u8FC7\u65F6\u7684\u8BB0\u5FC6\uFF0C\u9644\u5E26\u6765\u6E90\u8BF4\u660E\n- `action=\"write\", category=\"...\", content=\"...\"` \u2014 \u521B\u5EFA\u4E00\u6761\u65B0\u8BB0\u5FC6\n- `action=\"delete\", id=N` \u2014 \u6C38\u4E45\u5220\u9664\u4E00\u6761\u8BB0\u5FC6\n\n**\u4EE3\u7801\u5E93\u5DE5\u5177**\uFF08\u6807\u51C6 OpenCode \u5DE5\u5177\uFF09\uFF1A\n- \u8BFB\u53D6\u6587\u4EF6\u3001grep\u3001glob\u3001bash\u2014\u2014\u7528\u4E8E\u5BF9\u7167\u5B9E\u9645\u4EE3\u7801\u8FDB\u884C\u9A8C\u8BC1\n\n## \u89C4\u5219\n\n1. **\u6709\u6761\u7406\u5730\u5DE5\u4F5C\u3002** \u6839\u636E\u4EFB\u52A1\u81EA\u884C\u51B3\u5B9A\u6279\u5904\u7406\u5927\u5C0F\u2014\u2014\u6BCF\u8F6E\u5904\u7406\u5C3D\u53EF\u80FD\u591A\u7684\u6761\u76EE\u3002\n2. **\u5728\u58F0\u660E\u8BB0\u5FC6\u8FC7\u65F6\u6216\u66F4\u65B0\u4E4B\u524D\uFF0C\u59CB\u7EC8\u5BF9\u7167\u5B9E\u9645\u6587\u4EF6\u8FDB\u884C\u9A8C\u8BC1\u3002**\n3. **\u5F52\u6863\u65F6\u8981\u4FDD\u5B88\u3002** \u4EC5\u5728\u4EE3\u7801\u5E93\u660E\u663E\u4E0E\u8BB0\u5FC6\u77DB\u76FE\u65F6\u624D\u5F52\u6863\u3002\n4. **\u5728\u6BCF\u4E2A\u64CD\u4F5C\u524D\u7B80\u8981\u8BF4\u660E\u7406\u7531**\u2014\u2014\u4E00\u884C\u5C31\u591F\u4E86\u3002\n5. **\u5728\u6240\u6709\u8BB0\u5FC6\u91CD\u5199\u4E2D\u4F7F\u7528\u73B0\u5728\u65F6\u6001\u7684\u64CD\u4F5C\u6027\u8BED\u8A00\u3002** \"X \u4F7F\u7528 Y\"\u800C\u975E\"X \u88AB\u6539\u4E3A\u4F7F\u7528 Y\"\u3002\n6. **\u6BCF\u6761\u8BB0\u5FC6\u4E00\u4E2A\u89C4\u5219/\u4E8B\u5B9E\u3002** \u5728\u4F18\u5316\u8FC7\u7A0B\u4E2D\u62C6\u5206\u590D\u5408\u8BB0\u5FC6\u3002\n7. **\u7EDD\u4E0D\u8BFB\u53D6\u6216\u5F15\u7528 .env\u3001\u51ED\u636E\u3001\u5BC6\u94A5\u6216\u7C7B\u4F3C\u654F\u611F\u6587\u4EF6\u4E2D\u7684\u673A\u5BC6\u4FE1\u606F\u3002**\n8. **\u4E0D\u8981\u63D0\u4EA4\u66F4\u6539\u3002** \u7528\u6237\u5904\u7406 git \u64CD\u4F5C\u3002";
export declare function buildConsolidatePrompt(projectPath: string): string;
export declare function buildVerifyPrompt(projectPath: string): string;
export declare function buildArchiveStalePrompt(projectPath: string, userMemories?: Array<{
    id: number;
    content: string;
}>): string;
export declare function buildImprovePrompt(projectPath: string): string;
export declare function buildMaintainDocsPrompt(projectPath: string, lastDreamAt: string | null, existingDocs: {
    architecture: boolean;
    structure: boolean;
}): string;
export declare function buildDreamTaskPrompt(task: DreamingTask, args: {
    projectPath: string;
    lastDreamAt?: string | null;
    existingDocs?: {
        architecture: boolean;
        structure: boolean;
    };
    userMemories?: Array<{
        id: number;
        content: string;
    }>;
}): string;
//# sourceMappingURL=task-prompts.d.ts.map