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


---

## ⚡ PHẦN 17: TÁI THIẾT KẾ CỜ TỶ PHÚ VIỆT NAM 2D CỔ ĐIỂN SIÊU NHẸ (12x8 CHUẨN 36 Ô)
1. **Mục Tiêu & Yêu Cầu Thiết Kế Từ Người Dùng**:
   - Người dùng yêu cầu thay thế toàn bộ kiến trúc 2.5D Isometric (gây nặng tải, dễ méo chữ và khó bấm trên mobile) sang mô hình **Bàn Cờ Tỷ Phú Việt Nam 2D Cổ Điển** theo đúng ảnh mẫu (`media_1792992097872_67f9addd.png`).
   - Tối thiểu và đầy đủ các thành phần như trong ảnh:
     * Khung bàn cờ chữ nhật 12 cột x 8 hàng tỉ lệ 12/8 (36 ô bao quanh chu vi).
     * 4 góc trạm cờ danh tiếng: Sân Bay Tân An ✈️ (Góc Tây Bắc), Vô Tù ⛓️ (Góc Đông Bắc), Trại Giam 🏛️ (Góc Tây Nam), Xuất Phát 🗺️ (Góc Đông Nam).
     * Đầy đủ các tỉnh thành Việt Nam với màu sắc và mức giá thực tế (Hà Tĩnh, Đông Hà, Hội An, Quy Nhơn, Phan Thiết, Biên Hòa, Cần Thơ, Lạng Sơn, Hải Phòng, v.v.) cùng các ô Bến Xe, Nhà Ga, Bến Cảng, Cơ Hội ❓, Vận Mệnh ❗.
     * Khu vực sân trung tâm xanh biếc: Avatar người chơi Tiên 👩‍🏫 với kính mắt, cọc tiền mặt 💵 và đồng xu vàng 🪙, số dư `$19760`, 3 nút tiện ích (`⏻`, `⚙️`, `1X/2X`).
     * Tòa nhà Ngân hàng `BANK` bên góc phải hiển thị số dư ngân khố / tài sản đối thủ.
     * Hộp thoại tương tác trung tâm chính diện: `"Bạn có muốn mua ô này với giá $3200?"` với 2 nút lớn bo tròn `[ Không ]` (xám) và `[ Có ]` (xanh lá rực rỡ).
     * Nút Đổ Xúc Xắc lớn góc dưới cùng hiển thị mặt 2 viên xúc xắc trực quan.
2. **Ưu Điểm Vượt Trội**:
   - **Siêu Nhẹ & Tối Giản**: 100% CSS Grid phẳng, không sử dụng phép biến đổi 3D phức tạp (`rotateX/rotateZ`), không tiêu tốn GPU, không gây nóng máy hay đơ giật.
   - **Tương Thích Mọi Thiết Bị**: Co giãn hoàn hảo từ màn hình điện thoại nhỏ đến tablet và màn hình máy tính 2K/4K.
   - **Trải Nghiệm Trực Quan**: Tất cả chữ, số tiền, tên tỉnh thành đều to, rõ ràng, dễ đọc, 1 chạm là tương tác ngay.



---

## ⚡ PHẦN 18: NÂNG CẤP MÔ HÌNH 3D XÂY NHÀ, FONT CHỮ LỚN & HỆ THỐNG HIỆU ỨNG POP-UP (V3.2.0)
1. **Yêu Cầu & Mong Muốn Từ Người Dùng**:
   - Thêm các hiệu ứng pop-up sinh động cho các sự kiện (xây nhà, rút thẻ cơ hội, vận mệnh, thu tiền thuê đất, trả lương).
   - Tăng kích thước tên các ô và số tiền cho thật to, rõ nét, dễ đọc trên cả mobile và desktop.
   - Mỗi khi mua đất / xây nhà phải có một **mô hình 3D nhỏ** xuất hiện trên ô đất đó.
2. **Kiến Trúc Mô Hình 3D Isometric Nhỏ (3D Mini House SVG)**:
   - Sử dụng đồ họa vector Isometric 3D tối ưu không tải nặng GPU:
     * **Cấp 1 (Nhà Phố 3D)**: Mái ngói vát 3D, ống khói, tường hai sắc độ bóng sáng/tối, cửa gỗ, cửa sổ phát sáng và bóng đổ tiếp đất mềm.
     * **Cấp 2 (Biệt Thự Song Lập 3D)**: Hai khối nhà 3D kề nhau với hai tầng mái ngói sang trọng.
     * **Cấp 3 (Khách Sạn Hoàng Gia 3D)**: Tòa cao ốc hoàng gia phát sáng với vương miện vàng 👑 lung linh trên đỉnh.
     * Hiệu ứng thả rơi `animate-bounce-drop` đàn hồi sống động khi công trình được khánh thành.
3. **Typography Siêu Rõ Nét (Big Typography & High Contrast)**:
   - Tên ô tỉnh thành: Tăng kích thước lên `text-[9px] sm:text-[11px] md:text-[12px] font-black uppercase tracking-tight` tương phản cao trên nền màu từng vùng miền.
   - Giá trị đất & giá thuê: Font số điện tử Chakra Petch `text-[9px] sm:text-[12px] md:text-[13px] font-black text-amber-300 drop-shadow` nổi bật trên nền than chì.
   - HUD Người chơi: Tên "Tiên" hiển thị to đậm màu vàng kim `text-base sm:text-xl md:text-2xl font-black text-amber-300`, số dư tiền mặt `$19760` màu xanh ngọc bích `text-emerald-300 text-lg sm:text-3xl md:text-4xl font-black font-chakra`.
4. **Hệ Thống Hiệu Ứng Pop-Up Đa Tầng (Multi-Layer Popups)**:
   - **Hộp thoại quyết định trung tâm (`#mono2dDecisionBox`)**: Hiệu ứng phóng to đàn hồi `animate-mono-popup` mỗi khi chuyển đổi trạng thái (Gieo xúc xắc, Hỏi mua đất, Hỏi nâng cấp nhà).
   - **Thẻ tiền trôi nổi (`animate-float-cash`)**: Tự động bắn ra số tiền trôi lên và mờ dần (`+$2000` xanh lục hoặc `-$3200` đỏ cam) ngay trên avatar người chơi.
   - **Modal Pop-Up Sự Kiện Hoàng Gia (`#monoEventModalOverlay`)**: Khung kính mờ backdrop blur với viền vàng tỏa sáng, hiển thị mô hình 3D thu nhỏ đang xoay/nhún nhảy, huy hiệu sự kiện (Xây nhà, Vận mệnh, Cơ hội, Tiền thuê, Vô tù), số tiền biến động và nút bấm 1 chạm tiếp tục.


---

## 💎 PHẦN 19: ĐẠI TU BÀN CỜ TỶ PHÚ HOÀNG GIA (2D ARENA) CYBER SAPPHIRE & BENTO HUD KHOA HỌC (V3.3.0)
1. **Bối Cảnh & Vấn Đề Trước Khi Sửa**:
   - Giao diện cũ dùng màu xanh lam sáng `#0092D8` chói mắt, gây mỏi thị giác và lệch hoàn toàn với phong cách Tabletop Cyber Dark Sapphire / Emerald của toàn bộ hệ thống Arena.
   - Hộp thoại trung tâm (`#mono2dDecisionBox`) bị hiển thị đè liên tục ở trạng thái chờ xúc xắc (`mode === 'ready'`) với nút "Đổ Ngay 🎲" thừa thãi, che khuất toàn bộ tầm nhìn sân khấu bàn cờ.
   - Thanh HUD hiển thị các nút chức năng xếp dọc thiếu cân đối ở bên người chơi P1.
2. **Kiến Trúc & Giải Pháp Cải Tiến**:
   - **Chủ Đạo Dark Glassmorphism Sang Trọng**: Bàn cờ chuyển sang nền than chì cao cấp `#070D18` và Sapphire `#0B1526`, viền ngọc bích `border-emerald-500/30` với hiệu ứng ánh sáng chiều sâu và lưới tọa độ vi mô `radial-gradient(#10b981)`.
   - **Tối Ưu Hóa Tầm Nhìn Trung Tâm (Non-intrusive Arena)**:
     * Trạng thái `ready`: Ẩn hoàn toàn hộp thoại `#mono2dDecisionBox` để sân đấu thông thoáng tuyệt đối. Người chơi thao tác trực tiếp qua nút đổ xúc xắc lớn phát sáng ở dải điều khiển phía dưới.
     * Trạng thái `buy` / `upgrade` / `notice`: Tự động kích hoạt hiển thị hộp thoại pop-up Glassmorphism với viền vàng hổ phách `border-amber-500/40` và các nút hành động tương phản cao.
   - **Hệ Thống HUD Bento Pods Đối Xứng**:
     * Pod P1 (Trái): Avatar vầng sáng ngọc lục bảo, nhãn số 1, số dư tiền mặt `$19760` font Chakra Petch và bộ đếm bất động sản.
     * Pod Chỉ Huy (Giữa): Nút Nguồn `⏻`, Cài đặt chế độ `⚙️`, và Bộ tăng tốc ván đấu `1X/2X`.
     * Pod P2 / AI (Phải): Avatar vầng sáng hoa hồng tím, nhãn số 2, số dư đối thủ và bất động sản tương ứng.
   - **Bảo Toàn 100% Mô Hình 3D Mini House SVG & Hiệu Ứng Pop-Up Tiền**: Toàn bộ hệ thống nhà phố 3D, biệt thự, cao ốc hoàng gia vương miện và hiệu ứng tiền bay trôi nổi (`animate-float-cash`) được tích hợp trơn tru trên nền Dark Sapphire.


---

## ⚡ PHẦN 20: SỬA LỖI XUẤT PHÁT, NÂNG CẤP BÀN CỜ 2.5D ISOMETRIC VÀ CHUẨN HÓA LUẬT CỜ TỶ PHÚ NGUYÊN BẢN (V3.4.0)
1. **Sửa Triệt Để Vị Trí Ô Xuất Phát**:
   - Tái cấu trúc mảng 36 ô chu vi với `index 0` là **XUẤT PHÁT** (Góc Đông Nam, Row 8, Col 12).
   - Đảm bảo quân cờ của người chơi và đối thủ bắt đầu chính xác 100% tại ô Xuất Phát.
   - Chiều di chuyển vòng tròn chuẩn xác theo luật cờ: Xuất Phát (Row 8, Col 12) -> Ninh Bình (Row 8, Col 11) -> ... -> Trại Giam (Row 8, Col 1) -> Nha Trang -> Tân An -> Cần Thơ -> Vô Tù -> Quảng Ninh -> Xuất Phát.
2. **Luật Cờ Tỷ Phú Nguyên Bản Đầy Đủ (Authentic Monopoly Rules)**:
   - **Lương Xuất Phát**: Nhận `+$2,000` mỗi khi đi qua hoặc dừng lại tại ô Xuất Phát.
   - **Trại Giam & Vô Tù**:
     * Dẫm vào ô **VÔ TÙ** (ô 29): Bị tống thẳng vào **TRẠI GIAM** (ô 11) với mức án 3 lượt giam.
     * Khi trong tù: Lựa chọn trả $500 tiền bảo lãnh để ra tù ngay hoặc đổ xúc xắc tìm số đôi.
     * Dẫm vào ô **TRẠI GIAM** thông thường: Tính là "Thăm Tù" (Just Visiting), không bị giam giữ hay phạt tiền.
   - **Mua Đất & Xây Nhà 3D**:
     * Mua đất trống: Tự động khánh thành Nhà Cấp 1 mô hình 3D.
     * Dừng chân tại đất của mình: Nâng cấp lên Biệt Thự Cấp 2 và Khách Sạn Hoàng Gia Cấp 3.
   - **Tiền Thuê Lũy Tiến & Bến Bãi**: Tiền thuê nhân theo cấp nhà 3D; tiền thuê bến xe / bến cảng / nhà ga tăng theo số lượng bến sở hữu.
3. **Nâng Cấp Giao Diện 2.5D Isometric Tabletop**:
   - Sử dụng CSS 3D perspective `1400px` với góc nghiêng phối cảnh `rotateX(36deg) rotateZ(-6deg)` chân thực.
   - Tích hợp nút bấm **`[ 📐 2.5D / 2D ]`** trên thanh điều khiển trung tâm cho phép chuyển đổi tức thời giữa 2.5D Isometric và 2D Phẳng, mặc định mở sẵn **2.5D**.


---

## ⚡ PHẦN 21: SỬA LỖI ĐIỀU KHIỂN CHẾ ĐỘ ĐẤU BOT, VÁN MỚI, TỰ ĐỘNG HÓA AI & MỞ RỘNG BÀN CỜ KHÔNG BỊ CHE (V3.5.0)
1. **Sửa Lỗi Nút Ván Mới & Chuyển Chế Độ Chơi**:
   - Khởi tạo đầy đủ hàm `setMonopolyMode(mode)` và `restartMonopolyGame()` gắn vào thanh context menu trên đỉnh bàn đấu:
     * Nút **`[ 🤖 Đấu Với Bot ]`**: Chuyển sang chế độ đấu với Kỳ Thủ AI tự động.
     * Nút **`[ 👥 2 Người (Pass & Play) ]`**: Chuyển sang chế độ 2 người chơi lần lượt trên cùng thiết bị.
     * Nút **`[ 🔄 Ván Mới ]`**: Làm mới ván đấu ngay lập tức, đặt 2 quân cờ về ô Xuất Phát và cấp lại vốn $19,760.
2. **Kích Hoạt Tự Động Hóa Kỳ Thủ AI (Bot AI Loop)**:
   - Khắc phục lỗi Bot không đổ xúc xắc:
     * Khi đến lượt Bot, AI tự động gieo xúc xắc sau 1.2 giây (hoặc 0.6 giây nếu bật tốc độ `2X`).
     * Khi vào ô đất trống: Bot tự động mua đất và xây nhà 3D cấp 1 nếu đủ tiền, phát thông báo nhanh dạng Toast không gây nghẽn màn hình.
     * Khi vào đất của người chơi: Bot tự động chuyển tiền thuê đất với hiệu ứng tiền bay lơ lửng và chuyển giao lượt mượt mà.
3. **Mở Hộp Thoại Quyết Định Trung Tâm (`#mono2dDecisionBox`)**:
   - Khắc phục lỗi hộp thoại mua đất bị ẩn vĩnh viễn: Tự động loại bỏ class `hidden` và kích hoạt `flex animate-mono-popup` nổi bật ngay giữa bàn cờ khi người chơi dẫm vào ô đất trống hoặc ô nâng cấp.
   - 2 nút bấm bo tròn to bản `[ Không ]` và `[ Có (Mua & Xây 🏡) ]` cho phép 1 chạm là hoàn thành lượt đi.
4. **Phóng To Bàn Cờ & Chống Bị Che Khuất (Zero-Clipping)**:
   - Loại bỏ thuộc tính `overflow-hidden` trên `#monopolyView`, chuyển thành `overflow-visible` với độ rộng tối đa `max-w-6xl` (1152px).
   - Tinh chỉnh góc nghiêng 2.5D nhẹ nhàng `rotateX(32deg) rotateZ(-4deg) scale(1.02)` kết hợp đệm khoảng cách (`padding: 2rem 1rem 3.5rem 1rem`), giúp toàn bộ 36 ô chu vi từ hàng đỉnh (Hà Nội, Nhà Ga, Tân An...) đến hàng đáy (Hội An, Quy Nhơn, Trại Giam, Xuất Phát...) hiển thị rõ nét 100%, không bị cắt mất bất kỳ góc cạnh nào.


---

## ⚡ PHẦN 11: BẢN ĐỒ MỞ RỘNG GRAND MAP 6x6 (20 Ô) & CƠ CHẾ CHIẾN THUẬT ĐA TẦNG
1. **Bản Đồ Mở Rộng 6x6 (Grand Arena 20 Ô Chu Vi)**:
   - Mở rộng quy mô bàn cờ từ 12 ô (4x4) lên 20 ô (6x6), khung bàn cờ nới rộng tối đa 620px với khoang trung tâm 4x4 sang trọng.
   - 20 ô bao gồm đầy đủ hệ thống ô chức năng và báu vật mới:
     * #0 Khởi Hành (Thưởng +15đ Lap Bonus mỗi khi qua vòng).
     * #1 Đá Lam Ngọc (+10đ), #2 Bẫy Laser (-10đ), #3 Trạm Plasma (+15đ).
     * #4 Cổng Warp Alpha (Dịch chuyển tức thời tới Cổng Omega #14).
     * #5 Băng Ngục Kìm Chân (Giam giữ đấu thủ; cần gieo số chẵn 2,4,6 hoặc >=4 để phá băng).
     * #6 Quặng Hồng Ngọc (+20đ), #7 Rương Vận Mệnh I (Rút thẻ cơ hội may rủi).
     * #8 Bão Điện Từ (-15đ), #9 Kho Báu Cổ (+25đ), #10 Sàn Đấu Quyết Đấu (Thưởng nóng chiến tích).
     * #11 Sao Siêu Tân Tinh (+20đ), #12 Hố Đen Tử Thần (-25đ lực hút cực đại).
     * #13 Trạm Tiếp Tế (+15đ), #14 Cổng Warp Omega (Liên thông Cổng Alpha).
     * #15 Vành Đai Thiên Thạch (-15đ), #16 Kim Cương Vĩnh Cửu (+30đ).
     * #17 Rương Vận Mệnh II (Thẻ bài đột biến), #18 Trạm Thu Phí (-10đ).
     * #19 Chìa Khóa Thần (+35đ khai mở chiến thắng).
2. **Cơ Chế Khắc Nghiệt & Độ Khó Chiến Thuật Cao (Challenging Depth)**:
   - **Đá Quân (Knockback Clash)**: Đáp đúng vào ô đối thủ sẽ ĐÁ LÙI 3 Ô và CƯỚP 10 ĐIỂM!
   - **Khiên Hộ Thân (Divine Shield)**: Nhận từ Rương Vận Mệnh để miễn nhiễm 1 lần sát thương hoặc đòn đá lùi.
   - **Băng Ngục (Freeze)**: Gây kìm chân, tạo cơ hội cho đối thủ bứt phá.
   - **Mục tiêu điểm nâng cao**: Mặc định 100 điểm (thay vì 50 điểm dễ dãi trước đây), kéo dài vòng đua và gia tăng sự cạnh tranh kịch tính giữa các BOT và người chơi.


---

## 🌟 PHẦN 20: ĐẠI TU TOÀN DIỆN ALL-IN-ONE THÀNH GAME KỸ NĂNG & CHIẾN THUẬT ĐỐI KHÁNG (V4.0.0)

### 1. Bối Cảnh & Đột Phá Thiết Kế
Chuyển đổi triệt để trò chơi từ một game gieo xúc xắc may rủi thuần túy (`pure RNG`) sang một **Đấu Trường Chiến Thuật & Kỹ Năng Đỉnh Cao (Tactical Skill Arena)**, nơi thắng bại được định đoạt bởi:
- Kỹ năng phản xạ canh nhịp xúc xắc của người chơi.
- Trí tuệ quản lý tài nguyên năng lượng `⚡` và thời điểm tung kỹ năng (Khiên, Mìn, Tinh chỉnh bước).
- Bản lĩnh thi đấu trong các màn Mini-game Quyết Đấu phản xạ 5 giây.
- Khả năng đọc vị bản đồ và lựa chọn Hệ Nhân Vật khắc chế.
- Sự đối đầu căng thẳng với hệ thống AI Bot có IQ ngang bằng, biết suy luận thời gian thực và tự động đổi Role sau mỗi trận thua.

### 2. Các Trụ Cột Tính Năng All-In-One

#### 2.1. Thanh Canh Lực Xúc Xắc (Active Timing & Skill Roll Bar)
- **Cơ chế hoạt động:**
  - Trong khay xúc xắc trung tâm, xuất hiện một **Thanh Đo Lực Dao Động (Oscillating Power Gauge)** chạy nhịp nhàng với tần số điều chỉnh được.
  - Thước đo chia làm 3 phân vùng màu sắc trực quan:
    * **Vùng Xanh Lục (Bước Ngắn 1–2):** Góc trái (0% - 33%).
    * **Vùng Xanh Dương (Bước Vừa 3–4):** Ở giữa (34% - 66%).
    * **Vùng Vàng Hổ Phách (Bước Dài 5–6):** Góc phải (67% - 100%).
    * **Vạch Hoàng Kim (Perfect Zone):** Điểm tâm chuẩn xác, bấm trúng sẽ gieo ra 6 nút hoặc kích hoạt hiệu ứng "Critical Roll" (+5đ thưởng kỹ năng).
  - Người chơi chạm/bấm nút **`[DỪNG KIM / KHÓA LỰC]`** để quyết định số bước đi, chủ động né tránh hố đen và đáp trúng các ô ngọc quý.
  - Với chế độ Bot hoặc Khán Giả, Bot sẽ mô phỏng phản xạ thông minh để canh vùng tối ưu nhất.

#### 2.2. Hệ Thống Năng Lượng `⚡` & 3 Kỹ Năng Chủ Động (Active Skill Arsenal)
- **Tài nguyên Năng Lượng:** Mỗi người chơi/Bot khởi đầu với `3⚡` (tối đa `5⚡`), hồi `+1⚡` khi vượt qua ô Khởi Hành hoặc ghé thăm Trạm Tiếp Liệu/Trạm Tiếp Tế.
- **Thanh 3 Kỹ Năng Tác Chiến (Tích hợp ngay dưới khay xúc xắc):**
  1. 💣 **Đặt Bẫy Mìn Lượng Tử (`Tốn 2⚡`):** Đặt mìn tại ô hiện tại. Khi đối thủ dẫm vào, bẫy kích nổ làm đối thủ mất `-20 điểm`, số điểm này chuyển thẳng về túi người đặt bẫy!
  2. 🛡️ **Khiên Bảo Hộ Lực Trường (`Tốn 1⚡`):** Tạo hào quang phòng thủ trong 1 lượt; miễn nhiễm 100% sát thương bẫy, hố đen, bão điện từ và đòn đá lùi của đối thủ.
  3. ⏩ **Tinh Chỉnh Bước Đi Bước Nhảy (`Tốn 1⚡`):** Sau khi xúc xắc dừng, hiển thị 2 nút bấm nhanh `[-1 Bước]` và `[+1 Bước]` trong 3 giây cho phép người chơi bẻ lái bước chân để né tử địa hoặc ăn báu vật.

#### 2.3. Sàn Đấu Mini-Game Quyết Đấu (PvP Skill Duel)
- **Kích hoạt:** Khi đấu thủ rơi vào ô **#10 Đấu Trường Quyết Đấu** hoặc xảy ra **Đụng Độ Quân Cờ (Collision)** trên cùng 1 ô.
- **Giao diện:** Pop-up Modal 5 giây hiện lên giữa màn hình với 2 thể thức luân phiên:
  - *Thể thức A — Phản Xạ Chớp Nhoáng (Reflex Strike):* Một biểu tượng năng lượng nhấp nháy ngẫu nhiên trên màn hình, ai chạm/bấm trúng trước sẽ thắng cuộc!
  - *Thể thức B — Tâm Lý Chiến Đoạt Mệnh (Tactical RPS):* Ba nút Tấn Công (Búa), Phòng Thủ (Bao), Đột Kích (Kéo) có thời gian đếm ngược 3 giây để người chơi và Bot chọn chiêu.
- **Phần thưởng:** Kẻ chiến thắng cướp ngay `20 điểm` từ kẻ bại trận!

#### 2.4. Bộ Chọn 4 Map Đa Vũ Trụ (Multi-Map Dynamic Environments)
Hệ thống chuyển đổi Map ngay trên thanh điều khiển với 4 phong cách và hiệu ứng riêng biệt:
1. 🌌 **Map 1: Tinh Vân Hoàng Kim (Cyber Gold):** Chuẩn mực 20 ô cân bằng, Cổng Warp Alpha (#4) ↔ Omega (#14).
2. 🌋 **Map 2: Đấu Trường Dung Nham (Volcanic Inferno):** Các ô Hỏa Ngục lửa đỏ thiêu đốt (-20đ), Trạm Suối Khoáng hồi phục (+25đ), nhạc nền và hiệu ứng nham thạch rực sáng.
3. 🏙️ **Map 3: Thành Phố Ngầm Neon Heist (Cyberpunk):** Luật cướp kho bạc — ô Ngân Hàng Lượng Tử, ô Cảnh Sát Truy Nã, viền neon Cyan & Magenta.
4. ⏳ **Map 4: Mê Cung Thời Không (Chrono Quantum):** Ô Đồng Hồ Cát Đảo Chiều di chuyển toàn bàn cờ, ô Hố Sâu Không Gian kéo giật lùi.

#### 2.5. Hệ Thống 4 Lớp Nhân Vật Bất Đối Xứng (Hero Classes)
Cho phép người chơi chọn Hero trước trận hoặc chuyển đổi linh hoạt:
- 🛡️ **Hiệp Sĩ Lam Ngọc (Guardian):** Giảm 40% mọi sát thương trừ điểm; khởi đầu trận với 1 Khiên miễn phí.
- 🦊 **Cáo Lửa Hồng Ngọc (Assassin):** Hút ngay `5 điểm` của đối thủ mỗi khi chạy vượt mặt; đặt bẫy chỉ tốn `1⚡` thay vì 2⚡.
- 🔮 **Pháp Sư Tinh Tú (Chronomancer):** Khởi đầu với `5⚡` năng lượng tối đa; tùy ý chọn đi qua hay ở lại khi gặp Cổng Warp.
- 💎 **Thợ Săn Kho Báu (Treasure Hunter):** Tăng +20% điểm số nhận được từ tất cả các ô Ngọc, Kho Báu và Kim Cương.

#### 2.6. Trí Tuệ AI Suy Luận, Tự Đổi Role Sau Trận Thua & Reset Thống Kê
- **Bong bóng suy luận Bot (Live Thought Inspector):** Tab riêng biệt `[🧠 Trí Tuệ Bot]` trong Tactical Deck hiển thị thời gian thực cho từng Bot: Thẻ hồ sơ cá nhân, chỉ số Thắng/Bại, Role hiện tại, suy luận động mục tiêu/rủi ro/kỹ năng, và nút reset độc lập `[↺ Reset Bot]` cho từng cá thể.
- **Hệ thống Học Thích Nghi (Adaptive Counter-Pick):** Sau mỗi trận thua, Bot phân tích kẻ vừa thắng dùng Role gì và nguyên nhân thua, từ đó tự động đổi sang Role khắc chế ở ván tiếp theo với sơ đồ khắc chế trực quan tại tab `[Khắc Chế]`.
- **Bảng Hồ Sơ Bot & Nút Reset Thống Kê:** Lưu trữ `localStorage` toàn bộ số trận Thắng/Thua, Tỷ lệ Winrate %, Chuỗi trận và nút `[🔄 Reset Toàn Bộ]` kết hợp cùng các nút reset từng Bot để xóa trắng làm lại từ đầu.

#### 2.7. Hệ Thống Soi Ý Định Bot, 3 Trạng Thái Hành Động & Ma Trận Mối Quan Hệ Thù Ghét ("Ghim" Nhau)
- **Tab Soi Ý Định Từng Bot (Individual Bot Inspector):** Bộ lọc chuyển đổi giữa các Bot (Tất cả / Bot 1 Cáo Lửa / Bot 2 Sói Băng / Bot 3 Gấu Trúc). Cho phép soi sâu mục tiêu bước đi tiếp theo, ô đang nhắm tới và chiến thuật dự kiến.
- **3 Trạng Thái Hành Động Động:**
  * 🟡 `[⏳ ĐANG TIẾN HÀNH]`: Đang chờ lượt, đang nhắm mục tiêu, đang tích năng lượng hoặc đang canh bước xúc xắc.
  * 🟢 `[✅ THÀNH CÔNG]`: Vừa đá văng đối thủ, cướp điểm, gài bẫy chuẩn xác, nhặt ngọc hoặc thắng quyết đấu.
  * 🔴 `[❌ THẤT BẠI]`: Bị đá văng, dẫm phải mìn nổ, phá băng bất thành, thua quyết đấu hoặc bị kìm chân.
- **Thanh Mối Quan Hệ Thù Ghét (Rivalry & Feud Affinity Bar):**
  * Điểm mối quan hệ từ 0% đến 100% giữa từng cặp đấu thủ.
  * **Quy tắc "Ghim":** Mối quan hệ càng thấp (<35%) thì mức độ thù hận càng cao. Bot sẽ ưu tiên tối đa việc **gài mìn chặn đường**, **tinh chỉnh bước xúc xắc để đá văng** và **nhắm tới kẻ bị ghim** để trả thù.
  * Hiển thị thanh đo trực quan: Đỏ rực (💢 CỰC GHIM / Thù Địch), Vàng (Cảnh giác), Xanh (Hòa hoãn) kèm tên đối tượng đang bị ghim nhiều nhất.
