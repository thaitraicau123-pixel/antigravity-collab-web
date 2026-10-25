# SPEC.md — Đặc Tả Dự Án Code-Collab

## 1. Mục Tiêu Cốt Lõi (Core Objectives)
Xây dựng nền tảng trình soạn thảo mã nguồn cộng tác thời gian thực (**Code-Collab**) chuẩn phong cách IDE hiện đại:
- Soạn thảo code đa người dùng (Multi-user real-time collaboration) với Monaco Editor chuẩn VS Code.
- Đồng bộ hóa nội dung code tức thời qua WebSocket (Socket.io).
- Hiển thị vị trí con trỏ (remote cursors), vùng chọn (selections) và tên/màu sắc của từng người dùng đang tham gia cùng phòng.
- Hệ thống phòng (Room-based sessions) cho phép tạo hoặc tham gia phòng bằng Room ID / liên kết chia sẻ.
- Hỗ trợ đổi ngôn ngữ lập trình linh hoạt (JavaScript, TypeScript, Python, HTML, CSS, C++, Java, JSON, Markdown...) với syntax highlighting.
- Bảng điều khiển người dùng trực tuyến (Active Peers list) và trạng thái kết nối (Connected / Disconnected / Latency).

---

## 2. Design Tokens (Giao diện Dark IDE chuẩn cao cấp)
- **Backgrounds:**
  - Base Background: `#0B0F19` (Deep Slate / Dark canvas)
  - Surface Panel / Sidebar: `#111827` (Gray 900)
  - Editor Container: `#1E1E1E` (VS Code Dark+ standard)
  - Header / Toolbar: `#161F30` (Navy Dark)
- **Borders & Dividers:**
  - Border Subtles: `#2D3748`
  - Border Active / Accent: `#3B82F6` (Electric Blue)
- **Colors & Accents:**
  - Primary Accent: `#3B82F6` (Blue 500)
  - Success / Online: `#10B981` (Emerald 500)
  - Warning / Syncing: `#F59E0B` (Amber 500)
  - Peer Color Palette: `['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16']`
- **Typography:**
  - UI Font: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
  - Code Font: `"JetBrains Mono", "Fira Code", Consolas, monospace`
- **Layout:**
  - Header bar: Logo, Room Info, Share Button, Language Selector, Run/Copy Code, Active Users Avatars.
  - Sidebar: Active Participants list, Room ID badge, Quick settings.
  - Main: Full-height Monaco Editor with real-time cursor widgets & selection decorations.
  - Status Bar: Connection status indicator, Current Cursor Line/Col, Language, Peer count.

---

## 3. Kiến Trúc File & Logic
```
code-collab/
├── SPEC.md                      # Đặc tả kỹ thuật và tiêu chuẩn nghiệm thu
├── server.js                    # Custom Node.js HTTP + Socket.io Server tích hợp Next.js
├── package.json                 # Cấu hình dependencies (next, react, socket.io, @monaco-editor/react, tailwindcss)
├── tsconfig.json                # TypeScript compiler config
├── tailwind.config.ts           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Global HTML layout & metadata
│   │   ├── page.tsx             # Lobby (Trang chủ tạo hoặc nhập mã phòng)
│   │   ├── room/
│   │   │   └── [roomId]/
│   │   │       └── page.tsx     # Workspace phòng soạn thảo cộng tác chính
│   │   └── globals.css          # Global styles & Design Tokens
│   ├── components/
│   │   ├── Editor/
│   │   │   └── CollaborativeEditor.tsx  # Monaco Editor tích hợp con trỏ và broadcast socket
│   │   ├── Header/
│   │   │   └── TopNavigation.tsx       # Toolbar điều khiển, chọn ngôn ngữ, sao chép link
│   │   └── Sidebar/
│   │       └── PeerList.tsx            # Danh sách người dùng trong phòng
│   ├── hooks/
│   │   └── useSocket.ts                # Hook quản lý kết nối Socket.io và event listeners
│   └── types/
│       └── collaboration.ts            # Định nghĩa types: Peer, RoomData, CursorPosition
```

---

## 4. Acceptance Criteria (Tiêu Chuẩn Nghiệm Thu Dành Cho QA)
- [x] AC-1: Khởi tạo thành công cấu trúc dự án `code-collab` với đầy đủ dependencies (`next`, `react`, `@monaco-editor/react`, `socket.io`, `socket.io-client`, `tailwindcss`).
- [x] AC-2: Server Socket.io chạy ổn định, tiếp nhận các sự kiện: `join-room`, `code-change`, `cursor-move`, `language-change`, `disconnect`.
- [x] AC-3: Trang Lobby (`/`) cho phép người dùng nhập tên, tạo phòng mới ngẫu nhiên hoặc nhập mã phòng có sẵn để tham gia.
- [x] AC-4: Trang Workspace (`/room/[roomId]`) tích hợp Monaco Editor giao diện Dark (vs-dark) với đầy đủ syntax highlighting.
- [x] AC-5: Hỗ trợ chuyển đổi đa ngôn ngữ (JavaScript, TypeScript, Python, HTML, CSS, C++, JSON, Markdown) và đồng bộ cho tất cả thành viên trong phòng.
- [x] AC-6: Đồng bộ hóa nội dung gõ code thời gian thực giữa 2 trình duyệt/tab không bị giật lag hoặc mất focus.
- [x] AC-7: Hiển thị con trỏ (remote cursor) và vị trí dòng/cột kèm nhãn tên và màu đại diện của từng peer theo thời gian thực.
- [x] AC-8: Danh sách thành viên trực tuyến (Active Peers) cập nhật tự động khi có người vào/rời phòng.
- [x] AC-9: Nút "Copy Link" / "Share Room" hoạt động mượt mà, có thông báo toast phản hồi thành công.
- [x] AC-10: Kiểm thử build / lint không phát sinh lỗi cú pháp hay runtime crash.
