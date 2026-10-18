let dialogues=[];

const grid=document.querySelector('#dialogue-grid');
const search=document.querySelector('#search');
const empty=document.querySelector('#empty');
let activeFilter='all';
let saved=new Set(JSON.parse(localStorage.getItem('dialogue-saved-v1')||'[]'));

function cardTemplate(item){
  return `<article class="dialogue-card" data-id="${item.id}" data-category="${item.category}" data-search="${item.label}${item.question}${item.answer}">
    <div class="dialogue-top"><span><i class="scene-no">0${item.id}</i> / ${item.label}</span><button class="save" type="button" aria-label="收藏这句话" aria-pressed="${saved.has(item.id)}">${saved.has(item.id)?'♥':'♡'}</button></div>
    <p class="question">${item.question}</p>
    <button class="reveal-answer" type="button" aria-expanded="false">怎么接？ ↓</button>
    <div class="answer-panel" hidden><p>${item.answer}</p><small>${item.formula}</small></div>
  </article>`;
}
function render(){grid.innerHTML=dialogues.map(cardTemplate).join('');bindCards();applyFilter();syncSaved()}
function bindCards(){
  document.querySelectorAll('.reveal-answer').forEach(button=>button.addEventListener('click',()=>{const panel=button.nextElementSibling;panel.hidden=!panel.hidden;button.setAttribute('aria-expanded',String(!panel.hidden));button.textContent=panel.hidden?'怎么接？ ↓':'收起来 ↑'}));
  document.querySelectorAll('.save').forEach(button=>button.addEventListener('click',()=>{const id=Number(button.closest('.dialogue-card').dataset.id);saved.has(id)?saved.delete(id):saved.add(id);localStorage.setItem('dialogue-saved-v1',JSON.stringify([...saved]));render()}));
}
function applyFilter(){const query=search.value.trim().toLowerCase();let visible=0;document.querySelectorAll('.dialogue-card').forEach(card=>{const show=(activeFilter==='all'||card.dataset.category===activeFilter)&&card.dataset.search.toLowerCase().includes(query);card.hidden=!show;if(show)visible++});empty.hidden=visible>0}
document.querySelectorAll('#filters button').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#filters .active').classList.remove('active');button.classList.add('active');activeFilter=button.dataset.filter;applyFilter()}));
search.addEventListener('input',applyFilter);
function syncSaved(){document.querySelector('#saved-count').textContent=saved.size}
const savedDialog=document.querySelector('#saved-dialog');
document.querySelector('#saved-button').addEventListener('click',()=>{const items=dialogues.filter(item=>saved.has(item.id));document.querySelector('#saved-list').innerHTML=items.length?items.map(item=>`<div class="saved-item"><strong>${item.question}</strong><p>${item.answer}</p></div>`).join(''):'<p class="saved-empty">还没有收藏。点击话术卡片右上角的 ♡ 即可加入。</p>';savedDialog.showModal()});
document.querySelector('.dialog-close').addEventListener('click',()=>savedDialog.close());
document.querySelector('#reveal').addEventListener('click',event=>{const reference=document.querySelector('#reference');reference.hidden=!reference.hidden;event.currentTarget.textContent=reference.hidden?'看参考表达':'收起参考表达'});
document.querySelector('#random-pick').addEventListener('click',()=>{if(!dialogues.length)return;const item=dialogues[Math.floor(Math.random()*dialogues.length)];activeFilter='all';search.value='';document.querySelector('#filters .active').classList.remove('active');document.querySelector('#filters [data-filter="all"]').classList.add('active');applyFilter();document.querySelector(`[data-id="${item.id}"]`).scrollIntoView({behavior:'smooth',block:'center'});setTimeout(()=>document.querySelector(`[data-id="${item.id}"] .reveal-answer`).focus(),500)});
async function init(){
  try{const response=await fetch('/dialogue/data/dialogues.json');if(!response.ok)throw new Error(`HTTP ${response.status}`);dialogues=(await response.json()).items;render()}
  catch(error){grid.innerHTML='<p class="empty">内容库暂时无法加载，请稍后刷新。</p>';console.error(error)}
}
init();
