/**
 * ============================================================================
 * [Collab-Acc2]: MODULE DỮ LIỆU & STORAGE (Phụ trách bởi Tài Khoản 2)
 * ============================================================================
 * Tệp này chứa toàn bộ logic dữ liệu, tương tác LocalStorage và API mock.
 * Tài khoản 1 (UI) chỉ việc gọi các hàm tại đây, không can thiệp logic nội tại.
 */

const STORAGE_KEYS = {
  TASKS: 'antigravity_duo_tasks',
  ACTIVITY: 'antigravity_duo_activity',
  SETTINGS: 'antigravity_duo_settings'
};

// Dữ liệu mẫu ban đầu cho 2 bạn khi mới mở app
const DEFAULT_TASKS = [
  {
    id: 'task-1',
    title: 'Dựng khung layout và cấu trúc Header / Sidebar',
    assignee: 'Acc 1 (UI/UX)',
    priority: 'Cao',
    status: 'done',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    branch: 'feat/ui-layout'
  },
  {
    id: 'task-2',
    title: 'Thiết kế cấu trúc dữ liệu LocalStorage & API Mock',
    assignee: 'Acc 2 (Logic)',
    priority: 'Cao',
    status: 'done',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    branch: 'feat/logic-storage'
  },
  {
    id: 'task-3',
    title: 'Tạo component Kanban kéo thả & thẻ nhiệm vụ đẹp mắt',
    assignee: 'Acc 1 (UI/UX)',
    priority: 'Trung bình',
    status: 'inProgress',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    branch: 'feat/ui-kanban'
  },
  {
    id: 'task-4',
    title: 'Viết logic chuyển trạng thái task và ghi nhận Activity Feed',
    assignee: 'Acc 2 (Logic)',
    priority: 'Trung bình',
    status: 'inProgress',
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    branch: 'feat/logic-feed'
  },
  {
    id: 'task-5',
    title: 'Kết nối backend thật (Firebase / Supabase) khi cần mở rộng',
    assignee: 'Acc 2 (Logic)',
    priority: 'Thấp',
    status: 'todo',
    createdAt: new Date().toISOString(),
    branch: 'feat/backend-connect'
  },
  {
    id: 'task-6',
    title: 'Tinh chỉnh Responsive trên điện thoại và hiệu ứng Dark Mode',
    assignee: 'Acc 1 (UI/UX)',
    priority: 'Trung bình',
    status: 'todo',
    createdAt: new Date().toISOString(),
    branch: 'feat/ui-responsive'
  }
];

const DEFAULT_ACTIVITY = [
  {
    id: 'act-1',
    author: 'Acc 1 (UI/UX)',
    action: 'Khởi tạo giao diện chuẩn Antigravity DuoHub',
    time: '5 giờ trước',
    hash: 'a7f9c2d'
  },
  {
    id: 'act-2',
    author: 'Acc 2 (Logic)',
    action: 'Tích hợp tệp AGENTS.md và thiết lập bộ storage an toàn',
    time: '4 giờ trước',
    hash: '3e1b04a'
  },
  {
    id: 'act-3',
    author: 'Hệ thống Antigravity',
    action: 'Xác thực không có conflict giữa 2 nhánh mã nguồn',
    time: '1 giờ trước',
    hash: '8c94e10'
  }
];

const TeamAPI = {
  /**
   * Lấy danh sách nhiệm vụ từ LocalStorage
   * @returns {Promise<Array>}
   */
  async getTasks() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TASKS);
      if (!data) {
        this.saveTasks(DEFAULT_TASKS);
        return [...DEFAULT_TASKS];
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Lỗi khi đọc tasks:', e);
      return [...DEFAULT_TASKS];
    }
  },

  /**
   * Lưu toàn bộ danh sách nhiệm vụ
   * @param {Array} tasks
   */
  saveTasks(tasks) {
    try {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
      return true;
    } catch (e) {
      console.error('Lỗi khi lưu tasks:', e);
      return false;
    }
  },

  /**
   * Thêm một nhiệm vụ mới
   * @param {Object} taskData
   * @returns {Promise<Object>}
   */
  async addTask(taskData) {
    const tasks = await this.getTasks();
    const newTask = {
      id: 'task-' + Date.now(),
      title: taskData.title,
      assignee: taskData.assignee || 'Cả 2 người',
      priority: taskData.priority || 'Trung bình',
      status: 'todo',
      createdAt: new Date().toISOString(),
      branch: taskData.assignee.includes('UI') ? 'feat/ui-' + Date.now() : 'feat/logic-' + Date.now()
    };
    tasks.unshift(newTask);
    this.saveTasks(tasks);

    // Ghi nhận hoạt động
    await this.logActivity(
      taskData.assignee || 'Thành viên',
      `Thêm nhiệm vụ mới: "${newTask.title}"`
    );

    return newTask;
  },

  /**
   * Cập nhật trạng thái nhiệm vụ (todo, inProgress, done)
   * @param {string} taskId
   * @param {string} newStatus
   */
  async updateTaskStatus(taskId, newStatus) {
    const tasks = await this.getTasks();
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      task.status = newStatus;
      this.saveTasks(tasks);

      const statusMap = {
        todo: 'Cần làm',
        inProgress: 'Đang code',
        done: 'Đã hoàn thành & Merge'
      };

      await this.logActivity(
        task.assignee,
        `Chuyển "${task.title}" sang trạng thái [${statusMap[newStatus] || newStatus}]`
      );
      return true;
    }
    return false;
  },

  /**
   * Xóa một nhiệm vụ
   */
  async deleteTask(taskId) {
    let tasks = await this.getTasks();
    const taskToDelete = tasks.find(t => t.id === taskId);
    tasks = tasks.filter(t => t.id !== taskId);
    this.saveTasks(tasks);

    if (taskToDelete) {
      await this.logActivity('Team', `Xóa nhiệm vụ: "${taskToDelete.title}"`);
    }
    return true;
  },

  /**
   * Lấy lịch sử hoạt động
   */
  async getActivityLogs() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACTIVITY);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify(DEFAULT_ACTIVITY));
        return [...DEFAULT_ACTIVITY];
      }
      return JSON.parse(data);
    } catch (e) {
      return [...DEFAULT_ACTIVITY];
    }
  },

  /**
   * Ghi nhận một hành động mới vào feed
   */
  async logActivity(author, action) {
    const logs = await this.getActivityLogs();
    const randomHash = Math.random().toString(36).substring(2, 9);
    const newLog = {
      id: 'act-' + Date.now(),
      author: author,
      action: action,
      time: 'Vừa xong',
      hash: randomHash
    };
    logs.unshift(newLog);
    if (logs.length > 20) logs.pop(); // Giữ tối đa 20 logs
    localStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify(logs));
    return newLog;
  },

  /**
   * Reset lại dữ liệu ban đầu
   */
  resetData() {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(DEFAULT_TASKS));
    localStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify(DEFAULT_ACTIVITY));
    return true;
  },

  /**
   * Xuất dữ liệu ra file JSON
   */
  async exportJSON() {
    const tasks = await this.getTasks();
    const activities = await this.getActivityLogs();
    const exportObject = {
      exportedAt: new Date().toISOString(),
      project: 'Antigravity DuoHub Web Collaboration',
      tasks,
      activities
    };
    return JSON.stringify(exportObject, null, 2);
  }
};

// Đưa ra scope window
window.TeamAPI = TeamAPI;
