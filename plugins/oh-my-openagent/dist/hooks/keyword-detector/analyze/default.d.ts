/**
 * Analyze mode keyword detector.
 *
 * Triggers on analysis-related keywords across multiple languages:
 * - English: analyze, analyse, investigate, examine, research, study, deep-dive, inspect, audit, evaluate, assess, review, diagnose, scrutinize, dissect, debug, comprehend, interpret, breakdown, understand, why is, how does, how to
 * - Korean: 분석, 조사, 파악, 연구, 검토, 진단, 이해, 설명, 원인, 이유, 뜯어봐, 따져봐, 평가, 해석, 디버깅, 디버그, 어떻게, 왜, 살펴
 * - Japanese: 分析, 調査, 解析, 検討, 研究, 診断, 理解, 説明, 検証, 精査, 究明, デバッグ, なぜ, どう, 仕組み
 * - Chinese: 调查, 检查, 剖析, 深入, 诊断, 解释, 调试, 为什么, 原理, 搞清楚, 弄明白
 * - Vietnamese: phân tích, điều tra, nghiên cứu, kiểm tra, xem xét, chẩn đoán, giải thích, tìm hiểu, gỡ lỗi, tại sao
 */
export declare const ANALYZE_PATTERN: RegExp;
export declare const ANALYZE_MESSAGE = "\u5206\u6790\u6A21\u5F0F\u3002\u6DF1\u5165\u524D\u5148\u6536\u96C6\u4E0A\u4E0B\u6587\uFF1A\n\n\u4E0A\u4E0B\u6587\u6536\u96C6\uFF08\u5E76\u884C\uFF09\uFF1A\n- 1-2 \u4E2A explore agent\uFF08\u4EE3\u7801\u5E93\u6A21\u5F0F\u3001\u5B9E\u73B0\uFF09\n- 1-2 \u4E2A librarian agent\uFF08\u5982\u679C\u6D89\u53CA\u5916\u90E8\u5E93\uFF09\n- \u76F4\u63A5\u5DE5\u5177\uFF1AGrep\u3001AST-grep\u3001LSP \u9488\u5BF9\u6027\u641C\u7D22\n\n\u5982\u679C\u590D\u6742\u2014\u2014\u4E0D\u8981\u72EC\u81EA\u786C\u6491\u3002\u54A8\u8BE2\u4E13\u5BB6\uFF1A\n- **Oracle**\uFF1A\u5E38\u89C4\u95EE\u9898\uFF08\u67B6\u6784\u3001\u8C03\u8BD5\u3001\u590D\u6742\u903B\u8F91\uFF09\n- **Artistry**\uFF1A\u975E\u5E38\u89C4\u95EE\u9898\uFF08\u9700\u8981\u4E0D\u540C\u65B9\u6CD5\uFF09\n\n\u7EFC\u5408\u53D1\u73B0\u540E\u518D\u7EE7\u7EED\u3002";
