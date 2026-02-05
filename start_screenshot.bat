@echo off
chcp 65001 >nul
echo ========================================
echo   StormBridge 截图助手
echo ========================================
echo.
echo [1] 正在打开截图导航页面...
start screenshot_guide.html
timeout /t 2 >nul
echo.
echo ✅ 浏览器已打开！
echo.
echo 📋 接下来的步骤：
echo    1. 按照页面提示，逐个打开链接
echo    2. 使用 Win+Shift+S 截图
echo    3. 保存到 docs/screenshots/ 文件夹
echo    4. 使用对应的文件名
echo.
echo [2] 完成所有截图后，回到这里
echo.
set /p ready="截图完成了吗？(Y/N): "

if /i "%ready%"=="Y" (
    echo.
    echo [3] 正在更新 README...
    echo.
    python update_readme.py
    echo.
    echo ========================================
    echo   完成！查看更新后的 README.md
    echo ========================================
    echo.
    echo 提交更改：
    echo   git add .
    echo   git commit -m "Add screenshots to README"
    echo   git push
) else (
    echo.
    echo 没问题，完成截图后运行:
    echo   python update_readme.py
)

echo.
pause
