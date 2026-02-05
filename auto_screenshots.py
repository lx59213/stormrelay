"""
自动截图并插入到 README
完全自动化，不需要手动操作
"""

import asyncio
import os
import re
from playwright.async_api import async_playwright

# ==================== 配置 ====================
BASE_URL = "https://stormrelay.vercel.app"
SCREENSHOT_DIR = "docs/screenshots"
README_PATH = "README.md"

# 确保目录存在
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

# ==================== 需要截图的场景 ====================
# 对应 README 中标记的 [应插图片/视频] 位置
SCREENSHOTS = [
    {
        "name": "01_project_list",
        "url": f"{BASE_URL}/index.html",
        "readme_marker": "[应插图片] 产品界面总览截图",
        "wait": 2000,
        "description": "展示：左侧边栏 + 主界面项目列表",
        "full_page": False
    },
    {
        "name": "02_ai_cards",
        "url": f"{BASE_URL}/project.html",
        "readme_marker": "[应插图片] AI标注卡片截图",
        "wait": 3000,
        "description": "展示：核心定位、卖点、时间点、注意事项四个信息卡",
        "action": "scroll_to_cards",
        "full_page": False
    },
    {
        "name": "03_editor_view",
        "url": f"{BASE_URL}/project.html",
        "readme_marker": "[应插图片] 剪辑视角操作截图",
        "wait": 2000,
        "description": "展示：勾选确认、编辑标注、添加补充的交互",
        "action": "hover_checkbox",
        "full_page": False
    },
    {
        "name": "04_operator_view",
        "url": f"{BASE_URL}/project.html",
        "readme_marker": "[应插图片] 运营视角截图",
        "wait": 2000,
        "description": "展示：只读模式下的信息卡片、笔记区域",
        "full_page": False
    },
    {
        "name": "05_analytics",
        "url": f"{BASE_URL}/analytics.html",
        "readme_marker": "[应插图片] 效率分析页截图",
        "wait": 2000,
        "description": "展示：折线图、数据表格、效率总结",
        "action": "scroll",
        "full_page": False
    }
]

async def capture_screenshot(page, screenshot):
    """捕获单个截图"""
    print(f"\n📸 正在截图: {screenshot['name']}")

    # 访问页面
    await page.goto(screenshot['url'])
    await page.wait_for_timeout(screenshot['wait'])

    # 执行特定动作
    if screenshot.get('action') == 'scroll':
        await page.evaluate("window.scrollTo(0, 500)")
        await page.wait_for_timeout(500)
    elif screenshot.get('action') == 'scroll_to_cards':
        await page.evaluate("window.scrollTo(0, 800)")
        await page.wait_for_timeout(500)
    elif screenshot.get('action') == 'hover_checkbox':
        await page.evaluate("window.scrollTo(0, 600)")
        await page.wait_for_timeout(500)

    # 截图
    filename = f"{SCREENSHOT_DIR}/{screenshot['name']}.png"
    await page.screenshot(
        path=filename,
        full_page=screenshot.get('full_page', False)
    )

    print(f"✅ 已保存: {filename}")
    return filename

async def main():
    """主流程"""
    print("=" * 60)
    print("🚀 开始自动截图并更新 README")
    print("=" * 60)

    async with async_playwright() as p:
        # 启动浏览器
        browser = await p.chromium.launch(
            headless=True,  # 无头模式
            args=['--window-size=1920,1080']
        )

        page = await browser.new_page()
        await page.set_viewport_size({"width": 1920, "height": 1080})

        # 存储截图路径
        captured = {}

        # 逐个截图
        for i, screenshot in enumerate(SCREENSHOTS, 1):
            print(f"\n[{i}/{len(SCREENSHOTS)}] {screenshot['description']}")
            filename = await capture_screenshot(page, screenshot)
            captured[screenshot['readme_marker']] = filename
            await page.wait_for_timeout(1000)

        await browser.close()

    print("\n" + "=" * 60)
    print("✅ 所有截图完成！")
    print("=" * 60)

    # 生成 README 更新说明
    generate_readme_update_guide(captured)

def generate_readme_update_guide(captured):
    """生成 README 更新指南"""
    print("\n📝 接下来更新 README.md：")
    print("=" * 60)

    guide_file = "UPDATE_README.md"
    with open(guide_file, 'w', encoding='utf-8') as f:
        f.write("# README 更新指南\n\n")
        f.write("## 已生成的截图\n\n")

        for marker, path in captured.items():
            # 转换为相对路径
            rel_path = path.replace('\\', '/')
            f.write(f"### {marker}\n")
            f.write(f"```markdown\n")
            f.write(f"![{marker}]({rel_path})\n")
            f.write(f"```\n\n")

        f.write("## 更新步骤\n\n")
        f.write("1. 打开 README.md\n")
        f.write("2. 找到每个 `[应插图片]` 标记\n")
        f.write("3. 将标记替换为对应的图片链接\n")
        f.write("4. 提交并推送\n\n")

        f.write("---\n\n")
        f.write("## 完整替换示例\n\n")

        # 生成具体的替换代码
        with open(README_PATH, 'r', encoding='utf-8') as readme:
            content = readme.read()

        f.write("### 方法1：手动替换（推荐）\n\n")
        for marker, path in captured.items():
            rel_path = path.replace('\\', '/')
            f.write(f"**找到**：`{marker}`\n")
            f.write(f"**替换为**：\n")
            f.write(f"```markdown\n")
            f.write(f"<!-- \n{marker}\n{captured.get(marker.replace('[应插图片]', '').strip(), '')}\n-->\n\n")
            f.write(f"![{marker}]({rel_path})\n\n```\n\n")

    print(f"✅ 更新指南已生成: {guide_file}")
    print(f"\n💡 下一步：")
    print(f"   1. 打开 {guide_file} 查看详细说明")
    print(f"   2. 按照指南更新 README.md")
    print(f"   3. 或者运行下面的命令自动更新")

    # 生成自动更新脚本
    generate_auto_update_script(captured)

def generate_auto_update_script(captured):
    """生成自动更新 README 的脚本"""
    script_content = '''"""
自动更新 README.md，插入截图
"""

import re

README_PATH = "README.md"

# 图片映射（根据实际截图路径调整）
replacements = [
'''

    for marker, path in captured.items():
        rel_path = path.replace('\\', '/')
        # 提取描述文本
        desc = marker.replace('[应插图片]', '').strip()
        script_content += f'    (\n'
        script_content += f'        "{marker}",\n'
        script_content += f'        <!-- \n{marker}\n展示：{desc}\n-->\n\n![{desc}]({rel_path})\n\n'
        script_content += f'    ),\n'

    script_content += ''']

def update_readme():
    """更新 README"""
    with open(README_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    for marker, replacement in replacements:
        content = content.replace(marker, replacement)

    with open(README_PATH, 'w', encoding='utf-8') as f:
        f.write(content)

    print("✅ README.md 已更新！")

if __name__ == "__main__":
    update_readme()
'''

    with open("update_readme_auto.py", 'w', encoding='utf-8') as f:
        f.write(script_content)

    print(f"\n✅ 自动更新脚本已生成: update_readme_auto.py")
    print(f"   运行 `python update_readme_auto.py` 自动更新 README")

if __name__ == "__main__":
    asyncio.run(main())
