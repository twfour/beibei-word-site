const stations = [
  {
    id: 1, slug: 'ruijin', name: '瑞金', title: '瑞金<br>出发', date: '1934年10月', place: '江西瑞金', spirit: '坚定理想', seal: '启程', position: ['20%', '88%'],
    facts: [['时间','1934.10'],['地点','瑞金、于都等地'],['主题','战略转移']],
    background: '第五次反“围剿”失败后，中央苏区的形势日益严峻。为了保存革命力量，中共中央和中革军委决定率中央红军主力撤离中央苏区，实行战略转移。',
    archive: '1934年10月中旬，中共中央、中革军委率中央红军主力从江西瑞金、于都等地陆续出发。部队渡过于都河，告别生活和战斗多年的中央苏区，踏上漫长征途。出发时，没有人能够预知这次转移将走多远，但共同的理想把队伍凝聚在一起。长征由此拉开序幕。',
    explain: '长征不是一次轻松的旅行，而是在危急情况下作出的艰难选择。离开熟悉的根据地，是为了保存力量、寻找新的道路。真正的坚定，不是看不到困难，而是清楚困难存在，仍然愿意为共同目标行动。',
    think: '当一个长期目标遇到困难时，什么能够帮助你继续坚持？',
    chainTitle: '一次艰难出发<br>为什么仍要坚持？',
    chain: [['背景','革命根据地面临严峻形势'],['困难','原有道路难以继续'],['选择','进行战略转移'],['行动','中央红军踏上征途'],['结果','开启两万五千里长征']],
    keywords: [
      ['坚定理想','认准值得追求的目标，即使面对困难，也不轻易放弃。','为长期目标制定计划，每天坚持完成一小步。'],
      ['责任担当','在集体需要时，主动承担属于自己的责任。','小组合作中不逃避任务，认真完成自己的部分。']
    ],
    sources: [
      ['中共中央党史和文献研究院：《10月10日·党史百年天天读》','https://www.dswxyjy.org.cn/GB/434461/434471/434552/index.html'],
      ['人民网党史频道：《长征记》','https://dangshi.people.com.cn/GB/146570/406330/index.html']
    ],
    task: {type:'pack', title:'轻装出发：整理行军背包', copy:'背包只能装下3件物品。请选择最有助于基本行军与救护的物资。', items:['粮食','急救药品','雨具','瓷器摆件','留声机','厚重相册'], answer:['粮食','急救药品','雨具']}
  },
  {
    id: 2, slug: 'zunyi', name: '遵义', title: '遵义<br>会议', date: '1935年1月', place: '贵州遵义', spirit: '实事求是', seal: '转折', position: ['28%', '64%'],
    facts: [['时间','1935.01.15—17'],['地点','贵州遵义'],['主题','生死攸关的转折']],
    background: '长征初期，中央红军在突破封锁线和湘江战役中遭受重大损失。队伍面对前有堵截、后有追兵的危急局面，迫切需要总结此前军事指挥中的经验教训。',
    archive: '1935年1月15日至17日，中共中央政治局在遵义召开扩大会议。会议集中讨论当时最紧迫的军事和组织问题，纠正错误的军事领导，开始形成以毛泽东同志为核心的党的第一代中央领导集体。遵义会议在极其危急的关头挽救了党、挽救了红军、挽救了中国革命，是党的历史上一个生死攸关的转折点。',
    explain: '会议没有回避失败，也没有把错误简单推给别人，而是认真分析实际情况、总结经验并调整方向。它告诉我们：坚持正确目标，不等于固守错误方法；能够发现问题并勇于纠正，同样需要勇气。',
    think: '当原来的学习方法效果不好时，你会继续照旧，还是分析原因并调整？',
    chainTitle: '一次重要转折<br>是怎样发生的？',
    chain: [['背景','第五次反“围剿”失利'],['困难','长征初期损失严重'],['选择','召开会议，总结经验'],['改变','调整军事领导和方向'],['结果','中国革命实现重要转折']],
    keywords: [
      ['实事求是','从实际情况出发，发现问题、分析问题，并勇于调整不合适的方法。','做题连续出错时，先查找原因，再改变学习方法。'],
      ['独立自主','立足自己的实际情况，依靠自身力量作出判断、解决问题。','听取建议，也要经过自己的思考再作决定。']
    ],
    sources: [
      ['国防部：《遵义1935：早到的春天》','https://www.mod.gov.cn/gfbw/gfjy_index/js_214151/16364674.html'],
      ['财政部河南监管局：《遵义会议的伟大意义和深刻启示》','https://ha.mof.gov.cn/zt/djzc/djzl/201505/t20150513_1231207.htm']
    ],
    task: {type:'choice', title:'面对失误，怎样作出选择？', copy:'原来的行动方案已经造成较大损失。哪种做法最符合遵义会议体现的方法？', options:['为了面子继续原方案','分析实际情况并及时调整','等待别人替自己决定'], correct:1, explain:'尊重事实、总结经验并及时调整，体现了实事求是。'}
  },
  {
    id: 3, slug: 'chishui', name: '赤水', title: '四渡<br>赤水', date: '1935年1月至3月', place: '川黔滇边境', spirit: '机智勇敢', seal: '巧渡', position: ['53%', '48%'],
    facts: [['时间','1935.01—03'],['区域','川黔滇边境'],['特点','高度机动']],
    background: '遵义会议后，国民党军队从多个方向向中央红军逼近。红军兵力处于劣势，不能与敌军进行简单的正面硬拼，必须在运动中寻找机会。',
    archive: '1935年1月至3月，中央红军在川黔滇边境灵活机动，四次渡过赤水河。部队根据敌情不断改变行动方向，时而向西、时而折返，使敌军难以判断红军的真实意图。随后，红军南渡乌江、威逼贵阳、进军云南并巧渡金沙江，终于摆脱数十万敌军的围追堵截，由被动转向主动。',
    explain: '地图上的路线看起来曲折，背后却不是“迷路”，而是根据形势作出的连续判断。勇敢不只是向前冲，还包括保持冷静、看懂变化和及时调整。目标坚定，办法可以灵活。',
    think: '计划突然发生变化时，怎样调整才能离目标更近？',
    chainTitle: '灵活改变路线<br>怎样赢得主动？',
    chain: [['背景','敌军重兵围堵'],['困难','正面突破风险很大'],['判断','观察敌情变化'],['行动','多次机动渡过赤水'],['结果','跳出包围赢得主动']],
    keywords: [
      ['机动灵活','目标不变，但能根据实际情况及时调整办法。','遇到难题时尝试画图、列表或换一种思路。'],
      ['沉着判断','越是紧急，越要冷静分析信息再行动。','考试遇到难题，先稳定情绪再判断解题顺序。']
    ],
    sources: [
      ['人民网党史频道：《长征记》','https://dangshi.people.com.cn/GB/146570/406330/index.html'],
      ['财政部河南监管局：《遵义会议的伟大意义和深刻启示》','https://ha.mof.gov.cn/zt/djzc/djzl/201505/t20150513_1231207.htm']
    ],
    task: {type:'route', title:'三步判断：赢得行动主动', copy:'依次作出3个判断。目标不变，但要根据形势灵活选择办法。', steps:[
      {q:'敌军在正面集中重兵，第一步怎么办？', a:['直接硬拼','先观察敌情与地形'], correct:1},
      {q:'敌军判断我军将向西行动，接下来怎么办？', a:['灵活改变行进方向','沿原路线不变'], correct:0},
      {q:'敌军调动后出现空隙，应该怎么办？', a:['抓住时机迅速行动','停在原地等待'], correct:0}
    ]}
  },
  {
    id: 4, slug: 'luding', name: '泸定', title: '飞夺<br>泸定桥', date: '1935年5月', place: '四川泸定', spirit: '不怕牺牲', seal: '勇进', position: ['77%', '34%'],
    facts: [['时间','1935.05.29'],['地点','四川泸定'],['关键','抢占渡河通道']],
    background: '中央红军渡过金沙江后继续北上，必须迅速越过大渡河。泸定桥是重要通道，能否及时夺取关系到部队能否摆脱追兵、继续前进。',
    archive: '1935年5月，红军先头部队昼夜兼程赶往泸定桥。5月29日，红四团组织突击队，在战友火力掩护下攀踏铁索、冲向对岸，与后续部队协同突破阻击，夺取泸定桥。红军主力随后从桥上越过大渡河，为继续北上打开了通道。',
    explain: '这场行动既需要突击队员冲锋，也离不开急行军、火力掩护和后续配合。勇气不是一个人的逞强，而是在关键时刻承担责任，并与同伴协作完成共同任务。',
    think: '集体遇到困难时，你能主动承担哪一项任务？',
    chainTitle: '一道险峻关口<br>如何被突破？',
    chain: [['背景','队伍急需渡过大渡河'],['困难','桥面受损且有阻击'],['选择','组织突击队强攻'],['行动','攀踏铁索向前冲锋'],['结果','打开继续前进的通道']],
    keywords: [
      ['英勇无畏','面对危险和困难，依然为了目标勇敢行动。','遇到不会的问题，敢于承认并主动请教。'],
      ['集体担当','在集体最需要的时刻承担责任、相互配合。','班级活动中主动完成困难但必要的工作。']
    ],
    sources: [
      ['中共中央党史和文献研究院：《四川：三军过后尽开颜》','https://www.dswxyjy.org.cn/n1/2016/1025/c244523-28806146.html'],
      ['人民网党史频道：《长征记》','https://dangshi.people.com.cn/GB/146570/406330/index.html']
    ],
    task: {type:'bridge', title:'争分夺秒：铺设前进通道', copy:'点击铺设12块桥板，在10秒内完成通道。准备好后开始计时。', target:12, seconds:10}
  },
  {
    id: 5, slug: 'snowland', name: '雪山草地', title: '雪山<br>草地', date: '1935年6月至8月', place: '川西北地区', spirit: '艰苦奋斗', seal: '坚韧', position: ['58%', '18%'],
    facts: [['时间','1935.06—08'],['区域','川西北'],['挑战','严寒、缺氧、缺粮']],
    background: '飞夺泸定桥后，中央红军继续向北，前方是高海拔雪山和水草交错、天气多变的草地。恶劣自然环境和物资短缺成为新的严峻考验。',
    archive: '1935年6月，中央红军翻越长征途中第一座大雪山夹金山。高海拔带来严寒和缺氧，山路湿滑难行。此后，部队还要穿越川西北草地。草地人烟稀少、方向难辨，天气变化快，食物和燃料都很缺乏。红军将士互相搀扶、节约物资，以顽强意志克服重重困难，继续向北前进。',
    explain: '这段路没有一招制胜的办法，只能靠准备、节约、互助和一步一步坚持。坚韧不是从不疲惫，而是在疲惫时仍能照顾同伴，把眼前的一小步走好。',
    think: '面对一项很难、很慢的任务，怎样让自己不半途而废？',
    chainTitle: '极端自然环境中<br>靠什么坚持？',
    chain: [['背景','必须继续向北前进'],['困难','严寒缺氧、补给不足'],['选择','互相扶持继续行军'],['行动','节约物资克服险阻'],['结果','以顽强意志走出困境']],
    keywords: [
      ['艰苦奋斗','条件越艰苦，越依靠行动和毅力克服困难。','把大任务拆成小目标，按计划逐步完成。'],
      ['互助友爱','困难中彼此关心、互相支持，共同前进。','发现同伴掉队时，主动询问并提供帮助。']
    ],
    sources: [
      ['国防部：《从月入四百大洋到数过雪山草地》','https://www.mod.gov.cn/gfbw/gfjy_index/4844129.html'],
      ['南京党史：《长征，让我永生难忘》','https://dsb.nanjing.gov.cn/xxcb/201306/t20130626_2084323.html']
    ],
    task: {type:'supply', title:'有限补给：分配10份物资', copy:'在粮食、御寒用品和药品之间分配10份物资。每项都不可缺少，其中粮食与御寒用品至少各3份，药品至少2份。', total:10, minimums:{'粮食':3,'御寒用品':3,'药品':2}}
  },
  {
    id: 6, slug: 'huining', name: '会宁', title: '会宁<br>会师', date: '1936年10月', place: '甘肃会宁', spirit: '团结胜利', seal: '会师', position: ['76%', '4%'],
    facts: [['时间','1936.10'],['区域','会宁、将台堡'],['意义','长征胜利结束']],
    background: '红一、红二、红四方面军分别经历漫长转战。随着全国抗日救亡形势发展，三大主力向西北汇聚，会师的条件逐步成熟。',
    archive: '1936年10月，红一方面军与红四方面军在甘肃会宁会师，并举行庆祝联欢大会。10月22日，红二方面军同红一方面军主力在将台堡会师。红一、红二、红四方面军在以会宁为中心的西北地区胜利会合，标志着具有伟大历史意义的长征胜利结束，中国革命由此站在新的起点上。',
    explain: '长征的胜利不属于某一个人或某一支队伍。共同理想让不同方向出发的队伍最终汇聚，彼此支持和团结协作把分散的力量变成更强大的力量。',
    think: '团队成员想法不同时，怎样找到共同目标并继续合作？',
    chainTitle: '跨越万水千山<br>为何终能会师？',
    chain: [['背景','多支红军分别进行长征'],['困难','路途遥远且险阻重重'],['信念','坚持共同革命理想'],['行动','各路队伍相互策应'],['结果','三大主力胜利会师']],
    keywords: [
      ['团结协作','围绕共同目标互相配合，让每个人的力量汇聚起来。','小组任务先明确分工，再及时互相补位。'],
      ['胜利信念','相信目标值得坚持，并用持续行动接近它。','长期学习中关注每天的进步，不因一次失败放弃。']
    ],
    sources: [
      ['国防部：《红军长征中的会师》','https://www.mod.gov.cn/gfbw/gfjy_index/js_214151/16418521.html'],
      ['中央网信办：《三军大会师——红军长征三大主力会师全纪录》','https://www.cac.gov.cn/2016-08/22/c_1119432029.htm']
    ],
    task: {type:'order', title:'会师之前：排好历史顺序', copy:'使用上下按钮，将四个事件按先后顺序排列。', items:['瑞金出发','遵义会议','飞夺泸定桥','会宁会师'], start:['会宁会师','遵义会议','瑞金出发','飞夺泸定桥']}
  }
];

const archiveProfiles = {
  1: {
    type:'军民群像', name:'于都河畔的架桥军民', role:'红军工兵与于都群众',
    situation:'中央红军主力需要秘密、迅速渡过水面宽阔的于都河，但当时河上没有可供大部队通行的桥。',
    action:'群众捐出门板、床板、木料和船只，与红军一起架设浮桥；为躲避敌机侦察，浮桥还要反复夜架昼拆。',
    meaning:'长征的出发不仅依靠军队的决心，也离不开人民群众的支持。',
    material:'于都河渡河组织记录', materialType:'纪念馆史料与口述资料整理', materialText:'资料记载，于都群众汇集大量船只和木料，在多处渡口架桥、摆渡，为中央红军主力渡河提供保障。',
    question:'如果没有沿岸群众的支持，这次大规模秘密渡河会遇到哪些困难？',
    source:['于都县人民政府：于都河畔，万里长征从这里出发','https://www.yudu.gov.cn/yudu/ydrw/202102/3f856d547c974b18afb023350581f9b0.shtml']
  },
  2: {
    type:'人物档案', name:'陈云', role:'遵义会议参加者、中央政治局常委',
    situation:'遵义会议召开后，需要把会议讨论的问题、作出的决定和重要意义准确传达给中央纵队。',
    action:'陈云在长征途中写下传达提纲，记录会议召开目的、参加人员、讨论情况和作出的决议。',
    meaning:'面对重大转折，既要作出正确判断，也要用可靠记录保存和传达集体决定。',
    material:'《遵义政治局扩大会议传达提纲》手稿', materialType:'中央档案馆藏档案', materialText:'这份钢笔手稿共4600余字，真实记录了遵义会议前后的历史情况，是研究遵义会议的重要原始材料。',
    question:'为什么一份形成于行军途中的会议记录，能够成为今天理解遵义会议的重要证据？',
    source:['中共中央党史和文献研究院：传达提纲手稿','https://www.dswxyjy.org.cn/n1/2024/0129/c427167-40168395.html']
  },
  3: {
    type:'指挥群像', name:'四渡赤水前线指挥集体', role:'毛泽东、周恩来、朱德、刘伯承等',
    situation:'敌军不断改变部署，中央红军兵力处于劣势，原定行动方案必须根据敌情及时调整。',
    action:'指挥员连续分析敌情、调整方向、组织渡河，在高度机动中调动敌军并寻找突破机会。',
    meaning:'灵活不是随意改变，而是依据新信息不断作出更接近目标的判断。',
    material:'四渡赤水行动部署电报', materialType:'1935年军事电报与行动记录', materialText:'留存资料中有关于渡河行动、部队转移和各军团部署的多份电报，显示路线变化建立在持续判断与协同指挥之上。',
    question:'从连续调整的电报和路线中，怎样看出“目标坚定”与“办法灵活”并不矛盾？',
    source:['国防部：四渡赤水，高超指挥艺术的生动体现','https://www.mod.gov.cn/gfbw/gfjy_index/js_214151/4849498.html']
  },
  4: {
    type:'战斗群像', name:'红四团夺桥突击队', role:'22名突击队员及协同部队',
    situation:'泸定桥关系到红军能否迅速越过大渡河，桥面受损，对岸还有守军阻击。',
    action:'突击队攀踏铁索向前，后续部队铺设桥板、实施火力掩护，各部分协同夺取通道。',
    meaning:'飞夺泸定桥并非一个人的冒险，而是勇气、能力、分工与协作共同形成的行动。',
    material:'红军战士唐进新的回忆', materialType:'亲历者回忆资料', materialText:'唐进新回忆，突击队踏索夺桥，后续连队铺设木板，其他部队实施掩护；不同任务共同构成了夺桥行动。',
    question:'为什么理解后续铺板和火力掩护，也能帮助我们更准确地认识22名勇士？',
    source:['国防部：飞夺泸定桥，中国革命史上的不朽篇章','https://www.mod.gov.cn/gfbw/gfjy_index/js_214151/4833421.html']
  },
  5: {
    type:'人物档案', name:'谭发贵与李班长', role:'少年红军战士与他的班长',
    situation:'不到12岁的谭发贵要背着武器、工具和粮食翻越海拔4000多米、终年积雪的夹金山。',
    action:'在严寒、缺氧和体力不足的情况下，李班长把仅有的破被单给他御寒，战友们彼此照顾、共同翻山。',
    meaning:'艰苦奋斗不仅是个人咬牙坚持，也包含困难中不放弃同伴。',
    material:'谭发贵翻越夹金山回忆', materialType:'亲历者回忆文章', materialText:'回忆记录了单衣、缺粮、缺氧和陡峭雪路等困难，也留下班长和战友关爱、鼓励少年战士的细节。',
    question:'这份回忆中，哪一种困难最难只靠个人力量克服？为什么？',
    source:['国防部：班长把仅有的一块破被单给了我','https://www.mod.gov.cn/gfbw/gfjy_index/16037621.html']
  },
  6: {
    type:'会师群像', name:'从不同方向赶来的红军将士', role:'红一、红二、红四方面军',
    situation:'各路红军出发时间和行军路线不同，都经历了漫长转战，需要在西北实现战略上的汇合。',
    action:'红一、红四方面军在会宁会师；10月22日，红二方面军总指挥部及红二军团同红一方面军主力在将台堡会师。',
    meaning:'共同理想把不同经历、不同方向的队伍汇聚起来，团结使保存下来的革命力量形成新的起点。',
    material:'会宁、将台堡会师经过记录', materialType:'会师史实与亲历资料整理', materialText:'资料记录了会师时间、地点、参加部队和联欢场景；将台堡会师是红军长征中的最后一次会师。',
    question:'会师的意义为什么不只是“几支队伍终于见面了”？',
    source:['国防部：红军长征中的会师','https://www.mod.gov.cn/gfbw/gfjy_index/16418522.html']
  }
};

const taskImpacts = {
  1:{gain:{belief:5,supply:12,unity:5},summary:'你优先保留生存、救护和防护物资，让有限负重真正服务于行军。'},
  2:{gain:{belief:10,supply:0,unity:4},summary:'你选择面对事实、总结失误并调整方法，让队伍重新找到正确方向。'},
  3:{gain:{belief:8,supply:-4,unity:5},summary:'你根据敌情连续判断，以必要的行军消耗换取行动主动。'},
  4:{gain:{belief:10,supply:-3,unity:10},summary:'快速铺设通道离不开突击、掩护和后续协同，勇气成为集体力量。'},
  5:{gain:{belief:8,supply:-8,unity:12},summary:'你在有限补给中守住每一类基本需要，也没有放弃需要帮助的同伴。'},
  6:{gain:{belief:10,supply:3,unity:15},summary:'你把分散的历史节点重新排成共同道路，看见不同队伍因共同目标而汇聚。'}
};

const inquiryLayers = {
  1:['中央红军为什么要在1934年实行战略转移？','离开熟悉的根据地，为什么仍然是一种主动选择？','面对长期目标受阻时，我怎样判断该坚持目标还是调整方法？'],
  2:['遵义会议集中解决了哪些紧迫问题？','承认失误并纠正方向，为什么比照旧执行更需要勇气？','学习或合作效果不好时，我怎样依据事实作出调整？'],
  3:['四渡赤水的路线为什么多次改变？','路线曲折为何不等于目标动摇？','计划突然变化时，我怎样收集信息并保持冷静判断？'],
  4:['夺取泸定桥需要哪些部队相互配合？','为什么真正的勇气不等于只顾个人向前冲？','集体遇到困难时，我能主动承担哪一项具体责任？'],
  5:['翻越雪山、穿越草地主要面临哪些困难？','为什么互相搀扶也是战胜自然困难的重要力量？','面对漫长任务时，我怎样坚持自己，也照顾可能掉队的同伴？'],
  6:['会宁、将台堡会师连接了哪些红军队伍？','不同路线的队伍为什么能够汇聚成共同力量？','团队意见不同时，我怎样找到共同目标并继续合作？']
};

const historyBoundaries = {
  4:'本任务只帮助体会时间紧迫与协同配合，不能还原真实战斗中的危险与牺牲。请记住：历史中的胜利来之不易。',
  5:'物资分配是理解困难的简化模型。真实的严寒、饥饿、缺氧和伤亡远比游戏数值更加严峻。'
};

const views = [...document.querySelectorAll('.view')];
const navButtons = [...document.querySelectorAll('.bottom-nav button')];
function getSafeStorage() {
  try {
    const candidate = window.localStorage;
    if (candidate) {
      const testKey = '__spark_storage_test__';
      candidate.setItem(testKey, '1');
      candidate.removeItem(testKey);
      return candidate;
    }
  } catch (_) {
    /* App Inventor 2019 disables DOM storage for local WebViewer pages. */
  }
  const memory = {};
  return {
    getItem: key => Object.prototype.hasOwnProperty.call(memory, key) ? memory[key] : null,
    setItem: (key, value) => { memory[key] = String(value); },
    removeItem: key => { delete memory[key]; },
    key: index => Object.keys(memory)[index] || null,
    get length() { return Object.keys(memory).length; }
  };
}
const storage = getSafeStorage();
const legacyProgress = Number(storage.getItem('sparkProgress') || 0);
const state = {
  unlocked: Math.min(6, Math.max(1, Number(storage.getItem('sparkUnlocked') || legacyProgress || 1))),
  completed: JSON.parse(storage.getItem('sparkCompleted') || '[]'),
  currentStation: Math.min(6, Math.max(1, Number(storage.getItem('sparkCurrentStation') || 1))),
  favorites: JSON.parse(storage.getItem('sparkFavorites') || '[]'),
  spiritKit: JSON.parse(storage.getItem('sparkSpiritKit') || '[]'),
  reflection: storage.getItem('sparkReflection') || '',
  reflectionSpirit: storage.getItem('sparkReflectionSpirit') || '',
  reflectionReason: storage.getItem('sparkReflectionReason') || storage.getItem('sparkReflection') || '',
  reflectionAction: storage.getItem('sparkReflectionAction') || '',
  highScore: Number(storage.getItem('sparkHighScore') || 0),
  wrongQuestions: JSON.parse(storage.getItem('sparkWrongQuestions') || '[]'),
  soundEnabled: storage.getItem('sparkSoundEnabled') !== 'false',
};

function getJourneyMetrics() {
  return state.completed.reduce((total,id) => {
    const gain = taskImpacts[id].gain;
    total.belief += gain.belief; total.supply += gain.supply; total.unity += gain.unity;
    return total;
  }, {belief:50,supply:50,unity:50});
}

function renderJourneyMeters() {
  const metrics = getJourneyMetrics();
  const data = [['belief','信念',metrics.belief],['supply','补给',metrics.supply],['unity','团结',metrics.unity]];
  document.querySelector('#journeyMeters').innerHTML = data.map(([key,label,value]) => `<div class="meter ${key}"><span>${label}<b>${value}</b></span><i><em style="width:${Math.max(0,Math.min(100,value))}%"></em></i></div>`).join('');
}

function consequence(message) { setTaskFeedback(`行动后果：${message}`, 'error'); }

function persistJourney() {
  storage.setItem('sparkUnlocked', state.unlocked);
  storage.setItem('sparkCompleted', JSON.stringify(state.completed));
  storage.setItem('sparkCurrentStation', state.currentStation);
  storage.removeItem('sparkProgress');
}

function showView(id) {
  views.forEach(view => view.classList.toggle('is-active', view.id === id));
  const navId = id === 'station' ? 'route' : id;
  navButtons.forEach(button => button.classList.toggle('is-active', button.dataset.go === navId));
  window.scrollTo({top: 0, behavior: 'smooth'});
}

document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => showView(button.dataset.go)));

function renderRoute() {
  const route = document.querySelector('#routeStations');
  route.innerHTML = stations.map(station => {
    const unlocked = station.id <= state.unlocked;
    const completed = state.completed.includes(station.id);
    const current = station.id === state.currentStation;
    const label = unlocked ? `${station.date.replace('年','.') .replace('月','')} · ${station.spirit}` : `${station.spirit} · 待解锁`;
    const edgeClass = parseFloat(station.position[0]) >= 70 ? 'edge-right' : '';
    return `<button class="station ${edgeClass} ${unlocked ? 'open' : 'locked'} ${completed ? 'completed' : ''} ${current ? 'current' : ''}" style="left:${station.position[0]};top:${station.position[1]}" data-station="${station.id}" aria-label="${station.name}${unlocked ? '' : '，尚未解锁'}"><i>${completed ? '✓' : String(station.id).padStart(2,'0')}</i><div><strong>${station.name}</strong><small>${label}</small></div></button>`;
  }).join('');
  route.querySelectorAll('.station').forEach(button => button.addEventListener('click', () => openStation(Number(button.dataset.station))));
  const current = stations[state.currentStation - 1];
  document.querySelector('#routeNoteTitle').textContent = state.completed.length === 6 ? '长征路线已完成' : `当前研学 · 第 ${String(current.id).padStart(2,'0')} 站`;
  document.querySelector('#routeNoteText').textContent = state.completed.length === 6 ? '六站研学全部完成，你可以返回任意站点复习。' : `继续前往${current.name}。完成本站研学后，下一站将自动点亮。`;
}

function openStation(id) {
  if (id > state.unlocked) return toast(`请先完成第 ${id - 1} 站`);
  state.currentStation = id;
  persistJourney();
  renderStation(stations[id - 1]);
  renderRoute();
  showView('station');
}

function renderStation(station) {
  document.querySelector('#stationIndex').textContent = `STATION ${String(station.id).padStart(2,'0')} / 06`;
  document.querySelector('#stationMeta').textContent = `${station.date} · ${station.place}`;
  document.querySelector('#stationTitle').innerHTML = station.title;
  document.querySelector('#stationSeal').textContent = station.seal;
  document.querySelector('#factStrip').innerHTML = station.facts.map(item => `<div><span>${item[0]}</span><strong>${item[1]}</strong></div>`).join('');
  document.querySelector('#stationBackground').textContent = station.background;
  document.querySelector('#stationArchive').textContent = station.archive;
  document.querySelector('#stationExplain').textContent = station.explain;
  document.querySelector('#inquiryLadder').innerHTML = `<div><span>THINK / 三层思考</span><strong>从史实走向行动</strong></div>${inquiryLayers[station.id].map((question,index) => `<article><i>0${index + 1}</i><div><b>${['看见史实','理解选择','联系今天'][index]}</b><p>${question}</p></div></article>`).join('')}`;
  const profile = archiveProfiles[station.id];
  document.querySelector('#profileCard').innerHTML = `<div class="profile-mark"><span>${profile.type}</span><b>${String(station.id).padStart(2,'0')}</b></div><div class="profile-copy"><small>PEOPLE / 人物与群像</small><h3>${profile.name}</h3><em>${profile.role}</em><dl><div><dt>当时处境</dt><dd>${profile.situation}</dd></div><div><dt>作出行动</dt><dd>${profile.action}</dd></div><div><dt>读懂精神</dt><dd>${profile.meaning}</dd></div></dl></div>`;
  document.querySelector('#evidenceCard').innerHTML = `<div class="evidence-top"><span>EVIDENCE / 史料阅读</span><b>${profile.materialType}</b></div><h3>${profile.material}</h3><p>${profile.materialText}</p><div class="evidence-question"><b>从材料中发现</b><p>${profile.question}</p></div><a href="${profile.source[1]}" target="_blank" rel="noopener">${profile.source[0]} ↗</a>`;
  document.querySelector('#stationSources').innerHTML = station.sources.map((source, index) => `<a href="${source[1]}" target="_blank" rel="noopener"><i>${String(index + 1).padStart(2,'0')}</i><span>${source[0]}</span><b>↗</b></a>`).join('');
  document.querySelector('#chainTitle').innerHTML = station.chainTitle;
  document.querySelector('#causalChain').innerHTML = station.chain.map((item, index) => `${index ? '<span>↓</span>' : ''}<div class="${index === station.chain.length - 1 ? 'result' : ''}"><i>${item[0]}</i><p>${item[1]}</p></div>`).join('');
  document.querySelector('#keywordCards').innerHTML = station.keywords.map((word, index) => `
    <article class="keyword-card ${index ? 'alt' : ''}">
      <div class="keyword-no">0${index + 1}</div><small>LONG MARCH SPIRIT</small><h3>${word[0]}</h3>
      <p>${word[1]}</p><div class="keyword-example"><b>在今天</b>${word[2]}</div>
      <button class="collect-button" data-card="${word[0]}">＋ 收进星火档案</button>
    </article>`).join('');
  bindCollectionButtons();
  renderTask(station);
  activatePanel('facts');
}

let activeTaskTimer = null;

function finishTask(station) {
  const id = station.id;
  const newlyCompleted = !state.completed.includes(id);
  if (newlyCompleted) state.completed.push(id);
  state.completed.sort((a,b) => a - b);
  if (newlyCompleted && id < stations.length) {
    state.unlocked = Math.max(state.unlocked, id + 1);
    if (state.currentStation === id) state.currentStation = id + 1;
  }
  persistJourney();
  updateJourneyUI();
  renderJourneyMeters();
  renderTask(station);
  const message = id === 6 ? '六站研学全部完成！六份精神力量已经汇入星火档案。' : `任务成功！获得“${station.spirit}”印记，第 ${id + 1} 站“${stations[id].name}”已点亮。`;
  setTaskFeedback(message, 'success');
  toast(id === 6 ? '六站长征路全部完成' : `已点亮${stations[id].name}站`);
  playTone('success');
  if (newlyCompleted) showStampCeremony(station);
}

function showStampCeremony(station) {
  const ceremony = document.querySelector('#stampCeremony');
  document.querySelector('#stampStation').textContent = `${station.date} · ${station.name}`;
  document.querySelector('#stampSeal').textContent = station.seal;
  document.querySelector('#stampSpirit').textContent = station.spirit;
  ceremony.hidden = false;
  requestAnimationFrame(() => ceremony.classList.add('is-visible'));
}

function closeStampCeremony() {
  const ceremony = document.querySelector('#stampCeremony');
  ceremony.classList.remove('is-visible');
  window.setTimeout(() => { ceremony.hidden = true; }, 220);
}

document.querySelector('#closeStamp').addEventListener('click', closeStampCeremony);
document.querySelector('#stampCeremony').addEventListener('click', event => { if (event.target.id === 'stampCeremony') closeStampCeremony(); });

function setTaskFeedback(message, type = '') {
  const feedback = document.querySelector('#taskFeedback');
  feedback.textContent = message;
  feedback.className = `task-feedback ${type}`;
}

function renderTask(station, replay = false) {
  if (activeTaskTimer) clearInterval(activeTaskTimer);
  activeTaskTimer = null;
  const task = station.task;
  const completed = state.completed.includes(station.id) && !replay;
  renderJourneyMeters();
  document.querySelector('#taskTag').textContent = `${task.type.toUpperCase()} / 站点任务`;
  document.querySelector('#taskTitle').textContent = completed ? `${station.name}站任务完成` : task.title;
  document.querySelector('#taskCopy').textContent = completed ? `你已经获得“${station.spirit}”印记。可以继续下一站，也可以再次挑战。` : task.copy;
  const boundary = document.querySelector('#historyBoundary');
  boundary.hidden = !historyBoundaries[station.id];
  boundary.textContent = historyBoundaries[station.id] || '';
  document.querySelector('#taskFeedback').className = 'task-feedback';
  document.querySelector('#taskFeedback').textContent = '';
  const mount = document.querySelector('#taskMount');
  if (completed) {
    const impact = taskImpacts[station.id];
    const gains = [['信念',impact.gain.belief],['补给',impact.gain.supply],['团结',impact.gain.unity]].filter(item => item[1]);
    mount.innerHTML = `<div class="task-complete"><span>✓</span><div><strong>${station.spirit}</strong><small>SPIRIT MARK ACQUIRED</small></div></div><div class="decision-summary"><span>本次决策总结</span><p>${impact.summary}</p><div>${gains.map(([label,value]) => `<b>${label} ${value > 0 ? '+' : ''}${value}</b>`).join('')}</div></div><button class="task-action ghost" id="replayTask">再次挑战</button>`;
    document.querySelector('#replayTask').addEventListener('click', () => renderTask(station, true));
    return;
  }
  if (task.type === 'pack') renderPackTask(station, mount);
  if (task.type === 'choice') renderChoiceTask(station, mount);
  if (task.type === 'route') renderRouteTask(station, mount);
  if (task.type === 'bridge') renderBridgeTask(station, mount);
  if (task.type === 'supply') renderSupplyTask(station, mount);
  if (task.type === 'order') renderOrderTask(station, mount);
}

function renderPackTask(station, mount) {
  const selected = new Set();
  mount.innerHTML = `<div class="task-counter">已选择 <b id="packCount">0</b> / 3</div><div class="task-choice-grid">${station.task.items.map(item => `<button data-item="${item}">${item}</button>`).join('')}</div><button class="task-action" id="checkPack">检查背包</button>`;
  mount.querySelectorAll('[data-item]').forEach(button => button.addEventListener('click', () => {
    const item = button.dataset.item;
    if (selected.has(item)) selected.delete(item);
    else if (selected.size < 3) selected.add(item);
    else return setTaskFeedback('背包只能装3件物品，请先取消一件。', 'error');
    button.classList.toggle('selected', selected.has(item));
    document.querySelector('#packCount').textContent = selected.size;
    setTaskFeedback('');
  }));
  document.querySelector('#checkPack').addEventListener('click', () => {
    const correct = station.task.answer.every(item => selected.has(item)) && selected.size === 3;
    correct ? finishTask(station) : consequence('非必要物品占用负重，粮食、救护或防护不足会直接影响队伍继续前进。请重新整理。');
  });
}

function renderChoiceTask(station, mount) {
  mount.innerHTML = `<div class="task-options">${station.task.options.map((item,index) => `<button data-choice="${index}"><i>${String.fromCharCode(65 + index)}</i><span>${item}</span></button>`).join('')}</div>`;
  mount.querySelectorAll('[data-choice]').forEach(button => button.addEventListener('click', () => {
    const correct = Number(button.dataset.choice) === station.task.correct;
    button.classList.add(correct ? 'correct' : 'wrong');
    if (correct) finishTask(station);
    else consequence(Number(button.dataset.choice) === 0 ? '明知方案已造成损失仍照旧执行，队伍可能继续陷入被动。' : '把判断完全交给别人，会错过根据实际情况及时调整的机会。');
  }));
}

function renderRouteTask(station, mount) {
  let step = 0;
  const draw = () => {
    const item = station.task.steps[step];
    mount.innerHTML = `<div class="route-task-progress"><span style="width:${step / station.task.steps.length * 100}%"></span></div><div class="route-question"><small>判断 ${step + 1} / ${station.task.steps.length}</small><strong>${item.q}</strong></div><div class="task-options compact">${item.a.map((answer,index) => `<button data-route-answer="${index}"><i>${index + 1}</i><span>${answer}</span></button>`).join('')}</div>`;
    mount.querySelectorAll('[data-route-answer]').forEach(button => button.addEventListener('click', () => {
      if (Number(button.dataset.routeAnswer) !== item.correct) return consequence(['正面敌军兵力集中，直接硬拼会放大兵力劣势。','敌情已经变化，路线不变可能再次进入包围。','机会短暂，停留等待会让敌军重新合围。'][step]);
      step += 1;
      setTaskFeedback(step < station.task.steps.length ? '判断正确，继续观察下一步形势。' : '', 'success');
      if (step === station.task.steps.length) finishTask(station); else draw();
    }));
  };
  draw();
}

function renderBridgeTask(station, mount) {
  let count = 0;
  let remaining = station.task.seconds * 10;
  mount.innerHTML = `<div class="bridge-status"><b id="bridgeTime">${station.task.seconds}.0 秒</b><span><i id="bridgeCount">0</i> / ${station.task.target} 块</span></div><div class="bridge-track" id="bridgeTrack"></div><button class="task-action" id="startBridge">开始挑战</button>`;
  const drawPlanks = () => document.querySelector('#bridgeTrack').innerHTML = Array.from({length:station.task.target}, (_,i) => `<i class="${i < count ? 'laid' : ''}"></i>`).join('');
  drawPlanks();
  document.querySelector('#startBridge').addEventListener('click', event => {
    count = 0; remaining = station.task.seconds * 10; drawPlanks();
    event.currentTarget.textContent = '点击铺设桥板';
    event.currentTarget.onclick = null;
    const tap = () => {
      count += 1;
      document.querySelector('#bridgeCount').textContent = count;
      drawPlanks();
      if (count >= station.task.target) { clearInterval(activeTaskTimer); activeTaskTimer = null; finishTask(station); }
    };
    event.currentTarget.addEventListener('click', tap);
    activeTaskTimer = setInterval(() => {
      remaining -= 1;
      const timeNode = document.querySelector('#bridgeTime');
      if (timeNode) timeNode.textContent = `${(remaining / 10).toFixed(1)} 秒`;
      if (remaining <= 0) {
        clearInterval(activeTaskTimer); activeTaskTimer = null;
        event.currentTarget.removeEventListener('click', tap);
        event.currentTarget.textContent = '重新开始';
        consequence('通道未能及时铺通，主力渡河会受到影响。真正的行动还需要突击、铺板和火力掩护共同配合。');
        event.currentTarget.addEventListener('click', () => renderBridgeTask(station, mount), {once:true});
      }
    }, 100);
  }, {once:true});
}

function renderSupplyTask(station, mount) {
  const situations = [
    {title:'寒潮突然来临',copy:'一名体力较弱的同伴御寒用品不足，你会怎样做？',options:['调出一份御寒用品并结伴前进','让他独自加快速度'],result:'共享物资会增加眼前压力，却能保护同伴并保持队伍完整。'},
    {title:'前方草甸积水',copy:'有人建议各自寻找近路，你会怎样选择？',options:['保持队形，先探路再通过','分散行动，谁快谁先走'],result:'陌生草地中分散行动容易迷失，保持联系与探路更重要。'},
    {title:'粮食所剩不多',copy:'队伍中有伤员体力下降，你会怎样安排？',options:['共同核算，优先保障基本需要','隐藏自己的粮食，只顾个人'],result:'公开核算和照顾基本需要，才能让有限补给支持更多人前进。'}
  ];
  const situation = situations[Math.floor(Math.random() * situations.length)];
  mount.innerHTML = `<div class="situation-card"><span>随机情境</span><h4>${situation.title}</h4><p>${situation.copy}</p><div class="task-options compact">${situation.options.map((option,index) => `<button data-situation="${index}"><i>${index + 1}</i><span>${option}</span></button>`).join('')}</div></div>`;
  mount.querySelectorAll('[data-situation]').forEach(button => button.addEventListener('click', () => {
    if (Number(button.dataset.situation) !== 0) return consequence('队伍失去照应，个人风险和集体风险都会增大。请重新判断。');
    setTaskFeedback(`情境判断：${situation.result}`, 'success');
    window.setTimeout(() => drawSupplyAllocation(station, mount), 450);
  }));
}

function drawSupplyAllocation(station, mount) {
  const amounts = Object.fromEntries(Object.keys(station.task.minimums).map(key => [key,0]));
  const draw = () => {
    const used = Object.values(amounts).reduce((sum,value) => sum + value,0);
    mount.innerHTML = `<div class="supply-total">剩余物资 <strong>${station.task.total - used}</strong> / ${station.task.total}</div><div class="supply-list">${Object.entries(amounts).map(([name,value]) => `<div><span>${name}<small>最低 ${station.task.minimums[name]} 份</small></span><button data-minus="${name}">−</button><b>${value}</b><button data-plus="${name}">＋</button></div>`).join('')}</div><button class="task-action" id="checkSupply">确认分配</button>`;
    mount.querySelectorAll('[data-plus]').forEach(button => button.addEventListener('click', () => { if (used < station.task.total) { amounts[button.dataset.plus] += 1; draw(); } }));
    mount.querySelectorAll('[data-minus]').forEach(button => button.addEventListener('click', () => { const key=button.dataset.minus; if (amounts[key] > 0) { amounts[key] -= 1; draw(); } }));
    document.querySelector('#checkSupply').addEventListener('click', () => {
      const full = Object.values(amounts).reduce((sum,value) => sum + value,0) === station.task.total;
      const safe = Object.entries(station.task.minimums).every(([key,min]) => amounts[key] >= min);
      full && safe ? finishTask(station) : consequence(full ? '有一类基本物资不足，队伍会在严寒、饥饿或伤病面前失去安全保障。请重新平衡。' : '仍有物资没有分配，有限资源还没有形成完整方案。');
    });
  };
  draw();
}

function renderOrderTask(station, mount) {
  const order = [...station.task.start];
  const draw = () => {
    mount.innerHTML = `<div class="order-list">${order.map((item,index) => `<div><i>${index + 1}</i><strong>${item}</strong><span><button data-up="${index}" ${index === 0 ? 'disabled' : ''}>↑</button><button data-down="${index}" ${index === order.length - 1 ? 'disabled' : ''}>↓</button></span></div>`).join('')}</div><button class="task-action" id="checkOrder">检查顺序</button>`;
    mount.querySelectorAll('[data-up]').forEach(button => button.addEventListener('click', () => { const i=Number(button.dataset.up); [order[i-1],order[i]]=[order[i],order[i-1]]; draw(); }));
    mount.querySelectorAll('[data-down]').forEach(button => button.addEventListener('click', () => { const i=Number(button.dataset.down); [order[i+1],order[i]]=[order[i],order[i+1]]; draw(); }));
    document.querySelector('#checkOrder').addEventListener('click', () => order.every((item,index) => item === station.task.items[index]) ? finishTask(station) : consequence('事件顺序混乱，就无法看清各阶段如何连接，也难以理解会师为何是共同道路的结果。'));
  };
  draw();
}

function activatePanel(id) {
  document.querySelectorAll('.reading-tabs button').forEach(tab => tab.classList.toggle('is-active', tab.dataset.panel === id));
  document.querySelectorAll('.reading-panel').forEach(panel => panel.classList.toggle('is-active', panel.id === id));
}
document.querySelectorAll('.reading-tabs button').forEach(tab => tab.addEventListener('click', () => activatePanel(tab.dataset.panel)));

function updateJourneyUI() {
  const completedCount = state.completed.length;
  document.querySelector('#progressText').textContent = `${completedCount} / 6 站完成`;
  document.querySelector('#progressBar').style.width = `${completedCount / 6 * 100}%`;
  const current = stations[state.currentStation - 1];
  const continueButton = document.querySelector('#continueButton');
  continueButton.innerHTML = completedCount === 6 ? '回看长征路线 <span>→</span>' : `${completedCount ? '继续' : '从'}${current.name}${completedCount ? '研学' : '出发'} <span>→</span>`;
  continueButton.onclick = () => completedCount === 6 ? showView('route') : openStation(current.id);
  renderRoute();
  renderBadgesAndAchievement();
}

function bindCollectionButtons() {
  document.querySelectorAll('.collect-button').forEach(button => {
    const selected = state.favorites.includes(button.dataset.card);
    button.classList.toggle('is-collected', selected);
    button.textContent = selected ? '✓ 已收入星火档案' : '＋ 收进星火档案';
    button.addEventListener('click', () => {
      const card = button.dataset.card;
      if (!state.favorites.includes(card)) {
        state.favorites.push(card);
        storage.setItem('sparkFavorites', JSON.stringify(state.favorites));
        toast(`“${card}”已收入档案`);
      }
      button.classList.add('is-collected');
      button.textContent = '✓ 已收入星火档案';
      renderFavorites();
    });
  });
}

function renderFavorites() {
  document.querySelector('#favoriteSummary').textContent = `已收藏 ${state.favorites.length} 张`;
  document.querySelector('#collectionEmpty').hidden = state.favorites.length > 0;
  const keywordMap = new Map(stations.flatMap(station => station.keywords.map(word => [word[0], {word, station}])));
  document.querySelector('#collectionList').innerHTML = state.favorites.map((item, index) => {
    const entry = keywordMap.get(item);
    if (!entry) return '';
    return `<details class="saved-card"><summary><div><span>SPARK CARD ${String(index + 1).padStart(2,'0')} · ${entry.station.name}</span><strong>${item}</strong></div><b>＋</b></summary><div class="saved-detail"><p>${entry.word[1]}</p><small><i>在今天</i>${entry.word[2]}</small><button data-remove-card="${item}">移出收藏</button></div></details>`;
  }).join('');
  document.querySelectorAll('[data-remove-card]').forEach(button => button.addEventListener('click', () => {
    const card = button.dataset.removeCard;
    state.favorites = state.favorites.filter(item => item !== card);
    storage.setItem('sparkFavorites', JSON.stringify(state.favorites));
    document.querySelectorAll(`.collect-button[data-card="${card}"]`).forEach(node => { node.classList.remove('is-collected'); node.textContent = '＋ 收进星火档案'; });
    renderFavorites();
    toast(`已移出“${card}”`);
  }));
}

function renderSpiritKit() {
  const available = stations.filter(station => state.completed.includes(station.id)).flatMap(station => station.keywords.map(word => ({name:word[0],station:station.name})));
  state.spiritKit = state.spiritKit.filter(name => available.some(item => item.name === name)).slice(0,3);
  storage.setItem('sparkSpiritKit', JSON.stringify(state.spiritKit));
  document.querySelector('#kitCount').textContent = `${state.spiritKit.length} / 3`;
  document.querySelector('#kitSlots').innerHTML = Array.from({length:3}, (_,index) => state.spiritKit[index] ? `<button data-kit-remove="${state.spiritKit[index]}"><i>✦</i><strong>${state.spiritKit[index]}</strong><small>点击取出</small></button>` : `<div><i>${index + 1}</i><strong>等待装入</strong><small>选择一张精神卡</small></div>`).join('');
  document.querySelector('#kitOptions').innerHTML = available.map(item => `<button data-kit-add="${item.name}" ${state.spiritKit.includes(item.name) ? 'disabled' : ''}><span>${item.station}</span><strong>${item.name}</strong></button>`).join('') || '<p>完成第一站后，精神关键词将在这里出现。</p>';
  document.querySelectorAll('[data-kit-add]').forEach(button => button.addEventListener('click', () => {
    if (state.spiritKit.length >= 3) return toast('精神行囊最多装入三张卡');
    state.spiritKit.push(button.dataset.kitAdd); renderSpiritKit(); renderBadgesAndAchievement(); playTone('success');
  }));
  document.querySelectorAll('[data-kit-remove]').forEach(button => button.addEventListener('click', () => {
    state.spiritKit = state.spiritKit.filter(name => name !== button.dataset.kitRemove); renderSpiritKit(); renderBadgesAndAchievement();
  }));
}

function renderBadgesAndAchievement() {
  document.querySelector('#badgeCount').textContent = `${state.completed.length} / 6`;
  document.querySelector('#badgeGrid').innerHTML = stations.map(station => {
    const earned = state.completed.includes(station.id);
    return `<div class="spirit-badge ${earned ? 'earned' : ''}"><i>${earned ? '✦' : '·'}</i><strong>${station.spirit}</strong><small>${earned ? station.name : '尚未获得'}</small></div>`;
  }).join('');
  renderSpiritKit();
  const achieved = state.completed.length === 6 && Boolean(state.reflectionSpirit && state.reflectionReason && state.reflectionAction) && state.spiritKit.length === 3;
  const card = document.querySelector('#achievementCard');
  card.hidden = !achieved;
  if (achieved) {
    document.querySelector('#achievementMarks').innerHTML = stations.map(station => `<i title="${station.spirit}">✦</i>`).join('');
    document.querySelector('#achievementKit').innerHTML = `<span>我的精神行囊</span><strong>${state.spiritKit.join(' · ')}</strong>`;
    document.querySelector('#achievementReflection').textContent = `“我选择${state.reflectionSpirit}，因为${state.reflectionReason}”`;
    document.querySelector('#achievementAction').innerHTML = `<span>我的一个月行动</span><strong>${state.reflectionAction}</strong>`;
  }
}

const questions = [
  {id:1,station:'瑞金出发',q:'中央红军主力于哪一年开始长征？',a:['1931年','1934年','1937年'],correct:1,e:'1934年10月中旬，中央红军主力从瑞金、于都等地出发。'},
  {id:2,station:'瑞金出发',q:'中央红军撤离中央苏区的直接背景是什么？',a:['第五次反“围剿”失败','粮食丰收','会师已经完成'],correct:0,e:'第五次反“围剿”失败后，中央苏区形势严峻，红军开始战略转移。'},
  {id:3,station:'瑞金出发',q:'长征开始时，“战略转移”主要是为了什么？',a:['举行庆典','保存革命力量并寻找新道路','参观各地'],correct:1,e:'战略转移是在危急形势下保存力量、寻找新道路的选择。'},
  {id:4,station:'瑞金出发',q:'瑞金出发最能体现哪种精神？',a:['坚定理想','盲目冒险','等待观望'],correct:0,e:'面对未知征途仍为共同目标行动，体现了坚定理想。'},
  {id:5,station:'瑞金出发',q:'以下哪种做法最符合“责任担当”？',a:['逃避小组任务','只挑最简单的工作','认真完成自己承担的部分'],correct:2,e:'责任担当意味着在集体需要时主动承担并完成自己的任务。'},
  {id:6,station:'遵义会议',q:'遵义会议召开于哪一年？',a:['1934年','1935年','1936年'],correct:1,e:'遵义会议于1935年1月15日至17日召开。'},
  {id:7,station:'遵义会议',q:'遵义会议重点解决了什么问题？',a:['军事和组织问题','桥梁建造问题','粮食种植问题'],correct:0,e:'会议集中解决了当时具有决定意义的军事和组织问题。'},
  {id:8,station:'遵义会议',q:'遵义会议为什么被称为重要转折？',a:['更换了服装','在危急关头挽救了党和红军','增加了交通工具'],correct:1,e:'会议纠正错误领导，在极其危急的关头挽救了党、红军和中国革命。'},
  {id:9,station:'遵义会议',q:'面对已经证明不合适的方法，正确做法是什么？',a:['分析原因并调整','为了面子继续','把问题藏起来'],correct:0,e:'坚定目标与及时调整方法并不矛盾。'},
  {id:10,station:'遵义会议',q:'“独立自主”更接近下面哪种理解？',a:['完全不听建议','结合实际独立思考并解决问题','凡事等待答案'],correct:1,e:'独立自主不是拒绝帮助，而是立足实际作出自己的判断。'},
  {id:11,station:'四渡赤水',q:'四渡赤水主要发生在哪一地区？',a:['川黔滇边境','东北平原','珠江三角洲'],correct:0,e:'中央红军在川黔滇边境灵活机动，四次渡过赤水河。'},
  {id:12,station:'四渡赤水',q:'四渡赤水的路线为什么看起来曲折？',a:['队伍迷路了','根据敌情灵活改变方向','没有任何目标'],correct:1,e:'曲折路线来自连续的敌情判断和机动调整。'},
  {id:13,station:'四渡赤水',q:'四渡赤水后，红军通过哪条江摆脱围追堵截？',a:['金沙江','钱塘江','黄浦江'],correct:0,e:'红军进军云南并巧渡金沙江，摆脱了敌军围追堵截。'},
  {id:14,station:'四渡赤水',q:'“目标坚定，办法灵活”说明什么？',a:['方法永远不能改变','目标和方法都可随意放弃','可根据实际调整方法'],correct:2,e:'目标可以坚定不移，实现目标的办法应根据实际情况调整。'},
  {id:15,station:'四渡赤水',q:'紧急情况下首先应该怎样做？',a:['沉着分析信息','马上随意行动','放弃判断'],correct:0,e:'沉着判断能帮助我们看清变化，再选择合适行动。'},
  {id:16,station:'飞夺泸定桥',q:'飞夺泸定桥发生在哪一天？',a:['1935年5月29日','1935年1月15日','1936年10月22日'],correct:0,e:'1935年5月29日，红四团突击队夺取泸定桥。'},
  {id:17,station:'飞夺泸定桥',q:'夺取泸定桥的主要目的是什么？',a:['修建新城市','打开渡过大渡河的通道','举行运动比赛'],correct:1,e:'夺桥是为了让红军主力越过大渡河并继续北上。'},
  {id:18,station:'飞夺泸定桥',q:'飞夺泸定桥只依靠突击队员个人行动吗？',a:['是，与其他人无关','不是，还需要急行军、掩护和协同','只需要等待'],correct:1,e:'行动依靠突击、火力掩护和后续部队的共同配合。'},
  {id:19,station:'飞夺泸定桥',q:'真正的勇气更接近哪种表现？',a:['从来不会害怕','为了表现而冒险','明白责任后仍选择行动'],correct:2,e:'勇气不是感觉不到害怕，而是在责任面前依然行动。'},
  {id:20,station:'飞夺泸定桥',q:'“集体担当”强调什么？',a:['只依靠一个人','关键时刻相互配合并承担责任','把任务推给别人'],correct:1,e:'集体担当包含主动承担责任和相互协作。'},
  {id:21,station:'雪山草地',q:'中央红军长征途中翻越的第一座大雪山是？',a:['泰山','夹金山','黄山'],correct:1,e:'1935年6月，中央红军翻越夹金山。'},
  {id:22,station:'雪山草地',q:'翻越雪山时主要面临哪些困难？',a:['严寒、缺氧和湿滑山路','炎热和沙尘','城市交通拥堵'],correct:0,e:'高海拔雪山带来严寒、缺氧和难行的山路。'},
  {id:23,station:'雪山草地',q:'穿越草地时为什么补给困难？',a:['商店太多','人烟稀少、食物和燃料缺乏','道路太宽'],correct:1,e:'草地人烟稀少、天气多变，食物和燃料都十分缺乏。'},
  {id:24,station:'雪山草地',q:'面对漫长困难，下面哪种方法更有效？',a:['把任务拆小并坚持完成','一次失败就放弃','只等待别人完成'],correct:0,e:'把大任务分解并持续行动，是坚韧的现实表现。'},
  {id:25,station:'雪山草地',q:'“互助友爱”在困难中有什么作用？',a:['让同伴更加孤立','帮助大家共同坚持前进','减少合作'],correct:1,e:'相互搀扶和彼此照顾，是红军克服困难的重要力量。'},
  {id:26,station:'会宁会师',q:'红军三大主力胜利会师发生在哪一年？',a:['1934年','1935年','1936年'],correct:2,e:'1936年10月，红军三大主力在西北地区胜利会合。'},
  {id:27,station:'会宁会师',q:'红一方面军和红四方面军主要在哪里会师？',a:['会宁','瑞金','遵义'],correct:0,e:'1936年10月，红一方面军和红四方面军在甘肃会宁会师。'},
  {id:28,station:'会宁会师',q:'红二方面军后来同红一方面军主力在哪里会师？',a:['将台堡','泸定桥','于都'],correct:0,e:'1936年10月22日，双方在将台堡胜利会师。'},
  {id:29,station:'会宁会师',q:'三大主力会师标志着什么？',a:['长征胜利结束','长征刚刚开始','遵义会议召开'],correct:0,e:'三大主力胜利会合，标志着具有伟大历史意义的长征胜利结束。'},
  {id:30,station:'会宁会师',q:'会师最突出体现了哪种力量？',a:['各自行动','团结协作','互不联系'],correct:1,e:'共同理想和相互配合，使分散的力量最终汇聚。'}
];

let quizSession = [];
let quizIndex = 0;
let score = 0;
let sessionWrong = [];

function shuffled(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function startQuiz(pool = questions, limit = 10) {
  quizSession = shuffled(pool).slice(0, Math.min(limit, pool.length));
  quizIndex = 0;
  score = 0;
  sessionWrong = [];
  document.querySelector('#score').textContent = '0';
  document.querySelector('#quizResult').hidden = true;
  document.querySelector('#question').hidden = false;
  document.querySelector('#quizOptions').hidden = false;
  document.querySelector('#quizExplain').hidden = false;
  renderQuestion();
}

function renderQuestion() {
  const item = quizSession[quizIndex];
  document.querySelector('#questionNo').textContent = quizIndex + 1;
  document.querySelector('#questionTotal').textContent = quizSession.length;
  document.querySelector('#quizProgress').style.width = `${quizIndex / quizSession.length * 100}%`;
  document.querySelector('#quizStation').textContent = `${item.station} · QUESTION ${String(item.id).padStart(2,'0')}`;
  document.querySelector('#question').textContent = item.q;
  document.querySelector('#quizExplain').textContent = '';
  document.querySelector('#nextQuestion').hidden = true;
  document.querySelector('#quizOptions').innerHTML = item.a.map((answer, index) => `<button data-index="${index}">${String.fromCharCode(65 + index)}. ${answer}</button>`).join('');
  document.querySelectorAll('#quizOptions button').forEach(button => button.addEventListener('click', answerQuestion));
}

function answerQuestion(event) {
  const selected = Number(event.currentTarget.dataset.index);
  const item = quizSession[quizIndex];
  const correct = selected === item.correct;
  document.querySelectorAll('#quizOptions button').forEach(button => button.disabled = true);
  event.currentTarget.classList.add(correct ? 'correct' : 'wrong');
  if (!correct) {
    document.querySelector(`#quizOptions button[data-index="${item.correct}"]`).classList.add('correct');
    sessionWrong.push(item.id);
    if (!state.wrongQuestions.includes(item.id)) state.wrongQuestions.push(item.id);
  } else {
    score += 10;
    state.wrongQuestions = state.wrongQuestions.filter(id => id !== item.id);
  }
  storage.setItem('sparkWrongQuestions', JSON.stringify(state.wrongQuestions));
  document.querySelector('#score').textContent = score;
  document.querySelector('#quizExplain').textContent = item.e;
  document.querySelector('#nextQuestion').hidden = false;
  document.querySelector('#nextQuestion').innerHTML = quizIndex === quizSession.length - 1 ? '查看结果 <span>→</span>' : '下一题 <span>→</span>';
}

function finishQuiz() {
  state.highScore = Math.max(state.highScore, score);
  storage.setItem('sparkHighScore', state.highScore);
  document.querySelector('#quizProgress').style.width = '100%';
  document.querySelector('#question').hidden = true;
  document.querySelector('#quizOptions').hidden = true;
  document.querySelector('#quizExplain').hidden = true;
  document.querySelector('#nextQuestion').hidden = true;
  const result = document.querySelector('#quizResult');
  result.hidden = false;
  result.innerHTML = `<span>CHALLENGE COMPLETE</span><strong>${score}</strong><p>本次得分 · 满分 ${quizSession.length * 10}<br>历史最高分 ${state.highScore}</p><div><button id="restartQuiz">重新抽取10题</button><button id="retryWrong" ${state.wrongQuestions.length ? '' : 'disabled'}>错题重练 ${state.wrongQuestions.length}</button></div>`;
  document.querySelector('#restartQuiz').addEventListener('click', () => startQuiz());
  document.querySelector('#retryWrong').addEventListener('click', () => {
    const pool = questions.filter(item => state.wrongQuestions.includes(item.id));
    if (pool.length) startQuiz(pool, pool.length);
  });
  toast(`挑战完成：${score} 分`);
}

document.querySelector('#nextQuestion').addEventListener('click', () => {
  if (quizIndex < quizSession.length - 1) { quizIndex += 1; renderQuestion(); }
  else finishQuiz();
});

const reflectionSpirit = document.querySelector('#reflectionSpirit');
const reflectionReason = document.querySelector('#reflectionReason');
const reflectionAction = document.querySelector('#reflectionAction');
reflectionSpirit.innerHTML += [...new Set(stations.flatMap(station => [station.spirit,...station.keywords.map(word => word[0])]))].map(item => `<option value="${item}">${item}</option>`).join('');
reflectionSpirit.value = state.reflectionSpirit;
reflectionReason.value = state.reflectionReason;
reflectionAction.value = state.reflectionAction;
document.querySelector('#saveReflection').addEventListener('click', () => {
  state.reflectionSpirit = reflectionSpirit.value;
  state.reflectionReason = reflectionReason.value.trim();
  state.reflectionAction = reflectionAction.value.trim();
  state.reflection = state.reflectionReason;
  storage.setItem('sparkReflectionSpirit', state.reflectionSpirit);
  storage.setItem('sparkReflectionReason', state.reflectionReason);
  storage.setItem('sparkReflectionAction', state.reflectionAction);
  storage.setItem('sparkReflection', state.reflectionReason);
  const complete = Boolean(state.reflectionSpirit && state.reflectionReason && state.reflectionAction);
  document.querySelector('#saveHint').textContent = complete ? '行动计划已装入档案' : '请完成三项内容';
  renderBadgesAndAchievement();
  toast(complete ? '行动计划已保存' : '还差一项没有完成');
});

let toastTimer;
function toast(message) {
  const node = document.querySelector('#toast');
  node.textContent = message;
  node.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => node.classList.remove('show'), 1800);
}

function playTone(type = 'tap') {
  if (!state.soundEnabled) return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = type === 'success' ? 660 : 440;
    gain.gain.setValueAtTime(.055, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + (type === 'success' ? .28 : .12));
    oscillator.connect(gain); gain.connect(context.destination);
    oscillator.start(); oscillator.stop(context.currentTime + (type === 'success' ? .28 : .12));
    oscillator.addEventListener('ended', () => context.close());
  } catch (_) { /* Audio is optional; interaction must continue without it. */ }
}

function updateSoundUI() {
  const headerButton = document.querySelector('#soundButton');
  const toggle = document.querySelector('#soundToggle');
  headerButton.classList.toggle('muted', !state.soundEnabled);
  headerButton.textContent = state.soundEnabled ? '声' : '静';
  toggle.classList.toggle('is-on', state.soundEnabled);
  toggle.setAttribute('aria-checked', String(state.soundEnabled));
}

function toggleSound() {
  state.soundEnabled = !state.soundEnabled;
  storage.setItem('sparkSoundEnabled', state.soundEnabled);
  updateSoundUI();
  if (state.soundEnabled) playTone();
  toast(state.soundEnabled ? '操作提示音已开启' : '操作提示音已关闭');
}

document.querySelector('#soundButton').addEventListener('click', toggleSound);
document.querySelector('#soundToggle').addEventListener('click', toggleSound);

const onboarding = document.querySelector('#onboarding');
let onboardingIndex = 0;
function closeOnboarding() {
  onboarding.hidden = true;
  storage.setItem('sparkOnboarded', 'true');
}
function showOnboardingPage(index) {
  onboardingIndex = index;
  document.querySelectorAll('#onboardingPages article').forEach((page, pageIndex) => page.classList.toggle('is-active', pageIndex === index));
  document.querySelectorAll('#onboardingDots i').forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === index));
  document.querySelector('#nextOnboarding').textContent = index === 2 ? '开始研学 →' : '下一步 →';
}
document.querySelector('#skipOnboarding').addEventListener('click', closeOnboarding);
document.querySelector('#nextOnboarding').addEventListener('click', () => onboardingIndex === 2 ? closeOnboarding() : showOnboardingPage(onboardingIndex + 1));
if (!storage.getItem('sparkOnboarded')) {
  onboarding.hidden = false;
  showOnboardingPage(0);
}

const demoSteps = [
  {time:'00:00',title:'一句话介绍',copy:'首页：面向初中生，把长征历史读成一条可互动的研学路线。',view:'home'},
  {time:'00:25',title:'历史全景',copy:'路线：说明六站是代表性节点，展开“不只一条路线”。',view:'route'},
  {time:'00:55',title:'内容深度',copy:'站点：展示史实、人物群像、史料卡和三层思考。',view:'station'},
  {time:'01:30',title:'核心互动',copy:'任务：演示选择后果、行军指标和完成盖章。',view:'station',panel:'task'},
  {time:'02:10',title:'学习闭环',copy:'档案：展示徽章、精神行囊、行动计划和纪念卡。',view:'collection'},
  {time:'02:40',title:'技术与原创',copy:'作品说明：离线、本地保存、AI辅助范围和AIA/APK迁移计划。',view:'about'}
];
let demoIndex = 0;
let demoRemaining = 180;
let demoTimerId = null;

function renderDemoSteps() {
  document.querySelector('#demoSteps').innerHTML = demoSteps.map((step,index) => `<li class="${index === demoIndex ? 'is-active' : ''} ${index < demoIndex ? 'is-done' : ''}"><i>${step.time}</i><div><strong>${step.title}</strong><p>${step.copy}</p></div></li>`).join('');
  document.querySelector('#demoProgress').style.width = `${demoIndex / (demoSteps.length - 1) * 100}%`;
  document.querySelector('#demoPrompt').textContent = demoSteps[demoIndex].copy;
}

function openDemoStep() {
  const step = demoSteps[demoIndex];
  if (step.view === 'station') { renderStation(stations[Math.max(0,state.currentStation - 1)]); showView('station'); }
  else showView(step.view);
  if (step.panel) activatePanel(step.panel);
}

function startDefenseDemo() {
  clearInterval(demoTimerId); demoIndex = 0; demoRemaining = 180;
  document.querySelector('#nextDemo').disabled = false;
  document.querySelector('#nextDemo').textContent = '下一画面';
  document.querySelector('#startDemo').textContent = '重新计时';
  document.querySelector('.demo-console').classList.add('is-running');
  renderDemoSteps(); openDemoStep();
  demoTimerId = setInterval(() => {
    demoRemaining -= 1;
    const minutes = String(Math.floor(demoRemaining / 60)).padStart(2,'0');
    const seconds = String(demoRemaining % 60).padStart(2,'0');
    document.querySelector('#demoTimer').textContent = `${minutes}:${seconds}`;
    if (demoRemaining <= 0) { clearInterval(demoTimerId); demoTimerId = null; toast('三分钟演示时间到'); }
  },1000);
}

document.querySelector('#startDemo').addEventListener('click', startDefenseDemo);
document.querySelector('#nextDemo').addEventListener('click', () => {
  if (demoIndex === demoSteps.length - 1) {
    clearInterval(demoTimerId); demoTimerId = null;
    document.querySelector('.demo-console').classList.remove('is-running');
    document.querySelector('#nextDemo').disabled = true;
    document.querySelector('#nextDemo').textContent = '下一画面';
    document.querySelector('#startDemo').textContent = '开始计时';
    showView('help');
    return;
  }
  demoIndex += 1;
  renderDemoSteps(); openDemoStep();
  if (demoIndex === demoSteps.length - 1) document.querySelector('#nextDemo').textContent = '结束演示';
});
renderDemoSteps();

document.querySelector('#resetProgress').addEventListener('click', () => {
  const confirmed = window.confirm('确定清除本机上的全部研学记录吗？此操作无法撤销。');
  if (!confirmed) return;
  const keys = [];
  for (let index = 0; index < storage.length; index += 1) keys.push(storage.key(index));
  keys.filter(key => key && key.startsWith('spark')).forEach(key => storage.removeItem(key));
  window.location.reload();
});

function registerOfflineSupport() {
  const status = document.querySelector('#offlineStatus');
  if (!('serviceWorker' in navigator)) {
    status.textContent = '当前浏览器不支持离线缓存';
    return;
  }
  navigator.serviceWorker.register('./service-worker.js').then(() => navigator.serviceWorker.ready).then(() => {
    status.textContent = '核心页面已可离线打开';
  }).catch(() => {
    status.textContent = '首次联网打开后可建立离线缓存';
  });
}

persistJourney();
updateSoundUI();
updateJourneyUI();
renderFavorites();
startQuiz();
renderStation(stations[state.currentStation - 1]);
registerOfflineSupport();
