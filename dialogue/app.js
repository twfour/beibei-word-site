let dialogues=[];
const PAGE_SIZE=30;
const grid=document.querySelector('#dialogue-grid');
const search=document.querySelector('#search');
const empty=document.querySelector('#empty');
const resultCount=document.querySelector('#result-count');
const loadMore=document.querySelector('#load-more');
let activeFilter='all';
let activeStatus='all';
let visibleLimit=PAGE_SIZE;
let saved=new Set(JSON.parse(localStorage.getItem('dialogue-saved-v1')||'[]'));

const escapeHtml=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));
const isMissing=item=>item.answer.startsWith('本条 OCR 暂未识别');
const isFeature=item=>item.answer.length>180||item.question.length>110;

function cardTemplate(item){
  const status=item.reviewStatus==='reviewed'?'已校正':item.contentType==='excerpt'?'原书示例':isMissing(item)?'回答缺失':'OCR 精修';
  const cardType=`${isFeature(item)?'feature-card':''} ${item.category==='method'?'method-card':''}`.trim();
  return `<article class="dialogue-card ${cardType}" data-id="${item.id}">
    <div class="dialogue-top"><span><i class="scene-no">${String(item.id).padStart(3,'0')}</i> / ${escapeHtml(item.label)} <em class="status-badge status-${item.contentType==='excerpt'?'excerpt':isMissing(item)?'missing':item.reviewStatus}">${status}</em></span><button class="save" type="button" aria-label="收藏这句话" aria-pressed="${saved.has(item.id)}">${saved.has(item.id)?'♥':'♡'}</button></div>
    ${isFeature(item)?'<span class="feature-kicker">FEATURE / 专题方法</span>':''}
    <p class="question">${escapeHtml(item.question)}</p>
    <button class="reveal-answer" type="button" aria-expanded="false">${isFeature(item)?'阅读全文':'怎么接？'} ↓</button>
    <div class="answer-panel" hidden><p>${escapeHtml(item.answer).replace(/\n/g,'<br>')}</p><small>${escapeHtml(item.formula)}</small></div>
  </article>`;
}

function filteredItems(){
  const query=search.value.trim().toLowerCase();
  return dialogues.filter(item=>{
    const categoryMatch=activeFilter==='all'||item.category===activeFilter;
    const statusMatch=activeStatus==='all'||(activeStatus==='reviewed'&&item.reviewStatus==='reviewed')||(activeStatus==='complete'&&!isMissing(item))||(activeStatus==='excerpt'&&item.contentType==='excerpt');
    const searchMatch=!query||`${item.label}${item.question}${item.answer}`.toLowerCase().includes(query);
    return categoryMatch&&statusMatch&&searchMatch;
  });
}

function render(){
  const matches=filteredItems();
  const shown=matches.slice(0,visibleLimit);
  grid.innerHTML=shown.map(cardTemplate).join('');
  bindCards();syncSaved();
  empty.hidden=matches.length>0;
  resultCount.textContent=`找到 ${matches.length} 条 · 已显示 ${shown.length} 条`;
  loadMore.hidden=shown.length>=matches.length;
}

function bindCards(){
  document.querySelectorAll('.reveal-answer').forEach(button=>button.addEventListener('click',()=>{const panel=button.nextElementSibling;panel.hidden=!panel.hidden;button.setAttribute('aria-expanded',String(!panel.hidden));const feature=button.closest('.feature-card');button.textContent=panel.hidden?(feature?'阅读全文 ↓':'怎么接？ ↓'):'收起来 ↑'}));
  document.querySelectorAll('.save').forEach(button=>button.addEventListener('click',()=>{const id=Number(button.closest('.dialogue-card').dataset.id);saved.has(id)?saved.delete(id):saved.add(id);localStorage.setItem('dialogue-saved-v1',JSON.stringify([...saved]));button.textContent=saved.has(id)?'♥':'♡';button.setAttribute('aria-pressed',String(saved.has(id)));syncSaved()}));
}

function resetAndRender(){visibleLimit=PAGE_SIZE;render()}
document.querySelectorAll('#filters button').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#filters .active').classList.remove('active');button.classList.add('active');activeFilter=button.dataset.filter;resetAndRender()}));
document.querySelectorAll('#status-filters button').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#status-filters .active').classList.remove('active');button.classList.add('active');activeStatus=button.dataset.status;resetAndRender()}));
search.addEventListener('input',resetAndRender);
loadMore.addEventListener('click',()=>{visibleLimit+=PAGE_SIZE;render()});
function syncSaved(){document.querySelector('#saved-count').textContent=saved.size}

const savedDialog=document.querySelector('#saved-dialog');
document.querySelector('#saved-button').addEventListener('click',()=>{const items=dialogues.filter(item=>saved.has(item.id));document.querySelector('#saved-list').innerHTML=items.length?items.map(item=>`<div class="saved-item"><strong>${escapeHtml(item.question)}</strong><p>${escapeHtml(item.answer)}</p></div>`).join(''):'<p class="saved-empty">还没有收藏。点击话术卡片右上角的 ♡ 即可加入。</p>';savedDialog.showModal()});
document.querySelector('.dialog-close').addEventListener('click',()=>savedDialog.close());
document.querySelector('#reveal').addEventListener('click',event=>{const reference=document.querySelector('#reference');reference.hidden=!reference.hidden;event.currentTarget.textContent=reference.hidden?'看参考表达':'收起参考表达'});
document.querySelector('#random-pick').addEventListener('click',()=>{const pool=filteredItems();if(!pool.length)return;const item=pool[Math.floor(Math.random()*pool.length)];visibleLimit=Math.max(PAGE_SIZE,pool.indexOf(item)+1);render();const target=document.querySelector(`[data-id="${item.id}"]`);target?.scrollIntoView({behavior:'smooth',block:'center'});setTimeout(()=>target?.querySelector('.reveal-answer').focus(),500)});

async function init(){
  try{const response=await fetch('/dialogue/data/dialogues-full.json');if(!response.ok)throw new Error(`HTTP ${response.status}`);const data=await response.json();dialogues=data.items;document.querySelector('#library-count').textContent=data.total_count;document.querySelector('#filter-total').textContent=data.total_count;render()}
  catch(error){grid.innerHTML='<p class="empty">内容库暂时无法加载，请稍后刷新。</p>';console.error(error)}
}
init();
