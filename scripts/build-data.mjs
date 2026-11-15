import { readFileSync, writeFileSync } from 'node:fs';
const articles = JSON.parse(readFileSync('data/articles.json', 'utf8'));
writeFileSync('assets/js/articles-data.js', '// 此檔由 npm run build:data 產生；請勿手動修改。\nwindow.URBANDEV_ARTICLES = ' + JSON.stringify(articles, null, 2) + ';\n');
console.log(`已產生 ${articles.length} 篇文章資料`);
