/**
 * ============================================================================
 * [Firebase-Service]: TẦNG ĐỒNG BỘ DỮ LIỆU ONLINE REALTIME (Tài Khoản 2)
 * ============================================================================
 * Kết nối Firebase Realtime Database để 2 người chơi ở 2 máy tính khác nhau
 * có thể đánh cờ trực tiếp qua mạng Internet theo thời gian thực (real-time).
 */

const FIREBASE_STORAGE_KEY = 'boardgame_firebase_config';

class FirebaseRealtimeService {
  constructor() {
    this.app = null;
    this.db = null;
    this.currentRoomId = null;
    this.playerRole = null; // 'X' (Chủ phòng) hoặc 'O' (Khách)
    this.roomListener = null;
    this.isOnline = false;
  }

  /**
   * Khởi tạo kết nối Firebase
   */
  init() {
    const savedConfig = this.getConfig();
    if (!savedConfig) {
      console.warn('[Firebase]: Chưa có cấu hình Firebase. Sử dụng chế độ Offline.');
      return false;
    }

    try {
      if (!window.firebase) {
        console.error('[Firebase]: Thư viện Firebase SDK chưa được tải.');
        return false;
      }

      if (!window.firebase.apps.length) {
        this.app = window.firebase.initializeApp(savedConfig);
      } else {
        this.app = window.firebase.app();
      }

      this.db = window.firebase.database();
      this.isOnline = true;
      console.log('[Firebase]: Kết nối Realtime Database thành công!');
      return true;
    } catch (e) {
      console.error('[Firebase]: Lỗi khởi tạo Firebase:', e);
      this.isOnline = false;
      return false;
    }
  }

  /**
   * Lưu cấu hình Firebase vào LocalStorage
   */
  saveConfig(configObject) {
    try {
      localStorage.setItem(FIREBASE_STORAGE_KEY, JSON.stringify(configObject));
      return this.init();
    } catch (e) {
      return false;
    }
  }

  /**
   * Đọc cấu hình Firebase từ LocalStorage
   */
  getConfig() {
    try {
      const data = localStorage.getItem(FIREBASE_STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  /**
   * Tạo phòng chơi mới trên Firebase
   * @returns {Promise<string|null>} Mã phòng
   */
  async createRoom() {
    if (!this.ensureConnected()) return null;

    const roomId = 'CARO-' + Math.floor(1000 + Math.random() * 9000);
    this.currentRoomId = roomId;
    this.playerRole = 'X'; // Chủ phòng là X

    const roomData = {
      id: roomId,
      createdAt: Date.now(),
      status: 'waiting', // waiting, playing, ended
      host: 'Player X (Chủ phòng)',
      guest: null,
      turn: 'X',
      board: Array(12).fill(null).map(() => Array(12).fill(null)),
      lastMove: null,
      winner: null,
      chat: []
    };

    try {
      await this.db.ref('rooms/' + roomId).set(roomData);
      return roomId;
    } catch (e) {
      console.error('[Firebase]: Lỗi tạo phòng:', e);
      return null;
    }
  }

  /**
   * Tham gia vào phòng chơi của bạn bè
   * @param {string} roomId
   * @returns {Promise<boolean>}
   */
  async joinRoom(roomId) {
    if (!this.ensureConnected()) return false;

    const formattedRoomId = roomId.trim().toUpperCase();
    try {
      const snapshot = await this.db.ref('rooms/' + formattedRoomId).once('value');
      if (!snapshot.exists()) {
        alert('Không tìm thấy mã phòng này! Vui lòng kiểm tra lại.');
        return false;
      }

      const data = snapshot.val();
      if (data.status === 'playing' && data.guest) {
        alert('Phòng này đã đủ 2 người chơi!');
        return false;
      }

      this.currentRoomId = formattedRoomId;
      this.playerRole = 'O'; // Khách tham gia là O

      // Cập nhật trạng thái phòng
      await this.db.ref('rooms/' + formattedRoomId).update({
        guest: 'Player O (Khách)',
        status: 'playing'
      });

      return true;
    } catch (e) {
      console.error('[Firebase]: Lỗi tham gia phòng:', e);
      return false;
    }
  }

  /**
   * Lắng nghe thay đổi của phòng chơi theo thời gian thực
   * @param {Function} callback
   */
  listenToRoom(callback) {
    if (!this.db || !this.currentRoomId) return;

    if (this.roomListener) {
      this.db.ref('rooms/' + this.currentRoomId).off('value', this.roomListener);
    }

    this.roomListener = this.db.ref('rooms/' + this.currentRoomId).on('value', (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.val(), this.playerRole);
      }
    });
  }

  /**
   * Gửi nước cờ lên Firebase
   */
  async sendMove(row, col, player, nextTurn, winner = null, winningLine = []) {
    if (!this.db || !this.currentRoomId) return false;

    try {
      const updates = {
        lastMove: { row, col, player, time: new Date().toLocaleTimeString() },
        turn: nextTurn
      };

      if (winner) {
        updates.winner = winner;
        updates.winningLine = winningLine;
        updates.status = 'ended';
      }

      await this.db.ref('rooms/' + this.currentRoomId).update(updates);
      // Cập nhật ô cờ
      await this.db.ref(`rooms/${this.currentRoomId}/board/${row}/${col}`).set(player);
      return true;
    } catch (e) {
      console.error('[Firebase]: Lỗi gửi nước cờ:', e);
      return false;
    }
  }

  /**
   * Yêu cầu ván mới trong phòng
   */
  async restartRoom() {
    if (!this.db || !this.currentRoomId) return false;

    try {
      await this.db.ref('rooms/' + this.currentRoomId).update({
        turn: 'X',
        board: Array(12).fill(null).map(() => Array(12).fill(null)),
        lastMove: null,
        winner: null,
        winningLine: [],
        status: 'playing'
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Kiểm tra kết nối
   */
  ensureConnected() {
    if (!this.isOnline) {
      showFirebaseConfigModal();
      return false;
    }
    return true;
  }
}

window.firebaseService = new FirebaseRealtimeService();
