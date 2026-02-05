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

// 获取所有项目
function getAllProjects() {
    const data = localStorage.getItem(PROJECTS_KEY);
    if (!data) {
        initAllProjectsData();
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
    initAllProjectsData();
}

// ========================================
// Toast提示
// ========================================
function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
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
// 初始化
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // 确保数据存在
    if (!localStorage.getItem(PROJECTS_KEY)) {
        initAllProjectsData();
    }
});
