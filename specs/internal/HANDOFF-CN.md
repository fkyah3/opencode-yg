# HANDOFF-CN — fkyah3/opencode-fkyah3 V2.0 完整上下文

> 生成时间：2026-04-26 凌晨
> 语言：纯中文

---

## 一、我是谁 / 项目定位

我们维护三个 fork 仓库：

| 仓库 | 路径 | 作用 |
|------|------|------|
| opencode-fkyah3 | `E:\fkyah3\Agent\deepseek\opecode\opencode-fkyah3` | 核心运行时 |
| oh-my-openagent-fkyah3 | `E:\fkyah3\Agent\deepseek\oh-my-openagent` | 编排 Agent 插件 |
| opencode-magic-context-fkyah3 | `E:\fkyah3\Agent\deepseek\opencode-magic-context` | 上下文管理插件 |

启动：`C:\Users\13248\bin\opencode.cmd`  
当前分支：`feature/global-session-pool-2.0`（已合并到 `main`）  
版本号：`local-fkyah3-V2.0`（左下角显示）

---

## 二、用户 fkyah3

- 声乐专业出身，非专业开发者
- 所有代码由 AI（DeepSeek V4 / Sisyphus）完成，本人负责方向把控和验证
- 工作习惯：UTC+8，下午到凌晨
- 主项目：`E:\fkyah3\project\Frankenstein-of-The-Babel-fkyah3`
- 启动方式：右键 cmd → 输入 `opencode`

**核心理念：**
- AI 和人相互促进、协同发展
- 降低工具门槛，让有想法但技术弱的人能做东西
- 安全默认值优先（分享默认禁、AI 工作中默认禁删）
- 知情权优先于硬阻止

---

## 三、V2.0 核心功能

### 全局 Session 池
- session 不再按 git projectID 分裂
- 从任意目录启动都能看到所有对话
- 开关：`OPENCODE_FKYAH3_GLOBAL_SESSIONS=true`（opencode.cmd 预设）
- 含子 agent session（去掉了 `parentID` 过滤）
- 自动刷新、删除保护

### Session 列表
- 加载 40 条、自动刷新
- AI 工作时禁止删除（标题红色警告）
- 对话框 xlarge，搜索栏隐藏

### 安全
- Session 分享全局禁用（`OPENCODE_FKYAH3_DISABLE_SHARE=true`）
- UI 按钮置灰 + API 返回 403

### 配置
- 上下文 800K、MC 阈值 85%、reasoningEffort: max
- Pro/Flash 分拆（Sisyphus/Oracle → Pro）

---

## 四、待完成

1. **免责声明**（高优先级）— system prompt 或 TUI 首页加中文警告（"非 GitHub 渠道获得 = 被骗 + 可能带病毒"）
2. **汉化插件化**（高优先级）— 把中文汉化做成可选插件
3. **发视频宣传**（高优先级）— B 站 + 社区，只分享 GitHub 地址
4. **AI 时间感知**（中）— system prompt 注入实时时间
5. **日志安全**（中）— 防止 API key 泄露
6. **工具调用安全审核**（中）
7. `@` 文件引用动态目录切换（低）
8. Session 翻页（低）

---

## 五、关键路径

| 文件 | 位置 |
|------|------|
| 用户配置 | `C:\Users\13248\.config\opencode\opencode.json` |
| Agent 配置 | `C:\Users\13248\.config\opencode\oh-my-openagent.json` |
| MC 配置 | `C:\Users\13248\.config\opencode\magic-context.jsonc` |
| 启动脚本 | `C:\Users\13248\bin\opencode.cmd` |
| 日志 | `C:\Users\13248\.local\share\opencode\log\` |
| 数据库 | `C:\Users\13248\.local\share\opencode\opencode.db` |

opencode.cmd 环境变量：
```
OPENCODE_FKYAH3_GLOBAL_SESSIONS=true
OPENCODE_FKYAH3_DISABLE_SHARE=true
```

---

## 六、参考文档

| 文档 | 内容 |
|------|------|
| `analysis/reasoning_content-loss-root-cause-analysis.md` | reasoning_content 完整链路 |
| `analysis/GLOBAL-SESSION-POOL-DESIGN.md` | 2.0 架构设计 |
| `analysis/DEEPSEEK-V4-ECOSYSTEM-ISSUE.md` | 跨项目生态问题 |
| `internal/COMPLETION.md` | 完成清单 |
| `internal/DEEPSEEK-FEEDBACK.md` | 反馈邮件草稿 |

---

## 七、数据库

- 417 session，全部 `project_id = "global"`
- 100 个根 session
- 备份：`opencode.db.bak-20260426`

---

## 八、社区

- PR #24218 仍 OPEN（interleaved 默认值修复）
- Issue #24104 已关闭
- 跨项目生态问题已记录
