/* ========================================
   StormRelay · 飓风接力
   共享JavaScript - 核心数据管理
   ======================================== */

// ========================================
// 全局配置
// ========================================
const CONFIG = {
    API_KEY: localStorage.getItem('stormrelay_api_key') || '',
    API_ENDPOINT: 'https://ark.cn-beijing.volces.com/api/v3/responses',
    MODEL: 'doubao-seed-1-8-251228'
};

// ========================================
// 项目数据存储
// ========================================
const PROJECTS_KEY = 'stormrelay_projects_v2';
const DATA_VERSION_KEY = 'stormrelay_data_version';
const CURRENT_DATA_VERSION = 4;

// 获取所有项目
function getAllProjects() {
    const data = localStorage.getItem(PROJECTS_KEY);
    const version = parseInt(localStorage.getItem(DATA_VERSION_KEY) || '0');
    
    if (!data || version < CURRENT_DATA_VERSION) {
        initAllProjectsData();
        localStorage.setItem(DATA_VERSION_KEY, String(CURRENT_DATA_VERSION));
        return JSON.parse(localStorage.getItem(PROJECTS_KEY));
    }
    return JSON.parse(data);
}

// 保存所有项目
function saveAllProjects(projects) {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

// 根据ID获取单个项目
function getProjectById(id) {
    const projects = getAllProjects();
    return projects.find(p => p.id === id);
}

// 更新单个项目
function updateProject(projectData) {
    const projects = getAllProjects();
    const index = projects.findIndex(p => p.id === projectData.id);
    if (index >= 0) {
        projects[index] = projectData;
    } else {
        projects.unshift(projectData);
    }
    saveAllProjects(projects);
}

// 更新项目状态
function updateProjectStatus(id, newStatus) {
    const projects = getAllProjects();
    const project = projects.find(p => p.id === id);
    if (project) {
        const now = new Date().toISOString().split('T')[0];
        project.status = newStatus;
        if (newStatus === 'delivered') {
            project.deliveredAt = now;
        } else if (newStatus === 'archived') {
            project.archivedAt = now;
        } else if (newStatus === 'pending') {
            // 撤回时清除交付时间
            project.deliveredAt = null;
            project.archivedAt = null;
        }
        saveAllProjects(projects);
    }
    return project;
}

// ========================================
// 初始化完整的项目数据
// ========================================
function initAllProjectsData() {
    const fullProjects = [
        // ========== 真实项目：零下25度（电商视角演示） ==========
        {
            id: "snow-25-demo",
            title: "零下25度，我和百万设备谁先挂……",
            duration: "17:28",
            status: "delivered",
            createdAt: "2026-02-09",
            deliveredAt: "2026-02-09",
            archivedAt: null,
            isReal: true,
            videoSrc: "./零下25度，我和百万设备谁先挂…… - 1.零下25度，我和百万设备谁先挂……(Av116062414708048,P1).mp4",
            
            corePosition: {
                content: "影视飓风雪地生存100小时直播的幕后技术拆解，展示极寒环境下的设备选型、信号传输方案和制片流程。",
                status: "confirmed"
            },
            
            sellingPoints: [
                { id: 1, content: "零下30度极寒环境全设备实测，消费级设备40分钟全灭", status: "confirmed", source: "tech", sourceNote: "自研测试方案" },
                { id: 2, content: "自研保温衣采用3M科技棉+急救毯内衬，潮湿状态仍保温", status: "confirmed", source: "self", sourceNote: "STORMCREW 出品" },
                { id: 3, content: "iPhone 17 Pro + Snap滤镜系统零下30度手机直出电影感", status: "confirmed", source: "self", sourceNote: "STORMCREW 出品" },
                { id: 4, content: "ST2110标准+双路48芯光纤实现1.3公里雪地信号传输", status: "ai", source: "tech", sourceNote: "自研传输方案" },
                { id: 5, content: "舒尔DL4无振膜麦克风抗低温抗水，极寒音频采集可靠", status: "ai", source: "thirdparty", sourceNote: "舒尔（友商）" },
                { id: 6, content: "全链路数据可视化：气象站+Apple Watch心率实时叠加直播画面", status: "ai", source: "tech", sourceNote: "自研中间件" },
                { id: 7, content: "大疆FlyCart 100运载无人机80kg载重解决极寒物资投送", status: "ai", source: "partner", sourceNote: "大疆合作" }
            ],
            
            timestamps: [
                { id: 1, time: "00:00", seconds: 0, description: "开场：雪地生存项目概述与团队规模", usage: "核心内容", status: "confirmed" },
                { id: 2, time: "00:42", seconds: 42, description: "项目动机：商业合作+1000小时直播远景", usage: "战略背景", status: "confirmed" },
                { id: 3, time: "01:18", seconds: 78, description: "三大难点预告：极寒、传输、制片", usage: "结构导览", status: "ai" },
                { id: 4, time: "01:38", seconds: 98, description: "极寒挑战：所有消费级设备40分钟全灭", usage: "冲突点·封面素材", status: "confirmed" },
                { id: 5, time: "02:50", seconds: 170, description: "POE供电+加热玻璃方案解决设备存活", usage: "技术方案", status: "ai" },
                { id: 6, time: "03:22", seconds: 202, description: "人比设备更脆弱——引出保温衣", usage: "产品引入·电商", status: "confirmed" },
                { id: 7, time: "04:05", seconds: 245, description: "保温衣面料详解：3M科技棉 vs 羽绒", usage: "产品卖点·电商核心", status: "confirmed" },
                { id: 8, time: "04:22", seconds: 262, description: "保温衣售卖讨论：2026年底可能量产", usage: "电商线索", status: "ai" },
                { id: 9, time: "05:05", seconds: 305, description: "【广告】奥迪E5后援保障车介绍", usage: "商业植入·跳过", status: "confirmed" },
                { id: 10, time: "05:56", seconds: 356, description: "传输篇开始：电力保障双发电机方案", usage: "技术深度", status: "ai" },
                { id: 11, time: "06:59", seconds: 419, description: "音频方案：舒尔DL4无振膜麦克风", usage: "技术深度", status: "ai" },
                { id: 12, time: "08:07", seconds: 487, description: "z cam P2R1远程变焦相机新尝试", usage: "技术创新", status: "ai" },
                { id: 13, time: "08:39", seconds: 519, description: "移动机位：iPhone 17 Pro + Snap滤镜系统", usage: "产品卖点·电商", status: "confirmed" },
                { id: 14, time: "09:32", seconds: 572, description: "5G+TVU Anywhere专业直播解决方案", usage: "技术方案", status: "ai" },
                { id: 15, time: "10:01", seconds: 601, description: "ST2110+双路光纤信号传输架构", usage: "技术深度", status: "ai" },
                { id: 16, time: "11:04", seconds: 664, description: "【广告】奥迪E5山路运输能力", usage: "商业植入·跳过", status: "confirmed" },
                { id: 17, time: "11:36", seconds: 696, description: "大疆FlyCart 100运载无人机物资投送", usage: "技术方案", status: "ai" },
                { id: 18, time: "12:26", seconds: 746, description: "制片篇：总制片的复杂协调工作", usage: "团队协作", status: "ai" },
                { id: 19, time: "13:55", seconds: 835, description: "数据可视化：气象站+心率+弹幕投票实时上屏", usage: "技术创新·亮点", status: "ai" },
                { id: 20, time: "15:21", seconds: 921, description: "东北虎预案：讲究幽默是安全暗号", usage: "趣味点·社媒素材", status: "ai" },
                { id: 21, time: "15:51", seconds: 951, description: "神笔马良AI赛制：AI识别画作+实物投送", usage: "赛制创新", status: "ai" },
                { id: 22, time: "17:08", seconds: 1028, description: "结尾总结+致谢", usage: "结尾引用", status: "confirmed" }
            ],
            
            cautions: [
                { id: 1, content: "视频含奥迪E5植入广告（05:05-05:56, 11:04-11:36）", level: "medium", action: "运营发布时注明商业合作，电商素材绕开广告段", status: "confirmed" },
                { id: 2, content: "保温衣尚未正式发售，视频提及2026年底计划", level: "medium", action: "电商文案标注'预售/开发中'，不做确定性承诺", status: "ai" },
                { id: 3, content: "iPhone零下30度不死机可能引发'手机比人耐冻'段子", level: "low", action: "可作为社媒传播点，但不宜过度强调避免品牌风险", status: "ai" },
                { id: 4, content: "舒尔DL4为友商产品，不宜在电商素材中重点推荐", level: "low", action: "技术拆解可提及，电商场景中淡化处理", status: "ai" }
            ],
            
            notes: [
                { id: 1, author: "剪辑师", time: "2月9日", content: "保温衣片段(04:05-04:22)是电商团队最需要的素材，Tim正面半身讲解面料很有说服力。建议电商团队优先处理。" },
                { id: 2, author: "运营", time: "2月9日", content: "Snap滤镜系统在极寒中的表现可以做3C产品主图的场景图。东北虎暗号'讲究幽默'可以做社媒传播。" },
                { id: 3, author: "电商运营", time: "2月10日", content: "保温衣详情页缺竖屏素材，横屏裁切后主体偏移严重。下次拍摄请预留竖屏安全构图。" },
                { id: 4, author: "AI 助手", time: "自动", content: "检测到两段奥迪E5商业植入(05:05-05:56, 11:04-11:36)，已在时间轴标记为【广告·跳过】。电商素材提取已自动绕开。" }
            ],
            
            transcript: [
                { time: "00:00", seconds: 0, text: "如果你能看到这个视频说我们的雪地生存已经结束了，而且结果大概率还不错。所以会有这么个幕后来和你分享一下。" },
                { time: "00:26", seconds: 26, text: "今天我们就一起来看看一个雪地直播100小时的背后是什么样的。" },
                { time: "00:42", seconds: 42, text: "首先为什么要做这样的项目？答案就是两点。第一我们会有商业合作的机会。第二是我们未来真的想做1000小时或者更离谱的这种类型的直播。" },
                { time: "01:18", seconds: 78, text: "这一次我们遇到的难点主要有三个，极寒、传输还有制片，这是三个非常大的坑。" },
                { time: "01:38", seconds: 98, text: "我们发现南方人对零下30度的概念真的是太欠缺了。所有的设备直接就黑了，根本开不了机，所有的线缆都会硬的和钢筋一样。" },
                { time: "02:04", seconds: 124, text: "大部分的相机只能够开机40分钟，然后就全部关机了。坚持最久的是索尼ZVE1，也没有超过1个小时就完全冻透了。" },
                { time: "02:50", seconds: 170, text: "海康威视的监控还有z cam在这样的环境之下给坚持下来了。因为它们没有电池，直接通过POE供电。我们把前面的保护玻璃换成了加热玻璃。" },
                { time: "03:22", seconds: 202, text: "我们这次发现人反而是极寒环境之下更为严峻的问题。零下30度待10个小时，身体里面的温度都会被抽走。所以我们请产品团队缝制了一件比较特殊的衣服来解决这个问题。" },
                { time: "04:05", seconds: 245, text: "保温的材质，我没有选择羽绒，而是用了一种3M的科技棉。因为户外衣服湿是很常见的问题，羽绒会失去大部分保温能力，但科技棉在潮湿状态下还是有一定的保温效果。" },
                { time: "04:22", seconds: 262, text: "你会想问卖不卖？答案就是目前成本还比较高，也许我们可以在2026年的年底冬季的时候把它给生产出来。" },
                { time: "05:05", seconds: 305, text: "好在奥迪对本次的雪地生存项目非常感兴趣，他为我们提供了奥迪E5 sportback作为后援保障车。" },
                { time: "05:56", seconds: 356, text: "我们拉了2台50千伏安的发电机到了导播中心。准备两台就是怕极寒环境之下会出现故障。事实上也确实出现了故障。" },
                { time: "06:35", seconds: 395, text: "还好有两台，保证直播没有断掉。所有的机柜也都有UPS再来做一层防护。即便发电机失效了，整个系统也不会直接掉线。" },
                { time: "06:59", seconds: 419, text: "音频在真人秀直播里面真的比画面更重要。胸口的麦克风我们用的是舒尔的DL4，它没有用振膜，是通过在芯片上面蚀刻出来的结构来收声，可以抗造、抗水、抗低温。" },
                { time: "08:07", seconds: 487, text: "我们这次还增加了3台z cam的P2R1相机。它集成了变焦镜头还有云台，可以远程控制构图，从36毫米到648毫米都能容纳。" },
                { time: "08:39", seconds: 519, text: "我们这次移动机位从action换成了iPhone 17 Pro，配合我们自己开发的手机壳，Snap滤镜系统就能够保证正常的曝光还有运动模糊。" },
                { time: "09:32", seconds: 572, text: "我们用了5G网络配合TVU Anywhere这个软件，把iPhone变成了一台专业的一体化直播机，它能通过MTP网络给iPhone授时间，保持和专业摄影机的同步性。" },
                { time: "10:01", seconds: 601, text: "生存现场总共架设了28个机位。这些信号汇总后通过ST2110标准和一根48芯的光纤传到总营地。这样的光缆我们铺设了两路，走了两条不同的路线。" },
                { time: "10:32", seconds: 632, text: "我们确实在测试过程中遇到了比较恐怖的情况，就是主光缆不知道怎么被人弄断了。所以野外作业做好备份是特别核心的一点。" },
                { time: "11:04", seconds: 664, text: "奥迪E5执行运输的关键装备，其智能四驱与后轮转向技术配合285毫米胎宽，能进一步提高行驶安全性和稳定性。" },
                { time: "11:36", seconds: 696, text: "物资投送我们采用的是大疆的FlyCart 100运载无人机。它有80公斤的运载能力，满电只能飞十分钟，但电池十分钟就能充满。" },
                { time: "12:26", seconds: 746, text: "制片人这里面的门道稍微有点多。无论是客户商务还是现场政府关系，什么都得来维护。" },
                { time: "12:58", seconds: 778, text: "我们直播的画面可能仅是一个，但背后真正推出去的流至少有六条。横屏和竖屏两个版本，每个版本上有两个独立开窗。" },
                { time: "13:55", seconds: 835, text: "我们抛弃了传统广电的数据库方案，用了全链路外化的解法。气象站抓取气候信息，Apple Watch获取心率，实时上传到接口，导播软件通过网页协议拉进来叠到画面上。" },
                { time: "15:21", seconds: 921, text: "这一次我们发现除了人会突袭，还有东北虎可能出没。所以制片做了东北虎预案：讲究幽默讲究幽默——这就是安全暗号。" },
                { time: "15:51", seconds: 951, text: "这次直播比较有趣的是神笔马良赛制。AI识别画作后团队立刻判断哪里能买到，从现场购买后运载无人机送达。AI作为客观裁判，让神话有了落地的可能。" },
                { time: "17:08", seconds: 1028, text: "以上就是本期节目的全部内容，希望能和你讲得比较全一点。我们幕后遇到的问题还有解决方案。" }
            ],
            
            aiSummary: {
                topic: "雪地生存100小时直播幕后技术拆解",
                core: "极寒环境下的全链路直播解决方案，从设备选型到信号传输到制片协调的完整方法论。",
                highlights: "自研保温衣、Snap滤镜系统极寒表现、ST2110光纤传输、全链路数据可视化、神笔马良AI赛制创新。",
                weaknesses: "含商业植入（奥迪E5），保温衣尚未发售。",
                audience: "技术爱好者、直播从业者、影视制作团队。"
            },
            
            // ===== 电商视角数据 =====
            ecommerceAssets: [
                {
                    id: "ea-001",
                    product: "STORMCREW 极地保温衣",
                    timeStart: "04:05",
                    timeEnd: "04:22",
                    startSeconds: 245,
                    endSeconds: 262,
                    description: "Tim 正面半身讲解自研保温衣面料——3M科技棉替代羽绒，潮湿状态仍保温。背景为雪地营地，穿着状态自然。",
                    thumbnail: null,
                    tags: ["详情页场景图", "短视频切片", "种草文案素材"],
                    source: "self",
                    sourceNote: "STORMCREW 自有产品",
                    translations: [
                        { technical: "3M科技棉，潮湿状态下仍有保温效果", consumer: "雪地生存100小时实测——衣服湿了也不怕冷" },
                        { technical: "急救毯材质内衬，替代传统羽绒方案", consumer: "和极地救援队同款面料，零下30度的最后一道防线" },
                        { technical: "产品团队定制缝制，非量产原型", consumer: "影视飓风自用款，从百万级直播项目中诞生的户外硬核装备" }
                    ],
                    usability: 4,
                    confidence: 0.92,
                    status: "ai"
                },
                {
                    id: "ea-002",
                    product: "Snap Filter 手机滤镜系统",
                    timeStart: "08:39",
                    timeEnd: "09:32",
                    startSeconds: 519,
                    endSeconds: 572,
                    description: "Tim 展示 iPhone 17 Pro 配合自研手机壳和 Snap 滤镜系统，在零下30度环境中实现电影感画面，并快速架设3-4个移动机位。",
                    thumbnail: null,
                    tags: ["产品演示视频", "3C配件主图", "使用场景图", "短视频切片"],
                    source: "self",
                    sourceNote: "STORMCREW 自有产品",
                    translations: [
                        { technical: "Snap滤镜系统保证正常曝光和运动模糊", consumer: "零下30度，手机直出电影感画面" },
                        { technical: "配合自研手机壳可快速架设3-4个移动机位", consumer: "一部手机变专业机位，雪地户外随手拍大片" },
                        { technical: "通过5G+TVU Anywhere实现专业级无线图传", consumer: "告别线缆束缚，手机画面秒传导播间" }
                    ],
                    usability: 3,
                    confidence: 0.85,
                    status: "ai"
                },
                {
                    id: "ea-003",
                    product: "大疆 FlyCart 100 运载无人机",
                    timeStart: "11:36",
                    timeEnd: "12:26",
                    startSeconds: 696,
                    endSeconds: 746,
                    description: "展示大疆FlyCart 100在极寒环境中的物资投送能力，80kg载重，满电飞行10分钟，10分钟充满。",
                    thumbnail: null,
                    tags: ["合作方产品", "使用场景参考"],
                    source: "partner",
                    sourceNote: "大疆合作方",
                    translations: [
                        { technical: "80kg运载能力，满电飞行10分钟", consumer: "雪地物资空投神器——10分钟一趟，不停机高频投送" },
                        { technical: "空调系统控制绳索收缩和挂钩开合", consumer: "精准空投到你面前，不用满雪地找包裹" }
                    ],
                    usability: 2,
                    confidence: 0.78,
                    status: "ai"
                }
            ],
            
            shootingAdvice: {
                summary: {
                    assetCount: 3,
                    totalDuration: "约1分43秒",
                    usabilityRating: "中等偏上",
                    usabilityNote: "自有产品2条可直接用于电商，合作方产品1条需授权标注"
                },
                suggestions: [
                    {
                        id: "sa-001",
                        title: "保温衣：缺少产品细节特写",
                        detail: "面料质感、急救毯内衬反光效果、缝合工艺等细节未有单独镜头。建议下次拍摄时补3-5秒产品细节B-roll，可直接用于详情页。",
                        timeRef: "04:05",
                        seconds: 245,
                        status: "pending"
                    },
                    {
                        id: "sa-002",
                        title: "Snap滤镜：产品本体出镜不足",
                        detail: "视频重点讲了Snap的效果（曝光、运动模糊），但滤镜本体（手机壳+滤镜片）未有正面展示。建议使用前增加2-3秒产品安装过程镜头。",
                        timeRef: "08:39",
                        seconds: 519,
                        status: "pending"
                    },
                    {
                        id: "sa-003",
                        title: "IP人物与产品关联度可以更强",
                        detail: "Tim穿着保温衣但画面以设备讲解为主。建议极端环境测试场景中增加\"人+产品\"构图——例如Tim在暴风雪中拉上保温衣拉链的特写。",
                        timeRef: "03:22",
                        seconds: 202,
                        status: "pending"
                    },
                    {
                        id: "sa-004",
                        title: "电商预留竖屏构图",
                        detail: "频道视频以横屏为主，但电商详情页多为竖屏。建议关键产品镜头多留竖屏安全构图，方便后期裁切不丢失主体。",
                        timeRef: "04:05",
                        seconds: 245,
                        status: "pending"
                    }
                ],
                estimatedValue: {
                    detailPageImages: "2-3张（保温衣场景图 + Snap使用场景图）",
                    shortVideoClips: "1条15秒（保温衣极寒实测切片）",
                    xiaohongshuMaterial: "3-5条（极寒穿搭 / 手机摄影装备 / 户外生存好物）"
                }
            }
        },
        
        // ========== 真实项目：佳能C50 ==========
        {
            id: "c50-real",
            title: "硬刚索尼？22999元佳能C50上手",
            duration: "19:08",
            status: "pending",
            createdAt: "2024-02-05",
            deliveredAt: null,
            archivedAt: null,
            isReal: true,
            // 视频托管在腾讯云COS
            videoSrc: "https://stormrelay-1335848641.cos.ap-guangzhou.myqcloud.com/硬刚索尼？22999元佳能C50上手 - 1.2025-12-04_佳能C50评测_3840x2160_V05_Bilib(Av115665734338931,P1) (1).mp4",
            
            corePosition: {
                content: "面向专业视频创作者的\"回本神器\"，主打性价比和可靠性，适合需要稳定干活的内容团队。",
                status: "ai"
            },
            
            sellingPoints: [
                { id: 1, content: "7K Raw录制 + 16档动态范围，画质表现出色", status: "ai" },
                { id: 2, content: "Open Gate片门全开，支持竖屏裁切适配多平台", status: "ai" },
                { id: 3, content: "CFB+SD存储卡组合，高规格不被卡速限制", status: "ai" },
                { id: 4, content: "直播推流能力强，电商直播的稳定选择", status: "ai" },
                { id: 5, content: "S35模式动态范围更高，副厂镜头也能用", status: "ai" }
            ],
            
            timestamps: [
                { id: 1, time: "00:05", seconds: 5, description: "开场：C系列的可靠性和投资回报率", usage: "核心卖点", status: "ai" },
                { id: 2, time: "00:54", seconds: 54, description: "C50规格介绍：7K Raw、16档动态范围", usage: "参数对比", status: "ai" },
                { id: 3, time: "03:09", seconds: 189, description: "样片展示结束，开始正式评测", usage: "分段点", status: "ai" },
                { id: 4, time: "04:28", seconds: 268, description: "Open Gate 3:2画幅详解", usage: "核心功能", status: "ai" },
                { id: 5, time: "06:39", seconds: 399, description: "4K120帧无裁切的注意事项", usage: "风险提示", status: "ai" },
                { id: 6, time: "08:03", seconds: 483, description: "H265 4K60帧甜点模式", usage: "推荐设置", status: "ai" },
                { id: 7, time: "15:12", seconds: 912, description: "对焦性能和防抖问题", usage: "风险提示", status: "ai" },
                { id: 8, time: "18:08", seconds: 1088, description: "总结和购买建议", usage: "结尾引用", status: "ai" }
            ],
            
            cautions: [
                { id: 1, content: "没有机身防抖，需要搭配稳定器或三脚架", level: "medium", action: "简介中说明\"建议搭配稳定器使用\"", status: "ai" },
                { id: 2, content: "4K120帧模式锐度下降，对焦偶有抽动", level: "medium", action: "强调升格场景建议用7K60帧或4K30帧", status: "ai" },
                { id: 3, content: "屏幕只有2.95寸，菜单字体很小", level: "low", action: "建议外接监视器", status: "ai" },
                { id: 4, content: "提到竞品索尼FX3作为对比", level: "low", action: "发布时注意措辞，避免引发粉丝争议", status: "ai" }
            ],
            
            notes: [
                { id: 1, author: "剪辑师", time: "10分钟前", content: "这期视频核心是讲\"回本神器\"，运营文案要围绕性价比展开。" }
            ],
            
            transcript: [
                { time: "00:05", seconds: 5, text: "佳能C系列我对他的感情非常深，因为我用的第一台专业摄影机就是佳能的C300 mark 2。" },
                { time: "00:15", seconds: 15, text: "这个系列摄影机其实很特别，它没有特别扎眼的参数，但是它就是耐用，非常的可靠。" },
                { time: "00:28", seconds: 28, text: "你买这种C系列的摄影机，你最在意的其实不应该完全是它里面的参数，而是投资回报率。" },
                { time: "00:54", seconds: 54, text: "到了今年，他们推出了这么一台紧凑的小型的电影机C50，拥有着7K的raw的录制能力。" },
                { time: "03:35", seconds: 215, text: "在录制规格之上，佳能C50这次我觉得诚意还是挺足的。紧凑的机身里面塞进了全画幅7K分辨率的传感器。" },
                { time: "04:28", seconds: 268, text: "首先C50它一个很大的卖点就是这个7K30帧的3比2 open gate的画面。" },
                { time: "06:39", seconds: 399, text: "佳能这次4K120帧没有任何的裁切，但是120帧锐度上有个比较明显的下降，对焦也更纠结。" },
                { time: "08:03", seconds: 483, text: "最甜点的肯定还是H265模式之下的全画幅4K60帧的画面。这个格式下的文件体积很小。" },
                { time: "12:54", seconds: 774, text: "这块屏幕虽然可以翻转，触控灵敏，色彩很不错，但这个屏幕只有2.95英寸，挺遗憾的。" },
                { time: "15:30", seconds: 930, text: "另外一个需要注意的点就是C50这次没有机身的防抖结构，佳能的C系列都没有防抖结构。" },
                { time: "18:08", seconds: 1088, text: "讲了这么多，在我看来C50这台相机还是挺有意思的，非常好的填补了佳能电影线这个位置的空白。" }
            ],
            
            aiSummary: {
                topic: "佳能C50电影机深度评测",
                core: "C50是一台为\"干活\"而生的专业摄影机，性价比突出，适合需要稳定回本的内容创作者。",
                highlights: "7K Raw录制、Open Gate片门全开、CFB+SD存储卡组合、直播推流能力。",
                weaknesses: "无机身防抖、屏幕较小(2.95寸)、回放时无LUT监看。",
                audience: "纪录片创作者、直播带货团队、需要快速回本的Vlogger。"
            }
        },
        
        // ========== 虚拟项目：待剪辑确认 ==========
        {
            id: "top5-cameras-004",
            title: "2024年最值得买的5台相机",
            duration: "28:15",
            status: "pending",
            createdAt: "2024-01-28",
            deliveredAt: null,
            archivedAt: null,
            isReal: false,
            videoSrc: null,
            
            corePosition: {
                content: "面向入门摄影爱好者的年度相机选购指南，从性价比角度推荐5款各有特色的相机。",
                status: "ai"
            },
            
            sellingPoints: [
                { id: 1, content: "覆盖5000-30000元价位段，适合不同预算", status: "ai" },
                { id: 2, content: "每款相机配合实拍样片展示", status: "ai" },
                { id: 3, content: "详细对比画质、便携性、操控体验", status: "ai" }
            ],
            
            timestamps: [
                { id: 1, time: "02:30", seconds: 150, description: "富士X-T5介绍", usage: "产品展示", status: "ai" },
                { id: 2, time: "08:45", seconds: 525, description: "索尼A7C2介绍", usage: "产品展示", status: "ai" },
                { id: 3, time: "15:20", seconds: 920, description: "尼康Z6III介绍", usage: "产品展示", status: "ai" },
                { id: 4, time: "22:00", seconds: 1320, description: "总结对比表格", usage: "核心卖点", status: "ai" }
            ],
            
            cautions: [
                { id: 1, content: "品牌排名可能引发粉丝争议", level: "medium", action: "强调\"适合自己的才是最好的\"", status: "ai" },
                { id: 2, content: "多品牌对比容易被指偏心", level: "low", action: "尽量用数据说话，减少主观评价", status: "ai" }
            ],
            
            notes: [],
            transcript: [],
            aiSummary: {
                topic: "2024年度相机选购指南",
                core: "根据不同预算和使用场景，推荐5款各有特色的相机选择。",
                highlights: "覆盖入门到专业，画质对比直观，附带实拍样片。",
                weaknesses: "品牌对比可能引发争议。",
                audience: "计划购买相机的入门到进阶用户。"
            }
        },
        {
            id: "insta360-005",
            title: "Insta360 Ace Pro 运动相机评测",
            duration: "12:45",
            status: "pending",
            createdAt: "2024-01-25",
            deliveredAt: null,
            archivedAt: null,
            isReal: false,
            videoSrc: null,
            
            corePosition: {
                content: "面向运动爱好者和Vlogger的新选择，AI画质增强是最大卖点。",
                status: "ai"
            },
            
            sellingPoints: [
                { id: 1, content: "1/1.3英寸大底，暗光表现出色", status: "ai" },
                { id: 2, content: "AI画质增强，后期省心", status: "ai" },
                { id: 3, content: "翻转屏设计，自拍友好", status: "ai" },
                { id: 4, content: "价格比GoPro更有竞争力", status: "ai" }
            ],
            
            timestamps: [
                { id: 1, time: "01:20", seconds: 80, description: "外观开箱", usage: "封面素材", status: "ai" },
                { id: 2, time: "05:30", seconds: 330, description: "画质对比测试", usage: "核心卖点", status: "ai" },
                { id: 3, time: "09:00", seconds: 540, description: "防抖效果展示", usage: "功能演示", status: "ai" }
            ],
            
            cautions: [
                { id: 1, content: "对比GoPro Hero可能引发争议", level: "low", action: "客观呈现数据，让观众自己判断", status: "ai" }
            ],
            
            notes: [],
            transcript: [],
            aiSummary: {
                topic: "Insta360 Ace Pro运动相机评测",
                core: "国产运动相机的有力竞争者，AI画质增强是杀手锏。",
                highlights: "大底传感器、AI增强、翻转屏、性价比。",
                weaknesses: "生态系统不如GoPro完善。",
                audience: "运动爱好者、旅行Vlogger。"
            }
        },
        
        // ========== 虚拟项目：已交付运营 ==========
        {
            id: "a7c2-review-002",
            title: "索尼A7C2 一个月使用体验",
            duration: "18:32",
            status: "delivered",
            createdAt: "2024-02-03",
            deliveredAt: "2024-02-04",
            archivedAt: null,
            isReal: false,
            videoSrc: null,
            
            corePosition: {
                content: "全画幅便携旗舰，主打轻便与画质兼得，适合经常外出拍摄的内容创作者。",
                status: "confirmed"
            },
            
            sellingPoints: [
                { id: 1, content: "机身小巧，重量仅514g，全画幅最轻之一", status: "confirmed" },
                { id: 2, content: "3300万像素，画质出色，直出色彩讨喜", status: "confirmed" },
                { id: 3, content: "翻转屏适合Vlog拍摄，自拍方便", status: "confirmed" },
                { id: 4, content: "对焦系统升级，眼部追焦更准确", status: "edited" }
            ],
            
            timestamps: [
                { id: 1, time: "02:15", seconds: 135, description: "外观展示与手感体验", usage: "封面素材", status: "confirmed" },
                { id: 2, time: "06:40", seconds: 400, description: "便携性对比A7M4", usage: "核心卖点", status: "confirmed" },
                { id: 3, time: "10:30", seconds: 630, description: "画质样片展示", usage: "核心卖点", status: "confirmed" },
                { id: 4, time: "15:20", seconds: 920, description: "续航测试结果", usage: "风险提示", status: "confirmed" }
            ],
            
            cautions: [
                { id: 1, content: "续航表现一般，约400张左右", level: "medium", action: "建议准备备用电池", status: "confirmed" },
                { id: 2, content: "价格相比A7C一代涨幅较大", level: "low", action: "强调画质和功能升级带来的价值", status: "confirmed" }
            ],
            
            notes: [
                { id: 1, author: "剪辑师", time: "2月4日", content: "重点强调便携性，这是A7C2最大的卖点。" },
                { id: 2, author: "运营", time: "2月4日", content: "小红书重点推便携+画质，B站可以多讲技术参数。" }
            ],
            transcript: [],
            aiSummary: {
                topic: "索尼A7C2一个月使用体验",
                core: "便携与画质的最佳平衡，适合追求轻便的全画幅用户。",
                highlights: "514g机身、3300万像素、翻转屏、出色对焦。",
                weaknesses: "续航一般、价格偏高。",
                audience: "旅行摄影师、Vlogger、追求轻便的摄影爱好者。"
            }
        },
        {
            id: "pocket3-003",
            title: "DJI Osmo Pocket 3 评测",
            duration: "15:20",
            status: "delivered",
            createdAt: "2024-02-01",
            deliveredAt: "2024-02-02",
            archivedAt: null,
            isReal: false,
            videoSrc: null,
            
            corePosition: {
                content: "口袋云台相机的标杆产品，一英寸大底带来画质飞跃，适合日常Vlog记录。",
                status: "confirmed"
            },
            
            sellingPoints: [
                { id: 1, content: "1英寸CMOS，暗光画质大幅提升", status: "confirmed" },
                { id: 2, content: "2英寸旋转屏，竖拍横拍都方便", status: "confirmed" },
                { id: 3, content: "三轴机械增稳，画面稳如狗", status: "confirmed" }
            ],
            
            timestamps: [
                { id: 1, time: "01:00", seconds: 60, description: "开箱和外观", usage: "封面素材", status: "confirmed" },
                { id: 2, time: "04:30", seconds: 270, description: "画质对比Pocket 2", usage: "核心卖点", status: "confirmed" },
                { id: 3, time: "08:15", seconds: 495, description: "稳定性测试", usage: "功能演示", status: "confirmed" }
            ],
            
            cautions: [
                { id: 1, content: "对比GoPro时可能引发争议", level: "low", action: "强调两者定位不同，各有优势", status: "confirmed" }
            ],
            
            notes: [
                { id: 1, author: "剪辑师", time: "2月2日", content: "画质对比部分效果很明显，运营可以重点用。" },
                { id: 2, author: "运营", time: "2月2日", content: "收到，会截取画质对比做短视频。" }
            ],
            transcript: [],
            aiSummary: {
                topic: "DJI Osmo Pocket 3评测",
                core: "口袋云台相机的新标杆，大底带来质变。",
                highlights: "1英寸CMOS、旋转屏、三轴增稳。",
                weaknesses: "价格较贵，续航一般。",
                audience: "日常Vlogger、旅行记录者。"
            }
        },
        
        // ========== 虚拟项目：已上线归档 ==========
        {
            id: "fx3-review-006",
            title: "索尼FX3两年使用心得",
            duration: "22:30",
            status: "archived",
            createdAt: "2024-01-15",
            deliveredAt: "2024-01-16",
            archivedAt: "2024-01-20",
            isReal: false,
            videoSrc: null,
            
            corePosition: {
                content: "专业电影机的入门之选，两年实战检验的可靠伙伴。",
                status: "confirmed"
            },
            
            sellingPoints: [
                { id: 1, content: "电影机画质，相机操控，两全其美", status: "confirmed" },
                { id: 2, content: "S-Cinetone色彩，肤色表现一流", status: "confirmed" },
                { id: 3, content: "全画幅4K120帧，升格能力强", status: "confirmed" },
                { id: 4, content: "两年使用零故障，可靠性极高", status: "confirmed" },
                { id: 5, content: "二手保值率高，投资价值明显", status: "edited" }
            ],
            
            timestamps: [
                { id: 1, time: "03:00", seconds: 180, description: "两年使用感受总结", usage: "核心内容", status: "confirmed" },
                { id: 2, time: "08:20", seconds: 500, description: "画质样片回顾", usage: "视觉展示", status: "confirmed" },
                { id: 3, time: "14:50", seconds: 890, description: "散热问题实测", usage: "风险提示", status: "confirmed" },
                { id: 4, time: "19:30", seconds: 1170, description: "购买建议", usage: "结尾引用", status: "confirmed" }
            ],
            
            cautions: [
                { id: 1, content: "长时间录制有散热问题", level: "medium", action: "建议户外使用或加装散热配件", status: "confirmed" },
                { id: 2, content: "菜单系统复杂，新手上手需时间", level: "low", action: "提供设置推荐或教程链接", status: "confirmed" },
                { id: 3, content: "对比佳能C70可能引发争议", level: "low", action: "客观描述各自优劣", status: "confirmed" }
            ],
            
            notes: [
                { id: 1, author: "剪辑师", time: "1月16日", content: "这期是真心分享，运营可以走情感路线。" },
                { id: 2, author: "运营", time: "1月18日", content: "B站反馈很好，播放量超预期！" }
            ],
            transcript: [],
            aiSummary: {
                topic: "索尼FX3两年使用心得",
                core: "专业与便携的完美平衡，值得长期投资的电影机。",
                highlights: "S-Cinetone色彩、4K120帧、可靠稳定。",
                weaknesses: "散热问题、菜单复杂。",
                audience: "独立电影制作者、专业视频创作者。"
            }
        },
        {
            id: "bmpcc-007",
            title: "BMPCC 6K Pro 电影感测试",
            duration: "16:45",
            status: "archived",
            createdAt: "2024-01-10",
            deliveredAt: "2024-01-11",
            archivedAt: "2024-01-15",
            isReal: false,
            videoSrc: null,
            
            corePosition: {
                content: "纯粹的电影感机器，追求极致画质的创作者之选。",
                status: "confirmed"
            },
            
            sellingPoints: [
                { id: 1, content: "6K超采样到4K，画质无敌", status: "confirmed" },
                { id: 2, content: "12bit BRAW，后期空间巨大", status: "confirmed" },
                { id: 3, content: "价格亲民，同画质最低成本", status: "confirmed" },
                { id: 4, content: "DaVinci Resolve免费送，省一笔软件钱", status: "confirmed" }
            ],
            
            timestamps: [
                { id: 1, time: "02:00", seconds: 120, description: "电影感样片展示", usage: "封面素材", status: "confirmed" },
                { id: 2, time: "06:30", seconds: 390, description: "BRAW工作流介绍", usage: "教程内容", status: "confirmed" },
                { id: 3, time: "12:00", seconds: 720, description: "续航和散热测试", usage: "风险提示", status: "confirmed" }
            ],
            
            cautions: [
                { id: 1, content: "续航极差，必须外接电源", level: "medium", action: "明确告知配件成本", status: "confirmed" },
                { id: 2, content: "画质vs便携的取舍可能引发讨论", level: "low", action: "强调适合特定场景", status: "confirmed" }
            ],
            
            notes: [
                { id: 1, author: "剪辑师", time: "1月11日", content: "样片调色花了很多心思，运营可以多用。" }
            ],
            transcript: [],
            aiSummary: {
                topic: "BMPCC 6K Pro电影感测试",
                core: "追求极致电影感的性价比之选。",
                highlights: "6K画质、BRAW格式、超高性价比。",
                weaknesses: "续航差、体积大、配件多。",
                audience: "短片创作者、电影学生、追求画质的爱好者。"
            }
        },
        {
            id: "lens-guide-008",
            title: "2024镜头选购指南",
            duration: "35:20",
            status: "archived",
            createdAt: "2024-01-05",
            deliveredAt: "2024-01-06",
            archivedAt: "2024-01-10",
            isReal: false,
            videoSrc: null,
            
            corePosition: {
                content: "最全面的镜头选购攻略，帮助新手避坑老手省钱。",
                status: "confirmed"
            },
            
            sellingPoints: [
                { id: 1, content: "覆盖定焦、变焦、特殊镜头三大类", status: "confirmed" },
                { id: 2, content: "原厂vs副厂全面对比", status: "confirmed" },
                { id: 3, content: "不同预算的推荐清单", status: "confirmed" },
                { id: 4, content: "二手镜头购买避坑指南", status: "confirmed" },
                { id: 5, content: "实拍样片展示镜头特性", status: "confirmed" },
                { id: 6, content: "视频和拍照用途的不同选择", status: "edited" },
                { id: 7, content: "未来值得期待的新镜头", status: "edited" },
                { id: 8, content: "常见问题解答", status: "confirmed" }
            ],
            
            timestamps: [
                { id: 1, time: "05:00", seconds: 300, description: "定焦镜头推荐", usage: "产品推荐", status: "confirmed" },
                { id: 2, time: "15:00", seconds: 900, description: "变焦镜头推荐", usage: "产品推荐", status: "confirmed" },
                { id: 3, time: "25:00", seconds: 1500, description: "副厂镜头专区", usage: "性价比推荐", status: "confirmed" },
                { id: 4, time: "32:00", seconds: 1920, description: "购买建议总结", usage: "结尾引用", status: "confirmed" }
            ],
            
            cautions: [
                { id: 1, content: "多品牌镜头对比可能引发争议", level: "low", action: "保持客观，用样片说话", status: "confirmed" }
            ],
            
            notes: [
                { id: 1, author: "剪辑师", time: "1月6日", content: "这期信息量很大，运营可以拆分成系列推送。" },
                { id: 2, author: "运营", time: "1月8日", content: "已经拆分成5条短视频，效果很好！" }
            ],
            transcript: [],
            aiSummary: {
                topic: "2024镜头选购指南",
                core: "最全面的镜头购买攻略，适合各预算段用户。",
                highlights: "全面覆盖、原厂副厂对比、实拍样片、避坑指南。",
                weaknesses: "信息量大，需要多次观看。",
                audience: "所有摄影和视频创作者。"
            }
        }
    ];
    
    saveAllProjects(fullProjects);
}

// ========================================
// 重置数据（用于演示）
// ========================================
function resetAllData() {
    localStorage.removeItem(PROJECTS_KEY);
    localStorage.removeItem(DATA_VERSION_KEY);
    initAllProjectsData();
    localStorage.setItem(DATA_VERSION_KEY, String(CURRENT_DATA_VERSION));
}

// ========================================
// Toast提示
// ========================================
function showToast(message, duration = 3000) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), duration);
}

// ========================================
// 统计数据
// ========================================
function getProjectStats() {
    const projects = getAllProjects();
    const pending = projects.filter(p => p.status === 'pending');
    const delivered = projects.filter(p => p.status === 'delivered');
    const archived = projects.filter(p => p.status === 'archived');
    
    return {
        total: projects.length,
        pending: pending.length,
        delivered: delivered.length,
        archived: archived.length
    };
}

// ========================================
// 效率数据（用于图表）
// ========================================
function getEfficiencyData() {
    // 模拟每周效率数据
    return [
        { week: '第1周', beforeTime: 35, afterTime: 28, saved: 7 },
        { week: '第2周', beforeTime: 32, afterTime: 18, saved: 14 },
        { week: '第3周', beforeTime: 30, afterTime: 10, saved: 20 },
        { week: '第4周', beforeTime: 30, afterTime: 6, saved: 24 },
        { week: '第5周', beforeTime: 28, afterTime: 5, saved: 23 },
        { week: '当前', beforeTime: 30, afterTime: 5, saved: 25 }
    ];
}

// ========================================
// 侧边栏计数同步（所有页面通用）
// ========================================
function updateSidebarCounts() {
    const stats = getProjectStats();
    document.querySelectorAll('.sidebar-item-count').forEach(el => {
        const parent = el.closest('.sidebar-item');
        if (!parent) return;
        const text = parent.textContent;
        if (text.includes('待剪辑确认')) el.textContent = stats.pending;
        else if (text.includes('已交付运营')) el.textContent = stats.delivered;
        else if (text.includes('已上线归档')) el.textContent = stats.archived;
        // Beta 标签不更新
    });
}

// ========================================
// Skill 沉淀系统（供 knowledge.html 读取）
// ========================================
// Skill = 一套完整打法：什么时候触发 → 怎么做 → 预期结果
// 从项目实操中固化，人可编辑/冻结/删除/导出
const SKILLS_STORAGE_KEY = 'stormrelay_skills';

function getSkills() {
    const stored = localStorage.getItem(SKILLS_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
    const defaults = getDefaultSkills();
    saveSkills(defaults);
    return defaults;
}

function saveSkills(skills) {
    localStorage.setItem(SKILLS_STORAGE_KEY, JSON.stringify(skills));
}

function getDefaultSkills() {
    return [
        {
            id: "skill-001",
            name: "高价值电商素材识别",
            level: "mid",
            frozen: false,
            trigger: "视频中出现 IP人物 + 自有产品 + 极端/反差环境",
            steps: [
                "定位产品出镜时间段（AI 时间轴标记）",
                "提取人物正面半身 + 产品可见的帧作为候选主图",
                "标记出品方为'自有品牌'，优先进入电商素材队列"
            ],
            expected: "产出 2-3 张可用详情页场景图，缩短电商团队选图时间 60%",
            confidence: 0.92,
            appliedCount: 3,
            origin: "human_confirmed",
            evolveLog: [
                { date: "2026-02-09", event: "AI 从零下25度项目提取，初始置信度 0.75", type: "created" },
                { date: "2026-02-09", event: "电商运营确认保温衣片段(ea-001)素材可用", type: "confirmed" },
                { date: "2026-02-10", event: "运营反馈：环境反差越大素材转化率越高，修正触发条件", type: "edited" }
            ],
            sourceProject: "零下25度"
        },
        {
            id: "skill-002",
            name: "技术参数→消费者语言翻译",
            level: "bottom",
            frozen: false,
            trigger: "电商素材卡片中存在技术参数描述（如'3M科技棉'、'ST2110标准'）",
            steps: [
                "识别技术术语和指标数据",
                "生成场景化消费者语言（用结果而非参数：'湿了也暖' 而非 '科技棉'）",
                "保留技术原文作为参考，双栏对照展示"
            ],
            expected: "场景化描述点击率比指标描述高 2.3 倍（基于编辑行为统计）",
            confidence: 0.87,
            appliedCount: 7,
            origin: "ai_discovered",
            evolveLog: [
                { date: "2026-02-09", event: "AI 统计电商运营编辑行为，发现场景化改写被保留概率显著更高", type: "created" },
                { date: "2026-02-10", event: "跨 3 个项目验证，规律成立，升级为底层 Skill", type: "upgraded" }
            ],
            sourceProject: "多项目交叉验证"
        },
        {
            id: "skill-003",
            name: "商业植入段自动规避",
            level: "bottom",
            frozen: false,
            trigger: "视频时间轴中检测到商业植入标记（cautions.level=medium 且含'广告'关键词）",
            steps: [
                "标记植入时间段为'跳过'区域",
                "电商素材提取自动绕开该时间段",
                "若产品出镜与广告段重叠 >50%，降低该素材优先级并标注风险"
            ],
            expected: "避免电商素材与广告内容混淆，降低品牌合规风险",
            confidence: 0.95,
            appliedCount: 2,
            origin: "human_corrected",
            evolveLog: [
                { date: "2026-02-09", event: "AI 初版未区分广告段，电商运营手动标注奥迪E5段为'跳过'", type: "created" },
                { date: "2026-02-10", event: "人工修正：阈值从20秒调整为30秒，避免误伤短口播", type: "edited" }
            ],
            sourceProject: "零下25度 + C50"
        },
        {
            id: "skill-004",
            name: "竖屏安全构图预检",
            level: "surface",
            frozen: false,
            trigger: "电商素材标记为'详情页场景图'或'主图候选'",
            steps: [
                "检测产品出镜段的画面主体位置",
                "若横屏裁切为竖屏后主体偏移 >30%，标记'需裁切注意'",
                "生成拍摄建议：下次预留竖屏安全构图"
            ],
            expected: "减少电商团队返工裁图时间，反向优化拍摄策略",
            confidence: 0.78,
            appliedCount: 1,
            origin: "ai_discovered",
            evolveLog: [
                { date: "2026-02-10", event: "AI 分析拍摄建议采纳率，发现竖屏构图建议被采纳概率最高", type: "created" }
            ],
            sourceProject: "零下25度"
        },
        {
            id: "skill-005",
            name: "友商产品自动降级",
            level: "mid",
            frozen: false,
            trigger: "电商素材的 source 字段为 'thirdparty'（友商产品）",
            steps: [
                "将该素材从推荐队列移至'仅参考'分组",
                "卡片显示灰色友商标签，不出现在默认导出清单中",
                "如需导出须手动勾选确认"
            ],
            expected: "避免在自有电商渠道中错误推荐竞品，保护品牌一致性",
            confidence: 0.91,
            appliedCount: 4,
            origin: "human_corrected",
            evolveLog: [
                { date: "2026-02-09", event: "AI 初版将舒尔DL4推入电商素材队列", type: "created" },
                { date: "2026-02-09", event: "电商运营反馈：友商产品不应进入推荐，修正为自动降级", type: "edited" },
                { date: "2026-02-10", event: "验证大疆FlyCart（合作方）不受影响，规则边界清晰", type: "confirmed" }
            ],
            sourceProject: "零下25度"
        }
    ];
}

// ========================================
// 初始化
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // 版本检测：数据不存在或版本过旧则重新初始化
    const version = parseInt(localStorage.getItem(DATA_VERSION_KEY) || '0');
    if (!localStorage.getItem(PROJECTS_KEY) || version < CURRENT_DATA_VERSION) {
        initAllProjectsData();
        localStorage.setItem(DATA_VERSION_KEY, String(CURRENT_DATA_VERSION));
    }
    updateSidebarCounts();
});
