@echo off
cd /d "%~dp0"
chcp 65001 >nul
title Cau Hinh Git Tu Dong Khong Bao Gio Ket Vim
echo ========================================================
echo    ⚙️ CẤU HÌNH GIT TỰ ĐỘNG (AUTO REBASE + CHỐNG KẸT VIM)
echo ========================================================
echo.

echo Đang cấu hình Git tối ưu cho Antigravity làm việc nhóm...

:: 1. Tự động dùng rebase khi pull
git config pull.rebase true

:: 2. Tự động cất code đang viết dở (auto-stash) khi kéo code mới về, không bao giờ bị báo lỗi dirty tree
git config rebase.autoStash true

:: 3. Chặn tuyệt đối không cho Git bật bảng đen Vim khi gộp code
git config core.editor true

:: 4. Cấu hình tự động kết nối nhánh
git config push.autoSetupRemote true

echo.
echo ========================================================
echo    ✅ HOÀN TẤT! TỪ NAY GIT SẼ CHẠY TỰ ĐỘNG 100%:
echo    - Không bao giờ bị kẹt màn hình đen Vim
echo    - Tự động cất và khôi phục code khi kéo về
echo    - Tự động rebase mượt mà không xung đột nhánh
echo ========================================================
pause
