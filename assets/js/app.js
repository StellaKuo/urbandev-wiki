'use strict';
const state = { articles: [], category: '全部', query: '' };
const elements = {
  filters: document.querySelector('#filters'),
  search: document.querySelector('#search'),
  articles: document.querySelector('#articles'),
  count: document.querySelector('#article-count'),
  dialog: document.querySelector('#article-dialog'),
  dialogTitle: document.querySelector('#dialog-title'),
  dialogCategory: document.querySelector('#dialog-category'),
  dialogMeta: document.querySelector('#dialog-meta'),
  dialogBody: document.querySelector('#dialog-body')
};
const preferredCategories = ['都市更新', '危老重建', '土地開發'];
function renderFilters() {
  const categories = ['全部', ...new Set([...preferredCategories, ...state.articles.map(a => a.category)])];
  elements.filters.replaceChildren();
  for (const category of categories) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `filter${state.category === category ? ' active' : ''}`;
    button.textContent = category;
    button.setAttribute('aria-pressed', String(state.category === category));
    button.addEventListener('click', () => { state.category = category; renderFilters(); renderArticles(); });
    elements.filters.append(button);
  }
}
function renderArticles() {
  const query = state.query.trim().toLocaleLowerCase('zh-Hant-TW');
  const matches = state.articles.filter(article => {
    const text = [article.title, article.summary, article.category, ...article.sections.flatMap(s => [s.heading, s.body])].join(' ').toLocaleLowerCase('zh-Hant-TW');
    return (state.category === '全部' || article.category === state.category) && text.includes(query);
  });
  elements.articles.replaceChildren();
  if (!matches.length) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = '找不到符合條件的文章，試試其他關鍵字或分類。';
    elements.articles.append(empty);
    return;
  }
  for (const article of matches) {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'article-card';
    const category = document.createElement('span'); category.className = 'card-category'; category.textContent = article.category;
    const title = document.createElement('h3'); title.textContent = article.title;
    const summary = document.createElement('p'); summary.textContent = article.summary;
    const footer = document.createElement('div'); footer.className = 'card-footer';
    const time = document.createElement('span'); time.textContent = `約 ${article.readingMinutes} 分鐘閱讀`;
    const arrow = document.createElement('span'); arrow.className = 'arrow'; arrow.textContent = '↗'; arrow.setAttribute('aria-hidden', 'true');
    footer.append(time, arrow); card.append(category, title, summary, footer);
    card.addEventListener('click', () => openArticle(article));
    elements.articles.append(card);
  }
}
function openArticle(article) {
  elements.dialogCategory.textContent = article.category;
  elements.dialogTitle.textContent = article.title;
  elements.dialogMeta.textContent = `約 ${article.readingMinutes} 分鐘閱讀 · 更新於 ${article.updated}`;
  elements.dialogBody.replaceChildren();
  for (const section of article.sections) {
    const container = document.createElement('section');
    const heading = document.createElement('h3'); heading.textContent = section.heading;
    const body = document.createElement('p'); body.textContent = section.body;
    container.append(heading, body); elements.dialogBody.append(container);
  }
  if (article.sources?.length) {
    const heading = document.createElement('h3'); heading.textContent = '參考資料';
    const list = document.createElement('ul');
    for (const source of article.sources) {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = source.url; link.target = '_blank'; link.rel = 'noopener noreferrer';
      link.textContent = source.label; item.append(link); list.append(item);
    }
    elements.dialogBody.append(heading, list);
  }
  elements.dialog.showModal();
}
document.querySelector('#close-dialog').addEventListener('click', () => elements.dialog.close());
elements.dialog.addEventListener('click', event => { if (event.target === elements.dialog) elements.dialog.close(); });
elements.search.addEventListener('input', event => { state.query = event.target.value; renderArticles(); });
function initialize() {
  const articles = window.URBANDEV_ARTICLES;
  if (!Array.isArray(articles)) {
    elements.articles.textContent = '資料載入失敗，請確認 assets/js/articles-data.js 存在。';
    return;
  }
  state.articles = articles;
  elements.count.textContent = String(articles.length).padStart(2, '0');
  renderFilters(); renderArticles();
}
initialize();
