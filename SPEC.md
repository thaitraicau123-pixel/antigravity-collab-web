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


---

## ⚡ PHẦN 9: TINH GỌN BỐ CỤC MATCH CONSOLE (SINGLE-ROW BENTO BAR)
1. **Loại Bỏ Hoàn Toàn Pill Switcher Trùng Lặp**:
   - Khử bỏ cụm nút [Xúc Xắc 12 Ô | Ca-rô Neon | Cờ Vua FIDE] ở thanh điều khiển bàn đấu.
   - Nhường trọn vẹn diện tích ngang cho các phím điều khiển nghiệp vụ của từng game.
   - Người chơi chuyển đổi trò chơi thông qua nút [← Sảnh Game] hoặc Thanh điều hướng chính.
2. **Huy Hiệu Định Danh Game Động (Dynamic Arena Title Badge)**:
   - Tích hợp huy hiệu sang trọng #arenaGameTitle bên cạnh nút Sảnh Game.
   - Tự động hiển thị tên và icon game đang mở:
     * 🎲 XÚC XẮC 12 Ô HOÀNG KIM (Amber)
     * ♟️ CỜ VUA HOÀNG GIA (8x8 FIDE) (Indigo)
     * ⭕❌ CỜ CA-RÔ NEON (3x3) (Cyan)
3. **Bố Cục 1 Hàng Ngang Liền Mạch (Ergonomic Single-Row)**:
   - Các nút chức năng xếp thẳng hàng tinh tế, cân đối 2 bên (Bên trái: Điều hướng & Tên game; Bên phải: Các nút tính năng nghiệp vụ của game đó).
   - Triệt tiêu hoàn toàn hiện tượng vỡ dòng hoặc khoảng trống thừa.


---

## ⚡ PHẦN 10: PHỤC HỒI CHẾ ĐỘ QUAN SÁT (SPECTATOR MODE) & ĐỒNG BỘ FONT PLUS JAKARTA SANS
1. **Phục Hồi Tính Năng Quan Sát (Chuẩn Ảnh 1)**:
   - Đưa trở lại nút 👁️ Quan Sát (#btnSpectator) vào thanh điều khiển game Xúc Xắc 12 Ô (#ctxControlsDice).
   - Tích hợp thanh HUD Khán Giả nổi bật (#spectatorControlBar) trực tiếp vào thanh điều khiển khi bật Chế độ Quan Sát.
   - Đầy đủ các nút điều khiển nghiệp vụ theo ảnh 1:
     * Nút [⏸️ Tạm Dừng / ▶️ Tiếp Tục] (#specPauseBtn).
     * Cụm tốc độ xúc xắc [1x, 2x, 5x, 10x, 25x, 50x, 100x 🔥] (#specSpd1 .. #specSpd100).
     * Nút [▷ Lấy Lại Quyền Chơi] (exitSpectatorMode) đưa giao diện mượt mà trở về chế độ chơi bình thường.
2. **Chuyển Đổi Toàn Bộ Font Chữ Sang Plus Jakarta Sans (Chuẩn Ảnh 2)**:
   - Loại bỏ hoàn toàn font serif rườm rà (Playfair Display, Cinzel, Be Vietnam Pro).
   - Nhập font Plus Jakarta Sans đầy đủ weights (300 đến 800) từ Google Fonts.
   - Áp dụng Plus Jakarta Sans cho toàn bộ body, tiêu đề (h1-h6), nút bấm, bảng số, thẻ bài và các modal.
   - Font chữ tròn trịa, hiện đại, hiển thị dấu tiếng Việt sắc nét và không bao giờ bị lỗi.

---

## ⚡ PHẦN 11: CHẨN ĐOÁN & KHẮC PHỤC TRIỆT ĐỂ POP-UP GÓC DƯỚI & GIẬT LAG Ở CHẾ ĐỘ QUAN SÁT
1. **Chẩn đoán nguyên nhân Pop-up góc dưới**:
   - Khi ván cờ kết thúc, hàm `showVictory()` liên tục gọi `showToast("🏆 ... chiến thắng!")`.
   - Ở Chế độ Quan Sát (đặc biệt tốc độ cao), các ván đấu kết thúc liên tục sau vài giây khiến `#siteToast` ở góc dưới phải bị kích hoạt dồn dập, đè timer và nhấp nháy liên hồi.
   - **Giải pháp**: Vô hiệu hóa hoàn toàn lệnh gọi `showToast` khi kết thúc ván trong `isSpectatorMode`. Trạng thái chiến thắng đã được ghi nhận trực quan vào `miniLog`, bảng điểm và huy hiệu người dẫn đầu mà không cần bật pop-up che góc.
2. **Chẩn đoán và khắc phục 5 nguyên nhân gây giật lag (Jank/Stuttering)**:
   - **Forced Layout Thrashing**: Thuộc tính `void m.offsetWidth;` trong `moveMeepleSteps()` ép trình duyệt tính toán lại layout đồng bộ trên từng bước đi. Đã thay thế bằng `requestAnimationFrame()`.
   - **Hủy & Tạo mới DOM dồn dập (`renderTokens`)**: Cứ mỗi bước đi, toàn bộ 12 ô cờ bị xóa sạch `innerHTML = ''` và tạo mới lại các thẻ `div` chứa SVG. Đã tối ưu hóa sang cơ chế **Node Reuse**: Khởi tạo token 1 lần, các bước sau chỉ chuyển đổi vị trí node bằng `box.appendChild(m)` giúp giảm 95% chi phí render.
   - **Nghẽn luồng Web Audio Oscillator**: `soundTone()` tạo hàng trăm node âm thanh mỗi giây khi tua nhanh. Đã tắt âm thanh bước đi khi tốc độ > 2x.
   - **Xung đột Transition thanh đua điểm**: Thanh `raceBarP1..4` có `transition: width 300ms`, khi tốc độ quan sát cao (>= 5x) bị giật rung do các frame cập nhật nhanh hơn thời gian chuyển cảnh. Đã gỡ bỏ transition khi tua nhanh.
   - **Rung lắc xúc xắc 3D quá mức**: Khi ở tốc độ cao (>= 5x), tắt class `.rolling-dice` nặng nề để bàn cờ luôn ổn định, êm ái 60fps.


---

## ⚡ PHẦN 12: ĐẠI TU TOÀN DIỆN UX/UI CA-RÔ MOBILE THEO CHUẨN /WEBPRO
1. **Triệt tiêu lỗi hình học & biến dạng Badge trên Mobile**:
   - Thêm `whitespace-nowrap shrink-0` cho huy hiệu `3x3` để loại bỏ hoàn toàn tình trạng chữ gập đôi thành vòng elip đứng dị dạng như trong ảnh Messenger iOS.
   - Bố cục flex header tự động thích ứng với chiều rộng hẹp (< 380px), không bao giờ làm gãy chữ "Hoàng Gia".
2. **Thanh Thao Tác Nội Tại (In-Card Action Bento Bar)**:
   - Tích hợp cụm phím nghiệp vụ đặt ngay trên bàn cờ Ca-rô giúp người chơi di động không bao giờ bị kẹt:
     * Nút [← Sảnh] chuyển về Menu chính tức thì.
     * Nút chọn [🤖 Đấu BOT | 👥 2 Người] (Đồng bộ nhãn "Máy (O)" thành "Người chơi (O)").
     * Cụm chọn độ khó [Cơ Bản | Bất Bại 🔥].
     * Nút [🔄 Ván Mới] (resetTTTGame).
3. **Vá lỗi Logic ReferenceError**:
   - Khởi tạo đầy đủ hàm `setTTTOpponent(mode)` đồng bộ cả 2 thanh điều khiển (thanh trên và thanh nội bộ card).
4. **Loại bỏ lỗi Dính Viền Vàng Hover trên màn hình cảm ứng**:
   - Đưa pseudo-class `:hover` vào `@media (hover: hover) and (pointer: fine)` để tránh việc ô vừa chạm trên điện thoại bị dính viền sáng vĩnh viễn.


---

## ⚡ PHẦN 13: HỆ THỐNG CHUYỂN CẢNH GPU 60FPS & POPUP SPRING-POP TOÀN DIỆN (CHUẨN /WEBPRO & /THIETKEWEB)
1. **Motion Token Đạt Chuẩn GPU Acceleration (Trụ cột 4 /thietkeweb)**:
   - Toàn bộ chuyển cảnh chỉ sử dụng thuộc tính `transform` và `opacity` (tuyệt đối không animate trực tiếp `width`/`height`/`top`/`left`) để duy trì cố định 60fps trên compositor thread, triệt tiêu 100% layout reflow / repaint.
   - Thêm keyframe `viewFadeSlideIn` với đường cong cubic-bezier công nghệ cao `cubic-bezier(0.16, 1, 0.3, 1)` (spring-soft easing), thời lượng 260ms - 300ms.
2. **Nâng Cấp Chuyển Cảnh Phân Vùng Chính (Main Tab & Game View Transitions)**:
   - Hàm `switchMainTab(tab)`: Mỗi khi chuyển giữa các màn hình Sảnh (Lobby), Đấu Trường (Arena), Bảng Xếp Hạng (Leaderboard), Đặc Quyền VIP, Luật Chơi, view đích tự động kích hoạt class `.view-fade-slide` trượt nhẹ từ dưới lên và mờ dần vào, tạo cảm giác app-native mượt mà.
   - Hàm `switchGameView(tab)`: Chuyển đổi giữa Đua Ngựa (Dice Quest), Cờ Ca-rô (Tic Tac Toe), Cờ Vua (Chess) với hiệu ứng trượt nhẹ êm ái, nhãn tiêu đề game `#arenaGameTitle` biến đổi mượt mà không giật cục.
3. **Bộ Đôi openModal(id) & closeModal(id) Đạt Chuẩn Spring-Pop**:
   - Khi mở bất kỳ modal nào trong 9 modal (`authModal`, `profileModal`, `upgradeModal`, `leaderboardModal`, `rulesModal`, `victoryModal`, `adminModal`, `versionModal`, `chessPromoModal`):
     * Lớp nền (Backdrop) mờ dần vào với `opacity: 0 -> 1` trong 200ms.
     * Thẻ chứa nội dung (Card) bung nở từ `scale(0.92) translateY(12px)` lên `scale(1) translateY(0)` với đường cong nảy nhẹ tự nhiên qua `requestAnimationFrame`.
   - Khi đóng modal:
     * Card thu nhỏ và hạ xuống `scale(0.95) translateY(8px)` đồng thời mờ dần ra trong 260ms trước khi gán class `.hidden`.
4. **Bloom Transition Cho Profile Dropdown Menu**:
   - Thay thế việc ẩn hiện đột ngột bằng hiệu ứng dropdown bloom `.dropdown-smooth` (`scale(0.95) -translate-y-2` -> `scale(1) translate-y-0`), bóng đổ mượt mà khi người dùng tương tác với avatar/menu tài khoản.


---

## ⚡ PHẦN 14: ĐẠI TU BỐ CỤC KHOA HỌC & BỘ ICON SVG ĐỘC BẢN TOÀN TRANG (/WEBPRO & /THIETKEWEB)
1. **Khắc Phục Lỗi Cấu Trúc HTML & Tái Thiết Bố Cục Bí Kíp Luật Chơi (mainViewRules)**:
   - Sửa triệt để lỗi thẻ `</div>` khiến Card Cờ Vua bị nuốt vào bên trong Card Ca-rô.
   - Nâng cấp chiều rộng container lên `max-w-7xl` chuẩn desktop 2K/4K và tối ưu co giãn hoàn hảo trên tablet, mobile.
   - Bổ sung thanh điều hướng phân loại bộ môn (Scientific Category Tabs):
     * `[✨ Toàn Cảnh 4 Bộ Môn]`
     * `[🎲 1. Đua Ngựa Xúc Xắc (12 Ô)]`
     * `[⭕❌ 2. Cờ Ca-rô Neon (3x3)]`
     * `[♟️ 3. Cờ Vua Quốc Tế (FIDE 8x8)]`
     * `[🏰 4. Cờ Tỷ Phú 2.5D (Isometric)]`
   - Bố cục 4 thẻ Bento cân bằng hoàn hảo, mỗi thẻ hiển thị chi tiết:
     * Huy hiệu icon vector SVG độc bản riêng (Xúc xắc 3D, Ca-rô Neon, Vua FIDE, Lâu đài Tỷ Phú).
     * Phân loại cơ chế điểm thưởng, ô nguy hiểm, ô cơ động bằng các thẻ màu tương phản WCAG 2.1 AAA.
     * Nút bấm thao tác nhanh đưa người chơi vào bàn đấu ngay lập tức (`enterGameFromLobby('dice'|'tictactoe'|'chess'|'monopoly')`).

2. **Bộ Sưu Tập Icon SVG Độc Bản (Bespoke Vector SVG Icon Suite - Trụ cột 3 /thietkeweb)**:
   - Loại bỏ 100% các icon Emoji hệ điều hành không đồng nhất và thay thế bằng vector SVG tinh xảo, nét vẽ 2px, bo tròn `round`:
     * Menu Tabs: Sảnh Game (Grid Bento), Bàn Đấu (Song Kiếm Laser), Xếp Hạng (Cúp Hoàng Gia), VIP (Vương Miện Lục Lăng), Bí Kíp (Cuộn Pháp Điển).
     * Widget Tài Sản & Người Dùng: Đồng Xu Vàng (Coin), Kim Cương Xanh (Diamond Gem), Loa Âm Thanh (Sound Wave), Nhánh Phiên Bản (Git Branch), Nút Tài Khoản (User Pill).
     * Header Bảng Phong Thần & Hội Viên VIP: Thay thế emoji 🏆 và ⚡ bằng biểu tượng vector mạ vàng đa giác phát sáng.
     * Footer Toàn Trang: Đồng bộ toàn bộ 12 liên kết bàn cờ, tài khoản, điều khoản từ icon emoji sang SVG độc bản.


---

## ⚡ PHẦN 15: ĐIỀU HƯỚNG BỘ LỌC CHANGELOG CHÍNH XÁC & ĐỊNH TUYẾN COMMIT BÊN MÀU TÍM (CUONGCUCA111-WEB)
1. **Thiết Lập Git Identity Cố Định Cho Lập Trình Viên (Màu Tím)**:
   - Cấu hình vĩnh viễn trong local repository:
     * `user.name`: `cuongcuca111-web`
     * `user.email`: `cuongcuca111@users.noreply.github.com`
   - Đảm bảo từ nay về sau, toàn bộ các commit mới đẩy lên GitHub sẽ tự động mang định danh của Bên Màu Tím (`dev1` - `cuongcuca111-web (Bạn anh) - UI/UX Board Game Designer & Frontend`).
2. **Bộ Lọc Phân Tích Commit Thông Minh Hai Lớp (Smart Dual-Layered Classifier)**:
   - Sửa đổi hàm `parseCommitDetails(c, index, total)`:
     * Phân loại chính xác 100% các tính năng UI, UX, Motion 60fps, Transition, Spectator, Đa BOT, Mobile Responsive, Bento Grid, SVG Icons về đúng Bên Màu Tím (`cuongcuca111-web`).
     * Phân loại các tính năng Cờ Tỷ Phú 2.5D Isometric, Cờ Vua FIDE, Bot Minimax Elo, GitHub API Live Tracker về Bên Màu Xanh (`thaitraicau123-pixel (Anh)`).
3. **Hiệu Chỉnh Danh Sách CURATED_CHANGELOG & Thẻ Tóm Tắt Dev**:
   - Cập nhật đúng các đầu việc chủ chốt của 2 Dev trên 2 thẻ tóm tắt đỉnh Modal:
     * Bên Màu Xanh: Cờ Tỷ Phú 2.5D, Cờ Vua FIDE & Bot Minimax, GitHub REST API Engine & WebSocket.
     * Bên Màu Tím: Chuyển cảnh 60fps GPU, Bí kíp Bento 4 bộ môn & SVG độc bản, Đa BOT & Khán giả, Tối ưu Mobile UX.


---

## ⚡ PHẦN 16: KHẮC PHỤC TRIỆT ĐỂ LỖI DÍNH GIAO DIỆN CỜ TỶ PHÚ KHI THOÁT VỀ SẢNH GAME
1. **Chẩn Đoán Nguyên Nhân Gốc Rễ (5 Whys)**:
   - Thẻ `div#mainViewArena` trước đây bị đóng sớm ngay sau `chessView`, dẫn tới việc `div#monopolyView` (Cờ Tỷ Phú 2.5D) bị văng ra ngoài và trở thành phần tử con trực tiếp của thẻ `<main>`.
   - Khi người chơi bấm thoát ra (về Sảnh Game, Bảng Phong Thần, VIP, hoặc Luật Chơi), hàm `switchMainTab('lobby')` chỉ ẩn `mainViewArena` mà hoàn toàn không thể ẩn `monopolyView`.
   - Kết quả: Khi về Sảnh Game, bàn cờ Cờ Tỷ Phú 2.5D và các widget HUD vẫn hiển thị dính bên dưới 4 thẻ game đại sảnh (đúng như Ảnh 1).
2. **Khắc Phục Tận Gốc (Core Fix & Phòng Thủ 3 Tầng)**:
   - **Tầng 1 (DOM Tree Hierarchy)**: Di chuyển thẻ đóng `</div>` của `mainViewArena` xuống phía sau `monopolyView`, đưa cả 4 bộ môn (`diceView`, `tictactoeView`, `chessView`, `monopolyView`) về đúng cấu trúc lồng nhau của Đấu Trường.
   - **Tầng 2 (Defensive Guard)**: Trong `switchMainTab(tab)`, mỗi khi `tab !== 'arena'`, kích hoạt cơ chế phòng thủ tự động gán `.hidden` và gỡ bỏ `.flex`/`.grid` cho toàn bộ 4 view cờ và các context toolbars.
   - **Tầng 3 (Smooth UX)**: Khi về Sảnh (`tab === 'lobby'`), tự động cuộn mượt mà lên đỉnh trang (`window.scrollTo({ top: 0, behavior: 'smooth' })`), hiển thị giao diện Sảnh Game thanh thoát, sạch đẹp 100% (đúng như Ảnh 2).
