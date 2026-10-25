# CẤU HÌNH DỰ ÁN: BOARDGAME ONLINE DUOHUB

Dự án này là nền tảng **Chơi Board Game Online** nhiều người chơi được phát triển song song bởi **2 tài khoản Antigravity**.

---

## 🎮 1. PHÂN CHIA VAI TRÒ (ROLES)

### 👤 TÀI KHOẢN 1: BẠN CỦA ANH (UI/UX Board Game Designer)
- **Khu vực phụ trách**:
  - `index.html`, `css/style.css`.
  - Giao diện bàn cờ (Grid, quân cờ, hiệu ứng nước đi vừa đánh, âm thanh, animation chiến thắng).
  - Giao diện sảnh chờ (Lobby), danh sách phòng chơi, chọn avatar, responsive trên điện thoại.
- **Nguyên tắc**: Không can thiệp sâu vào thuật toán tính điểm và luật cờ trong `js/api.js`.

### 👥 TÀI KHOẢN 2: ANH (Game Logic, Data & Engine Specialist)
- **Khu vực phụ trách**:
  - `js/api.js`, `js/app.js`.
  - Thuật toán luật chơi (kiểm tra 5 quân liên tiếp thắng thua, chặn 2 đầu, tính giờ mỗi lượt).
  - Quản lý trạng thái bàn cờ (Board state matrix, nước đi đi lại undo/redo).
  - Lưu trữ tỉ số thắng thua vào LocalStorage / Firebase / Supabase.
- **Nguyên tắc**: Giữ nguyên cấu trúc thẻ DOM và class giao diện của Bạn 1.

---

## 🛠️ 2. QUY ƯỚC CODE
- Hàm kiểm tra luật chơi trong `js/api.js`: `checkWinCondition(board, lastRow, lastCol, player)`.
- Hàm khởi tạo ván mới: `resetGame()`.
- Hàm lưu lượt đánh: `makeMove(row, col)`.

---

## 🔄 3. QUY TẮC TỰ ĐỘNG ĐỒNG BỘ GIT (AUTO GIT SYNC PROTOCOL - BẮT BUỘC)

Cả 2 tài khoản Antigravity khi nhận bất kỳ yêu cầu nào từ người dùng **BẮT BUỘC** phải tự động chạy quy trình sau để không bao giờ bị đè hoặc mất code của nhau:

### ⚡ BƯỚC 1: TRƯỚC KHI BẮT ĐẦU CODE
- Luôn tự động chạy lệnh kéo code mới nhất của bạn mình về trước:
  ```bash
  git pull --rebase origin main
  ```
- Đảm bảo bạn đang làm việc trên nền code mới nhất đã có cập nhật của đồng đội.

### ⚡ BƯỚC 2: SAU KHI CODE XONG
- Kiểm tra trạng thái: `git status`
- Gom và lưu lại công việc:
  ```bash
  git add .
  git commit -m "<mô tả ngắn gọn tính năng vừa hoàn thành>"
  ```
- Kéo lại lần nữa để kiểm tra xem đồng đội có vừa đẩy code lên trong lúc mình đang làm không:
  ```bash
  git pull --rebase origin main
  ```
- Đẩy code lên GitHub:
  ```bash
  git push origin main
  ```

### ⚡ BƯỚC 3: XỬ LÝ KHI CÓ XUNG ĐỘT (MERGE CONFLICT)
- Nếu lệnh `git pull --rebase` báo có conflict (`<<<<<<< HEAD`):
  - **TUYỆT ĐỐI KHÔNG DÙNG `git push --force`** để đè code.
  - Antigravity phải tự động đọc toàn bộ file bị conflict, giữ lại trọn vẹn cả phần code của bạn mình (UI hoặc Logic) lẫn phần code mình vừa viết để cả 2 tính năng cùng hoạt động.
  - Chạy `git add .`, tiếp tục rebase: `git rebase --continue`, rồi chạy `git push origin main`.
