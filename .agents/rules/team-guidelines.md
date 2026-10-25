---
description: Quy định bắt buộc khi Antigravity AI tham gia dự án 2 người làm chung
always_on: true
---

# TEAM COLLABORATION RULES

Khi bạn (Antigravity) nhận được yêu cầu sửa đổi hoặc bổ sung code trong dự án này:

1. **Giữ nguyên tính toàn vẹn (Preserve Architecture)**:
   - Tuyệt đối không xóa bỏ các class CSS của Tailwind hoặc hiệu ứng tùy chỉnh trừ khi được yêu cầu rõ ràng.
   - Luôn kiểm tra xem file bạn sửa có thuộc trách nhiệm được phân chia trong `AGENTS.md` hay không.

2. **Giao tiếp qua Code & Comment**:
   - Khi tạo thêm hàm mới, luôn thêm JSDoc / comment rõ ràng:
     ```javascript
     /**
      * [Collab-Acc2]: Đồng bộ dữ liệu task lên storage
      * @param {Object} task
      * @returns {Promise<boolean>}
      */
     ```
   - Điều này giúp tài khoản còn lại khi mở code lên sẽ hiểu ngay AI của bạn mình đã làm gì.

3. **An toàn & Zero-Crash**:
   - Sử dụng optional chaining `?.` và fallback an toàn khi truy xuất thuộc tính DOM hoặc object dữ liệu.
   - Không được hardcode credentials hoặc secret keys vào mã nguồn client-side.
