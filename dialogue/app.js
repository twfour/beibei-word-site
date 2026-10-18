let dialogues=[];
let studentDialogues=[];
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
const toastSceneIds=new Set(Array.from({length:87},(_,index)=>index+316));
const newYearIds=new Set(Array.from({length:55},(_,index)=>index+403));
const toastScenes=[
  {no:1,title:'敬长辈',ids:[316,317,318,319,320,321,322]},
  {no:2,title:'敬领导',ids:Array.from({length:42},(_,index)=>index+323)},
  {no:3,title:'敬同事',ids:Array.from({length:9},(_,index)=>index+365)},
  {no:4,title:'敬同学',ids:[374,375],extra:['李帅，你真的太优秀了，真的羡慕你娶了我们的女神。祝贺你，祝你们永远幸福。','老李，我听说你现在从事互联网工作，这真的很好。希望你的工作越来越顺利，来，干杯。']},
  {no:5,title:'敬朋友',ids:[376,377,378,379,380]},
  {no:6,title:'敬别家领导',ids:[381,382,383]},
  {no:7,title:'敬客户',ids:[384,385,386,387,388]},
  {no:8,title:'敬贵宾',ids:[389,390,391,392]},
  {no:9,title:'敬下属',ids:[393,394]},
  {no:10,title:'参加生日宴',extra:['祝你生日快乐，祝你每天都像今天一样开心幸福。']},
  {no:11,title:'乔迁之喜',extra:['祝您乔迁新居，新的环境必能让你们的生活焕然一新，欣欣向荣，好运连连。为了表示祝贺，我敬你一杯。']},
  {no:12,title:'过年家族聚会',ids:[395],extra:['下面，我先代表我和我的家人敬大家一杯！新的一年，祝长辈们身体健康、事事顺心，祝兄弟姐妹们财源滚滚、节节高升，祝小朋友们学业进步。让我们一起干杯！']}
];
const moreToastScenes=[
  {no:13,title:'朋友婚礼',ids:[396,397,398,399,400]},
  {no:14,title:'第一次去女方家',extra:['叔叔、阿姨好，今天来之前我内心特别忐忑、紧张。见到你们之后，你们特别和蔼可亲，我也松了一口气。感谢你们培养了如此优秀的女儿，也感谢你们同意我们交往。我会好好照顾她，也会孝敬双方老人。这杯酒祝叔叔、阿姨身体健康、万事如意！']},
  {no:15,title:'向全体敬酒',ids:[401,402]},
  {no:16,title:'升学宴',extra:['今天非常高兴，不只因为拿到了理想大学的通知书，更重要的是有家人和朋友与我一起分享这份快乐。我的成绩离不开大家的鼓励和支持，这杯我敬大家。']},
  {no:17,title:'别人敬酒托你办事',extra:['你放心，这件事情我一定全力以赴。我看这事对你也非常重要，建议你多找几个人问一问。我这边一定会尽力，但万一没办成，你也不要怪我。']}
];
const newYearGroups=[
  {key:'classic',label:'古典雅句',description:'适合贺卡、朋友圈和正式场合，短而有余韵。',ids:[403,404,405,406,407,408,409,410,411,412,425,426,427,428,429,430,431,439,440,441,442,443,444,445,446,447,448,449,450,451]},
  {key:'warm',label:'亲友温暖',description:'适合家人、朋友和在意的人，语气温柔、不生硬。',ids:[418,419,420,421,422,423,424,433,434,435,436,437,438]},
  {key:'playful',label:'轻松俏皮',description:'适合熟人和年轻朋友，有年味，也有一点幽默。',ids:[413,432]},
  {key:'leader',label:'给领导拜年',description:'既有可直接使用的领导祝福文案，也包含发不发、用短信还是微信、如何开头和署名等写法规则。',ids:[414,415,416,417,452,453,454,455,456,457]}
];
const methodGroups=[
  {key:'receive',title:'接住对方',description:'先承认事实、情绪或善意，让对方感到被听见。',pattern:/接住|接受|承认感受|确认事实/},
  {key:'respect',title:'尊重再表达',description:'先顾及身份和场面，再说感谢、祝愿或自己的意见。',pattern:/尊重|祝愿|顾及场面|顾及合作/},
  {key:'humor',title:'幽默转向',description:'用自嘲、轻松回应或重新定义，把对抗转成连接。',pattern:/幽默|轻松|转向|自嘲/},
  {key:'boundary',title:'留好余地',description:'说明限制、提供替代，也给双方保留体面和边界。',pattern:/退路|替代|限制|立场|边界/},
  {key:'action',title:'给出行动',description:'少做空泛解释，用解决方案、完成时间和后续动作回应。',pattern:/行动|方案|解决|完成时间|明确行动/},
  {key:'structure',title:'结构化表达',description:'先讲核心观点，再用事实、结果或清晰层次支撑。',pattern:/结构化|核心观点|事实|结果|聚焦/}
];
const studentGroups=[
  {key:'school',label:'在校日常',description:'课堂、值日、小组合作和校园公共空间中的清楚表达。'},
  {key:'teacher',label:'对老师',description:'提问、说明情况、接受批评，也能礼貌表达不同意见。'},
  {key:'classmate',label:'对同学',description:'交朋友、处理误会、拒绝不合理请求，并守住自己的边界。'},
  {key:'family',label:'在家沟通',description:'围绕学习、手机、兴趣和隐私，与家人进行可解决问题的沟通。'},
  {key:'public',label:'社会交往',description:'问路、乘车、购物和公共场所中的基本礼貌与规则意识。'},
  {key:'stranger',label:'陌生人安全',description:'不泄露隐私、不跟随、不勉强配合；危险时大声拒绝并立即求助。'}
];
let activeNewYearGroup='classic';
let activeStudentGroup='school';
let currentPracticeId=null;
let practiceContext=null;

const escapeHtml=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));
const compactOcrPlain=value=>String(value??'').split(/\n{2,}/).map(paragraph=>paragraph.replace(/[ \t]*\n[ \t]*/g,'')).join('\n\n');
const compactOcrText=value=>compactOcrPlain(value).split(/\n{2,}/).map(escapeHtml).join('<br><br>');
const isMissing=item=>item.answer.startsWith('本条 OCR 暂未识别');
const isFeature=item=>item.answer.length>180||item.question.length>110;
const stepPattern=/^第([一二三四五六七八九十]+)步[，,：:]?/;

function answerTemplate(answer){
  const blocks=String(answer).split(/\n{2,}/).map(block=>block.trim()).filter(Boolean);
  const steps=blocks.filter(block=>stepPattern.test(block));
  if(steps.length<2)return `<p>${compactOcrText(answer)}</p>`;
  const intro=blocks.filter(block=>!stepPattern.test(block));
  return `<div class="answer-copy answer-copy-steps">
    ${intro.map(block=>`<p class="answer-intro">${compactOcrText(block)}</p>`).join('')}
    <ol class="answer-steps">${steps.map((block,index)=>`<li><b>${String(index+1).padStart(2,'0')}</b><p>${compactOcrText(block.replace(stepPattern,'').trim())}</p></li>`).join('')}</ol>
  </div>`;
}

function cardTemplate(item){
  const status=item.reviewStatus==='reviewed'?'已校正':item.contentType==='excerpt'?'原书示例':isMissing(item)?'回答缺失':'OCR 精修';
  const hasSteps=String(item.answer).split(/\n{2,}/).filter(block=>stepPattern.test(block.trim())).length>=2;
  const cardType=`${isFeature(item)?'feature-card':''} ${item.category==='method'?'method-card':''} ${hasSteps?'step-card':''}`.trim();
  return `<article class="dialogue-card ${cardType}" data-id="${item.id}">
    <div class="dialogue-top"><span><i class="scene-no">${String(item.id).padStart(3,'0')}</i> / ${escapeHtml(item.label)} <em class="status-badge status-${item.contentType==='excerpt'?'excerpt':isMissing(item)?'missing':item.reviewStatus}">${status}</em></span><button class="save" type="button" aria-label="收藏这句话" aria-pressed="${saved.has(item.id)}">${saved.has(item.id)?'♥':'♡'}</button></div>
    ${isFeature(item)?`<span class="feature-kicker">${hasSteps?'GUIDE / 分步方法':'FEATURE / 专题方法'}</span>`:''}
    <p class="question">${escapeHtml(item.question)}</p>
    <button class="reveal-answer" type="button" aria-expanded="false">${isFeature(item)?'阅读全文':'怎么接？'} ↓</button>
    <div class="answer-panel" hidden>${answerTemplate(item.answer)}<small>${escapeHtml(item.formula)}</small></div>
  </article>`;
}

function filteredItems(){
  const query=search.value.trim().toLowerCase();
  return dialogues.filter(item=>{
    if(!query&&(toastSceneIds.has(item.id)||newYearIds.has(item.id)))return false;
    const categoryMatch=activeFilter==='all'||item.category===activeFilter;
    const statusMatch=activeStatus==='all'||(activeStatus==='reviewed'&&item.reviewStatus==='reviewed')||(activeStatus==='complete'&&!isMissing(item))||(activeStatus==='excerpt'&&item.contentType==='excerpt');
    const searchMatch=!query||`${item.label}${item.question}${item.answer}`.toLowerCase().includes(query);
    return categoryMatch&&statusMatch&&searchMatch;
  });
}

function toastLines(scene){
  const fromLibrary=(scene.ids||[]).map(id=>dialogues.find(item=>item.id===id)).filter(Boolean).map(item=>item.answer);
  return [...fromLibrary,...(scene.extra||[])];
}
function toastSceneTemplate(scene,compact=false){
  const lines=toastLines(scene);
  return `<details class="toast-scene ${compact?'toast-scene-compact':''}"><summary><span>${String(scene.no).padStart(2,'0')}</span><div><small>SCENE ${String(scene.no).padStart(2,'0')}</small><h3>${escapeHtml(scene.title)}</h3><p>${lines.length} 条参考话术</p></div><i aria-hidden="true">+</i></summary><ol>${lines.map(line=>`<li>${compactOcrText(line)}</li>`).join('')}</ol></details>`;
}
function renderToastGuide(){
  document.querySelector('#toast-scene-grid').innerHTML=toastScenes.map(scene=>toastSceneTemplate(scene)).join('');
  document.querySelector('#toast-more-list').innerHTML=moreToastScenes.map(scene=>toastSceneTemplate(scene,true)).join('');
}
function renderNewYearGuide(){
  const tabs=document.querySelector('#new-year-tabs');
  tabs.innerHTML=newYearGroups.map((group,index)=>`<button type="button" data-new-year-group="${group.key}" class="${group.key===activeNewYearGroup?'active':''}"><span>${String(index+1).padStart(2,'0')}</span>${group.label}</button>`).join('');
  const group=newYearGroups.find(item=>item.key===activeNewYearGroup);
  const items=group.ids.map(id=>dialogues.find(item=>item.id===id)).filter(Boolean);
  document.querySelector('#new-year-description').textContent=group.description;
  document.querySelector('#new-year-count').textContent=`${items.length} 条`;
  document.querySelector('#blessing-grid').innerHTML=items.map((item,index)=>`<article class="blessing-card"><div><span>${String(index+1).padStart(2,'0')}</span><small>${escapeHtml(group.label)}</small></div><p>${compactOcrText(item.answer)}</p><button type="button" data-copy-blessing="${item.id}">复制这句 <i>↗</i></button></article>`).join('');
  tabs.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{activeNewYearGroup=button.dataset.newYearGroup;renderNewYearGuide()}));
  document.querySelectorAll('[data-copy-blessing]').forEach(button=>button.addEventListener('click',async()=>{const item=dialogues.find(entry=>entry.id===Number(button.dataset.copyBlessing));try{await navigator.clipboard.writeText(compactOcrPlain(item.answer));button.textContent='已复制 ✓'}catch{button.textContent='请长按文字复制'}}));
}

function renderStudentGuide(){
  const tabs=document.querySelector('#student-tabs');
  tabs.innerHTML=studentGroups.map((group,index)=>`<button type="button" data-student-group="${group.key}" class="${group.key===activeStudentGroup?'active':''}"><span>${String(index+1).padStart(2,'0')}</span>${group.label}</button>`).join('');
  const group=studentGroups.find(item=>item.key===activeStudentGroup);
  const items=studentDialogues.filter(item=>item.group===activeStudentGroup);
  document.querySelector('#student-description').textContent=group.description;
  document.querySelector('#student-count').textContent=`${items.length} 个场景`;
  document.querySelector('#student-grid').innerHTML=items.map(item=>`<details class="student-card"><summary><span>${item.id}</span><h3>${escapeHtml(item.scene)}</h3><i aria-hidden="true">+</i></summary><div class="student-answer">${item.safety?'<span class="student-safety">SAFETY FIRST / 安全优先</span>':''}<strong>“${escapeHtml(item.say)}”</strong><div class="student-detail"><p><b>为什么这样说</b>${escapeHtml(item.point)}</p><p class="avoid"><b>尽量别这样说</b>${escapeHtml(item.avoid)}</p></div><div class="student-actions"><button type="button" data-student-practice="${item.id}">拿这题练习 ↘</button></div></div></details>`).join('');
  tabs.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{activeStudentGroup=button.dataset.studentGroup;renderStudentGuide()}));
  document.querySelectorAll('[data-student-practice]').forEach(button=>button.addEventListener('click',()=>{const selected=studentDialogues.find(item=>item.id===button.dataset.studentPractice);practiceContext={kind:'student',group:selected.group,first:selected};showNextPractice();document.querySelector('#practice').scrollIntoView({behavior:'smooth',block:'start'})}));
}

function practicePool(group=null){
  return dialogues.filter(item=>!isMissing(item)&&item.question&&item.answer&&item.question.length<130&&item.answer.length<520&&(!group||group.pattern.test(item.formula||'')));
}
function showNextPractice(){
  const context=practiceContext||{kind:'adult',group:null};
  const pool=context.kind==='student'?studentDialogues.filter(item=>item.group===context.group):practicePool(context.group);
  if(!pool.length)return;
  const choices=pool.filter(item=>item.id!==currentPracticeId);
  const item=context.first||(choices.length?choices:pool)[Math.floor(Math.random()*(choices.length||pool.length))];
  context.first=null;practiceContext=context;
  currentPracticeId=item.id;
  const isStudent=context.kind==='student';
  document.querySelector('#practice-number').textContent=`SCENARIO ${isStudent?item.id:String(item.id).padStart(3,'0')}`;
  document.querySelector('#practice-label').textContent=isStudent?studentGroups.find(group=>group.key===item.group).label:(context.group?.title||item.label);
  document.querySelector('#practice-question').textContent=isStudent?item.scene:item.question;
  document.querySelector('#practice-answer').innerHTML=compactOcrText(isStudent?item.say:item.answer);
  document.querySelector('#practice-formula').textContent=isStudent?item.point:(item.formula||'先理解场景，再选择合适表达');
  document.querySelector('#practice-input').value='';
  document.querySelector('#reference').hidden=true;
  document.querySelector('#reveal').textContent='看参考表达';
  document.querySelector('#practice-hint').textContent=isStudent?'中学生场景 · 先说出自己的版本':context.group?`正在练习：${context.group.title}`:'先想 30 秒，再看参考';
}
function renderMethodGuide(){
  document.querySelector('#method-list').innerHTML=methodGroups.map((group,index)=>{
    const count=dialogues.filter(item=>group.pattern.test(item.formula||'')).length;
    return `<article class="method-card"><span>${String(index+1).padStart(2,'0')} / ${count} 条相关内容</span><h3>${group.title}</h3><p>${group.description}</p><button type="button" data-practice-method="${group.key}">练这类场景 ↘</button></article>`;
  }).join('');
  document.querySelectorAll('[data-practice-method]').forEach(button=>button.addEventListener('click',()=>{const group=methodGroups.find(item=>item.key===button.dataset.practiceMethod);practiceContext={kind:'adult',group};showNextPractice();document.querySelector('#practice').scrollIntoView({behavior:'smooth',block:'start'})}));
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
document.querySelector('#saved-button').addEventListener('click',()=>{const items=dialogues.filter(item=>saved.has(item.id));document.querySelector('#saved-list').innerHTML=items.length?items.map(item=>`<div class="saved-item"><strong>${escapeHtml(item.question)}</strong><p>${compactOcrText(item.answer)}</p></div>`).join(''):'<p class="saved-empty">还没有收藏。点击话术卡片右上角的 ♡ 即可加入。</p>';savedDialog.showModal()});
document.querySelector('.dialog-close').addEventListener('click',()=>savedDialog.close());
document.querySelector('#reveal').addEventListener('click',event=>{const reference=document.querySelector('#reference');reference.hidden=!reference.hidden;event.currentTarget.textContent=reference.hidden?'看参考表达':'收起参考表达'});
document.querySelector('#practice-next').addEventListener('click',showNextPractice);
document.querySelector('#random-pick').addEventListener('click',()=>{const pool=filteredItems();if(!pool.length)return;const item=pool[Math.floor(Math.random()*pool.length)];visibleLimit=Math.max(PAGE_SIZE,pool.indexOf(item)+1);render();const target=document.querySelector(`[data-id="${item.id}"]`);target?.scrollIntoView({behavior:'smooth',block:'center'});setTimeout(()=>target?.querySelector('.reveal-answer').focus(),500)});

async function init(){
  try{const [response,studentResponse]=await Promise.all([fetch('/dialogue/data/dialogues-full.json'),fetch('/dialogue/data/student-dialogues.json')]);if(!response.ok||!studentResponse.ok)throw new Error(`HTTP ${response.status}/${studentResponse.status}`);const [data,studentData]=await Promise.all([response.json(),studentResponse.json()]);dialogues=data.items;studentDialogues=studentData.items;document.querySelector('#library-count').textContent=data.total_count;document.querySelector('#filter-total').textContent=data.total_count;renderToastGuide();renderNewYearGuide();renderStudentGuide();renderMethodGuide();practiceContext={kind:'student',group:'school'};showNextPractice();render()}
  catch(error){grid.innerHTML='<p class="empty">内容库暂时无法加载，请稍后刷新。</p>';console.error(error)}
}
init();
