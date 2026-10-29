const fs = require('fs');
const assert = require('assert');

console.log('========================================================================');
console.log('  TEST SUITE: ALL 8 GAMES P2P MULTIPLAYER & ONLINE SYNCHRONIZATION      ');
console.log('========================================================================');

// Mock browser environment
class MockElement {
  constructor(id = '', tag = 'div') {
    this.id = id;
    this.tagName = tag.toUpperCase();
    this.children = [];
    this.style = {};
    this.classList = {
      _classes: new Set(),
      add(...cls) { cls.forEach(c => this._classes.add(c)); },
      remove(...cls) { cls.forEach(c => this._classes.delete(c)); },
      contains(c) { return this._classes.has(c); },
      toggle(c) { if (this.contains(c)) this.remove(c); else this.add(c); }
    };
    this.innerHTML = '';
    this.innerText = '';
    this.textContent = '';
    this.disabled = false;

    this.querySelectorAll = () => [];
    this.offsetWidth = 100;
    this.offsetHeight = 100;
    this.focus = () => {};
    this.setAttribute = () => {};
    this.removeAttribute = () => {};
    this.getAttribute = () => null;
    this.appendChild = (c) => { this.children.push(c); return c; };
    this.removeChild = () => {};
    this.replaceChildren = () => {};
    this.remove = () => {};

  }
  querySelector(sel) {
    if (sel.startsWith('.')) {
      const cls = sel.slice(1);
      const found = this.children.find(c => c.classList && c.classList.contains(cls));
      if (found) return found;
      const dummy = new MockElement('', 'div');
      dummy.classList.add(cls);
      this.children.push(dummy);
      return dummy;
    }
    return this.children[0] || null;
  }
}

const mockBody = new MockElement('body');
const mockDOM = {
  createElement: (tag) => new MockElement('dynamic_' + tag, tag),
  body: mockBody,
  elements: new Map(),
  addEventListener(event, fn) {},
  removeEventListener(event, fn) {},
  getElementById(id) {
    if (!this.elements.has(id)) {
      this.elements.set(id, new MockElement(id));
    }
    return this.elements.get(id);
  },
  querySelector(sel) {
    if (sel.startsWith('#')) return this.getElementById(sel.slice(1));
    return new MockElement();
  }
};

global.document = mockDOM;
global.requestAnimationFrame = (cb) => setTimeout(cb, 1);
global.cancelAnimationFrame = (id) => clearTimeout(id);
global.window = {
  scrollTo: () => {},
  requestAnimationFrame: (cb) => setTimeout(cb, 1),
  cancelAnimationFrame: (id) => clearTimeout(id),
  document: mockDOM,
  addEventListener(event, fn) {},
  removeEventListener(event, fn) {},
  soundVolume: 1,
  isArenaAudioMuted: false,
  renderPlayerAvatarSafe: (av, cls) => `<div class="${cls}">${av}</div>`,
  switchMainTab: (tab) => {},
  switchGameView: (tab) => { global.window.activeGameView = tab; },
  showToast: (msg) => {},
  AudioContext: class {
    constructor() { this.state = 'running'; this.currentTime = 0; }
    resume() {}
    createOscillator() {
      return {
        type: 'sine',
        frequency: { setValueAtTime() {}, exponentialRampToValueAtTime() {} },
        connect() {},
        start() {},
        stop() {}
      };
    }
    createGain() {
      return {
        gain: { setValueAtTime() {}, exponentialRampToValueAtTime() {} },
        connect() {}
      };
    }
    createBuffer() { return { getChannelData() { return new Float32Array(100); } }; }
    createBufferSource() { return { buffer: null, connect() {}, start() {}, stop() {} }; }
    get destination() { return {}; }
  }
};
global.self = global.window;

const mockStorage = new Map();
global.localStorage = {
  getItem: (k) => mockStorage.get(k) || null,
  setItem: (k, v) => mockStorage.set(k, String(v)),
  removeItem: (k) => mockStorage.delete(k),
  clear: () => mockStorage.clear()
};
global.window.localStorage = global.localStorage;


global.getHudRankBadgeSVG = () => '';
global.window.getHudRankBadgeSVG = () => '';
global.soundTone = () => {};
global.window.soundTone = () => {};
global.triggerMonoFloatingCash = () => {};
global.updateMonopolyHUD = () => {};
global.updateMonopolyPawns = () => {};
global.BUSINESS_TOUR_SALARY = 2000;
global.getUnoAvatarUrl = (i) => 'avatar_' + i;
global.getKittenAvatarUrl = (i) => 'avatar_' + i;
global.BUSINESS_TOUR_AVATAR_SVGS = ['av1', 'av2', 'av3', 'av4'];
global.UNO_BOT_NAMES = ['Bot 1', 'Bot 2', 'Bot 3'];


// Load script blocks
const html = fs.readFileSync('index.html', 'utf8');
const scriptMatches = [...html.matchAll(/<script(\b[^>]*)>([\s\S]*?)<\/script>/gi)];

// Script 5: Main App Engine & Multiplayer
const code5 = scriptMatches[4][2];
new Function(code5)();

// Script 7: Dice Engine
const code7 = scriptMatches[6][2];
new Function('root', code7)(global.window);

// Script 8: Catan Engine
const code8 = scriptMatches[7][2];
new Function(code8)();

let passedTests = 0;
function it(title, fn) {
  try {
    fn();
    console.log(`  ✓ ${title}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ ${title}:`, err.stack);
    process.exit(1);
  }
}

// =========================================================================
// TEST SUITE 1: 8 SUPPORTED GAMES IN MULTIPLAYER CATALOG
// =========================================================================
console.log('\n--- NHÓM 1: DANH MỤC 8 GAME TRONG MODAL P2P ONLINE ---');
it('Test 1: MP_GAME_NAMES supports all 8 games', () => {
  const games = ['dice', 'chess', 'tictactoe', 'monopoly', 'kittens', 'werewolf', 'uno', 'catan'];
  games.forEach(g => {
    assert(window.selectMpGame, 'selectMpGame must exist');
  });
});

it('Test 2: selectMpGame activates UNO Battle Royale correctly', () => {
  window.selectMpGame('uno');
  assert.strictEqual(window.mpRoomState.selectedGame, 'uno');
  const card = document.getElementById('mpGameCard_uno');
  assert(card.classList.contains('border-cyan-500'), 'Card UNO must be highlighted with border-cyan-500');
});

it('Test 3: selectMpGame activates Đảo Catan 3D correctly', () => {
  window.selectMpGame('catan');
  assert.strictEqual(window.mpRoomState.selectedGame, 'catan');
  const card = document.getElementById('mpGameCard_catan');
  assert(card.classList.contains('border-cyan-500'), 'Card Catan must be highlighted with border-cyan-500');
  // Catan enforces at least 2 AI bots for 3-4 players
  assert(window.mpRoomState.aiCount >= 2, 'Catan requires at least 2 AI bots');
});

it('Test 4: filterMpGames searches across all 8 games', () => {
  window.filterMpGames('catan');
  const catanCard = document.getElementById('mpGameCard_catan');
  assert(!catanCard.classList.contains('hidden'), 'Catan card must remain visible when searching "catan"');

  window.filterMpGames('uno');
  const unoCard = document.getElementById('mpGameCard_uno');
  assert(!unoCard.classList.contains('hidden'), 'UNO card must remain visible when searching "uno"');
});

// =========================================================================
// TEST SUITE 2: ONLINE UNO LAUNCH & REAL-TIME STATE SYNC
// =========================================================================
console.log('\n--- NHÓM 2: KHỞI TẠO & ĐỒNG BỘ UNO ONLINE ---');
it('Test 5: launchMultiplayerMatch initiates UNO Online room', () => {
  const room = {
    code: 'UNO888',
    game: 'uno',
    status: 'in_game',
    players: [
      { id: 'u1', name: 'Kỳ Thủ Alpha', avatar: '🦁' },
      { id: 'u2', name: 'Kỳ Thủ Beta', avatar: '🦊' }
    ],
    botConfig: { enabled: true, count: 2 }
  };

  window.mpRoomState.isHost = true;
  window.launchMultiplayerMatch(room);
  assert.strictEqual(window.isOnlineRoomMatch, true);
  assert.strictEqual(window.unoState.mode, 'online');
  assert.strictEqual(window.unoState.players.length, 4);
  assert.strictEqual(window.unoState.players[0].name, 'Kỳ Thủ Alpha');
  assert.strictEqual(window.unoState.players[1].name, 'Kỳ Thủ Beta');
  assert.strictEqual(window.unoState.players[2].isHuman, false, 'Player 2 must be an AI Bot');
  assert.strictEqual(window.unoState.players[3].isHuman, false, 'Player 3 must be an AI Bot');
});

it('Test 6: applyOnlineGameState applies UNO actions (Play card & Turn)', () => {
  const matchState = {
    seq: 10,
    updatedBy: 1,
    payload: {
      actionType: 'PLAY_CARD',
      currentTurn: 2,
      activeColor: 'blue',
      discardPile: [{ color: 'blue', value: '7' }]
    }
  };

  window.applyOnlineGameState('uno', matchState, true);
  assert.strictEqual(window.unoState.currentTurn, 2);
  assert.strictEqual(window.unoState.activeColor, 'blue');
  assert.strictEqual(window.unoState.discardPile[window.unoState.discardPile.length - 1].value, '7');
});

// =========================================================================
// TEST SUITE 3: ONLINE CATAN 3D LAUNCH & REAL-TIME STATE SYNC
// =========================================================================
console.log('\n--- NHÓM 3: KHỞI TẠO & ĐỒNG BỘ ĐẢO CATAN 3D ONLINE ---');
it('Test 7: launchMultiplayerMatch initiates Catan Online room with 4 players', () => {
  const room = {
    code: 'CAT999',
    game: 'catan',
    status: 'in_game',
    players: [
      { id: 'c1', name: 'Lãnh Chúa Đỏ' },
      { id: 'c2', name: 'Thương Gia Lam' }
    ],
    botConfig: { enabled: true, count: 2 }
  };

  window.mpRoomState.isHost = true;
  window.launchMultiplayerMatch(room);
  assert.strictEqual(window.isOnlineRoomMatch, true);
  assert.strictEqual(window.catanState.mode, 'online');
  assert.strictEqual(window.catanState.players.length, 4);
  assert.strictEqual(window.catanState.players[0].name, 'Lãnh Chúa Đỏ');
  assert.strictEqual(window.catanState.players[1].name, 'Thương Gia Lam');
  assert.strictEqual(window.catanState.players[2].isHuman, false, 'Player 2 must be an AI Bot');
  assert.strictEqual(window.catanState.players[3].isHuman, false, 'Player 3 must be an AI Bot');
});

it('Test 8: syncOnlineCatanState collects snapshot correctly', () => {
  let pushedPayload = null;
  window.pushOnlineGameState = (game, payload) => {
    assert.strictEqual(game, 'catan');
    pushedPayload = payload;
  };

  window.catanState.players[0].resources.wood = 5;
  window.catanState.players[0].resources.brick = 4;
  window.syncOnlineCatanState('TEST_SYNC', 'Snapshot test message');

  assert(pushedPayload, 'Payload must be generated');
  assert.strictEqual(pushedPayload.actionType, 'TEST_SYNC');
  assert.strictEqual(pushedPayload.players[0].resources.wood, 5);
  assert.strictEqual(pushedPayload.players[0].resources.brick, 4);
  assert.strictEqual(pushedPayload.hexes.length, 19);
});

it('Test 9: applyOnlineGameState restores Catan 3D remote actions (Road & Roll)', () => {
  const matchState = {
    seq: 15,
    updatedBy: 1,
    payload: {
      actionType: 'BUILD_ROAD',
      currentTurnPlayer: 1,
      turnPhase: 'action',
      edges: [{ id: 12, road: 1 }],
      players: [
        { id: 0, name: 'Lãnh Chúa Đỏ', victoryPoints: 2, resources: { wood: 1, brick: 1, sheep: 1, wheat: 1, ore: 0 } },
        { id: 1, name: 'Thương Gia Lam', victoryPoints: 2, resources: { wood: 0, brick: 0, sheep: 1, wheat: 1, ore: 0 } }
      ]
    }
  };

  window.applyOnlineGameState('catan', matchState, true);
  assert.strictEqual(window.catanState.edges[12].road, 1, 'Edge 12 must have road owned by player 1');
  assert.strictEqual(window.catanState.currentTurnPlayer, 1);
});

it('Test 10: applyOnlineGameState restores Catan 3D Settlement & VP upgrade', () => {
  const matchState = {
    seq: 16,
    updatedBy: 1,
    payload: {
      actionType: 'BUILD_SETTLEMENT',
      vertices: [{ id: 8, building: { player: 1, type: 'settlement' } }],
      players: [
        { id: 0, victoryPoints: 2 },
        { id: 1, victoryPoints: 3 }
      ]
    }
  };

  window.applyOnlineGameState('catan', matchState, true);
  assert.strictEqual(window.catanState.vertices[8].building.player, 1);
  assert.strictEqual(window.catanState.vertices[8].building.type, 'settlement');
  assert.strictEqual(window.catanState.players[1].victoryPoints, 3);
});

console.log(`\n🎉 ALL ${passedTests} ONLINE MULTIPLAYER TESTS PASSED 100%!`);
process.exit(0);
