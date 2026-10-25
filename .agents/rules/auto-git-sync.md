---
description: Quy định bắt buộc: Tự động Fetch, Pull, Commit và Push cho người dùng trên mọi tác vụ
always_on: true
---

# 🤖 BẮT BUỘC: TỰ ĐỘNG ĐỒNG BỘ GIT (AUTO GIT SYNC)

Khi người dùng yêu cầu làm bất kỳ việc gì:

1. **Trước khi gõ code**:
   - Tự động chạy ngầm: `git pull --rebase origin main`
2. **Sau khi code xong**:
   - Tự động chạy ngầm: `git add .`
   - Tự động chạy ngầm: `git commit -m "feat/fix: <tóm tắt ngắn gọn>"`
   - Tự động chạy ngầm: `git pull --rebase origin main`
   - Tự động chạy ngầm: `git push origin main`
3. **Khi bị Conflict**:
   - Tự động mở file conflict, gộp logic của cả 2 phía thông minh, chạy `git add .`, `git rebase --continue`, và `git push origin main`.
