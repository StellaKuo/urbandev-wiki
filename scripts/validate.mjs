import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
const articles = JSON.parse(readFileSync('data/articles.json', 'utf8'));
assert(Array.isArray(articles) && articles.length >= 1);
const ids = new Set();
for (const a of articles) {
  for (const k of ['id','title','category','summary','updated']) assert(typeof a[k] === 'string' && a[k].trim(), `${a.id}: ${k}`);
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(a.id), `id 格式錯誤: ${a.id}`);
  assert(!ids.has(a.id), `重複 id: ${a.id}`); ids.add(a.id);
  assert(/^\d{4}-\d{2}-\d{2}$/.test(a.updated) && !Number.isNaN(Date.parse(a.updated)), `日期錯誤: ${a.id}`);
  assert(Number.isInteger(a.readingMinutes) && a.readingMinutes > 0);
  assert(Array.isArray(a.sections) && a.sections.length >= 2);
  for (const s of a.sections) assert(typeof s.heading === 'string' && s.heading.trim() && typeof s.body === 'string' && s.body.trim());
  assert(Array.isArray(a.sources) && a.sources.length >= 1, `缺少來源: ${a.id}`);
  for (const s of a.sources) assert(s.label && /^https:\/\//.test(s.url), `來源格式錯誤: ${a.id}`);
}
for (const file of ['index.html','AGENTS.md','README.md','assets/js/app.js','assets/js/articles-data.js','assets/css/style.css']) assert(existsSync(file), `缺少 ${file}`);
const generated = '// 此檔由 npm run build:data 產生；請勿手動修改。\nwindow.URBANDEV_ARTICLES = ' + JSON.stringify(articles, null, 2) + ';\n';
assert.equal(readFileSync('assets/js/articles-data.js','utf8'),generated,'資料未同步，請執行 npm run build:data');
console.log(`驗證通過：${articles.length} 篇文章、唯一 ID、必填欄位、來源及資料同步。`);
