// ========================================
// Vercel Serverless Function
// 调用火山引擎视频理解API
// ========================================

export default async function handler(req, res) {
    // 只允许POST请求
    if (req.method !== 'POST') {
        return res.status(405).json({ error: '只支持POST请求' });
    }

    // 设置CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const { videoUrl, fileId, prompt, apiKey } = req.body;

        // 验证参数
        if (!videoUrl && !fileId) {
            return res.status(400).json({ error: '缺少视频URL或文件ID' });
        }
        if (!apiKey) {
            return res.status(400).json({ error: '缺少API Key' });
        }

        // 构建提示词（包含时序感知和字幕提取）
        const analysisPrompt = prompt || `你是一个专业的视频内容分析助手。请仔细观看这个视频，分析视频时序和内容，然后提取以下信息：

1. 核心定位：用一句话概括视频的核心信息、目标受众和主要价值
2. 核心卖点：列出3-5个关键卖点或亮点
3. 关键时间点：【重要】请根据视频时序，列出5-8个精彩片段的具体时间点（格式如"01:30"），包括：
   - 开场/hook片段
   - 核心产品/功能展示时刻
   - 精彩演示或对比画面
   - 适合做封面或短视频的高光时刻
   - 总结/结尾片段
4. 注意事项/风险点：列出可能引发争议、需要说明或运营需注意的内容风险点
5. 内容总结：用2-3句话概括视频的主要内容和价值
6. 字幕转录：【重要】请根据视频中的语音，提取关键段落的字幕内容，每段包含时间点和对应的台词/旁白

【重要】你必须严格按照以下JSON格式返回，不要有任何其他文字、解释或markdown标记：
{
    "corePosition": "一句话核心定位，说明视频主题、目标受众和核心价值",
    "sellingPoints": ["卖点1", "卖点2", "卖点3", "卖点4"],
    "timestamps": [
        {"time": "00:00", "content": "开场"},
        {"time": "01:30", "content": "精彩片段描述"}
    ],
    "cautions": ["注意事项1", "注意事项2"],
    "summary": "视频内容总结，包含主题、亮点和整体评价",
    "transcript": [
        {"time": "00:00", "text": "大家好，欢迎来到..."},
        {"time": "00:30", "text": "今天我们来聊聊..."},
        {"time": "01:00", "text": "这款产品的特点是..."}
    ]
}`;

        console.log('准备调用火山引擎API，视频URL:', videoUrl, '文件ID:', fileId);
        
        // 构建视频内容（支持URL和file_id两种方式）
        let videoContent;
        if (fileId) {
            // 使用文件ID方式（通过Files API上传的文件）
            videoContent = {
                type: 'input_video',
                file_id: fileId
            };
        } else {
            // 使用URL方式
            videoContent = {
                type: 'input_video',
                video_url: videoUrl,
                fps: 1
            };
        }
        
        // 调用火山引擎API（使用 /api/v3/responses 端点 + input 格式）
        // 参考官方文档：https://www.volcengine.com/docs/82379/1895586
        const requestBody = {
            model: 'doubao-seed-1-6-251015',
            input: [
                {
                    role: 'user',
                    content: [
                        videoContent,
                        {
                            type: 'input_text',
                            text: analysisPrompt
                        }
                    ]
                }
            ]
        };
        
        console.log('请求体:', JSON.stringify(requestBody, null, 2));
        
        const response = await fetch('https://ark.cn-beijing.volces.com/api/v3/responses', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        console.log('火山引擎API响应状态:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('火山引擎API错误:', response.status, errorText);
            return res.status(200).json({ 
                success: false,
                error: `火山引擎API调用失败: ${response.status}`,
                detail: errorText,
                hint: response.status === 401 ? '请检查API Key是否正确' : 
                      response.status === 400 ? '请检查视频URL是否有效' :
                      response.status === 413 ? '视频文件过大' : '请检查网络连接'
            });
        }

        const data = await response.json();
        console.log('火山引擎API返回数据:', JSON.stringify(data, null, 2));
        
        // 提取AI回复（兼容不同的响应格式）
        let aiContent = '';
        
        // Responses API 格式: data.output[].content[].text
        if (data.output && Array.isArray(data.output)) {
            for (const outputItem of data.output) {
                if (outputItem.content && Array.isArray(outputItem.content)) {
                    for (const contentItem of outputItem.content) {
                        if (contentItem.type === 'output_text' && contentItem.text) {
                            aiContent += contentItem.text;
                        } else if (contentItem.text) {
                            aiContent += contentItem.text;
                        }
                    }
                } else if (typeof outputItem.content === 'string') {
                    aiContent += outputItem.content;
                }
            }
        }
        // Chat API 格式: data.choices[].message.content
        else if (data.choices?.[0]?.message?.content) {
            aiContent = data.choices[0].message.content;
        }
        // 兜底
        else {
            aiContent = JSON.stringify(data);
        }
        
        console.log('提取的AI内容:', aiContent);
        
        // 尝试解析JSON（AI可能返回带markdown的JSON）
        let parsedResult = null;
        try {
            // 移除可能的markdown代码块标记
            const jsonStr = aiContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            parsedResult = JSON.parse(jsonStr);
        } catch (e) {
            // 解析失败，返回原始文本
            parsedResult = {
                raw: aiContent,
                parseError: true
            };
        }

        return res.status(200).json({
            success: true,
            result: parsedResult,
            rawContent: aiContent
        });

    } catch (error) {
        console.error('服务器错误:', error);
        return res.status(500).json({ 
            error: '服务器内部错误',
            detail: error.message
        });
    }
}
