"""
自动更新 README.md，插入截图链接
"""

import os
import re

README_PATH = "README.md"
SCREENSHOT_DIR = "docs/screenshots"

# 需要替换的标记和对应的图片路径
REPLACEMENTS = [
    {
        "marker": "[应插图片] 产品界面总览截图\n        展示：左侧边栏 + 主界面项目列表",
        "image": "docs/screenshots/01_project_list.png",
        "alt": "产品界面总览"
    },
    {
        "marker": "[应插图片] AI标注卡片截图\n        展示：核心定位、卖点、时间点、注意事项四个信息卡",
        "image": "docs/screenshots/02_ai_cards.png",
        "alt": "AI标注卡片"
    },
    {
        "marker": "[应插图片] 剪辑视角操作截图\n        展示：勾选确认、编辑标注、添加补充的交互",
        "image": "docs/screenshots/03_editor_view.png",
        "alt": "剪辑视角操作"
    },
    {
        "marker": "[应插图片] 运营视角截图\n        展示：只读模式下的信息卡片、笔记区域",
        "image": "docs/screenshots/04_operator_view.png",
        "alt": "运营视角"
    },
    {
        "marker": "[应插图片] 效率分析页截图\n        展示：折线图、数据表格、效率总结",
        "image": "docs/screenshots/05_analytics.png",
        "alt": "效率分析页"
    }
]

def check_screenshots_exist():
    """检查截图是否存在"""
    print("🔍 检查截图文件...")
    missing = []

    for item in REPLACEMENTS:
        if not os.path.exists(item["image"]):
            missing.append(item["image"])

    if missing:
        print("❌ 缺少以下截图文件：")
        for file in missing:
            print(f"   - {file}")
        print("\n💡 请先完成截图，可以参考 screenshot_guide.html")
        return False

    print("✅ 所有截图文件都已存在")
    return True

def update_readme():
    """更新 README"""
    if not check_screenshots_exist():
        return

    print("\n📝 开始更新 README.md...")

    with open(README_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    # 执行替换
    for item in REPLACEMENTS:
        # 构建替换文本
        replacement = f"""<!--
{item['marker']}
-->

![{item['alt']}]({item['image']})"""

        # 检查标记是否存在
        if item['marker'] in content:
            content = content.replace(item['marker'], replacement)
            print(f"✅ 已插入: {item['alt']}")
        else:
            print(f"⚠️  未找到标记: {item['alt']}")

    # 保存更新后的内容
    with open(README_PATH, 'w', encoding='utf-8') as f:
        f.write(content)

    print("\n✅ README.md 已更新完成！")
    print("\n💡 预览更改：")
    print("   git diff README.md")
    print("\n💡 提交更改：")
    print("   git add README.md")
    print("   git commit -m 'Add screenshots to README'")
    print("   git push")

if __name__ == "__main__":
    update_readme()
