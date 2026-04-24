# OpenCode Kimi K2.6 reasoning_content 修复 - 工作交接文档

## 1. 问题背景

**项目**: Frankenstein of The Babel (Godot 4.6.2)  
**发现时间**: 2026-04-22  
**影响**: 开发工作流被中断，无法继续使用 AI 辅助开发

### 1.1 现象
- OpenCode 1.14.19 (anomalyco/opencode 分支) 使用 Kimi K2.6 模型时，长对话历史回放阶段出现错误：
  ```
  thinking is enabled but reasoning_content is missing in assistant tool call message at index 190+
  ```
- 错误发生在 index 190+（长对话历史回放时），即时消息正常

### 1.2 根因分析
- Kimi K2.6 通过 OpenAI-compatible API 返回 `reasoning_content` 字段
- OpenCode 期望标准的 `type: "reasoning"` message part
- **核心 bug**: `packages/opencode/src/provider/openai-compatible.ts` 中的 `getOpenAIMetadata()` 函数硬编码了 `providerOptions` 的 key 为 `"openaiCompatible"`
- 当用户配置了 `interleaved: { field: "reasoning_content" }` 时，配置存储在 providerID (如 `moonshotai-cn`) 为 key 的对象中，但读取时使用了错误的 key，导致配置丢失

## 2. 修复内容

### 2.1 修改文件

**文件**: `packages/opencode/src/provider/openai-compatible.ts`  
**修改**: `getOpenAIMetadata()` 函数中，将 `providerOptions['openaiCompatible']` 改为 `providerOptions[providerID]`

```typescript
// 修复前
const providerOptions = options.providerOptions?.['openaiCompatible'];

// 修复后  
const providerOptions = options.providerOptions?.[providerID];
```

### 2.2 修复分支
- **Fork 仓库**: `E:\fkyah3\Agent\KIMI2.6\openode-fkyah3\opencode-fkyah3`
- **修复分支**: `fix/permission-reasoning-truncation`
- **Commit**: fc284c02a (实际提交需要确认)
- **已推送**: 是，到 fork 仓库

## 3. 验证过程

### 3.1 测试方法
在修复分支上进行多轮测试：
1. 运行 `git status` / `git branch` 等简单命令（10轮无报错）
2. 创建文件并提交（验证完整工具调用链）
3. 读取和修改文件（验证 reasoning_content 正确传递）

### 3.2 测试结果
- ✅ 10+ 轮 git 操作无报错
- ✅ 文件读写正常
- ✅ 对话历史正确加载
- ✅ reasoning_content 正确传递

### 3.3 环境配置

**启动命令**:
```bash
cd /e/fkyah3/Agent/KIMI2.6/openode-fkyah3/opencode-fkyah3/packages/opencode
bun run --conditions=browser src/index.ts
```

**Bash 别名配置** (已写入 `~/.bashrc`):
```bash
opencodedev() { local cwd="$PWD"; (cd /e/fkyah3/Agent/KIMI2.6/openode-fkyah3/opencode-fkyah3/packages/opencode && bun run --conditions=browser src/index.ts "$cwd" "$@"); }
```

**OpenCode 全局配置** (`C:\Users\13248\.config\opencode\opencode.json`):
```json
{
  "providers": {
    "moonshotai-cn": {
      "model": "kimi-k2.6",
      "reasoning": true,
      "interleaved": {
        "field": "reasoning_content"
      }
    }
  }
}
```

## 4. 当前状态

### 4.1 已完成
- ✅ 定位根因（`getOpenAIMetadata()` 硬编码 key）
- ✅ 实施修复（使用 `providerID` 代替硬编码字符串）
- ✅ 本地验证（10+ 轮测试通过）
- ✅ 创建修复分支并推送
- ✅ 配置启动别名 `opencodedev`
- ✅ 对话历史完整保留（使用同一 `opencode.db`）

### 4.2 已知问题
- ⚠️ **记忆丢失**: 每次启动修复版本时，AI 的 "记忆" 似乎被重置（可能是因为使用了子 shell 或目录切换导致）
- ⚠️ **版本差异**: 修复版本和预编译版本使用相同的 opencode.db，但行为可能有细微差别

### 4.3 待办事项
- [ ] **完善文档**: 补充详细的实验记录和复现步骤
- [ ] **准备 PR**: 
  - [ ] 整理 commit 历史（可能需要 rebase）
  - [ ] 编写 PR 描述（包含问题、复现步骤、修复方案、验证结果）
  - [ ] 检查是否影响其他 provider（OpenAI, Anthropic 等）
  - [ ] 运行测试套件（如果存在）
- [ ] **提交到上游**: anomalyco/opencode 仓库
- [ ] **回滚方案**: 如果 PR 被拒绝或引入新问题，需要能回滚到原版 opencode
- [ ] **长期维护**: 考虑是否维护 fork 版本，或等待上游合并

## 5. 关键文件路径

### 5.1 修复相关
- **Fork 仓库**: `E:\fkyah3\Agent\KIMI2.6\openode-fkyah3\opencode-fkyah3`
- **修复文件**: `packages/opencode/src/provider/openai-compatible.ts`
- **数据库**: `C:\Users\13248\.local\share\opencode\opencode.db`
- **数据库备份**: `E:\fkyah3\oepncode_db_backup\opencode\`
- **配置文件**: `C:\Users\13248\.config\opencode\opencode.json`

### 5.2 项目相关（Frankenstein of The Babel）
- **项目根目录**: `E:\fkyah3\project\Frankenstein-of-The-Babel-fkyah3`
- **当前分支**: `main`
- **工作流规范**: `specs/frankenstein-workflow-constraints/Godot开发流程规范/AGENTS.md`
- **OpenCode 项目配置**: `opencode.json` (项目根目录)

## 6. 任务交接检查清单

如果你是接手的 AI，请确认：

- [ ] 已阅读本文档全部内容
- [ ] 理解问题根因（`providerOptions` key 硬编码）
- [ ] 了解修复方案（使用 `providerID` 动态获取）
- [ ] 知道如何启动修复版本（`opencodedev` 命令）
- [ ] 了解当前待办事项（准备 PR）
- [ ] 知道数据库备份位置（以防万一）

## 7. 附录

### 7.1 相关 GitHub Issues
- Issue #19081: reasoning_content 在 message replay 时被剥离
- Issue #20427: permission 相关讨论
- Issue #17523: 其他 provider 配置问题

### 7.2 相关 PRs（未合并）
- PR #19480: 添加 preserveInterruptedResponse 选项
- PR #14637: 支持 interleaved reasoning_content for anthropic protocol
- PR #14641: 更完整的修复（Draft 状态）
- PR #16981: 处理非 Anthropic provider 的 system messages

### 7.3 技术细节

**providerID 来源**:  
在 `packages/opencode/src/provider/openai-compatible.ts` 中，`providerID` 是函数参数，代表用户在配置中定义的 provider 名称（如 `moonshotai-cn`, `kimi-for-coding` 等）。

**为什么修复有效**:  
当用户配置了 `interleaved` 选项时，配置存储在 `providerOptions[providerID]` 中。修复前使用硬编码的 `openaiCompatible` 作为 key，导致始终找不到配置，interleaved 功能失效，reasoning_content 被剥离。

---

**文档创建时间**: 2026-04-22  
**最后更新**: 2026-04-22  
**作者**: OpenCode AI Assistant  
**状态**: 进行中（验证完成，待提交 PR）
