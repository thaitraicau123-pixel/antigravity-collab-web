// test_betrayal_engine.js
// Automated Test Suite for Betrayal at House on the Hill 3D (Biệt Thự Ma Ám 3D)
const fs = require('fs');
const assert = require('assert');

console.log('=== TEST SUITE: BETRAYAL AT HOUSE ON THE HILL 3D & DICE3D ENGINE ===');

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
    this.textContent = '';
    this.disabled = false;
    this.focus = () => {};
    this.blur = () => {};
    this.scrollIntoView = () => {};
  }
  querySelector(sel) {
    if (sel.startsWith('#')) {
      const targetId = sel.slice(1);
      if (this.id === targetId) return this;
      return this.children.find(c => c.id === targetId) || null;
    }
    return this.children[0] || null;
  }
  appendChild(el) { this.children.push(el); return el; }
}

const mockDOM = {
  elements: new Map(),
  addEventListener(event, fn) {},
  removeEventListener(event, fn) {},
  head: new MockElement('head', 'head'),
  body: new MockElement('body', 'body'),
  getElementById(id) {
    if (!this.elements.has(id)) {
      this.elements.set(id, new MockElement(id));
    }
    return this.elements.get(id);
  },
  querySelector(sel) {
    if (sel.startsWith('#')) return this.getElementById(sel.slice(1));
    return null;
  },
  createElement(tag) {
    return new MockElement('', tag);
  }
};

global.document = mockDOM;
global.window = {
  document: mockDOM,
  addEventListener(event, fn) {},
  showToast(msg, type) { /* mock toast */ },
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
    get destination() { return {}; }
  }
};
global.self = global.window;

const html = fs.readFileSync('index.html', 'utf8');

// 1. Verify HTML Structure contains essential Betrayal components
assert(html.includes('id="betrayalView"'), 'Viewport #betrayalView exists in HTML');
assert(html.includes('id="dice-container-betrayal"'), 'Dice mount #dice-container-betrayal exists in HTML');
assert(html.includes('id="betrayalRollDiceBtn"'), 'Button #betrayalRollDiceBtn exists in HTML');
assert(html.includes('id="betrayalBtnAttack"'), 'Button #betrayalBtnAttack exists in HTML');
assert(html.includes('id="betrayalBtnEndTurn"'), 'Button #betrayalBtnEndTurn exists in HTML');
assert(html.includes('id="betrayalRulesModal"'), 'Modal #betrayalRulesModal exists in HTML');
assert(html.includes('id="betrayalWinModal"'), 'Modal #betrayalWinModal exists in HTML');
console.log('✅ PASS: All Betrayal HTML structure & Modal elements verified.');

// Find all script blocks
const scriptMatches = [...html.matchAll(/<script(\b[^>]*)>([\s\S]*?)<\/script>/gi)];
console.log(`Found ${scriptMatches.length} script blocks.`);

// Evaluate Script 7: Dice3DObsidianEngine
(function() {
  const code7 = scriptMatches[6][2];
  const fn7 = new Function('root', code7);
  fn7(global.window);
})();
global.Dice3DObsidianEngine = global.window.Dice3DObsidianEngine;
assert(global.window.Dice3DObsidianEngine !== undefined, 'Dice3DObsidianEngine evaluated');
console.log('✅ PASS: Dice3DObsidianEngine loaded successfully.');

// Evaluate Script 9: Betrayal 3D Game Engine
(function() {
  const code9 = scriptMatches[8][2];
  const fn9 = new Function(code9);
  fn9();
})();
assert(typeof global.window.initBetrayalGame === 'function', 'initBetrayalGame is loaded');
console.log('✅ PASS: Betrayal 3D Game Engine evaluated successfully.');

// TEST 1: Initialize Betrayal Game
global.window.initBetrayalGame();
const s = global.window.betrayalState;
assert(s.initialized === true, 's.initialized should be true');
assert(s.players.length === 4, 'Should initialize 4 players');
assert(s.players[0].name === 'Giáo Sư Brandon', 'Player 0 is Giáo Sư Brandon');
assert(s.players[0].pos.x === 2 && s.players[0].pos.y === 2, 'Player 0 starts at (2, 2)');
assert(s.floors.ground[2][2].discovered === true, 'Grand Staircase at (2, 2) is discovered');
assert(s.floors.upper[2][2].discovered === false, 'Upper floor (2, 2) is undiscovered');
console.log('✅ PASS TEST 1: Initial Game State & 4 Explorers verified.');

// TEST 2: 3D Dice Tray Mount
assert(s.diceTray !== null, 'Dice tray should be mounted');
assert(typeof s.diceTray.roll === 'function', 'Dice tray has roll() function');
console.log('✅ PASS TEST 2: Dice3DObsidianEngine mounted to betrayal dice container.');

// TEST 3: Floor Switching
global.window.switchBetrayalFloor('upper');
assert(s.activeFloor === 'upper', 'Floor switched to upper');
global.window.switchBetrayalFloor('basement');
assert(s.activeFloor === 'basement', 'Floor switched to basement');
global.window.switchBetrayalFloor('ground');
assert(s.activeFloor === 'ground', 'Floor switched to ground');
console.log('✅ PASS TEST 3: 3-Floor switching (Ground, Upper, Basement) verified.');

// TEST 4: Tile Movement & Room Discovery
s.players[0].movesLeft = 3;
assert(s.floors.ground[1][2].discovered === false, 'Tile (2, 1) starts undiscovered');
global.window.onBetrayalTileClick(2, 1);
assert(s.players[0].pos.x === 2 && s.players[0].pos.y === 1, 'Player 0 moved to (2, 1)');
assert(s.players[0].movesLeft === 2, 'MovesLeft decremented');
assert(s.floors.ground[1][2].discovered === true, 'Tile (2, 1) is now discovered');
console.log('✅ PASS TEST 4: Tile Movement & Room Discovery verified.');

// TEST 5: Haunt Roll & Traitor Transformation
s.omenCount = 6;
// Force roll sum = 3 < omenCount (6) -> Haunt Explodes!
global.window.resolveHauntRoll({ values: [1, 2], sum: 3, isDoubles: false });
assert(s.isHauntActive === true, 'Haunt should be active');
assert(s.traitorPlayerId !== null, 'A traitor should be selected');
const traitor = s.players.find(p => p.isTraitor);
assert(traitor !== undefined, 'Traitor found in player list');
assert(traitor.avatar === '🧛', 'Traitor avatar transformed to 🧛 Vampire Lord');
assert(traitor.hp >= 12, 'Traitor HP should be boosted to at least 12');
console.log(`✅ PASS TEST 5: Haunt Roll triggered! Traitor: ${traitor.name} (${traitor.title}) transformed into Vampire Lord.`);

// TEST 6: Combat Resolution
const survivor = s.players.find(p => !p.isTraitor);
survivor.pos = { x: 2, y: 1 };
survivor.floor = 'ground';
traitor.pos = { x: 2, y: 1 };
traitor.floor = 'ground';
s.currentTurnPlayer = traitor.id;

const prevSurvivorHP = survivor.hp;
const prevTraitorHP = traitor.hp;
global.window.onBetrayalAttackClick();
assert(survivor.hp < prevSurvivorHP || traitor.hp < prevTraitorHP, 'Combat damage dealt');
console.log(`✅ PASS TEST 6: Combat execution verified between Traitor and Survivor.`);

// TEST 7: End Turn Rotation
const oldTurn = s.currentTurnPlayer;
global.window.endBetrayalTurn();
assert(s.currentTurnPlayer !== oldTurn, 'Turn rotated to another explorer');
console.log('✅ PASS TEST 7: Turn rotation verified.');

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

const mockStorage = new Map();
global.localStorage = {
  getItem: (k) => mockStorage.get(k) || null,
  setItem: (k, v) => mockStorage.set(k, String(v)),
  removeItem: (k) => mockStorage.delete(k),
  clear: () => mockStorage.clear()
};
global.window.localStorage = global.localStorage;

// TEST 8: Online P2P Engine (Script 5)
// Evaluate Script 5 for setupOnlineBetrayal and syncOnlineBetrayalState
(function() {
  const code5 = scriptMatches[4][2];
  const fn5 = new Function(code5);
  fn5();
})();
assert(typeof global.window.setupOnlineBetrayal === 'function', 'setupOnlineBetrayal is exported');
assert(typeof global.window.syncOnlineBetrayalState === 'function', 'syncOnlineBetrayalState is exported');

const mockRoom = {
  code: 'BETRAYAL99',
  game: 'betrayal',
  players: [
    { name: 'Kỳ Thủ Alpha', id: 'u1' },
    { name: 'Kỳ Thủ Beta', id: 'u2' }
  ]
};
global.window.myRoomPlayerIndex = 0;
global.window.setupOnlineBetrayal(mockRoom);
assert(s.mode === 'online', 'Match state mode switched to online');
assert(s.players[0].name === 'Kỳ Thủ Alpha', 'Player 0 synced with online room slot 0');
assert(s.players[1].name === 'Kỳ Thủ Beta', 'Player 1 synced with online room slot 1');
console.log('✅ PASS TEST 8: Online P2P Synchronization verified.');

// TEST 9: Dice Roll with User Code Pattern (Dice3DObsidianEngine async roll)
(async () => {
  s.isRolling = false;
  s.turnPhase = 'explore';
  await global.window.onBetrayalRollDiceClick();
  assert(s.players[s.currentTurnPlayer].movesLeft > 0, 'Moves awarded after 3-stage 3D dice roll');
  console.log('✅ PASS TEST 9: 3D Obsidian Dice Roll async execution verified.');
  console.log('\n🌟 ALL 9 TEST SUITES FOR BETRAYAL AT HOUSE ON THE HILL 3D PASSED CLEANLY! 🌟\n');
  process.exit(0);
})();
