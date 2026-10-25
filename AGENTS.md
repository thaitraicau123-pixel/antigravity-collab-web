# 🤖 CHỈ THỊ BẮT BUỘC CHO ANTIGRAVITY: TỰ ĐỘNG ĐỒNG BỘ GIT 100%

Dự án này được phát triển song song bởi **2 tài khoản Antigravity**. Để đảm bảo **KHÔNG BAO GIỜ** bị đè mất code hoặc gián đoạn công việc, bạn (Antigravity) **BẮT BUỘC PHẢI TỰ ĐỘNG CHẠY CÁC LỆNH DƯỚI ĐÂY MÀ KHÔNG CẦN NGƯỜI DÙNG PHẢI NHẮC HAY BẤM TAY**:

---

## ⚡ 1. BƯỚC MỞ ĐẦU (Pre-Task) — Tự Động Kéo Code Mới Nhất
**Ngay khi nhận được bất kỳ lời nhắc/nhiệm vụ nào từ người dùng, việc ĐẦU TIÊN bạn phải làm TRƯỚC KHI tạo hoặc sửa bất kỳ file nào:**
1. Chạy ngầm lệnh:
   ```bash
   git pull --rebase origin main
   ```
2. Đảm bảo codebase tại máy hiện tại luôn đồng bộ 100% với code mới nhất mà đồng đội vừa đẩy lên server.

---

## ⚡ 2. BƯỚC KẾT THÚC (Post-Task) — Tự Động Đẩy Code Lên Server
**Ngay sau khi viết code, sửa lỗi hoặc hoàn thành tính năng xong:**
1. Kiểm tra trạng thái: `git status --short`
2. Gom toàn bộ thay đổi: `git add .`
3. Tự động commit với thông điệp rõ ràng:
   ```bash
   git commit -m "feat/fix: <tóm tắt ngắn gọn tính năng vừa hoàn thiện>"
   ```
4. Kéo lại lần nữa bằng `--rebase` để đảm bảo trong lúc bạn đang code, đồng đội chưa đẩy đè lên:
   ```bash
   git pull --rebase origin main
   ```
5. Đẩy code lên GitHub ngay lập tức:
   ```bash
   git push origin main
   ```
6. Báo cáo ngắn gọn cho người dùng: *"Đã hoàn thành và tự động đồng bộ code lên GitHub thành công!"*

---

## 🛡️ 3. TỰ ĐỘNG XỬ LÝ CONFLICT (Tự Gộp Thông Minh — Zero Data Loss)
Nếu lệnh `git pull --rebase` gặp xung đột (Conflict):
- **TUYỆT ĐỐI KHÔNG DỪNG LẠI** để hỏi người dùng.
- **TUYỆT ĐỐI KHÔNG DÙNG `git push --force`**.
- Bạn hãy tự động mở các file bị xung đột (`<<<<<<< HEAD`), phân tích logic của cả 2 phía:
  - Giữ lại đầy đủ tính năng/giao diện của đồng đội.
  - Giữ lại phần tính năng/logic vừa mới viết.
  - Xóa bỏ các thẻ conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`).
- Chạy:
  ```bash
  git add .
  git rebase --continue
  git push origin main
  ```

---

## 👥 4. PHÂN CHIA VAI TRÒ DỰ ÁN
- **TÀI KHOẢN 1 (UI/UX)**: Phụ trách `index.html`, `css/style.css`, layout, components, animations. Không sửa logic sâu trong engine cờ.
- **TÀI KHOẢN 2 (Logic & Data)**: Phụ trách `js/`, API, state, luật chơi, lưu điểm. Giữ nguyên class và cấu trúc DOM của UI.
