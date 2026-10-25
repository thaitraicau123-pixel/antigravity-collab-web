# SPECIFICATION: CYBER TABLETOP BOARD GAME VIBE & REAL FIREBASE AUTH

## 1. Mục tiêu Cốt lõi
Nâng cấp tính năng Xác thực tài khoản thật tích hợp **Firebase Authentication & Cloud Firestore**:
- Cho phép người chơi Đăng Ký (Sign Up) tài khoản thật với Email & Password.
- Đăng nhập (Sign In) bằng Email/Password hoặc Google Provider (`signInWithPopup`).
- Đẩy dữ liệu người dùng thật (UID, Email, Tên hiển thị, Số dư Xu, Kim Cương, Điểm ELO, Cấp độ, Kho đồ) lên bảng `users/{uid}` trên Firebase Firestore.
- Tự động duy trì phiên đăng nhập thông qua `onAuthStateChanged`.
- Cung cấp giao diện cấu hình Firebase Config linh hoạt (cho phép kết nối Firebase project cá nhân).
- Bảo toàn 100% giao diện Tabletop Board Game (Xúc xắc 12 ô, Ca-rô Neon 3x3) và thực hiện commit chỉ trên nhánh `feat/ui`.

## 2. Design Tokens & Vibe
- Modal Đăng ký / Đăng nhập mang phong cách Hoàng Gia Tabletop: Viền đồng cổ, font Cinzel, tab chuyển đổi mượt mà.
- Phản hồi trạng thái rõ ràng (Loading spinner, Error alert tiếng Việt chuẩn xác, Success toast).

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
- [ ] Tab Đăng ký (Sign Up) và Đăng nhập (Sign In) tách biệt, trực quan.
- [ ] Đăng ký tài khoản thật với Email & Password hợp lệ (báo lỗi cụ thể nếu email đã tồn tại, pass < 6 ký tự...).
- [ ] Dữ liệu tài khoản được lưu trữ và đồng bộ lên Firebase Firestore (`users/{uid}`).
- [ ] Hỗ trợ cấu hình Firebase Project linh hoạt với nút Cài đặt kết nối.
- [ ] Giữ nguyên phiên đăng nhập khi F5 trang nhờ `onAuthStateChanged`.
- [ ] Nút Đăng xuất đưa giao diện về trạng thái Khách sạch sẽ.
- [ ] Thực hiện 100% và push thành công trên nhánh `feat/ui`.
