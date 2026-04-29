/**
 * Search mode keyword detector.
 *
 * Triggers on search-related keywords across multiple languages:
 * - English: search, find, locate, lookup, explore, discover, scan, grep, query, browse, detect, trace, seek, track, pinpoint, hunt, where is, show me, list all
 * - Korean: 검색, 찾아, 탐색, 조회, 스캔, 서치, 뒤져, 찾기, 어디, 추적, 탐지, 찾아봐, 찾아내, 보여줘, 목록
 * - Japanese: 検索, 探して, 見つけて, サーチ, 探索, スキャン, どこ, 発見, 捜索, 見つけ出す, 一覧
 * - Chinese: 搜索, 查找, 寻找, 查询, 检索, 定位, 扫描, 发现, 在哪里, 找出来, 列出
 * - Vietnamese: tìm kiếm, tra cứu, định vị, quét, phát hiện, truy tìm, tìm ra, ở đâu, liệt kê
 */
export declare const SEARCH_PATTERN: RegExp;
export declare const SEARCH_MESSAGE = "\u6700\u5927\u5316\u641C\u7D22\u6548\u7387\u3002\u5E76\u884C\u542F\u52A8\u591A\u4E2A\u540E\u53F0 Agent\uFF1A\n- explore agent\uFF08\u4EE3\u7801\u5E93\u6A21\u5F0F\u3001\u6587\u4EF6\u7ED3\u6784\u3001ast-grep\uFF09\n- librarian agent\uFF08\u8FDC\u7A0B\u4ED3\u5E93\u3001\u5B98\u65B9\u6587\u6863\u3001GitHub \u793A\u4F8B\uFF09\n\u5916\u52A0\u76F4\u63A5\u5DE5\u5177\uFF1AGrep\u3001ripgrep\uFF08rg\uFF09\u3001ast-grep\uFF08sg\uFF09\n\u4E0D\u8981\u5728\u7B2C\u4E00\u4E2A\u7ED3\u679C\u5C31\u505C\u2014\u2014\u7A77\u5C3D\u641C\u7D22\u3002";
