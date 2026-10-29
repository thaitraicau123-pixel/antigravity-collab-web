const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('index.html', 'utf8');
const scriptRegex = /<script(\b[^>]*)>([\s\S]*?)<\/script>/gi;
let match;
let scriptIdx = 0;
let errors = 0;

while ((match = scriptRegex.exec(html)) !== null) {
  scriptIdx++;
  const attrs = match[1];
  const code = match[2];
  if (!code.trim()) continue;
  try {
    if (attrs.includes('type="module"')) {
      const sanitized = code.replace(/import\s+[\s\S]*?from\s+['"][^'"]+['"];?/g, '/* import */');
      new vm.Script(sanitized);
    } else {
      new vm.Script(code);
    }
  } catch (err) {
    errors++;
    console.error(`Script block #${scriptIdx} syntax error:`, err.message);
  }
}

if (errors === 0) {
  console.log(`ALL ${scriptIdx} script blocks PASSED syntax check cleanly!`);
} else {
  console.error(`FOUND ${errors} syntax errors!`);
  process.exit(1);
}
