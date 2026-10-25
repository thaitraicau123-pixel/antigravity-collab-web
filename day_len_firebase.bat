@echo off
chcp 65001 >nul
echo ========================================================
echo 🔥 ANTIGRAVITY - ĐẨY DỰ ÁN LÊN FIREBASE HOSTING
echo ========================================================
echo.
echo Bước 1: Hãy chắc chắn anh đã tạo dự án trên https://console.firebase.google.com
echo.
set /p PROJECT_ID="👉 Nhập Firebase Project ID (ví dụ: caro-boardgame): "

if "%PROJECT_ID%"=="" (
    echo [Lỗi] Anh chưa nhập Project ID!
    pause
    exit /b
)

echo.
echo [1/3] Đang đăng nhập Firebase bằng tài khoản Google...
call npx firebase login

echo.
echo [2/3] Đang chọn dự án %PROJECT_ID%...
call npx firebase use --add %PROJECT_ID%

echo.
echo [3/3] Đang tải lên và xuất bản web (Deploy)...
call npx firebase deploy --only hosting

echo.
echo ========================================================
echo 🎉 ĐÃ ĐẨY LÊN FIREBASE HOSTING THÀNH CÔNG!
echo 👉 Link web chạy online vĩnh viễn của anh:
echo    https://%PROJECT_ID%.web.app
echo ========================================================
pause
