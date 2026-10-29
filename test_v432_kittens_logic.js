const fs = require('fs');
const path = require('path');

console.log('=== BẮT ĐẦU TEST UNIT LOGIC MÈO NỔ v4.3.2 ===\n');

// 1. Mock DOM and Web Audio Environment
const mockElements = {};
global.document = {
  addEventListener: () => {},
  removeEventListener: () => {},
  querySelector: () => null,
  querySelectorAll: () => [],
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
        offsetWidth: 100,
        getBoundingClientRect: () => ({ left: 100, top: 100, right: 200, bottom: 250, width: 100, height: 150 })
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
  }
};

global.window = {
  addEventListener: () => {},
  removeEventListener: () => {},
  querySelector: () => null,
  querySelectorAll: () => [],
  document: global.document,
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
  KITTEN_CARD_BACK_URI: 'data:image/svg+xml;base64,mock',
  KITTEN_CARD_DEFS: {
    exploding_kitten: { name: 'Mèo Nổ', badge: 'TỬ VONG', type: 'bomb' },
    defuse: { name: 'Gỡ Bom', badge: 'CỨU MẠNG', type: 'defuse' },
    attack: { name: 'Tấn Công', badge: 'TẤN CÔNG', type: 'action' },
    skip: { name: 'Bỏ Lượt', badge: 'BỎ LƯỢT', type: 'action' },
    favor: { name: 'Xin Bài', badge: 'XIN BÀI', type: 'action' },
    shuffle: { name: 'Xáo Bài', badge: 'XÁO BÀI', type: 'action' },
    see_future: { name: 'Xem Tương Lai', badge: 'TIÊN TRI', type: 'action' },
    nope: { name: 'Nope', badge: 'CHẶN ĐỨNG', type: 'nope' },
    beard_cat: { name: 'Mèo Râu', badge: 'MÈO', type: 'cat' }
  }
};

global.localStorage = window.localStorage;
global.soundTone = window.soundTone;
global.showToast = window.showToast;
global.requestAnimationFrame = (fn) => setTimeout(fn, 0);

// Load index.html game code into evaluation context
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Extract Script #5
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

// Evaluate script in simulated environment
const scriptFn = new Function('window', 'document', 'localStorage', 'soundTone', 'showToast', `
  with(window) {
    ${mainCode}
    return {
      kittensState,
      setKittensBombCount,
      initKittensGame,
      startKittenTurnTimer,
      resetKittenTurnTimer,
      stopKittenTurnTimer,
      triggerNopeIntervention,
      handleConfirmNope,
      handleIgnoreNope,
      executeCardPlay,
      passTurnToNextPlayer,
      animateKittenCardDraw
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

// TEST SUITE 1: BOMB COUNT SELECTOR (1, 2, 3, 4 BOMBS)
console.log('--- TEST SUITE 1: BOMB COUNT SELECTOR ---');
[1, 2, 3, 4].forEach(count => {
  env.setKittensBombCount(count);
  assert(env.kittensState.bombCount === count, `setKittensBombCount(${count}) sets kittensState.bombCount`);
  assert(global.localStorage.getItem('tabletop_kittens_bomb_count') === String(count), `bombCount ${count} persisted to localStorage`);

  env.initKittensGame();
  const actualBombs = env.kittensState.drawPile.filter(c => c === 'exploding_kitten').length;
  assert(actualBombs === count, `initKittensGame() created exactly ${count} Exploding Kittens in draw pile (Found: ${actualBombs})`);
});

// TEST SUITE 2: SHUFFLED DECK PURITY & RANDOMNESS
console.log('\n--- TEST SUITE 2: DRAW PILE DECK RANDOMNESS ---');
env.setKittensBombCount(3);
env.initKittensGame();
assert(env.kittensState.drawPile.length > 20, `Draw pile contains full pool of cards (${env.kittensState.drawPile.length} cards)`);
const defusesInDeck = env.kittensState.drawPile.filter(c => c === 'defuse').length;
assert(defusesInDeck === 2, `Draw pile contains exactly 2 remaining Defuse cards`);

// Verify each player receives 1 Defuse and 4 safe cards
env.kittensState.players.forEach((p, idx) => {
  assert(p.hand.length === 5, `Player ${idx} has 5 cards initial hand`);
  assert(p.hand.includes('defuse'), `Player ${idx} has exactly 1 initial Defuse`);
  assert(!p.hand.includes('exploding_kitten'), `Player ${idx} hand contains ZERO Exploding Kittens`);
});

// TEST SUITE 3: 10-SECOND TURN TIMER ENGINE & RESET
console.log('\n--- TEST SUITE 3: 10-SECOND TURN TIMER ENGINE ---');
env.startKittenTurnTimer();
assert(env.kittensState.turnSecondsLeft === 10, 'startKittenTurnTimer initializes countdown at 10 seconds');
assert(env.kittensState.turnTimerInterval !== null, 'turnTimerInterval active');

env.kittensState.turnSecondsLeft = 4;
env.resetKittenTurnTimer();
assert(env.kittensState.turnSecondsLeft === 10, 'resetKittenTurnTimer resets countdown back to 10 seconds');

env.stopKittenTurnTimer();
assert(env.kittensState.turnTimerInterval === null, 'stopKittenTurnTimer clears interval completely');

// TEST SUITE 4: TURN HIGHLIGHT & NOTIFICATION
console.log('\n--- TEST SUITE 4: MY TURN HIGHLIGHT & NOTIFICATION ---');
env.kittensState.currentTurn = 3;
env.passTurnToNextPlayer(1);
assert(env.kittensState.currentTurn === 0, 'passTurnToNextPlayer cycled from Player 3 to Player 0 (Human)');
const handEl = document.getElementById('kittenHandCardsContainer');
assert(handEl.classList.contains('kitten-my-turn-glow'), 'Human hand container receives kitten-my-turn-glow on turn start');

// TEST SUITE 5: NOPE INTERVENTION ENGINE
console.log('\n--- TEST SUITE 5: NOPE INTERVENTION ENGINE ---');
// Sub-test 5A: Bot plays action card, Human HAS Nope -> Modal opens
env.kittensState.players[0].hand = ['nope', 'defuse', 'skip'];
env.kittensState.players[1].hand = ['attack', 'shuffle'];

let interventionFired = false;
let interventionResult = null;

env.triggerNopeIntervention(1, 'attack', 0, 0, (isNoped) => {
  interventionFired = true;
  interventionResult = isNoped;
});

const nopeModal = document.getElementById('kittenModalNopeIntervention');
assert(nopeModal && !nopeModal.classList.contains('hidden'), 'Nope Intervention Modal opened for Bot attack card');
assert(env.kittensState.pendingNopeAction !== null, 'pendingNopeAction is stored during countdown');

// Sub-test 5B: Human confirms Nope -> Action cancelled & Nope consumed
env.handleConfirmNope();
assert(interventionFired && interventionResult === true, 'handleConfirmNope resolved with isNoped = true');
assert(!env.kittensState.players[0].hand.includes('nope'), 'Human consumed 1 Nope card from hand');
assert(env.kittensState.discardPile[env.kittensState.discardPile.length - 1].cardId === 'nope', 'Nope card added to discard pile');
assert(nopeModal.classList.contains('hidden'), 'Nope Modal closed after confirmation');

// Sub-test 5C: Bot plays action card, Human ignores Nope -> Action executes normally
env.kittensState.players[0].hand = ['nope', 'defuse'];
interventionFired = false;
interventionResult = null;

env.triggerNopeIntervention(1, 'skip', 0, null, (isNoped) => {
  interventionFired = true;
  interventionResult = isNoped;
});

env.handleIgnoreNope();
assert(interventionFired && interventionResult === false, 'handleIgnoreNope resolved with isNoped = false');
assert(env.kittensState.players[0].hand.includes('nope'), 'Human kept Nope card safely in hand');

// Sub-test 5D: Bot plays action card, Human does NOT have Nope -> No modal, resolves immediately
env.kittensState.players[0].hand = ['defuse', 'attack'];
interventionFired = false;
interventionResult = null;

env.triggerNopeIntervention(1, 'shuffle', 0, null, (isNoped) => {
  interventionFired = true;
  interventionResult = isNoped;
});
assert(interventionFired && interventionResult === false, 'Immediate pass through when Human lacks Nope card');

// TEST SUITE 6: RESET TIMER ON PLAY CARD
console.log('\n--- TEST SUITE 6: RESET TIMER ON PLAY CARD ---');
env.kittensState.currentTurn = 0;
env.kittensState.isLocked = false;
env.kittensState.turnSecondsLeft = 3;
env.kittensState.players[0].hand = ['shuffle', 'defuse'];

env.executeCardPlay(0, 0);
assert(env.kittensState.turnSecondsLeft === 10, 'executeCardPlay immediately resets 10s countdown timer back to 10s');

console.log(`\n========================================`);
console.log(`KẾT QUẢ: ${passedTests}/${totalTests} TESTS PASSED (${Math.round(passedTests/totalTests*100)}%)`);
console.log(`========================================`);

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
