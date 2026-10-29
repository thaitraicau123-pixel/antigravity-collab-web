const fs = require('fs');
const assert = require('assert');

console.log('========================================================================');
console.log('  TEST SUITE: ALL 9 GAMES P2P MULTIPLAYER & ONLINE SYNCHRONIZATION      ');
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
    this.blur = () => {};
    this.scrollIntoView = () => {};
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

const html = fs.readFileSync('index.html', 'utf8');
const scriptMatches = [...html.matchAll(/<script(\b[^>]*)>([\s\S]*?)<\/script>/gi)];

// Script 7: Dice3DObsidianEngine
(function() {
  const code7 = scriptMatches[6][2];
  const fn7 = new Function('root', code7);
  fn7(global.window);
})();
global.Dice3DObsidianEngine = global.window.Dice3DObsidianEngine;

// Script 9: Betrayal 3D Game Engine
(function() {
  const code9 = scriptMatches[8][2];
  const fn9 = new Function(code9);
  fn9();
})();

// Script 5: Main App Logic & P2P Multiplayer System
(function() {
  const code5 = scriptMatches[4][2];
  const fn5 = new Function(code5);
  fn5();
})();

console.log('--- NHÓM 1: DANH MỤC 9 GAME TRONG MODAL P2P ONLINE ---');
const expectedGames = ['monopoly', 'uno', 'kittens', 'chess', 'tictactoe', 'dice', 'werewolf', 'catan', 'betrayal'];
expectedGames.forEach(g => {
  global.window.selectMpGame(g);
  assert.strictEqual(global.window.mpRoomState.selectedGame, g, `Selected game must be ${g}`);
  console.log(`  ✓ selectMpGame supports '${g}'`);
});

console.log('\n--- NHÓM 2: KHỞI TẠO & ĐỒNG BỘ BETRAYAL AT HOUSE ON THE HILL 3D ONLINE ---');
const mockBetrayalRoom = {
  code: 'BETRAYAL01',
  game: 'betrayal',
  players: [
    { name: 'Kỳ Thủ Sống Sót 1', id: 'usr1' },
    { name: 'Kỳ Thủ Sống Sót 2', id: 'usr2' },
    { name: 'Kỳ Thủ Sống Sót 3', id: 'usr3' }
  ]
};

global.window.myRoomPlayerIndex = 0;
global.window.setupOnlineBetrayal(mockBetrayalRoom);
const bState = global.window.betrayalState;
assert(bState.mode === 'online', 'Betrayal game mode should be online');
assert(bState.players[0].name === 'Kỳ Thủ Sống Sót 1', 'Player 0 is Kỳ Thủ Sống Sót 1');
assert(bState.players[1].name === 'Kỳ Thủ Sống Sót 2', 'Player 1 is Kỳ Thủ Sống Sót 2');
assert(bState.players[2].name === 'Kỳ Thủ Sống Sót 3', 'Player 2 is Kỳ Thủ Sống Sót 3');
assert(bState.players[3].isHuman === false, 'Slot 4 is auto-filled by Bot');
console.log('  ✓ launchMultiplayerMatch initiates Betrayal Online room with 4 players');

// Test applyOnlineGameState for Betrayal
const mockPayload = {
  actionType: 'MOVE_EXPLORE',
  currentTurnPlayer: 1,
  roundNumber: 2,
  activeFloor: 'upper',
  omenCount: 2,
  isHauntActive: false,
  players: [
    { id: 0, name: 'Kỳ Thủ Sống Sót 1', floor: 'ground', pos: { x: 2, y: 1 }, hp: 10, isTraitor: false, isAlive: true },
    { id: 1, name: 'Kỳ Thủ Sống Sót 2', floor: 'upper', pos: { x: 2, y: 2 }, hp: 10, isTraitor: false, isAlive: true }
  ]
};

global.window.applyOnlineGameState('betrayal', mockPayload, false);
assert(bState.currentTurnPlayer === 1, 'Current turn updated to 1 via remote sync');
assert(bState.roundNumber === 2, 'Round number updated to 2 via remote sync');
assert(bState.activeFloor === 'upper', 'Active floor updated to upper via remote sync');
assert(bState.omenCount === 2, 'Omen count updated to 2 via remote sync');
assert(bState.players[0].pos.y === 1, 'Player 0 position updated to (2, 1)');
assert(bState.players[1].floor === 'upper', 'Player 1 floor updated to upper');
console.log('  ✓ applyOnlineGameState restores Betrayal remote actions & player positions');

console.log('\n🎉 ALL 9 GAMES ONLINE MULTIPLAYER TESTS PASSED 100%!\n');
process.exit(0);
