# SPECIFICATION: PRODUCTION-GRADE IMMERSIVE GAMING UI (HIDE TECHNICAL & DEV INTERNALS)

## 1. Mục tiêu Cốt lõi
- **Ẩn toàn bộ các thông tin nhạy cảm / kỹ thuật nội bộ (Sanitize Production Web UI):**
  - Loại bỏ hoàn toàn các thuật ngữ dev, tên cơ sở dữ liệu (`Firebase`, `Cloud Firestore`, `Firestore Synced`), link nhánh Git (`Nhánh feat/ui GitHub`), thông số build/phiên bản (`v3.3.0-AdminPortal`), và nút Admin lộ thiên khỏi mắt người dùng công chúng.
  - Chuyển đổi ngôn ngữ hiển thị sang chuẩn **Web Game Thương Mại Đẳng Cấp**:
    - Header: `Grandmaster Board Club • Trực Tuyến`
    - Sub-header: `Trạng Thái: Trực Tuyến 🟢`
    - Footer: Chân trang chuẩn thương mại gồm 4 cột (Giới thiệu, Chế độ chơi, Tài khoản kỳ thủ, Hỗ trợ & Điều khoản).
    - Modal Đăng nhập / Hồ sơ: Ẩn box cấu hình JSON Firebase, thay thế bằng giao diện đăng ký tài khoản kỳ thủ tự nhiên.
- **Bảo toàn 4 Cổng Bí Mật (Secret Portals) dành riêng cho Quản Trị Viên:**
  1. Triple-Click Logo Vương Miện.
  2. Phím tắt `Ctrl + Shift + A`.
  3. URL Hash `#admin`.
  4. Triple-Click ký tự `©` ở chân trang.
- **Bảo toàn 100% Logic Cũ & Typography:** Giữ trọn vẹn game Xúc xắc 12 ô, Ca-rô Neon 3x3, Firebase Auth ngầm, font Playfair Display & Be Vietnam Pro.

## 2. Acceptance Criteria (Tiêu chuẩn Nghiệm thu)
- [ ] Footer không còn bất kỳ đường link nào về: Admin, Nhánh feat/ui GitHub, Phiên bản nội bộ v3.3.0, hay tên cơ sở dữ liệu Firebase.
- [ ] Chân trang được cấu trúc 4 cột chuyên nghiệp, sang trọng, mang phong cách cổng game thượng hạng.
- [ ] Thanh Header và Sub-header không còn các nhãn kỹ thuật lộ thiên (`Firebase Live`, `Firestore Sync`).
- [ ] 4 Cổng Bí Mật (Logo Triple-click, Hotkey `Ctrl+Shift+A`, `#admin`, Footer `©`) vẫn hoạt động hoàn hảo 100%.
- [ ] Thực hiện commit và push thành công lên nhánh `feat/ui`.
