---
name: StormRelay Demo PRD
overview: 为影视飓风产品经理面试准备的StormRelay（飓风接力）Demo，多页面HTML实现的原型，展示"剪辑师→运营"信息无损传递、效率提升80%、数据自动沉淀的核心交互。
todos:
  - id: confirm-data
    content: 确认Demo数据来源（用户提供或先用假数据）
    status: completed
  - id: write-html
    content: 编写多页面HTML：项目列表、上传、详情、分析、设置
    status: completed
  - id: style-polish
    content: 调整视觉细节，Linear风格
    status: completed
  - id: editor-crud
    content: 剪辑视角支持增删改查标注
    status: completed
  - id: workflow-control
    content: 实现正确的交付流程权限控制
    status: completed
  - id: analytics-enhance
    content: 内容分析页增强（筛选、跳转）
    status: completed
  - id: multi-project-data
    content: 支持多项目数据，每个项目独立加载和编辑
    status: completed
  - id: real-status-flow
    content: 真实状态流转，交付后项目在列表间移动
    status: completed
  - id: withdraw-feature
    content: 撤回机制，支持回退到上一步状态
    status: completed
  - id: efficiency-chart
    content: 效率交接折线图和数据表格可视化
    status: completed
  - id: brand-easter-egg
    content: 品牌彩蛋（HKRR原则、logo、slogan）
    status: completed
  - id: real-api-integration
    content: 真实API集成（火山引擎视频理解）
    status: completed
isProject: false
---

# StormRelay · 飓风接力 完整 PRD

---

## 一、产品概述

### 1.1 产品定位

**产品名：StormRelay / 飓风接力**

**一句话定义：**

> **交接时间从 30 分钟压到 5 分钟，关键信息从"靠记忆"变成"有清单"，所有标注自动沉淀成可复用的内容资产。**

**三层价值（对标 JD 三大核心）：**

- **提效**：剪辑师 2 分钟确认，运营 3 分钟上手，省掉"看视频+追问"的 30 分钟
- **降损**：AI 提取+人类确认，核心卖点、注意事项结构化呈现，不靠记忆不靠口头
- **沉淀**：每期视频的标注自动存档，支持新人学习、内容复盘、AI 持续优化

**产品类型：**
内部工具 / B 端效率工具 / 流程自动化

**技术栈：**
单 HTML 文件 + 内联 CSS/JS + 字节豆包视频理解 API（数据可 hardcode）

---

### 1.2 对标 JD 三大核心点（量化体现）

| JD 要求                                                        | 对应价值 | 量化体现                                           |
| -------------------------------------------------------------- | -------- | -------------------------------------------------- |
| **深入对接内容/制作团队工作场景，挖掘效率提升机会**            | **提效** | 交接时间从 **30 分钟 → 5 分钟**，效率提升 **80%+** |
| **完成轻量级功能或流程自动化建设，提升内部系统响应与交付效率** | **降损** | 关键信息从"口头沟通易漏" → "结构化清单零丢失"      |
| **持续跟踪产品数据与使用反馈，输出产品优化建议与版本规划**     | **沉淀** | 每期标注自动积累，支持复盘和 AI 迭代               |

**效率提升数据来源：**

| 环节             | 没有工具                     | 有工具                  | 节省     |
| ---------------- | ---------------------------- | ----------------------- | -------- |
| 剪辑师写交接信息 | 10-15 分钟（详细）或敷衍了事 | 2 分钟（勾选确认+补充） | 80%      |
| 运营理解视频内容 | 20-40 分钟（看视频）         | 3 分钟（看信息卡）      | 85%      |
| 来回追问沟通     | 5-10 分钟                    | 接近 0                  | 90%      |
| **总计**         | **30-60 分钟**               | **5 分钟**              | **80%+** |

---

### 1.3 核心洞察（面试必讲）

> "影视飓风的内容生产是一个**接力赛**：策划 → 编导 → 摄影 → 剪辑 → 运营。每一次交接，都有上下文丢失的风险。
>
> 问题不是运营不专业，而是**时间不够**。一期 20-40 分钟的视频，运营要看完才能精准抓到核心卖点，这个时间成本是客观存在的。
>
> StormRelay 让剪辑师**2 分钟确认**，运营**3 分钟上手**，整个交接从'看视频+口头沟通'变成'看卡片+快速确认'。**效率提升 80%，信息磨损降到零，标注数据自动沉淀。**"

### 1.4 风险预防（面试主动说）

> "我要先说明，这个痛点是我**基于公开信息观察和推测**的，我没有在影视飓风内部工作过，不一定完全准确。
>
> 但我选择这个方向的原因是：**即使这个具体场景不是核心痛点，这个思路是可泛化的**——任何'上游 → 下游'的信息交接都适用，比如策划 → 编导、摄影 → 剪辑、内容 → 电商、国内 → 出海。"

---

## 二、目标用户与场景

### 2.1 用户角色

| 角色       | 在工具中的行为                               | 核心诉求                           |
| ---------- | -------------------------------------------- | ---------------------------------- |
| **剪辑师** | 上传视频 → 确认/补充 AI 提取的信息 → 交付    | 不想写长文档，但希望运营能抓到重点 |
| **运营**   | 查看标注结果 → 快速了解视频核心 → 写分发文案 | 没时间看完长视频，需要快速进入状态 |
| **负责人** | 查看项目列表 → 了解进度和质量（愿景层）      | 团队扩张后，难以把控每一期内容     |

### 2.2 核心场景（MVP 聚焦）

**场景：佳能 C50 评测视频交付**

1. 剪辑师完成《佳能 C50 深度评测》的剪辑
2. 上传到 StormRelay，AI 自动分析
3. AI 提取出：核心定位、三大卖点、关键时间点、注意事项
4. 剪辑师勾选确认，补充"强调三年回本这个点"
5. 运营收到通知，打开工具，3 分钟了解视频核心
6. 运营基于标注写 B 站/小红书/YouTube 的分发文案

---

## 三、核心功能设计

### 3.1 功能架构

```
StormRelay MVP功能架构

├── 项目状态流转
│   ├── 待剪辑确认（剪辑师工作中）
│   ├── 已交付运营（运营可查看）
│   └── 已上线归档（流程完成）
│
├── 视角切换与权限
│   ├── 剪辑师视角（完整编辑权限）
│   │   ├── 添加标注
│   │   ├── 编辑标注
│   │   ├── 删除标注
│   │   └── 确认交付
│   └── 运营视角（交付后可见）
│       ├── 查看确认内容
│       ├── 添加笔记
│       └── 标记上线
│
├── 信息卡片模块
│   ├── 核心定位卡（单条，可编辑）
│   ├── 卖点列表卡（多条，增删改）
│   ├── 关键时间点卡（多条，增删改）
│   └── 注意事项卡（多条，增删改）
│
├── 状态标签系统
│   ├── 🤖 AI提取（未确认）
│   ├── ✏️ 剪辑修改（已编辑）
│   └── ✅ 已确认（剪辑确认）
│
├── 内容分析模块
│   ├── 项目筛选
│   ├── 日期范围筛选
│   ├── 状态筛选
│   ├── 风险点击跳转
│   ├── 数据可视化
│   │   ├── 状态分布饼图
│   │   ├── 关键词词云
│   │   └── 风险类型统计
│   └── 效率交接分析
│       ├── 效率趋势折线图（使用前 vs 使用后）
│       ├── 详细数据表格
│       └── 效率总结指标
│
├── 数据持久化
│   ├── localStorage 本地存储
│   ├── 项目数据集中管理
│   ├── 状态流转自动记录
│   └── 重置数据功能（演示用）
│
└── 数据沉淀
    ├── 标注历史记录
    └── 知识图谱（愿景层）
```

### 3.2 信息卡片详细设计

#### 卡片 1：核心定位

| 字段     | 说明                      | 示例                               |
| -------- | ------------------------- | ---------------------------------- |
| AI 提取  | AI 从视频中理解的核心定位 | "面向直播/Vlog 创作者的'回本神器'" |
| 确认状态 | 剪辑师是否确认            | ✅ 已确认                          |
| 补充说明 | 剪辑师的补充              | "强调三年回本"                     |

**剪辑师视角交互：**

- 显示 AI 提取的内容
- 勾选框：确认/不确认
- 输入框：补充说明（可选）

**运营视角展示：**

- 显示最终确认的内容
- 显示剪辑师的补充
- 绿色标记"已确认"

---

#### 卡片 2：三大卖点

| 字段     | 说明                      | 示例                             |
| -------- | ------------------------- | -------------------------------- |
| AI 提取  | AI 从视频中提取的卖点列表 | 7K Open Gate / 直播推流 / 性价比 |
| 选择状态 | 每个卖点是否保留          | ✅✅✅                           |
| 补充卖点 | 剪辑师添加的卖点          | "佳能色彩科学"                   |

**剪辑师视角交互：**

- 每个卖点有独立的勾选框
- 可以取消不想强调的卖点
- 可以添加 AI 没提取到的卖点

**运营视角展示：**

- 只显示被选中的卖点
- 显示补充的卖点

---

#### 卡片 3：关键时间点

| 字段     | 说明             | 示例                              |
| -------- | ---------------- | --------------------------------- |
| AI 提取  | 视频中的关键节点 | 12:34 性价比论述 / 23:45 画质对比 |
| 用途标记 | 可用于什么       | 短视频素材 / 封面截图             |

**剪辑师视角交互：**

- 确认每个时间点
- 可以添加 AI 没识别到的时间点
- 可以标记用途

**运营视角展示：**

- 直接跳转到对应时间点（如果嵌入播放器）
- 或显示时间戳供复制

---

#### 卡片 4：注意事项

| 字段     | 说明               | 示例                       |
| -------- | ------------------ | -------------------------- |
| AI 提取  | 视频中需要注意的点 | "提到无机身防抖"           |
| 风险等级 | 高/中/低           | ⚠️ 中                      |
| 建议行动 | 运营应该怎么做     | "简介中说明建议搭配稳定器" |

**剪辑师视角交互：**

- 确认是否需要提醒运营
- 可以添加其他注意事项
- 可以补充建议行动

**运营视角展示：**

- 醒目显示需要注意的点
- 显示建议行动

---

## 四、界面设计规范

### 4.1 整体布局

```
┌─────────────────────────────────────────────────────────────┐
│  Logo    项目名称                    [剪辑师] [运营] 切换   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 视频信息区                                           │   │
│  │ 标题：佳能C50深度评测                                │   │
│  │ 时长：23:45  状态：待确认/已交付                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 卡片1：核心定位                                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 卡片2：三大卖点                                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 卡片3：关键时间点                                    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 卡片4：注意事项                                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│                              [确认并交付给运营]             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 设计规范（Notion 风格，浅色）

**颜色系统：**

- 背景色：`#FAFAFA`
- 卡片背景：`#FFFFFF`
- 卡片边框：`#E5E7EB`
- 主色调（按钮/强调）：`#2563EB`
- 确认状态：`#22C55E`
- 警告状态：`#F59E0B`
- 文字主色：`#1F2937`
- 文字次色：`#6B7280`

**字体：**

- 字体族：`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- 标题：18px, font-weight 600
- 正文：14px, font-weight 400
- 辅助文字：12px, color #6B7280

**间距：**

- 页面内边距：24px（移动端 16px）
- 卡片间距：16px
- 卡片内边距：20px
- 元素间距：12px

**圆角：**

- 卡片：8px
- 按钮：6px
- 输入框：4px

**阴影：**

- 卡片：`0 1px 3px rgba(0,0,0,0.1)`

---

### 4.3 组件设计

#### 视角切换按钮

```
┌────────────────────────────────┐
│  [剪辑师]     运营             │  ← 剪辑师选中状态
└────────────────────────────────┘
选中态：背景#2563EB，文字白色
未选中：背景透明，文字#6B7280
```

#### 信息卡片（剪辑师视角）

```
┌─────────────────────────────────────────────────────┐
│ ☐ 核心定位                                          │  ← 标题 + 勾选框
├─────────────────────────────────────────────────────┤
│                                                     │
│ "面向直播/Vlog创作者的'回本神器'"                   │  ← AI提取内容
│                                                     │
│ ┌─────────────────────────────────────────────┐    │
│ │ 补充说明...                                  │    │  ← 输入框
│ └─────────────────────────────────────────────┘    │
│                                                     │
│ 🤖 AI提取 · 点击确认或补充                          │  ← 来源标记
└─────────────────────────────────────────────────────┘
```

#### 信息卡片（运营视角）

```
┌─────────────────────────────────────────────────────┐
│ ✅ 核心定位                                         │  ← 标题 + 已确认标记
├─────────────────────────────────────────────────────┤
│                                                     │
│ "面向直播/Vlog创作者的'回本神器'"                   │  ← 确认的内容
│                                                     │
│ 💬 剪辑师补充：强调三年回本                         │  ← 补充说明
│                                                     │
│ ✓ 已由 剪辑师 确认                                  │  ← 确认信息
└─────────────────────────────────────────────────────┘
```

---

## 五、数据结构

### 5.1 项目数据（JSON）

```json
{
  "project": {
    "id": "c50-review-001",
    "title": "佳能C50深度评测：7K画质+直播推流，这台\"回本神器\"值得买吗？",
    "duration": "23:45",
    "status": "pending",
    "createdAt": "2024-02-05T10:00:00Z",
    "deliveredAt": null
  },
  "aiExtraction": {
    "corePosition": {
      "content": "面向直播/Vlog创作者的\"回本神器\"，主打性价比和直播推流能力",
      "confirmed": false,
      "supplement": ""
    },
    "sellingPoints": [
      { "id": 1, "content": "7K Open Gate 支持竖屏裁切", "selected": true },
      {
        "id": 2,
        "content": "直播推流能力强，支持多平台同时推流",
        "selected": true
      },
      { "id": 3, "content": "性价比突出，三年可回本", "selected": true },
      { "id": 4, "content": "佳能色彩科学，肤色表现好", "selected": false }
    ],
    "keyTimestamps": [
      {
        "id": 1,
        "time": "03:22",
        "description": "外观开箱与按键布局",
        "usage": "封面素材"
      },
      {
        "id": 2,
        "time": "08:15",
        "description": "7K Open Gate演示",
        "usage": "短视频素材"
      },
      {
        "id": 3,
        "time": "12:34",
        "description": "性价比分析与回本计算",
        "usage": "核心卖点"
      },
      {
        "id": 4,
        "time": "18:20",
        "description": "直播推流实测",
        "usage": "功能演示"
      },
      {
        "id": 5,
        "time": "21:45",
        "description": "总结与购买建议",
        "usage": "结尾引用"
      }
    ],
    "cautions": [
      {
        "id": 1,
        "content": "视频明确提到\"没有机身防抖\"",
        "level": "medium",
        "action": "简介中说明\"建议搭配稳定器或三脚架使用\"",
        "confirmed": false
      },
      {
        "id": 2,
        "content": "提到竞品索尼FX3作为对比",
        "level": "low",
        "action": "小红书发布时注意措辞，避免引战",
        "confirmed": false
      }
    ]
  },
  "editorNotes": {
    "corePositionSupplement": "",
    "additionalSellingPoints": [],
    "additionalTimestamps": [],
    "additionalCautions": []
  }
}
```

---

## 六、交互流程

### 6.1 项目状态流转（含撤回机制）

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     项目状态流转图（含撤回）                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────┐    确认交付    ┌──────────────┐    标记上线   ┌──────────────┐
│  │  待剪辑确认   │  ──────────→  │  已交付运营   │  ──────────→ │  已上线归档   │
│  │  (pending)   │  ←──────────  │  (delivered)  │  ←────────── │  (archived)   │
│  └──────────────┘    ↩️ 撤回     └──────────────┘    ↩️ 撤回     └──────────────┘
│        │                              │                               │
│        ↓                              ↓                               ↓
│   剪辑师可操作:                   两方可操作:                     双方均可:
│   • 编辑标注                      • 剪辑师：只读+撤回             • 查看历史
│   • 添加标注                      • 运营：查看+笔记+归档          • 导出数据
│   • 删除标注                      • 运营：撤回到待确认            • 撤回到上一步
│   • 确认交付                                                      
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**撤回机制说明：**

| 当前状态     | 撤回后状态     | 谁可以撤回   | 撤回后效果                     |
|-------------|---------------|-------------|-------------------------------|
| 已交付运营   | 待剪辑确认     | 剪辑师/运营 | 清除交付时间，剪辑可重新编辑    |
| 已上线归档   | 已交付运营     | 剪辑师/运营 | 清除归档时间，运营可重新操作    |

**设计原因：**
1. **允许纠错**：发现标注有误时可以回退修改
2. **灵活流程**：上线后发现问题可以撤回
3. **责任明确**：撤回操作有记录，便于追溯

### 6.2 权限控制设计

| 状态         | 剪辑师视角               | 运营视角                   |
|-------------|-------------------------|---------------------------|
| 待剪辑确认   | ✅ 完整编辑权限          | ⏳ 显示"等待剪辑确认"提示  |
| 已交付运营   | 👁️ 只读，可查看交付结果  | ✅ 查看内容，可添加笔记    |
| 已上线归档   | 👁️ 只读                 | 👁️ 只读                  |

**核心原则：交付前运营看不到标注内容**

> 这样设计的原因是：
> 1. 避免半成品信息造成混乱
> 2. 保证剪辑师有完整的编辑周期
> 3. 交付是明确的"交接仪式"，责任清晰

### 6.3 剪辑师操作流程

```
1. 进入工具，默认显示剪辑师视角
2. 查看AI提取的"核心定位"
   → 觉得对：点击勾选框确认
   → 想修改：点击"编辑"按钮修改内容
   → 状态标签自动更新：🤖AI提取 → ✏️剪辑修改 → ✅已确认
3. 查看"三大卖点"
   → 每个卖点都可以：确认 / 编辑 / 删除
   → 点击"+ 添加卖点"补充AI遗漏的
4. 查看"关键时间点"
   → 每个时间点都可以：确认 / 编辑 / 删除
   → 可以补充AI没识别到的时间点
5. 查看"注意事项"
   → 每个风险项都可以：确认 / 编辑 / 删除
   → 可以补充其他注意事项
6. 底部显示确认进度："已确认 X 项 · 已编辑 X 项"
7. 点击"确认交付运营"
   → 至少需要确认核心定位和一个卖点
   → 状态变为"已交付运营"
   → 运营可以开始查看
```

### 6.4 运营操作流程

```
1. 在项目列表看到"已交付运营"状态的项目
2. 点击进入，默认或切换到运营视角
3. 如果项目是"待剪辑确认"状态
   → 显示等待提示："剪辑师正在整理标注信息，交付后可查看"
   → 不显示具体标注内容
4. 如果项目是"已交付运营"状态
   → 查看已确认的信息卡片
   → 核心定位：知道这期视频的灵魂
   → 卖点列表：知道文案要围绕什么写
   → 关键时间点：知道哪些片段可以截取，可点击跳转
   → 注意事项：知道哪些坑要避
5. 在右侧"笔记"面板添加运营笔记
6. 基于信息写分发文案
7. 上线后标记"已上线归档"
```

### 6.5 状态标签系统

每个标注项都有状态标签，用于区分来源和处理状态：

| 状态标签     | 含义                    | 显示样式                |
|-------------|------------------------|------------------------|
| 🤖 AI提取   | AI生成，尚未人工确认    | 浅紫色背景 `#EEF2FF`   |
| ✏️ 剪辑修改 | 剪辑师已编辑或新增      | 浅黄色背景 `#FEF3C7`   |
| ✅ 已确认   | 剪辑师已勾选确认        | 浅绿色背景 `#ECFDF5`   |

**标签转换规则：**
- AI提取 → 勾选确认 → 已确认
- AI提取 → 点击编辑 → 剪辑修改
- 剪辑修改 → 勾选确认 → 已确认
- 任何状态 → 取消勾选 → 回到原状态

---

## 七、Demo 数据（佳能 C50）

以下是 Demo 需要用到的具体内容，基于你准备的视频文案：

### 7.1 视频基本信息

- 标题：佳能 C50 深度评测：7K 画质+直播推流，这台"回本神器"值得买吗？
- 时长：23:45
- 状态：待确认

### 7.2 AI 提取内容（需要你提供或我先写假数据）

**核心定位：**

> "面向直播/Vlog 创作者的'回本神器'，主打性价比和直播推流能力，适合需要快速回本的内容创作者。"

**三大卖点：**

1. 7K Open Gate —— 支持竖屏裁切，一次拍摄适配多平台
2. 直播推流能力 —— 支持多平台同时推流，直播带货利器
3. 性价比突出 —— 三年可回本，对比同价位产品优势明显

**关键时间点：**

- 03:22 外观开箱与按键布局（封面素材）
- 08:15 7K Open Gate 演示（短视频素材）
- 12:34 性价比分析与回本计算（核心论述）
- 18:20 直播推流实测（功能演示）
- 21:45 总结与购买建议（结尾引用）

**注意事项：**

- ⚠️ 中风险：视频明确提到"没有机身防抖"
  - 建议行动：简介中说明"建议搭配稳定器或三脚架使用"
- ℹ️ 低风险：提到竞品索尼 FX3 作为对比
  - 建议行动：小红书发布时注意措辞，避免引战

---

## 八、技术实现要点

### 8.1 文件结构（多页面架构）

```
e:\claudecode\影视飓风项目\
├── index.html          # 项目列表页（首页）
├── project.html        # 项目详情页（剪辑/运营视角）
├── upload.html         # 视频上传页
├── settings.html       # API设置页
├── analytics.html      # 内容分析页（效率图表）
├── knowledge.html      # 知识图谱页（愿景占位）
├── styles.css          # 共享样式表（Linear风格）
├── app.js              # 共享JS（数据管理、工具函数）
└── [视频文件].mp4      # 演示视频（佳能C50）
```

### 8.2 数据管理架构

```javascript
// ========== app.js 核心数据管理 ==========

// 1. 存储键名
const PROJECTS_KEY = 'stormrelay_projects_v2';

// 2. 数据获取与保存
function getAllProjects() { ... }     // 获取所有项目
function saveAllProjects(projects) { ... }  // 保存所有项目
function getProjectById(id) { ... }   // 根据ID获取单个项目
function updateProject(id, updates) { ... } // 更新项目数据

// 3. 状态流转
function updateProjectStatus(id, newStatus) {
    // 处理 pending → delivered → archived 流转
    // 自动记录 deliveredAt, archivedAt 时间戳
    // 撤回时清除对应时间戳
}

// 4. 统计与分析
function getProjectStats() { ... }    // 各状态项目数量
function getEfficiencyData() { ... }  // 效率对比数据（图表用）

// 5. 演示重置
function resetAllData() { ... }       // 重置为初始演示数据
```

### 8.3 项目数据结构

```javascript
{
    id: "c50-real",                    // 唯一标识
    title: "佳能C50深度评测",           // 项目标题
    duration: "19:08",                 // 视频时长
    status: "pending",                 // 状态: pending/delivered/archived
    createdAt: "2024-02-05",          // 创建时间
    deliveredAt: null,                 // 交付时间（状态流转时自动填充）
    archivedAt: null,                  // 归档时间（状态流转时自动填充）
    isReal: true,                      // 是否真实项目（有视频文件）
    videoSrc: "xxx.mp4",              // 视频文件路径（可为null）
    
    // 标注内容
    corePosition: { content, confirmed, status, supplement },
    sellingPoints: [{ id, content, confirmed, status }],
    timestamps: [{ id, time, description, usage, confirmed, status }],
    cautions: [{ id, content, level, action, confirmed, status }],
    notes: [{ id, author, content, time }],
    
    // 字幕和AI总结
    transcript: [{ time, text }],
    aiSummary: { overall, targetAudience, contentHighlights, publishSuggestion }
}
```

### 8.4 页面间导航与数据传递

```javascript
// index.html → project.html（传递项目ID）
<a href="project.html?id=${project.id}">项目卡片</a>

// project.html（读取URL参数）
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');
const projectData = getProjectById(projectId);
```

### 8.5 状态流转与UI更新

```javascript
// project.html 状态流转函数
function deliverToOperator() {
    // 1. 验证：至少确认核心定位和一个卖点
    // 2. 更新状态：pending → delivered
    // 3. 记录时间：deliveredAt = now
    // 4. 保存到 localStorage
    // 5. 更新UI：切换到运营视角，隐藏编辑按钮
}

function archiveProject() {
    // 1. 更新状态：delivered → archived
    // 2. 记录时间：archivedAt = now
    // 3. 保存到 localStorage
    // 4. 更新UI：全面只读
}

function withdrawProject() {
    // 1. 状态回退：archived → delivered 或 delivered → pending
    // 2. 清除时间戳
    // 3. 保存到 localStorage
    // 4. 更新UI：恢复对应权限
}
```

### 8.6 响应式设计

- 最大宽度：800px（项目详情），居中显示
- 侧边栏固定宽度：240px
- 移动端：padding 减小，侧边栏隐藏

---

## 九、风险与规避（面试准备）

### 9.1 如果被问"这个问题不存在"

**话术：**

> "我理解你们可能已经有成熟的流程。我想验证的是：即使有流程，AI 能否让这个流程更高效？剪辑师确认信息从'填表'变成'勾选'，时间从 5 分钟变成 2 分钟。而且 AI 可以提取人容易遗漏的点，比如视频里提到的注意事项。"

### 9.2 如果被问"飞书能做"

**话术：**

> "具体的技术实现可以是独立工具，也可以嵌入飞书，这取决于你们的技术栈和团队偏好。我今天展示的是我的产品思考和快速验证能力——我理解问题，设计方案，做出原型。"

### 9.3 如果被问"AI 不准怎么办"

**话术：**

> "AI 提取只是起点，人类确认才是关键。工具的设计是'AI 建议 + 人类决策'，不是'AI 替代人'。而且，所有的确认数据都会沉淀，未来可以用来微调 AI，让它越来越懂影视飓风的风格。"

---

## 十、面试展示话术

### 10.1 开场（1 分钟）

> "我是 XX，应聘产品经理岗位。今天我带来一个我独立设计和实现的工具原型：**StormRelay，飓风接力**。
>
> 它解决的核心问题是：**内容交接中的信息磨损**。当剪辑师把视频交给运营时，核心卖点、注意事项容易在口头沟通中丢失。运营要看完 20-40 分钟视频才能精准抓到重点，时间成本很高。
>
> **StormRelay 的价值用三个数字概括：效率提升 80%、信息磨损降到零、标注数据自动沉淀。**"

### 10.2 演示（3 分钟）

> "我用佳能 C50 评测这期视频来演示。
>
> **剪辑师视角**：AI 已经分析完视频，提取出核心定位、三大卖点、关键时间点、注意事项。剪辑师只需要**勾选确认**，不用写长文档——2 分钟搞定。
>
> [演示勾选确认、补充说明]
>
> 注意这里 AI 提取了'无机身防抖'这个点，建议简介里说明。这就是**减少信息磨损**的价值——AI 帮你想到人容易遗漏的点。
>
> **运营视角**：[演示切换] 运营看到的是结构化的信息卡，核心定位、卖点、时间点、注意事项一目了然——3 分钟就能上手写文案，不用看完整个视频。
>
> 最后，所有标注**自动沉淀**，支持后续复盘和 AI 持续优化。"

### 10.3 价值陈述（1 分钟）

> "总结一下 StormRelay 的三层价值：
>
> **提效**：交接时间从 30 分钟压到 5 分钟，效率提升 80%。
> **降损**：关键信息从'靠记忆'变成'有清单'，磨损降到零。
> **沉淀**：每期标注自动积累，支持新人学习、内容复盘、AI 持续优化。
>
> 这个原型我独立完成，包括产品设计和前端实现。如果有机会加入影视飓风，我可以快速把它落地到真实的工作流中。"

### 10.4 风险预防话术

**如果被问"这个问题不存在"：**

> "这个痛点是我基于公开信息观察和推测的。但即使这个具体场景不是核心痛点，这个思路是可泛化的——任何'上游 → 下游'的信息交接都适用，比如策划 → 编导、摄影 → 剪辑、内容 → 电商。"

**如果被问"飞书能做"：**

> "具体的技术实现可以是独立工具，也可以嵌入飞书，这取决于你们的技术栈和团队偏好。我今天展示的是我的产品思考和快速验证能力——我理解问题，设计方案，做出原型。"

---

## 十一、效率分析模块设计

### 11.1 效率交接趋势图

analytics.html 中实现的效率分析可视化：

```
┌──────────────────────────────────────────────────────────────┐
│                    效率交接趋势                               │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  图例：● 使用前    ● 使用后    ░ 节省时间                    │
│                                                              │
│  时间(分钟)                                                  │
│   40 ┼─────────────────────────────────────────              │
│      │    ●───●───●───●───●───●  使用前                      │
│   30 ┼                                                        │
│      │                                                        │
│   20 ┼         ░░░░░░░░░░░░░░░░░░░ 节省区域                   │
│      │                                                        │
│   10 ┼    ●───●───●───●───●───●  使用后                      │
│      │                                                        │
│    0 ┴────┬────┬────┬────┬────┬────                          │
│         W1   W2   W3   W4   W5   W6                          │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### 11.2 效率数据表格

| 周期 | 使用前 | 使用后 | 节省时间 | 效率提升 |
|------|--------|--------|----------|----------|
| 第1周 | 35分钟 | 15分钟 | 20分钟  | 57%     |
| 第2周 | 32分钟 | 12分钟 | 20分钟  | 63%     |
| 第3周 | 30分钟 | 8分钟  | 22分钟  | 73%     |
| 第4周 | 30分钟 | 6分钟  | 24分钟  | 80%     |
| 第5周 | 28分钟 | 5分钟  | 23分钟  | 82%     |
| 第6周 | 30分钟 | 5分钟  | 25分钟  | 83%     |

### 11.3 效率总结指标

- **交接时间下降**：80%+
- **累计节省时间**：约 134 分钟（6周演示数据）
- **信息遗漏事故**：从"偶发"降至"零"

---

## 十二、待确认事项（已全部完成）

所有核心功能已实现：

1. ✅ **Demo 数据**：佳能 C50 真实视频 + 真实字幕已集成
2. ✅ **多项目支持**：8个演示项目，覆盖三种状态
3. ✅ **状态流转**：真实的 pending → delivered → archived 流转
4. ✅ **撤回机制**：支持回退到上一步状态
5. ✅ **效率图表**：SVG折线图 + 数据表格
6. ✅ **权限控制**：剪辑视角/运营视角正确隔离
7. ✅ **CRUD操作**：标注项的增删改查全部支持
8. ✅ **品牌彩蛋**：HKRR原则、影视飓风Logo、"无限进步"slogan

---

## 十三、彩蛋设计

### 13.1 HKRR原则（Tim的内容评判标准）

在 `settings.html` 的提示词模板中植入了影视飓风的HKRR原则：

```
【HKRR原则】— 影视飓风内容评判标准：
- Hook（钩子）：开头3秒是否足够吸引人？
- Knowledge（干货）：是否提供了独特、有价值的信息？
- Resonance（共鸣）：是否触动了观众的情感或痛点？
- Retention（留存）：是否有让人想回看或分享的内容？
```

**彩蛋位置**：AI配置 → 提示词模板 → 核心定位

**面试价值**：展示对影视飓风内容理念的深度理解

### 13.2 品牌视觉整合

- **Logo**：使用影视飓风官方Logo（红黑螺旋图案）
- **产品名**：飓风接力（StormRelay）
- **Slogan**：无限进步（影视飓风的品牌口号）
- **出现位置**：所有页面左上角侧边栏

### 13.3 致敬链接

在设置页"关于"区块中添加了 `🌀 致敬HKRR原则` 标签

---

## 十四、图标清单与Nano Banana Pro生图提示词

### 14.1 项目图标完整清单

| 序号 | 当前图标 | 含义 | 出现位置 |
|------|----------|------|----------|
| 1 | 📋 | 所有项目 | 侧边栏 |
| 2 | ➕ | 新建项目 | 侧边栏 |
| 3 | ✂️ | 待剪辑确认 | 侧边栏 |
| 4 | 📤 | 已交付运营 | 侧边栏 |
| 5 | 📁 | 已上线归档 | 侧边栏 |
| 6 | 📊 | 内容分析 | 侧边栏 |
| 7 | 🧠 | 知识图谱 | 侧边栏 |
| 8 | ⚙️ | AI配置 | 侧边栏 |
| 9 | 🔑 | API配置 | 设置页 |
| 10 | 📝 | 提示词模板 | 设置页 |
| 11 | 💾 | 数据管理/保存 | 设置页 |
| 12 | 🎯 | 核心定位 | 项目详情 |
| 13 | 💡 | 核心卖点 | 项目详情 |
| 14 | ⏱️ | 关键时间点 | 项目详情 |
| 15 | ⚠️ | 注意事项/风险 | 项目详情 |
| 16 | 🎬 | 视频/真实项目 | 项目列表 |
| 17 | 🚀 | 确认交付 | 项目详情 |
| 18 | ↩️ | 撤回修改 | 项目详情 |
| 19 | 🤖 | AI提取/AI总结 | 项目详情 |
| 20 | ✏️ | 剪辑修改 | 项目详情 |
| 21 | ✅ | 已确认 | 项目详情 |
| 22 | 📹 | 视频上传 | 上传页 |
| 23 | 📈 | 效率趋势 | 分析页 |
| 24 | 🔗 | 关联发现 | 知识图谱 |
| 25 | 📚 | 经验复用 | 知识图谱 |
| 26 | ⚡ | 智能提醒 | 知识图谱 |
| 27 | 🔍 | 语义搜索 | 知识图谱 |
| 28 | 🔄 | 刷新数据 | 列表页 |

### 14.2 影视飓风Logo风格分析

根据提供的影视飓风Logo（红黑螺旋图案），风格特点如下：

- **形状**：螺旋/旋涡形态，象征"飓风"
- **配色**：红色(#E53935)为主，黑色(#1A1A1A)辅助
- **风格**：简洁、动感、有力量感
- **线条**：流畅的弧线，渐变粗细
- **视觉张力**：从中心向外扩展，体现"能量"和"动力"

### 14.3 Nano Banana Pro 生图提示词

以下是为项目中每个图标生成与影视飓风Logo风格一致的图标提示词：

---

**1. 所有项目图标**
```
A minimalist icon representing "all projects" or "document list", 
red and black color scheme inspired by storm/hurricane spiral logo, 
clean geometric style, three stacked horizontal rectangles suggesting documents,
subtle red accent on the edge, professional SaaS UI icon, 
white background, vector style, 64x64px
```

**2. 新建项目图标**
```
A minimalist plus sign icon for "create new", 
red and black color scheme with hurricane/spiral aesthetic influence, 
bold red cross shape with subtle dynamic curve, 
clean modern design, professional product icon, 
white background, vector style, 64x64px
```

**3. 待剪辑确认图标**
```
A minimalist scissors icon representing "video editing pending", 
red and black color scheme, 
open scissors with dynamic diagonal angle suggesting motion,
clean geometric shapes, subtle red highlight on blade,
professional UI icon, white background, vector style, 64x64px
```

**4. 已交付运营图标**
```
A minimalist upload/send icon for "delivered to operations", 
red and black color scheme with upward arrow and box shape,
dynamic angle suggesting motion and transfer,
clean modern professional style, subtle red accent,
white background, vector style, 64x64px
```

**5. 已上线归档图标**
```
A minimalist folder/archive icon for "published and archived", 
red and black color scheme, 
closed folder shape with small checkmark,
clean professional design, subtle red corner accent,
white background, vector style, 64x64px
```

**6. 内容分析图标**
```
A minimalist bar chart icon for "content analytics", 
red and black color scheme inspired by storm energy,
three ascending bars with dynamic angle,
clean geometric professional style, main bar in red,
white background, vector style, 64x64px
```

**7. 知识图谱图标**
```
A minimalist brain/network icon for "knowledge graph", 
red and black color scheme with neural network aesthetic,
connected nodes forming brain-like shape,
subtle spiral/storm influence in connection patterns,
white background, vector style, 64x64px
```

**8. AI配置图标**
```
A minimalist gear/cog icon for "AI settings", 
red and black color scheme,
hexagonal gear with inner circle,
clean mechanical professional design,
subtle red accent highlight, white background, 
vector style, 64x64px
```

**9. API配置图标**
```
A minimalist key icon for "API key configuration", 
red and black color scheme,
stylized key shape with digital/tech aesthetic,
clean geometric design, red accent on key head,
white background, vector style, 64x64px
```

**10. 提示词模板图标**
```
A minimalist document with pen icon for "prompt template", 
red and black color scheme,
paper shape with small pen/pencil writing gesture,
clean professional design, subtle red line accent,
white background, vector style, 64x64px
```

**11. 核心定位图标**
```
A minimalist target/bullseye icon for "core positioning", 
red and black color scheme,
concentric circles with center dot,
dynamic perspective suggesting focus and precision,
white background, vector style, 64x64px
```

**12. 核心卖点图标**
```
A minimalist lightbulb icon for "key selling points", 
red and black color scheme,
stylized bulb shape with energy rays,
subtle spiral/storm influence in light emission,
white background, vector style, 64x64px
```

**13. 关键时间点图标**
```
A minimalist stopwatch/timer icon for "key timestamps", 
red and black color scheme,
circular clock face with highlighted marker,
clean professional design, red accent on time indicator,
white background, vector style, 64x64px
```

**14. 注意事项图标**
```
A minimalist warning triangle icon for "cautions", 
red and black color scheme,
equilateral triangle with exclamation mark,
bold professional design with strong red fill,
white background, vector style, 64x64px
```

**15. 视频图标**
```
A minimalist film/clapperboard icon for "video content", 
red and black color scheme,
clapperboard shape with play button overlay,
dynamic diagonal stripes suggesting motion,
white background, vector style, 64x64px
```

**16. 确认交付图标**
```
A minimalist rocket launch icon for "confirm delivery", 
red and black color scheme,
stylized rocket with upward trajectory,
dynamic motion lines suggesting launch energy,
white background, vector style, 64x64px
```

**17. 撤回修改图标**
```
A minimalist undo/return arrow icon for "withdraw", 
red and black color scheme,
curved arrow pointing backward/left,
clean reversing motion design,
white background, vector style, 64x64px
```

**18. AI提取图标**
```
A minimalist robot/AI face icon for "AI extracted", 
red and black color scheme,
simplified robot head with friendly expression,
subtle tech/digital aesthetic,
white background, vector style, 64x64px
```

**19. 剪辑修改图标**
```
A minimalist pencil/edit icon for "editor modified", 
red and black color scheme,
stylized pencil at dynamic angle with edit line,
clean professional design suggesting revision,
subtle red accent on pencil tip,
white background, vector style, 64x64px
```

**20. 已确认图标**
```
A minimalist checkmark icon for "confirmed", 
red and black color scheme,
bold checkmark inside circle,
clean decisive design with strong stroke,
main checkmark in vibrant red,
white background, vector style, 64x64px
```

**21. 视频上传图标**
```
A minimalist video camera with upload arrow for "video upload", 
red and black color scheme,
camera silhouette with upward arrow overlay,
dynamic composition suggesting upload action,
subtle red accent on arrow,
white background, vector style, 64x64px
```

**22. 效率趋势图标**
```
A minimalist line chart with upward trend for "efficiency analytics", 
red and black color scheme,
ascending line graph with arrow pointing up,
dynamic energy suggesting improvement,
main trend line in red,
white background, vector style, 64x64px
```

**23. 关联发现图标**
```
A minimalist chain link icon for "connection discovery", 
red and black color scheme,
two interlocking chain links,
clean geometric professional design,
subtle red highlight on connection point,
white background, vector style, 64x64px
```

**24. 经验复用图标**
```
A minimalist book with recycle arrow for "experience reuse", 
red and black color scheme,
open book shape with circular arrow overlay,
clean design suggesting knowledge recycling,
subtle red accent on arrow,
white background, vector style, 64x64px
```

**25. 智能提醒图标**
```
A minimalist lightning bolt icon for "smart reminder", 
red and black color scheme,
stylized lightning with notification dot,
dynamic energy design,
main bolt in vibrant red,
white background, vector style, 64x64px
```

**26. 语义搜索图标**
```
A minimalist magnifying glass icon for "semantic search", 
red and black color scheme,
magnifying glass with text/document inside lens,
clean professional search design,
subtle red accent on handle,
white background, vector style, 64x64px
```

**27. 刷新数据图标**
```
A minimalist circular refresh arrow for "refresh data", 
red and black color scheme,
two curved arrows forming circle,
dynamic rotation motion design,
subtle red gradient on arrows,
white background, vector style, 64x64px
```

**28. 关于/信息图标**
```
A minimalist info "i" icon for "about information", 
red and black color scheme,
lowercase i inside circle,
clean professional design,
main circle outline in red,
white background, vector style, 64x64px
```

---

### 14.4 生图使用建议

1. **统一尺寸**：建议生成 64x64px 或 128x128px 方形图标
2. **配色一致**：主色使用接近影视飓风红 #E53935，辅助黑 #1A1A1A
3. **线条风格**：2-3px 线宽，边角可适度圆角
4. **输出格式**：PNG 带透明背景，或 SVG 矢量格式
5. **替换方式**：将生成的图标保存到 `icon/` 文件夹，然后在 CSS 中用 `background-image` 或 `<img>` 标签引用

---

## 十五、后端API集成

### 15.1 技术架构

```
┌────────────────┐      ┌──────────────────┐      ┌────────────────────┐
│   前端页面      │ ──→  │  Vercel Function  │ ──→  │  火山引擎视频API   │
│  (upload.html)  │      │  (/api/analyze)   │      │  (doubao-vision)   │
└────────────────┘      └──────────────────┘      └────────────────────┘
```

### 15.2 API文件结构

```
api/
└── analyze.js    # Vercel Serverless Function
```

### 15.3 API功能说明

**接口**：`POST /api/analyze`

**请求参数**：
```json
{
    "videoUrl": "https://example.com/video.mp4",
    "apiKey": "用户配置的火山引擎API Key"
}
```

**返回格式**：
```json
{
    "success": true,
    "result": {
        "corePosition": "核心定位",
        "sellingPoints": ["卖点1", "卖点2"],
        "timestamps": [{"time": "00:30", "content": "描述"}],
        "cautions": ["注意事项"],
        "summary": "AI总结"
    }
}
```

### 15.4 视频URL限制

| 来源 | 可用性 | 说明 |
|------|--------|------|
| 腾讯云COS | ✅ | 需设置公有读 |
| 阿里云OSS | ✅ | 需设置公开访问 |
| 自建服务器 | ✅ | 需公网可访问 |
| B站/YouTube | ❌ | 防盗链限制 |
| 微信/抖音 | ❌ | 需登录验证 |

### 15.5 测试视频

公开测试视频URL（佳能C50评测）：
```
https://stormrelay-1335848641.cos.ap-guangzhou.myqcloud.com/硬刚索尼？22999元佳能C50上手 - 1.2025-12-04_佳能C50评测_3840x2160_V05_Bilib(Av115665734338931,P1) (1).mp4
```

### 15.6 部署说明

项目部署在 Vercel 上时，`api/` 文件夹会自动被识别为 Serverless Functions，无需额外配置服务器。
