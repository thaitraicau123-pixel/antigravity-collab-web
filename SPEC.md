# SPECIFICATION: SCIENTIFIC LAYOUT RESTRUCTURING & UNIFIED ARENA DASHBOARD

## 1. Mục tiêu Cốt lõi (Core Vision)
- **Tái cấu trúc bố cục khoa học, hợp lý và tối ưu hóa không gian (Scientific Layout Overhaul):**
  - Khắc phục tình trạng các tính năng bị phân mảnh, rời rạc (Sub-header riêng biệt, chọn chế độ chơi một nơi, chọn đối thủ một nẻo, nút ván mới nằm tách biệt).
  - Tích hợp toàn bộ quyền điều khiển trận đấu vào **Unified Match Console** (Bảng điều khiển tập trung ngay trên đỉnh bàn cờ).
  - Tinh gọn Header: Gộp trạng thái máy chủ `Máy Chủ: Trực Tuyến 🟢` lên thanh điều hướng chính, giải phóng thanh phụ (Sub-header) để tối đa hóa chiều cao bàn cờ.
- **Kiến trúc Tab Đa Tầng Khoa Học (Multi-Tier Tab Architecture):**
  - **Tầng 1 (Main Navigation Tabs trên Header):**
    - `🎮 Bàn Đấu (Arena)`: Khu vực chơi cờ chính (Xúc xắc 12 ô & Ca-rô Neon).
    - `🏆 Bảng Phong Thần (Leaderboard)`: Xem bảng xếp hạng kỳ thủ trực tiếp trong view chuyên sâu.
    - `⚡ Hội Viên VIP (VIP Club)`: Xem quyền lợi và nâng cấp gói thành viên.
    - `📜 Bí Kíp & Luật Chơi (Rules)`: Cẩm nang quy tắc bàn cờ chi tiết.
  - **Tầng 2 (Arena Game Switcher bên trong Bàn Đấu):**
    - `🎲 Cờ Xúc Xắc 12 Ô` | `⭕❌ Cờ Ca-rô Hoàng Gia`.
  - **Tầng 3 (Tactical Intel Tabs bên trong cột HUD tác chiến):**
    - `⚔️ Nhật Ký Trận Đấu` | `💡 Mẹo Chiến Thuật` | `📊 Thống Kê Ván Đấu`.
- **Bố cục 2 Cột Vàng (Golden Ratio Split 65% : 35%):**
  - Cột chính (65%): Bàn cờ thi đấu trung tâm, hiệu ứng nỉ nhung Tabletop sang trọng, khay xúc xắc 3D / lưới ca-rô neon.
  - Cột phụ (35% - Bento HUD): Thẻ đối kháng VS trực quan, thanh tiến độ cán mích 50 điểm (Race to 50 Bar), và Deck thông tin tác chiến đa tab.
- **Bảo toàn 100% Logic & Secret Portals:**
  - Giữ nguyên toàn bộ logic chơi game, AI Bot, tích lũy điểm, xúc xắc, âm thanh Web Audio, Firebase Auth, và 4 Cổng Bí Mật (Logo Triple-click, `Ctrl+Shift+A`, `#admin`, `©` Triple-click).

## 2. Kế hoạch Triển khai (Execution Blueprint)
1. **Khâu 1 (Architect):** Hoàn thiện đặc tả SPEC.md và phân bổ cấu trúc layout.
2. **Khâu 2 (Builder):**
   - Tái cấu trúc DOM HTML trong `index.html`:
     - Nâng cấp Navbar: Thêm active tab indicators cho `Arena`, `Leaderboard`, `VIP`, `Rules`. Gộp Server status lên góc phải.
     - Xây dựng `Unified Match Header` gắn liền với Arena.
     - Thiết kế lại `Cột Tác Chiến (Tactical HUD)` với Versus Battle Card và Race Progress Bar.
     - Triển khai các In-Place Content Views cho Leaderboard, VIP và Rules bên cạnh các Modal cũ.
     - Cập nhật JS điều khiển chuyển Tab mượt mà (`switchMainTab('arena' | 'leaderboard' | 'vip' | 'rules')`).
   - Kiểm tra font chữ tiếng Việt, responsiveness trên màn hình di động và máy tính.
   - Commit & push lên nhánh `feat/ui`.
3. **Khâu 3 (QA):**
   - Kích hoạt và kiểm tra GitHub Pages build.
   - Xác thực các thao tác chuyển tab, chuyển game, đấu bot / 2 người, và 4 Cổng Bí Mật hoạt động chính xác 100%.
