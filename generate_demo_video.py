"""
StormBridge 自动演示视频生成器
自动打开网页、截图、生成语音、合成视频
"""

import os
import time
import json
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from PIL import Image, ImageDraw, ImageFont
import subprocess

# ==================== 配置 ====================
BASE_URL = "https://stormrelay.vercel.app"  # 改为你的在线部署地址
OUTPUT_DIR = "screenshots"
AUDIO_DIR = "audio"
VIDEO_OUTPUT = "stormbridge_demo.mp4"

# 确保输出目录存在
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(AUDIO_DIR, exist_ok=True)

# ==================== 演示脚本 ====================
SCENES = [
    {
        "name": "01_首页",
        "url": f"{BASE_URL}/index.html",
        "wait": 2,
        "duration": 3,
        "voiceover": "欢迎来到飓风接力，这是专为内容团队设计的信息交接工具。让我们快速了解它的核心功能。",
        "action": "scroll"
    },
    {
        "name": "02_项目列表",
        "url": f"{BASE_URL}/index.html",
        "wait": 2,
        "duration": 3,
        "voiceover": "这是项目列表页面，所有内容项目一目了然。你可以看到项目状态、标签和关键信息。",
        "action": "hover_project"
    },
    {
        "name": "03_进入项目",
        "url": f"{BASE_URL}/project.html",
        "wait": 3,
        "duration": 4,
        "voiceover": "点击进入项目详情页，这里是核心工作区。左侧是视频播放器，右侧是AI提取的智能信息卡。",
        "action": "scroll"
    },
    {
        "name": "04_AI信息卡",
        "url": f"{BASE_URL}/project.html",
        "wait": 2,
        "duration": 4,
        "voiceover": "AI自动提取了核心定位、关键卖点、重要时间点和注意事项。剪辑师只需要确认和补充，不用从头写。",
        "action": "scroll_to_cards"
    },
    {
        "name": "05_剪辑确认",
        "url": f"{BASE_URL}/project.html",
        "wait": 2,
        "duration": 3,
        "voiceover": "剪辑师勾选确认关键信息，补充AI遗漏的要点，然后一键交付给运营。",
        "action": "check_items"
    },
    {
        "name": "06_运营视角",
        "url": f"{BASE_URL}/project.html",
        "wait": 2,
        "duration": 3,
        "voiceover": "运营收到项目后，可以快速看到所有关键信息，无需看完整视频就能抓住核心卖点。",
        "action": "view_mode"
    },
    {
        "name": "07_数据分析",
        "url": f"{BASE_URL}/analytics.html",
        "wait": 2,
        "duration": 4,
        "voiceover": "数据分析页面展示团队效率提升情况，包括交接时间对比、项目状态分布和关键词热度。",
        "action": "scroll"
    },
    {
        "name": "08_知识图谱",
        "url": f"{BASE_URL}/knowledge.html",
        "wait": 2,
        "duration": 3,
        "voiceover": "知识图谱功能帮助团队发现项目之间的关联，让经验可以复用。",
        "action": "scroll"
    },
    {
        "name": "09_设置页面",
        "url": f"{BASE_URL}/settings.html",
        "wait": 2,
        "duration": 4,
        "voiceover": "在设置页面，你可以配置AI提示词模板和API密钥，完全自定义分析标准。",
        "action": "scroll"
    },
    {
        "name": "10_总结",
        "url": f"{BASE_URL}/index.html",
        "wait": 2,
        "duration": 4,
        "voiceover": "飓风接力让交接时间从30分钟降到5分钟，关键信息从靠记忆变成有清单。好的工具让团队更专注创造。",
        "action": "scroll"
    }
]

# ==================== 核心功能 ====================

def setup_driver():
    """初始化浏览器驱动"""
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # 无头模式，不显示浏览器窗口
    chrome_options.add_argument("--window-size=1920,1080")
    chrome_options.add_argument("--hide-scrollbars")
    chrome_options.add_argument("--disable-gpu")

    # 如果你的 chromedriver 不在 PATH 中，指定路径
    # service = Service('/path/to/chromedriver')
    # driver = webdriver.Chrome(service=service, options=chrome_options)

    driver = webdriver.Chrome(options=chrome_options)
    return driver

def take_screenshot(driver, scene_name, action=None):
    """截图并执行动作"""
    try:
        # 等待页面加载
        time.sleep(2)

        # 执行动作
        if action == "scroll":
            driver.execute_script("window.scrollTo(0, 500);")
        elif action == "hover_project":
            try:
                project = driver.find_element(By.CSS_SELECTOR, ".project-card")
                driver.execute_script("arguments[0].scrollIntoView();", project)
                time.sleep(1)
            except:
                pass
        elif action == "scroll_to_cards":
            driver.execute_script("window.scrollTo(0, 800);")
        elif action == "check_items":
            try:
                checkboxes = driver.find_elements(By.CSS_SELECTOR, "input[type='checkbox']")
                if checkboxes:
                    driver.execute_script("""
                        arguments[0].scrollIntoView();
                        arguments[0].click();
                    """, checkboxes[0])
            except:
                pass

        time.sleep(1)

        # 截图
        screenshot_path = f"{OUTPUT_DIR}/{scene_name}.png"
        driver.save_screenshot(screenshot_path)
        print(f"✅ 截图完成: {screenshot_path}")
        return screenshot_path

    except Exception as e:
        print(f"❌ 截图失败: {e}")
        return None

def generate_voiceover(text, filename):
    """生成语音文件"""
    try:
        # 使用 edge-tts（需要先安装: pip install edge-tts）
        import edge_tts

        voice = "zh-CN-XiaoxiaoNeural"  # 中文女声
        communicate = edge_tts.Communicate(text, voice)
        await communicate.save(f"{AUDIO_DIR}/{filename}")

        print(f"✅ 语音生成完成: {filename}")
        return f"{AUDIO_DIR}/{filename}"

    except ImportError:
        print("⚠️  edge-tts 未安装，跳过语音生成")
        print("   安装命令: pip install edge-tts")
        return None
    except Exception as e:
        print(f"❌ 语音生成失败: {e}")
        return None

def create_video_with_ffmpeg():
    """使用FFmpeg合成视频"""
    try:
        # 检查FFmpeg是否可用
        subprocess.run(["ffmpeg", "-version"], capture_output=True, check=True)

        # 构建FFmpeg命令
        # 这里简化处理，实际需要根据音频长度调整图片显示时间
        cmd = [
            "ffmpeg",
            "-framerate", "1",  # 每秒1帧
            "-i", f"{OUTPUT_DIR}/%01d_*.png",  # 输入图片
            "-c:v", "libx264",
            "-pix_fmt", "yuv420p",
            "-vf", "scale=1920:1080",
            VIDEO_OUTPUT
        ]

        print("🎬 开始合成视频...")
        subprocess.run(cmd, check=True)
        print(f"✅ 视频生成完成: {VIDEO_OUTPUT}")

    except subprocess.CalledProcessError:
        print("❌ FFmpeg未安装或执行失败")
        print("   安装FFmpeg: https://ffmpeg.org/download.html")
    except Exception as e:
        print(f"❌ 视频合成失败: {e}")

# ==================== 主程序 ====================

def main():
    """主流程"""
    print("🚀 开始生成演示视频...")
    print(f"📍 目标网址: {BASE_URL}\n")

    # 1. 初始化浏览器
    print("📱 初始化浏览器...")
    driver = setup_driver()

    try:
        # 2. 遍历所有场景
        for i, scene in enumerate(SCENES, 1):
            print(f"\n[{i}/{len(SCENES)}] 场景: {scene['name']}")

            # 打开页面
            driver.get(scene['url'])

            # 等待加载
            time.sleep(scene.get('wait', 2))

            # 截图
            take_screenshot(driver, scene['name'], scene.get('action'))

            # 生成语音（如果需要）
            if scene.get('voiceover'):
                audio_file = f"{scene['name']}.mp3"
                generate_voiceover(scene['voiceover'], audio_file)

            time.sleep(1)

        print("\n✅ 所有场景截图完成！")

        # 3. 合成视频
        # create_video_with_ffmpeg()

        print("\n🎉 演示视频素材准备完成！")
        print(f"📁 截图保存位置: {OUTPUT_DIR}/")
        print(f"🎵 音频保存位置: {AUDIO_DIR}/")
        print(f"\n💡 下一步：使用剪映或FFmpeg将图片和音频合成视频")

    except Exception as e:
        print(f"\n❌ 执行出错: {e}")
    finally:
        driver.quit()
        print("\n👋 浏览器已关闭")

if __name__ == "__main__":
    main()
