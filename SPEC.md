# SPECIFICATION: CYBER TABLETOP BOARD GAME VIBE & SECRET ADMIN PORTAL

## 1. Mục tiêu Cốt lõi
- **Ẩn hoàn toàn nút Quản Trị lộ thiên:** Loại bỏ nút "Quản Trị [ADMIN]" màu đỏ trên thanh Navigation và Footer công khai, trả lại không gian đấu trường cờ bàn tinh tế, thuần khiết cho người chơi thông thường.
- **Thiết lập 4 Cổng Bí Mật (Secret Portals) dành riêng cho Quản Trị Viên:**
  1. **Secret 1 (Cú nhấp Hoàng Gia - Easter Egg Click):** Nhấp 3 lần liên tiếp vào biểu tượng **Vương Miện Logo** ("TABLETOP ARENA" ở góc trên trái).
  2. **Secret 2 (Phím tắt Thần Bí - Hotkey):** Nhấn tổ hợp phím `Ctrl + Shift + A` (hoặc `Alt + Shift + A`) tại bất kỳ vị trí nào trên màn hình.
  3. **Secret 3 (Đường dẫn Mật mã - URL Hash/Query):** Truy cập hoặc đổi URL thành `#admin` (hoặc `?secret=admin`).
  4. **Secret 4 (Cú nhấp Bản quyền Footer):** Nhấp 3 lần vào biểu tượng `©` ở chân trang.
- Khi kích hoạt cổng bí mật:
  - Phát hiệu ứng âm thanh bí mật (Secret Chime - Web Audio synth).
  - Tự động hiển thị Modal Đại Sảnh Quản Trị (`adminModal`) với màn hình xác thực Passcode (`admin123`).
- Bảo toàn 100% các tính năng Quản trị (Tổng quan, Quản lý kỳ thủ, Cân bằng bàn cờ, Audit logs) và chỉ đẩy commit lên nhánh `feat/ui`.

## 2. Design Tokens & Vibe
- Thanh Navbar trở về trạng thái gọn gàng, thanh lịch, sang trọng.
- Modal Quản trị viên giữ trọn vẹn phong cách Bento Grid Dark Glassmorphism, font Playfair Display & Be Vietnam Pro.

## 3. Acceptance Criteria (Tiêu chuẩn Nghiệm thu)
- [ ] Nút Quản Trị đỏ không còn hiển thị lộ thiên trên thanh Navigation.
- [ ] Nhấp 3 lần liên tiếp vào Logo Vương Miện kích hoạt mở cổng Admin (kèm hiệu ứng âm thanh bí mật).
- [ ] Nhấn phím tắt `Ctrl + Shift + A` mở cổng Admin ngay lập tức.
- [ ] Thêm hash `#admin` trên URL kích hoạt mở cổng Admin.
- [ ] Nhấp 3 lần vào `©` chân trang kích hoạt mở cổng Admin.
- [ ] Vẫn giữ nguyên đầy đủ các chức năng quản trị viên đã lập trình trước đó.
- [ ] Thực hiện commit và push thành công lên nhánh `feat/ui`.
