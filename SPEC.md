# SPECIFICATION: MULTI-BOT SYSTEM, CUSTOM GOAL SCORE & SPECTATOR (OBSERVER) MODE

## 1. Yêu cầu Cốt lõi (Core Requirements)
1. **Tùy chỉnh số lượng BOT tham chiến (Multi-Bot Support):**
   - Cho phép người chơi tự do lựa chọn số lượng đối thủ máy: 1 BOT, 2 BOT, hoặc 3 BOT (tối đa bàn đấu 4 người chơi: P1 + 3 BOT, hoặc toàn bộ 4 BOT tự đấu).
   - Mỗi BOT có tên gọi, avatar linh thú (Cáo Lửa 🦊, Sói Băng 🐺, Gấu Trúc Thần Bí 🐼), màu sắc nhận diện và token riêng biệt trên bàn cờ.
2. **Tùy biến Mục tiêu Cán Đích (Custom Win Target Score):**
   - Thay vì cố định 50 điểm, người chơi có thể tùy chọn nhanh:
     - ⚡ Tốc Chiến: 30 Điểm (Ván nhanh 2-3 phút)
     - 🎯 Tiêu Chuẩn: 50 Điểm (Ván chuẩn 5-7 phút)
     - 👑 Trường Kỳ: 100 Điểm (Đại chiến gay cấn)
     - ✏️ Nhập số điểm tùy ý (10 - 200 điểm).
   - Thanh tiến độ Race-to-Goal tự động co giãn tỷ lệ phần trăm theo điểm số đã chọn.
3. **Chế độ Khán Giả Quan Sát (Spectator / Auto-Play Observer Mode):**
   - Cho phép người dùng chuyển sang vai trò **Khán Giả (Spectator)**:
     - Toàn bộ ván cờ diễn ra tự động 100% giữa Người chơi mô phỏng hoặc Các BOT với nhau.
     - Người dùng chỉ ngồi theo dõi, thư giãn xem AI thi triển chiến thuật.
     - Có nút điều khiển khán giả: **▶️ Tiếp tục / ⏸️ Tạm dừng**, và **Tốc độ ván cờ (1x Bình thường • 2x Nhanh • 3x Siêu tốc)**.
     - Huy hiệu "CHẾ ĐỘ KHÁN GIẢ ĐANG BẬT 👁️" tỏa sáng.
     - Có thể bấm nút "🎮 Tham Gia Vào Chơi" bất kỳ lúc nào để lấy lại quyền điều khiển P1.

## 2. Kế hoạch Triển khai (Architect -> Builder -> QA)
- **Khâu 1 (Architect):** Lập đặc tả SPEC.md chi tiết.
- **Khâu 2 (Builder):**
  - Mở rộng cấu trúc dữ liệu người chơi trong `index.html` từ 2 người thành đa người chơi linh hoạt (`players: [{ id: 1, name, isBot, score, pos, color, icon }]`).
  - Nâng cấp **Unified Match Console**: Thêm dropdown/pill chọn số BOT (1-3 BOT), chọn Mục Tiêu Thắng (30 / 50 / 100 / Tùy chỉnh), và nút bật tắt "👁️ Khán Giả (Spectator)".
  - Triển khai vòng lặp tự động (Auto-play game loop) cho chế độ quan sát với bộ điều tốc (Speed 1x, 2x, 3x).
  - Nâng cấp Bento HUD bên phải: Hiển thị bảng đối đầu đa người chơi, thanh đua điểm đa sắc màu, và thanh điều khiển khán giả.
  - Cập nhật bản sao ngoại tuyến trong Downloads và commit lên nhánh `feat/ui`.
- **Khâu 3 (QA):**
  - Kiểm thử chơi 1 BOT, 2 BOT, 3 BOT.
  - Kiểm thử đổi điểm thắng (30đ, 75đ, 100đ).
  - Kiểm thử chế độ Khán Giả (Tự động gieo xúc xắc, tạm dừng, đổi tốc độ).
  - Xác thực GitHub Pages build thành công 100%.
