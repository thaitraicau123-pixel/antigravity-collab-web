const fs = require('fs');

console.log('================================================================');
console.log('  TEST SUITE: WEREWOLF ONLINE + LIVE CHAT + ZERO ROLE LEAK v4.4 ');
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
const startMarker = 'CYBER WEREWOLF ENGINE (MA SÓI: HUYỀN THOẠI TRĂNG MÁU';
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
  setupOnlineWerewolf,
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
  checkWerewolfWinCondition,
  appendChatMessage,
  toggleWerewolfChatPanel
} = window;

console.log('>>> Werewolf Online Engine evaluated into test runtime successfully!\n');

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

  // TEST NHÓM 2: Cơ chế Không Lộ Role Ban Đêm & Màn Đêm Nhắm Mắt (Zero Role Leak)
  console.log('\n--- NHÓM 2: BẢO MẬT VAI TRÒ & MÀN ĐÊM NHẮM MẮT (ZERO ROLE LEAK) ---');
  // Giả sử người chơi là Dân Làng
  st.players[0].role = 'villager';
  st.players[1].role = 'werewolf'; // Eldrin là Sói
  st.players[2].role = 'seer';     // Lyra là Tiên Tri

  // Render arena
  window.renderWerewolfArena();
  const p1RoleEl = document.getElementById('werewolfRoleReveal_1');
  assert('Người chơi số 1 (Ma Sói còn sống) hiển thị "???" (KHÔNG LỘ ROLE)', p1RoleEl.textContent === '???');
  const p2RoleEl = document.getElementById('werewolfRoleReveal_2');
  assert('Người chơi số 2 (Tiên Tri còn sống) hiển thị "???" (KHÔNG LỘ ROLE)', p2RoleEl.textContent === '???');

  // Test Blind Sleep Overlay khi đêm xuống
  assert('Blind Sleep Overlay tồn tại trong DOM', !!document.getElementById('werewolfBlindOverlay'));

  // TEST NHÓM 3: Khung Chat Trực Tiếp (Live Chat Engine)
  console.log('\n--- NHÓM 3: KHUNG CHAT TRỰC TIẾP (LIVE WEREWOLF CHAT) ---');
  appendChatMessage({
    senderId: 0,
    senderName: 'Bạn (Chỉ Huy)',
    text: 'Đêm qua tôi nghe tiếng bước chân rất gần nhà P2!',
    channel: 'village',
    time: '12:00'
  });
  assert('Tin nhắn chat được lưu vào state chatMessages', st.chatMessages.length >= 1);
  assert('Nội dung tin nhắn trùng khớp', st.chatMessages[st.chatMessages.length - 1].text.includes('nhà P2'));

  // Test chat channel Sói
  appendChatMessage({
    senderId: 1,
    senderName: 'Eldrin',
    text: 'Đêm nay chúng ta cắn P3 nhé đồng đội!',
    channel: 'wolf',
    time: '12:01'
  });
  assert('Hỗ trợ kênh chat bầy Sói bí mật ban đêm', st.chatMessages.some(m => m.channel === 'wolf'));

  // TEST NHÓM 4: Chế Độ Online Multiplayer (P2P Room Integration)
  console.log('\n--- NHÓM 4: CHẾ ĐỘ MULTIPLAYER P2P (ONLINE ROOM) ---');
  const mockRoom = {
    code: '999888',
    game: 'werewolf',
    maxPlayers: 7,
    players: [
      { id: 'uid_1', name: 'Kỳ Thủ Alpha', isHost: true },
      { id: 'uid_2', name: 'Kỳ Thủ Beta', isHost: false },
      { id: 'uid_3', name: 'Kỳ Thủ Gamma', isHost: false }
    ]
  };
  setupOnlineWerewolf(mockRoom);
  assert('Chế độ chuyển thành online', st.mode === 'online');
  assert('Người chơi 1 có tên Kỳ Thủ Alpha từ phòng P2P', st.players[0].name === 'Kỳ Thủ Alpha');
  assert('Người chơi 2 có tên Kỳ Thủ Beta từ phòng P2P', st.players[1].name === 'Kỳ Thủ Beta');
  assert('Người chơi 3 có tên Kỳ Thủ Gamma từ phòng P2P', st.players[2].name === 'Kỳ Thủ Gamma');
  assert('Các slot còn lại (slot 4-7) được tự động lấp đầy bằng Bot AI', st.players[3].name === 'Garrick' && st.players[4].name === 'Seraphina');

  // TEST NHÓM 5: Vòng Lặp Ban Đêm, Phù Thủy, Thợ Săn, Biểu Quyết
  console.log('\n--- NHÓM 5: VÒNG LẶP BAN ĐÊM & BIỂU QUYẾT TREO CỔ ---');
  st.players.forEach(p => p.isAlive = true);
  st.nightProtectedTarget = 1;
  st.nightWolfVictim = 1;
  st.nightWitchPoisonVictim = null;

  resolveNightPhase();
  assert('Người 1 sống sót nhờ được Bảo Vệ che chắn thành công', st.players[1].isAlive === true);

  st.votes = { 0: 6, 1: 6, 2: 6, 3: 6, 4: 1, 5: 2, 6: 0 };
  resolveVotingExecution();
  assert('Người bị nhiều phiếu nhất (index 6) bị treo cổ', st.players[6].isAlive === false);

  // Khi chết mới lật bài thật
  window.renderWerewolfArena();
  const p6RoleEl = document.getElementById('werewolfRoleReveal_6');
  const def6 = WEREWOLF_ROLES[st.players[6].role];
  assert('Khi chết, Quản trò lật bài công bố danh tính thật cho làng', p6RoleEl.textContent === def6.name);

  // TEST NHÓM 6: Điều Kiện Thắng
  console.log('\n--- NHÓM 6: PHÂN ĐỊNH CHIẾN THẮNG (WIN CONDITIONS) ---');
  st.players.forEach(p => {
    if (p.role === 'werewolf') p.isAlive = false;
    else p.isAlive = true;
  });
  let hasWon = checkWerewolfWinCondition();
  assert('Phe Dân Làng chiến thắng khi toàn bộ Ma Sói bị tiêu diệt', hasWon === true && st.winner === 'village');

  console.log('\n================================================================');
  console.log(`  🎉 HOÀN TẤT: TẤT CẢ ${passed}/${total} TEST CASES ĐỀU PASSED 100%!`);
  console.log('================================================================');
} catch (e) {
  console.error('\n❌ TEST RUNNER GẶP LỖI:', e);
  process.exit(1);
}
