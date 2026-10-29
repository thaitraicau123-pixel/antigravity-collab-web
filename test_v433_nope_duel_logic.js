const fs = require('fs');
const path = require('path');

console.log('=== TEST UNIT LOGIC NOPE SHOWCASE & COUNTER-NOPE v4.3.3 ===\n');

const mockElements = {};
global.document = {
  getElementById: (id) => {
    if (!mockElements[id]) {
      mockElements[id] = {
        id,
        classList: {
          classes: new Set(),
          add(c) { this.classes.add(c); },
          remove(c) { this.classes.delete(c); },
          contains(c) { return this.classes.has(c); }
        },
        style: {},
        innerHTML: '',
        textContent: '',
        src: '',
        offsetWidth: 100,
        getBoundingClientRect: () => ({ left: 100, top: 100, right: 200, bottom: 250, width: 100, height: 150 }),
        querySelector: () => null,
        querySelectorAll: () => [],
        focus: () => {},
        blur: () => {}
      };
    }
    return mockElements[id];
  },
  createElement: (tag) => ({
    tagName: tag,
    style: {},
    classList: {
      classes: new Set(),
      add(c) { this.classes.add(c); },
      remove(c) { this.classes.delete(c); },
      contains(c) { return this.classes.has(c); }
    },
    appendChild: () => {},
    innerHTML: ''
  }),
  body: {
    appendChild: () => {},
    removeChild: () => {}
  },
  addEventListener: () => {},
  removeEventListener: () => {},
  querySelector: () => null,
  querySelectorAll: () => []
};

global.window = {
  document: global.document,
  addEventListener: () => {},
  removeEventListener: () => {},
  querySelector: () => null,
  querySelectorAll: () => [],
  localStorage: {
    data: {},
    getItem(k) { return this.data[k] || null; },
    setItem(k, v) { this.data[k] = String(v); }
  },
  soundTone: () => {},
  soundVictory: () => {},
  soundDefeat: () => {},
  showToast: () => {},
  renderPlayerAvatarSafe: () => '<svg></svg>',
  KITTEN_CARD_BACK_URI: 'data:image/svg+xml;base64,mock'
};

global.localStorage = window.localStorage;
global.soundTone = window.soundTone;
global.showToast = window.showToast;
global.requestAnimationFrame = (fn) => setTimeout(fn, 0);

// Load index.html game code
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let scriptIdx = 0;
let mainCode = '';

while ((match = scriptRegex.exec(html)) !== null) {
  scriptIdx++;
  if (scriptIdx === 5) {
    mainCode = match[1];
    break;
  }
}

const scriptFn = new Function('window', 'document', 'localStorage', 'soundTone', 'showToast', `
  with(window) {
    ${mainCode}
    return {
      kittensState,
      initKittensGame,
      triggerNopeIntervention,
      processNopeChainStep,
      openNopeModalForHuman,
      finalizeNopeChain,
      handleConfirmNope,
      handleIgnoreNope,
      executeCardPlay
    };
  }
`);

const env = scriptFn(global.window, global.document, global.localStorage, global.soundTone, global.showToast);
let passedTests = 0;
let totalTests = 0;

function assert(cond, name) {
  totalTests++;
  if (cond) {
    console.log(`✅ [PASS] Test ${totalTests}: ${name}`);
    passedTests++;
  } else {
    console.error(`❌ [FAIL] Test ${totalTests}: ${name}`);
  }
}

async function runTests() {
  // --------------------------------------------------------------------------
  // TEST SUITE 1: CARD SHOWCASE IN NOPE MODAL
  // --------------------------------------------------------------------------
  console.log('--- TEST SUITE 1: CARD SHOWCASE IN NOPE MODAL ---');
  env.initKittensGame();
  env.kittensState.players[0].hand = ['nope', 'defuse'];
  env.kittensState.players[1].hand = ['attack', 'defuse'];

  let res1 = null;
  env.triggerNopeIntervention(1, 'attack', 0, 0, (isNoped) => {
    res1 = isNoped;
  });

  const modal = document.getElementById('kittenModalNopeIntervention');
  assert(!modal.classList.contains('hidden'), 'Nope Intervention Modal opened for Bot Attack');

  const cardImg = document.getElementById('kittenNopeCardImg');
  assert(cardImg.src && cardImg.src.length > 50, 'Card image set correctly to actual card asset');

  const cardTitle = document.getElementById('kittenNopeCardTitle');
  assert(cardTitle.textContent === 'Tấn Công 2X', 'Card title in showcase set to Tấn Công 2X');

  const cardBadge = document.getElementById('kittenNopeCardBadge');
  assert(cardBadge.textContent === '⚔️ TẤN CÔNG', 'Card badge set to ⚔️ TẤN CÔNG');

  const cardDesc = document.getElementById('kittenNopeCardDesc');
  assert(cardDesc.textContent.includes('Dồn 2 lượt rút liên tiếp'), 'Card description displays actual functional effect');

  const dangerText = document.getElementById('kittenNopeDangerText');
  assert(dangerText.textContent.includes('dồn 2 lượt rút liên tiếp'), 'Danger alert warns human of specific Attack threat');

  const btnConfirmText = document.getElementById('kittenNopeBtnText');
  assert(btnConfirmText.textContent === 'NOPE NGAY! 🛑', 'Confirm button text is "NOPE NGAY! 🛑" for action card');

  const myCount = document.getElementById('kittenNopeMyCount');
  assert(myCount.innerHTML.includes('1'), 'Nope inventory count indicates 1 Nope card available');

  // --------------------------------------------------------------------------
  // TEST SUITE 2: HUMAN NOPES BOT ACTION
  // --------------------------------------------------------------------------
  console.log('\n--- TEST SUITE 2: HUMAN NOPES BOT ACTION ---');
  // Clear any nopes in other bots to ensure no counter-nope in this test case
  env.kittensState.players[1].hand = ['defuse'];
  env.kittensState.players[2].hand = ['defuse'];
  env.kittensState.players[3].hand = ['defuse'];

  env.handleConfirmNope();
  assert(modal.classList.contains('hidden'), 'Modal closed after confirming Nope');
  assert(!env.kittensState.players[0].hand.includes('nope'), 'Human consumed 1 Nope card from hand');
  assert(env.kittensState.discardPile[env.kittensState.discardPile.length - 1].cardId === 'nope', 'Nope card placed in discard pile');

  // Await 700ms for chain step
  await new Promise(r => setTimeout(r, 700));
  assert(res1 === true, 'Bot action was successfully CANCELLED (isNoped = true)');

  // --------------------------------------------------------------------------
  // TEST SUITE 3: COUNTER-NOPE ("NOPE PHẢI NOPE ĐƯỢC LÁ NOPE")
  // Bot Nopes Human, Human Counter-Nopes Bot to save original card!
  // --------------------------------------------------------------------------
  console.log('\n--- TEST SUITE 3: BOT NOPES HUMAN, HUMAN COUNTER-NOPES BOT ---');
  env.kittensState.players[0].hand = ['nope', 'defuse'];
  // Bots have no more nopes so human counter-nope succeeds definitively
  env.kittensState.players[1].hand = ['defuse'];
  env.kittensState.players[2].hand = ['defuse'];
  env.kittensState.players[3].hand = ['defuse'];

  let res2 = null;
  env.kittensState.nopeChain = {
    initialPlayerIdx: 0,
    initialCardId: 'attack',
    currentCardId: 'nope', // Bot just played Nope!
    currentAttackerIdx: 1,  // Bot 1 is attacker of the Nope
    isActionCancelled: true, // Action is currently cancelled by Bot
    onResolve: (isNoped) => { res2 = isNoped; }
  };

  env.openNopeModalForHuman(1, 'nope');

  assert(!modal.classList.contains('hidden'), 'Modal re-opened for Human to Counter-Nope Bot!');
  assert(cardTitle.textContent === 'Chặn Đứng', 'Card showcase displays NOPE card of the bot');
  assert(cardBadge.textContent === '⛔ CHẶN ĐỨNG', 'Card badge displays ⛔ CHẶN ĐỨNG');
  assert(btnConfirmText.textContent === 'NOPE PHẢN ĐÒN! 🛑', 'Button text switched to "NOPE PHẢN ĐÒN! 🛑"');
  assert(dangerText.textContent.includes('NOPE PHẢN ĐÒN'), 'Danger text instructs player to Counter-Nope');

  // Human confirms Counter-Nope!
  env.handleConfirmNope();
  assert(!env.kittensState.players[0].hand.includes('nope'), 'Human consumed second Nope for Counter-Nope');

  await new Promise(r => setTimeout(r, 700));
  assert(res2 === false, 'Action is RESTORED! isNoped = false, Human attack goes through!');

  // --------------------------------------------------------------------------
  // TEST SUITE 4: HUMAN IGNORES NOPE
  // --------------------------------------------------------------------------
  console.log('\n--- TEST SUITE 4: HUMAN IGNORES NOPE ---');
  env.kittensState.players[0].hand = ['nope', 'defuse'];
  let res3 = null;
  env.kittensState.nopeChain = {
    initialPlayerIdx: 0,
    initialCardId: 'skip',
    currentCardId: 'nope',
    currentAttackerIdx: 2,
    isActionCancelled: true,
    onResolve: (isNoped) => { res3 = isNoped; }
  };
  env.openNopeModalForHuman(2, 'nope');
  env.handleIgnoreNope();
  assert(res3 === true, 'Human ignored Nope, Bot successfully cancelled action (isNoped = true)');

  console.log(`\n========================================`);
  console.log(`KẾT QUẢ: ${passedTests}/${totalTests} TESTS PASSED (${Math.round(passedTests/totalTests*100)}%)`);
  console.log(`========================================`);

  if (passedTests === totalTests) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runTests();
