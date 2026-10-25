# SPECIFICATION: CYBER TABLETOP BOARD GAME VIBE UPGRADE

## 1. Mục tiêu Cốt lõi
Nâng cấp toàn diện giao diện web hiện tại từ phong cách dashboard công nghệ thông thường sang phong cách **Đấu trường Board Game Thượng Hạng (Tabletop / Classic Board Game Vibe)**:
- Tái hiện cảm giác bàn cờ nỉ nhung cao cấp viền gỗ mun chạm khắc đồng.
- Xúc xắc 3D chân thực đặt trong Khay gieo xúc xắc (Dice Tray Arena).
- Quân cờ Meeple 3D có bóng đổ chân thực, thẻ bài bốc thăm sự kiện.
- Bảo toàn 100% logic trò chơi (12 ô xúc xắc, Cờ ca-rô 3x3, Đăng nhập, Hồ sơ, Nâng cấp VIP, Bảng xếp hạng, Luật chơi).
- Thực hiện và đẩy commit duy nhất trên nhánh `feat/ui`.

## 2. Design Tokens & Vibe Aesthetic
- **Chủ đề:** Luxury Tabletop & Cyber Fantasy Board Game.
- **Bảng màu (60-30-10):**
  - **60% Dominant Background:** Nền nỉ đêm sâu thẳm `#0A0E17` kết hợp hoa văn bàn cờ tinh xảo.
  - **30% Structural Frame:** Khay bàn cờ gỗ chạm viền vàng Champagne `#161F30` với viền quang học `rgba(245, 158, 11, 0.25)`.
  - **10% Accent Gold & Jewel:** Vàng Hoàng Gia (`#F59E0B`, `#FBBF24`), Ngọc Lục Bảo (`#10B981`), Hồng Ngọc (`#F43F5E`), Lam Ngọc (`#06B6D4`).
- **Typography:**
  - Tiêu đề & Logo: Google Fonts `Cinzel` / `Cinzel Decorative` (Phong cách cờ bàn thần thoại, sắc sảo, vương giả).
  - Thân bài & Chỉ số: `Inter` / `JetBrains Mono` tối ưu độ dễ đọc 60-75 ký tự/dòng.
- **Chuyển động (Animate UI Tokens):**
  - `spring.press`: scale 0.97, ~120ms.
  - `spring.pop` & `spring.bounce`: Xúc xắc nảy vật lý và quân cờ nhảy từng bước (hop-by-hop).
  - `spring.dialog`: Modal mở êm với backdrop-filter blur 16px.

## 3. Kiến trúc File & Giao diện
- `index.html`: Chứa toàn bộ giao diện Board Game Tabletop, tích hợp Tailwind CSS, Google Fonts, Lucide Icons, Web Audio API, và logic game hoàn chỉnh.
- `SPEC.md`: Tài liệu đặc tả chuẩn teamworkweb.

## 4. Acceptance Criteria (Tiêu chuẩn Nghiệm thu)
- [ ] Bàn cờ mang đậm chất Tabletop Board Game (có khay nỉ, viền đồng, ô cờ acrylic bóng nổi).
- [ ] Xúc xắc 3D to bản nằm trong Khay nỉ gieo xúc xắc trung tâm (Dice Tray).
- [ ] Quân cờ Meeple 3D có bóng đổ chân thực nhảy nảy từng bước theo token `spring.bounce`.
- [ ] Thanh điều hướng trên (Navbar) và Chân trang (Footer) đầy đủ tính năng: Đăng nhập, Hồ sơ cá nhân, Nâng cấp VIP, Bảng xếp hạng, Luật chơi.
- [ ] Hỗ trợ 2 chế độ: Xúc xắc 12 ô thoáng đãng & Cờ Ca-rô Neon 3x3.
- [ ] Hoạt động mượt mà không lỗi Console, âm thanh Web Audio API sống động.
- [ ] Commit và push 100% trên nhánh `feat/ui`.
