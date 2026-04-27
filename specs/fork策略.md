# Fork 策略：不追上游

## 结论

**不追 upstream（anomalyco/opencode）。只 cherry-pick 明显有益的修复。**

## 理由

### 1. 上游方向和我们不重合

| | upstream 方向 | 我们 |
|---|-------------|------|
| Effect Schema 迁移 | 核心代码全面重构成 Effect Schema | 不动，稳定优先 |
| HTTP API 暴露 | 大量新端点（session、workspace、sync bridge） | 不用外部集成，不关心 |
| 多 Provider | 持续新增 provider | DeepSeek 独用，其他已删 |
| 工具框架重构 | 18 工具全改 | 稳定优先 |

### 2. 维护成本远大于收益

我们的 fork 在 `sync/upstream`（约 v1.14.22 版本）之上有 **68 个自定义 commits**：

```
upstream/dev ──...──●──────────●───────────●──→
                    ↑v1.14.22  v1.14.24   v1.14.25
                    │           ├─ DeepSeek fixes ✓
                    │           ├─ Effect Schema 迁移
                    │           └─ HTTP API 批量
               sync/upstream
                    │
                    └── 68 commits ─→ main（当前）
                        ├─ 全局 session pool（大改动）
                        ├─ 删除保护 / CVE 修复
                        ├─ DeepSeek reasoning 修复（部分）
                        ├─ 中文化 + 文档
                        └─ 调试诊断
```

合并上游意味着：
- 68 个自定义 commits rebase 到 50+ 新上游 commits 上
- Effect Schema 迁移撞全局 session pool → 必有冲突
- 工具框架重构撞删除保护 → 必有冲突
- **至少 2-3 天解决冲突，不值**

### 3. DeepSeek 修复已经到位

| 上游修复 | 我们的状态 |
|---------|----------|
| #24180 — DeepSeek reasoning 始终包含 | ✅ 已合并 |
| #24163 — 支持 `max` 参数 | ✅ 已合并 |
| #24157 — DeepSeek variants 修复 | ✅ 已合并 |
| #24146 — 保留空 reasoning_content | ✅ 已合并 |
| #24435 — OpenRouter SDK bump | ✅ 已合并 |

### 4. 我们的独有改动上游没有

- **全局 Session Pool**：跨项目 session 列表，改了服务端路由 + DB 查询 + 前端
- **删除保护**：AI 工作时禁删 session，改了前端状态管理 + 服务端 guard
- **全中文系统 prompt**：prompt 注入层改动，不是 customInstructions
- **非 DeepSeek Provider 删除**：几十个无关 provider 删了，上游不可能接受
- **DeepSeek reasoning 兜底注入**：多层拦截确保 reasoning_content 不丢

## 可 cherry-pick 的（如果有需要）

| 上游功能 | 价值 | 接入难度 |
|---------|------|---------|
| **AST 工具**（#24515）— `ast_query`/`ast_edit` 原生工具 | 减少对外部 ast-grep Agent 依赖 | 高（跨 Effect Schema 迁移区） |
| **Hash-anchored edits**（#24511）— 省 token | -64.8% API 成本 | 低（草案阶段，等实现） |
| **LSP 权限弹窗详情**（v1.14.25） | UX 提升 | 低 |

目前没有一个值得现在动手。等有明确需要再 cherry-pick。
