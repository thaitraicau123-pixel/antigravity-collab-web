# Antigravity DuoHub - Web Collaboration Starter

Bộ khung dự án Web hoàn chỉnh được chuẩn hóa cho **2 tài khoản Google Antigravity** cùng lập trình song song.

## 📁 Cấu Trúc Thư Mục

```text
antigravity-collab-web/
├── AGENTS.md                   # Chỉ dẫn vai trò cho Antigravity AI của 2 tài khoản
├── HUONG_DAN_CHO_BAN_CUA_ANH.md # Hướng dẫn gửi cho bạn (cực kỳ chi tiết)
├── .agents/
│   └── rules/
│       └── team-guidelines.md  # Bộ quy tắc chống conflict tự động nạp vào AI
├── index.html                  # Giao diện chính (Dashboard, Kanban, Activity Feed)
├── css/
│   └── style.css               # Tùy biến animations & giao diện glassmorphism
├── js/
│   ├── api.js                  # Tầng lưu trữ, State & API Mock (Acc 2 quản lý)
│   └── app.js                  # Tầng điều phối sự kiện và giao diện (Acc 1 & Acc 2)
├── server.py                   # Script khởi chạy web server local bằng Python
└── package.json                # Cấu hình dự án nếu dùng Node.js
```

## 🚀 Khởi Chạy Nhanh

- **Cách 1**: Mở trực tiếp file `index.html` bằng trình duyệt web.
- **Cách 2**: Chạy server Python:
  ```bash
  python server.py
  ```
- **Cách 3**: Chạy qua Node.js (nếu có):
  ```bash
  npx serve .
  ```
