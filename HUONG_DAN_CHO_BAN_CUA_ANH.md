# 🚀 HƯỚNG DẪN 2 BẠN CÙNG CODE WEB TRÊN GITHUB VỚI ANTIGRAVITY

Dự án này sử dụng quy trình chuẩn chuyên nghiệp: **GitHub Repository + Cấu hình Agent (`AGENTS.md`)**.
Mỗi bạn phụ trách một nhánh riêng, Antigravity AI trên máy của cả 2 bạn sẽ tự động phân chia công việc và không bao giờ sửa đè code của nhau.

---

## 📌 PHÂN CHIA VAI TRÒ & NHÁNH GIT

| Người thực hiện | Vai trò | Nhánh Git riêng | Thư mục & File chính |
| :--- | :--- | :--- | :--- |
| **Bạn 1 (Anh)** | **Frontend & UI/UX** | `feat/ui` | `index.html`, `css/style.css`, giao diện, animation, responsive. |
| **Bạn 2 (Bạn của anh)** | **Logic & Backend API** | `feat/logic` | `js/api.js`, `js/app.js`, xử lý dữ liệu, LocalStorage, mock API. |
| **Hệ thống chung** | **Nhánh chính** | `main` | Nhánh ổn định sau khi cả 2 đã hoàn thành và gộp (Merge). |

---

## 🛠️ DÀNH CHO BẠN CỦA ANH (BƯỚC BẮT ĐẦU)

Khi nhận được link GitHub từ anh:

1. **Bước 1: Chấp nhận lời mời trên GitHub**
   - Kiểm tra email hoặc thông báo GitHub để accept lời mời làm **Collaborator**.
2. **Bước 2: Clone dự án về máy**
   - Mở Terminal / PowerShell trên máy bạn và chạy:
     ```bash
     git clone <link-repo-github>
     cd antigravity-collab-web
     ```
3. **Bước 3: Mở trong Antigravity**
   - Mở **Antigravity IDE** hoặc **Antigravity 2.0**.
   - Chọn **File $\rightarrow$ Open Folder** và chọn thư mục dự án vừa clone.
   - Antigravity sẽ tự động đọc `AGENTS.md` và `.agents/rules/` để hiểu quy tắc dự án.
4. **Bước 4: Chuyển sang nhánh của mình**
   - Bạn 2 chuyển sang nhánh logic:
     ```bash
     git checkout feat/logic
     ```
   *(Nếu là Bạn 1 thì làm việc trên nhánh `feat/ui`)*

---

## 💬 CÁCH RA LỆNH HÀNG NGÀY CHO ANTIGRAVITY

Mỗi khi muốn thêm tính năng, chỉ cần mở khung chat của Antigravity và gõ:

### 👉 Bạn 1 (Làm Giao Diện - nhánh `feat/ui`):
> *"Tôi là Bạn 1 (Frontend). Tôi đang làm việc trên nhánh feat/ui. Hãy giúp tôi tạo một bảng Dashboard thống kê và cải tiến giao diện trong index.html và css/style.css. Tuân thủ theo AGENTS.md, không can thiệp vào logic dữ liệu trong js/api.js."*

### 👉 Bạn 2 (Làm Tính Năng / API - nhánh `feat/logic`):
> *"Tôi là Bạn 2 (Logic). Tôi đang làm việc trên nhánh feat/logic. Hãy giúp tôi viết thêm hàm tìm kiếm và lọc dữ liệu trong js/api.js, sau đó kết nối vào js/app.js. Tuân thủ theo AGENTS.md, không thay đổi layout và class styling của Bạn 1."*

---

## 🔄 QUY TRÌNH ĐỒNG BỘ MÃ NGUỒN (KHÔNG BAO GIỜ CONFLICT)

Sau khi code xong mỗi tính năng:

### 1. Đẩy code lên nhánh của mình:
Bảo Antigravity:
> *"Tạo Git commit và đẩy code lên nhánh của tôi nhé."*

*(Hoặc tự gõ lệnh:)*
```bash
git add .
git commit -m "feat: mo ta tinh nang vua lam"
git push origin feat/ui      # (nếu là Bạn 1)
# hoặc
git push origin feat/logic   # (nếu là Bạn 2)
```

### 2. Gộp code (Pull Request trên GitHub):
1. Vào trang GitHub của dự án $\rightarrow$ Bấm **New Pull Request**.
2. Chọn gộp từ nhánh của mình (`feat/ui` hoặc `feat/logic`) vào nhánh `main`.
3. GitHub sẽ tự động điền Checklist kiểm tra theo mẫu có sẵn trong `.github/pull_request_template.md`.
4. Bấm **Merge Pull Request**.

### 3. Cập nhật code mới nhất về máy:
Trước khi bắt đầu làm tính năng tiếp theo, cả 2 bạn chỉ cần bảo Antigravity:
> *"Kéo code mới nhất từ nhánh main về nhánh của tôi và giải quyết nếu có xung đột nhé."*

*(Hoặc tự gõ lệnh:)*
```bash
git checkout main
git pull origin main
git checkout feat/ui       # (hoặc feat/logic)
git merge main
```

---

## 🌐 XEM WEB CHẠY THỬ
Chỉ cần double-click vào `index.html` hoặc gõ:
```bash
python server.py
```
Trình duyệt sẽ tự động mở trang web tại `http://localhost:8000`!
