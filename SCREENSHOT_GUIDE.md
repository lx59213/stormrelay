# 📸 最简单的截图方案

## 完全自动化，3步搞定！

### 步骤1：打开截图导航页面

双击打开 `screenshot_guide.html` 文件

或者直接在浏览器中打开这个文件

### 步骤2：按顺序截图

页面会列出所有需要截图的页面：

1. **产品界面总览** → 点击"打开页面" → 截图 → 保存为 `docs/screenshots/01_project_list.png`
2. **AI标注卡片** → 点击"打开页面" → 截图 → 保存为 `docs/screenshots/02_ai_cards.png`
3. **剪辑视角操作** → 点击"打开页面" → 截图 → 保存为 `docs/screenshots/03_editor_view.png`
4. **运营视角** → 点击"打开页面" → 截图 → 保存为 `docs/screenshots/04_operator_view.png`
5. **效率分析页** → 点击"打开页面" → 截图 → 保存为 `docs/screenshots/05_analytics.png`

**截图技巧**：
- Windows: 按 `Win + Shift + S` 打开截图工具
- 选择区域截图
- 保存到对应路径

### 步骤3：自动更新 README

所有截图完成后，运行：

```bash
python update_readme.py
```

脚本会自动：
- ✅ 检查所有截图是否存在
- ✅ 将截图插入到 README 的对应位置
- ✅ 替换 `[应插图片]` 标记

### 完成！

查看更新后的 README.md，所有图片都已插入。

然后推送到 GitHub：

```bash
git add .
git commit -m "Add screenshots to README"
git push
```

---

## 🎯 总耗时

- 准备工作：1分钟
- 截图：5分钟
- 运行脚本：10秒
- **总计：不到10分钟！**

---

## ❓ 常见问题

**Q: 截图保存在哪里？**
A: 保存在 `docs/screenshots/` 文件夹，脚本会自动创建。

**Q: 忘记截图文件名怎么办？**
A: 打开 `screenshot_guide.html`，每个链接下方都有对应的文件名提示。

**Q: 可以改变截图大小吗？**
A: 可以，建议宽度 1200-1400px，保持清晰度。

**Q: README 更新后不满意怎么办？**
A: 运行 `git checkout README.md` 恢复，重新截图后再次运行脚本。

---

## 🚀 一键运行（可选）

如果想更省事，创建一个批处理文件 `start_screenshot.bat`：

```batch
@echo off
echo 打开截图导航页面...
start screenshot_guide.html
echo.
echo 请按照页面提示截图
echo.
echo 完成后运行: python update_readme.py
pause
```

双击运行即可！
