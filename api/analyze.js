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
        const { videoUrl, prompt, apiKey } = req.body;

        // 验证参数
        if (!videoUrl) {
            return res.status(400).json({ error: '缺少视频URL' });
        }
        if (!apiKey) {
            return res.status(400).json({ error: '缺少API Key' });
        }

        // 构建提示词
        const analysisPrompt = prompt || `请分析这个视频，提取以下信息：

1. 【核心定位】用一句话概括视频的核心信息和目标受众
2. 【核心卖点】列出3-5个关键卖点
3. 【关键时间点】列出适合截取短视频或封面的精彩片段时间点
4. 【注意事项】列出可能引发争议或需要说明的风险点

请用JSON格式返回，格式如下：
{
    "corePosition": "核心定位内容",
    "sellingPoints": ["卖点1", "卖点2", "卖点3"],
    "timestamps": [{"time": "00:30", "content": "描述"}],
    "cautions": ["注意事项1", "注意事项2"],
    "summary": "视频内容总结"
}`;

        console.log('准备调用火山引擎API，视频URL:', videoUrl);
        
        // 调用火山引擎API（使用 /api/v3/responses 端点 + input 格式）
        // 参考官方文档：https://www.volcengine.com/docs/82379/1895586
        const requestBody = {
            model: 'doubao-seed-1-6-251015',
            input: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'input_video',
                            video_url: videoUrl,
                            fps: 1
                        },
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
        
        // 提取AI回复（兼容不同的响应格式）
        let aiContent = '';
        if (data.choices?.[0]?.message?.content) {
            // chat/completions 格式
            aiContent = data.choices[0].message.content;
        } else if (data.output?.[0]?.content) {
            // responses 格式
            aiContent = data.output[0].content.map(c => c.text || '').join('\n');
        } else if (data.output) {
            // 其他格式
            aiContent = typeof data.output === 'string' ? data.output : JSON.stringify(data.output);
        } else {
            aiContent = JSON.stringify(data);
        }
        
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
