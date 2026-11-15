# UrbanDev Wiki — 都市更新與土地開發知識庫

生成式 AI 課程小專案，核心是 `AGENTS.md`：讓 AI 按統一規則擴充內容，而非每次重新製作網站。

## 直接瀏覽
解壓縮後雙擊根目錄 `index.html` 即可使用；無需安裝套件或啟動伺服器。首頁提供 39 篇文章搜尋、分類篩選、閱讀對話框。

## 修改或新增文章
1. 閱讀 `AGENTS.md`。
2. 編輯 `data/articles.json`，勿直接修改 `assets/js/articles-data.js`。
3. 安裝 Node.js 18+，在專案根目錄執行 `npm run check`（不需 `npm install`）。
4. 重新開啟 `index.html` 驗證畫面。

## GitHub Pages 發布
1. 在 GitHub 建立 **Public** 儲存庫 `urbandev-wiki`。
2. 將此專案的**內容**上傳至儲存庫根目錄（確保 `index.html` 在根目錄）。
3. `Settings → Pages → Build and deployment → Deploy from a branch`，選擇 `main` 與 `/(root)`。
4. 等候部署，實際開啟 `https://<你的帳號>.github.io/urbandev-wiki/` 並測試搜尋、分類、文章。

> 注意：此交付包尚未替使用者登入 GitHub、上傳或部署；公開網址需使用者完成以上操作後才會存在。

## 專案結構
```text
index.html
AGENTS.md
README.md
package.json
data/articles.json
assets/css/style.css
assets/js/app.js
assets/js/articles-data.js
scripts/build-data.mjs
scripts/validate.mjs
docs/assignment.md
```

本網站為學術示範，內容非法律、稅務、建築設計或投資建議。
