const titles=[
'朋友趣事','一个有特点的新同学','我们的朝花夕拾','我终于战胜了胆怯','难忘的这一天','那一次，我真感动','我成长，我快乐','重拾','有时，我也想勇敢','今天，我多了一份责任','那一股暖流','那段时光，怎能忘记','幸亏有你','手机，让我欢喜让我忧','那声音在我耳边回响','胆小的我也勇敢了一回','那一股暖流','最美的风景','那天，我真惭愧','从那以后，我不再退缩','一句话里的冷暴力','给自己一点掌声','那件小事真不小','妈妈，我明白了','坚持也是一种快乐','你和我很近','童年趣事','藏在角落里的精彩','心里的阳光','礼物','谢谢你，陌生人','感谢有你','一路欢歌','遇见','朴素也美丽','融入','失败也是一种风景','我学会了宽容','假如我和爸爸换个角色','幸福的滋味'];
const cats=['友情','人物','生活','成长','成长','成长','成长','成长','成长','成长','亲情','回忆','陪伴','思辨','人物','成长','温暖','生活','成长','成长','思辨','成长','生活','亲情','成长','关系','童年','生活','成长','生活','温暖','感恩','成长','遇见','人物','成长','成长','成长','想象','成长'];
const routes={
友情:['聚焦一个朋友和一件事，不写人物简历。','初识铺垫 → 矛盾或趣事 → 一个动作改变感受 → 以新理解收束'],
人物:['先确定人物最突出的一个特点，再用事件证明。','特写式亮相 → 典型事件 → 关键细节 → 回扣人物特点'],
生活:['从小处落笔，让普通事物承载不普通的感受。','具体场景 → 细节推进 → 意外发现 → 由物及情'],
成长:['写清“原来的我”和“后来的我”，变化必须由事件推动。','困境 → 尝试 → 最难的一刻 → 行动与变化 → 新认识'],
亲情:['少写抽象的爱，多写一句话、一个动作和一次误解。','日常摩擦 → 关键瞬间 → 看见对方 → 理解与回应'],
回忆:['选择一段可被声音、气味或物件唤醒的记忆。','触景 → 回忆展开 → 细节聚焦 → 回到当下'],
陪伴:['“你”既可指人也可指书或经历，但全文指向要统一。','失落时刻 → “你”出现 → 具体帮助 → 我的改变'],
思辨:['先呈现真实现象，再表达有分寸、有依据的判断。','画面或故事 → 问题显现 → 分析两面 → 提出行动'],
温暖:['让温暖落在陌生而具体的善意上，避免空泛赞美。','冷色处境 → 善意出现 → 细节放大 → 温度延续'],
关系:['以距离变化写关系变化，选择一近一远两个瞬间对照。','曾经的距离 → 事件转折 → 重新靠近 → 理解“远近”'],
童年:['选一件带有误会、意外或反转的童年小事。','天真愿望 → 笨拙行动 → 意外结果 → 笑着回望'],
感恩:['感谢不能停在口号，要写清对方具体改变了什么。','困境 → 陪伴 → 一个难忘细节 → 把感谢化为行动'],
遇见:['把“遇见”写成双向照亮，而不只是一次碰面。','环境定调 → 相遇 → 交流与触动 → 余韵'],
想象:['角色互换后仍须有冲突、行动和认知变化。','愿望成真 → 新鲜体验 → 真正困难 → 理解对方 → 回归']
};
const fallback={
1:`《朋友“糗”事》\n第一次见到阿禾，他正抱着一摞作业本往办公室跑。转角处，他和迎面而来的值日生撞了个满怀，纸张像受惊的白鸽飞了一地。他耳朵一下红了，却先蹲下来问：“你没事吧？”\n我帮他捡纸。他把每一本都拍平，嘴里念着名字，唯独把自己的数学本夹到了最下面。我问为什么，他小声说：“上面有个大红叉，先让它冷静一下。”我忍不住笑，他也笑了。\n后来我才知道，他不是怕丢脸，而是准备订正后再交。午休时，他趴在桌上演算，额前的头发被汗粘成一小绺。那个看起来总会闹“糗事”的男孩，其实认真得很。从那天起，我们成了朋友。每次想起满地飞舞的作业纸，我仍会笑，也会记得他先问出的那句“你没事吧”。`,
2:`《会“停一下”的同桌》\n新同桌说话很快，走路也快，偏偏遇到别人需要帮助时，总会“停一下”。\n体育课后，我的鞋带松了，队伍已经走远。他跑出几步又折回来，蹲下指着鞋带说：“先系好，摔一次比迟到麻烦。”那天放学，雨点突然砸下来，他又在门口停下，把伞往一个没带伞的同学手里一塞，自己顶着书包冲进雨里。\n我原以为他只是急性子，后来才明白：他的快，是不愿浪费时间；他的停，是不愿忽略别人。写人不必列出许多优点，一个反复出现的小动作，就足以让人物站起来。`,
5:`《停电的这一天》\n晚饭刚端上桌，屋里忽然一黑。没有网络，没有电视，我抱怨这一天“什么也做不了”。奶奶却摸出一截蜡烛，火苗一亮，墙上便多了几个摇摇晃晃的影子。\n爸爸讲起小时候在煤油灯下写作业，妈妈把手指弯成小兔，奶奶的“老鹰”在墙上追着它跑。我也加入进去，笑声竟比平日的电视声更响。后来，我们搬来凳子坐到阳台。城市暗下来，星星反而亮了。\n来电时，灯光猛地灌满房间，大家都眯起眼。我却有些舍不得吹灭蜡烛。这一天没有什么大事，却让我第一次发现：当屏幕暗下去，家人的脸会亮起来。`,
6:`《那一次，我真后悔》\n纸团从我手里飞出去，正好落在同桌脚边。老师转身时，我抢先说：“不是我。”同桌愣了一下，没有辩解，只默默把纸团捡起。\n下课后，他把课堂笔记推给我：“你刚才漏抄了一行。”那一刻，我的脸发烫。窗外的风把纸页吹得哗哗响，像一遍遍追问我：为什么把错误推给一个愿意帮助你的人？\n我追到走廊，承认纸团是我扔的，也向他道歉。他笑了笑，只说：“下次别这样。”越轻的一句话，越让我难受。后悔不是在心里责备自己，而是有勇气走回错误发生的地方，把真相说出来。`,
7:`《我成长，我快乐》\n第一次独自参加朗读比赛，我站在幕布后，手心把稿纸洇出一小片潮痕。前一位选手的掌声越响，我越想逃。\n轮到我时，我看见语文老师坐在最后一排，朝我轻轻点头。我深吸一口气，读出第一句。声音起初发颤，读到最喜欢的段落时，却渐渐稳了。灯光落在纸面上，我忽然忘了名次，只想把文字里的感情送到每个人耳边。\n最终我没有获奖，却第一次没有为失败哭。走下台，我把皱巴巴的稿纸折好：成长不是从此不害怕，而是害怕时仍向前一步。这一步很小，却让我由衷快乐。`,
13:`《幸亏有你》\n月考失利后，我把试卷塞进抽屉最深处。那本《老人与海》却从书堆里滑了出来，停在脚边。\n我重新读到老人连续八十四天没有捕到鱼。过去我只记得他与大鱼搏斗，这次却注意到他每天清晨仍把船推向海面。失败没有替他决定第八十五天。\n第二天，我摊开那张不愿再看的试卷，把错题一一写进本子。窗外天还灰着，笔尖却一点点划亮纸面。幸亏有你，一本曾被我匆匆翻过的书，让我明白：真正的勇敢不是一次胜利，而是在没有掌声的时候，仍愿意重新出发。`,
16:`《门外的脚步声》\n一个人在家时，走廊里忽然响起拖沓的脚步。它停在门外，门把手竟轻轻动了一下。我屏住呼吸，脑海里冒出无数可怕的画面。\n我想起爸爸教过的办法，先反锁门，再从猫眼观察，随后给物业打电话。声音发抖，但我把楼层、门牌说得很清楚。几分钟后，物业人员领着一位迷路的老人出现。原来他记错了女儿家的楼层。\n我打开门，把老人送到电梯口。那晚我仍有些后怕，却第一次知道：胆大不是莽撞地冲出去，而是在害怕时还能冷静判断、做正确的事。`,
18:`《最美的风景》\n清晨的菜市场并不“美”：地面湿漉漉的，叫卖声此起彼伏，塑料筐挤满过道。可那天，我在一把青菜旁停住了脚步。\n卖菜的老人正把几片发黄的菜叶摘掉。一位外卖员匆匆跑过，口袋里掉出一卷零钱。老人追了十几米，把钱塞回他手里。外卖员连声道谢，老人只摆摆手：“快去，别误了单。”说完，他又蹲回菜摊，继续整理那把青菜。\n阳光越过棚顶，恰好照亮老人粗糙的手。我忽然觉得，最美的风景不一定在远方。一个人弯腰拾起别人的东西，又把善意轻轻递还，这也是风景。`,
19:`《那天，我真惭愧》\n公交车上，我看见一位老人上车，却假装低头整理书包。座位是我等了很久才抢到的，我对自己说：“别人也可以让。”\n车一晃，老人踉跄了一下，一个比我更小的女孩立刻站起来：“爷爷，您坐。”她扶老人坐下，自己抓着扶手，书包几乎拖到地上。我的脸一下热了。\n到站前，我帮女孩提起书包。她笑着说谢谢，我却更惭愧。那天以后，我才明白，文明并不是等别人先做；当每个人都说“别人也可以”时，真正需要帮助的人只能一直站着。`,
20:`《从那以后，我不再逃避》\n数学卷发下来，鲜红的分数像一扇关紧的门。我把试卷折起来，想用“粗心”解释所有错误。老师没有批评，只圈出三道题：“明天，把思路讲给我听。”\n那晚，我第一次把错题完整重做。不会的地方像一堵墙，我一次次撞上去，又翻书、画图、检查条件。第二天，我讲得并不流畅，却终于说清了最后一步。老师点点头：“你看，问题没有你想的那么可怕。”\n从那以后，我不再把失败藏起来。逃避能让难受暂时消失，却会让问题留在原地；面对它，才有可能从门缝里看见光。`,
21:`我选择第③句“说了你也不懂”发表看法。\n这句话听起来只是嫌父母跟不上潮流，实际上却把沟通的门关上了。父母也许不懂某个游戏、某位偶像，却能听懂我们的委屈和需要。反过来，我们也未必完全理解他们工作的压力，却不能因此停止交流。\n当想说“你不懂”时，不妨把它换成“我慢慢讲给你听”。解释需要耐心，却能减少猜测和误会。亲情不是天然不会破损的玻璃，而是一扇需要双方经常推开的门。少一句冷硬的拒绝，多一次诚恳的说明，家才能真正成为愿意说心里话的地方。`,
22:`《给自己一点掌声》\n八百米测试只剩最后一圈时，我的腿像灌了铅。前面的同学越来越远，我几乎想停下。\n经过看台时，没有人为落在最后的我欢呼。我忽然抬手拍了两下，给自己喊：“再到下一个弯道。”到了弯道，我又把目标换成终点前的白线。就这样，一小段一小段，我终于跑完全程。成绩并不好，我却第一次认真为自己鼓掌。\n掌声不只属于冠军。一个人在无人提醒时仍守住目标，在最想放弃时再坚持十秒，也值得肯定。给自己一点掌声，不是自满，而是把继续前行的力量交还给自己。`,
23:`《那件小事真不小》\n下楼倒垃圾时，我随手把纸箱放在桶边。清洁工弯腰拆开它，里面没倒净的牛奶流出来，沾湿了她的手套。她没说什么，只用纸一点点擦干。\n我站在几步外，忽然不敢走近。回家后，我把剩下的快递盒拆平、捆好，又拿了一副新手套下楼。她接过去笑着说：“这样放，车能多装不少。”\n不过是把纸箱压平，不过是先倒净残液，动作小得几乎没人注意。可城市的整洁，正由无数这样的小动作托住。那件小事真不小，因为它让我看见：方便自己之前，还应想一想接手的人。`,
24:`《妈妈，我明白了》\n出门前，妈妈又把围巾塞进我书包。我嫌她唠叨，转身就把围巾放在玄关。下午风突然变冷，我缩着脖子等车，才发现围巾静静躺在书包最外层——妈妈大概在我系鞋带时又放了回来。\n那条围巾并不好看，边角还有她补过的线头。我把它绕在颈间，闻到淡淡的洗衣香。回家时，妈妈只问：“今天冷不冷？”我没有像往常那样说“知道了”，而是替她接过菜袋。\n妈妈，我终于明白了：有些爱不会说漂亮的话，它总是多带一把伞、多塞一件衣服，在我们不耐烦地走远后，仍替我们挡住风。`,
25:`《坚持也是一种快乐》\n学吉他的第三周，指尖磨出红印，和弦仍像一团乱线。我几次把琴推回墙角。\n周末清晨，我试着把整首曲子拆成四小节。第一遍有杂音，第二遍慢一些，第三遍终于连了起来。窗外的鸟叫恰好落在最后一个音上，我忍不住又弹了一遍。没有观众，也没有奖状，只有手指的疼和一点点变清楚的旋律。\n原来快乐不只在成功宣布的那一刻。看见昨天还做不到的事，今天因为没有放弃而向前挪了一寸，这种安静的变化，也是一种踏实而长久的快乐。`,
26:`《你和我很近》\n爷爷住在乡下，我们隔着几百公里。视频时，他总把镜头对着额头，我常说两句便借口写作业。\n一次劳动课要求学做家常菜，我打电话问他炒土豆丝。爷爷把手机架在盐罐旁，从切丝到控水讲了三遍。我切得粗细不一，他在屏幕那头笑：“没事，慢一点。”锅里冒出热气时，他的脸也被雾蒙住。\n菜端上桌，我忽然觉得厨房里有他熟悉的声音。距离并不只由地图决定。愿意认真听完一句话，愿意一起做一件小事，远方的人也会走得很近。`,
27:`《童年趣事》\n六岁那年，我听奶奶说种瓜得瓜，便偷偷把一颗水果糖埋进花盆，每天浇水，等它长出“糖果树”。\n一周过去，土里毫无动静。我急得扒开泥土，糖已经化成黏糊糊的一团，几只蚂蚁正忙着搬家。我哭着找奶奶评理。她没有笑我，只递来三粒凤仙花种子：“这次种真的。”\n后来，花盆里果然钻出嫩芽。凤仙花开时，我早已忘了那颗糖，却记得自己每天蹲在盆边观察的认真。童年就是这样：把一个天真的念头当成大事，又在一次小小的等待里，偷偷懂得世界的规则。`,
38:`《我学会了宽容》\n同桌借走我的新钢笔，归还时笔尖已经弯了。我攥着笔，认定他不珍惜，整整一天没和他说话。\n放学后，我看见他在文具店门口数硬币。他把一支同款钢笔递给我，小声说，上午有人撞到他，笔掉在地上，他不敢解释，怕我更生气。硬币还差两元，我忽然想起自己连开口的机会都没给他。\n我们没有买新笔，而是一起请店员修好旧笔。笔尖重新划过纸面，留下的线有一点细，却很顺。那天我学会了，宽容不是假装没有受伤，而是在下结论前，愿意听完另一个人的故事。`
};

const escapeHtml=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const list=document.querySelector('#question-list');
const nav=document.querySelector('#question-nav');
const filters=document.querySelector('#filters');
const search=document.querySelector('#search');
const resultCount=document.querySelector('#result-count');
let active='全部';

function cleanExample(text,id){
  const source=(text||'').split(/\n例文二|\n例文2/)[0].trim();
  return source || fallback[id] || '示例正在整理中。';
}
function render(records){
  list.innerHTML=''; nav.innerHTML='';
  records.forEach((record,index)=>{
    const id=index+1,cat=cats[index],route=routes[cat]||routes.成长;
    const example=cleanExample(record.example,id);
    const article=document.createElement('article');
    article.className='question-card';article.id=`q${id}`;article.dataset.category=cat;
    article.dataset.search=`${titles[index]} ${cat} ${record.prompt} ${example}`.toLowerCase();
    article.innerHTML=`<div class="card-kicker"><span class="number">${String(id).padStart(2,'0')}</span><span class="category">${escapeHtml(cat)} / 写作训练</span></div><h2>${escapeHtml(titles[index])}</h2><div class="prompt-sheet"><p class="prompt-text">${escapeHtml(record.prompt)}</p></div><div class="analysis-grid"><div class="analysis-card"><span>01 / 审题抓手</span><h3>先抓住什么？</h3><p>${escapeHtml(route[0])}</p></div><div class="analysis-card"><span>02 / 写作路线</span><h3>怎样展开？</h3><p>${escapeHtml(route[1])}</p></div></div><div class="example"><button class="example-toggle" type="button" aria-expanded="false" aria-controls="example-${id}"><strong>高分写作示例</strong><span>参考 · 不照抄 <i>＋</i></span></button><div class="example-body" id="example-${id}" hidden><p class="example-note">借鉴它的选材、结构和细节；把人物与事件替换成你真实经历过的内容。</p><p class="model">${escapeHtml(example)}</p><div class="example-foot"><div class="tags"><span>扣题</span><span>细节</span><span>真情</span></div><button class="copy" type="button">复制示例</button></div></div></div>`;
    list.append(article);nav.insertAdjacentHTML('beforeend',`<a href="#q${id}" aria-label="第${id}题">${String(id).padStart(2,'0')}</a>`);
  });
  [...new Set(['全部',...cats])].forEach((cat,index)=>filters.insertAdjacentHTML('beforeend',`<button type="button" class="filter${index===0?' active':''}" data-category="${cat}">${cat}</button>`));
  observeCards();applyFilters();
}
function applyFilters(){
  const query=search.value.trim().toLowerCase();let visible=0;
  document.querySelectorAll('.question-card').forEach(card=>{const show=(active==='全部'||card.dataset.category===active)&&(!query||card.dataset.search.includes(query));card.hidden=!show;if(show)visible++});
  resultCount.textContent=`${visible} / 40 题`;document.querySelector('.empty')?.remove();
  if(!visible)list.insertAdjacentHTML('beforeend','<p class="empty">没有找到相关题目，换个关键词试试。</p>');
}
function observeCards(){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)nav.querySelectorAll('a').forEach(link=>link.classList.toggle('active',link.hash===`#${entry.target.id}`))}),{rootMargin:'-25% 0px -65%'});
  document.querySelectorAll('.question-card').forEach(card=>observer.observe(card));
}
filters.addEventListener('click',event=>{const button=event.target.closest('.filter');if(!button)return;active=button.dataset.category;filters.querySelectorAll('.filter').forEach(item=>item.classList.toggle('active',item===button));applyFilters()});
search.addEventListener('input',applyFilters);
list.addEventListener('click',async event=>{
  const toggle=event.target.closest('.example-toggle');if(toggle){const body=document.getElementById(toggle.getAttribute('aria-controls'));const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));body.hidden=open}
  const button=event.target.closest('.copy');if(button){const text=button.closest('.example-body').querySelector('.model').textContent;try{await navigator.clipboard.writeText(text);button.textContent='已复制 ✓';setTimeout(()=>button.textContent='复制示例',1400)}catch{button.textContent='请手动复制'}}
});
addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;document.querySelector('#read-progress').style.width=`${max?scrollY/max*100:0}%`},{passive:true});
fetch('questions.json').then(response=>{if(!response.ok)throw new Error('题库加载失败');return response.json()}).then(render).catch(error=>{list.innerHTML=`<p class="empty">${escapeHtml(error.message)}，请刷新页面重试。</p>`});
