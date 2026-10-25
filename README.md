# Code-Collab 🚀

Nền tảng soạn thảo mã nguồn cộng tác thời gian thực chuẩn phong cách IDE hiện đại (VS Code vibe), tích hợp Monaco Editor và WebSocket (Socket.io).

---

## ✨ Tính Năng Nổi Bật

- ⚡ **Cộng tác thời gian thực (Real-time Collaboration):** Nhiều người có thể cùng mở phòng và viết code đồng thời, tốc độ đồng bộ tức thì qua WebSocket.
- 🎯 **Hiển thị con trỏ đa người dùng (Multi-user Remote Cursors):** Nhìn thấy vị trí dòng, cột và tên/màu đại diện của từng thành viên trực tuyến khi họ đang di chuyển và gõ code.
- 💻 **Monaco Editor chuyên nghiệp:** Sử dụng nhân trình soạn thảo của VS Code với syntax highlighting, minimap, line numbers, bracket matching và phím tắt quen thuộc.
- 🌐 **Hỗ trợ đa ngôn ngữ lập trình:** Dễ dàng chuyển đổi giữa JavaScript, TypeScript, Python, HTML, CSS, C++, Java, JSON, SQL, Markdown với trạng thái đồng bộ cho cả phòng.
- 👥 **Hệ thống phòng linh hoạt (Room-based Sessions):** Tạo phòng ngẫu nhiên hoặc nhập mã phòng tùy ý, hỗ trợ 1-click sao chép link mời bạn bè.
- 🎨 **Giao diện Dark Theme cao cấp:** Thiết kế hiện đại, tinh giản, thanh trạng thái con trỏ chuẩn IDE và bảng thành viên trực tuyến trực quan.
- 💾 **Tiện ích xuất mã nguồn:** Hỗ trợ sao chép toàn bộ code vào clipboard hoặc tải file mã nguồn trực tiếp về máy.

---

## 🛠️ Công Nghệ Sử Dụng

- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS, Lucide React
- **Editor Core:** `@monaco-editor/react`
- **Real-time Server:** Node.js HTTP Server + Socket.io Server tích hợp
- **Client Socket:** `socket.io-client`

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Dự Án

### 1. Di chuyển vào thư mục dự án
```bash
cd "C:\Users\PV\.gemini\antigravity\scratch\code-collab"
```

### 2. Cài đặt thư viện (nếu chưa cài)
```bash
npm install
```

### 3. Khởi động máy chủ phát triển (Development Server)
```bash
npm run dev
```

Server sẽ khởi chạy tại: **`http://localhost:3000`**

### 4. Trải nghiệm cộng tác
1. Mở `http://localhost:3000` trên trình duyệt.
2. Nhập tên hiển thị và nhấn **"Tạo Phòng Mới Tức Thì"** (hoặc nhập mã phòng cụ thể).
3. Sao chép link phòng mở trên một Tab ẩn danh khác hoặc gửi cho đồng nghiệp để cùng trải nghiệm gõ code và thấy con trỏ di chuyển song song trong thời gian thực!

---

## 📁 Cấu Trúc Thư Mục

```
code-collab/
├── SPEC.md                      # Đặc tả kỹ thuật và tiêu chí nghiệm thu
├── server.js                    # Custom Node.js HTTP + Socket.io Server tích hợp Next.js
├── package.json                 # Cấu hình scripts & dependencies
├── tsconfig.json                # Cấu hình TypeScript
├── tailwind.config.ts           # Cấu hình Tailwind CSS & theme
├── next.config.mjs              # Cấu hình Next.js
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Global HTML layout
│   │   ├── page.tsx             # Lobby: Tạo hoặc tham gia phòng
│   │   ├── room/[roomId]/
│   │   │   └── page.tsx         # Workspace phòng soạn thảo chính
│   │   └── globals.css          # Global CSS & Design Tokens
│   ├── components/
│   │   ├── Editor/
│   │   │   └── CollaborativeEditor.tsx  # Monaco Editor & Remote Cursors
│   │   ├── Header/
│   │   │   └── TopNavigation.tsx       # Thanh điều khiển, ngôn ngữ, chia sẻ
│   │   └── Sidebar/
│   │       └── PeerList.tsx            # Bảng danh sách thành viên trực tuyến
│   ├── hooks/
│   │   └── useSocket.ts                # Hook quản lý kết nối Socket.io
│   └── types/
│       └── collaboration.ts            # Type definitions
```
