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
  initFirebaseEvents();
  initDevChangelog();
  updateScoresUI();
  startTurnTimer();

  // Thử khởi tạo Firebase nếu đã có config
  if (window.firebaseService) {
    window.firebaseService.init();
  }
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
  if (window.gameEngine.isBotThinking) return;

  // Nếu đang chơi Online qua Firebase: kiểm tra xem có đúng lượt của mình không
  if (window.firebaseService && window.firebaseService.currentRoomId) {
    if (window.gameEngine.currentPlayer !== window.firebaseService.playerRole) {
      alert('Chưa đến lượt của bạn! Hãy đợi đối thủ đi cờ.');
      return;
    }
  }

  const result = window.gameEngine.makeMove(row, col);
  if (!result.success) return;

  // Gửi nước cờ lên Firebase nếu đang ở phòng Online
  if (window.firebaseService && window.firebaseService.currentRoomId) {
    window.firebaseService.sendMove(
      row,
      col,
      result.lastMove.player,
      result.currentPlayer,
      result.winner,
      result.winningLine
    );
  }

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
      if (result.winningLine) {
        result.winningLine.forEach(pos => {
          const winCell = document.getElementById(`cell-${pos.row}-${pos.col}`);
          if (winCell) winCell.classList.add('win-cell');
        });
      }

      if (window.confetti) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      const winnerName = result.winner === 'X' ? 'Player X (Anh)' : (window.gameEngine.gameMode === 'BOT' ? 'Bot AI 🤖' : 'Player O (Bạn anh)');
      showWinModal(`CHIẾN THẮNG! 🏆`, `${winnerName} đã hoàn thành 5 quân liên tiếp!`);
    }
  } else {
    resetTurnTimer();

    // Nếu đang ở chế độ Đấu với Bot AI và đến lượt O
    if (window.gameEngine.gameMode === 'BOT' && window.gameEngine.currentPlayer === 'O') {
      window.gameEngine.isBotThinking = true;
      const gameStatus = document.getElementById('gameStatusText');
      if (gameStatus) gameStatus.innerHTML = '<span class="text-pink-400 font-bold animate-pulse">🤖 Bot AI đang tính toán nước đi...</span>';

      setTimeout(() => {
        const botMove = window.gameEngine.calculateBestBotMove();
        const botResult = window.gameEngine.makeMove(botMove.row, botMove.col);
        window.gameEngine.isBotThinking = false;
        if (gameStatus) gameStatus.innerText = 'Bấm vào ô để đánh cờ';

        if (botResult.success) {
          updateBoardUI(botResult.lastMove);
          addMoveToHistory(botResult.lastMove);

          if (botResult.isGameOver) {
            stopTurnTimer();
            updateScoresUI();

            if (botResult.winner === 'DRAW') {
              showWinModal('HÒA CỜ!', 'Trận đấu bất phân thắng bại!');
            } else {
              if (botResult.winningLine) {
                botResult.winningLine.forEach(pos => {
                  const winCell = document.getElementById(`cell-${pos.row}-${pos.col}`);
                  if (winCell) winCell.classList.add('win-cell');
                });
              }
              showWinModal('BOT AI THẮNG! 🤖', 'Bot AI đã xếp đủ 5 quân liên tiếp! Hãy bấm Ván Mới để phục thù.');
            }
          } else {
            resetTurnTimer();
          }
        }
      }, 400);
    }
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
      turnPlayerText.innerText = 'Lượt của Bạn (X)';
    } else {
      turnBadge.className = 'px-3 py-1 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/30 text-xs font-bold flex items-center gap-1.5 shadow-sm';
      turnPlayerIcon.innerText = 'O';
      turnPlayerText.innerText = window.gameEngine.gameMode === 'BOT' ? 'Lượt của Bot AI (O)' : 'Lượt của Player O (Bạn anh)';
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
  // Chuyển đổi chế độ chơi (Bot AI vs 2 Người)
  const btnModeBot = document.getElementById('btnModeBot');
  const btnModePvP = document.getElementById('btnModePvP');

  btnModeBot?.addEventListener('click', () => {
    btnModeBot.className = 'px-2.5 py-1 text-xs font-semibold rounded-lg bg-cyan-600 text-white transition flex items-center gap-1.5 shadow-sm';
    btnModePvP.className = 'px-2.5 py-1 text-xs font-semibold rounded-lg text-slate-400 hover:text-white transition flex items-center gap-1.5';
    window.gameEngine.setGameMode('BOT');
    document.getElementById('btnNewGame')?.click();
  });

  btnModePvP?.addEventListener('click', () => {
    btnModePvP.className = 'px-2.5 py-1 text-xs font-semibold rounded-lg bg-pink-600 text-white transition flex items-center gap-1.5 shadow-sm';
    btnModeBot.className = 'px-2.5 py-1 text-xs font-semibold rounded-lg text-slate-400 hover:text-white transition flex items-center gap-1.5';
    window.gameEngine.setGameMode('PVP');
    document.getElementById('btnNewGame')?.click();
  });

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

/**
 * Quản lý sự kiện Firebase Realtime Online
 */
function initFirebaseEvents() {
  const firebaseModal = document.getElementById('firebaseModal');
  const btnOpenConfig = document.getElementById('btnOpenFirebaseConfig');
  const btnCloseConfig = document.getElementById('btnCloseFirebaseModal');
  const btnCancelConfig = document.getElementById('btnCancelFirebaseModal');
  const btnSaveConfig = document.getElementById('btnSaveFirebaseConfig');
  const configInput = document.getElementById('firebaseConfigInput');

  const savedConfig = window.firebaseService?.getConfig();
  if (savedConfig && configInput) {
    configInput.value = JSON.stringify(savedConfig, null, 2);
  }

  const toggleModal = (show) => {
    if (firebaseModal) {
      if (show) firebaseModal.classList.remove('hidden');
      else firebaseModal.classList.add('hidden');
    }
  };

  btnOpenConfig?.addEventListener('click', () => toggleModal(true));
  btnCloseConfig?.addEventListener('click', () => toggleModal(false));
  btnCancelConfig?.addEventListener('click', () => toggleModal(false));

  btnSaveConfig?.addEventListener('click', () => {
    const raw = configInput.value.trim();
    if (!raw) {
      alert('Vui lòng dán đoạn mã cấu hình Firebase Config!');
      return;
    }
    try {
      const config = JSON.parse(raw);
      if (window.firebaseService.saveConfig(config)) {
        alert('🎉 Đã kết nối Firebase Realtime Database thành công!');
        toggleModal(false);
      } else {
        alert('Có lỗi khi khởi tạo Firebase! Vui lòng kiểm tra lại cấu hình.');
      }
    } catch (e) {
      alert('Cấu hình JSON không hợp lệ! Vui lòng kiểm tra lại định dạng JSON.');
    }
  });

  // Tạo phòng Online
  document.getElementById('btnCreateRoom')?.addEventListener('click', async () => {
    if (!window.firebaseService || !window.firebaseService.isOnline) {
      toggleModal(true);
      return;
    }

    const roomId = await window.firebaseService.createRoom();
    if (roomId) {
      setupOnlineRoomUI(roomId, 'Player X (Chủ phòng)');
      bindOnlineRoomListener();
      window.gameEngine.resetGame();
      initBoard();
      alert(`🎉 Đã tạo phòng thành công! Mã phòng là: ${roomId}\nHãy gửi mã này cho bạn của anh nhé.`);
    }
  });

  // Vào phòng Online
  document.getElementById('btnJoinRoom')?.addEventListener('click', async () => {
    if (!window.firebaseService || !window.firebaseService.isOnline) {
      toggleModal(true);
      return;
    }

    const input = document.getElementById('inputRoomId');
    const roomId = input?.value.trim().toUpperCase();
    if (!roomId) {
      alert('Vui lòng nhập mã phòng!');
      return;
    }

    const ok = await window.firebaseService.joinRoom(roomId);
    if (ok) {
      setupOnlineRoomUI(roomId, 'Player O (Khách)');
      bindOnlineRoomListener();
      window.gameEngine.resetGame();
      initBoard();
      alert(`🎉 Đã vào phòng ${roomId} thành công! Bắt đầu thi đấu.`);
    }
  });
}

function setupOnlineRoomUI(roomId, roleText) {
  const banner = document.getElementById('roomActiveBanner');
  const displayId = document.getElementById('displayRoomId');
  const displayRole = document.getElementById('displayPlayerRole');

  if (banner) banner.classList.remove('hidden');
  if (displayId) displayId.innerText = roomId;
  if (displayRole) displayRole.innerText = roleText;

  document.getElementById('btnModePvP')?.click();
}

function bindOnlineRoomListener() {
  window.firebaseService.listenToRoom((roomData, myRole) => {
    if (!roomData) return;

    if (roomData.guest && roomData.status === 'playing') {
      const statusText = document.getElementById('gameStatusText');
      if (statusText) statusText.innerText = '🟢 Đối thủ đã vào phòng! Đang thi đấu...';
    }

    if (roomData.lastMove) {
      const last = roomData.lastMove;
      const currentCell = window.gameEngine.board[last.row][last.col];

      if (currentCell === null) {
        window.gameEngine.board[last.row][last.col] = last.player;
        window.gameEngine.moveHistory.push(last);
        window.gameEngine.currentPlayer = roomData.turn;

        updateBoardUI(last);
        addMoveToHistory(last);

        if (roomData.winner) {
          stopTurnTimer();
          updateScoresUI();
          if (roomData.winningLine) {
            roomData.winningLine.forEach(pos => {
              const winCell = document.getElementById(`cell-${pos.row}-${pos.col}`);
              if (winCell) winCell.classList.add('win-cell');
            });
          }
          const isWinner = roomData.winner === myRole;
          showWinModal(
            isWinner ? 'CHIẾN THẮNG! 🏆' : 'THUA CUỘC! 😢',
            isWinner ? 'Bạn đã đánh bại đối thủ!' : 'Đối thủ đã xếp đủ 5 quân liên tiếp!'
          );
        } else {
          resetTurnTimer();
        }
      }
    }
  });
}


/**
 * Quản lý & Hiển thị nhật ký cập nhật của 2 lập trình viên
 */
async function initDevChangelog() {
  const container = document.getElementById('changelogListContainer');
  const btnAll = document.getElementById('btnFilterAll');
  const btnDev2 = document.getElementById('btnFilterDev2');
  const btnDev1 = document.getElementById('btnFilterDev1');

  if (!container) return;

  const updates = await TeamAPI.getDevUpdates();

  const renderChangelog = (filter) => {
    container.innerHTML = '';
    const filtered = filter === 'all' ? updates : updates.filter(u => u.roleType === filter);

    if (filtered.length === 0) {
      container.innerHTML = '<p class="text-xs text-slate-500 italic py-3 text-center">Chưa có ghi chú cập nhật nào.</p>';
      return;
    }

    filtered.forEach(item => {
      const isDev2 = item.roleType === 'dev2';
      const borderCol = isDev2 ? 'border-cyan-500/30' : 'border-pink-500/30';
      const badgeBg = isDev2 ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-pink-500/10 text-pink-400 border-pink-500/20';

      const card = document.createElement('div');
      card.className = `p-4 rounded-xl bg-slate-950/80 border ${borderCol} space-y-2 hover:border-slate-700 transition`;
      card.innerHTML = `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeBg}">
              ${item.author}
            </span>
            <span class="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded font-bold">
              ${item.version}
            </span>
            <strong class="text-xs text-white">${item.title}</strong>
          </div>
          <div class="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
            <span>[#${item.commit}]</span>
            <span>•</span>
            <span>${item.time}</span>
          </div>
        </div>
        <p class="text-xs text-slate-300 leading-relaxed pl-1">${item.details}</p>
      `;
      container.appendChild(card);
    });

    if (window.lucide) lucide.createIcons();
  };

  renderChangelog('all');

  btnAll?.addEventListener('click', () => {
    btnAll.className = 'px-3 py-1 text-xs font-semibold rounded-lg bg-cyan-600 text-white transition';
    btnDev2.className = 'px-3 py-1 text-xs font-semibold rounded-lg text-slate-400 hover:text-white transition';
    btnDev1.className = 'px-3 py-1 text-xs font-semibold rounded-lg text-slate-400 hover:text-white transition';
    renderChangelog('all');
  });

  btnDev2?.addEventListener('click', () => {
    btnDev2.className = 'px-3 py-1 text-xs font-semibold rounded-lg bg-cyan-600 text-white transition';
    btnAll.className = 'px-3 py-1 text-xs font-semibold rounded-lg text-slate-400 hover:text-white transition';
    btnDev1.className = 'px-3 py-1 text-xs font-semibold rounded-lg text-slate-400 hover:text-white transition';
    renderChangelog('dev2');
  });

  btnDev1?.addEventListener('click', () => {
    btnDev1.className = 'px-3 py-1 text-xs font-semibold rounded-lg bg-pink-600 text-white transition';
    btnAll.className = 'px-3 py-1 text-xs font-semibold rounded-lg text-slate-400 hover:text-white transition';
    btnDev2.className = 'px-3 py-1 text-xs font-semibold rounded-lg text-slate-400 hover:text-white transition';
    renderChangelog('dev1');
  });
}
