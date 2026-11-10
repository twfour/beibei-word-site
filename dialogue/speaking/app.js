const scenes=[
  {no:'01',key:'calm',title:'释放心理',subtitle:'先把紧张降到可用范围',question:'一站起来就脑子空白，怎么办？',formula:'降低需求 + 提高把握',steps:['接受适度紧张','写出发言思路','记住关键提纲','开口练到自然'],tools:['开场法','呼吸法','转移法','物理控制法'],avoid:'把紧张等同于能力差，或期待自己彻底不紧张。',accent:'CONTROL'},
  {no:'02',key:'meeting',title:'会议发言',subtitle:'短时间讲清观点与依据',question:'轮到我发言，怎样不散、不跑题？',formula:'铺 + 观 + 问 + 论 + 总',steps:['礼貌铺垫','亮出观点','主动设问','分点论证','回扣总结'],tools:['黄金三点论','临时发言应急','主持开场五字诀','主持收尾四字诀'],avoid:'背景讲了很久，听众仍不知道你的结论。',accent:'MEETING'},
  {no:'03',key:'pitch',title:'竞聘演说',subtitle:'让评委相信你与岗位匹配',question:'竞聘演讲怎样既完整又能脱稿？',formula:'为什么 + 凭什么 + 干什么',steps:['讲岗位认识','讲匹配优势','讲行动方案','拉票与表态'],tools:['开场—主体—结尾','三一二法则','目光交流','语速与节奏'],avoid:'只罗列履历，不解释这些经历为何适合目标岗位。',accent:'PITCH'},
  {no:'04',key:'report',title:'汇报工作',subtitle:'先说结论，再给事实与建议',question:'领导时间有限，汇报怎样直奔重点？',formula:'观点 + 事实 + 建议',steps:['满足时间预期','结论放在前面','数据细节支撑','给出可行建议','请示并确认'],tools:['日常性汇报','传达性汇报','阶段性汇报','总结性汇报','突发性汇报'],avoid:'把过程从头讲到尾，却没有明确判断和下一步。',accent:'REPORT'},
  {no:'05',key:'table',title:'餐桌礼仪',subtitle:'表达诚意，也照顾全场节奏',question:'祝酒、敬酒和接待怎样不空泛？',formula:'场 + 益 + 举 + 祝 + 干',steps:['点明场合','说明意义','举杯表达','送出祝愿','干杯收束'],tools:['临时应酬：高+谢+祝','感谢式：谢+心+祝','赞美式：赞+心+祝','表态式：表+心+祝'],avoid:'只说“都在酒里”，或用劝酒代替真诚表达。',accent:'TABLE'},
  {no:'06',key:'review',title:'述职报告',subtitle:'把工作盘清楚、讲明白',question:'怎样避免述职变成流水账？',formula:'梳理罗列 → 分门别类 → 概括提炼',steps:['盘点事实','归纳主题','搭建框架','突出重点','一分为二'],tools:['三个结合','五大模板','三么结构法','推功揽过'],avoid:'事无巨细全部罗列，成绩没有重点，问题没有分析。',accent:'REVIEW'},
  {no:'07',key:'social',title:'日常交际',subtitle:'让介绍、聊天与线上沟通更得体',question:'怎样让人记住你，也愿意继续聊？',formula:'观察 → 连接 → 展开',steps:['找到价值连接','展示个人特质','从细节切入','用开放问题延伸'],tools:['二三一自我介绍','发现+赞美+请教','同意+重复+解释','提问+发现+提问'],avoid:'只顾自己说，或连续抛封闭问题让聊天像审问。',accent:'SOCIAL'}
];

const grid=document.querySelector('#scene-grid');
const tabs=document.querySelector('#formula-tabs');
const detail=document.querySelector('#formula-detail');

grid.innerHTML=scenes.map(scene=>`<article class="scene-card" data-scene="${scene.key}"><div><span>${scene.no}</span><small>${scene.accent}</small></div><h3>${scene.title}</h3><p>${scene.subtitle}</p><div class="scene-actions"><button type="button">打开方法 ↘</button>${scene.key==='meeting'?'<a href="/dialogue/speaking/meeting/">完整章节 ↗</a>':scene.key==='report'?'<a href="/dialogue/speaking/report/">完整章节 ↗</a>':scene.key==='social'?'<a href="/dialogue/speaking/social/">完整章节 ↗</a>':scene.key==='pitch'?'<a href="/dialogue/speaking/pitch/">完整章节 ↗</a>':scene.key==='review'?'<a href="/dialogue/speaking/review/">完整章节 ↗</a>':scene.key==='calm'?'<a href="/dialogue/speaking/calm/">完整章节 ↗</a>':scene.key==='table'?'<a href="/dialogue/speaking/table/">完整章节 ↗</a>':''}</div></article>`).join('');
tabs.innerHTML=scenes.map((scene,index)=>`<button type="button" data-formula="${scene.key}" class="${index===0?'active':''}"><span>${scene.no}</span>${scene.title}</button>`).join('');

function renderFormula(key){
  const scene=scenes.find(item=>item.key===key);
  detail.innerHTML=`<div class="detail-head"><span>${scene.no} / ${scene.accent}</span><h3>${scene.question}</h3></div><div class="formula-line">${scene.formula.split(/\s*\+\s*|\s*→\s*/).map((part,index)=>`<b>${part}</b>${index<scene.formula.split(/\s*\+\s*|\s*→\s*/).length-1?'<i>→</i>':''}`).join('')}</div><ol>${scene.steps.map((step,index)=>`<li><span>${String(index+1).padStart(2,'0')}</span>${step}</li>`).join('')}</ol><div class="toolbox"><div><small>TOOLS / 本章工具</small><p>${scene.tools.join(' · ')}</p></div><div><small>AVOID / 常见误区</small><p>${scene.avoid}</p></div></div>`;
}

tabs.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{tabs.querySelector('.active').classList.remove('active');button.classList.add('active');renderFormula(button.dataset.formula)}));
grid.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{const key=button.closest('.scene-card').dataset.scene;const target=tabs.querySelector(`[data-formula="${key}"]`);target.click();document.querySelector('#formula').scrollIntoView({behavior:'smooth',block:'start'})}));
renderFormula('calm');
