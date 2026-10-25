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
