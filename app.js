
const switcher=document.querySelector('#issue-switch');
if(switcher){switcher.addEventListener('change',()=>location.href=switcher.value)}
const search=document.querySelector('#vocab-search');
if(search){search.addEventListener('input',()=>{const query=search.value.trim().toLowerCase();document.querySelectorAll('.vocab-card').forEach(card=>{card.hidden=!card.dataset.search.includes(query)})})}
const progress=document.querySelector('#progress-bar');
const bookMain=document.querySelector('.book-main');
if(progress&&bookMain){
  const syncBookProgress=()=>{const max=bookMain.scrollWidth-bookMain.clientWidth;progress.style.width=`${max?bookMain.scrollLeft/max*100:0}%`};
  bookMain.addEventListener('scroll',syncBookProgress,{passive:true});syncBookProgress();
  const scrollBookToHash=(hash,behavior='smooth')=>{
    if(!hash)return false;
    const target=document.querySelector(hash);
    if(!target||!bookMain.contains(target))return false;
    bookMain.scrollTo({left:target.offsetLeft,behavior});
    window.scrollTo({top:0,left:0,behavior:'auto'});
    syncBookProgress();
    return true;
  };
  document.querySelectorAll('.reader-toc a[href^="#"]').forEach(link=>{
    link.addEventListener('click',event=>{
      if(scrollBookToHash(link.hash)){
        event.preventDefault();
        history.replaceState(null,'',link.hash);
      }
    });
  });
  if(location.hash){setTimeout(()=>scrollBookToHash(location.hash,'auto'),0)}
  document.addEventListener('keydown',event=>{
    if(event.key==='ArrowRight'){bookMain.scrollBy({left:bookMain.clientWidth,behavior:'smooth'})}
    if(event.key==='ArrowLeft'){bookMain.scrollBy({left:-bookMain.clientWidth,behavior:'smooth'})}
  });
}else if(progress){addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${max?scrollY/max*100:0}%`},{passive:true})}

const favoriteStorageKey='beibei-favorites-v1';
let favorites={};
try{favorites=JSON.parse(localStorage.getItem(favoriteStorageKey)||'{}')||{}}catch(error){favorites={}}
const favoritesModal=document.querySelector('#favorites-modal');
const favoriteCount=document.querySelector('#favorite-count');
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

document.querySelectorAll('.vocab-card').forEach(card=>{
  card.querySelector('.favorite-word').addEventListener('click',event=>{event.stopPropagation();toggleFavorite(card)});
});

function renderFavorites(){
  const list=document.querySelector('#favorites-list');if(!list)return;list.replaceChildren();
  const words=Object.values(favorites).sort((a,b)=>a.term.localeCompare(b.term));
  if(!words.length){const empty=document.createElement('p');empty.className='favorites-empty';empty.textContent='还没有收藏单词。点击词卡右上角的爱心即可加入。';list.append(empty);return}
  words.forEach(word=>{
    const item=document.createElement('article');item.className='favorite-item';
    const main=document.createElement('div');main.className='favorite-item-main';
    const title=document.createElement('h3');title.textContent=word.term;const definition=document.createElement('p');definition.textContent=word.definition;main.append(title,definition);
    const remove=document.createElement('button');remove.className='favorite-remove';remove.type='button';remove.textContent='×';remove.setAttribute('aria-label',`取消收藏 ${word.term}`);
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
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&favoritesModal&&!favoritesModal.hidden){closeFavoritesModal()}});
syncFavoriteButtons();renderFavorites();
