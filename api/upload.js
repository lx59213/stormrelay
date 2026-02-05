// ========================================
// Vercel Serverless Function
// 上传视频到火山引擎 Files API
// ========================================

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '512mb'
        }
    }
};

export default async function handler(req, res) {
    // 设置CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: '只支持POST请求' });
    }

    try {
        const { apiKey, fileBase64, fileName, mimeType } = req.body;

        if (!apiKey) {
            return res.status(400).json({ error: '缺少API Key' });
        }
        if (!fileBase64) {
            return res.status(400).json({ error: '缺少文件数据' });
        }

        console.log('开始上传文件到火山引擎:', fileName);

        // 将Base64转换为Buffer
        const fileBuffer = Buffer.from(fileBase64, 'base64');
        
        // 创建FormData
        const FormData = (await import('form-data')).default;
        const formData = new FormData();
        formData.append('purpose', 'user_data');
        formData.append('file', fileBuffer, {
            filename: fileName || 'video.mp4',
            contentType: mimeType || 'video/mp4'
        });
        formData.append('preprocess_configs[video][fps]', '0.5');

        // 上传到火山引擎 Files API
        const response = await fetch('https://ark.cn-beijing.volces.com/api/v3/files', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                ...formData.getHeaders()
            },
            body: formData
        });

        console.log('Files API 响应状态:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Files API 错误:', errorText);
            return res.status(200).json({
                success: false,
                error: `文件上传失败: ${response.status}`,
                detail: errorText
            });
        }

        const data = await response.json();
        console.log('文件上传成功:', data);

        return res.status(200).json({
            success: true,
            fileId: data.id,
            fileName: data.filename,
            status: data.status
        });

    } catch (error) {
        console.error('上传错误:', error);
        return res.status(500).json({
            error: '服务器内部错误',
            detail: error.message
        });
    }
}
