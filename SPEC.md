# SPEC.md — Đặc Tả Kỹ Thuật: Thiết Kế Logo Thương Hiệu, Favicon & Tái Thiết Kế Toàn Diện Icon Boardgame Khoa Học Đẳng Cấp

## 1. MỤC TIÊU & PHÂN TÍCH YÊU CẦU
- **Yêu cầu người dùng:**
  1. Thiết kế logo cho trang web này và thiết kế favicon cho trình duyệt (giải quyết ảnh 1 - icon quả cầu xám mặc định).
  2. Thiết kế lại toàn bộ từ icon đến mọi thành phần giao diện sao cho khoa học, đẹp và chuyên nghiệp nhất có thể (theo chuẩn `/thietkeweb` và `/teamworkweb`).
- **Phạm vi tác động:**
  - Dự án: `C:\Users\PV\.gemini\antigravity\scratch\code-collab` (`index.html` và `tabletop-arena-boardgame.html`).
  - Chế độ `/thietkeweb`: **Chế độ 1 (UI/Visual-Only Refine Mode)** kết hợp **Chế độ 2** — Nâng cấp toàn diện bộ nhận diện thị giác, icon SVG độc bản, bố cục Bento Grid, bảng màu Cyber Luxury Gold, **bảo toàn 100% logic trò chơi, state và tính năng multi-bot**.

---

## 2. GIẢI PHÁP THIẾT KẾ CHI TIẾT (ARCHITECTURE & DESIGN)

### 2.1. Thiết kế Logo Thương Hiệu & Favicon Trình Duyệt (Giải Quyết Ảnh 1)
1. **Biểu tượng Logo Độc Bản (`Grandmaster Crown-Hex Shield`)**:
   - Biểu tượng vương miện hoàng gia 5 đỉnh cách điệu lồng ghép khối đa giác xúc xắc Cyber D20 và khiên hộ vệ giải đấu.
   - Sử dụng gradient vàng kim đa tầng: `#FBBF24` (Gold Light) $\to$ `#D97706` (Royal Gold) $\to$ `#78350F` (Dark Bronze).
   - Specular highlight viền ánh kim và halo glow tỏa sáng trên nền tối `#0E1526`.
2. **Favicon SVG động nhúng trực tiếp vào `<head>`**:
   - Thêm `<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,...">` và `<link rel="apple-touch-icon" ...>`.
   - Trình duyệt sẽ hiển thị ngay chiếc vương miện hoàng kim neon sắc nét trên tab, triệt tiêu hoàn toàn icon quả cầu xám mặc định.
3. **Typography Thương hiệu Header**:
   - Font `Cinzel` / `Playfair Display` phối hợp cùng `Be Vietnam Pro`:
     `TABLETOP` (Bạc kim loại sang trọng) + `ARENA` (Vàng kim quang học) + Subtitle `GRANDMASTER BOARD CLUB` font JetBrains Mono mạ vàng.

### 2.2. Thiết kế Bộ Icon SVG Độc Bản Thay Thế 100% Raw Emoji
Thay thế toàn bộ emoji thô sơ bằng hệ thống icon SVG vector tinh xảo chuẩn `viewBox="0 0 24 24"`, nét vẽ `1.75px - 2px`, bo góc quang học và hiệu ứng phát quang theo chủ đề:

| Ô Cờ / Thành phần | Emoji cũ | Icon SVG Mới Thiết Kế | Bảng Màu Glow & Ý Nghĩa |
| :--- | :---: | :--- | :--- |
| **#0 Khởi Hành** | 🚀 | **Cổng Lượng Tử Quantum Rocket** | `#10B981` Emerald Warp |
| **#1 Đá Lam Ngọc** | 💎 | **Kim Cương Faceted Sapphire** | `#06B6D4` Bright Cyan |
| **#2 Hố Đen Sâu** | 💣 | **Bom Từ Trường Graviton Core** | `#F43F5E` Crimson Hazard |
| **#3 Trạm Tiếp Liệu**| ⚡ | **Cột Plasma Energy Spire** | `#38BDF8` Sky Lightning |
| **#4 Kho Báu Cổ** | 👑 | **Vương Miện Cổ Antigravity Relic** | `#F59E0B` Royal Amber |
| **#5 Bão Điện Từ** | 🌩️ | **Lốc Xoáy EMP Storm Vortex** | `#A855F7` Amethyst Lightning |
| **#6 Góc Thiên Hà** | 🌌 | **Vòng Tinh Vân Stellar Gateway** | `#6366F1` Celestial Indigo |
| **#7 Ngôi Sao Sáng**| ⭐ | **Sao Siêu Tân Tinh Supernova 4-Point**| `#FBBF24` Golden Star |
| **#8 Cạm Bẫy Gai** | ⚠️ | **Tam Giác Gai Laser Spike Hazard** | `#F97316` Warning Amber |
| **#9 Rương Hoàng Gia**| 🎁 | **Rương Báu Mạ Vàng Arcane Chest**| `#EC4899` Mythic Ruby/Gold |
| **#10 Cổng Warp** | 🛸 | **Phi Thuyền Warp Cruiser** | `#14B8A6` Nebula Teal |
| **#11 Chìa Khóa Thần**| 🗝️ | **Chìa Khóa Cổ Key of Sovereignty**| `#EAB308` Divine Key |

### 2.3. Hệ Thống Linh Thú Đấu Thủ (Player Avatars)
- **Người chơi 1 (Hiệp Sĩ Lam Ngọc)**: Khiên chiến binh bảo hộ + thanh gươm ánh sáng (`#06B6D4`).
- **Cáo Lửa (BOT 1)**: Mặt cáo thần hỏa diệm ngũ sắc (`#F43F5E`).
- **Sói Băng (BOT 2)**: Mặt sói hàn băng sương tuyết (`#38BDF8`).
- **Gấu Trúc (BOT 3)**: Đại sư gấu trúc thiền trượng (`#10B981`).

### 2.4. Tối Ưu Bố Cục Khoa Học & Trải Nghiệm Công Thái Học (Ergonomic UX/UI)
1. **Header & Navigation Bar**:
   - Menu điều hướng dạng Capsule trong suốt bo góc tròn mềm mại (`rounded-2xl`).
   - Đổi biểu tượng Vàng (Gold) và Kim Cương (Gems) thành icon kim hoàn vector phát sáng.
2. **Khung Điều Khiển Trận Đấu (Unified Match Console)**:
   - Phân cụm rõ ràng theo nguyên tắc Gestalt: Chế độ chơi $\to$ Cấu hình BOT & Điểm $\to$ Chế độ Khán giả & Ván mới.
   - Thẻ hiển thị chế độ Khán giả (Spectator Mode) chuyển thành Cyber Banner với đèn LED nhấp nháy 60fps.
3. **Bàn Đấu 12 Ô (The Hexagon Board Grid)**:
   - Bo góc `rounded-2xl`, hiệu ứng kính mờ nỉ nhung (`bg-[#0B1120]/80 backdrop-blur-md`).
   - Mỗi ô cờ có nhãn số ô `#0`...`#11` tinh xảo, icon trung tâm vector phát sáng theo màu thuộc tính, và huy hiệu điểm số (`+10`, `-10`,...) dạng badge đổ bóng mềm.
   - Hiệu ứng token người chơi di chuyển có hào quang bao quanh.
4. **Bảng Xếp Hạng & Tiến Độ Cán Đích Bên Phải**:
   - Thẻ 4 người chơi hiển thị cân đối, thanh đo phần trăm điểm cán đích mượt mà có chỉ số phần trăm thực tế.
   - Hệ thống tab (Nhật ký, Chiến thuật, Thống kê) chuyển sang icon vector tinh tế, chữ sắc nét.

---

## 3. RÀNG BUỘC KỸ THUẬT & BẢO TOÀN LOGIC
- **Bảo toàn 100% logic trò chơi**: Giữ nguyên toàn bộ cấu trúc dữ liệu `boardTiles`, `players`, các hàm `rollDice()`, `movePlayer()`, `checkWin()`, cơ chế bot AI, chế độ khán giả (spectator mode), âm thanh Web Audio và 4 cổng bảo mật bí mật (secret portals).
- Cú pháp HTML/CSS/JS phải đạt chuẩn 100% không lỗi syntax.
- Đồng bộ nguyên vẹn giữa `index.html` và `tabletop-arena-boardgame.html`.
- Tự động commit và push lên nhánh `feat/ui` và `main` theo quy định tại `AGENTS.md`.

---

## ⚡ PHẦN 6: SPECTATOR SPEED 100X, BOT WIN RATE ANALYTICS & POPUP ELIMINATION
1. **Tăng Tốc Quan Sát Tối Đa 100x (Max 100x Speed)**:
   - Mở rộng dải nút tốc độ: `1x`, `2x`, `5x`, `10x`, `25x`, `50x`, `100x 🔥`.
   - Nút `100x` thiết kế nổi bật với dải gradient `from-amber-400 to-rose-500` và đổ bóng năng lượng.
   - Cơ chế nén thời gian siêu tốc:
     * `rollDuration`: tối thiểu 12ms.
     * `stepDuration`: tối thiểu 6ms.
     * `botDelay`: tối thiểu 15ms.
     * Mute âm thanh tự động khi tốc độ > 5x để loại bỏ hiện tượng tràn bộ đệm WebAudio khi mô phỏng hàng trăm ván cờ.
2. **Thống Kê Tỷ Lệ Thắng Đấu Thủ & BOT (Bot Win Rate Analytics)**:
   - Tích hợp động vào tab `🎲 Thống Kê`:
     * Số tổng ván đấu `statTotalMatches`.
     * Thanh đo tỷ lệ thắng (%) kèm số ván thắng thực tế cho 4 đối thủ: Bạn (P1 Cyan), Cáo Lửa (BOT 1 Rose), Sói Băng (BOT 2 Indigo), Gấu Trúc (BOT 3 Emerald).
     * Nút "Đặt lại" thống kê để làm mới benchmark khi cần.
     * Lưu trữ bền vững qua `localStorage` (`tabletop_bot_win_stats`).
3. **Triệt Tiêu Popup Kết Thúc Trận Ở Chế Độ Quan Sát (Zero Disruption)**:
   - Khi ở `isSpectatorMode === true`:
     * Không bật `victoryModal` che khuất màn hình (khắc phục hoàn toàn lỗi ở Ảnh 3).
     * Cập nhật chiến thắng vào `miniLog` và bắn toast thông báo nhẹ nhàng không chặn tương tác.
     * Tự động khởi tranh ván tiếp theo sau khoảng chờ siêu ngắn tỉ lệ theo tốc độ (ở 100x < 80ms).
   - Khi chơi thủ công (Người chơi thật), modal chúc mừng chiến thắng vẫn hiển thị trang trọng đầy đủ.

---

## ⚡ PHẦN 7: ĐẠI SẢNH TRÒ CHƠI HOÀNG GIA (GRANDMASTER MAIN LOBBY & GAME HUB)
1. **Thiết Kế Menu Chính Độc Bản (Bento Showcase Hub)**:
   - Thêm `mainViewLobby` làm cổng chào đầu mối khi bước vào Đấu trường cờ bàn.
   - Header đại sảnh hoành tráng với vương miện hoàng gia, tiêu đề gradient vàng hổ phách và huy hiệu đặc quyền.
   - 3 Thẻ bài Game Showcase chuẩn Bento Grid có hiệu ứng kính mờ (Glassmorphism), gradient viền phát quang và motion nâng thẻ 3D (`hover:-translate-y-2`):
     * 🎲 **Xúc Xắc 12 Ô Hoàng Kim**: 1-4 Đấu thủ, cạm bẫy & kho báu, chế độ quan sát 100x & Win Rate Analytics.
     * ♟️ **Cờ Vua Hoàng Gia (8x8 FIDE)**: Chuẩn thi đấu 64 ô quốc tế, 4 cấp độ Elo BOT (800 - 2000+), phân tích nước đi.
     * ⭕❌ **Cờ Ca-rô Neon (3x3)**: Đối kháng tốc độ cao, Minimax AI, hiệu ứng ánh sáng Cyberpunk 60fps.
2. **Cơ Chế Điều Hướng Hai Chiều Tiện Lợi**:
   - Thêm tab `Sảnh Game` vào thanh điều hướng chính (Desktop & Mobile).
   - Nút `Sảnh Game` (Menu Chính) tích hợp ngay tại Match Console của bàn đấu để người chơi có thể đổi game lập tức.
   - Nút `Chọn Game Ngẫu Nhiên` (Random Matchmaker) kết nối nhanh vào bàn đấu sôi động.
   - Click vào Logo `TABLETOP ARENA` ở header tự động quay về Menu Chính.


---

## ⚡ PHẦN 8: PHÂN LUỒNG TÍNH NĂNG THEO GAME (CONTEXT-AWARE CONTROLS SEPARATION)
1. **Triệt Tiêu Clutter & Trộn Lẫn Tính Năng**:
   - Tách biệt hoàn toàn thanh điều khiển Match Console thành 3 phân vùng độc lập theo ngữ cảnh (Contextual Containers):
     * #ctxControlsDice: Chỉ hiển thị khi chơi Xúc Xắc 12 Ô (Đấu thủ Solo/BOT, Số BOT 1-3, Điểm đích 30-100đ, Chế độ quan sát, Ván mới).
     * #ctxControlsChess: Chỉ hiển thị khi chơi Cờ Vua FIDE (Chế độ Bot/2 Người/Online, Bot Elo 800-2000+, Cầm Trắng/Đen, Lật bàn cờ, Gợi ý nước đi, Ván mới).
     * #ctxControlsTTT: Chỉ hiển thị khi chơi Ca-rô Neon (Chế độ Đấu Máy/2 Người, Độ khó Cơ bản/Bất bại Minimax, Ván mới, Xóa tỉ số).
2. **Loại Bỏ Toolbar Trùng Lặp Trong Cờ Vua**:
   - Chuyển toàn bộ các nút điều khiển của Cờ Vua lên thanh Contextual Console tập trung, giúp bàn cờ 8x8 FIDE bên dưới thoáng đãng, tập trung 100% vào thế trận.
3. **Mở Rộng Tính Năng Ca-rô Neon**:
   - Thêm bộ chọn chế độ Đấu Máy / 2 Người chơi (setTTTMode).
   - Thêm lựa chọn độ khó: Cơ Bản (45% đi ngẫu nhiên) hoặc Bất Bại Minimax (setTTTDifficulty).
   - Thêm nút xóa tỉ số X/O/Hòa (
esetTTTScores).
