
const switcher=document.querySelector('#issue-switch');
if(switcher){switcher.addEventListener('change',()=>location.href=switcher.value)}
const search=document.querySelector('#vocab-search');
if(search){search.addEventListener('input',()=>{const query=search.value.trim().toLowerCase();document.querySelectorAll('.vocab-card').forEach(card=>{card.hidden=!card.dataset.search.includes(query)})})}
const progress=document.querySelector('#progress-bar');
if(progress){addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${max?scrollY/max*100:0}%`},{passive:true})}

const readingModal=document.querySelector('#reading-modal');
if(readingModal){
  const modalTitle=readingModal.querySelector('#reading-modal-title');
  const modalKicker=readingModal.querySelector('#reading-modal-kicker');
  const modalContent=readingModal.querySelector('#reading-modal-content');
  const closeButton=readingModal.querySelector('.reading-modal-close');
  let returnFocus=null;
  function closeReadingModal(){readingModal.hidden=true;document.body.classList.remove('modal-open');if(returnFocus){returnFocus.focus()}}
  function openReadingModal(source){
    const paragraph=source.closest('.parallel-row');
    const number=paragraph?.querySelector('.para-no')?.textContent.trim()||'';
    const label=source.querySelector('.label')?.textContent.trim()||'段落';
    const copy=source.querySelector('p').cloneNode(true);
    copy.querySelectorAll('.word-tooltip').forEach(node=>node.remove());
    modalKicker.textContent=`PARAGRAPH ${number}`;
    modalTitle.textContent=label==='ORIGINAL'?'英文原文':'中文译文';
    modalContent.textContent=copy.textContent.trim();
    returnFocus=source;readingModal.hidden=false;document.body.classList.add('modal-open');closeButton.focus();
  }
  document.querySelectorAll('.zoomable-paragraph').forEach(source=>{
    source.addEventListener('click',event=>{if(!event.target.closest('.word-tip'))openReadingModal(source)});
    source.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();openReadingModal(source)}});
  });
  closeButton.addEventListener('click',closeReadingModal);
  readingModal.addEventListener('click',event=>{if(event.target===readingModal)closeReadingModal()});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!readingModal.hidden)closeReadingModal()});
}

const favoriteStorageKey='beibei-favorites-v1';
let favorites={};
try{favorites=JSON.parse(localStorage.getItem(favoriteStorageKey)||'{}')||{}}catch(error){favorites={}}
const wordModal=document.querySelector('#word-modal');
const favoritesModal=document.querySelector('#favorites-modal');
const favoriteCount=document.querySelector('#favorite-count');
let wordReturnFocus=null;
let favoritesReturnFocus=null;

function wordFromCard(card){return {key:card.dataset.wordKey,term:card.dataset.term,phonetic:card.dataset.phonetic,pos:card.dataset.pos,definition:card.dataset.definition,definitionEn:card.dataset.definitionEn,example:card.dataset.example,issue:card.dataset.issue}}
function saveFavorites(){localStorage.setItem(favoriteStorageKey,JSON.stringify(favorites));syncFavoriteButtons();renderFavorites()}
function syncFavoriteButtons(){
  if(favoriteCount){favoriteCount.textContent=Object.keys(favorites).length}
  document.querySelectorAll('.favorite-word').forEach(button=>{
    const key=button.closest('.vocab-card').dataset.wordKey;
    const selected=Boolean(favorites[key]);
    button.setAttribute('aria-pressed',String(selected));button.textContent=selected?'♥':'♡';
    button.setAttribute('aria-label',`${selected?'取消收藏':'收藏'} ${button.closest('.vocab-card').dataset.term}`);
  });
}
function toggleFavorite(card){const word=wordFromCard(card);if(favorites[word.key]){delete favorites[word.key]}else{favorites[word.key]=word}saveFavorites()}

function closeWordModal(){if(!wordModal)return;wordModal.hidden=true;document.body.classList.remove('modal-open');if(wordReturnFocus){wordReturnFocus.focus()}}
function openWordModal(word,source){
  if(!wordModal)return;wordReturnFocus=source||null;
  wordModal.querySelector('#word-modal-title').textContent=word.term;
  wordModal.querySelector('#word-modal-meta').textContent=`${word.phonetic} · ${word.pos}. · ISSUE ${word.issue}`;
  wordModal.querySelector('#word-modal-definition').textContent=word.definition;
  wordModal.querySelector('#word-modal-english').textContent=word.definitionEn;
  const example=wordModal.querySelector('#word-modal-example');example.textContent=word.example;example.hidden=!word.example;
  wordModal.hidden=false;document.body.classList.add('modal-open');wordModal.querySelector('.word-modal-close').focus();
}

document.querySelectorAll('.vocab-card').forEach(card=>{
  card.addEventListener('click',event=>{if(!event.target.closest('.vocab-actions'))openWordModal(wordFromCard(card),card)});
  card.querySelector('.favorite-word').addEventListener('click',event=>{event.stopPropagation();toggleFavorite(card)});
  card.querySelector('.expand-word').addEventListener('click',event=>{event.stopPropagation();openWordModal(wordFromCard(card),event.currentTarget)});
});
if(wordModal){
  wordModal.querySelector('.word-modal-close').addEventListener('click',closeWordModal);
  wordModal.addEventListener('click',event=>{if(event.target===wordModal)closeWordModal()});
}

function renderFavorites(){
  const list=document.querySelector('#favorites-list');if(!list)return;list.replaceChildren();
  const words=Object.values(favorites).sort((a,b)=>a.term.localeCompare(b.term));
  if(!words.length){const empty=document.createElement('p');empty.className='favorites-empty';empty.textContent='还没有收藏单词。点击词卡右上角的爱心即可加入。';list.append(empty);return}
  words.forEach(word=>{
    const item=document.createElement('article');item.className='favorite-item';
    const main=document.createElement('div');main.className='favorite-item-main';main.tabIndex=0;main.setAttribute('role','button');main.setAttribute('aria-label',`放大查看 ${word.term}`);
    const title=document.createElement('h3');title.textContent=word.term;const definition=document.createElement('p');definition.textContent=word.definition;main.append(title,definition);
    const remove=document.createElement('button');remove.className='favorite-remove';remove.type='button';remove.textContent='×';remove.setAttribute('aria-label',`取消收藏 ${word.term}`);
    function openFavoriteWord(){favoritesModal.hidden=true;openWordModal(word,favoritesOpen)}
    main.addEventListener('click',openFavoriteWord);main.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();openFavoriteWord()}});
    remove.addEventListener('click',()=>{delete favorites[word.key];saveFavorites()});item.append(main,remove);list.append(item);
  });
}
function closeFavoritesModal(){if(!favoritesModal)return;favoritesModal.hidden=true;document.body.classList.remove('modal-open');if(favoritesReturnFocus){favoritesReturnFocus.focus()}}
const favoritesOpen=document.querySelector('.favorites-open');
if(favoritesModal&&favoritesOpen){
  favoritesOpen.addEventListener('click',()=>{favoritesReturnFocus=favoritesOpen;renderFavorites();favoritesModal.hidden=false;document.body.classList.add('modal-open');favoritesModal.querySelector('.favorites-close').focus()});
  favoritesModal.querySelector('.favorites-close').addEventListener('click',closeFavoritesModal);
  favoritesModal.addEventListener('click',event=>{if(event.target===favoritesModal)closeFavoritesModal()});
}
document.addEventListener('keydown',event=>{if(event.key==='Escape'){if(wordModal&&!wordModal.hidden){closeWordModal()}else if(favoritesModal&&!favoritesModal.hidden){closeFavoritesModal()}}});
syncFavoriteButtons();renderFavorites();
