@echo off
chcp 65001 >nul
echo ========================================================
echo 🚀 ANTIGRAVITY DUOHUB - ĐẨY DỰ ÁN LÊN GITHUB
echo ========================================================
echo.
echo Bước 1: Hãy vào https://github.com/new để tạo 1 Repository mới (đặt tên ví dụ: antigravity-collab-web, chọn Private hoặc Public, KHÔNG cần tích tạo README).
echo.
set /p REPO_URL="👉 Dán link Repository của anh vào đây (ví dụ: https://github.com/thaitraicau123-pixel/antigravity-collab-web.git): "

if "%REPO_URL%"=="" (
    echo [Lỗi] Anh chưa nhập link GitHub Repository!
    pause
    exit /b
)

echo.
echo Đang kết nối và đẩy các nhánh lên GitHub...
git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%
git branch -M main

echo [1/3] Đang đẩy nhánh chính (main)...
git push -u origin main

echo [2/3] Đang đẩy nhánh giao diện (feat/ui)...
git push -u origin feat/ui

echo [3/3] Đang đẩy nhánh logic (feat/logic)...
git push -u origin feat/logic

echo.
echo ========================================================
echo 🎉 ĐÃ ĐẨY LÊN GITHUB THÀNH CÔNG!
echo ========================================================
echo Tiếp theo:
echo 1. Vào Settings -> Collaborators trên GitHub để mời bạn của anh vào repo.
echo 2. Gửi link repo cho bạn để bạn mở bằng Antigravity!
echo ========================================================
pause
