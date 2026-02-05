"""
简化版演示视频生成器
使用 Playwright（更稳定）+ 本地TTS
"""

import asyncio
import os
from playwright.async_api import async_playwright
import subprocess

# ==================== 配置 ====================
BASE_URL = "https://stormrelay.vercel.app"
OUTPUT_DIR = "screenshots"

os.makedirs(OUTPUT_DIR, exist_ok=True)

# ==================== 演示场景 ====================
SCENES = [
    {
        "name": "首页概览",
        "url": f"{BASE_URL}/index.html",
        "delay": 2000,
        "desc": "展示项目列表页"
    },
    {
        "name": "项目详情",
        "url": f"{BASE_URL}/project.html",
        "delay": 3000,
        "desc": "展示AI信息卡"
    },
    {
        "name": "数据分析",
        "url": f"{BASE_URL}/analytics.html",
        "delay": 2000,
        "desc": "展示效率数据"
    },
    {
        "name": "知识图谱",
        "url": f"{BASE_URL}/knowledge.html",
        "delay": 2000,
        "desc": "展示知识关联"
    },
    {
        "name": "AI配置",
        "url": f"{BASE_URL}/settings.html",
        "delay": 2000,
        "desc": "展示设置页面"
    }
]

async def capture_screenshots():
    """自动截图"""
    print("🚀 开始自动截图...")

    async with async_playwright() as p:
        # 启动浏览器
        browser = await p.chromium.launch(
            headless=True,  # 无头模式
            args=['--window-size=1920,1080']
        )

        page = await browser.new_page()
        await page.set_viewport_size({"width": 1920, "height": 1080})

        for i, scene in enumerate(SCENES, 1):
            print(f"\n[{i}/{len(SCENES)}] 截图: {scene['name']}")

            # 访问页面
            await page.goto(scene['url'])

            # 等待加载
            await page.wait_for_timeout(scene['delay'])

            # 滚动一下，确保内容加载
            await page.evaluate("window.scrollTo(0, 300)")
            await page.wait_for_timeout(1000)

            # 截图
            filename = f"{OUTPUT_DIR}/{i:02d}_{scene['name']}.png"
            await page.screenshot(path=filename, full_page=False)

            print(f"✅ 保存: {filename}")

        await browser.close()
        print(f"\n🎉 截图完成！共 {len(SCENES)} 张")

def create_video():
    """提示用户如何制作视频"""
    print("\n" + "="*50)
    print("📸 截图已完成！接下来制作视频：")
    print("="*50)
    print("\n【方案1】使用剪映（最简单）")
    print("1. 打开剪映")
    print("2. 导入所有截图到 'screenshots' 文件夹")
    print("3. 添加到时间轴，每张图片设置 3-5 秒")
    print("4. 添加转场效果（可选）")
    print("5. 添加背景音乐或录制解说")
    print("6. 导出视频\n")

    print("【方案2】使用 PowerPoint")
    print("1. 新建PPT，设置页面比例为 16:9")
    print("2. 插入所有截图")
    print("3. 设置每页自动切换时间（3-5秒）")
    print("4. 使用PPT的 '录制幻灯片演示' 功能")
    print("5. 导出为 MP4 视频\n")

    print("【方案3】使用FFmpeg（需要命令行）")
    print(f'ffmpeg -framerate 1 -i screenshots/%02d_*.png -c:v libx264 -pix_fmt yuv420p demo.mp4\n')

    print("="*50)

if __name__ == "__main__":
    # 运行截图
    asyncio.run(capture_screenshots())

    # 显示后续步骤
    create_video()
