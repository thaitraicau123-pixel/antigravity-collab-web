@echo off
chcp 65001 >nul
title Antigravity DuoHub - Tu Dong Dong Bo Git
echo ========================================================
echo    🔄 ANTIGRAVITY DUOHUB - TỰ ĐỘNG ĐỒNG BỘ GIT
echo ========================================================
echo.

echo [1/4] Đang kéo code mới nhất của bạn mình về (git pull)...
git pull --rebase origin main
if %errorlevel% neq 0 (
    echo.
    echo [CẢNH BÁO] Phát hiện có xung đột (Conflict)!
    echo Hãy mở Antigravity lên và bảo: "Antigravity ơi gộp conflict giúp anh nhé".
    pause
    exit /b %errorlevel%
)
echo ✓ Đã cập nhật code mới nhất!
echo.

echo [2/4] Kiểm tra các thay đổi trên máy bạn...
git status --short
echo.

echo [3/4] Đang lưu lại các thay đổi (git commit)...
git add .
git commit -m "feat(collab): auto sync updates [%date% %time%]" >nul 2>&1
echo ✓ Đã lưu code an toàn!
echo.

echo [4/4] Đang đồng bộ và đẩy lên GitHub (git push)...
git pull --rebase origin main
git push origin main
if %errorlevel% neq 0 (
    echo.
    echo [LỖI] Chưa đẩy được lên GitHub. Hãy kiểm tra kết nối mạng hoặc conflict.
    pause
    exit /b %errorlevel%
)

echo.
echo ========================================================
echo    🎉 ĐỒNG BỘ THÀNH CÔNG! CODE ĐÃ AN TOÀN TRÊN GITHUB!
echo ========================================================
echo Bạn của bạn bây giờ có thể kéo code về và làm tiếp.
pause
