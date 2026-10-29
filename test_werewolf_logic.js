const fs = require('fs');

console.log('================================================================');
console.log('  TEST SUITE: ZERO-FREEZE WEREWOLF ENGINE (v4.3.6)               ');
console.log('================================================================');

// Mock browser environment
const mockElements = {};
function createMockEl(id) {
  return {
    id,
    style: {},
    classList: {
      _classes: new Set(),
      add: function(...cls) { cls.forEach(c => this._classes.add(c)); },
      remove: function(...cls) { cls.forEach(c => this._classes.delete(c)); },
      contains: function(c) { return this._classes.has(c); },
      toggle: function(c) { if (this.contains(c)) this.remove(c); else this.add(c); }
    },
    innerHTML: '',
    textContent: '',
    value: '',
    dataset: {},
    disabled: false,
    querySelector: () => null,
    querySelectorAll: () => [],
    focus: () => {},
    blur: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    click: () => {},
    appendChild: () => {},
    removeChild: () => {},
    insertBefore: () => {},
    prepend: () => {},
    hasChildNodes: () => false,
    setAttribute: () => {},
    removeAttribute: () => {},
    getAttribute: () => null
  };
}

global.window = {
  activeGameView: 'werewolf',
  soundVolume: 1,
  isArenaAudioMuted: false,
  addEventListener: () => {},
  removeEventListener: () => {}
};
global.document = {
  getElementById: (id) => {
    if (!mockElements[id]) {
      mockElements[id] = createMockEl(id);
    }
    return mockElements[id];
  },
  createElement: (tag) => createMockEl('dynamic_' + tag),
  body: createMockEl('body'),
  addEventListener: () => {},
  removeEventListener: () => {}
};
global.setTimeout = (fn) => { if (typeof fn === 'function') fn(); return 1; };
global.clearTimeout = () => {};
global.setInterval = () => 1;
global.clearInterval = () => {};
global.soundTone = () => {};
global.showToast = (msg) => console.log('   [Toast]:', msg);

// Read from index.html directly
const html = fs.readFileSync('index.html', 'utf8');
const startMarker = 'CYBER WEREWOLF ENGINE (MA SÓI: HUYỀN THOẠI TRĂNG MÁU v2.0';
const markerPos = html.indexOf(startMarker);
if (markerPos === -1) {
  throw new Error('Không tìm thấy startMarker trong index.html');
}
const startIdx = html.indexOf('(function() {', markerPos);
const endIdx = html.indexOf('})();', startIdx) + 5;
const engineCode = html.substring(startIdx, endIdx);

eval(engineCode);

const {
  WEREWOLF_ROLES,
  initWerewolfGame,
  confirmWerewolfRoleAndStart,
  confirmSeerScryAndContinue,
  skipWerewolfWaitOrAct,
  setWerewolfPhase,
  resolveNightPhase,
  startDayVoting,
  resolveVotingExecution,
  handleWitchUseHeal,
  triggerHunterRevengeShot,
  executeHunterShot,
  checkWerewolfWinCondition
} = window;

console.log('>>> Zero-Freeze Werewolf Engine evaluated into test runtime successfully!\n');

let passed = 0;
let total = 0;

function assert(desc, condition) {
  total++;
  if (condition) {
    passed++;
    console.log(`  ✓ Test ${total}: ${desc}`);
  } else {
    console.error(`  ✗ Test ${total} FAILED: ${desc}`);
    throw new Error(`Assertion failed: ${desc}`);
  }
}

try {
  // TEST NHÓM 1: Roles
  console.log('--- NHÓM 1: KHỞI TẠO & PHÂN BỔ VAI TRÒ (ROLE DISTRIBUTION) ---');
  const roles = window.WEREWOLF_ROLES || WEREWOLF_ROLES;
  assert('Có đủ 6 vai trò chuẩn: werewolf, seer, bodyguard, witch, hunter, villager',
    roles && roles.werewolf && roles.seer && roles.bodyguard && roles.witch && roles.hunter && roles.villager);
  assert('Sói thuộc Phe Sói (wolf)', roles.werewolf.team === 'wolf');
  assert('Tiên tri thuộc Phe Dân Làng (village)', roles.seer.team === 'village');
  assert('Bảo Vệ thuộc Phe Dân Làng (village)', roles.bodyguard.team === 'village');
  assert('Phù Thủy thuộc Phe Dân Làng (village)', roles.witch.team === 'village');
  assert('Thợ Săn thuộc Phe Dân Làng (village)', roles.hunter.team === 'village');
  assert('Dân Làng thuộc Phe Dân Làng (village)', roles.villager.team === 'village');

  // Khởi tạo ván game
  initWerewolfGame();
  const st = window.werewolfState;
  assert('werewolfState được khởi tạo thành công', !!st);
  assert('Bàn chơi chuẩn xác gồm 7 người chơi', st.players && st.players.length === 7);
  assert('Người chơi chính tại index 0 là isHuman = true', st.players[0].isHuman === true);
  assert('6 người chơi còn lại là AI Bot (isHuman = false)', st.players.slice(1).every(p => p.isHuman === false));

  // Kiểm tra vai trò 7 người
  const roleFreq = {};
  st.players.forEach(p => { roleFreq[p.role] = (roleFreq[p.role] || 0) + 1; });
  assert('Đúng 2 Ma Sói trong bàn 7 người', roleFreq.werewolf === 2);
  assert('Đúng 1 Tiên Tri', roleFreq.seer === 1);
  assert('Đúng 1 Bảo Vệ', roleFreq.bodyguard === 1);
  assert('Đúng 1 Phù Thủy', roleFreq.witch === 1);
  assert('Đúng 1 Thợ Săn', roleFreq.hunter === 1);
  assert('Đúng 1 Dân Làng', roleFreq.villager === 1);
  assert('Tất cả 7 người chơi ban đầu đều còn sống (isAlive = true)', st.players.every(p => p.isAlive === true));

  // TEST NHÓM 2: Cơ chế chống đứng màn khi xác nhận vai trò
  console.log('\n--- NHÓM 2: CƠ CHẾ CHỐNG ĐỨNG MÀN & AUTO-START (ZERO-FREEZE) ---');
  confirmWerewolfRoleAndStart();
  assert('Bấm xác nhận vai trò đã kích hoạt chu trình FSM đêm & ngày mượt mà (phase !== LOBBY)', st.phase !== 'LOBBY');

  // Test skip/fast forward action
  skipWerewolfWaitOrAct();
  assert('Hàm tua nhanh skipWerewolfWaitOrAct hoạt động mượt mà', !!st.phase);

  // TEST NHÓM 3: Vòng Lặp Ban Đêm & Bảo Vệ
  console.log('\n--- NHÓM 3: VÒNG LẶP BAN ĐÊM (NIGHT PHASE FSM) ---');
  st.players.forEach(p => p.isAlive = true);
  st.nightProtectedTarget = 1;
  st.nightWolfVictim = 1; // Cắn người được bảo vệ
  st.nightWitchPoisonVictim = null;

  resolveNightPhase();
  assert('Người 1 sống sót nhờ được Bảo Vệ che chắn thành công', st.players[1].isAlive === true);
  assert('Toàn bộ 7 người vẫn sống sót sau đêm', st.players.every(p => p.isAlive === true));

  // TEST NHÓM 4: Bỏ Phiếu và Treo Cổ Ban Ngày
  console.log('\n--- NHÓM 4: BIỂU QUYẾT & TREO CỔ BAN NGÀY (DAY VOTING & LYNCH) ---');
  st.votes = { 0: 6, 1: 6, 2: 6, 3: 6, 4: 1, 5: 2, 6: 0 };
  resolveVotingExecution();
  assert('Người bị nhiều phiếu nhất (index 6) bị treo cổ (isAlive = false)', st.players[6].isAlive === false);
  assert('Số người còn sống trong làng còn 6', st.players.filter(p => p.isAlive).length === 6);

  // TEST NHÓM 5: Kỹ Năng Phù Thủy & Thợ Săn
  console.log('\n--- NHÓM 5: BÌNH PHÙ THỦY & PHÁT ĐẠN THỢ SĂN ---');
  st.nightWolfVictim = 3;
  st.nightProtectedTarget = 2;
  st.witchHealUsed = false;
  handleWitchUseHeal();
  assert('Phù thủy đã sử dụng bình cứu (witchHealUsed = true)', st.witchHealUsed === true);
  assert('Nạn nhân sói cắn được xóa về null nhờ được cứu', st.nightWolfVictim === null);

  const nonHunterIdx = st.players.findIndex((p, idx) => p.isAlive && p.role !== 'hunter' && idx !== 3);
  st.nightWitchPoisonVictim = nonHunterIdx;
  st.witchPoisonUsed = true;

  resolveNightPhase();
  assert('Người 3 sống sót nhờ phù thủy cứu khỏi nanh vuốt Sói', st.players[3].isAlive === true);
  assert(`Nạn nhân trúng bình độc (index ${nonHunterIdx}) đã tử trận`, st.players[nonHunterIdx].isAlive === false);

  const hunterIdx = st.players.findIndex(p => p.role === 'hunter');
  st.players[hunterIdx].isAlive = false;
  triggerHunterRevengeShot(hunterIdx);

  executeHunterShot(5);
  assert('Nạn nhân bị thợ săn bắn (index 5) đã tử trận', st.players[5].isAlive === false);

  // TEST NHÓM 6: Điều Kiện Thắng
  console.log('\n--- NHÓM 6: PHÂN ĐỊNH CHIẾN THẮNG (WIN CONDITIONS) ---');
  st.players.forEach(p => {
    if (p.role === 'werewolf') p.isAlive = false;
    else p.isAlive = true;
  });
  let hasWon = checkWerewolfWinCondition();
  assert('checkWerewolfWinCondition trả về true khi có bên thắng', hasWon === true);
  assert('Phe Dân Làng chiến thắng khi toàn bộ Ma Sói bị tiêu diệt', st.winner === 'village');

  st.players.forEach(p => p.isAlive = false);
  const wolfIndices = [];
  st.players.forEach((p, idx) => { if (p.role === 'werewolf') wolfIndices.push(idx); });
  st.players[wolfIndices[0]].isAlive = true;
  st.players[wolfIndices[1]].isAlive = true;
  const villagerIdx = st.players.findIndex(p => p.role === 'villager');
  st.players[villagerIdx].isAlive = true;
  hasWon = checkWerewolfWinCondition();
  assert('checkWerewolfWinCondition trả về true khi Sói chiếm ưu thế', hasWon === true);
  assert('Phe Ma Sói chiến thắng khi số sói >= số dân còn lại', st.winner === 'wolf');

  st.players[wolfIndices[1]].isAlive = false;
  const seerIdx = st.players.findIndex(p => p.role === 'seer');
  const bodyguardIdx = st.players.findIndex(p => p.role === 'bodyguard');
  st.players[seerIdx].isAlive = true;
  st.players[bodyguardIdx].isAlive = true;
  st.winner = null;
  hasWon = checkWerewolfWinCondition();
  assert('Trận đấu tiếp tục khi chưa bên nào đạt điều kiện thắng', hasWon === false);

  console.log('\n================================================================');
  console.log(`  🎉 HOÀN TẤT: TẤT CẢ ${passed}/${total} TEST CASES ĐỀU PASSED 100%!`);
  console.log('================================================================');
} catch (e) {
  console.error('\n❌ TEST RUNNER GẶP LỖI:', e);
  process.exit(1);
}
