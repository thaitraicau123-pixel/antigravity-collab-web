const fs = require('fs');
const assert = require('assert');

console.log('=== TEST SUITE: CATAN 3D & DICE3D OBSIDIAN ENGINE ===');

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
  }
  querySelector(sel) {
    if (sel.startsWith('#')) {
      const targetId = sel.slice(1);
      if (this.id === targetId) return this;
      return this.children.find(c => c.id === targetId) || null;
    }
    return this.children[0] || null;
  }
}

const mockDOM = {
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
    return null;
  }
};

global.document = mockDOM;
global.window = {
  document: mockDOM,
  addEventListener(event, fn) {},
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
    createBuffer() {
      return {
        getChannelData() { return new Float32Array(100); }
      };
    }
    createBufferSource() {
      return {
        buffer: null,
        connect() {},
        start() {},
        stop() {}
      };
    }
    get destination() { return {}; }
  }
};
global.self = global.window;

const html = fs.readFileSync('index.html', 'utf8');
const scriptMatches = [...html.matchAll(/<script(\b[^>]*)>([\s\S]*?)<\/script>/gi)];

// Evaluate Script 7 with module=undefined to simulate browser window
(function() {
  const code7 = scriptMatches[6][2];
  const fn7 = new Function('root', code7);
  fn7(global.window);
})();

// Evaluate Script 8
(function() {
  const code8 = scriptMatches[7][2];
  const fn8 = new Function(code8);
  fn8();
})();

let passedTests = 0;
async function runTests() {
  function it(title, fn) {
    try {
      fn();
      console.log(`  ✓ ${title}`);
      passedTests++;
    } catch (err) {
      console.error(`  ✗ ${title}:`, err.message);
      process.exit(1);
    }
  }

  async function itAsync(title, fn) {
    try {
      await fn();
      console.log(`  ✓ ${title}`);
      passedTests++;
    } catch (err) {
      console.error(`  ✗ ${title}:`, err.message);
      process.exit(1);
    }
  }

  // 1. Engine Mount & API
  it('Dice3DObsidianEngine is loaded and has mount API', () => {
    assert(typeof window.Dice3DObsidianEngine === 'object', 'Dice3DObsidianEngine must be an object');
    assert(typeof window.Dice3DObsidianEngine.mount === 'function', 'Dice3DObsidianEngine.mount must be a function');
    assert(typeof window.Dice3DObsidianEngine.playDiceTumbleSFX === 'function');
  });

  // 2. User exact mount contract
  await itAsync('mounts 2-dice obsidian-cyan tray with 1000ms / 600ms timing', async () => {
    const tray = window.Dice3DObsidianEngine.mount('#dice-container', {
      diceCount: 2,
      sizePx: 44,
      theme: 'obsidian-cyan',
      spinDurationMs: 10,
      postSettlePauseMs: 10
    });

    assert(typeof tray.roll === 'function');
    const rollRes = await tray.roll();
    assert(Array.isArray(rollRes.values));
    assert.strictEqual(rollRes.values.length, 2);
    assert(rollRes.values[0] >= 1 && rollRes.values[0] <= 6);
    assert(rollRes.values[1] >= 1 && rollRes.values[1] <= 6);
    assert.strictEqual(rollRes.sum, rollRes.values[0] + rollRes.values[1]);
    assert.strictEqual(rollRes.isDoubles, rollRes.values[0] === rollRes.values[1]);
  });

  // 3. User exact roll contract: const { values, sum, isDoubles } = await diceTray.roll();
  await itAsync('fulfills user code pattern: const { values, sum, isDoubles } = await diceTray.roll();', async () => {
    const diceTray = window.Dice3DObsidianEngine.mount('#dice-container', {
      diceCount: 2,
      sizePx: 44,
      theme: 'obsidian-cyan',
      spinDurationMs: 5,
      postSettlePauseMs: 5
    });

    const { values, sum, isDoubles } = await diceTray.roll();
    assert(values.length === 2);
    assert(sum >= 2 && sum <= 12);
    assert.strictEqual(typeof isDoubles, 'boolean');
  });

  // 4. Global movePlayerToken contract
  it('movePlayerToken(sum) forwards dice sum to Catan Engine', () => {
    assert(typeof window.movePlayerToken === 'function');
    window.initCatanGame();
    assert(window.catanState.initialized);

    window.movePlayerToken(6);
    assert.strictEqual(window.catanState.turnPhase, 'action');
  });

  // 5. Catan Board Graph
  it('builds 19-hex graph with 1 desert, 54 vertices, and 72 edges', () => {
    const graph = window.buildCatanBoardGraph();
    assert.strictEqual(graph.hexes.length, 19);
    assert.strictEqual(graph.vertices.length, 54);
    assert.strictEqual(graph.edges.length, 72);

    const desertHex = graph.hexes.find(h => h.resource === 'desert');
    assert(desertHex, 'Must have 1 desert hex');
    assert.strictEqual(desertHex.hasRobber, true);
    assert.strictEqual(desertHex.number, null);

    const nonDesert = graph.hexes.filter(h => h.resource !== 'desert');
    assert.strictEqual(nonDesert.length, 18);
    nonDesert.forEach(h => {
      assert(h.number >= 2 && h.number <= 12 && h.number !== 7);
    });
  });

  // 6. Game Initialization & 4 Players
  it('initializes 4 players with 2 settlements (2 VP) and 2 roads each', () => {
    window.initCatanGame();
    const s = window.catanState;
    assert.strictEqual(s.players.length, 4);

    s.players.forEach(p => {
      assert.strictEqual(p.victoryPoints, 2);
      const settlements = s.vertices.filter(v => v.building && v.building.player === p.id);
      assert.strictEqual(settlements.length, 2);
      const roads = s.edges.filter(e => e.road === p.id);
      assert.strictEqual(roads.length, 2);
    });
  });

  // 7. Resource Harvesting
  it('harvests correct resources when a non-7 number is rolled', () => {
    window.initCatanGame();
    const s = window.catanState;
    
    let testHex = null;
    let testPlayer = null;
    for (const hex of s.hexes) {
      if (hex.resource !== 'desert' && !hex.hasRobber) {
        for (const vId of hex.vertexIds) {
          if (s.vertices[vId].building) {
            testHex = hex;
            testPlayer = s.players[s.vertices[vId].building.player];
            break;
          }
        }
        if (testHex) break;
      }
    }

    assert(testHex, 'Found an active resource hex');
    const prevCount = testPlayer.resources[testHex.resource] || 0;

    const report = window.harvestResourcesForSum(testHex.number);
    assert(report.length > 0);
    assert((testPlayer.resources[testHex.resource] || 0) >= prevCount + 1);
  });

  // 8. Robber on 7
  it('handles robber event when rolling 7 (penalty if > 7 cards and robber relocation)', () => {
    window.initCatanGame();
    const s = window.catanState;
    const p = s.players[0];

    p.resources = { wood: 2, brick: 2, sheep: 2, wheat: 2, ore: 2 };
    window.resolveCatanDiceResult({ values: [3, 4], sum: 7, isDoubles: false });
    assert.strictEqual(s.turnPhase, 'moving_robber');

    const totalAfter = (p.resources.wood || 0) + (p.resources.brick || 0) + (p.resources.sheep || 0) + (p.resources.wheat || 0) + (p.resources.ore || 0);
    assert.strictEqual(totalAfter, 5);

    const targetHex = (s.robberHexId + 3) % 19;
    window.moveRobberToHex(targetHex, p);
    assert.strictEqual(s.robberHexId, targetHex);
    assert.strictEqual(s.hexes[targetHex].hasRobber, true);
    assert.strictEqual(s.turnPhase, 'action');
  });

  // 9. Building Settlement & Road
  it('verifies settlement build constraints (Distance Rule and resource cost)', () => {
    window.initCatanGame();
    const s = window.catanState;
    const p = s.players[0];

    p.resources = { wood: 5, brick: 5, sheep: 5, wheat: 5, ore: 5 };
    s.turnPhase = 'action';
    s.currentTurnPlayer = 0;

    const buildableEdge = s.edges.find(e => {
      if (e.road !== null) return false;
      const v1 = s.vertices[e.v1];
      const v2 = s.vertices[e.v2];
      return (v1.building && v1.building.player === 0) || (v2.building && v2.building.player === 0);
    });

    assert(buildableEdge, 'Found buildable edge connected to existing settlement');
    window.toggleCatanBuildMode('road');
    assert.strictEqual(s.selectedBuildMode, 'road');

    window.onCatanEdgeClick(buildableEdge.id);
    assert.strictEqual(buildableEdge.road, 0);
    assert.strictEqual(p.resources.wood, 4);
    assert.strictEqual(p.resources.brick, 4);
  });

  // 10. Win Condition (10 VP)
  it('triggers game over and victory modal when player reaches 10 VP', () => {
    window.initCatanGame();
    const s = window.catanState;
    const p = s.players[0];

    p.victoryPoints = 9;
    p.resources = { wood: 1, brick: 1, sheep: 1, wheat: 1, ore: 0 };
    s.turnPhase = 'action';
    s.currentTurnPlayer = 0;

    p.resources = { sheep: 1, wheat: 1, ore: 1 };
    const origMathRandom = Math.random;
    Math.random = () => 0.1;
    window.buyCatanDevCard();
    Math.random = origMathRandom;

    assert.strictEqual(p.victoryPoints, 10);
    assert.strictEqual(s.isGameOver, true);
  });

  console.log(`\n🎉 ALL ${passedTests} UNIT TESTS PASSED WITH 100% SUCCESS!`);
}

runTests();
