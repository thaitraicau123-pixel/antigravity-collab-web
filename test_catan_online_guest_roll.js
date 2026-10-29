/**
 * test_catan_online_guest_roll.js
 * Test Suite: Đảo Catan 3D Online - Quyền & Tương Tác Của Người Chơi Khách (Guest Slot 1, 2, 3)
 * Kiểm chứng dứt điểm lỗi "catan đang lỗi ng chơi online k đổ xúc xắc được"
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('========================================================================');
console.log('  TEST SUITE: CATAN 3D ONLINE GUEST DICE ROLL & INTERACTIONS VERIFICATION');
console.log('========================================================================\n');

const htmlPath = path.join(__dirname, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

// Tách Script 5 (Catan & Dice3D) và Script 8 (Online P2P)
const scripts = [];
const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
while ((match = scriptRegex.exec(html)) !== null) {
  scripts.push(match[1]);
}

// Mock DOM Environment
class MockElement {
  constructor(id, tagName = 'div') {
    this.id = id;
    this.tagName = tagName.toUpperCase();
    this.textContent = '';
    this.innerHTML = '';
    this.className = '';
    this.classList = {
      _classes: new Set(),
      add: function(...cls) { cls.forEach(c => this._classes.add(c)); },
      remove: function(...cls) { cls.forEach(c => this._classes.delete(c)); },
      contains: function(c) { return this._classes.has(c); },
      toggle: function(c, force) {
        if (force === undefined) {
          if (this._classes.has(c)) this._classes.delete(c);
          else this._classes.add(c);
        } else if (force) this._classes.add(c);
        else this._classes.delete(c);
      }
    };
    this.style = {};
    this.disabled = false;
    this.children = [];
  }
  querySelector(sel) { return new MockElement('sub_' + sel); }
  querySelectorAll(sel) { return []; }
}

const domElements = new Map();
function getOrCreateEl(id) {
  if (!domElements.has(id)) {
    domElements.set(id, new MockElement(id));
  }
  return domElements.get(id);
}

const mockDocument = {
  getElementById: (id) => getOrCreateEl(id),
  querySelector: (sel) => {
    if (sel.startsWith('#')) return getOrCreateEl(sel.slice(1));
    return new MockElement('query_' + sel);
  },
  querySelectorAll: () => [],
  addEventListener: () => {},
  removeEventListener: () => {}
};

const mockWindow = {
  document: mockDocument,
  isOnlineRoomMatch: false,
  myRoomPlayerIndex: -1,
  mpRoomState: {},
  showToast: (msg) => { mockWindow._lastToast = msg; },
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  setInterval: setInterval,
  clearInterval: clearInterval,
  addEventListener: () => {},
  removeEventListener: () => {}
};

// Chuẩn bị môi trường sandbox
const vm = require('vm');
const context = vm.createContext({
  window: mockWindow,
  document: mockDocument,
  console: console,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  setInterval: setInterval,
  clearInterval: clearInterval,
  Math: Math,
  Array: Array,
  Object: Object,
  Set: Set,
  Map: Map,
  String: String,
  Number: Number,
  Boolean: Boolean,
  Date: Date,
  Promise: Promise,
  localStorage: { getItem: () => null, setItem: () => {} },
  getHudRankBadgeSVG: () => '',
  getAvatarSvgByStyle: () => '',
  showToast: (m) => { mockWindow._lastToast = m; },
  closeModal: () => {},
  openModal: () => {},
  switchMainTab: () => {},
  switchGameView: () => {},
  updateOnlineRoomHUD: () => {},
  syncMpRoomToStorageAndCloud: () => Promise.resolve()
});

// Chạy Script 5 (Dice3D Obsidian Engine + Catan)
// Script 5 nằm ở vị trí index 4 hoặc 5
let catanScript = scripts.find(s => s.includes('Dice3DObsidianEngine') && s.includes('window.catanState'));
assert(catanScript, 'Phải tìm thấy Script chứa Catan và Dice3D');

// Chạy Script 8 (P2P Multiplayer Engine)
let onlineScript = scripts.find(s => s.includes('window.setupOnlineCatan') && s.includes('applyOnlineGameState'));
assert(onlineScript, 'Phải tìm thấy Script chứa setupOnlineCatan');

vm.runInContext(catanScript, context);
vm.runInContext(onlineScript, context);

// Tạo các phần tử DOM cần thiết cho Catan HUD
getOrCreateEl('catanRollDiceBtn');
getOrCreateEl('catanBtnEndTurn');
getOrCreateEl('catanTurnText');
getOrCreateEl('catanTurnIndicator');
getOrCreateEl('catanBoardPromptText');
getOrCreateEl('dice-container');
getOrCreateEl('catanDiceContainer');
getOrCreateEl('catanHexLayer');
getOrCreateEl('catanTokenLayer');
getOrCreateEl('catanEdgeLayer');
getOrCreateEl('catanVertexLayer');
getOrCreateEl('catanScoreboardList');

console.log('--- TEST 1: Khởi tạo phòng Catan Online từ phía Khách (Guest Slot 1) ---');
const testRoom = {
  code: 'CATAN99',
  game: 'catan',
  hostId: 'host_uid_0',
  players: [
    { id: 'host_uid_0', name: 'Host Tuấn' },
    { id: 'guest_uid_1', name: 'Khách Minh' },
    { id: 'guest_uid_2', name: 'Khách Lan' },
    { id: 'guest_uid_3', name: 'Khách Hùng' }
  ],
  matchState: null
};

// 1. Host khởi tạo ván
context.window.isOnlineRoomMatch = true;
context.window.myRoomPlayerIndex = 0;
context.window.setupOnlineCatan(testRoom);

assert.strictEqual(context.window.catanState.initialized, true, 'Host phải init thành công Catan');
assert.strictEqual(context.window.catanState.players.length, 4, 'Bàn cờ phải đủ 4 người chơi');
assert.strictEqual(context.window.catanState.currentTurnPlayer, 0, 'Lượt đầu tiên là của Host (Player 0)');
assert.strictEqual(context.window.catanState.turnPhase, 'need_roll', 'Phase đầu tiên phải là need_roll');
console.log('  ✓ Host (Slot 0) khởi tạo trận đấu Catan thành công, lượt 0 ở trạng thái need_roll.');

console.log('\n--- TEST 2: Kiểm tra trạng thái HUD trên máy Host (Slot 0) khi tới lượt mình ---');
const rollBtn = getOrCreateEl('catanRollDiceBtn');
const endTurnBtn = getOrCreateEl('catanBtnEndTurn');
const turnText = getOrCreateEl('catanTurnText');
const promptText = getOrCreateEl('catanBoardPromptText');

assert.strictEqual(rollBtn.disabled, false, 'Host tới lượt: nút Đổ Xúc Xắc KHÔNG bị disabled');
assert.strictEqual(rollBtn.style.pointerEvents, 'auto', 'Host tới lượt: pointerEvents phải là auto');
assert.strictEqual(rollBtn.style.opacity, '1', 'Host tới lượt: opacity phải là 1');
assert.strictEqual(rollBtn.classList.contains('animate-pulse'), true, 'Nút Đổ Xúc Xắc phải animate-pulse khi đến lượt');
console.log('  ✓ Host: Nút [ĐỔ XÚC XẮC] sáng rực, pointer-events: auto, sẵn sàng click.');

console.log('\n--- TEST 3: Chuyển sang góc nhìn Khách (Guest Slot 1) khi ĐẾN LƯỢT KHÁCH ---');
// Giả lập Host kết thúc lượt, lượt chuyển sang Slot 1 (Khách Minh)
context.window.myRoomPlayerIndex = 1; // Máy này là Khách Slot 1
context.window.catanState.currentTurnPlayer = 1;
context.window.catanState.turnPhase = 'need_roll';
context.window.catanState.isRolling = false;

// Render lại HUD cho Khách
context.window.renderCatanHUD();

assert.strictEqual(rollBtn.disabled, false, 'Khách Slot 1 tới lượt: Nút Đổ Xúc Xắc KHÔNG ĐƯỢC BỊ DISABLED!');
assert.strictEqual(rollBtn.style.pointerEvents, 'auto', 'Khách Slot 1 tới lượt: pointerEvents PHẢI LÀ AUTO (không được none)!');
assert.strictEqual(rollBtn.style.opacity, '1', 'Khách Slot 1 tới lượt: opacity PHẢI LÀ 1!');
assert.strictEqual(rollBtn.classList.contains('animate-pulse'), true, 'Khách Slot 1 tới lượt: nút phải có hiệu ứng animate-pulse!');

assert(turnText.textContent.includes('LƯỢT CỦA BẠN'), 'Dòng chữ lượt phải hiển thị LƯỢT CỦA BẠN cho Khách Slot 1! Hiện tại: ' + turnText.textContent);
assert(turnText.textContent.includes('KHÁCH MINH'), 'Dòng chữ lượt phải hiển thị đúng tên Khách Minh! Hiện tại: ' + turnText.textContent);
assert(promptText.textContent.includes('Hãy bấm nút [ĐỔ XÚC XẮC]'), 'Prompt text phải nhắc Khách bấm Đổ Xúc Xắc!');
console.log('  ✓ Khách Slot 1 (Minh): Nút [ĐỔ XÚC XẮC] đã được MỞ KHÓA hoàn toàn (disabled=false, pointerEvents=auto, opacity=1)');
console.log('  ✓ Khách Slot 1 (Minh): Dòng chữ hiển thị chuẩn: "' + turnText.textContent + '"');
console.log('  ✓ Khách Slot 1 (Minh): Prompt text hiển thị chuẩn: "' + promptText.textContent + '"');

console.log('\n--- TEST 4: Khách Slot 1 click nút [ĐỔ XÚC XẮC] thành công ---');
// Mock dice tray roll
let syncedAction = null;
let syncedPayload = null;
context.window.syncOnlineCatanState = function(action, toast, extra) {
  syncedAction = action;
  syncedPayload = extra;
};

// Gọi hành động đổ xúc xắc của Khách
(async () => {
  await context.window.onCatanRollDiceClick();

  assert.strictEqual(syncedAction, 'ROLL_DICE', 'Khách đổ xúc xắc phải phát sóng action ROLL_DICE qua P2P');
  assert(syncedPayload && syncedPayload.rollRes, 'Payload phải chứa rollRes với values và sum');
  assert.strictEqual(context.window.catanState.isRolling, false, 'isRolling phải trở về false sau khi đổ');
  console.log('  ✓ Khách Slot 1 đổ xúc xắc thành công: Ra [' + syncedPayload.rollRes.values.join('+') + ' = ' + syncedPayload.rollRes.sum + ']');
  console.log('  ✓ P2P Broadcast: Action ROLL_DICE đã được phát sóng tới tất cả thành viên trong phòng.');

  console.log('\n--- TEST 5: Giai đoạn hành động của Khách & Nút [HẾT LƯỢT] ---');
  context.window.catanState.turnPhase = 'action';
  context.window.renderCatanHUD();

  assert.strictEqual(endTurnBtn.disabled, false, 'Khách ở action phase: Nút Hết Lượt KHÔNG bị disabled');
  assert.strictEqual(endTurnBtn.style.pointerEvents, 'auto', 'Khách ở action phase: pointerEvents nút Hết Lượt phải là auto');
  assert.strictEqual(endTurnBtn.style.opacity, '1', 'Khách ở action phase: opacity nút Hết Lượt phải là 1');
  console.log('  ✓ Khách: Nút [HẾT LƯỢT] đã mở khóa (disabled=false, pointerEvents=auto)');

  console.log('\n--- TEST 6: Khách Slot 1 kết thúc lượt -> Chuyển sang Slot 2 an toàn ---');
  context.window.endCatanTurn();
  assert.strictEqual(context.window.catanState.currentTurnPlayer, 2, 'Lượt phải chuyển sang Slot 2 (Khách Lan)');
  assert.strictEqual(context.window.catanState.turnPhase, 'need_roll', 'Lượt mới phải bắt đầu bằng need_roll');

  // Khách Slot 1 lúc này đã hết lượt, nút rollBtn phải bị khóa lại đối với Slot 1
  context.window.renderCatanHUD();
  assert.strictEqual(rollBtn.disabled, true, 'Khách Slot 1 khi không phải lượt của mình: Nút Đổ Xúc Xắc phải bị khóa');
  assert.strictEqual(rollBtn.style.pointerEvents, 'none', 'Khách Slot 1 khi không phải lượt: pointerEvents là none');
  assert(turnText.textContent.includes('ĐANG ĐÁNH'), 'HUD phải báo Slot 2 đang đánh: ' + turnText.textContent);
  console.log('  ✓ Khách Slot 1: Nút tự động khóa an toàn khi hết lượt, hiển thị đúng kỳ thủ tiếp theo đang đánh.');

  console.log('\n--- TEST 7: Kiểm tra cơ chế dựng Làng, Thành Phố và Đường từ góc nhìn Khách ---');
  context.window.myRoomPlayerIndex = 2; // Giả lập máy Khách Lan (Slot 2)
  const p2 = context.window.catanState.players[2];
  p2.resources = { wood: 2, brick: 2, sheep: 2, wheat: 2, ore: 3 };

  // Khách Lan bật chế độ xây đường
  context.window.catanState.turnPhase = 'action';
  context.window.toggleCatanBuildMode('road');
  assert.strictEqual(context.window.catanState.selectedBuildMode, 'road', 'Khách Lan phải bật được chế độ xây đường');
  console.log('  ✓ Khách Lan (Slot 2): Đủ tài nguyên và bật chế độ Xây Đường thành công.');

  console.log('\n========================================================================');
  console.log('🎉 TẤT CẢ 7/7 TESTS VỀ CATAN ONLINE GUEST DICE ROLL ĐỀU PASSED 100%!');
  console.log('========================================================================');
  process.exit(0);
})();
