/**
 * ============================================================================
 * [BoardGame-App]: ĐIỀU PHỐI BÀN CỜ & SỰ KIỆN GIAO DIỆN
 * ============================================================================
 */

let timerInterval = null;
let timeLeft = 30;

document.addEventListener('DOMContentLoaded', () => {
  initBoard();
  initDevTasks();
  bindGameEvents();
  updateScoresUI();
  startTurnTimer();
});

/**
 * Khởi tạo bàn cờ 12x12
 */
function initBoard() {
  const boardEl = document.getElementById('caroBoard');
  if (!boardEl) return;

  boardEl.innerHTML = '';
  const state = window.gameEngine.getState();

  for (let r = 0; r < 12; r++) {
    for (let c = 0; c < 12; c++) {
      const cell = document.createElement('div');
      cell.className = 'board-cell';
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.id = `cell-${r}-${c}`;

      cell.addEventListener('click', () => handleCellClick(r, c));
      boardEl.appendChild(cell);
    }
  }

  updateBoardUI();
}

/**
 * Xử lý khi người chơi bấm vào 1 ô cờ
 */
function handleCellClick(row, col) {
  const result = window.gameEngine.makeMove(row, col);
  if (!result.success) return;

  // Cập nhật giao diện bàn cờ
  updateBoardUI(result.lastMove);

  // Thêm vào lịch sử nước cờ
  addMoveToHistory(result.lastMove);

  // Nếu có người thắng
  if (result.isGameOver) {
    stopTurnTimer();
    updateScoresUI();

    if (result.winner === 'DRAW') {
      showWinModal('HÒA CỜ!', 'Hai bên đã hòa nhau sau trận đấu căng thẳng!');
    } else {
      // Highlight 5 ô thắng
      if (result.winningLine) {
        result.winningLine.forEach(pos => {
          const winCell = document.getElementById(`cell-${pos.row}-${pos.col}`);
          if (winCell) winCell.classList.add('win-cell');
        });
      }

      // Bắn pháo hoa ăn mừng
      if (window.confetti) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      const winnerName = result.winner === 'X' ? 'Player X (Anh)' : 'Player O (Bạn anh)';
      showWinModal(`CHIẾN THẮNG! 🏆`, `${winnerName} đã hoàn thành 5 quân liên tiếp!`);
    }
  } else {
    // Đổi lượt và reset đồng hồ
    resetTurnTimer();
  }
}

/**
 * Vẽ lại trạng thái bàn cờ
 */
function updateBoardUI(lastMove = null) {
  const state = window.gameEngine.getState();
  const board = state.board;

  // Cập nhật từng ô
  for (let r = 0; r < 12; r++) {
    for (let c = 0; c < 12; c++) {
      const cell = document.getElementById(`cell-${r}-${c}`);
      if (!cell) continue;

      cell.classList.remove('last-move');
      const val = board[r][c];

      if (val === 'X') {
        cell.innerHTML = '<span class="piece-x">X</span>';
      } else if (val === 'O') {
        cell.innerHTML = '<span class="piece-o">O</span>';
      } else {
        cell.innerHTML = '';
      }
    }
  }

  // Đánh dấu ô vừa đánh
  if (lastMove) {
    const lastCell = document.getElementById(`cell-${lastMove.row}-${lastMove.col}`);
    if (lastCell) lastCell.classList.add('last-move');
  }

  // Cập nhật lượt chơi
  const turnBadge = document.getElementById('turnIndicatorBadge');
  const turnPlayerIcon = document.getElementById('turnPlayerIcon');
  const turnPlayerText = document.getElementById('turnPlayerText');

  if (turnBadge && turnPlayerIcon && turnPlayerText) {
    if (state.currentPlayer === 'X') {
      turnBadge.className = 'px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold flex items-center gap-1.5 shadow-sm';
      turnPlayerIcon.innerText = 'X';
      turnPlayerText.innerText = 'Lượt của Player X (Anh)';
    } else {
      turnBadge.className = 'px-3 py-1 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/30 text-xs font-bold flex items-center gap-1.5 shadow-sm';
      turnPlayerIcon.innerText = 'O';
      turnPlayerText.innerText = 'Lượt của Player O (Bạn anh)';
    }
  }
}

/**
 * Hiển thị tỉ số
 */
function updateScoresUI() {
  const scores = window.gameEngine.getScores();
  document.getElementById('scoreX').innerText = scores.xWins;
  document.getElementById('scoreO').innerText = scores.oWins;
  document.getElementById('scoreDraw').innerText = scores.draws;
}

/**
 * Ghi nhận nước cờ vào danh sách lịch sử
 */
function addMoveToHistory(move) {
  const container = document.getElementById('moveHistoryList');
  if (!container) return;

  const countBadge = document.getElementById('moveCountBadge');
  const state = window.gameEngine.getState();
  if (countBadge) countBadge.innerText = `${state.moveCount} nước`;

  if (state.moveCount === 1) {
    container.innerHTML = '';
  }

  const isX = move.player === 'X';
  const playerColor = isX ? 'text-cyan-400' : 'text-pink-400';

  const item = document.createElement('div');
  item.className = 'flex items-center justify-between py-1 px-2.5 rounded-lg bg-slate-950/70 border border-slate-900 text-[11px]';
  item.innerHTML = `
    <div class="flex items-center gap-2">
      <span class="text-slate-500">#${state.moveCount}</span>
      <strong class="${playerColor}">${move.player}</strong>
      <span class="text-slate-300">Ô [Hàng ${move.row + 1}, Cột ${move.col + 1}]</span>
    </div>
    <span class="text-slate-500 text-[10px]">${move.time}</span>
  `;
  container.prepend(item);
}

/**
 * Bộ đếm thời gian mỗi lượt đánh (30s)
 */
function startTurnTimer() {
  timeLeft = 30;
  const timerEl = document.getElementById('timerCount');
  if (timerEl) timerEl.innerText = `${timeLeft}s`;

  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    if (timerEl) timerEl.innerText = `${timeLeft}s`;

    if (timeLeft <= 0) {
      // Hết giờ -> Tự động đổi lượt
      const state = window.gameEngine.getState();
      window.gameEngine.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
      resetTurnTimer();
      updateBoardUI();
    }
  }, 1000);
}

function resetTurnTimer() {
  timeLeft = 30;
  const timerEl = document.getElementById('timerCount');
  if (timerEl) timerEl.innerText = `${timeLeft}s`;
}

function stopTurnTimer() {
  if (timerInterval) clearInterval(timerInterval);
}

/**
 * Modal chúc mừng chiến thắng
 */
function showWinModal(title, desc) {
  const modal = document.getElementById('winModal');
  const winTitle = document.getElementById('winTitle');
  const winDesc = document.getElementById('winDescription');

  if (winTitle) winTitle.innerText = title;
  if (winDesc) winDesc.innerText = desc;
  if (modal) modal.classList.remove('hidden');

  if (window.lucide) lucide.createIcons();
}

/**
 * Gắn các sự kiện điều khiển
 */
function bindGameEvents() {
  // Nút ván mới
  document.getElementById('btnNewGame')?.addEventListener('click', () => {
    window.gameEngine.resetGame();
    initBoard();
    resetTurnTimer();
    startTurnTimer();
    document.getElementById('moveHistoryList').innerHTML = '<p class="text-slate-500 text-center py-4 text-xs italic">Ván mới đã bắt đầu!</p>';
    document.getElementById('moveCountBadge').innerText = '0 nước';
  });

  // Nút đi lại (Undo)
  document.getElementById('btnUndoMove')?.addEventListener('click', () => {
    if (window.gameEngine.undoMove()) {
      updateBoardUI();
      resetTurnTimer();
    }
  });

  // Nút reset tỉ số
  document.getElementById('btnResetScore')?.addEventListener('click', () => {
    if (confirm('Bạn có chắc muốn đặt lại tỉ số thắng thua về 0?')) {
      window.gameEngine.resetScores();
      updateScoresUI();
    }
  });

  // Nút chơi ván tiếp từ Modal
  document.getElementById('btnModalPlayAgain')?.addEventListener('click', () => {
    document.getElementById('winModal')?.classList.add('hidden');
    document.getElementById('btnNewGame')?.click();
  });
}

/**
 * Lộ trình tính năng Board Game giữa 2 bạn
 */
async function initDevTasks() {
  const stats = await TeamAPI.getProgressStats();
  const tasks = await TeamAPI.getTasks();

  const progressBar = document.getElementById('progressBarFill');
  const progressBadge = document.getElementById('progressBadge');
  const progressText = document.getElementById('progressSummaryText');
  const tasksContainer = document.getElementById('devTasksContainer');

  if (progressBar) progressBar.style.width = `${stats.percentage}%`;
  if (progressBadge) progressBadge.innerText = `${stats.percentage}%`;
  if (progressText) {
    progressText.innerHTML = `Đã hoàn thành <strong class="text-white">${stats.done}/${stats.total}</strong> tính năng (<span class="text-cyan-400 font-semibold">${stats.percentage}%</span>)`;
  }

  if (tasksContainer) {
    tasksContainer.innerHTML = '';
    tasks.forEach(task => {
      const card = document.createElement('div');
      card.className = 'bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 space-y-2';

      const statusBadge = task.status === 'done' 
        ? '<span class="text-emerald-400 text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">Đã xong ✅</span>'
        : (task.status === 'inProgress' 
          ? '<span class="text-cyan-400 text-[10px] bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">Đang code ⚡</span>'
          : '<span class="text-slate-400 text-[10px] bg-slate-800 px-1.5 py-0.5 rounded">Cần làm</span>');

      card.innerHTML = `
        <div class="flex items-start justify-between gap-1.5">
          <span class="text-xs font-semibold text-slate-200">${task.title}</span>
        </div>
        <div class="flex items-center justify-between text-[11px] pt-1 border-t border-slate-900">
          <span class="text-[10px] text-slate-400 font-mono">${task.assignee}</span>
          ${statusBadge}
        </div>
      `;
      tasksContainer.appendChild(card);
    });
  }

  if (window.lucide) lucide.createIcons();
}
