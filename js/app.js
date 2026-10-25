/**
 * ============================================================================
 * [Collab-App]: ĐIỀU PHỐI GIAO DIỆN & TƯƠNG TÁC
 * ============================================================================
 * Kết nối dữ liệu từ TeamAPI sang các thành phần giao diện, quản lý modals và prompt template.
 */

// Danh sách prompt mẫu cho 2 bạn copy đưa vào Antigravity
const PROMPTS = {
  acc1: `Xin chào Antigravity! Tôi đang làm việc trên dự án theo chuẩn AGENTS.md với vai trò là Tài Khoản 1 (Frontend & UI/UX Master).
Nhiệm vụ của tôi là cải tiến giao diện trong index.html và css/style.css.
Hãy giúp tôi:
1. Thêm một component mới (ví dụ: Modal chi tiết hoặc biểu đồ thống kê Chart.js).
2. Thiết kế hiện đại theo phong cách dark glassmorphism, responsive mượt mà.
3. Không làm hỏng các hàm gọi TeamAPI trong js/api.js và js/app.js.`,

  acc2: `Xin chào Antigravity! Tôi đang làm việc trên dự án theo chuẩn AGENTS.md với vai trò là Tài Khoản 2 (Data, Logic & API Specialist).
Nhiệm vụ của tôi là mở rộng tầng dữ liệu và nghiệp vụ trong js/api.js và js/app.js.
Hãy giúp tôi:
1. Viết thêm hàm xử lý dữ liệu mới (ví dụ: lọc nhiệm vụ theo người làm, tính toán phần trăm hoàn thành, kết nối Supabase/Firebase).
2. Đảm bảo an toàn null-safety, thêm JSDoc đầy đủ.
3. Giữ nguyên toàn bộ cấu trúc giao diện và class styling của Tài Khoản 1.`,

  sync: `Xin chào Antigravity! Chúng tôi có 2 tài khoản đang cùng làm dự án này.
Hãy quét toàn bộ mã nguồn (index.html, css/style.css, js/api.js, js/app.js):
1. Kiểm tra xem có hàm hoặc biến nào bị xung đột tên không.
2. Kiểm tra xem luồng dữ liệu giữa UI và API có liền mạch không.
3. Đề xuất các bước tiếp theo để 2 bạn cùng hoàn thiện dự án nhanh nhất.`
};

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

async function initApp() {
  await renderTasks();
  await renderActivityLogs();
  bindEvents();
}

/**
 * Hiển thị danh sách task lên 3 cột Kanban
 */
async function renderTasks() {
  const tasks = await TeamAPI.getTasks();

  const todoContainer = document.getElementById('todoContainer');
  const inProgressContainer = document.getElementById('inProgressContainer');
  const doneContainer = document.getElementById('doneContainer');

  if (!todoContainer || !inProgressContainer || !doneContainer) return;

  todoContainer.innerHTML = '';
  inProgressContainer.innerHTML = '';
  doneContainer.innerHTML = '';

  let countTodo = 0;
  let countInProgress = 0;
  let countDone = 0;

  tasks.forEach(task => {
    const card = createTaskCard(task);
    if (task.status === 'todo') {
      todoContainer.appendChild(card);
      countTodo++;
    } else if (task.status === 'inProgress') {
      inProgressContainer.appendChild(card);
      countInProgress++;
    } else if (task.status === 'done') {
      doneContainer.appendChild(card);
      countDone++;
    }
  });

  // Cập nhật số đếm
  document.getElementById('countTodo').innerText = countTodo;
  document.getElementById('countInProgress').innerText = countInProgress;
  document.getElementById('countDone').innerText = countDone;

  // Cập nhật thanh tiến độ dự án (Logic từ feat/logic)
  await updateProgressUI();

  // Re-run icons
  if (window.lucide) {
    lucide.createIcons();
  }
}

/**
 * [Collab-App]: Cập nhật thanh tiến độ dự án từ TeamAPI.getProgressStats
 */
async function updateProgressUI() {
  const stats = await TeamAPI.getProgressStats();
  
  const progressBarFill = document.getElementById('progressBarFill');
  const progressBadge = document.getElementById('progressBadge');
  const statDoneCount = document.getElementById('statDoneCount');
  const statTotalCount = document.getElementById('statTotalCount');
  const statInProgressCount = document.getElementById('statInProgressCount');
  const statTodoCount = document.getElementById('statTodoCount');
  const progressSummaryText = document.getElementById('progressSummaryText');

  if (!progressBarFill) return;

  // Cập nhật số
  if (statDoneCount) statDoneCount.innerText = stats.done;
  if (statTotalCount) statTotalCount.innerText = stats.total;
  if (statInProgressCount) statInProgressCount.innerText = stats.inProgress;
  if (statTodoCount) statTodoCount.innerText = stats.todo;
  if (progressBadge) progressBadge.innerText = `${stats.percentage}%`;

  // Cập nhật thanh bar (animated width)
  progressBarFill.style.width = `${stats.percentage}%`;

  // Cập nhật text tóm tắt
  if (progressSummaryText) {
    if (stats.percentage === 100) {
      progressSummaryText.innerHTML = '🎉 <strong class="text-emerald-400">Xuất sắc!</strong> Dự án đã hoàn thành 100% tất cả các task!';
    } else {
      progressSummaryText.innerHTML = `Đã hoàn thành <strong class="text-white">${stats.done}/${stats.total}</strong> nhiệm vụ (<span class="text-emerald-400 font-semibold">${stats.percentage}%</span>)`;
    }
  }
}

/**
 * Tạo một phần tử thẻ task
 */
function createTaskCard(task) {
  const card = document.createElement('div');
  card.className = 'task-card bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 rounded-xl p-3.5 space-y-2.5 shadow-sm';
  
  const isAcc1 = task.assignee.includes('1') || task.assignee.includes('UI');
  const badgeColor = isAcc1 
    ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
    : 'bg-purple-500/10 text-purple-400 border-purple-500/20';

  const priorityBadge = task.priority === 'Cao' 
    ? '<span class="text-[10px] text-rose-400 bg-rose-500/10 border border-rose-500/20 px-1.5 py-0.5 rounded font-medium">Cao 🔥</span>'
    : '<span class="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">Bình thường</span>';

  card.innerHTML = `
    <div class="flex items-start justify-between gap-2">
      <span class="text-xs font-semibold text-slate-100 leading-snug">${escapeHtml(task.title)}</span>
      <button onclick="handleDeleteTask('${task.id}')" class="text-slate-500 hover:text-rose-400 transition p-0.5" title="Xóa task">
        <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
      </button>
    </div>

    <div class="flex items-center justify-between text-[11px] pt-1 border-t border-slate-900">
      <span class="px-2 py-0.5 rounded-full border text-[10px] font-medium ${badgeColor}">
        ${escapeHtml(task.assignee)}
      </span>
      ${priorityBadge}
    </div>

    <div class="flex items-center justify-between pt-1 text-[11px]">
      <span class="text-slate-500 font-mono text-[10px]">${task.branch || 'main'}</span>
      
      <!-- Nút chuyển trạng thái nhanh -->
      <div class="flex items-center gap-1">
        ${task.status !== 'todo' ? `
          <button onclick="handleChangeStatus('${task.id}', 'todo')" class="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white" title="Chuyển về Cần làm">
            <i data-lucide="chevron-left" class="w-3 h-3"></i>
          </button>
        ` : ''}

        ${task.status === 'todo' ? `
          <button onclick="handleChangeStatus('${task.id}', 'inProgress')" class="px-2 py-0.5 rounded bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 font-medium text-[10px] flex items-center gap-1" title="Bắt đầu làm">
            <span>Bắt đầu</span>
            <i data-lucide="arrow-right" class="w-2.5 h-2.5"></i>
          </button>
        ` : ''}

        ${task.status === 'inProgress' ? `
          <button onclick="handleChangeStatus('${task.id}', 'done')" class="px-2 py-0.5 rounded bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-medium text-[10px] flex items-center gap-1" title="Đánh dấu hoàn thành">
            <i data-lucide="check" class="w-3 h-3"></i>
            <span>Hoàn thành</span>
          </button>
        ` : ''}

        ${task.status === 'done' ? `
          <span class="text-emerald-400 flex items-center gap-1 text-[10px] font-medium">
            <i data-lucide="check-circle-2" class="w-3 h-3"></i> Đã merge
          </span>
        ` : ''}
      </div>
    </div>
  `;

  return card;
}

/**
 * Hiển thị nhật ký hoạt động
 */
async function renderActivityLogs() {
  const container = document.getElementById('activityLogContainer');
  if (!container) return;

  const logs = await TeamAPI.getActivityLogs();
  container.innerHTML = '';

  logs.forEach(log => {
    const isAcc1 = log.author.includes('1') || log.author.includes('UI');
    const authorColor = isAcc1 ? 'text-blue-400' : 'text-purple-400';

    const item = document.createElement('div');
    item.className = 'flex items-center justify-between py-1.5 px-3 rounded-lg bg-slate-950/60 border border-slate-900 hover:border-slate-800 transition';
    item.innerHTML = `
      <div class="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
        <span class="text-slate-500">[#${log.hash}]</span>
        <span class="font-bold ${authorColor}">${escapeHtml(log.author)}:</span>
        <span class="text-slate-300">${escapeHtml(log.action)}</span>
      </div>
      <span class="text-slate-500 text-[10px] whitespace-nowrap ml-2">${log.time}</span>
    `;
    container.appendChild(item);
  });

  if (window.lucide) {
    lucide.createIcons();
  }
}

/**
 * Gắn các sự kiện UI
 */
function bindEvents() {
  // Guide Modal
  const btnOpenGuide = document.getElementById('btnOpenGuide');
  const btnCloseGuide = document.getElementById('btnCloseGuide');
  const btnGotIt = document.getElementById('btnGotIt');
  const guideModal = document.getElementById('guideModal');

  const toggleGuide = (open) => {
    if (guideModal) {
      if (open) guideModal.classList.remove('hidden');
      else guideModal.classList.add('hidden');
    }
  };

  btnOpenGuide?.addEventListener('click', () => toggleGuide(true));
  btnCloseGuide?.addEventListener('click', () => toggleGuide(false));
  btnGotIt?.addEventListener('click', () => toggleGuide(false));

  // Prompt Modal
  const btnOpenPromptModal = document.getElementById('btnOpenPromptModal');
  const btnClosePromptModal = document.getElementById('btnClosePromptModal');
  const promptModal = document.getElementById('promptModal');
  const selectPromptRole = document.getElementById('selectPromptRole');
  const promptTextarea = document.getElementById('promptTextarea');
  const btnCopyPrompt = document.getElementById('btnCopyPrompt');

  const updatePromptText = () => {
    const role = selectPromptRole.value;
    promptTextarea.value = PROMPTS[role] || PROMPTS.acc1;
  };

  btnOpenPromptModal?.addEventListener('click', () => {
    promptModal?.classList.remove('hidden');
    updatePromptText();
  });

  btnClosePromptModal?.addEventListener('click', () => {
    promptModal?.classList.add('hidden');
  });

  selectPromptRole?.addEventListener('change', updatePromptText);

  btnCopyPrompt?.addEventListener('click', () => {
    navigator.clipboard.writeText(promptTextarea.value).then(() => {
      showToast('Đã sao chép prompt! Hãy dán vào chat Antigravity nhé.', 'success');
    });
  });

  // Add Task Modal
  const btnAddTaskModal = document.getElementById('btnAddTaskModal');
  const btnCloseAddTask = document.getElementById('btnCloseAddTask');
  const btnCancelAddTask = document.getElementById('btnCancelAddTask');
  const addTaskModal = document.getElementById('addTaskModal');
  const formAddTask = document.getElementById('formAddTask');

  const toggleAddTask = (open) => {
    if (addTaskModal) {
      if (open) addTaskModal.classList.remove('hidden');
      else addTaskModal.classList.add('hidden');
    }
  };

  btnAddTaskModal?.addEventListener('click', () => toggleAddTask(true));
  btnCloseAddTask?.addEventListener('click', () => toggleAddTask(false));
  btnCancelAddTask?.addEventListener('click', () => toggleAddTask(false));

  formAddTask?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('inputTaskTitle').value.trim();
    const assignee = document.getElementById('inputTaskAssignee').value;
    const priority = document.getElementById('inputTaskPriority').value;

    if (!title) return;

    await TeamAPI.addTask({ title, assignee, priority });
    formAddTask.reset();
    toggleAddTask(false);
    await renderTasks();
    await renderActivityLogs();
    showToast('Đã thêm nhiệm vụ mới thành công!', 'success');
  });

  // Reset Tasks button
  document.getElementById('btnResetTasks')?.addEventListener('click', async () => {
    if (confirm('Bạn có chắc muốn khôi phục lại danh sách nhiệm vụ ban đầu?')) {
      TeamAPI.resetData();
      await renderTasks();
      await renderActivityLogs();
      showToast('Đã khôi phục dữ liệu mặc định!', 'info');
    }
  });

  // Export JSON button
  document.getElementById('btnQuickExport')?.addEventListener('click', async () => {
    const jsonStr = await TeamAPI.exportJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `antigravity-collab-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Đã tải xuống file dữ liệu dự án!', 'success');
  });

  // Switch role header buttons
  const btnRoleAcc1 = document.getElementById('btnRoleAcc1');
  const btnRoleAcc2 = document.getElementById('btnRoleAcc2');

  btnRoleAcc1?.addEventListener('click', () => {
    btnRoleAcc1.className = 'px-3 py-1 text-xs font-semibold rounded-lg bg-blue-600 text-white transition-all flex items-center gap-1.5 shadow-sm';
    btnRoleAcc2.className = 'px-3 py-1 text-xs font-semibold rounded-lg text-slate-400 hover:text-white transition-all flex items-center gap-1.5';
    showToast('Đang ở góc nhìn: Tài khoản 1 (UI/UX)', 'info');
  });

  btnRoleAcc2?.addEventListener('click', () => {
    btnRoleAcc2.className = 'px-3 py-1 text-xs font-semibold rounded-lg bg-purple-600 text-white transition-all flex items-center gap-1.5 shadow-sm';
    btnRoleAcc1.className = 'px-3 py-1 text-xs font-semibold rounded-lg text-slate-400 hover:text-white transition-all flex items-center gap-1.5';
    showToast('Đang ở góc nhìn: Tài khoản 2 (Logic/API)', 'info');
  });
}

/**
 * Thay đổi trạng thái task
 */
async function handleChangeStatus(taskId, newStatus) {
  await TeamAPI.updateTaskStatus(taskId, newStatus);
  await renderTasks();
  await renderActivityLogs();
  showToast('Đã cập nhật trạng thái nhiệm vụ!', 'success');
}

/**
 * Xóa task
 */
async function handleDeleteTask(taskId) {
  if (confirm('Bạn có chắc muốn xóa nhiệm vụ này?')) {
    await TeamAPI.deleteTask(taskId);
    await renderTasks();
    await renderActivityLogs();
    showToast('Đã xóa nhiệm vụ!', 'info');
  }
}

/**
 * Copy prompt nhanh từ thẻ card
 */
function copyRolePrompt(roleKey) {
  const text = PROMPTS[roleKey];
  if (text) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Đã chép Prompt cho ${roleKey === 'acc1' ? 'Tài khoản 1 (UI)' : 'Tài khoản 2 (Logic)'}!`, 'success');
    });
  }
}

/**
 * Toast notification
 */
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  const borderCol = type === 'success' ? 'border-emerald-500/40 text-emerald-300' : 'border-blue-500/40 text-blue-300';
  const iconName = type === 'success' ? 'check-circle' : 'info';

  toast.className = `toast-enter flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 border ${borderCol} shadow-xl text-xs font-medium pointer-events-auto`;
  toast.innerHTML = `
    <i data-lucide="${iconName}" class="w-4 h-4 flex-shrink-0"></i>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);
  if (window.lucide) lucide.createIcons();

  setTimeout(() => {
    toast.classList.remove('toast-enter');
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

window.handleChangeStatus = handleChangeStatus;
window.handleDeleteTask = handleDeleteTask;
window.copyRolePrompt = copyRolePrompt;
