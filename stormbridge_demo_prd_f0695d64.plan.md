# StormRelay · 飓风接力 完整 PRD

---

## 一、产品概述

### 1.1 产品定位

**产品名：StormRelay / 飓风接力**

**一句话定义：**

> **一条视频完成后，上游（剪辑师）写不出详细的交接信息，下游（运营/电商/营销）看不过来。AI 做两头的翻译——帮上游把脑子里的东西结构化输出，帮下游在看视频之前先有张地图。**

**核心价值：**

- **降低上游填写成本**：把「写文档」降级为「确认AI草稿」——认知模式切换由AI完成
- **提升下游消费效率**：不是不看视频，是看之前先知道重点在哪——带着地图看
- **信息质量兜底**：AI不会偷懒省略"注意事项"，比纯人工填写更完整

**产品类型：**
内部效率工具原型（实际落地可嵌入飞书生态）

**技术栈：**
多页面 HTML + CSS + JS + Vercel Serverless + 火山引擎视频理解 API（豆包大模型）

---

### 1.2 产品能力矩阵

| 能力维度 | 本项目如何体现 |
| ------- | ------------- |
| **场景洞察** | 还原了频道+电商两条管线的协作流程，识别出"视频→多下游"的结构性信息流问题 |
| **UI/UX 设计** | 独立完成 Linear 风格多页面原型设计，包含信息架构、交互流程、权限控制、响应式布局 |
| **轻量级工程落地** | 用原生 HTML/CSS/JS + Vercel Serverless 搭建了可交互原型，集成真实的火山引擎视频理解API |
| **数据驱动** | 设计了完整的 OKR 框架和效率数据看板，定义了关键度量指标 |
| **低代码/快速验证** | 快速原型验证 → 实际落地可迁移到飞书低代码平台 |

**效率预估（需在真实场景中验证）：**

| 环节 | 当前状态 | 使用工具后（预估）| 核心逻辑 |
| ---- | ------- | --------------- | ------- |
| 剪辑师交接 | 不填/敷衍填两行 | AI草稿+2分钟确认 | 从「写」降级为「审」|
| 运营理解视频 | 必须完整看一遍 | 先看地图，再带着重点看 | 有方向 vs 盲看 |
| 跨角色追问 | 反复在飞书里@问 | 结构化信息卡自查 | 信息在卡片里，不在人脑里 |

> **注意**：以上为基于认知科学逻辑的预估，非实测数据。实际效果需要埋点跟踪验证。

---

### 1.3 核心洞察

> 从剪辑师、编导、摄影师、硬件产品营销、市场营销等多个角色的协作关系中，可以看到一个结构性的信息流问题：
>
> 一条频道视频完成后，它的信息要同时流向多个下游——频道运营写分发文案、电商编导做对齐的短视频、硬件产品营销提达人brief、市场营销做投放策略。**每个角色需要的信息切片不同，但源头是同一个20分钟的视频。**
>
> 问题出在两头：**上游写不出来，下游看不过来。**
>
> 上游的问题是认知模式切换。剪辑师刚从创意模式（节奏、色彩、情绪）出来，让他写结构化的交接文档，成本极高。这不是个别现象——创作者被要求写营销向的卖点文案时普遍有同感：卖点能想到，但用那种词汇去写就是写不动。
>
> 下游的问题是视频是线性锁死的信息容器。文档能Ctrl+F，表格能筛选，但视频只能从头看到尾。每多一个下游角色就多一次20分钟的重复消费。
>
> 飞书已经把容器（字段、文档、知识库）做得很好了。但**容器不是瓶颈——填写成本才是。** AI 做的是两头的翻译：帮上游把脑子里的东西结构化输出，帮下游在看视频之前先有张地图。"

### 1.4 竞品定位分析：思维迭代

StormRelay 不是凭空设计的，而是一次认知演进的产物。通过研究行业代表产品，逐步深入到影视飓风的真实问题：

**第一步：洞察够早，但不够深（PicCopilot ↔ BrandRocket）**

| 产品 | 定位 | 核心逻辑 |
| --- | --- | --- |
| **Pic Copilot** | 阿里 AI 电商主图生成 | 商家缺产品实拍图 → AI 一键生成主图，批量跑量测受欢迎度 |
| **BrandRocket** | AI 详情页生成（本人作品，WayToAGI 冠军） | 输入产品信息 → 生成文案/主图/详情页，同类方向，做得早做得快 |

> 这类工具的逻辑是"缺素材 → AI 造素材"。洞察方向对，动手够早，但还停留在 AI 生成的表象。影视飓风不缺素材——继续深挖。

**第二步：认可 AI native，看到客群差异（ChatCut → StormRelay）**

ChatCut 有一点值得认同：它从第一天起就是围绕 AI 设计的——不是先做完基础系统再加 AI，而是 AI native。但目标客群和问题域根本不同：

| 维度 | **ChatCut**（ToC） | **StormRelay**（ToB） |
| --- | --- | --- |
| **用户群** | 个人创作者——不太会剪辑、素材不够多 | 专业内容团队——剪辑能力强、素材充足、可补拍 |
| **核心问题** | 降低剪辑门槛，让不会剪的人也能剪 | 降低多人协作的认知切换成本，让理解跨角色传递 |
| **AI 角色** | AI 代替用户完成剪辑操作 | AI 做翻译——把创意语言翻译为运营语言、电商语言 |
| **进化机制** | — | Skill 系统：团队经验自动沉淀，系统越用越准 |

> **关键认知转向：从"代替"到"翻译"。** 影视飓风的长板是专业人才和海量高质量素材，短板是多人协作带来的认知切换损耗和集体数据沉淀需求。StormRelay 针对这个短板设计：AI 不替代谁的思考，而是做跨角色的认知翻译，同时建立面向组织与未来的自进化 Skill/Agent 体系。电商管线把已有视频资产转化为电商价值：
>
> - 20 分钟的视频里，哪些片段有电商价值？（素材识别）
> - 视频里的技术语言怎么翻译成消费者语言？（卖点翻译）
> - 下次拍摄应该补充什么镜头？（拍摄建议）

---

### 1.5 已知局限与应对

> **局限一：飞书技术上也能做。** 多维表格加 AI 字段，上传视频，自动填充——技术上没障碍。但「能做」和「有人用」是两码事。飞书解决了容器问题，这个原型探索的是填写成本问题——AI 草稿 + 人确认，比纯人工填写的采纳率高得多。
>
> **局限二：痛点基于推测。** 「创作者不愿写文档」是一个跨行业的普遍现象，但具体到影视飓风的剪辑师交接流程是否如此，需要实际验证。如果不存在，这个思路可以迁移到其他内容团队的协作场景。
>
> **局限三：这是一个原型，不是成品。** 它的价值在于方法论的展示——发现痛点、设计方案、快速原型、真实 API 集成、设计度量体系。实际落地需要嵌入团队现有工作流（如飞书生态），并根据真实反馈迭代。

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

## 九、OKR 与度量体系

### 9.1 核心 OKR（首期3个月）

**O1：验证"AI草稿+人确认"模式能让交接信息真正被填完**

| KR | 衡量方式 | 目标值 |
|----|---------|-------|
| AI草稿采纳率（确认 vs 删除） | 统计每个项目中 AI 提取项被确认/编辑/删除的比例 | 确认+编辑 ≥ 70%，纯删除 ≤ 30% |
| 交付完整度 | 每个交付项目是否包含4类信息（定位/卖点/时间点/注意事项） | ≥ 90%的项目4类齐全 |
| 剪辑师交付耗时 | 从AI提取完成到点击"确认交付"的时间差 | 中位数 ≤ 5分钟 |

**O2：验证结构化信息能减少下游的"反复追问"**

| KR | 衡量方式 | 目标值 |
|----|---------|-------|
| 运营追问频次 | 对比使用前后，运营就同一项目向剪辑师追问的消息条数 | 降低 ≥ 50% |
| 运营"信息够用"评分 | 每次交接后运营打分（1-5分）"收到的信息够用吗？" | 平均 ≥ 4分 |
| "注意事项"命中率 | AI提取的风险点中，多少是剪辑师认可的（确认比例） | ≥ 60%（说明AI确实帮人想到了遗漏） |

**O3：工具采纳率（决定是否值得继续投入）**

| KR | 衡量方式 | 目标值 |
|----|---------|-------|
| 主动使用率 | 通过工具交付的项目占比（vs 还是口头/飞书消息交付） | 首月 ≥ 50%，第3月 ≥ 80% |
| 剪辑师NPS | "你愿意继续用这个工具吗？"0-10分 | ≥ 7 |
| 运营NPS | "这个工具帮你节省时间了吗？"0-10分 | ≥ 7 |

### 9.2 度量埋点设计

```
关键埋点:
├── 时间维度
│   ├── AI提取完成时间戳
│   ├── 第一次确认操作时间戳
│   ├── 点击"确认交付"时间戳
│   └── 运营首次打开时间戳
│
├── 行为维度
│   ├── 每个AI提取项的操作（确认/编辑/删除/跳过）
│   ├── 剪辑师手动添加的条目数
│   ├── 运营的笔记条数
│   └── 运营的"信息够用"评分
│
└── 效果维度
    ├── 交付后运营在飞书追问的消息数（需人工统计或飞书API）
    └── 每个项目从交付到上线的时间差
```

### 9.3 迭代判断标准

| 信号 | 判断 | 行动 |
|------|------|------|
| 采纳率>70%，NPS>7 | 方向正确，值得继续 | 进入Phase 2（多角色视图）|
| 采纳率40-70%，NPS 5-7 | 方向对但体验有问题 | 优化AI提示词和交互细节 |
| 采纳率<40% | 假设可能错了 | 深度用户访谈，重新定位痛点 |
| 剪辑师大量删除AI提取项 | AI准确度不够 | 优化prompt，用确认数据做few-shot微调 |
| 运营追问频次没有明显下降 | 结构化信息不够用 | 增加信息维度或改善卡片设计 |

---

## 十、迭代路线图

### Phase 1（当前 MVP）：核心回路验证

**目标**：验证"AI草稿+人确认"是否比"纯人工填写"的信息质量更高

```
AI看视频 → 生成4类结构化信息 → 剪辑师2分钟确认 → 运营带着地图看视频
```

- 单一场景：频道视频 → 频道运营
- 关键产出：采纳率数据、NPS数据、追问频次对比
- 成功标准：剪辑师愿意用（NPS≥7），运营觉得有帮助（追问减少50%）

### Phase 2：多角色视图

**目标**：验证同一AI提取能否同时服务多个下游角色

同一个视频的AI提取结果，为不同角色提供定制化视图：

| 角色 | 看到什么 | 额外AI能力 |
|------|---------|-----------|
| 频道运营 | 卖点+时间点+注意事项 | AI生成各平台文案草稿（B站/抖音/小红书） |
| 电商编导 | 产品评价立场+措辞基调 | 一致性检查：电商文案是否与频道评测矛盾 |
| 硬件产品营销 | 技术参数→营销语言翻译 | AI生成达人合作brief草稿 |
| 市场营销 | 核心传播点+用户画像 | AI建议投放策略和平台选择 |

- 关键验证：多角色定制化是否减少了组织整体"重复看视频"的次数
- 成功标准：≥3个角色使用，人均"看视频理解内容"时间减少30%+

### Phase 3：飞书生态集成

**目标**：从独立原型迁移到飞书生态，提升采纳率

- 封装为飞书应用/机器人/低代码轻应用
- 飞书项目状态到"交付"节点时自动触发AI提取
- 结果回写到多维表格对应字段
- 通知自动推送到对应下游角色
- 关键验证：嵌入现有工作流后采纳率是否高于独立工具
- 成功标准：采纳率从Phase 1的50%→90%+

### Phase 4（Vision）：知识图谱与跨视频智能

**目标**：从单视频交接扩展到组织级内容智能，基于 GraphRAG 构建跨视频知识网络

- **知识图谱构建**：以产品、人物、话题、风险点为实体，自动构建跨视频关联图谱
- 产品实体追踪："佳能C50在所有视频中的评价汇总"
- 内容一致性检查："电商短视频文案与频道评测是否矛盾"
- 历史经验推荐：基于图谱关联的"上次类似产品的注意事项有哪些"
- 语义搜索：跨项目搜索相关内容，如"所有提到性价比的视频"
- 观众反馈闭环：弹幕/评论语义分析 → 反哺下一期选题

> **Phase 4 为愿景层**，展示产品的长期演化方向和知识图谱的应用潜力。

---

## 十一、产品演示脚本

### 演示流程（5分钟版本）

**第1幕：问题定义（40秒）**

> 展示：项目列表页
>
> 内容团队存在一个结构性的信息流问题：一条频道视频完成后，信息要流向运营、电商编导、硬件产品营销、市场营销——每个角色需要的信息切片不同，但视频只能从头看到尾。上游了解一切但写不出来——刚从创意模式出来，写结构化文档太痛苦。下游每多一个角色就多一次20分钟的重复消费。

**第2幕：AI 结构化提取（1分钟）**

> 展示：点进佳能C50项目 → 剪辑视角 → 信息卡片
>
> AI 分析完视频后，自动提取四类结构化信息：核心定位、关键卖点、时间点、注意事项。注意：AI 捕捉到"无机身防抖"并标为中风险，建议简介里说明——这是人容易遗漏但 AI 不会忽略的点。

**第3幕：从"写"到"审"（1分钟）**

> 展示：勾选确认几个卡片 → 编辑一个卖点 → 添加一条补充
>
> 剪辑师不需要写任何东西——只需要扫一眼确认"对不对"。不准就改，遗漏就加。全程2分钟，认知负荷从"写文档"降级为"确认文档"。点击确认交付。

**第4幕：运营视角（40秒）**

> 展示：切换到运营视角
>
> 运营看到的是结构化的信息卡——核心定位、卖点、时间点、注意事项一目了然。不是不看视频——是看之前先有张地图，知道重点在哪里。

**第5幕：价值总结（1分钟）**

> 展示：效率数据看板 → 回到全景
>
> 这个原型验证的产品假设：当 AI 替创作者完成认知模式切换后，交接信息的质量和完整度是否会提升。飞书技术上也能实现——实际落地可以是飞书生态内的模块。但**做什么比用什么做重要**——洞察先行，技术方案可替换。

### 演示节奏要点

1. **宁可讲透3个功能**，不要6个功能都过一遍
2. **在"注意事项"卡片上停顿**——AI帮人想到了遗漏，这是最直观的价值点
3. **坦诚飞书也能做**——诚实 > 花哨
4. **以 OKR 结尾**——展示"怎么度量效果"的闭环思维

---

## 十二、常见质疑与应对

### 12.1 "这个问题不存在 / 我们已有成熟流程"

即使有流程，AI 能否让流程更高效是值得验证的。核心验证点：剪辑师确认信息从"填表"变成"勾选"，时间从 5 分钟变成 2 分钟；AI 可以提取人容易遗漏的点（如注意事项）。

### 12.2 "飞书能做"

能做。多维表格加 AI 字段，视频理解用的也是字节自己的模型，技术上没障碍。区别在于：飞书解决的是"信息放在哪"（容器），这个原型探索的是"怎么降低填写成本"（认知门槛）。在多维表格加字段不等于有人认真填——AI 草稿 + 人确认，本质上是把"写"降级为"审"。这个模式可以嵌入飞书生态——比如做成项目交付节点的自动触发动作。

### 12.3 "AI 不准怎么办"

AI 提取只是起点，人类确认才是关键。工具的设计是"AI 建议 + 人类决策"，不是"AI 替代人"。所有的确认数据都会沉淀，未来可以用来微调 AI 模型。

---

---

## 十三、效率分析模块设计

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

## 十四、待确认事项（已全部完成）

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

## 十五、彩蛋设计

### 13.1 HKRR原则（影视飓风内容评判标准）

在 `settings.html` 的提示词模板中植入了影视飓风的HKRR原则：

```
【HKRR原则】— 影视飓风内容评判标准：
- Happiness（快乐）：利用幽默的开场白或轻松的语言风格，营造愉悦的观看氛围
- Knowledge（知识）：在内容中传达核心信息、原理解析或实用的解决方法
- Resonance（共鸣）：描述观众熟悉的场景或情感，让观众产生"这也是我"的感觉
- Rhythm（节奏）：通过画面切换、剪辑速度和音乐配合，保持观众的注意力
```

**彩蛋位置**：AI配置 → 提示词模板 → 核心定位

**设计意图**：体现对影视飓风内容理念的深度理解

### 13.2 品牌视觉整合

- **Logo**：使用影视飓风官方Logo（红黑螺旋图案）
- **产品名**：飓风接力（StormRelay）
- **Slogan**：无限进步（影视飓风的品牌口号）
- **出现位置**：所有页面左上角侧边栏

### 13.3 致敬链接

在设置页"关于"区块中添加了 `🌀 致敬HKRR原则` 标签

---

## 十六、图标清单与Nano Banana Pro生图提示词

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

## 十七、后端API集成

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
