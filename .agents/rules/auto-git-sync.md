---
description: Quy định bắt buộc: Tự động Fetch, Pull, Commit và Push cho người dùng
always_on: true
---

# AUTO GIT SYNC RULES (TỰ PUSH & TỰ FETCH)

Khi người dùng yêu cầu thực hiện công việc, sửa lỗi hoặc thêm tính năng:

1. **Trước khi bắt đầu (Pre-execution)**:
   - Tự động thực thi `git fetch origin` và `git pull origin main` để đồng bộ toàn bộ thay đổi mới nhất từ người cộng sự về máy.

2. **Sau khi hoàn thành (Post-execution)**:
   - Tự động chạy `git add .`
   - Tự động commit với thông điệp rõ ràng `git commit -m "feat/fix: ..."`
   - Tự động đẩy code lên repository `git push origin main`
   - Thông báo cho người dùng kết quả và trạng thái đồng bộ mà không yêu cầu người dùng phải tự thao tác thủ công.
