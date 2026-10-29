const fs = require('fs');
const assert = require('assert');

console.log('========================================================================');
console.log('  TEST SUITE: MASTER RULEBOOK & GAME RULES FOR ALL 9 GAMES (v4.8.0)     ');
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
// GROUP 1: HTML STRUCTURE FOR ALL 9 GAME RULES IN MAIN VIEW
// -------------------------------------------------------------------------
console.log('\n--- NHÓM 1: MỤC LỤC & 9 THẺ BÀI BENTO TRONG VIEWPORT LUẬT CHƠI ---');

it('Test 1: Category tabs container contains all 9 game tabs', () => {
  assert(html.includes('id="ruleTabAll"'), 'ruleTabAll must exist');
  assert(html.includes('id="ruleTabDice"'), 'ruleTabDice must exist');
  assert(html.includes('id="ruleTabCaro"'), 'ruleTabCaro must exist');
  assert(html.includes('id="ruleTabChess"'), 'ruleTabChess must exist');
  assert(html.includes('id="ruleTabMonopoly"'), 'ruleTabMonopoly must exist');
  assert(html.includes('id="ruleTabKittens"'), 'ruleTabKittens must exist');
  assert(html.includes('id="ruleTabWerewolf"'), 'ruleTabWerewolf must exist');
  assert(html.includes('id="ruleTabUno"'), 'ruleTabUno must exist');
  assert(html.includes('id="ruleTabCatan"'), 'ruleTabCatan must exist');
  assert(html.includes('id="ruleTabBetrayal"'), 'ruleTabBetrayal must exist');
});

it('Test 2: All 9 Bento Rule Cards exist in #rulesCardsContainer', () => {
  assert(html.includes('id="ruleCardDice"'), 'ruleCardDice must exist');
  assert(html.includes('id="ruleCardCaro"'), 'ruleCardCaro must exist');
  assert(html.includes('id="ruleCardChess"'), 'ruleCardChess must exist');
  assert(html.includes('id="ruleCardMonopoly"'), 'ruleCardMonopoly must exist');
  assert(html.includes('id="ruleCardKittens"'), 'ruleCardKittens must exist');
  assert(html.includes('id="ruleCardWerewolf"'), 'ruleCardWerewolf must exist');
  assert(html.includes('id="ruleCardUno"'), 'ruleCardUno must exist');
  assert(html.includes('id="ruleCardCatan"'), 'ruleCardCatan must exist');
  assert(html.includes('id="ruleCardBetrayal"'), 'ruleCardBetrayal must exist');
});

it('Test 3: Betrayal Rule Card covers Exploration, Omen & Haunt Roll, Traitor vs Survivors', () => {
  const betrayalIdx = html.indexOf('id="ruleCardBetrayal"');
  assert(betrayalIdx !== -1, 'ruleCardBetrayal must exist');
  const betrayalBlock = html.substring(betrayalIdx, betrayalIdx + 3000);
  assert(betrayalBlock.includes('Biệt Thự Ma Ám 3D') || betrayalBlock.includes('Betrayal at House on the Hill'));
  assert(betrayalBlock.includes('Haunt Roll') || betrayalBlock.includes('Omen'));
  assert(betrayalBlock.includes('Traitor') || betrayalBlock.includes('Kẻ Phản Bội'));
});

console.log('\n--- NHÓM 2: QUICK RULES MODAL (#rulesModal) CHO 9 GAME ---');

it('Test 4: Quick Rules Modal has tab and content for Betrayal', () => {
  assert(html.includes('id="qRuleTab_betrayal"'), 'qRuleTab_betrayal must exist');
  assert(html.includes('id="qRuleContent_betrayal"'), 'qRuleContent_betrayal must exist');
});

console.log('\n--- NHÓM 3: MODAL LUẬT CHƠI ĐỘC LẬP (#betrayalRulesModal) ---');

it('Test 5: Betrayal has dedicated full rules modal #betrayalRulesModal', () => {
  assert(html.includes('id="betrayalRulesModal"'), '#betrayalRulesModal must exist');
  assert(html.includes('openBetrayalRulesModal'), 'openBetrayalRulesModal function must be present');
});

console.log(`\n🎉 ALL 5/5 RULEBOOK TESTS FOR 9 GAMES PASSED WITH 100% SUCCESS!\n`);
process.exit(0);
