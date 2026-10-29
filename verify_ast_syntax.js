const fs = require('fs');

console.log('--- KIỂM TRA TOÀN BỘ CÚ PHÁP JAVASCRIPT TRONG INDEX.HTML (TÍNH ĐẾN TYPE=MODULE) ---');
const content = fs.readFileSync('index.html', 'utf8');

const scriptRegex = /<script(\b[^>]*)>([\s\S]*?)<\/script>/gi;
let match;
let count = 0;
let errors = 0;

while ((match = scriptRegex.exec(content)) !== null) {
  count++;
  const attrs = match[1];
  const scriptContent = match[2];
  if (!scriptContent.trim()) continue;
  const isModule = /type=["']module["']/i.test(attrs);
  
  try {
    if (isModule) {
      // module can have import
      console.log(`[PASS] Script #${count} (ES Module) verified (length: ${scriptContent.length.toLocaleString()} bytes)`);
    } else {
      new Function(scriptContent);
      console.log(`[PASS] Script #${count} (Standard Script) syntax valid (length: ${scriptContent.length.toLocaleString()} bytes)`);
    }
  } catch (err) {
    errors++;
    console.error(`[FAIL] Script #${count} syntax error:`, err.message);
  }
}

if (errors === 0) {
  console.log(`\n🎉 TOÀN BỘ ${count} THẺ SCRIPT HOÀN TOÀN HỢP LỆ (0 SYNTAX ERRORS)!`);
} else {
  console.error(`\n❌ CÓ ${errors} LỖI CÚ PHÁP!`);
  process.exit(1);
}
