const fs = require('fs');

console.log('================================================================');
console.log('  TEST SUITE: UNO COUNTDOWN 5S & BẮT UNO LÁO PHẠT 2 LÁ (v4.4.2) ');
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
    innerText: '',
    textContent: '',
    value: '',
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
    setAttribute: () => {},
    removeAttribute: () => {},
    getAttribute: () => null
  };
}

global.window = {
  activeGameView: 'uno',
  soundVolume: 1,
  isArenaAudioMuted: false,
  renderPlayerAvatarSafe: (av, cls) => `<div class="${cls}">${av}</div>`,
  addEventListener: () => {},
  removeEventListener: () => {}
};

global.document = {
  getElementById: (id) => {
    if (!mockElements[id]) mockElements[id] = createMockEl(id);
    return mockElements[id];
  },
  createElement: (tag) => createMockEl('dynamic_' + tag),
  body: createMockEl('body'),
  addEventListener: () => {},
  removeEventListener: () => {}
};

global.setTimeout = (fn, ms) => { if (typeof fn === 'function' && (!ms || ms <= 50)) fn(); return 1; };
global.clearTimeout = () => {};
global.setInterval = () => 1;
global.clearInterval = () => {};
global.showToast = (msg) => console.log('   [Toast]:', msg);

// Read UNO Engine from index.html
const html = fs.readFileSync('index.html', 'utf8');
const startMarker = 'UNO BATTLE ROYALE GAME ENGINE (108 CARDS)';
const markerPos = html.indexOf(startMarker);
if (markerPos === -1) {
  throw new Error('Không tìm thấy startMarker của UNO trong index.html');
}
const nextMarker = 'CYBER WEREWOLF ENGINE';
const nextMarkerPos = html.indexOf(nextMarker, markerPos);

let unoCode = html.substring(markerPos, nextMarkerPos);
unoCode = unoCode.substring(unoCode.indexOf('var unoState'));
if (unoCode.lastIndexOf('/*') !== -1) {
  unoCode = unoCode.substring(0, unoCode.lastIndexOf('/*'));
}

new Function(unoCode)();

const {
  unoState,
  initUnoGame,
  startUnoCountdown,
  stopUnoCountdown,
  handleUnoCountdownExpired,
  handleSayUnoClick,
  handleCatchUnoClick,
  renderUnoArena
} = window;

console.log('>>> UNO Game Engine evaluated into test runtime successfully!\n');

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
  // TEST NHÓM 1: Khởi tạo UNO và các thuộc tính Countdown
  console.log('--- NHÓM 1: KHỞI TẠO VÀ CẤU TRÚC ĐẾM NGƯỢC 5 GIÂY ---');
  initUnoGame();
  assert('unoState được khởi tạo thành công', unoState.initialized === true);
  assert('Có đủ 4 người chơi trong bàn UNO', unoState.players.length === 4);
  assert('Có sẵn chồng bài rút và chồng bài bỏ', unoState.drawPile.length > 0 && unoState.discardPile.length > 0);
  assert('Thuộc tính unoCountdownActive ban đầu là false', unoState.unoCountdownActive === false);

  // TEST NHÓM 2: Kích hoạt đếm ngược 5 giây khi còn 1 lá
  console.log('\n--- NHÓM 2: KÍCH HOẠT COUNTDOWN 5S KHI CÒN 1 LÁ ---');
  // Giả lập người chơi 0 (Human) chỉ còn 1 lá bài
  unoState.players[0].hand = [{ color: 'red', value: '7' }];
  unoState.players[0].hasSaidUno = false;
  startUnoCountdown(0);

  assert('Countdown được kích hoạt (unoCountdownActive = true)', unoState.unoCountdownActive === true);
  assert('Mục tiêu countdown là người chơi 0', unoState.unoCountdownTarget === 0);
  assert('Thời gian kết thúc cách hiện tại 5000ms (+-100ms)', Math.abs(unoState.unoCountdownEndTime - Date.now() - 5000) < 150);
  assert('Banner cảnh báo #unoCountdownBanner được hiển thị', !document.getElementById('unoCountdownBanner').classList.contains('hidden'));

  // TEST NHÓM 3: Hô UNO hợp lệ trong thời gian 5s
  console.log('\n--- NHÓM 3: HÔ UNO HỢP LỆ VÀ AN TOÀN ---');
  handleSayUnoClick();
  assert('Người chơi đã hô UNO an toàn (hasSaidUno = true)', unoState.players[0].hasSaidUno === true);
  assert('Countdown 5s lập tức dừng lại (unoCountdownActive = false)', unoState.unoCountdownActive === false);
  assert('Banner cảnh báo ẩn đi', document.getElementById('unoCountdownBanner').classList.contains('hidden'));

  // TEST NHÓM 4: Bắt phạt HÔ UNO LÁO (Khi có >= 3 lá trên tay)
  console.log('\n--- NHÓM 4: BẮT PHẠT HÔ UNO LÁO (CÒN >= 3 LÁ MÀ DÁM HÔ) ---');
  // Giả lập người chơi 0 có 4 lá bài
  unoState.players[0].hand = [
    { color: 'red', value: '1' },
    { color: 'blue', value: '2' },
    { color: 'green', value: '3' },
    { color: 'yellow', value: '4' }
  ];
  const handBeforeFalseSay = unoState.players[0].hand.length;
  handleSayUnoClick(); // HÔ LÁO!
  assert('Hô UNO láo bị phạt bốc thêm 2 lá bài', unoState.players[0].hand.length === handBeforeFalseSay + 2);

  // TEST NHÓM 5: Bắt phạt BẮT UNO LÁO (Bắt bừa khi không ai phạm quy)
  console.log('\n--- NHÓM 5: BẮT PHẠT BẮT UNO LÁO (BẮT BỪA KHI KHÔNG AI PHẠM QUY) ---');
  // Đảm bảo tất cả Bot đều có >= 2 lá hoặc đã hô UNO
  unoState.players[1].hand = [{ color: 'red', value: '1' }, { color: 'blue', value: '2' }];
  unoState.players[2].hand = [{ color: 'green', value: '3' }, { color: 'yellow', value: '4' }];
  unoState.players[3].hand = [{ color: 'red', value: '5' }, { color: 'blue', value: '6' }];

  const handBeforeFalseCatch = unoState.players[0].hand.length;
  handleCatchUnoClick(); // BẮT LÁO!
  assert('Bắt UNO láo bị phạt bốc thêm 2 lá bài cho chính mình', unoState.players[0].hand.length === handBeforeFalseCatch + 2);

  // TEST NHÓM 6: Bắt quả tang đối thủ quên hô UNO thành công
  console.log('\n--- NHÓM 6: BẮT QUẢ TANG ĐỐI THỦ QUÊN HÔ UNO ---');
  // Bot 1 chỉ còn 1 lá và chưa hô UNO
  unoState.players[1].hand = [{ color: 'red', value: '9' }];
  unoState.players[1].hasSaidUno = false;
  startUnoCountdown(1);

  // Nút Bắt UNO được kích hoạt viền cảnh báo đỏ
  renderUnoArena();
  assert('Nút BẮT UNO có hiệu ứng cảnh báo .uno-catch-ring', document.getElementById('btnCatchUno').classList.contains('uno-catch-ring'));

  const bot1HandBefore = unoState.players[1].hand.length;
  handleCatchUnoClick(); // Bắt đúng Bot 1!
  assert('Bắt quả tang Bot 1 thành công: Bot 1 bị bốc thêm 2 lá bài', unoState.players[1].hand.length === bot1HandBefore + 2);
  assert('Countdown 5s dừng lại', unoState.unoCountdownActive === false);

  // TEST NHÓM 7: Hết 5 giây mà người chơi quên hô UNO
  console.log('\n--- NHÓM 7: HẾT 5S ĐẾM NGƯỢC QUÊN HÔ UNO BỊ PHẠT ---');
  unoState.players[0].hand = [{ color: 'blue', value: '5' }];
  unoState.players[0].hasSaidUno = false;
  const humanHandBeforeTimeout = unoState.players[0].hand.length;

  handleUnoCountdownExpired(0); // Countdown hết giờ!
  assert('Người chơi quên hô UNO sau 5s bị bốc thêm 2 lá bài', unoState.players[0].hand.length === humanHandBeforeTimeout + 2);

  console.log('\n================================================================');
  console.log(`  🎉 HOÀN TẤT: TẤT CẢ ${passed}/${total} TEST CASES ĐỀU PASSED 100%!`);
  console.log('================================================================');
} catch (e) {
  console.error('\n❌ TEST RUNNER GẶP LỖI:', e);
  process.exit(1);
}
