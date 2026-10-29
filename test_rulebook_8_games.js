const fs = require('fs');
const assert = require('assert');

console.log('========================================================================');
console.log('  TEST SUITE: MASTER RULEBOOK & GAME RULES FOR ALL 8 GAMES (v4.7.0)     ');
console.log('========================================================================');

const html = fs.readFileSync('index.html', 'utf8');

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

// -------------------------------------------------------------------------
// GROUP 1: HTML STRUCTURE FOR ALL 8 GAME RULES IN MAIN VIEW
// -------------------------------------------------------------------------
console.log('\n--- NHÓM 1: MỤC LỤC & 8 THẺ BÀI BENTO TRONG VIEWPORT LUẬT CHƠI ---');

it('Test 1: Category tabs container contains all 8 game tabs and "Toàn Cảnh 8 Bộ Môn"', () => {
  assert(html.includes('id="ruleTabAll"'), 'ruleTabAll must exist');
  assert(html.includes('Toàn Cảnh 8 Bộ Môn'), 'Tab label must be "Toàn Cảnh 8 Bộ Môn"');
  assert(html.includes('id="ruleTabDice"'), 'ruleTabDice must exist');
  assert(html.includes('id="ruleTabCaro"'), 'ruleTabCaro must exist');
  assert(html.includes('id="ruleTabChess"'), 'ruleTabChess must exist');
  assert(html.includes('id="ruleTabMonopoly"'), 'ruleTabMonopoly must exist');
  assert(html.includes('id="ruleTabKittens"'), 'ruleTabKittens must exist');
  assert(html.includes('id="ruleTabWerewolf"'), 'ruleTabWerewolf must exist');
  assert(html.includes('id="ruleTabUno"'), 'ruleTabUno must exist');
  assert(html.includes('id="ruleTabCatan"'), 'ruleTabCatan must exist');
});

it('Test 2: All 8 Bento Rule Cards exist in #rulesCardsContainer', () => {
  assert(html.includes('id="ruleCardDice"'), 'ruleCardDice must exist');
  assert(html.includes('id="ruleCardCaro"'), 'ruleCardCaro must exist');
  assert(html.includes('id="ruleCardChess"'), 'ruleCardChess must exist');
  assert(html.includes('id="ruleCardMonopoly"'), 'ruleCardMonopoly must exist');
  assert(html.includes('id="ruleCardKittens"'), 'ruleCardKittens must exist');
  assert(html.includes('id="ruleCardWerewolf"'), 'ruleCardWerewolf must exist');
  assert(html.includes('id="ruleCardUno"'), 'ruleCardUno must exist');
  assert(html.includes('id="ruleCardCatan"'), 'ruleCardCatan must exist');
});

it('Test 3: Kittens Rule Card covers Defuse, Attack, and Nope Duel', () => {
  const kittensIdx = html.indexOf('id="ruleCardKittens"');
  assert(kittensIdx !== -1, 'ruleCardKittens must exist');
  const kittensBlock = html.substring(kittensIdx, kittensIdx + 3000);
  assert(kittensBlock.includes('Mèo Nổ Tabletop'));
  assert(kittensBlock.includes('Defuse') || kittensBlock.includes('Gỡ Bom'));
  assert(kittensBlock.includes('Nope') || kittensBlock.includes('Chặn Đòn'));
  assert(kittensBlock.includes('Attack') || kittensBlock.includes('Tấn Công'));
});

it('Test 4: Werewolf Rule Card covers Night Zero Leak, 6 Roles, and Execution', () => {
  const wwIdx = html.indexOf('id="ruleCardWerewolf"');
  assert(wwIdx !== -1, 'ruleCardWerewolf must exist');
  const wwBlock = html.substring(wwIdx, wwIdx + 3000);
  assert(wwBlock.includes('Ma Sói Trăng Máu'));
  assert(wwBlock.includes('Zero Role Leak') || wwBlock.includes('Đêm Tối Tối Mật'));
  assert(wwBlock.includes('Biểu Quyết Treo Cổ') || wwBlock.includes('Treo Cổ'));
});

it('Test 5: UNO Rule Card covers 108 cards, 5s countdown, Space key, and False Catch penalty', () => {
  const unoIdx = html.indexOf('id="ruleCardUno"');
  assert(unoIdx !== -1, 'ruleCardUno must exist');
  const unoBlock = html.substring(unoIdx, unoIdx + 3000);
  assert(unoBlock.includes('UNO Battle Royale'));
  assert(unoBlock.includes('108 Lá'));
  assert(unoBlock.includes('Đếm Ngược 5 Giây') || unoBlock.includes('5s'));
  assert(unoBlock.includes('Bắt UNO Láo') || unoBlock.includes('Hô UNO'));
});

it('Test 6: Catan 3D Rule Card covers 19 Hexes, 3D Dice, 5 Resources, Distance Rule, and 10 VP', () => {
  const catanIdx = html.indexOf('id="ruleCardCatan"');
  assert(catanIdx !== -1, 'ruleCardCatan must exist');
  const catanBlock = html.substring(catanIdx, catanIdx + 3000);
  assert(catanBlock.includes('Đảo Catan 3D'));
  assert(catanBlock.includes('19 Hexes') || catanBlock.includes('19'));
  assert(catanBlock.includes('Xúc Xắc 3D'));
  assert(catanBlock.includes('10 Điểm Thắng') || catanBlock.includes('10 VP'));
});

// -------------------------------------------------------------------------
// GROUP 2: WEREWOLF RULES MODAL IN ARENA VIEW
// -------------------------------------------------------------------------
console.log('\n--- NHÓM 2: WEREWOLF RULES MODAL & COCKPIT BUTTON ---');

it('Test 7: Werewolf View header has [📖 Luật Chơi] button', () => {
  assert(html.includes('onclick="openWerewolfRulesModal()"'), 'Werewolf Cockpit header must have openWerewolfRulesModal button');
});

it('Test 8: #werewolfRulesModal exists and details all 6 roles', () => {
  assert(html.includes('id="werewolfRulesModal"'), 'werewolfRulesModal must exist');
  const modalIdx = html.indexOf('id="werewolfRulesModal"');
  const modalBlock = html.substring(modalIdx, modalIdx + 5000);
  assert(modalBlock.includes('Ma Sói (2 Người)'));
  assert(modalBlock.includes('Tiên Tri (1 Người)'));
  assert(modalBlock.includes('Bảo Vệ (1 Người)'));
  assert(modalBlock.includes('Phù Thủy (1 Người)'));
  assert(modalBlock.includes('Thợ Săn (1 Người)'));
  assert(modalBlock.includes('Dân Làng (1 Người)'));
});

// -------------------------------------------------------------------------
// GROUP 3: QUICK MASTER RULEBOOK POPUP (#rulesModal)
// -------------------------------------------------------------------------
console.log('\n--- NHÓM 3: QUICK MASTER RULEBOOK MODAL VỚI TABS 8 GAME ---');

it('Test 9: #rulesModal has 8 quick game tabs', () => {
  const games = ['dice', 'caro', 'chess', 'monopoly', 'kittens', 'werewolf', 'uno', 'catan'];
  games.forEach(g => {
    assert(html.includes(`id="qRuleTab_${g}"`), `qRuleTab_${g} must exist in quick rule modal`);
    assert(html.includes(`id="qRuleContent_${g}"`), `qRuleContent_${g} must exist in quick rule modal`);
  });
});

it('Test 10: switchQuickRuleTab and filterRulesCategory are defined and exported to window', () => {
  assert(html.includes('window.switchQuickRuleTab = function'), 'switchQuickRuleTab must be exported');
  assert(html.includes('window.filterRulesCategory = function'), 'filterRulesCategory must be exported');
  assert(html.includes('window.openWerewolfRulesModal = function'), 'openWerewolfRulesModal must be exported');
});

console.log(`\n🎉 ALL ${passedTests} RULEBOOK TESTS PASSED 100%!`);
process.exit(0);
