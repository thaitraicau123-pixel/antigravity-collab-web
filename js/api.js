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

// Dữ liệu nhật ký phiên bản đã được biên tập chuẩn xác (Dùng làm Fallback & Metadata giàu thông tin)
const CURATED_METADATA = {
  'f5554e2': {
    version: 'v1.5.0',
    title: 'Hệ Thống Version Changelog & GitHub Live Tracker',
    details: 'Thiết kế bộ xử lý logic đồng bộ phiên bản tự động từ GitHub API, phân luồng đóng góp theo từng lập trình viên (Dev 1 UI / Dev 2 Logic), theo dõi commit thời gian thực và tự động sao lưu dữ liệu ngoại tuyến.'
  },
  '4776a51': {
    version: 'v1.4.2',
    title: 'Firebase Hosting & Script Tự Động Triển Khai',
    details: 'Thiết lập cấu hình firebase.json, tối ưu hóa bộ nhớ đệm cache-control và viết script day_len_firebase.bat hỗ trợ deploy một chạm lên hệ thống Firebase Cloud.'
  },
  '4a06c90': {
    version: 'v1.4.1',
    title: 'Bộ Quy Tắc Kiểm Soát Nhánh Strict-Logic-Only',
    details: 'Bổ sung quy định kiểm soát phân quyền AGENTS.md, khóa tuyệt đối việc sửa đè branch feat/ui, phân tách rành mạch trách nhiệm UI vs Logic giữa 2 bên.'
  },
  '60b5f1b': {
    version: 'v1.4.0',
    title: 'Tối Ưu Hóa Quyền Truy Cập GitHub API Token',
    details: 'Loại bỏ cấu hình workflow xung đột để hỗ trợ đẩy code an toàn qua GitHub Personal Access Token và duy trì luồng làm việc tự động.'
  },
  'eb0dbe9': {
    version: 'v1.3.5',
    title: 'Khung Nhật Ký Đóng Góp & Lịch Sử Push/Pull',
    details: 'Xây dựng cấu trúc dữ liệu theo dõi hoạt động đẩy code (Push) và kéo code (Pull) giữa 2 tài khoản Antigravity song hành.'
  },
  '679ef54': {
    version: 'v1.3.0',
    title: 'Kết Nối Đấu Online Realtime Qua Firebase Database',
    details: 'Xây dựng hệ thống phòng chơi 2 người qua mạng (PVP Online), tạo mã phòng ngẫu nhiên, lắng nghe nước đi realtime qua WebSocket Firebase và đồng bộ đồng hồ tính giờ.'
  },
  '1a4fd79': {
    version: 'v1.2.5',
    title: 'Trí Tuệ Nhân Tạo AI Bot Gomoku Thông Minh',
    details: 'Triển khai thuật toán Heuristic định lượng nước cờ hiểm, tự động hóa nước đi của Máy (Bot O), chủ động chặn đứng chuỗi 3 quân, 4 quân đối phương và tạo đòn thế tấn công hiểm hóc.'
  },
  'b0473a2': {
    version: 'v1.2.2',
    title: 'Cơ Chế Đồng Bộ Git Tự Động (Auto-Git-Sync)',
    details: 'Thiết lập rule tự động kiểm tra nhánh từ xa trước mỗi lần commit, đảm bảo code logic của cả 2 bạn không bị xung đột nhánh.'
  },
  '2de39c0': {
    version: 'v1.2.0',
    title: 'Thuật Toán 5 Quân Liên Tiếp & Engine Gomoku 12x12',
    details: 'Thuật toán kiểm tra thắng thua theo 4 phương vị (hàng ngang, hàng dọc, 2 đường chéo chính phụ), quản lý ma trận trạng thái 12x12 và lưu điểm số vào LocalStorage.'
  },
  'dd9e2cd': {
    version: 'v1.1.5',
    title: 'Hợp Nhất Pull Request #1 & Phê Duyệt Thuật Toán',
    details: 'Bạn anh review và merge PR #1 từ nhánh feat/logic vào nhánh main, kiểm thử tương thích hiển thị giữa bàn cờ Neon và thuật toán cờ Caro 12x12.'
  },
  'df9b336': {
    version: 'v1.1.0',
    title: 'Hệ Thống Thống Kê Tiến Độ Dự Án Thời Gian Thực',
    details: 'Tính toán tỷ lệ phần trăm hoàn thành các tính năng theo lộ trình, cập nhật thanh tiến độ trực quan và phân loại trạng thái Todo/In Progress/Done.'
  },
  '7d7284a': {
    version: 'v1.0.5',
    title: 'Tích Hợp Khởi Động Nhanh Với GitHub Desktop',
    details: 'Viết file batch tự động mở thư mục làm việc trực tiếp trong giao diện trực quan của GitHub Desktop giúp thao tác đồ họa thuận tiện.'
  },
  '1b2c325': {
    version: 'v1.0.2',
    title: 'Tài Liệu Hướng Dẫn Phối Hợp & Script Đẩy Nhanh',
    details: 'Biên soạn hướng dẫn chi tiết từng bước cho Bạn 1 và Bạn 2 cùng script day_len_github.bat hỗ trợ đẩy đồng thời cả 3 nhánh lên GitHub.'
  },
  'bf436af': {
    version: 'v1.0.0',
    title: 'Khởi Tạo Kiến Trúc BoardGame Duo & Quy Trình AGENTS.md',
    details: 'Phân chia không gian làm việc giữa 2 tài khoản Antigravity, thiết kế khung Dark Theme Cyber Neon và kịch bản deploy tự động lên GitHub Pages.'
  },
  'ee1c423': {
    version: 'v1.4.1',
    title: 'Giao Diện Grandmaster Admin Portal & Cổng Bí Mật',
    details: 'Thiết kế giao diện cổng quản trị Grandmaster Admin với 4 cổng truy cập bảo mật (triple-click logo, phím tắt, URL hash, footer) cùng hệ thống thống kê người chơi.'
  },
  '631be54': {
    version: 'v1.3.8',
    title: 'Bảng Điều Khiển Quản Trị & Cân Bằng Game',
    details: 'Xây dựng giao diện phân tích số liệu trận đấu, quản lý danh sách người chơi và tinh chỉnh độ khó AI trực quan.'
  },
  '5c2ce7b': {
    version: 'v1.3.2',
    title: 'Bộ Phông Chữ Tiếng Việt Sang Trọng & Hoàn Thiện Typography',
    details: 'Tích hợp bộ phông chữ Google Fonts Be Vietnam Pro & Playfair Display, khắc phục triệt để lỗi hiển thị dấu tiếng Việt trên trình duyệt.'
  },
  'bd763cb': {
    version: 'v1.2.8',
    title: 'Giao Diện Đăng Nhập Firebase Auth & Hồ Sơ Thành Viên',
    details: 'Thiết kế form modal đăng nhập, đăng ký tài khoản thành viên VIP và lưu trữ thông tin hồ sơ người chơi.'
  },
  '9746d8f': {
    version: 'v1.2.6',
    title: 'Thiết Kế Bàn Cờ Cao Cấp Phong Cách Bàn Gỗ & Khay Xúc Xắc',
    details: 'Nâng cấp toàn diện mỹ thuật bàn chơi: khay da đổ xúc xắc, quân cờ acrylic bóng mờ và hiệu ứng ánh sáng hoàng gia.'
  },
  '86e3604': {
    version: 'v1.2.4',
    title: 'Thanh Điều Hướng, Bảng Xếp Hạng & Bảng Giá VIP',
    details: 'Bổ sung thanh Menu Navigation, Bảng vàng thành tích các kỳ thủ, Bảng giới thiệu luật chơi Caro và Gói cước thành viên VIP.'
  },
  '2d458fd': {
    version: 'v1.4.3',
    title: 'Tối Ưu Hóa Giao Diện Thi Đấu & Ẩn Metadata Nội Bộ',
    details: 'Chuẩn hóa giao diện người dùng công cộng, tinh giản thanh công cụ và bảo toàn 4 cổng bí mật của Grandmaster Admin Portal.'
  }
};

// Danh sách cập nhật dự phòng chất lượng cao
const DEFAULT_DEV_UPDATES = [
  {
    roleType: 'dev2',
    author: 'thaitraicau123-pixel (Anh)',
    version: 'v1.5.0',
    title: 'Hệ Thống Version Changelog & GitHub Live Tracker',
    commit: 'f5554e2',
    time: '26/10/2026 00:15',
    details: 'Thiết kế bộ xử lý logic đồng bộ phiên bản tự động từ GitHub API, phân luồng đóng góp theo từng lập trình viên (Dev 1 UI / Dev 2 Logic), theo dõi commit thời gian thực và tự động sao lưu dữ liệu ngoại tuyến.'
  },
  {
    roleType: 'dev1',
    author: 'cuongcuca111-web (Bạn anh)',
    version: 'v1.4.3',
    title: 'Tối Ưu Hóa Giao Diện Thi Đấu & Ẩn Metadata Nội Bộ',
    commit: '2d458fd',
    time: '26/10/2026 00:20',
    details: 'Chuẩn hóa giao diện người dùng công cộng, tinh giản thanh công cụ và bảo toàn 4 cổng bí mật của Grandmaster Admin Portal.'
  },
  {
    roleType: 'dev2',
    author: 'thaitraicau123-pixel (Anh)',
    version: 'v1.4.2',
    title: 'Firebase Hosting & Script Tự Động Triển Khai',
    commit: '4776a51',
    time: '26/10/2026 00:04',
    details: 'Thiết lập cấu hình firebase.json, tối ưu hóa bộ nhớ đệm cache-control và viết script day_len_firebase.bat hỗ trợ deploy một chạm lên hệ thống Firebase Cloud.'
  },
  {
    roleType: 'dev1',
    author: 'cuongcuca111-web (Bạn anh)',
    version: 'v1.4.1',
    title: 'Giao Diện Grandmaster Admin Portal & Cổng Bí Mật',
    commit: 'ee1c423',
    time: '26/10/2026 00:01',
    details: 'Thiết kế giao diện cổng quản trị Grandmaster Admin với 4 cổng truy cập bảo mật (triple-click logo, phím tắt, URL hash, footer) cùng hệ thống thống kê người chơi.'
  },
  {
    roleType: 'dev2',
    author: 'thaitraicau123-pixel (Anh)',
    version: 'v1.4.0',
    title: 'Kết Nối Đấu Online Realtime Qua Firebase Database',
    commit: '679ef54',
    time: '25/10/2026 23:45',
    details: 'Xây dựng hệ thống phòng chơi 2 người qua mạng (PVP Online), tạo mã phòng ngẫu nhiên, lắng nghe nước đi realtime qua WebSocket Firebase và đồng bộ đồng hồ tính giờ.'
  },
  {
    roleType: 'dev1',
    author: 'cuongcuca111-web (Bạn anh)',
    version: 'v1.3.2',
    title: 'Bộ Phông Chữ Tiếng Việt Sang Trọng & Hoàn Thiện Typography',
    commit: '5c2ce7b',
    time: '25/10/2026 23:30',
    details: 'Tích hợp bộ phông chữ Google Fonts Be Vietnam Pro & Playfair Display, khắc phục triệt để lỗi hiển thị dấu tiếng Việt trên trình duyệt.'
  },
  {
    roleType: 'dev2',
    author: 'thaitraicau123-pixel (Anh)',
    version: 'v1.3.0',
    title: 'Trí Tuệ Nhân Tạo AI Bot Gomoku Thông Minh',
    commit: '1a4fd79',
    time: '25/10/2026 23:15',
    details: 'Triển khai thuật toán Heuristic định lượng nước cờ hiểm, tự động hóa nước đi của Máy (Bot O), chủ động chặn đứng chuỗi 3 quân, 4 quân đối phương và tạo đòn thế tấn công hiểm hóc.'
  },
  {
    roleType: 'dev1',
    author: 'cuongcuca111-web (Bạn anh)',
    version: 'v1.2.0',
    title: 'Hợp Nhất Pull Request #1 & Phê Duyệt Thuật Toán',
    commit: 'dd9e2cd',
    time: '25/10/2026 22:50',
    details: 'Bạn anh review và merge PR #1 từ nhánh feat/logic vào nhánh main, kiểm thử tương thích hiển thị giữa bàn cờ Neon và thuật toán cờ Caro 12x12.'
  },
  {
    roleType: 'dev2',
    author: 'thaitraicau123-pixel (Anh)',
    version: 'v1.1.0',
    title: 'Thuật Toán 5 Quân Liên Tiếp & Engine Gomoku 12x12',
    commit: '2de39c0',
    time: '25/10/2026 22:30',
    details: 'Thuật toán kiểm tra thắng thua theo 4 phương vị (hàng ngang, hàng dọc, 2 đường chéo chính phụ), quản lý ma trận trạng thái 12x12 và lưu điểm số vào LocalStorage.'
  },
  {
    roleType: 'dev1',
    author: 'cuongcuca111-web (Bạn anh)',
    version: 'v1.0.0',
    title: 'Khởi Tạo Kiến Trúc BoardGame Duo & Quy Trình AGENTS.md',
    commit: 'bf436af',
    time: '25/10/2026 22:00',
    details: 'Phân chia không gian làm việc giữa 2 tài khoản Antigravity, thiết kế khung Dark Theme Cyber Neon và kịch bản deploy tự động lên GitHub Pages.'
  }
];

// Bộ API Task & Quản lý nhóm (để 2 bạn cùng theo dõi tiến độ)
const TeamAPI = {
  REPO_OWNER: 'thaitraicau123-pixel',
  REPO_NAME: 'antigravity-collab-web',

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
  },

  /**
   * Quản lý GitHub Personal Access Token (tùy chọn)
   */
  setGitHubToken(token) {
    if (token) {
      localStorage.setItem('boardgame_github_token', token.trim());
    } else {
      localStorage.removeItem('boardgame_github_token');
    }
  },

  getGitHubToken() {
    return localStorage.getItem('boardgame_github_token') || '';
  },

  /**
   * Định dạng thời gian theo phong cách tiếng Việt
   */
  formatDate(dateStr) {
    if (!dateStr) return 'Vừa xong';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      const pad = n => String(n).padStart(2, '0');
      return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear() + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
    } catch (e) {
      return dateStr;
    }
  },

  /**
   * Chuyển đổi đối tượng Commit từ GitHub REST API sang định dạng hiển thị Changelog
   */
  formatCommitToItem(c, index) {
    const sha7 = (c.sha || '').substring(0, 7);
    const msg = (c.commit && c.commit.message) || '';
    const firstLine = msg.split(String.fromCharCode(10))[0].trim();
    const authorLogin = (c.author && c.author.login) || '';
    const authorName = (c.commit && c.commit.author && c.commit.author.name) || '';

    // Nhận diện lập trình viên
    const isDev1 = authorLogin.includes('cuongcuca') ||
                   authorName.includes('cuongcuca') ||
                   firstLine.includes('(ui)') ||
                   firstLine.includes('feat/ui') ||
                   firstLine.includes('style(') ||
                   firstLine.includes('admin') ||
                   firstLine.includes('typography');

    const roleType = isDev1 ? 'dev1' : 'dev2';
    const author = isDev1 ? 'cuongcuca111-web (Bạn anh)' : 'thaitraicau123-pixel (Anh)';

    const commitUrl = c.html_url || ('https://github.com/' + this.REPO_OWNER + '/' + this.REPO_NAME + '/commit/' + sha7);
    const commitLinkHtml = '<a href="' + commitUrl + '" target="_blank" rel="noopener noreferrer" class="hover:underline text-cyan-400 font-mono transition">' + sha7 + '</a>';
    const formattedTime = this.formatDate(c.commit && c.commit.author && c.commit.author.date);

    // Nếu đã có metadata tra cứu sẵn
    const curated = CURATED_METADATA[sha7];
    if (curated) {
      return {
        roleType,
        author,
        version: curated.version,
        title: curated.title,
        commit: commitLinkHtml,
        time: formattedTime,
        details: curated.details
      };
    }

    // Nếu là commit mới hoàn toàn, tự động chuẩn hóa tiêu đề và chi tiết
    let cleanTitle = firstLine;
    if (cleanTitle.startsWith('feat(')) {
      const scope = cleanTitle.substring(5, cleanTitle.indexOf(')'));
      cleanTitle = '[Tính Năng - ' + scope.toUpperCase() + '] ' + cleanTitle.substring(cleanTitle.indexOf(':') + 1).trim();
    } else if (cleanTitle.startsWith('feat:')) {
      cleanTitle = '[Tính Năng] ' + cleanTitle.substring(5).trim();
    } else if (cleanTitle.startsWith('fix(') || cleanTitle.startsWith('fix:')) {
      cleanTitle = '[Sửa Lỗi] ' + cleanTitle.substring(cleanTitle.indexOf(':') + 1).trim();
    } else if (cleanTitle.startsWith('chore(') || cleanTitle.startsWith('chore:')) {
      cleanTitle = '[Bảo Trì Hệ Thống] ' + cleanTitle.substring(cleanTitle.indexOf(':') + 1).trim();
    } else if (cleanTitle.startsWith('style(') || cleanTitle.startsWith('style:')) {
      cleanTitle = '[Giao Diện & Style] ' + cleanTitle.substring(cleanTitle.indexOf(':') + 1).trim();
    }

    const doubleNL = String.fromCharCode(10) + String.fromCharCode(10);
    const details = msg.includes(doubleNL)
      ? msg.substring(msg.indexOf(doubleNL) + 2).trim()
      : 'Đẩy bản cập nhật mã nguồn lên repository: ' + firstLine;

    const calculatedVersion = 'v1.' + Math.max(1, 5 - Math.floor(index / 3)) + '.' + (index % 3);

    return {
      roleType,
      author,
      version: calculatedVersion,
      title: cleanTitle,
      commit: commitLinkHtml,
      time: formattedTime,
      details: details
    };
  },

  /**
   * Lấy danh sách lịch sử phiên bản và cập nhật của 2 lập trình viên
   * Có hỗ trợ GitHub REST API Live Fetching + Caching + Fallback
   */
  async getDevUpdates(forceRefresh = false) {
    const CACHE_KEY = 'boardgame_dev_updates_cache';
    const CACHE_TIME_KEY = 'boardgame_dev_updates_cache_time';
    const CACHE_DURATION = 5 * 60 * 1000; // 5 phút

    // 1. Kiểm tra Cache trong SessionStorage
    if (!forceRefresh) {
      try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        const cacheTime = sessionStorage.getItem(CACHE_TIME_KEY);
        if (cached && cacheTime && (Date.now() - parseInt(cacheTime, 10) < CACHE_DURATION)) {
          return JSON.parse(cached);
        }
      } catch (e) {}
    }

    // 2. Thử gọi GitHub REST API để lấy commit thời gian thực
    try {
      const headers = {
        'Accept': 'application/vnd.github.v3+json'
      };

      const token = this.getGitHubToken();
      if (token) {
        headers['Authorization'] = 'Bearer ' + token;
      }

      // Lấy song song commits từ nhánh main và nhánh feat/ui
      const [mainRes, uiRes] = await Promise.all([
        fetch('https://api.github.com/repos/' + this.REPO_OWNER + '/' + this.REPO_NAME + '/commits?sha=main&per_page=20', { headers }),
        fetch('https://api.github.com/repos/' + this.REPO_OWNER + '/' + this.REPO_NAME + '/commits?sha=feat/ui&per_page=20', { headers }).catch(() => null)
      ]);

      if (mainRes.ok) {
        const mainCommits = await mainRes.json();
        const uiCommits = (uiRes && uiRes.ok) ? await uiRes.json() : [];

        // Gộp commits từ 2 nhánh không bị trùng lặp
        const commitMap = new Map();
        [...(Array.isArray(mainCommits) ? mainCommits : []), ...(Array.isArray(uiCommits) ? uiCommits : [])].forEach(c => {
          if (c && c.sha && !commitMap.has(c.sha)) {
            commitMap.set(c.sha, c);
          }
        });

        // Sắp xếp theo ngày giảm dần (mới nhất lên đầu)
        const sortedCommits = Array.from(commitMap.values()).sort((a, b) => {
          const dateA = new Date((a.commit && a.commit.author && a.commit.author.date) || 0);
          const dateB = new Date((b.commit && b.commit.author && b.commit.author.date) || 0);
          return dateB - dateA;
        });

        const liveUpdates = sortedCommits.map((c, idx) => this.formatCommitToItem(c, idx));

        if (liveUpdates.length > 0) {
          try {
            sessionStorage.setItem(CACHE_KEY, JSON.stringify(liveUpdates));
            sessionStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
          } catch (e) {}
          return liveUpdates;
        }
      }
    } catch (apiErr) {
      console.warn('[TeamAPI] Không thể kết nối trực tiếp GitHub API, chuyển sang chế độ dữ liệu offline dự phòng:', apiErr.message);
    }

    // 3. Fallback: Dùng danh sách cập nhật đã biên dịch sẵn nếu API bị chặn hoặc offline
    const fallbackUpdates = DEFAULT_DEV_UPDATES.map(item => {
      const commitUrl = 'https://github.com/' + this.REPO_OWNER + '/' + this.REPO_NAME + '/commit/' + item.commit;
      return {
        ...item,
        commit: '<a href="' + commitUrl + '" target="_blank" rel="noopener noreferrer" class="hover:underline text-cyan-400 font-mono transition">' + item.commit + '</a>'
      };
    });

    return fallbackUpdates;
  },

  /**
   * Thống kê đóng góp của 2 lập trình viên
   */
  async getContributorsSummary() {
    const updates = await this.getDevUpdates();
    const dev2Updates = updates.filter(u => u.roleType === 'dev2');
    const dev1Updates = updates.filter(u => u.roleType === 'dev1');
    return {
      totalCommits: updates.length,
      dev2Commits: dev2Updates.length,
      dev1Commits: dev1Updates.length,
      latestVersion: (updates[0] && updates[0].version) || 'v1.5.0',
      lastUpdated: (updates[0] && updates[0].time) || 'Vừa xong'
    };
  }
};

window.gameEngine = new BoardGameEngine();
window.TeamAPI = TeamAPI;
