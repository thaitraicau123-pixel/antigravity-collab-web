---
description: Quy định bắt buộc: Chỉ làm Logic, tuyệt đối không động vào branch UI
always_on: true
---

# STRICT LOGIC ONLY & TARGET REPOSITORY RULES

1. **Repository đích & Link phát hành chính thức**:
   - Repository: `https://github.com/thaitraicau123-pixel/antigravity-collab-web`
   - Link Web Live: `https://thaitraicau123-pixel.github.io/antigravity-collab-web/`
   - Tất cả các lệnh fetch, pull và push từ nay CHỈ ĐƯỢC THỰC HIỆN trên repository này.

2. **Quy tắc Phân Chia Trách Nhiệm (CHỈ LÀM LOGIC)**:
   - Tài khoản này (Anh) phụ trách: **100% Logic, Thuật toán game, Firebase & Data**.
   - Các file được phép làm việc: `js/api.js`, `js/firebase.js`, hoặc các module logic nghiệp vụ.

3. **QUY TẮC CẤM (TUYỆT ĐỐI KHÔNG ĐỘNG VÀO BRANCH UI)**:
   - **TUYỆT ĐỐI KHÔNG switch, checkout, merge, sửa hay push vào branch `feat/ui`**.
   - Branch `feat/ui` là tài sản độc quyền của người bạn (`cuongcuca111-web`).
   - Mọi công việc của anh chỉ thực hiện trên branch `main` hoặc `feat/logic`.
