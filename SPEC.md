# SPECIFICATION: CYBER TABLETOP BOARD GAME VIBE & ADMIN MANAGEMENT PORTAL

## 1. Mục tiêu Cốt lõi
- **Giao diện Quản Trị Viên Toàn Diện (Grandmaster Admin Portal):**
  - Cung cấp bảng điều khiển trung tâm dành cho Quản trị viên (Admin) để quản lý toàn bộ hệ sinh thái game.
  - **4 Phân hệ chức năng chính:**
    1. **📊 Tổng Quan Hệ Thống (Analytics & KPIs):** Thống kê số lượng kỳ thủ, tổng số trận đấu, lượng Xu/Gems lưu hành, trạng thái đồng bộ Firebase & độ trễ thời gian thực.
    2. **👥 Quản Lý Kỳ Thủ (Player Management):** Danh sách người dùng, tìm kiếm & lọc theo vai trò, thao tác tặng Xu/Kim cương, thăng cấp VIP/Admin, khóa/mở khóa tài khoản (Ban/Unban).
    3. **⚙️ Cân Bằng Bàn Cờ & Kinh Tế (Game Balancer & Rules):** Tùy chỉnh điểm cán đích (30 - 100 điểm), điểm số các ô đặc biệt (Kho báu, Chìa khóa, Hố đen, Ngôi sao), phần thưởng Xu chiến thắng và công tắc chế độ Bảo trì Đấu trường.
    4. **📜 Nhật Ký Hoạt Động (Live Audit Logs):** Giám sát theo thời gian thực các sự kiện đăng ký, giao dịch, trận đấu và thao tác quản trị.
  - Phân quyền an toàn: Truy cập qua nút Quản Trị trên Nav Bar hoặc Profile với bảo mật xác thực (Passcode mặc định: `admin123` hoặc tài khoản có role `Admin`).
- **Bảo toàn 100% Typography tiếng Việt:** Tiếp tục áp dụng chuẩn font Playfair Display & Be Vietnam Pro, không vỡ font, không lỗi dấu.
- **Bảo toàn 100% Logic Cũ:** Toàn bộ trò chơi Xúc xắc 12 ô, Ca-rô Neon 3x3, Firebase Auth/Firestore và chỉ đẩy code lên nhánh `feat/ui`.

## 2. Design Tokens Admin Portal
- **Phong cách:** Royal Dark Glassmorphism kết hợp Luxury Boardgame (Bento Grid hiện đại, viền vàng kim `#D97706`, nền nỉ xanh đen `#0A0F1D`).
- **Typography:**
  - Tiêu đề modal & bảng: `'Playfair Display', 'Cinzel', Georgia, serif` (100% tiếng Việt).
  - Bảng dữ liệu, nhãn & nút bấm: `'Be Vietnam Pro', system-ui, sans-serif`.
  - Chỉ số số liệu, ELO, mã UID: `'JetBrains Mono', monospace`.
- **Hiệu ứng:** Spring Press mượt mà, Badge trạng thái phát sáng (Active: Emerald, VIP: Amber, Admin: Indigo, Banned: Rose).

## 3. Kiến trúc Dữ liệu & State Quản Trị
- **Cấu hình Bàn Cờ (`adminGameConfig`):**
  - `targetScore`: Điểm số cán đích (mặc định 50).
  - `tileRewards`: Điểm cộng/trừ của các ô sự kiện (Ngôi sao, Kho báu, Chìa khóa, Hố đen).
  - `winCoinReward`: Số Xu thưởng khi chiến thắng.
  - `isMaintenance`: Trạng thái bảo trì game.
- **Danh sách Kỳ thủ Quản trị (`adminPlayersList`):**
  - Mảng dữ liệu người chơi thật từ Firestore + Kỳ thủ mẫu tiêu biểu.
  - Các hàm điều phối: `adminAddCoins(uid, amount)`, `adminSetRole(uid, role)`, `adminToggleBan(uid)`.

## 4. Acceptance Criteria (Tiêu chuẩn Nghiệm thu)
- [ ] Có nút mở **Đại Sảnh Quản Trị (Admin Portal)** rõ ràng trên thanh Navigation và Menu Tài khoản.
- [ ] Hỗ trợ xác thực mở quyền Admin nhanh chóng (Passcode hoặc tài khoản Admin) để người dùng dễ dàng kiểm thử ngay.
- [ ] Phân hệ **Tổng Quan (KPIs):** Hiển thị 4 thẻ số liệu thống kê sinh động kèm tỷ lệ thắng cờ bàn.
- [ ] Phân hệ **Quản Lý Kỳ Thủ:** Bảng danh sách kỳ thủ với tính năng tìm kiếm, xem UID/ELO, cộng Xu/Gem, đổi role và Ban/Unban hoạt động tức thì.
- [ ] Phân hệ **Cân Bằng Bàn Cờ:** Form chỉnh sửa điểm mục tiêu, phần thưởng các ô và lưu trực tiếp vào luật chơi đang chạy.
- [ ] Phân hệ **Nhật Ký (Audit Logs):** Bảng feed hiển thị các hành động đăng nhập, ván cờ, thao tác admin.
- [ ] Giữ nguyên 100% bộ font Playfair Display & Be Vietnam Pro không lỗi tiếng Việt.
- [ ] Toàn bộ code được commit và đẩy trực tiếp lên nhánh `feat/ui`.
