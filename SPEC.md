# SPECIFICATION: CYBER TABLETOP BOARD GAME VIBE & VIETNAMESE TYPOGRAPHY EXCELLENCE

## 1. Mục tiêu Cốt lõi
- **Khắc phục triệt để lỗi hiển thị font tiếng Việt:** Thay thế các font không hỗ trợ dấu tiếng Việt (như Cinzel gốc) bằng bộ Typography cao cấp hỗ trợ 100% Native Vietnamese Characters (`Playfair Display` & `Be Vietnam Pro`), giữ trọn vẹn vibe Board Game sang trọng, cổ điển quý phái.
- Tích hợp **Firebase Authentication & Cloud Firestore**:
  - Cho phép người chơi Đăng Ký (Sign Up) tài khoản thật với Email & Password.
  - Đăng nhập (Sign In) bằng Email/Password hoặc Google Provider (`signInWithPopup`).
  - Đẩy dữ liệu người dùng thật (UID, Email, Tên hiển thị, Số dư Xu, Kim Cương, Điểm ELO, Cấp độ, Kho đồ) lên bảng `users/{uid}` trên Firebase Firestore.
  - Tự động duy trì phiên đăng nhập thông qua `onAuthStateChanged`.
  - Cung cấp giao diện cấu hình Firebase Config linh hoạt (cho phép kết nối Firebase project cá nhân).
- Bảo toàn 100% giao diện Tabletop Board Game (Xúc xắc 12 ô, Ca-rô Neon 3x3) và thực hiện commit chỉ trên nhánh `feat/ui`.

## 2. Design Tokens & Vibe Typography
- **Header & Title Display Font:** `'Playfair Display', 'Cinzel', Georgia, serif`
  - Nạp Google Fonts với `family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,700` hỗ trợ đầy đủ subset Tiếng Việt (`ă, â, đ, ê, ô, ơ, ư, dấu thanh`).
  - Mang phong cách quý tộc bàn cờ cổ điển, tương phản cao, nét chân sắc lẹm, uy nghi.
- **Body & UI Controls Font:** `'Be Vietnam Pro', 'Inter', system-ui, sans-serif`
  - Nạp Google Fonts với `family=Be+Vietnam+Pro:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400`
  - Font chuẩn mực quốc gia được thiết kế riêng tối ưu cho dấu tiếng Việt, không bị cắt dấu (clipping), khoảng cách thanh điệu tự nhiên, đọc êm mắt và rõ nét ở mọi kích cỡ màn hình.
- **Code & Stats Monospace Font:** `'JetBrains Mono', monospace`
- **Tông màu Board Game:**
  - Vàng kim Hoàng Gia (`#D97706`, `#F59E0B`), Nền nỉ xanh đen bàn cờ (`#0A0F1D`, `#060911`), Viền khung đồng thau (`#2A364F`, `#B45309`).

## 3. Kiến trúc Firebase & Luồng Dữ Liệu
- SDK: Firebase Web SDK v10 (ES Modules via CDN gstatic):
  - `firebase/app`: `initializeApp`
  - `firebase/auth`: `getAuth`, `createUserWithEmailAndPassword`, `signInWithEmailAndPassword`, `signInWithPopup`, `GoogleAuthProvider`, `signOut`, `onAuthStateChanged`, `updateProfile`
  - `firebase/firestore`: `getFirestore`, `doc`, `setDoc`, `getDoc`, `updateDoc`
- Luồng Đăng Ký:
  1. Người dùng nhập: Tên, Email, Mật khẩu.
  2. Gọi `createUserWithEmailAndPassword(auth, email, password)`.
  3. Cập nhật `updateProfile(user, { displayName })`.
  4. Ghi tài liệu người dùng lên Firestore `setDoc(doc(db, "users", user.uid), {...})`.
  5. Đồng bộ giao diện thanh Nav và Bàn cờ với tên và điểm số thật.

## 4. Acceptance Criteria (Tiêu chuẩn Nghiệm thu)
- [ ] Nạp Google Fonts chính thức chứa subset Vietnamese: `Playfair Display` và `Be Vietnam Pro`.
- [ ] Không còn bất kỳ ký tự tiếng Việt nào bị vỡ font, nhảy kích thước (font fallback mismatch) hay mất dấu trên toàn bộ trang web.
- [ ] Tất cả các tiêu đề mang vibe Boardgame quý tộc, chân phương, hoa lệ.
- [ ] Toàn bộ body text, nhãn nút bấm, bảng điểm, form đăng ký/đăng nhập hiển thị tiếng Việt sắc sảo, êm ái.
- [ ] Tab Đăng ký (Sign Up) và Đăng nhập (Sign In) tách biệt, trực quan.
- [ ] Đăng ký tài khoản thật với Email & Password hợp lệ.
- [ ] Dữ liệu tài khoản được lưu trữ và đồng bộ lên Firebase Firestore (`users/{uid}`).
- [ ] Hỗ trợ cấu hình Firebase Project linh hoạt với nút Cài đặt kết nối.
- [ ] Giữ nguyên phiên đăng nhập khi F5 trang nhờ `onAuthStateChanged`.
- [ ] Nút Đăng xuất đưa giao diện về trạng thái Khách sạch sẽ.
- [ ] Thực hiện 100% và push thành công trên nhánh `feat/ui`.
