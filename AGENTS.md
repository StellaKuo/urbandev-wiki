# AGENTS.md — UrbanDev Wiki AI 協作規範

## 1. 專案目的
本專案為生成式 AI 課程作品：以都市更新、危老重建、土地開發為主題，示範 AI 如何遵循同一份規則持續新增知識文章。網站是純靜態網站，可由 GitHub Pages 部署。

## 2. 技術與檔案
- `index.html`：單頁網站與無障礙語意結構。
- `assets/css/style.css`：唯一主要樣式檔。
- `assets/js/app.js`：搜尋、分類、文章對話框邏輯。
- `data/articles.json`：**文章唯一資料來源**。
- `assets/js/articles-data.js`：自動產生的瀏覽器資料檔，禁止直接編輯。
- `scripts/build-data.mjs`：從 JSON 產生 JS 資料檔。
- `scripts/validate.mjs`：檢查文章結構及同步狀態。
- `docs/assignment.md`：作業說明與實作紀錄。

## 3. 視覺與互動規則
- 深藍綠、薄荷綠、米白色系；簡潔專業、留白清楚。
- 手機版優先，保留搜尋、分類、文章閱讀與鍵盤操作。
- 不引入框架、CDN 或需要金鑰的 API；可直接開啟 `index.html`。
- 動態文字用 `textContent` 或 DOM API，不把使用者資料直接寫入 `innerHTML`。

## 4. 新增文章規則
只編輯 `data/articles.json`。每篇文章必填：
- `id`：唯一英文小寫 kebab-case，例如 `renewal-process-guide`。
- `category`：優先使用 `都市更新`、`危老重建`、`土地開發`。
- `title`、`summary`：繁體中文、簡潔易懂。
- `readingMinutes`：正整數。
- `updated`：`YYYY-MM-DD`。
- `sections`：至少兩段，每段有 `heading` 和 `body`。
- `sources`：至少一個參考網址物件，含 `label` 與 HTTPS `url`。

法律與開發內容需標示適用限制，不可捏造法條、優惠或投資報酬；引用來源應盡量連到具體官方頁面並人工核實。勿上傳地主個資、身分證、聯絡資料或未公開契約。

## 5. AI 修改流程（必須依序執行）
1. 閱讀本文件與 `README.md`，確認需求。
2. 只修改必要檔案，維持原有配色與互動行為。
3. 新增文章時只編輯 `data/articles.json`，不手改產生檔。
4. 執行 `npm run check`，確認輸出「驗證通過」。
5. 檢查首頁、搜尋、分類、文章開啟與關閉，以及手機排版。
6. 在回覆中說明修改檔案、測試結果與尚未完成的人工檢查。

## 6. 驗收條件
- `index.html` 本機雙擊可載入所有文章（不依賴 `fetch`）。
- 所有文章可搜尋、分類、開啟閱讀。
- `npm run check` 成功；不應破壞既有文章。
- GitHub Pages 部署後再實際檢查公開網址；**沒有部署不可宣稱已公開**。
