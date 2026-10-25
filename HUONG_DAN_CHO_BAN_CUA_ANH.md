# 🚀 HƯỚNG DẪN 2 BẠN CÙNG DÙNG ANTIGRAVITY ĐỂ CODE WEB

Chào bạn! Đây là dự án web được thiết kế để **2 người (2 tài khoản Antigravity)** cùng nhau lập trình song song mà không bao giờ bị đè code hay lỗi hệ thống.

---

## ⚡ BƯỚC 1: MỞ DỰ ÁN TRÊN MÁY BẠN
1. Tải thư mục này về máy và giải nén.
2. Mở ứng dụng **Antigravity IDE** hoặc **Antigravity 2.0**.
3. Chọn **File -> Open Folder** (Mở thư mục) và chọn thư mục `antigravity-collab-web`.
4. Khi mở lên, Antigravity sẽ tự động đọc file `AGENTS.md` và `.agents/rules/` để hiểu cấu trúc toàn bộ dự án!

---

## 👥 BƯỚC 2: PHÂN CHIA VAI TRÒ GIỮA 2 BẠN

| Vai Trò | Người Phụ Trách | File Chính | Nhiệm Vụ |
| :--- | :--- | :--- | :--- |
| **Tài Khoản 1** | **Bạn 1 (Lead UI/UX)** | `index.html`<br>`css/style.css` | Thiết kế giao diện, màu sắc, bố cục, responsive điện thoại, thêm component đẹp mắt. |
| **Tài Khoản 2** | **Bạn 2 (Logic & Data)** | `js/api.js`<br>`js/app.js` | Viết hàm xử lý logic, lưu trữ dữ liệu, kết nối Backend/API, tính toán nghiệp vụ. |

---

## 🎯 BƯỚC 3: CÁCH RA LỆNH CHO ANTIGRAVITY AI

Mỗi khi mở khung chat với Antigravity, bạn chỉ cần copy hoặc gõ theo mẫu sau:

### 👉 Nếu bạn là Người 1 (Frontend):
> *"Tôi là Bạn 1 (phụ trách Frontend theo AGENTS.md). Hãy giúp tôi làm đẹp thêm giao diện, bổ sung component mới và tối ưu hiển thị trên di động. Giữ nguyên các hàm dữ liệu trong js/api.js."*

### 👉 Nếu bạn là Người 2 (Backend / Logic):
> *"Tôi là Bạn 2 (phụ trách Logic theo AGENTS.md). Hãy giúp tôi viết thêm hàm xử lý dữ liệu và lưu trữ trong js/api.js, sau đó kết nối sang js/app.js. Không thay đổi layout hay style của Bạn 1."*

---

## 🤝 3 CÁCH KẾT NỐI ĐỂ 2 NGƯỜI CÙNG LÀM

### Cách 1: Real-time Live Share (Cùng nhìn thấy chuột của nhau - Cực phê!)
- **Người 1**: Mở Antigravity IDE -> Bấm vào biểu tượng **Live Share** ở góc dưới bên trái -> Bấm **Share** -> Copy đường link gửi cho Người 2.
- **Người 2**: Mở Antigravity IDE -> Bấm vào biểu tượng Live Share -> Bấm **Join** -> Dán link vào.
- 👉 **Kết quả**: Cả 2 cùng sửa code trực tiếp trên 1 màn hình, cùng chat với AI và cùng xem web chạy tại `http://localhost:3000`!

### Cách 2: Qua GitHub Repository (Cách chuẩn chuyên nghiệp)
- Đẩy thư mục này lên GitHub (Private repo).
- Thêm bạn bè làm Collaborator.
- Mỗi người tạo 1 nhánh Git:
  - Người 1: `git checkout -b feat/ui`
  - Người 2: `git checkout -b feat/logic`
- Khi code xong, bảo Antigravity: *"Tạo git commit và merge cho tôi"*.

### Cách 3: Nén gửi qua lại
- Sau khi Người 1 hoặc Người 2 hoàn thành 1 phần, nén folder gửi lại cho bạn mình.
- Mở lên bảo Antigravity: *"Kiểm tra xem bạn tôi vừa thêm gì mới và tích hợp tiếp phần của tôi nhé."*

---

## 🌐 XEM THỬ GIAO DIỆN WEB NGAY BÂY GIỜ
- Cách nhanh nhất: Double click chuột vào file `index.html` để mở trực tiếp trên trình duyệt Chrome / Edge.
- Hoặc mở terminal gõ: `python server.py` rồi truy cập `http://localhost:8000`.

Chúc 2 bạn hợp tác vui vẻ và tạo ra sản phẩm web thật xịn sò! 🔥
