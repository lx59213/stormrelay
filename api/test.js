// 测试API端点 - 用于验证Vercel Function是否正常工作
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    return res.status(200).json({
        success: true,
        message: 'API正常工作',
        time: new Date().toISOString(),
        method: req.method,
        query: req.query
    });
}
