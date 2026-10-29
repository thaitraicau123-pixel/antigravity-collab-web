const fs = require('fs');
const path = require('path');

console.log('=== TEST UNIT LOGIC COUNTER-ATTACK STACKING v4.3.4 ===\n');

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
        querySelector: (sel) => {
          return { textContent: '' };
        },
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
      getNextAlivePlayerIdx,
      triggerNopeIntervention,
      processNopeChainStep,
      openNopeModalForHuman,
      finalizeNopeChain,
      handleConfirmNope,
      handleConfirmCounterAttack,
      handleIgnoreNope,
      executeCardPlay,
      passTurnToNextPlayer
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
  env.initKittensGame();

  // --------------------------------------------------------------------------
  // TEST SUITE 1: MODAL OPENS FOR HUMAN WITH ATTACK EVEN WITHOUT NOPE
  // --------------------------------------------------------------------------
  console.log('--- TEST SUITE 1: COUNTER-ATTACK INTERVENTION MODAL ---');
  // Player 3 attacks Player 0 (Human)
  // Human has NO Nope, but HAS Attack!
  env.kittensState.players[0].hand = ['attack', 'defuse', 'skip'];
  env.kittensState.players[3].hand = ['attack', 'defuse'];

  let res1 = null;
  env.triggerNopeIntervention(3, 'attack', 0, 0, (isNoped) => {
    res1 = isNoped;
  });

  const modal = document.getElementById('kittenModalNopeIntervention');
  assert(!modal.classList.contains('hidden'), 'Modal opened for Human when targeted by Attack even without Nope');

  const btnAtk = document.getElementById('btnConfirmCounterAttack');
  assert(!btnAtk.classList.contains('hidden'), 'Counter-Attack button is VISIBLE');

  const btnNope = document.getElementById('btnConfirmNope');
  assert(btnNope.classList.contains('hidden'), 'Nope button is HIDDEN when human lacks Nope');

  const dangerText = document.getElementById('kittenNopeDangerText');
  assert(dangerText.textContent.includes('PHẢN ĐÒN ATTACK'), 'Danger text guides player to Counter-Attack');

  // --------------------------------------------------------------------------
  // TEST SUITE 2: HUMAN EXECUTES COUNTER-ATTACK VIA MODAL
  // --------------------------------------------------------------------------
  console.log('\n--- TEST SUITE 2: HUMAN EXECUTES COUNTER-ATTACK ---');
  env.handleConfirmCounterAttack();

  assert(modal.classList.contains('hidden'), 'Modal closed after confirming Counter-Attack');
  assert(!env.kittensState.players[0].hand.includes('attack'), 'Human consumed Attack card from hand');
  assert(env.kittensState.discardPile[env.kittensState.discardPile.length - 1].cardId === 'attack', 'Attack card added to discard pile');
  assert(env.kittensState.currentTurn === 1, 'Turn passed to Player 1 (next after Human)');
  assert(env.kittensState.turnsLeftForPlayer === 4, 'Turns stacked to 4 (2 + 2 = 4 turns) for Player 1');

  // --------------------------------------------------------------------------
  // TEST SUITE 3: IN-TURN COUNTER-ATTACK STACKING (PLAYER 1 ATTACKS AGAIN)
  // --------------------------------------------------------------------------
  console.log('\n--- TEST SUITE 3: IN-TURN ATTACK STACKING (4 + 2 = 6) ---');
  // Player 1 has 4 turns pending, plays Attack
  env.kittensState.currentTurn = 1;
  env.kittensState.turnsLeftForPlayer = 4;
  env.kittensState.players[1].hand = ['attack', 'defuse'];
  // Ensure Player 2 doesn't randomly bot-counter in this test
  env.kittensState.players[2].hand = ['defuse'];

  await env.executeCardPlay(1, 0);
  assert(env.kittensState.currentTurn === 2, 'Turn passed to Player 2');
  assert(env.kittensState.turnsLeftForPlayer === 6, 'Turns stacked to 6 (4 + 2 = 6 turns) for Player 2');

  // --------------------------------------------------------------------------
  // TEST SUITE 4: BOT COUNTER-ATTACKS WHEN TARGETED BY ATTACK
  // --------------------------------------------------------------------------
  console.log('\n--- TEST SUITE 4: BOT COUNTER-ATTACK LOGIC ---');
  // Player 0 attacks Player 1. Player 1 has Attack.
  env.kittensState.currentTurn = 0;
  env.kittensState.turnsLeftForPlayer = 1;
  env.kittensState.players[0].hand = ['attack', 'defuse'];
  env.kittensState.players[1].hand = ['attack', 'defuse'];

  // Override Math.random to 0.1 so bot counter-attack triggers 100%
  const origRandom = Math.random;
  Math.random = () => 0.1;

  await env.executeCardPlay(0, 0);
  Math.random = origRandom;

  // Player 1 should have counter-attacked, consuming their attack card,
  // and passing 4 turns to Player 2!
  assert(!env.kittensState.players[1].hand.includes('attack'), 'Bot 1 consumed their Attack card to Counter-Attack');
  assert(env.kittensState.currentTurn === 2, 'Counter-Attack bypassed Bot 1 and landed on Bot 2');
  assert(env.kittensState.turnsLeftForPlayer === 4, 'Bot 2 received 4 stacked turns from Bot 1 Counter-Attack');

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
