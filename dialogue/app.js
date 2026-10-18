const dialogues = [
  {id:1,category:'boundary',label:'边界感',question:'对方问：这件事你认为该怎么解决？',answer:'是啊，该怎么解决呢？你肯定已经有更好的方法了吧？',formula:'不抢答 · 反问 · 邀请共创'},
  {id:2,category:'boundary',label:'边界感',question:'对方说：你反应比别人慢半拍。',answer:'是啊，我就是反应慢嘛，还得多和你们这些聪明人学一学呢。',formula:'接住 · 自嘲 · 反向赞美'},
  {id:3,category:'work',label:'职场',question:'别人说：老板最近对你很关照啊。',answer:'那肯定是我近期工作完成得好呀。',formula:'不解释 · 归因工作 · 稳住自信'},
  {id:4,category:'praise',label:'被夸时',question:'别人说：你今天穿的衣服真漂亮。',answer:'谢谢，你今天发型也不错，很有气质。',formula:'接受赞美 · 发现对方'},
  {id:5,category:'relationship',label:'人情往来',question:'别人问：你会喝酒吗？',answer:'会一点，不过我更擅长把大家陪高兴。',formula:'模糊酒量 · 明确目的 · 保留边界'},
  {id:6,category:'praise',label:'被夸时',question:'别人夸：你很优秀。',answer:'被你这么优秀的人认可，我今天又多了一点底气。',formula:'大方接受 · 把光送回去'}
];

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
document.querySelector('#random-pick').addEventListener('click',()=>{const item=dialogues[Math.floor(Math.random()*dialogues.length)];activeFilter='all';search.value='';document.querySelector('#filters .active').classList.remove('active');document.querySelector('#filters [data-filter="all"]').classList.add('active');applyFilter();document.querySelector(`[data-id="${item.id}"]`).scrollIntoView({behavior:'smooth',block:'center'});setTimeout(()=>document.querySelector(`[data-id="${item.id}"] .reveal-answer`).focus(),500)});
render();
