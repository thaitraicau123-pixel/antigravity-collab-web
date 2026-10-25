/**
 * ============================================================================
 * [Collab-Acc2]: ENGINE BOARD GAME & DATA LOGIC (Phụ trách bởi Tài Khoản 2)
 * ============================================================================
 * Chứa toàn bộ thuật toán luật chơi Cờ Caro 5 ô, tính điểm, lượt đánh,
 * lưu trữ điểm số LocalStorage và quản lý trạng thái bàn cờ.
 */

const STORAGE_KEYS = {
  SCORES: 'boardgame_scores',
  TASKS: 'boardgame_dev_tasks',
  ACTIVITY: 'boardgame_activity'
};

const BOARD_SIZE = 12; // 12x12 grid

// Dữ liệu lộ trình tính năng phát triển Board Game cho 2 bạn
const DEFAULT_TASKS = [
  {
    id: 'task-1',
    title: 'Dựng bàn cờ Caro 12x12 và hiệu ứng Neon quân cờ X/O',
    assignee: 'Acc 1 (UI/UX)',
    priority: 'Cao',
    status: 'done',
    branch: 'feat/board-ui'
  },
  {
    id: 'task-2',
    title: 'Viết thuật toán kiểm tra 5 quân liên tiếp thắng thua',
    assignee: 'Acc 2 (Logic)',
    priority: 'Cao',
    status: 'done',
    branch: 'feat/game-logic'
  },
  {
    id: 'task-3',
    title: 'Thêm âm thanh click khi đánh cờ & nhạc nền retro',
    assignee: 'Acc 1 (UI/UX)',
    priority: 'Trung bình',
    status: 'inProgress',
    branch: 'feat/sound-fx'
  },
  {
    id: 'task-4',
    title: 'Thêm đồng hồ đếm ngược 30 giây cho mỗi lượt đánh',
    assignee: 'Acc 2 (Logic)',
    priority: 'Trung bình',
    status: 'inProgress',
    branch: 'feat/turn-timer'
  },
  {
    id: 'task-5',
    title: 'Tích hợp kết nối WebRTC / Socket để 2 máy khác nhau chơi online',
    assignee: 'Acc 2 (Logic)',
    priority: 'Cao',
    status: 'todo',
    branch: 'feat/online-multiplayer'
  },
  {
    id: 'task-6',
    title: 'Thêm mini game thứ 2: Cờ Vua hoặc Cờ Cá Ngựa (Ludo)',
    assignee: 'Acc 1 (UI/UX)',
    priority: 'Thấp',
    status: 'todo',
    branch: 'feat/game-chess'
  }
];

class BoardGameEngine {
  constructor() {
    this.board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
    this.currentPlayer = 'X'; // X đi trước
    this.isGameOver = false;
    this.winner = null;
    this.winningLine = [];
    this.moveHistory = [];
    this.timeLeft = 30;
    this.timerInterval = null;
    this.gameMode = 'BOT'; // 'BOT' (Chơi với máy) hoặc 'PVP' (2 người)
    this.isBotThinking = false;
  }

  setGameMode(mode) {
    this.gameMode = mode;
    return this.gameMode;
  }

  /**
   * Khởi tạo bàn cờ mới
   */
  resetGame() {
    this.board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
    this.currentPlayer = 'X';
    this.isGameOver = false;
    this.winner = null;
    this.winningLine = [];
    this.moveHistory = [];
    this.timeLeft = 30;
    this.isBotThinking = false;
    return this.getState();
  }

  /**
   * Đánh một nước cờ
   * @param {number} row
   * @param {number} col
   * @returns {Object} {success, state, win}
   */
  makeMove(row, col) {
    if (this.isGameOver) return { success: false, message: 'Trò chơi đã kết thúc' };
    if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE) return { success: false };
    if (this.board[row][col] !== null) return { success: false, message: 'Ô này đã có người đánh' };

    // Đặt quân cờ
    this.board[row][col] = this.currentPlayer;
    const move = { row, col, player: this.currentPlayer, time: new Date().toLocaleTimeString() };
    this.moveHistory.push(move);

    // Kiểm tra thắng thua 5 ô liên tiếp
    const winResult = this.checkWin(row, col, this.currentPlayer);

    if (winResult.won) {
      this.isGameOver = true;
      this.winner = this.currentPlayer;
      this.winningLine = winResult.line;
      this.updateScore(this.currentPlayer);
    } else if (this.moveHistory.length === BOARD_SIZE * BOARD_SIZE) {
      this.isGameOver = true;
      this.winner = 'DRAW';
      this.updateScore('DRAW');
    } else {
      // Đổi lượt
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      this.timeLeft = 30;
    }

    return {
      success: true,
      lastMove: move,
      isGameOver: this.isGameOver,
      winner: this.winner,
      winningLine: this.winningLine,
      currentPlayer: this.currentPlayer
    };
  }

  /**
   * Đi lại nước trước (Undo)
   */
  undoMove() {
    if (this.moveHistory.length === 0 || this.isGameOver) return false;
    const last = this.moveHistory.pop();
    this.board[last.row][last.col] = null;
    this.currentPlayer = last.player;
    this.timeLeft = 30;
    return true;
  }

  /**
   * Thuật toán kiểm tra 5 quân cờ liên tiếp (Ngang, Dọc, 2 Chéo)
   */
  checkWin(row, col, player) {
    const directions = [
      [0, 1],   // Ngang
      [1, 0],   // Dọc
      [1, 1],   // Chéo chính (\)
      [1, -1]   // Chéo phụ (/)
    ];

    for (const [dx, dy] of directions) {
      const line = [{ row, col }];

      // Đi về phía trước
      let r = row + dx;
      let c = col + dy;
      while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && this.board[r][c] === player) {
        line.push({ row: r, col: c });
        r += dx;
        c += dy;
      }

      // Đi về phía sau
      r = row - dx;
      c = col - dy;
      while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && this.board[r][c] === player) {
        line.push({ row: r, col: c });
        r -= dx;
        c -= dy;
      }

      // Nếu đủ 5 quân trở lên -> Thắng!
      if (line.length >= 5) {
        return { won: true, line };
      }
    }

    return { won: false, line: [] };
  }

  /**
   * [Collab-Acc2]: Thuật toán Bot AI Heuristic đánh cờ Caro thông minh
   * Tự động tính toán điểm tấn công và phòng thủ chặn đối thủ
   * @returns {{row: number, col: number}}
   */
  calculateBestBotMove() {
    if (this.moveHistory.length === 0) {
      return { row: Math.floor(BOARD_SIZE / 2), col: Math.floor(BOARD_SIZE / 2) };
    }

    const botPlayer = 'O';
    const humanPlayer = 'X';

    let bestScore = -Infinity;
    let candidateMoves = [];

    const directions = [
      [0, 1],   // Ngang
      [1, 0],   // Dọc
      [1, 1],   // Chéo chính
      [1, -1]   // Chéo phụ
    ];

    const evaluatePoint = (r, c, player) => {
      let score = 0;
      for (const [dx, dy] of directions) {
        let count = 1;
        let openEnds = 0;

        // Tiến
        let step = 1;
        while (true) {
          const nr = r + dx * step;
          const nc = c + dy * step;
          if (nr < 0 || nr >= BOARD_SIZE || nc < 0 || nc >= BOARD_SIZE) break;
          if (this.board[nr][nc] === player) {
            count++;
            step++;
          } else if (this.board[nr][nc] === null) {
            openEnds++;
            break;
          } else {
            break;
          }
        }

        // Lùi
        step = 1;
        while (true) {
          const nr = r - dx * step;
          const nc = c - dy * step;
          if (nr < 0 || nr >= BOARD_SIZE || nc < 0 || nc >= BOARD_SIZE) break;
          if (this.board[nr][nc] === player) {
            count++;
            step++;
          } else if (this.board[nr][nc] === null) {
            openEnds++;
            break;
          } else {
            break;
          }
        }

        if (count >= 5) score += 100000;
        else if (count === 4) {
          if (openEnds === 2) score += 20000;
          else if (openEnds === 1) score += 5000;
        } else if (count === 3) {
          if (openEnds === 2) score += 3000;
          else if (openEnds === 1) score += 500;
        } else if (count === 2) {
          if (openEnds === 2) score += 200;
          else if (openEnds === 1) score += 50;
        }
      }
      return score;
    };

    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        if (this.board[r][c] !== null) continue;

        let hasNeighbor = false;
        for (let dr = -2; dr <= 2 && !hasNeighbor; dr++) {
          for (let dc = -2; dc <= 2; dc++) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE && this.board[nr][nc] !== null) {
              hasNeighbor = true;
              break;
            }
          }
        }
        if (!hasNeighbor) continue;

        const attackScore = evaluatePoint(r, c, botPlayer);
        const defenseScore = evaluatePoint(r, c, humanPlayer);

        let totalScore = attackScore + Math.floor(defenseScore * 1.3);
        totalScore += (12 - Math.abs(r - 5.5) - Math.abs(c - 5.5));

        if (totalScore > bestScore) {
          bestScore = totalScore;
          candidateMoves = [{ row: r, col: c }];
        } else if (totalScore === bestScore) {
          candidateMoves.push({ row: r, col: c });
        }
      }
    }

    if (candidateMoves.length === 0) {
      for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
          if (this.board[r][c] === null) return { row: r, col: c };
        }
      }
    }

    return candidateMoves[Math.floor(Math.random() * candidateMoves.length)];
  }

  /**
   * Lấy trạng thái hiện tại
   */
  getState() {
    return {
      board: this.board,
      currentPlayer: this.currentPlayer,
      isGameOver: this.isGameOver,
      winner: this.winner,
      winningLine: this.winningLine,
      moveCount: this.moveHistory.length,
      scores: this.getScores()
    };
  }

  /**
   * Lấy tỉ số từ LocalStorage
   */
  getScores() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SCORES);
      if (data) return JSON.parse(data);
    } catch (e) {}
    return { xWins: 0, oWins: 0, draws: 0 };
  }

  /**
   * Cập nhật tỉ số
   */
  updateScore(winner) {
    const scores = this.getScores();
    if (winner === 'X') scores.xWins++;
    else if (winner === 'O') scores.oWins++;
    else if (winner === 'DRAW') scores.draws++;

    localStorage.setItem(STORAGE_KEYS.SCORES, JSON.stringify(scores));
    return scores;
  }

  resetScores() {
    const defaultScores = { xWins: 0, oWins: 0, draws: 0 };
    localStorage.setItem(STORAGE_KEYS.SCORES, JSON.stringify(defaultScores));
    return defaultScores;
  }
}

// Bộ API Task & Quản lý nhóm (để 2 bạn cùng theo dõi tiến độ)
const TeamAPI = {
  async getTasks() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TASKS);
      if (data) return JSON.parse(data);
    } catch (e) {}
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(DEFAULT_TASKS));
    return [...DEFAULT_TASKS];
  },

  async updateTaskStatus(taskId, newStatus) {
    const tasks = await this.getTasks();
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      task.status = newStatus;
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
      return true;
    }
    return false;
  },

  async getProgressStats() {
    const tasks = await this.getTasks();
    const total = tasks.length;
    const done = tasks.filter(t => t.status === 'done').length;
    const inProgress = tasks.filter(t => t.status === 'inProgress').length;
    const todo = tasks.filter(t => t.status === 'todo').length;
    const percentage = total === 0 ? 0 : Math.round((done / total) * 100);
    return { total, done, inProgress, todo, percentage };
  }
};

window.gameEngine = new BoardGameEngine();
window.TeamAPI = TeamAPI;
