# CẤU HÌNH ANTIGRAVITY AGENT - DỰ ÁN WEB TEAM COLLABORATION

Dự án này được thiết kế để **2 tài khoản Antigravity** cùng phối hợp phát triển một ứng dụng web mượt mà, không xung đột mã nguồn.

---

## 1. PHÂN CHIA VAI TRÒ GIỮA 2 TÀI KHOẢN (ROLES)

Khi bạn hoặc bạn của bạn ra lệnh (prompt) cho Antigravity, Antigravity sẽ tự động tuân thủ theo vai trò được giao:

### 👤 TÀI KHOẢN 1 (Lead / Frontend & UI-UX Master)
- **Khu vực phụ trách**:
  - Giao diện người dùng (`index.html`, `css/style.css`, layout, animations, responsive mobile/tablet/desktop).
  - Trải nghiệm người dùng (UX, toast notifications, modals, themes Dark/Light).
  - Tích hợp các thư viện UI (Tailwind CSS, Lucide Icons, Chart.js...).
- **Nguyên tắc**: Không sửa trực tiếp cấu trúc logic sâu trong `js/api.js`. Khi cần dữ liệu mới, khai báo các `data-action` hoặc hàm gọi sang `api.js`.

### 👥 TÀI KHOẢN 2 (Partner / Data, Logic & Features Specialist)
- **Khu vực phụ trách**:
  - Tầng dữ liệu & Logic xử lý (`js/api.js`, `js/app.js`, LocalStorage, IndexedDB, Mock APIs).
  - Kết nối Backend / REST API / Supabase / Firebase nếu dự án mở rộng.
  - Validate form, xử lý tính toán, luồng dữ liệu nghiệp vụ.
- **Nguyên tắc**: Không ghi đè các class CSS hoặc layout đã được Tài khoản 1 tinh chỉnh thẩm mỹ. Khi cần thay đổi giao diện, hãy thêm placeholder IDs/classes theo đúng tài liệu.

---

## 2. QUY TẮC PHỐI HỢP TRÁNH CONFLICT (ANTI-CONFLICT PROTOCOL)

1. **Kiến trúc Module hoá (Separation of Concerns)**:
   - Giao diện & Thẻ HTML -> `index.html`
   - Hiệu ứng & Style tùy biến -> `css/style.css`
   - Logic điều phối ứng dụng -> `js/app.js`
   - Giao tiếp dữ liệu / API -> `js/api.js`
2. **Quy ước đặt tên (Naming Convention)**:
   - Hàm giao diện / Event: `handle<TênHànhĐộng>` (ví dụ: `handleOpenModal`, `handleToggleTheme`).
   - Hàm logic / API: `<động_từ><ThựcThể>` (ví dụ: `getTasks`, `saveTask`, `syncRemoteData`).
3. **Quy chuẩn Git & Branching**:
   - Nhánh của Bạn 1: `feature/ui-<tên-chức-năng>`
   - Nhánh của Bạn 2: `feature/logic-<tên-chức-năng>`
   - Trước khi code tính năng mới, luôn chạy: `git pull origin main` để lấy code mới nhất của bạn mình.

---

## 3. CÁCH RA LỆNH CHO ANTIGRAVITY (PROMPT MẪU)

### Khi Bạn 1 cần làm UI:
> *"Tôi là Bạn 1 (Frontend). Hãy thêm cho tôi component hiển thị danh sách công việc dạng Kanban đẹp mắt, phong cách glassmorphism, responsive trên mobile, tuân thủ AGENTS.md."*

### Khi Bạn 2 cần làm Tính năng / Logic:
> *"Tôi là Bạn 2 (Logic). Hãy viết hàm lưu trữ và đồng bộ danh sách task vào LocalStorage trong file js/api.js và gắn vào js/app.js, không làm hỏng giao diện của Bạn 1."*
