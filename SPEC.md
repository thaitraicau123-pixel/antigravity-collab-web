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



---

## ⚡ PHẦN 22: HỖ TRỢ ĐẾN 4 NGƯỜI CHƠI & ĐẾN 3 BOT AI CÙNG LÚC - HỆ THỐNG QUÂN CỜ 4 GÓC & BENTO HUD ĐA NĂNG (V3.6.0)
1. **Mở Rộng Chế Độ Chơi Đa Người (2 đến 4 Người Chơi Đồng Thời)**:
   - **Chế Độ Chơi Đơn (1 Người vs Tối Đa 3 Bot AI)**:
     * Người chơi 1 (Tiên / User) thi đấu với 1, 2 hoặc 3 Bot AI tự động.
     * Cấu hình linh hoạt thông qua bộ chọn **[ 2P ] [ 3P ] [ 4P ]** tại thanh điều khiển đỉnh trang và ngay trong bàn cờ trung tâm.
     * Cả 3 Bot AI (Cáo AI 🦊, Hổ AI 🐯, Gấu Trúc AI 🐼) sở hữu tính cách, avatar, bảng màu neon và mô hình mái nhà 3D riêng biệt (Hồng Ruby, Vàng Hổ Phách, Xanh Ngọc Lục Bảo).
   - **Chế Độ Nhiều Người (Pass & Play / 2 Đến 4 Người Cùng Thiết Bị)**:
     * Cho phép từ 2, 3 đến 4 người chơi luân phiên nhau đổ xúc xắc, mua đất, nâng cấp nhà và trả tiền thuê trên cùng một thiết bị.
     * Mỗi lượt đi hiển thị rõ tên, avatar và hiệu ứng viền vàng phát sáng pulsating ('ring-2 ring-amber-400') trên Bento Pod của người đang đến lượt.

2. **Hệ Thống Quân Cờ 4 Góc Phối Cảnh Độc Lập (Zero-Overlap Quadrant Clustering)**:
   - Khắc phục triệt để lỗi quân cờ đè lên nhau khi ở cùng ô (đặc biệt tại ô XUẤT PHÁT khi mở đầu ván cờ):
     * **P1 (Tiên 👩‍🏫)**: Góc trên - trái ('translate(-15px, -15px)'), hiệu ứng viền phát sáng Cyan.
     * **P2 (Cáo AI 🦊)**: Góc trên - phải ('translate(15px, -15px)'), hiệu ứng viền Rose.
     * **P3 (Hổ AI 🐯)**: Góc dưới - trái ('translate(-15px, 15px)'), hiệu ứng viền Amber.
     * **P4 (Gấu Trúc AI 🐼)**: Góc dưới - phải ('translate(15px, 15px)'), hiệu ứng viền Emerald.
   - Khi ở phối cảnh 2.5D Isometric, từng quân cờ tự động dựng góc nghiêng 'rotateZ(4deg) rotateX(-32deg) translateZ(24px)' với đổ bóng rơi 'drop-shadow' chân thực; chỉ quân cờ của người đang có lượt mới kích hoạt hoạt ảnh nhún nhảy 'animate-bounce'.

3. **Giao Diện Bento Pods Động (Dynamic Glassmorphism HUD)**:
   - Tự động co giãn theo số lượng người tham gia ('grid-cols-2 lg:grid-cols-4').
   - Từng Bento Pod hiển thị:
     * Avatar hình tròn với vòng hào quang phát quang neon tương ứng.
     * Huy hiệu số thứ tự người chơi (1, 2, 3, 4).
     * Tên người chơi kèm nhãn định danh ('P1', 'P2', 'P3', 'P4' hoặc 'BOT').
     * Nhãn '[ LƯỢT ]' phát sáng vàng khi đến lượt đi.
     * Số tiền mặt hiện có ('$19,760' khởi điểm) kèm container tiền bay lơ lửng riêng biệt ('#monoFloatCashContainer_X').
     * Tổng số lượng bất động sản sở hữu.

4. **Vòng Lặp Điều Khiển & Tự Động Hóa Ván Đấu Thông Minh**:
   - Tự động luân chuyển lượt thông minh: 'turn = (turn + 1) % players.length', tự động bỏ qua người chơi đã phá sản ('isBankrupt').
   - Khi còn lại đúng 1 người chơi cuối cùng chưa phá sản, hệ thống tự động công bố danh hiệu **👑 VÔ ĐỊCH CỜ TỶ PHÚ HOÀNG GIA!** với cúp vàng và pháo hoa ăn mừng.
   - Nút **ĐỔ XÚC XẮC** tự động khóa ('disabled') khi đang đến lượt của Bot AI để tránh người chơi bấm nhầm, và tự động mở lại ngay khi đến lượt của người chơi.


---

## ⚡ PHẦN 23: PHỐI CẢNH KIM CƯƠNG ISOMETRIC 2.5D (LINE LET'S GET RICH STYLE) - MÔ HÌNH NHÀ 3D NỔI THẲNG ĐỨNG, HUY HIỆU CẤP ĐỘ RÕ RÀNG & ĐÈN HÀO QUANG ĐỊNH VỊ NGƯỜI CHƠI (V3.7.0)
1. **Bàn Cờ Phối Cảnh Kim Cương 2.5D Xoay 45° (Line Let's Get Rich Isometric Diamond Grid)**:
   - Tái thiết kế toàn bộ hệ thống tọa độ bàn cờ thành lưới vuông 10x10 ô đối xứng hoàn hảo xoay nghiêng 45° (`perspective(1400px) rotateX(44deg) rotateZ(45deg) scale(0.85)`).
   - Bố cục 4 đỉnh kim cương theo chuẩn tự nhiên và trực quan nhất:
     * **Đỉnh Dưới Cùng (Bottom Vertex)**: Ô **XUẤT PHÁT** (Start - Tile 0) hướng thẳng đối diện người chơi với góc nhìn bao quát toàn bàn.
     * **Đỉnh Bên Trái (Left Vertex)**: Ô **TRẠI GIAM** (Jail - Tile 9).
     * **Đỉnh Trên Cùng (Top Vertex)**: Ô **TÂN AN / SÂN BAY** (Airport - Tile 18).
     * **Đỉnh Bên Phải (Right Vertex)**: Ô **VÔ TÙ** (Go to Jail - Tile 27).
   - 36 ô đất đại diện cho các thành phố danh lam thắng cảnh Việt Nam trải đều trên 4 cạnh của hình kim cương.

2. **Mô Hình Nhà 3D Đứng Thẳng & Huy Hiệu Cấp Độ Nổi Bật (Upright 3D Buildings & Level Badges)**:
   - Ứng dụng kỹ thuật Triệt Tiêu Biến Dạng Góc Phối Cảnh (Perspective Counter-Rotation): Tất cả mô hình nhà, huy hiệu và quân cờ đều mang lớp style `.mono-upright-3d` với công thức `transform: rotateZ(-45deg) rotateX(-44deg) translateZ(28px)`, giúp các kiến trúc dựng đứng 100% vuông góc với mặt bàn cờ và hướng thẳng vào tầm mắt người xem.
   - Nhận diện cấp độ nhà ngay lập tức mà không cần bấm vào xem chi tiết:
     * **Cấp 1 (Nhà Phố / Cottage)**: Huy hiệu hình con nhộng `[ ⭐ LV.1 ]` màu Cyan kèm mô hình nhà 3D ngói dốc.
     * **Cấp 2 (Biệt Thự Tầng / Luxury Villa)**: Huy hiệu `[ ⭐⭐ LV.2 ]` màu Vàng Hổ Phách kèm biệt thự 3D 2 tầng có ban công phát sáng.
     * **Cấp 3 MAX (Tòa Tháp Hoàng Gia / Landmark Skyscraper)**: Huy hiệu vương miện `[ 👑 MAX LV.3 ]` ánh vàng kim rực rỡ với hiệu ứng nhịp thở `animate-pulse` cùng mô hình chọc trời có đỉnh tháp vàng óng.
   - Đế ô đất đổi màu viền và màu nền theo bảng màu nhận diện của chủ sở hữu, hiển thị rõ ràng giá thuê hiện tại tương ứng với cấp độ nhà.

3. **Hệ Thống Đèn Chiếu Sàn & Hào Quang Định Vị Người Chơi Hiện Tại (Spotlight & Overhead Location Beacon)**:
   - Giải quyết triệt để vấn đề "khó nhìn biết người chơi đang ở đâu":
     * **Đèn Chiếu Sàn (Tile Floor Spotlight)**: Ô đất mà người chơi hiện tại đang đứng sẽ phát hào quang vàng rực `.mono-tile-spotlight` bao bọc toàn bộ ô cờ với hiệu ứng nhịp thở phát sáng rực rỡ.
     * **Hào Quang Định Vị Trên Đỉnh Đầu (3D Overhead Beacon)**: Trên đầu quân cờ của người đang có lượt sẽ xuất hiện bảng định danh lơ lửng `[ 👑 LƯỢT TIÊN ]` với mũi tên neon vàng nhấp nháy chỉ thẳng xuống đỉnh đầu quân cờ, không bao giờ bị che khuất bởi các tòa nhà xung quanh.
     * **Đế Chân Quân Cờ 3D**: Mỗi quân cờ sở hữu avatar hình tròn nổi với hiệu ứng đổ bóng rơi ('drop-shadow') và vầng sáng mờ cùng màu dưới chân.

4. **Bố Cục 4 Góc Màn Hình (4-Corner Framing HUD Pods) & Sân Đấu Trung Tâm**:
   - 4 Bento Pod của 4 người chơi được ghim cố định tại 4 góc màn hình (`top-left`, `top-right`, `bottom-left`, `bottom-right`), tận dụng triệt để khoảng trống sinh ra khi xoay bàn cờ hình kim cương, không che chắn bất kỳ ô cờ nào.
   - Khu vực sân cỏ điện tử trung tâm (Central Cyber-Turf) chứa hộp xúc xắc 3D nằm ngang tầm mắt người xem (`[ 🎲 5 ] [ 🎲 4 ] = 9`) và nút bấm lớn màu vàng kim mạ ánh sáng **[ 🎲 ĐỔ XÚC XẮC ]** cực kỳ mãn nhãn.


---

## ⚡ PHẦN 24: KIỂM TOÁN TOÀN DIỆN & KHẮC PHỤC LỖI TÍNH NĂNG CỜ TỶ PHÚ (MONOPOLY ENGINE AUDIT & FULL FIXES - V3.7.1)
1. **Khắc Phục Lỗi Đóng Băng Khi Bot AI Ở Trại Giam (Bot in Jail Freeze Fix)**:
   - *Nguyên nhân*: Trước đây khi Bot AI vào Trại Giam (`inJail > 0`), hệ thống gọi `handleMonoDialogChoice` nhưng biến `pendingAction` bị gán `null` dẫn tới hàm `return` ngay lập tức. Bot không thể đổ xúc xắc hay nộp phạt, khiến ván cờ bị kẹt cứng vĩnh viễn ở lượt của Bot.
   - *Giải pháp*: Xây dựng luồng quyết định tự hành độc lập cho Bot trong Trại Giam: Nếu số dư lớn (`cash >= $3,000`), Bot tự động trích \$500 nộp bảo lãnh, kích hoạt thông báo và đổ xúc xắc di chuyển ngay; nếu số dư thấp, Bot tự động gieo xúc xắc tìm số đôi. Loại bỏ 100% nguy cơ treo game khi Bot ở tù.

2. **Căn Giữa & Triệt Tiêu Lỗi Cắt Xén Hộp Thoại Quyết Định (Centered Decision Box & Anti-Clipping)**:
   - *Nguyên nhân*: Hộp thoại mua đất/nâng cấp (`#mono2dDecisionBox`) trước đây đặt tại vị trí đáy (`bottom-2`). Khi bàn cờ xoay 45° kim cương, góc đáy rất hẹp (~150px) khiến cạnh trái hộp thoại bị tràn ra ngoài và bị cắt mất nút **[ Bỏ Qua ]**.
   - *Giải pháp*: Chuyển đổi hộp thoại thành lớp phủ trung tâm (`inset-0 flex items-center justify-center`) với nền tối đặc `bg-[#0C1524]` và đổ bóng sâu, đặt ở phần rộng nhất của sân cỏ trung tâm. Cả hai nút **[ Bỏ Qua ]** và **[ Đồng Ý (Mua 🏡) ]** hiển thị tròn trịa 100%, không bị che lấp.

3. **Thu Hồi Bất Động Sản Của Người Chơi Phá Sản (Bankrupt Asset Recovery & Grayscale HUD)**:
   - Khi một người chơi cạn sạch tiền (`cash <= 0`), toàn bộ các bất động sản và nhà 3D đã xây của người đó lập tức được ngân hàng thu hồi (`owner = null, level = 0`) và mở lại quyền mua cho các người chơi khác, tránh tình trạng đất chết bị khóa vĩnh viễn.
   - Thẻ thông tin (HUD Pod) của người phá sản lập tức chuyển sang chế độ đen trắng mờ (`grayscale opacity-50`) với nhãn đỏ **PHÁ SẢN** rõ ràng.

4. **Đồng Bộ Hoạt Ảnh Tiền Bay (Floating Cash Animation CSS Parity)**:
   - Đồng bộ tên lớp CSS `.animate-mono-floatCash` với keyframe `monoFloatCash`, giúp các con số biến động tiền (`+\$2,000`, `-\$500`, v.v.) thực sự bay bổng lên trên và mờ dần trong 1.4 giây thay vì đứng yên.

5. **Định Dạng Tiền Tệ & Làm Sạch Chuỗi Hiển Thị**:
   - Khắc phục lỗi hiển thị chuỗi `${p.cash...}` dạng raw text trên các góc HUD, chuẩn hóa toàn bộ thành định dạng tiền tệ có dấu phẩy ngăn cách hàng nghìn (`\$19,760`, `\$1,000`).
   - Sửa lỗi cú pháp trong các thông báo Toast và bảng quyết định.

6. **Tích Hợp Nút Chuyển Phối Cảnh 2.5D / 2D Trên Thanh Công Cụ**:
   - Bổ sung nút **[ 📐 2.5D ]** trực tiếp trên thanh công cụ ngữ cảnh đỉnh bàn cờ, cho phép người chơi linh hoạt chuyển đổi giữa góc nhìn Kim Cương 2.5D và góc nhìn 2D phẳng truyền thống mọi lúc.

7. **Trải Nghiệm Thẻ Cơ Hội / Vận Mệnh & Trợ Cấp Sân Bay**:
   - Khi người chơi dừng chân tại ô **CƠ HỘI** hoặc **VẬN MỆNH**, hệ thống bật hộp thoại thông báo chi tiết nội dung may mắn hoặc nộp phạt thay vì chỉ hiện toast ngắn.
   - Khi dừng chân tại ô **SÂN BAY TÂN AN**, người chơi nhận được khoản trợ cấp du lịch hạng thương gia **+\$1,000** tiền mặt.


---

## ⚡ PHẦN 25: KIỂM TOÁN VÀ KHẮC PHỤC LỖI LOGIC NỘI BỘ, LUẬT CHƠI & BẢO VỆ TIẾN TRÌNH VÁN ĐẤU (MONOPOLY LOGIC & MECHANICS AUDIT - V3.7.2)
1. **Khắc Phục Lỗi Thứ Tự Trừ Tiền Thuê (Rent Calculation Order Fix)**:
   - *Lỗi logic cũ*: Trước đây hàm trừ tiền thuê tính `player.cash = Math.max(0, player.cash - rent)` trước rồi mới tính `actualPaid = Math.min(player.cash, rent)`. Khi người chơi chỉ còn \$200 mà tiền thuê là \$500, số tiền của người chơi bị giảm về 0 trước, dẫn đến `actualPaid` bị tính bằng 0. Chủ nợ bị mất trắng khoản tiền \$200 còn lại của người thua.
   - *Đã khắc phục*: Tính toán `actualPaid = Math.min(player.cash, rent)` trước khi khấu trừ. Người thuê trả hết số tiền hiện có, chủ nợ nhận đủ tiền mặt thực tế và người thuê phá sản công bằng.

2. **Chuyển Nhượng Bất Động Sản Phá Sản Cho Chủ Nợ (Creditor Property Inheritance)**:
   - Theo luật Cờ Tỷ Phú quốc tế chuẩn mực: Khi người chơi A phá sản do nộp tiền thuê cho chủ nợ B, toàn bộ các khu đất và nhà 3D của A lập tức được chuyển nhượng quyền sở hữu sang cho B (`owner = B.id`), giúp B mở rộng đế chế. Nếu người chơi phá sản do nộp phạt cho ngân hàng, tài sản mới hoàn trả về ngân hàng.

3. **Luật Đổ Số Đôi Nhận Lượt Đổ Thêm & Phạt Chạy Quá Tốc Độ (Doubles Extra Turn & Speeding Penalty)**:
   - Khi gieo xúc xắc đạt số đôi (`d1 === d2`) lúc không ở tù, người chơi nhận được thông báo **🎲 SỐ ĐÔI! ĐƯỢC ĐỔ THÊM 1 LƯỢT!** và tiếp tục giữ lượt đi kế tiếp.
   - Nếu đổ số đôi liên tiếp 3 lần trong một vòng, người chơi bị lập biên bản vi phạm tốc độ và tống thẳng vào Trại Giam (`pos = 9, inJail = 3`) theo đúng luật nguyên bản.

4. **Tỷ Lệ Tiền Thuê Đa Bến Xe / Nhà Ga (Progressive Transport Rent Scaling)**:
   - Bổ sung công thức tính tiền thuê lũy tiến cho các ô Bến Xe, Bến Cảng, Nhà Ga dựa trên số lượng trạm giao thông mà chủ sở hữu nắm giữ:
     * Sở hữu 1 trạm: Tiền thuê \$400.
     * Sở hữu 2 trạm: Tiền thuê \$800.
     * Sở hữu trọn bộ 3 trạm: Tiền thuê vọt lên \$1,600!

5. **Nộp Bảo Lãnh Bắt Buộc Khi Hết Hạn Tù Lượt Thứ 3**:
   - Khi người chơi đã ở tù hết 3 lượt mà vẫn không gieo được số đôi, hệ thống tự động khấu trừ \$500 tiền bảo lãnh bắt buộc và cho phép người chơi di chuyển số bước đã gieo.

6. **Triệt Tiêu Hoàn Toàn Tiến Trình Chạy Ngầm (Dangling Timers Cleanup)**:
   - Tích hợp hàm `stopMonopolyTimers()` quản lý tập trung `monoState.stepIntervalId` và `monoState.botTimeoutId`.
   - Mỗi khi người chơi bấm nút **[ Ván Mới ]**, đổi số lượng người chơi (2P/3P/4P) hoặc chuyển sang tab game khác (Cờ Vua, Ca-rô, Đua Xúc Xắc), mọi bộ đếm bước đi và thời gian chờ của Bot lập tức bị hủy bỏ, ngăn chặn 100% hiện tượng Bot "ma" tự đổ xúc xắc hay bước cờ chạy chồng chéo giữa các ván.

7. **Bộ Thẻ Cơ Hội & Vận Mệnh Đa Dạng Lore**:
   - Thay thế việc tăng/giảm tiền ngẫu nhiên khô khan bằng kho thẻ bài 16 sự kiện kinh điển (Xổ Số Hoàng Gia, Cổ Tức Ngân Hàng, Tài Trợ Đô Thị, Phạt Quá Tốc Độ, Thừa Kế Gia Tộc, Đấu Thầu Thành Công, v.v.).

8. **Kích Hoạt Âm Thanh (AudioContext Resume) & Thưởng Vàng Hồ Sơ**:
   - Khắc phục chính sách autoplay của trình duyệt bằng cách tự động đánh thức `audioCtx.resume()` khi người chơi tương tác.
   - Khi người chơi chiến thắng ván cờ tỷ phú, tài khoản được tự động cộng **+300 Vàng** vào ví kinh tế chung của Tabletop Arena.

---

### Phần 26: Sửa Triệt Để Lỗi Rò Rỉ Mã Nguồn, Cải Tiến Đột Phá Khả Năng Đọc Tên Ô & Banner Soi Bất Động Sản Trực Tiếp (v3.7.3)

#### 1. Nguyên Nhân Sự Cố & Giải Pháp Kỹ Thuật
1. **Triệt tiêu 100% lỗi rò rỉ mã nguồn (Trailing Debris past `</html>` Fix)**:
   - *Hiện tượng*: Người dùng chụp màn hình (`media_1793012763618_84299903.png`) cho thấy các đoạn mã JavaScript (`updateMonopolyPawns`, `setMonoDialogMode`) bị in lộ trực tiếp dưới chân trang web.
   - *Nguyên nhân*: Do các đợt cập nhật trước đó vô tình để lại đoạn mã dư thừa sau thẻ đóng `</html>`, khiến trình duyệt coi phần đuôi là văn bản HTML thuần và render ra giao diện.
   - *Khắc phục*: Tinh chỉnh cấu trúc tài liệu HTML, cắt bỏ toàn bộ 542KB rác phía sau `</html>`, khôi phục tính toàn vẹn 100% cho cây DOM, xác thực 5/5 thẻ script nội tuyến vượt qua kiểm tra cú pháp của Node VM.

2. **Cải tiến độ rõ nét của tên thành phố trên 36 ô (Typography & Readability Overhaul)**:
   - *Khắc phục cắt ngắn chữ (`...`)*: Loại bỏ hoàn toàn thuộc tính CSS `truncate` vốn làm các tên thành phố tiếng Việt dài như `THANH HÓA`, `QUẢNG NINH`, `THÁI NGUYÊN`, `HẢI DƯƠNG`, `BẮC GIANG`, `LẠNG SƠN` bị co lại thành `THANH...`, `QUẢN...`.
   - *Hỗ trợ xuống dòng tự nhiên 2 dòng*: Thiết lập container kích thước tối thiểu `min-h-[25px] leading-[1.08]` với hộp đen viền sáng sang trọng (`bg-[#050A14]/95 border border-white/25`), chữ in hoa đậm `text-[10px] sm:text-[11px] font-black uppercase text-white drop-shadow`, tạo độ tương phản tối đa trên mọi loại màu sắc ô đất.

3. **Tối ưu góc nghiêng Isometric 2.5D (Perspective Optimization)**:
   - Giảm góc nghiêng trục X từ `rotateX(44deg)` xuống `rotateX(32deg)` và nâng tỷ lệ hiển thị từ `scale(0.85)` lên `scale(0.96)`.
   - Kết quả: Ô cờ cao hơn **20%** theo phương thẳng đứng và lớn hơn **13%** diện tích tổng thể, loại bỏ hoàn toàn hiện tượng dẹt hình học (foreshortening), giúp người chơi đọc tên các tỉnh thành mà không cần phải nghiêng đầu hay phóng to màn hình.
   - Đồng bộ góc phản nghiêng của các mô hình nhà 3D nổi và tiêu điểm quân cờ sang `rotateX(-32deg)` đảm bảo các tòa nhà luôn đứng thẳng tắp hướng về người chơi.

4. **HUD Soi Bất Động Sản Trực Quan Siêu Rõ Nét (`#monoTopTileInspector`)**:
   - Tích hợp một thanh HUD kính mờ chuẩn 2D (`backdrop-blur-md bg-[#090F1E]/95 border-2 border-amber-400/50`) ngự trị phía trên đỉnh bàn cờ.
   - **Tương tác trực tiếp**:
     - Khi người chơi rê chuột vào bất kỳ ô cờ nào (hoặc khi quân cờ di chuyển và hạ cánh vào một ô), thanh HUD lập tức hiển thị chi tiết tên đầy đủ của tỉnh thành, chấm màu đại diện, cấp độ nhà hiện tại, giá mua khu đất và biểu giá tiền thuê tương ứng.
     - Khi rời chuột, HUD tự động hồi quy về thông tin ô đất hiện tại của người chơi đang trong lượt.

---

---

### Phần 27: Khắc Phục Triệt Để Lỗi Click Hộp Quyết Định / Nút Xúc Xắc & Căn Chỉnh Góc Nghiêng Bàn Cờ Chuẩn 30 Độ (v3.7.4)

#### 1. Nguyên Nhân Sự Cố & Phân Tích Kỹ Thuật
1. **Lỗi không bấm được nút "Đồng Ý" / "Bỏ Qua"**:
   - *Nguyên nhân phát hiện qua Telemetry*: Hộp thoại quyết định (`#mono2dDecisionBox`) trước đây đặt lồng bên trong container sân cờ (`#mono2dCentralArena`) có thuộc tính `overflow: hidden` kết hợp phép biến đổi 3D (`transform: rotateZ(-45deg) rotateX(-32deg) translateZ(42px)`).
   - Trên các trình duyệt nhân Blink/Chromium (Chrome/Edge), phép chiếu 3D lồng trong `overflow: hidden` làm vùng bắt sự kiện chuột (hit-testing bounds) bị lệch hoàn toàn khỏi tọa độ hiển thị đồ họa. Kiểm tra `document.elementFromPoint` cho thấy cú click bị phần tử cha `mono2dCentralArena` hấp thụ (`isDirectHit: false`), khiến nút không nhận được lệnh click.
   - *Khắc phục*: Di chuyển toàn bộ `#mono2dDecisionBox` và `#monoEventModalOverlay` ra khỏi khối 3D, đặt làm lớp phủ HUD 2D màn hình phẳng (`z-50 backdrop-blur-sm pointer-events-auto`). Kết quả kiểm tra trực tiếp qua Edge: `isDirectHit: true`, 100% cú click mua đất, nâng cấp nhà và bảo lãnh tù đều phản hồi tức thì.

2. **Khắc phục nút "Đổ Xúc Xắc" khó bấm**:
   - Loại bỏ `overflow-hidden` trên `#mono2dCentralArena`, mở rộng diện tích bấm của nút `#btnMono2dRoll` (`px-8 sm:px-10 py-3 sm:py-3.5`), tích hợp hiệu ứng đổ bóng phát quang `shadow-[0_0_30px_rgba(245,158,11,0.7)]` và gán `pointer-events-auto` trực tiếp.

3. **Căn chỉnh góc nghiêng chuẩn 30 độ (Perspective Tilt 30°)**:
   - Theo phản hồi của người dùng (*"em chỉ cho nghiêng 30 độ thôi nhé 45 độ khó nhìn quá"*), góc xoay kim cương 45 độ (`rotateZ(45deg)`) làm chữ bị nghiêng chéo và phối cảnh bị ép dẹt.
   - Chuyển đổi bàn cờ về phối cảnh 2.5D mặt chính diện với độ nghiêng chính xác 30 độ (`transform: perspective(1400px) rotateX(30deg) rotateZ(0deg) scale(0.96)`):
     - Mọi ô thành phố hàng dưới (`XUẤT PHÁT`, `NINH BÌNH`, `THANH HÓA`, `VINH`, `HÀ TĨNH`, `BẾN XE`, `ĐÔNG HÀ`, `TRẠI GIAM`) đều nằm ngang 100% trước mắt người chơi, đọc chữ từ trái sang phải hoàn toàn tự nhiên.
     - Mô hình nhà 3D nổi và tiêu điểm quân cờ phản nghiêng `rotateX(-30deg) translateZ(28px)` vươn thẳng đứng về phía người xem, tạo cảm giác sa bàn 3D sang trọng, thoáng đãng mà không bị mỏi mắt.

---

### Phần 28: Tinh Chỉnh Phối Cảnh Nghiêng 30 Độ Hơi Chéo Chéo (Gentle Oblique Isometric 25° Slant) & Hoàn Thiện Click & Bàn Đấu (v3.7.5)

#### 1. Phân Tích Yêu Cầu & Nghiên Cứu Hình Học
- **Phản hồi từ người dùng**: *"anh muốn nghiêng 30 độ nma phải hơi chéo chéo á"*.
- **So sánh trực quan các góc độ**:
  - *Góc xoay 0° (`rotateZ: 0deg`)*: Bàn cờ vuông góc chính diện, cạnh đáy nằm ngang hoàn toàn. Góc nhìn phẳng, thiếu đi chiều sâu sa bàn 3D đặc trưng của dòng cờ tỷ phú cao cấp (Monopoly GO / Tabletop Arena).
  - *Góc xoay 45° (`rotateZ: 45deg`)*: Xoay chéo góc cực đại tạo hình thoi/kim cương. Khi nhìn phối cảnh 3D bị kéo dài trục chéo, tên các ô nghiêng 45° khiến người chơi phải nghiêng đầu để đọc chữ và chiếm nhiều chiều dọc.
  - *Góc xoay 25° (`rotateZ: 25deg`)* với độ nghiêng 30° (`rotateX: 30deg`): **Điểm cân bằng vàng**. Bàn cờ có độ xiên chéo thanh thoát ("hơi chéo chéo"), tạo cảm giác không gian bàn chơi 2.5D chân thực và đẳng cấp; đồng thời góc nghiêng 25° đủ nhẹ để toàn bộ typography tên tỉnh thành vẫn gần như nằm ngang, dễ đọc lướt mà không gây mỏi mắt.

#### 2. Kích Thước Bàn Cờ & Bố Cục Không Gian (Scale & Bounding Box)
- Khi bàn cờ xoay xiên 25°, đường chéo mở rộng kích thước bao (bounding box).
- Thiết lập tỉ lệ hiển thị `scale(0.82)` (`transform: perspective(1400px) rotateX(30deg) rotateZ(25deg) scale(0.82)`):
  - Đảm bảo trọn vẹn 100% cả 4 đỉnh bàn cờ nằm gọn gàng bên trong vùng nhìn (viewport):
    - **Ô 0 (Xuất Phát)**: Đỉnh đáy bàn cờ, hiển thị đầy đủ, không bị che khuất bởi mép dưới trình duyệt hay thẻ người chơi.
    - **Ô 9 (Trại Giam)**: Đỉnh trái bàn cờ, thoáng đãng cạnh Pod P3.
    - **Ô 18 (Tân An / Sân Bay)**: Đỉnh trên bàn cờ, nằm bên dưới thanh HUD Inspector.
    - **Ô 27 (Vô Tù)**: Đỉnh phải bàn cờ, thoáng đãng cạnh Pod P2.
  - 4 quân cờ P1-P4 (Tiên, Cáo AI, Hổ AI, Gấu Trúc AI) tập kết chuẩn xác trên ô Xuất Phát (ô 0) tại thời điểm khởi tạo bàn cờ.

#### 3. Phản Xoay Đồng Bộ Chi Tiết 3D Nổi (Counter-Rotation)
- **Mô hình nhà & khách sạn 3D**: Thừa hưởng quy tắc CSS `.mono-board-25d .mono-upright-3d` phản xoay `rotateZ(-25deg) rotateX(-30deg) translateZ(28px)`, luôn đứng thẳng đứng theo trọng lực màn hình.
- **Quân cờ & Đèn định vị lượt đi (Overhead Turn Beacon)**: Phản xoay `rotateZ(-25deg) rotateX(-30deg) translateZ(28px)`, đèn rọi kim cương nhấp nháy chỉ đúng đầu nhân vật.
- **Hộp xí ngầu & Nút "Đổ Xúc Xắc"**: Thiết lập `transform: rotateZ(-25deg) rotateX(-30deg) translateZ(35px)`, nằm chính diện mặt người chơi, phẳng và nổi bật trên mặt sân cỏ trung tâm.

#### 4. Đo Đạc Tương Tác & Kiểm Thử Tự Động (Telemetry & Flow Verification)
- **Hit-Testing 100%**:
  - `document.elementFromPoint` tại tọa độ nút "Đồng Ý (Mua & Xây)" trả về trực tiếp `BUTTON#btnMonoDialogYes` (`isDirectHit: true`).
  - Hộp thoại quyết định và modal sự kiện nằm ở lớp HUD 2D màn hình (`z-50 backdrop-blur-sm pointer-events-auto`), không còn bị nuốt click bởi các thẻ 3D lồng ghép.
- **End-to-End User Flow**:
  - Lắc xúc xắc -> Quân cờ di chuyển mượt mà từng ô -> Dừng chân tại ô đất trống -> Modal mua đất mở ra -> Nhấn "Đồng Ý" -> Tiền trừ chính xác, đất chuyển quyền sở hữu, mô hình nhà 3D dựng đứng trên ô cờ -> Modal chúc mừng xuất hiện -> Đóng modal tiếp tục lượt chơi thành công 100%.

---

### Phần 29: Nâng Cấp Hệ Thống Đổ Xúc Xắc Trung Tâm Đa Điểm Chạm & Triệt Tiêu Lỗi Khó Bấm (v3.7.6)

#### 1. Nguyên Nhân Sự Cố & Phân Tích Kỹ Thuật Chuyên Sâu
- **Vấn đề người dùng phản ánh**: *"nút đổ xúc xắc vẫn khó bấm lắm"*.
- **Kết quả đo đạc Telemetry (`document.elementFromPoint`)**:
  - Khi nút Đổ xúc xắc nằm lồng bên trong container sân cỏ trung tâm (`#mono2dCentralArena`) chịu ma trận biến đổi 3D của `#mono2dBoardWrapper` (`perspective(1400px) rotateX(30deg) rotateZ(25deg)`):
  - Do hiệu ứng chiếu góc nghiêng 3D, phần đáy của nút bị tụt về phía sau mặt phẳng tọa độ $Z$, dẫn tới **hơn 75% diện tích bề mặt nút bị container cha `mono2dCentralArena` che phủ/hấp thụ sự kiện click chuột** (tỉ lệ trúng chỉ đạt ~24%).
  - Người chơi buộc phải rê chuột trúng 24% mép trên cùng của nút thì mới kích hoạt được lệnh đổ; nếu bấm vào giữa nút hoặc nửa dưới nút, trình duyệt coi như click vào sân cỏ, hoàn toàn không có phản hồi.

#### 2. Kiến Trúc Trung Tâm Điều Khiển 2D Screen-Space (`#monoCenterControls`)
- **Tách lớp hoàn toàn khỏi ma trận 3D**:
  - Chuyển toàn bộ cụm điều khiển xí ngầu và nút bấm ra ngoài `#mono2dBoardWrapper`, đặt trong lớp phủ Screen-space 2D (`#monoCenterControls` với `z-30 pointer-events-none`).
  - Cụm điều khiển được căn chính giữa (`absolute inset-0 flex items-center justify-center`) trùng khớp tuyệt đối với tâm sân cỏ sa bàn trên mọi độ phân giải.
  - Tỉ lệ bắt điểm chuột (**Hit-Rate**) trên nút bấm tăng vọt từ 24% lên **100.0% Direct Hit** trên toàn bộ diện tích nút!

#### 3. Bổ Sung Đa Phương Thức Kích Hoạt (Multi-Trigger Architecture)
Để việc đổ xúc xắc trở nên tiện lợi tối đa, hệ thống hỗ trợ 4 cách gieo xúc xắc đồng thời:
1. **Nút bấm phong cách Arcade 3D tactile (`#btnMono2dRoll`)**:
   - Mở rộng vùng bấm lớn (`px-8 sm:px-12 py-3.5 sm:py-4`), hiệu ứng nổi 3D (`shadow-[0_8px_0_#b45309]`), đổ bóng phát quang ánh vàng rực rỡ.
   - Khi nhấn chuột: nút thụt xuống cơ học (`active:translate-y-1 active:shadow-[0_2px_0_#b45309]`), triệt tiêu độ trễ 300ms trên màn hình cảm ứng bằng `touch-action: manipulation`.
2. **Khay xí ngầu trực tiếp (`#monoDiceTrayBox`)**:
   - Người chơi có thể bấm trực tiếp vào 2 viên xí ngầu đỏ sang trọng ở phía trên nút để gieo hạt xí ngầu.
3. **Chạm vào toàn bộ sân cỏ trung tâm (`#mono2dCentralArena`)**:
   - Click vào bất kỳ vị trí nào trên vùng sân cỏ rộng $400 \times 400\text{px}$ để gieo xí ngầu (khi đến lượt người chơi).
4. **Phím tắt Bàn phím (Spacebar / Enter)**:
   - Nhấn phím `Space` (Cách) hoặc `Enter` trên bàn phím máy tính để đổ xúc xắc ngay tức khắc mà không cần dùng chuột.

---

### Phần 30: Hoạt Ảnh Máy Bay Dịch Chuyển & Chuyển Tiền Tương Tác Vào Ngân Hàng / Đối Thủ (v3.8.0)

#### 1. Hoạt Ảnh Máy Bay Dịch Chuyển (Commercial Jet Airplane Flyby)
- **Cơ chế kích hoạt**: Khi bất kỳ người chơi nào (Human hoặc Bot) dừng chân tại ô **Sân Bay / Dịch Chuyển (Tile 18)**.
- **Thiết kế đồ họa & Hiệu ứng (Dựa theo ảnh tham chiếu số 1)**:
  - Máy bay phản lực thương mại cỡ lớn (Commercial Jet Airliner) với phối màu Đỏ - Trắng thể thao:
    - Thân máy bay khí động học thuôn dài màu trắng tuyết viền bóng chrome.
    - Sọc đỏ thể thao (Livery Red Stripe) chạy dọc sống lưng từ đầu mũi đến cánh đuôi đứng.
    - Buồng lái kính sapphire xanh đậm chống lóa.
    - Cánh lớn vát chéo gắn 4 động cơ phản lực cánh quạt (Turbofan Jet Engines) có viền đỏ nacelle.
    - Cụm vệt khói phản lực động cơ (Jet Vapor Contrails) xả dài phía sau.
  - Đường băng trung tâm (Runway Strip) với vạch kẻ tim đường vàng phản quang.
  - **Banner thông báo hành trình**:
    - `✈️ CHUYẾN BAY DỊCH CHUYỂN: Bạn đang bay đến ô [Tên ô đích].`
  - **Âm thanh**: Mô phỏng tiếng động cơ phản lực rít gió gầm rú (`playAirplaneSound()`).
  - **Di chuyển quân cờ**: Sau khi máy bay lướt qua, quân cờ nhân vật tự động bay/đáp xuống ô đích và kích hoạt sự kiện ô đích.

#### 2. Hoạt Ảnh Chồng Tiền Bay Vào Ngân Hàng / Đối Thủ (Dynamic Cash Transfer)
- **Cơ chế kích hoạt**:
  1. Khi người chơi **Mua đất** hoặc **Nâng cấp nhà** từ Ngân Hàng.
  2. Khi người chơi **Trả tiền thuê đất** cho đối thủ sở hữu ô đất.
- **Quy tắc phân rã mệnh giá tiền thông minh (Denomination Breakdown)**:
  - Dựa trên chính xác số tiền giao dịch:
    - **Cọc tiền Dollar ($1,000 / cọc)**: Các thếp tiền USD 3D xanh lá cây, quấn đai nẹp xanh neon, xếp chồng nổi khối isometric. (Ví dụ: $3,150 -> 3 cọc dollar).
    - **Cột xu vàng ($100 / xu)**: Các đồng xu vàng kim loại óng ánh có khía cạnh và ký hiệu $. (Ví dụ: $3,150 -> 1 xu vàng).
    - **Cột xu bạc ($50 / xu)**: Các đồng xu bạc kim loại sáng bóng chrome. (Ví dụ: $3,150 -> 1 xu bạc).
    - Hiển thị nhãn chi tiết: `3 Cọc ($3,000)`, `1 Vàng ($100)`, `1 Bạc ($50)`.
- **Tòa nhà Ngân Hàng Cổ Điển La Mã (The Classical Bank)**:
  - Vẽ chuẩn vector SVG phỏng theo ảnh tham chiếu số 2:
    - Mái tam giác cổ điển có biển hiệu `BANK` dập nổi chữ vàng.
    - 4 cột thức đá cẩm thạch trắng (Doric/Ionic columns) với bệ đầu cột và chân cột chạm trổ.
    - Cửa vòm hầm vàng và bậc thang đá nền tảng 3 tầng.
- **Hiệu ứng chuyển động (Flight Arc Animation)**:
  - Chồng tiền xuất phát từ Avatar người trả bên trái, bay lướt theo đường cong Bezier mềm mại sang bên phải rồi chui vào cổng Ngân Hàng hoặc rơi vào túi đối thủ.
  - Ngân hàng / Thẻ đối thủ nhấp nháy ánh vàng tiếp nhận (`mono-recipient-pulsing`).
  - Âm thanh đếm tiền xào xạc kết hợp tiếng leng keng kim loại vàng bạc.

---

### Phần 31: Nghiệm Thu Kỹ Thuật v3.8.5 — Sập Cửa Sắt Trại Giam & Bộ Mô Hình Nhà 3D Isometric Chuẩn Business Tour

#### 1. Bối cảnh & Mục tiêu Nâng cấp
- **Triển khai chuẩn quy trình**: Kích hoạt **Argon-Flash Orchestrator** (Gemini 4 Argon làm Tổng công trình sư thiết kế kiến trúc, Gemini 3.8 Flash làm Kỹ sư thực thi code & kiểm chứng).
- **Khắc phục triệt để**:
  1. Rà soát nguyên nhân người dùng chưa thấy hoạt ảnh tiền và máy bay ở v3.8.0 (do bot mua/nâng cấp và trả tiền thuê chưa được gắn trigger hoạt ảnh).
  2. Bổ sung hiệu ứng **Cánh Cửa Sắt Nhà Tù Sập Xuống (Jail Gate Slam Animation)** kèm âm thanh kim loại va đập đanh thép và ổ khóa đại bàng bấm chặt.
  3. Thay thế toàn bộ mô hình nhà cũ bằng **Bộ Mô Hình Nhà 3D Isometric Chuẩn Business Tour** (theo ảnh tham khảo `media_1793024677897_7df0f6ec.jpg`).
  4. Bổ sung nút bấm tương tác **"✈️ Bay Thử"** ngay trên thanh soi chi tiết ô Sân Bay Tân An (Tile 18) giúp người dùng kích hoạt xem máy bay bất cứ lúc nào.

#### 2. Chi tiết Kỹ thuật Tính năng v3.8.5

##### A. Hiệu Ứng Cánh Cửa Sắt Nhà Tù Sập Xuống (`#monoJailGateOverlay`)
- **Kích hoạt tự động khi**:
  - Dừng chân đúng vào **Ô 27: VÔ TÙ (GOTOJAIL)**.
  - Gieo số đôi 3 lần liên tiếp trong một lượt (**Bị phạt quá tốc độ - Speeding penalty**).
- **Cấu trúc thị giác**:
  - Hai cánh cửa sắt dày đan song song (`#monoJailGateLeft` và `#monoJailGateRight`) với các thanh thép titan phản quang chạy dọc và 3 dải giằng thép ngang chịu lực.
  - Hai cánh cửa trượt tốc độ cao từ hai mép màn hình vào giữa và va đập sầm với rung chấn màn hình (`monoGateScreenShake`).
  - Ổ khóa vàng đại bàng khổng lồ (`#monoJailPadlock`) thả từ trên xuống bấm khóa chặt 2 cánh cửa.
  - Biển cảnh báo Neon phát quang: *"TRẠI GIAM HOÀNG GIA - CÁNH CỬA SẮT ĐÃ SẬP XUỐNG!"*.
- **Âm thanh tổng hợp Web Audio API**:
  - Tiếng kim loại trượt xích (`160Hz sawtooth`).
  - Tiếng va đập sập cửa sắt cực mạnh (`110Hz sawtooth` + `720Hz square`).
  - Tiếng ổ khóa bập lại giòn giã (`1280Hz sine`).

##### B. Bộ Mô Hình Nhà 3D Isometric Chuẩn "Business Tour"
Thiết kế vector SVG đa tầng sắc nét, đồng bộ màu sắc nhận diện của từng kỳ thủ:
1. **Cấp 1 - Nhà Vườn Nghỉ Dưỡng (Cottage Lv.1)**:
   - Đế cỏ xanh tự nhiên vát cạnh 3D.
   - Tường thạch cao trắng phong cách low-poly vát cạnh.
   - Cửa gỗ sồi tay nắm vàng, cửa sổ kính màu xanh phản chiếu bầu trời.
   - Ống khói gạch nung cổ điển với từng làn khói tròn lượn lờ bốc lên.
   - Mái dốc chữ A đôi màu theo màu đại diện của người chơi.
2. **Cấp 2 - Biệt Thự Nghỉ Dưỡng Song Lập 2 Tầng (Duplex Resort Villa Lv.2)**:
   - Đế lát sân đá hoa cương granite sang trọng.
   - Nhà 2 tầng bề thế với ban công tầng trên có lan can trắng.
   - Cổng vòm đón khách, hệ thống cửa sổ kính sáng đèn ấm áp.
   - Mái ngói đa tầng màu người chơi, đỉnh mái gắn chong chóng gió mạ vàng.
3. **Cấp 3 - Tổ Hợp Khách Sạn Chọc Trời (Skyscraper Hotel Tower Lv.3 - Landmark)**:
   - Đế móng bê tông cốt thép chịu lực cao cấp.
   - Tháp cao tầng phong cách hiện đại với các dải kính phản quang xanh cyan, lưới cửa sổ phát sáng lộng lẫy về đêm.
   - Biển hiệu vàng Neon "HOTEL" ngay trên mái hiên tầng trệt.
   - Tầng thượng tích hợp sân bay trực thăng hình tròn với chữ "H" nổi bật, cột cờ tung bay.
- **Cơ chế chống nghiêng 2.5D**: Áp dụng class `.mono-upright-3d` giúp công trình luôn đứng thẳng tắp 90° trên mặt bàn cờ nghiêng 30°.

##### C. Mạng Lưới Kích Hoạt Hoạt Ảnh Toàn Diện
- **Hoạt ảnh chuyển tiền (`triggerMonoCashTransfer`)**:
  - Người chơi mua đất -> Tiền bay vào Ngân Hàng.
  - Người chơi nâng cấp nhà -> Tiền bay vào Ngân Hàng.
  - BOT mua đất -> Tiền bay vào Ngân Hàng.
  - BOT nâng cấp nhà -> Tiền bay vào Ngân Hàng.
  - Trả tiền thuê đất (Người trả BOT, BOT trả BOT, BOT trả Người) -> Tiền bay trực tiếp vào túi đối thủ.
- **Hoạt ảnh máy bay (`triggerMonoAirplaneFlyby`)**:
  - Kích hoạt khi đáp xuống ô Sân Bay Tân An (Tile 18).
  - Tích hợp nút **"✈️ Bay Thử"** ngay trong bảng soi chi tiết ô đất giúp xem nhanh bất cứ lúc nào.

#### 3. Kiểm Chứng Chất Lượng & Parity
- **Edge Headless Screenshots**:
  - `verify_v385_board_houses.png`: Bàn cờ 2.5D hiển thị đầy đủ nhà Cấp 1, Cấp 2, Cấp 3 và nút Bay Thử.
  - `verify_v385_jail_slam.png`: Cánh cửa sắt nhà tù sập xuống kèm ổ khóa khóa chặt.
  - `verify_v385_airplane.png`: Máy bay phản lực thương mại bay qua sân bay.
  - `verify_v385_cash.png`: Chồng tiền $3,150 (3 cọc USD, 1 xu vàng, 1 xu bạc) bay vào Ngân Hàng.
- **SHA256 Parity**: 100% khớp bit giữa 3 tệp nguồn và bản phân phối Download.


---

## Part 32: Business Tour 2.5D Complete Overhaul — Buildings, Figurines, Economy & Takeover (`v3.9.0`)

### 1. Architectural Overview (`argon-flash-orchestrator`)
- **2.5D Multi-Building Compounds & Beach Resorts (`getBusinessTourHouseSVG`)**:
  - Modeled directly on the *Business Tour* 2.5D isometric aesthetic: every property sits on a bright green lawn plinth (`#84cc16`) framed by a white stone curb (`#ffffff` / `#e2e8f0`) with 3D trees and high-contrast navy window grids (`#0f172a`).
  - **Level 1**: Suburban house with white isometric walls, vibrant player-colored pitched gable roof, chimney, and garden tree.
  - **Level 2**: Two-story villa + side annex cottage compound on a landscaped turf plot.
  - **Level 3 (Landmark Complex)**: Tall multi-story high-rise skyscraper + luxury villa wing with player-colored crown and compact level badge (`[1]`, `[2]`, `[3]`).
  - **Beach Resorts**: Sandy island plot surrounded by turquoise water, resort bungalow, and tropical palm tree (`Bãi Biển Bali`, `Vịnh Hạ Long`, `Đảo Phú Quốc`).
- **2.5D Full-Body Standing Character Figurines & Corner Hero Portraits (`getBusinessTourCharacterSVG`, `getBusinessTourCornerPortraitSVG`)**:
  - Replaced flat circular emoji tokens with standing 2.5D full-body figurines (tailored suits, shirts, ties, arms, legs, shoes, expressive faces, and character-specific headgear/hood/horns) standing on glowing 3D pedestals with overhead roll badges.
  - Added 4 large corner character portraits (`Nữ Sát Thủ Đỏ`, `Bạch Kỳ Lân`, `Hỏa Long Vương`, `Tổng Tài Áo Xanh`) and 4 dynamic 3D cash & silver bullion piles (`getSideCashAndIngotPileSVG`) flanking the board.
- **Fast-Paced Business Tour Economy & Hostile Takeover Engine**:
  - Rebalanced starting capital to `$3,500`, Start salary to `+$400`, property prices (`$120–$650`), and steep multi-tier rents (`58%` to `320%` of base price) with `x1.5` Color Monopoly and `x2` Festival Arch (`getFestivalArchSVG`) multipliers.
  - Added **Hostile Takeover (`takeover` mode)**: landing on an opponent's Level 1 or Level 2 city allows buying out the property outright after paying rent.
  - Added **4 Fast-Win Conditions**: First Bankruptcy Knock-out, 3/3 Beach Resort Monopoly, `$8,500` Net Worth Target, or Round 15 Leader.


---

## Part 33: 3D Canvas Money Bag & Gold Coin Towers, 60fps GPU Animation, and 44-Tile (12x12) Expanded Board (`v3.9.2`)

### 1. 3D White Canvas Money Sack & Gold Coin Towers (`getMoneyBagAndGoldCoinsSVG`)
- Modeled directly on the user's reference image (`media_1793028915317_3ea181a6.png`):
  - **Plump 3D White Canvas Sack**: Soft radial-shaded white canvas bag with ruffled collar folds, golden-brown triple-wrapped rope cord with side loops, olive-gold `$` emblem printed on the front, and crisp green dollar bills peeking out of the top.
  - **Ascending Gold Coin Towers & Leaning Embossed Coins**: 3 ascending cylindrical stacks of metallic gold coins on the left plus 4 angled/leaning `$` embossed gold coins resting against the base.
  - Deployed both at the **4 board corners** (`#monoSideCashPile_0..3`) and inside the **flying cash transfer animation** (`renderCashStackHTML`).

### 2. 60fps GPU Hardware-Accelerated Motion (`monoCashFlightArc60fps`, `monoPawnHop60fps`)
- Eliminated layout-thrashing `left`/`top` keyframe animations in favor of pure GPU `translate3d(...) scale3d(...)` compositing with `will-change: transform, opacity` and `backface-visibility: hidden` for zero-jank 60fps transitions.
- Added smooth 60fps character hop animation (`.mono-pawn-hopping`) on each tile step.

### 3. Expanded 44-Tile (12x12 Grid) Board (+2 Tiles Per Edge)
- Upgraded `#mono2dBoardWrapper` from `10x10` (36 tiles) to `12x12` (**44 perimeter tiles** = **+2 tiles per edge**), expanding `#mono2dCentralArena` to `col-start-2 col-end-12 row-start-2 row-end-12`.
- Added 8 new cities and resorts across the 4 edges: **Cà Mau, Bạc Liêu, Huế, Đà Lạt, Đà Nẵng, Sapa, Côn Đảo Resort, Vĩnh Phúc, Bắc Ninh**.


---

## Part 34: Business Tour 2.5D Complete Polish & Asset Management Engine (`v3.9.5`)

### 1. Architectural Highlights (`argon-flash-orchestrator`)
- **Loại Bỏ Hoàn Toàn Cơ Chế & Đồ Họa `x2 LỄ HỘI`**:
  - Gỡ bỏ hoàn toàn cổng vòm màu vàng `getFestivalArchSVG()`, biến `monoState.festivalTileId`, thẻ `Lễ Hội Du Lịch (x2)`, và hệ số nhân lễ hội trong `getMonoTileRent()`.
  - Thay thế bằng thẻ sự kiện tích cực `Quảng Bá Du Lịch (+$300)` và giữ bàn cờ thông thoáng, tập trung 100% vào các công trình 2.5D.

- **Mô Hình Nhà Ngục Tháp Canh Song Sắt 3D Trại Giam (`getPrisonCornerSVG()`)**:
  - Thay thế biểu tượng Ô #11 Đảo Hoang (`LOST ISLAND`, `🏝️`) bằng **`TRẠI GIAM`** với mô hình kiến trúc Nhà Ngục 2.5D chân thực:
    - Nền đá tảng kiên cố xám đen (`#1e293b`, `#0f172a`).
    - Khối tháp pháo canh gác màu đỏ thẫm có lỗ châu mai và đèn báo động an ninh đỏ rực nhấp nháy trên đỉnh.
    - Cổng buồng giam tối với hàng song sắt đúc đặc (`#475569` → `#e2e8f0` metallic highlight) đan dọc ngang cùng ổ khóa thép vàng kiên cố.
    - Nhãn dán đỏ nổi bật `TRẠI GIAM`.

- **Căn Giữa Mô Hình Nhà 2.5D Nằm Gọn 100% Trong Lòng Ô Đất**:
  - Sửa lỗi sử dụng `absolute -top-7` và `translateZ(28px)` khiến mô hình bị trồi lệch sang ô bên cạnh trên mặt phẳng xoay 2.5D (`rotateX(30deg) rotateZ(25deg)`).
  - Thiết lập class chuyên dụng `.mono-tile-building-3d` kết hợp `transform: rotateZ(-25deg) rotateX(-30deg) translateZ(4px); transform-origin: 50% 55%;` và neo tâm tuyệt đối (`inset-0 flex items-center justify-center`).
  - Tỷ lệ kích thước chuẩn từ 40px–46px, đảm bảo nhà Cấp 1, Cấp 2, Cấp 3 và Resort nằm gọn 100% trong đường biên ô đất kèm huy hiệu cấp độ nhỏ gọn `[1]`, `[2]`, `[3]`, `[R]`.

- **Chồng Tiền 3D Biến Đổi Động Theo Mệnh Giá Tài Sản (`getDynamicWealthPileSVG` & `renderCashStackHTML`)**:
  - **Quy tắc chuyển hóa tự động**: `1 Bao Tiền = $1,000`, `1 Đồng Xu Vàng = $100`. Khi tích lũy đủ 10 đồng xu vàng (+$1,000), hệ thống tự động gom thành +1 Bao Tiền trắng in logo `$`.
  - **Chồng tiền 4 góc sân đấu**: Hiển thị linh hoạt số bao tiền (`Math.floor(cash / 1000)`) xếp so le cùng các cột đồng xu vàng (`Math.floor((cash % 1000) / 100)`) và huy hiệu thông tin chi tiết: `3 Bao • 5 Xu Vàng` (tương ứng $3,500 vốn khởi nghiệp).
  - **Hiệu ứng chuyển tiền bay 60fps**: Tách bạch chính xác số lượng **Bao Tiền Trắng ($1,000)**, **Đồng Xu Vàng ($100)**, và **Đồng Xu Bạc ($25)** bay mượt mà vào Ngân Hàng hoặc Đối Thủ.

- **Hệ Thống Quản Lý Tài Sản Toàn Diện (Asset Management System)**:
  - **Modal Quản Lý Bất Động Sản (`#monoAssetManagerModal`)**: Mở nhanh qua nút `🏦 Thế Chấp / Bán Nhà` ở cụm điều khiển trung tâm hoặc click trực tiếp vào ô đất thuộc quyền sở hữu.
  - **Bán Nhà (`sellMonoHouse` / `🏚️ Bán Nhà`))**: Hạ cấp nhà (`Lv.3 → Lv.2 → Lv.1`), hoàn lại **50% chi phí nâng cấp** từ Ngân Hàng.
  - **Thế Chấp Đất (`mortgageMonoTile` / `🏦 Thế Chấp`))**: Áp dụng khi đất đã bán hết nhà; thế chấp cho Ngân Hàng nhận ngay **50% giá đất** (`isMortgaged = true`, gắn biển `THẾ CHẤP` đỏ, miễn thu tiền thuê khi đối thủ dẫm vào).
  - **Chuộc Đất (`unmortgageMonoTile` / `🔓 Chuộc Đất`))**: Chuộc lại bất động sản với mức phí **55%** (50% gốc + 10% phí ngân hàng).
  - **Tự Động Cứu Nguy Nợ & Bảng Phá Sản (`confirmEmergencyDebtPayment`, `triggerManualBankruptcy`)**:
    - Khi người chơi dẫm vào ô đối thủ mà thiếu tiền mặt, hệ thống tự động tính toán tổng năng lực thanh lý (tiền mặt + 50% tiền bán nhà + 50% tiền thế chấp).
    - Nếu đủ năng lực: Tự động kích hoạt Bảng Cứu Nguy Nợ để người chơi bán nhà/thế chấp gom đủ tiền trả nợ, tránh bị xử thua oan uổng.
    - Đối với Bot AI: Tự động thanh lý nhà cấp cao và thế chấp tài sản để thanh toán tiền thuê mượt mà.
    - Cung cấp nút `🏳️ Phá Sản` chủ động khi kỳ thủ muốn đầu hàng danh dự.

### v4.0.0 (2026-10-27) - Chuẩn Hóa Màn Hình 16:9 Widescreen & Tính Năng Toàn Màn Hình (Fullscreen Theater Mode)

- **Tính Năng Toàn Màn Hình (Fullscreen Theater Mode API & Phím Tắt)**:
  - **Tích Hợp HTML5 Fullscreen API Đa Nền Tảng**:
    - Gọi chuẩn `requestFullscreen` (kèm vendor prefix fallbacks `webkitRequestFullscreen`, `msRequestFullscreen`) và `exitFullscreen`.
    - Tích hợp nút **`⛶ Toàn Màn Hình`** tại thanh điều khiển Monopoly phía trên (`#btnMonoFullscreenHeader`) và nút icon **`⛶`** trực tiếp trên bảng điểm điện tử trung tâm bàn cờ (`#btnMonoFullscreenArena`).
  - **Chế Độ Rạp Chiếu Phim (Theater Mode Class `.mono-fullscreen-active`)**:
    - Khi kích hoạt Fullscreen, website tự động ẩn sạch sẽ Header Navbar, Footer, Banner bảo trì, và Bảng điều khiển trận đấu để dành trọn vẹn 100vw × 100vh cho bàn đấu cờ tỷ phú.
    - Nền Radial Gradient siêu thực sâu thẳm (`#0d192e` → `#050a14` → `#020408`) tạo cảm giác như ngồi trước đấu trường chuyên nghiệp eSports.
  - **Nút Thoát Nổi & Bàn Phím Tắt Tiện Lợi**:
    - Nút thoát nổi góc trên bên phải: **`✕ Thu Nhỏ (Esc)`** (`#btnMonoExitFullscreen`), tự động căn chỉnh khoảng cách an toàn với thẻ người chơi góc trên.
    - Hỗ trợ phím tắt bàn phím: Nhấn phím **`F`** để bật/tắt toàn màn hình nhanh; nhấn **`Esc`** để thu nhỏ về giao diện thường.
    - Lắng nghe sự kiện hệ thống `fullscreenchange` và `webkitfullscreenchange` để đồng bộ tức thì trạng thái nút bấm khi người dùng nhấn Esc của trình duyệt.
    - Hỗ trợ mở trực tiếp toàn màn hình qua URL: `?game=monopoly&fullscreen=1`.

- **Kiến Trúc Bố Cục Chuẩn 16:9 Widescreen (Zero-Scroll Guarantee - 100% Khớp Trong 1 Màn Hình)**:
  - **Khắc phục triệt để lỗi cuộn dọc (Zero-Scroll)**:
    - Loại bỏ hoàn toàn thanh cuộn dọc khi chơi Cờ Tỷ Phú (`body.mono-view-active { overflow-y: hidden !important; }`).
    - Tính toán chiều cao khả dụng chính xác cho `#monopolyView`: `height: calc(100vh - 215px); min-height: 480px; max-height: 880px; overflow: hidden;`.
    - Sửa lỗi thẻ `#arenaMatchConsole` không đóng thẻ `</div>`, giúp thanh công cụ trở về chiều cao thanh mảnh 50px thay vì phình to 973px đè nén bàn cờ.
  - **Co Giãn Bàn Cờ Động Theo Tỷ Lệ Chiều Dọc (`Dynamic Height-Bounded Scaling`)**:
    - Bàn cờ 12×12 (`#mono2dBoardWrapper`) co giãn động theo công thức: `width: min(58vh, 44vw, 620px); height: min(58vh, 44vw, 620px); aspect-ratio: 1 / 1;` (trong Fullscreen: `min(74vh, 52vw, 760px)`).
    - Nhờ góc nghiêng 2.5D Isometric (`rotateX(30deg) rotateZ(25deg) scale(0.82)`), chiều cao thực của khối kim cương chỉ chiếm ~380px–420px, để lại khoảng đệm an toàn rộng rãi phía trên cho HUD Inspector và phía dưới cho 2 thẻ người chơi P2 & P3.
  - **Hệ Thống Cánh 2 Bên Cân Đối 16:9 (Symmetrical 16:9 Side Wings)**:
    - 4 góc người chơi (`#monoCornerPod_0..3`) được phân bổ theo 2 cánh cân xứng: Cánh Trái (P0 Tiên & P2 Rồng Lửa) và Cánh Phải (P1 Kỳ Lân & P3 Tổng Tài) ôm sát bàn cờ (`lg:left-8 xl:left-14`, `lg:right-8 xl:right-14`), không bị dạt ra quá xa mép màn hình.
    - 4 Chồng tiền 3D biến đổi động (`#monoSideCashPile_0..3`) nằm đồng bộ bên cạnh thẻ người chơi (`top-[16%]` / `bottom-[15%]`), tạo nên bố cục 16:9 hài hòa, sang trọng và chuẩn game AAA.

### v4.0.5 (2026-10-27) - Xúc Xắc 3D Đen Bóng Chấm Trắng (3D Obsidian Pip Dice) & Nhịp Điệu Xoay Hồi Hộp 3 Giai Đoạn

- **Khối Lập Phương Xúc Xắc 3D 6 Mặt Chấm Trắng (`preserve-3d` Glossy Obsidian Pip Cubes)**:
  - Thay thế hoàn toàn 2 ô số phẳng bằng **2 khối lập phương 3D 6 mặt thật (`#monoDieCube1`, `#monoDieCube2`)** thiết kế theo mẫu xúc xắc đen bóng gương (`#04070e` → `#293548`), viền kính phản quang ánh bạc (`.mono-die-face::before`) và **các chấm tròn trắng phát sáng (`.mono-pip`)** bố trí chuẩn xác trên lưới 3×3 từ 1 chấm đến 6 chấm.
  - Bổ sung lõi đặc `.mono-die-core` bên trong khối lập phương để khi xoay 3D ở mọi góc nghiêng luôn giữ độ đặc khối sắc nét.

- **Nhịp Điệu Lăn Xúc Xắc Hồi Hộp 3 Giai Đoạn (`animateMono3DDiceRoll` - Loại Bỏ Nháy Số Lộ Kết Quả)**:
  - **Giai đoạn 1 — Tung Xúc Xắc & Xoay Đa Trục 3D (~920ms ở tốc độ 1x)**:
    - Khi bấm **ĐỔ XÚC XẮC** (hoặc phím `Space`), 2 viên xúc xắc bật nhảy lên không trung (`.mono-die-bouncing`) và xoay lộn nhào 3–4 vòng đa trục (`1080°–1440°` trên trục X, Y, Z) kèm hào quang **Cyan Electric Aura (`.mono-tray-rolling-aura`)** rực sáng quanh khay.
    - Trong suốt lúc xúc xắc đang xoay, ô `Tổng` chuyển sang trạng thái chờ hồi hộp `ĐANG LĂN •••` (tuyệt đối không nháy số hay lộ kết quả trước).
    - Phát chuỗi âm thanh xúc xắc va chạm giảm tốc dần (`playMonoDiceTumbleSFX`).
  - **Giai đoạn 2 — Hạ Cánh & Khóa Mặt Chấm (~240ms)**:
    - Hai khối lập phương giảm tốc mượt mà theo đường cong vật lý `cubic-bezier(0.15, 0.88, 0.28, 1.08)`, dừng chuẩn xác tại góc nghiêng 3D Isometric của mặt chấm `d1` và `d2`.
    - Khay xúc xắc lóe sáng (`.mono-tray-impact`), phát âm thanh chốt điểm đanh gọn và lúc này mới bung số `Tổng` (kèm hiệu ứng `⚡ ĐÔI!` nếu đổ đôi).
  - **Giai đoạn 3 — Nhân Vật Bắt Đầu Nhảy Ô**:
    - Sau nhịp nghỉ ngắn 240ms để người chơi chiêm ngưỡng mặt chấm vừa dừng lại, nhân vật mới bắt đầu di chuyển từng bước trên bàn cờ.

### v4.0.6 — 3D Studio Money Bag & Flush Gold Coin Cylinders Polish
- Upgraded `getMoneyBagAndGoldCoinsSVG`, `getDynamicWealthPileSVG`, and `renderCashStackHTML` with 1:1 studio-grade 3D Pearl-Ivory Canvas Money Bag (pinched bottom ears, soft cloth collar pleats, vintage US Dollar banknotes, braided golden hemp rope with side loops, and classic olive-gold `$` emblem) + 3 tall stepping flush gold coin cylinders + 4 foreground leaning embossed `$` gold coins.
- Unique SVG gradient IDs per instance (`uid`) prevent DOM ID collisions across the 4 player wealth corners and the 60fps Cash Transfer Modal.

### v4.0.7 — Staggered Cash Transfer Animation & 1500ms Suspense Dice Roll
- **1500ms 3D Suspense Dice Roll**: Tăng thời gian lăn xúc xắc lên 1500ms (ở tốc độ 1x) với 9 nhịp âm thanh lạch cạch va đập giảm tốc dần (decelerating tumble) + nhịp nghỉ sau dừng 420ms giúp người chơi theo dõi kết quả xúc xắc rõ ràng và hồi hộp hơn.
- **Staggered Cash Transfer Animation**: Tiền chuyển xuất hiện lần lượt từng phần tử bên người trả (Chồng xu vàng nảy lên trước -> Túi tiền vải bố 3D nảy lên tiếp theo -> Huy hiệu số tiền bung sáng), sau đó rung nhẹ gom thành 1 thể đồng nhất tỏa hào quang vàng kim rồi mới lướt bay parabol sang người nhận.

### v4.0.8 — Fix Bot AI Dice Roll & Watchdog Timing Synchronization
- **Fix Bot AI Dice Rolling**: Sửa triệt để lỗi AI đổ xúc xắc bị chập chờn/kẹt do cơ chế tự cứu `runMonopolyWatchdog` trước đây có ngưỡng 1200ms quá ngắn so với thời gian lăn xúc xắc 1500ms + hoạt ảnh chuyển tiền 2300ms.
- **Animation-Aware Watchdog Guard**: Bổ sung điều kiện bảo vệ tuyệt đối: Watchdog chỉ can thiệp khi Bot AI thực sự đứng lượt ở nút đổ (không đang lăn xúc xắc `!monoState.isRolling`, không đang nhảy ô `!monoState.stepIntervalId`, và không có modal chuyển tiền hay sự kiện nào đang chạy).
- **Continuous Timestamp Refresh**: Cập nhật `monoState.lastActivityTime` xuyên suốt các giai đoạn của xúc xắc (1500ms lăn, 420ms chốt điểm) và chuyển tiền giúp ván đấu diễn ra mượt mà 100% không bao giờ bị ngắt quãng giữa chừng.

### v4.0.9 (2026-10-27) - Random Destination World Tour & Removal of $8,500 Net Worth Ceiling
- **Random Destination World Tour (Ô World Tour Sân Bay Bay Ngẫu Nhiên Mỗi Lượt)**:
  - Mỗi khi bất kỳ người chơi nào đi vào ô Sân Bay Tân An (Tile ID 22), hệ thống tự động:
    1. Cộng ngay tiền trợ cấp du lịch `+$300` vào tài khoản kèm hiệu ứng tiền bay nổi (`triggerMonoFloatingCash`).
    2. Chọn ngẫu nhiên một ô đích đến hợp lệ trên toàn bộ bàn cờ 44 ô (`monoState.tiles.filter(t => t.id !== 22 && t.type !== 'airport' && t.type !== 'gotojail')`).
    3. Kích hoạt hoạt ảnh chuyên cơ phản lực lướt qua bàn cờ (`triggerMonoAirplaneFlyby`) chở người chơi đến thẳng ô đích đã chọn.
    4. Khi chuyên cơ hạ cánh tại ô đích ngẫu nhiên, lập tức kích hoạt tương tác hạ cánh của ô đó (`handleMonoLanding(player)`: Mua bất động sản còn trống, xây nâng cấp nhà/khách sạn, trả tiền thuê nếu vào đất đối thủ, rút thẻ Cơ Hội/Khí Vận, hoặc nhận lương START nếu bay trúng ô Khởi Hành).
    5. Cập nhật Watchdog bảo vệ hoạt cảnh chuyến bay (`isAirplaneModalOpen`) để đảm bảo Bot AI không bị gián đoạn hay kẹt lượt.
- **Bỏ Trần Thắng $8,500 (Removal of Net Worth Ceiling)**:
  - Loại bỏ hoàn toàn mốc chiến thắng sớm $8,500 (`BUSINESS_TOUR_TARGET_NET_WORTH = Infinity`).
  - Trận đấu tiếp tục gay cấn cho đến khi:
    - Loại bỏ và làm phá sản đối thủ (Last Tycoon Standing).
    - Thâu tóm độc quyền 3/3 Khu Nghỉ Dưỡng Biển (Resort Monopoly).
    - Hoặc phân định ngôi vương bằng Tổng tài sản sau khi kết thúc trọn vẹn 15 vòng đấu đầy kịch tính!
  - Cập nhật toàn bộ thanh trạng thái (`#monoTurnStatusText`), gợi ý chiến thắng và bảng thông báo luật cờ.

### v4.1.0 (2026-10-27) - World Famous Landmarks & Color Monopoly Multipliers by Wealth Tier (x2.0 - x4.0) & 35-Round Balance
- **Bản Đồ 44 Ô Quốc Tế (World Tour Deluxe 44 Tiles)**:
  - Nâng cấp toàn diện tên các ô trên bàn cờ thành các địa danh, kỳ quan và siêu đô thị lừng danh toàn cầu:
    - 4 Resort Biển Độc Quyền: `BALI RESORT`, `HAWAII RESORT`, `MALDIVES RESORT`, `SANTORINI RESORT`.
    - Sân bay: `WORLD TOUR AIRPORT`, Trại giam: `ALCATRAZ JAIL`, Bắt giam: `INTERPOL`.
    - 32 Đô thị quốc tế phân bổ liền kề theo vùng địa lý: Cairo, New Delhi, Manila, Bangkok, Jakarta, Kuala Lumpur, Singapore, Athens, Rome, Madrid, Amsterdam, Berlin, Vienna, London, Paris, Sydney, Toronto, Seoul, Thượng Hải, Tokyo, Dubai, New York, San Francisco, Los Angeles, Las Vegas, Rio de Janeiro, Buenos Aires, Cape Town, Istanbul, Doha.
- **Hệ Thống Độc Quyền Dãy Màu Phân Cấp Nhà Giàu / Nhà Nghèo (x2.0 - x4.0 Tiền Thuê)**:
  - Khi một người chơi sở hữu trọn bộ các ô đất cùng màu cạnh nhau (Color Group Monopoly) và không bị thế chấp:
    - 🛖 **Khu Bình Dân (Nhà Nghèo - g1: Cairo, New Delhi, Manila)**: Tiền thuê **x2.0**
    - 🏘️ **Khu Trung Lưu (g2, g10: Bangkok, Jakarta, Singapore, Cape Town, Istanbul, Doha)**: Tiền thuê **x2.5**
    - 🏢 **Khu Di Sản & Thương Mại (g3, g9: Athens, Rome, Madrid, Rio de Janeiro, Buenos Aires)**: Tiền thuê **x3.0**
    - 🌆 **Khu Hiện Đại & Khá Giả (g4, g6, g8: Amsterdam, Berlin, Vienna, Sydney, Toronto, Seoul, SF, LA, Vegas)**: Tiền thuê **x3.5**
    - 💎 **Khu Thượng Lưu (Nhà Giàu Siêu VIP - g5: London & Paris, g7: Thượng Hải & Tokyo, g11: Dubai & New York)**: Tiền thuê vọt lên **x4.0 (Gấp 4 lần!)**
  - Hiển thị hiệu ứng trực quan ngọn lửa phát sáng `🔥x{mult}` trên viền ô đất, huy hiệu cấp bậc trên thanh Inspector HUD và Popup sự kiện nộp tiền phạt siêu cấp.
- **Cân Bằng Thời Lượng Ván Đấu: 35 Vòng (10 - 15 Phút Tối Đa)**:
  - Tăng số vòng thi đấu `BUSINESS_TOUR_MAX_ROUNDS = 35` (thay vì 15 vòng quá ngắn chỉ ~5 phút).
  - Với thời lượng trung bình ~21.5s/vòng (1 Human + 3 Bots), ván cờ đạt chuẩn từ 10 đến 15 phút. Nhờ cơ chế Độc Quyền Dãy Màu x2.0 - x4.0, nhiều ván đấu sẽ kết thúc sớm đầy mãn nhãn bằng phá sản đối thủ (Last Tycoon Standing) ở phút thứ 10 - 12!
