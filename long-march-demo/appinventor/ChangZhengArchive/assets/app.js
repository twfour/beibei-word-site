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
    task: {type:'causal', title:'因果档案：复原战略转移', copy:'五张档案卡被打乱了。请根据“形势—决定—行动—结果”的因果关系恢复顺序。', items:['第五次反“围剿”失利','中央苏区形势严峻','决定实行战略转移','中央红军从瑞金、于都等地出发','长征由此拉开序幕'], start:['决定实行战略转移','第五次反“围剿”失利','长征由此拉开序幕','中央苏区形势严峻','中央红军从瑞金、于都等地出发']}
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
    task: {type:'deduction', title:'会议推理：哪些结论成立？', copy:'阅读三条史实线索，从四个结论中选出两项能够得到线索支持的结论。', clues:['长征初期，原有军事指挥造成严重损失。','遵义会议集中讨论军事和组织问题。','会议依据实际情况纠正错误并调整领导。'], options:['目标坚定，不等于方法永远不变','一次失误说明此前所有工作都毫无意义','判断方案要尊重事实和结果','独立思考就是拒绝听取任何意见'], answers:[0,2]}
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
    task: {type:'routePuzzle', title:'路线拼图：复原四渡赤水', copy:'根据日期与渡河方向，把四次渡河行动按先后顺序排列。路线曲折，但每一步都有判断依据。', items:['一渡｜1月29日｜向西','二渡｜2月18日至21日｜向东','三渡｜3月16日｜向西','四渡｜3月21日至22日｜向东'], start:['三渡｜3月16日｜向西','一渡｜1月29日｜向西','四渡｜3月21日至22日｜向东','二渡｜2月18日至21日｜向东']}
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
    task: {type:'calculation', title:'急行军计算：时间够不够？', copy:'资料记载先头部队昼夜奔袭约240里。按1里约0.5千米、用时24小时计算，完成两步推理。', stages:[{label:'第一步',q:'240里约等于多少千米？',unit:'千米',answer:120},{label:'第二步',q:'若24小时完成，平均每小时至少前进多少千米？',unit:'千米/小时',answer:5}]}
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
    task: {type:'sudoku', title:'雪山密码：4×4行军数独', copy:'用1—4代表四类行军物资。每行、每列和每个2×2区域都不能出现重复数字。点击空格依次填写。', puzzle:[1,0,3,0,0,4,0,2,2,0,4,0,0,3,0,1], solution:[1,2,3,4,3,4,1,2,2,1,4,3,4,3,2,1]}
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
    task: {type:'matching', title:'会师密码：让队伍正确汇合', copy:'根据三条会师档案，为每条记录选择正确答案。全部匹配后才能点亮会师印记。', rows:[
      {label:'红一方面军与红四方面军', options:['瑞金','会宁','泸定'], answer:'会宁'},
      {label:'红二方面军与红一方面军主力', options:['将台堡','遵义','于都'], answer:'将台堡'},
      {label:'三大主力胜利会合的时间', options:['1934年10月','1935年1月','1936年10月'], answer:'1936年10月'}
    ]}
  }
];

const spiritEvidence = {
  1: ['面对中央苏区的严峻形势，中央红军仍为保存革命力量踏上未知征途。','军民共同架桥、摆渡并组织大部队转移，每个人都承担了不可缺少的任务。'],
  2: ['遵义会议正视长征初期的严重损失，依据实际情况纠正错误、调整方向。','会议立足中国革命的实际作出判断，探索依靠自身力量解决问题的道路。'],
  3: ['中央红军根据敌军部署连续改变方向，四次渡过赤水河并赢得行动主动。','在敌情不断变化的危急局面中，指挥员持续分析信息后再作出行动选择。'],
  4: ['突击队员冒着危险攀踏铁索、冲向对岸，为主力渡过大渡河打开通道。','夺桥依靠突击、铺板、火力掩护与后续部队协同完成，不是个人冒险。'],
  5: ['面对严寒、缺氧、缺粮和湿滑山路，红军仍一步一步翻越雪山、走出草地。','行军途中战友彼此搀扶、节约物资、照顾伤病员，共同克服极端环境。'],
  6: ['三支主力红军从不同方向转战，最终围绕共同目标在西北地区胜利会合。','漫长征途中屡经困难仍持续向前，三大主力会师标志着长征胜利结束。']
};

const spiritJudgmentQuestions = {
  1: {scene:'渡河前，沿岸群众捐出门板、床板和船只，并与红军一起架设浮桥。这个行动更直接体现哪条线索？',answer:1,explain:'大家在共同需要面前主动承担具体工作，更直接体现“责任担当”。'},
  2: {scene:'原有指挥方法已经造成严重损失，会议没有回避问题，而是根据实际情况纠正错误。这个选择更直接体现哪条线索？',answer:0,explain:'以事实和结果检验方法、发现错误后及时调整，更直接体现“实事求是”。'},
  3: {scene:'敌军部署突然改变，指挥员没有立刻冒进，而是重新分析敌情和路线。这个过程更直接体现哪条线索？',answer:1,explain:'紧急情况下先稳定局面、分析信息再行动，更直接体现“沉着判断”。'},
  4: {scene:'突击队攀索前进，其他部队同时负责铺板、掩护和后续接应。这个整体行动更直接体现哪条线索？',answer:1,explain:'不同成员承担不同任务并相互配合，更直接体现“集体担当”。'},
  5: {scene:'翻越雪山时，一名战士体力下降，战友分担物资并搀扶他继续前进。这个行动更直接体现哪条线索？',answer:1,explain:'困难中不放弃同伴、彼此支持，更直接体现“互助友爱”。'},
  6: {scene:'三支主力红军经历不同路线，最终围绕共同目标在西北地区胜利会合。这个结果更直接体现哪条线索？',answer:0,explain:'不同队伍围绕共同目标汇聚力量，更直接体现“团结协作”。'}
};

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
  1:{gain:{belief:10,supply:4,unity:3},summary:'你按因果关系复原了战略转移的历史逻辑，看见艰难出发并非偶然。'},
  2:{gain:{belief:10,supply:0,unity:5},summary:'你从史实线索推出结论，理解了尊重事实、纠正错误与独立判断的关系。'},
  3:{gain:{belief:8,supply:-4,unity:6},summary:'你复原了四次渡河的先后与方向，看见曲折路线背后的连续判断。'},
  4:{gain:{belief:10,supply:-3,unity:8},summary:'你用距离和时间理解了急行军的紧迫，也看见数字背后的艰难与协同。'},
  5:{gain:{belief:8,supply:-8,unity:10},summary:'你完成了行、列与区域三重约束，在有限条件中保持耐心和整体判断。'},
  6:{gain:{belief:10,supply:3,unity:15},summary:'你把不同方面军、会师地点和时间准确连接，理解了团结胜利的历史脉络。'}
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

const taskCompatibilityHints = {
  causal:['操作','点击上下箭头调整卡片','目标','恢复完整因果链'],
  deduction:['操作','先选满两项，再验证','目标','只选能由史实支持的结论'],
  routePuzzle:['操作','按日期与方向排序','目标','复原四次渡河顺序'],
  calculation:['操作','用数字键盘完成两步计算','目标','理解急行军的时间压力'],
  sudoku:['操作','点击空格循环填入1—4','目标','行、列、2×2区域均不重复'],
  matching:['操作','为三条档案选择对应答案','目标','连接队伍、地点与时间']
};

const views = [...document.querySelectorAll('.view')];
const navButtons = [...document.querySelectorAll('.bottom-nav button')];
const multiRouteInfo = {
  all:{eyebrow:'全部路线',title:'不同起点，共同方向',copy:'四支队伍出发时间、行军区域和经历各不相同，先后向西北汇聚。点击图例可单独查看。'},
  first:{eyebrow:'红一方面军 · 1934.10—1935.10',title:'中央苏区出发，到达陕北',copy:'经过遵义、四渡赤水、巧渡金沙江、强渡大渡河和翻越雪山草地等重要历程，1935年10月到达陕北。'},
  twentyfive:{eyebrow:'红二十五军 · 1934.11—1935.09',title:'鄂豫皖出发，先期到达陕甘',copy:'从鄂豫皖根据地开始战略转移，1935年9月到达陕甘根据地，为主力红军北上提供了重要条件。'},
  fourth:{eyebrow:'红四方面军 · 1935.03—1936.10',title:'川陕出发，北上走向会宁',copy:'从川陕根据地开始战略转移，经历雪山草地等艰苦行程，1936年10月与红一方面军在会宁会师。'},
  second:{eyebrow:'红二方面军 · 1935.11—1936.10',title:'湘鄂川黔出发，走向将台堡',copy:'由红二、红六军团等部队发展组成，转战多省，1936年10月在将台堡同红一方面军主力会师。'}
};

function selectMultiRoute(key) {
  const selected = multiRouteInfo[key] ? key : 'all';
  document.querySelectorAll('[data-route-filter]').forEach(button => button.classList.toggle('is-active', button.dataset.routeFilter === selected));
  document.querySelectorAll('[data-route-layer]').forEach(layer => {
    const matches = selected === 'all' || layer.dataset.routeLayer === selected;
    layer.classList.toggle('is-muted', !matches);
    layer.classList.toggle('is-selected', selected !== 'all' && matches);
  });
  const info = multiRouteInfo[selected];
  const caption = document.querySelector('#atlasCaption');
  caption.innerHTML = `<span>${info.eyebrow}</span><strong>${info.title}</strong><p>${info.copy}</p>`;
}

document.querySelectorAll('[data-route-filter]').forEach(button => button.addEventListener('click', () => selectMultiRoute(button.dataset.routeFilter)));
document.querySelectorAll('.expedition-route[data-route-layer]').forEach(layer => {
  const activate = () => selectMultiRoute(layer.dataset.routeLayer);
  layer.addEventListener('click', activate);
  layer.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); activate(); }
  });
});

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
  spiritJudgments: JSON.parse(storage.getItem('sparkSpiritJudgments') || '{}'),
  highScore: Number(storage.getItem('sparkHighScore') || 0),
  wrongQuestions: JSON.parse(storage.getItem('sparkWrongQuestions') || '[]'),
  taskRecords: JSON.parse(storage.getItem('sparkTaskRecords') || '{}'),
  soundEnabled: storage.getItem('sparkSoundEnabled') !== 'false',
};

function syncEarnedSpiritClues() {
  const earned = stations
    .filter(station => state.completed.includes(station.id))
    .flatMap(station => station.keywords.map(word => word[0]));
  state.favorites = [...new Set(earned)];
  storage.setItem('sparkFavorites', JSON.stringify(state.favorites));
}

syncEarnedSpiritClues();

state.completed.forEach(id => {
  if (!state.taskRecords[id]) state.taskRecords[id] = {attempts:1,runs:1,bestStars:3,completedAt:'历史记录'};
});

let activeTaskRun = null;

function starText(count = 0) {
  return `${'★'.repeat(count)}${'☆'.repeat(Math.max(0,3-count))}`;
}

function beginTaskRun(station) {
  activeTaskRun = {stationId:station.id,attempts:0};
}

function recordTaskAttempt(station, successful = false) {
  if (!activeTaskRun || activeTaskRun.stationId !== station.id) beginTaskRun(station);
  activeTaskRun.attempts += 1;
  const previous = state.taskRecords[station.id] || {attempts:0,runs:0,bestStars:0};
  previous.attempts += 1;
  if (successful) {
    const earnedStars = activeTaskRun.attempts === 1 ? 3 : activeTaskRun.attempts === 2 ? 2 : 1;
    previous.runs += 1;
    previous.lastStars = earnedStars;
    previous.bestStars = Math.max(previous.bestStars || 0,earnedStars);
    previous.completedAt = new Date().toLocaleDateString('zh-CN');
  }
  state.taskRecords[station.id] = previous;
  storage.setItem('sparkTaskRecords', JSON.stringify(state.taskRecords));
  return previous;
}

function consequence(message) {
  const station = activeTaskRun ? stations[activeTaskRun.stationId - 1] : null;
  if (station) recordTaskAttempt(station, false);
  setTaskFeedback(`判断未通过：${message}`, 'error');
}

function persistJourney() {
  storage.setItem('sparkUnlocked', state.unlocked);
  storage.setItem('sparkCompleted', JSON.stringify(state.completed));
  storage.setItem('sparkCurrentStation', state.currentStation);
  storage.setItem('sparkTaskRecords', JSON.stringify(state.taskRecords));
  storage.removeItem('sparkProgress');
}

const shoeStops = [[11,94],[18,88],[25,70],[45,53],[68,38],[61,22],[71,9]];
const shoeWearLabels = ['新','启程','沾尘','磨损','补缀','破旧','抵达'];
const shoeStopNames = ['瑞金出发点','瑞金','遵义','赤水','泸定','雪山草地','会宁'];

function updateRouteShoes(animate = false) {
  const shoes = document.querySelector('#routeShoes');
  if (!shoes) return;
  const stage = Math.min(6,state.completed.length);
  const targetIndex = stage;
  const shownStage = Math.max(0,Number(shoes.dataset.shownStage || 0));
  const start = shoeStops[Math.min(6,shownStage)];
  const target = shoeStops[targetIndex];
  shoes.className = `route-shoes wear-${stage}`;
  shoes.querySelector('small').textContent = shoeWearLabels[stage];
  shoes.setAttribute('aria-label',`草鞋行至${shoeStopNames[targetIndex]}，磨损程度：${shoeWearLabels[stage]}`);
  if (animate && shownStage !== stage) {
    shoes.style.left = `${start[0]}%`; shoes.style.top = `${start[1]}%`;
    shoes.getBoundingClientRect();
    requestAnimationFrame(() => { shoes.style.left = `${target[0]}%`; shoes.style.top = `${target[1]}%`; });
  } else {
    shoes.style.left = `${target[0]}%`; shoes.style.top = `${target[1]}%`;
  }
  shoes.dataset.shownStage = stage;
}

function showView(id) {
  views.forEach(view => view.classList.toggle('is-active', view.id === id));
  const navId = id === 'station' ? 'route' : id;
  navButtons.forEach(button => button.classList.toggle('is-active', button.dataset.go === navId));
  if (id === 'route') updateRouteShoes(true);
  window.scrollTo(0, 0);
}

document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => showView(button.dataset.go)));

function renderRoute() {
  const route = document.querySelector('#routeStations');
  route.innerHTML = stations.map(station => {
    const unlocked = station.id <= state.unlocked;
    const completed = state.completed.includes(station.id);
    const current = station.id === state.currentStation;
    const record = state.taskRecords[station.id];
    const label = completed && record ? `${starText(record.bestStars)} · ${station.spirit}` : unlocked ? `${station.date.replace('年','.') .replace('月','')} · ${station.spirit}` : `${station.spirit} · 待解锁`;
    const edgeClass = parseFloat(station.position[0]) >= 70 ? 'edge-right' : '';
    const stationStyle = edgeClass ? `right:8px;top:${station.position[1]}` : `left:${station.position[0]};top:${station.position[1]}`;
    return `<button class="station ${edgeClass} ${unlocked ? 'open' : 'locked'} ${completed ? 'completed' : ''} ${current ? 'current' : ''}" style="${stationStyle}" data-station="${station.id}" aria-label="${station.name}${unlocked ? '' : '，尚未解锁'}"><i class="shoe-stop shoe-wear-${station.id}" aria-hidden="true"><span></span><span></span><b>${String(station.id).padStart(2,'0')}</b></i><div><strong>${station.name}</strong><small>${label}</small></div></button>`;
  }).join('');
  route.querySelectorAll('.station').forEach(button => button.addEventListener('click', () => openStation(Number(button.dataset.station))));
  const current = stations[state.currentStation - 1];
  const totalStars = stations.reduce((sum,station) => sum + (state.taskRecords[station.id]?.bestStars || 0),0);
  document.querySelector('#routeNoteTitle').textContent = state.completed.length === 6 ? '长征路线已完成' : `当前研学 · 第 ${String(current.id).padStart(2,'0')} 站`;
  document.querySelector('#routeNoteText').textContent = state.completed.length === 6 ? `六站研学全部完成，当前最佳总成绩 ${totalStars}/18 星。你可以返回任意站点刷新成绩。` : `继续前往${current.name}。完成本站后点亮下一站；当前累计 ${totalStars}/18 星。`;
  if (document.querySelector('#route').classList.contains('is-active')) updateRouteShoes(true);
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
  document.querySelector('.station-cover').setAttribute('data-station-no', String(station.id).padStart(2,'0'));
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
      <div class="keyword-no">0${index + 1}</div><small>SPIRIT CLUE / 精神线索</small><h3>${word[0]}</h3>
      <div class="spirit-proof"><b>历史证据</b><p>${spiritEvidence[station.id][index]}</p></div>
      <div class="spirit-proof reasoning"><b>判断依据</b><p>${word[1]}</p></div>
      <div class="keyword-example"><b>今日行动</b>${word[2]}</div>
      <div class="clue-status ${state.completed.includes(station.id) ? 'is-earned' : ''}">${state.completed.includes(station.id) ? '✓ 已随本站任务收入星火档案' : '完成本站任务后，自动收入星火档案'}</div>
    </article>`).join('') + renderSpiritJudgment(station);
  bindSpiritJudgment(station);
  renderTask(station);
  activatePanel('facts');
}

function renderSpiritJudgment(station) {
  const question = spiritJudgmentQuestions[station.id];
  const completed = state.completed.includes(station.id);
  const passed = Boolean(state.spiritJudgments[station.id]);
  return `<section class="spirit-judgment ${passed ? 'is-passed' : ''}">
    <div class="judgment-head"><span>CLUE CHECK / 线索辨析</span><b>${passed ? '已通过' : '1 道判断'}</b></div>
    <h3>哪条精神线索更贴近史实？</h3>
    <p>${question.scene}</p>
    <div class="judgment-options">${station.keywords.map((word,index) => `<button data-spirit-answer="${index}" ${!completed || passed ? 'disabled' : ''}><i>${String.fromCharCode(65 + index)}</i><span>${word[0]}</span></button>`).join('')}</div>
    <div class="judgment-feedback" aria-live="polite">${passed ? `✓ ${question.explain}` : completed ? '选择后要能说出判断依据。' : '完成本站任务后开放辨析。'}</div>
  </section>`;
}

function bindSpiritJudgment(station) {
  document.querySelectorAll('[data-spirit-answer]').forEach(button => button.addEventListener('click', () => {
    const question = spiritJudgmentQuestions[station.id];
    const selected = Number(button.dataset.spiritAnswer);
    const feedback = document.querySelector('.judgment-feedback');
    document.querySelectorAll('[data-spirit-answer]').forEach(option => option.classList.remove('wrong'));
    if (selected !== question.answer) {
      button.classList.add('wrong');
      feedback.textContent = '再想一想：这段史实中，人物具体做了什么？';
      return;
    }
    state.spiritJudgments[station.id] = true;
    storage.setItem('sparkSpiritJudgments', JSON.stringify(state.spiritJudgments));
    document.querySelector('#keywordCards').innerHTML = station.keywords.map((word, index) => `
      <article class="keyword-card ${index ? 'alt' : ''}">
        <div class="keyword-no">0${index + 1}</div><small>SPIRIT CLUE / 精神线索</small><h3>${word[0]}</h3>
        <div class="spirit-proof"><b>历史证据</b><p>${spiritEvidence[station.id][index]}</p></div>
        <div class="spirit-proof reasoning"><b>判断依据</b><p>${word[1]}</p></div>
        <div class="keyword-example"><b>今日行动</b>${word[2]}</div>
        <div class="clue-status is-earned">✓ 已随本站任务收入星火档案</div>
      </article>`).join('') + renderSpiritJudgment(station);
    renderFavorites();
    renderSpiritKit();
    toast('辨析正确，本站线索已加入精神行囊候选');
    playTone('success');
  }));
}

let activeTaskTimer = null;

function finishTask(station) {
  const id = station.id;
  const record = recordTaskAttempt(station, true);
  const earnedStars = record.lastStars || 1;
  const newlyCompleted = !state.completed.includes(id);
  if (newlyCompleted) state.completed.push(id);
  state.completed.sort((a,b) => a - b);
  syncEarnedSpiritClues();
  if (newlyCompleted && id < stations.length) {
    state.unlocked = Math.max(state.unlocked, id + 1);
    if (state.currentStation === id) state.currentStation = id + 1;
  }
  persistJourney();
  updateJourneyUI();
  renderFavorites();
  renderStationClueStatus(station);
  renderTask(station);
  const message = id === 6 ? `六站研学全部完成！本次获得${earnedStars}星，两条精神线索已归档。` : `任务成功！本次获得${earnedStars}星，两条精神线索已归档，第 ${id + 1} 站“${stations[id].name}”已点亮。`;
  setTaskFeedback(message, 'success');
  toast(id === 6 ? '六站长征路全部完成' : `已点亮${stations[id].name}站`);
  playTone('success');
  if (newlyCompleted) showStampCeremony(station,record);
}

function renderStationClueStatus(station) {
  document.querySelectorAll('#keywordCards .clue-status').forEach(node => {
    node.classList.add('is-earned');
    node.textContent = '✓ 已随本站任务收入星火档案';
  });
  const judgment = document.querySelector('.spirit-judgment');
  if (judgment && station) {
    judgment.outerHTML = renderSpiritJudgment(station);
    bindSpiritJudgment(station);
  }
}

function showStampCeremony(station,record) {
  const ceremony = document.querySelector('#stampCeremony');
  document.querySelector('#stampStation').textContent = `${station.date} · ${station.name}`;
  document.querySelector('#stampSeal').textContent = station.seal;
  document.querySelector('#stampSpirit').textContent = station.spirit;
  document.querySelector('#stampStars').textContent = starText(record.lastStars);
  document.querySelector('#stampScoreNote').textContent = `本次 ${record.lastStars} 星 · 最佳 ${record.bestStars} 星 · 两条精神线索已归档`;
  ceremony.hidden = false;
  requestAnimationFrame(() => ceremony.classList.add('is-visible'));
}

function closeStampCeremony() {
  const ceremony = document.querySelector('#stampCeremony');
  ceremony.classList.remove('is-visible');
  window.setTimeout(() => { ceremony.hidden = true; }, 220);
}

document.querySelector('#closeStamp').addEventListener('click', () => {
  closeStampCeremony();
  window.setTimeout(() => showView('route'), 220);
});
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
  const taskLabels = {causal:'因果排序',deduction:'逻辑推理',routePuzzle:'路线拼图',calculation:'行军计算',sudoku:'行军数独',matching:'会师配对'};
  document.querySelector('#taskTag').textContent = `${taskLabels[task.type] || task.type.toUpperCase()} / 站点任务`;
  document.querySelector('#taskTitle').textContent = completed ? `${station.name}站任务完成` : task.title;
  document.querySelector('#taskCopy').textContent = completed ? `你已经获得“${station.spirit}”印记。可以继续下一站，也可以再次挑战。` : task.copy;
  const taskHints = taskCompatibilityHints[task.type] || ['操作','完成任务','目标','理解历史选择'];
  document.querySelector('#taskRuleStrip').innerHTML = `<div><span>${taskHints[0]}</span><b>${taskHints[1]}</b></div><div><span>${taskHints[2]}</span><b>${taskHints[3]}</b></div><small>首次通过 3 星 · 第二次 2 星 · 其后 1 星</small>`;
  const boundary = document.querySelector('#historyBoundary');
  boundary.hidden = !historyBoundaries[station.id];
  boundary.textContent = historyBoundaries[station.id] || '';
  document.querySelector('#taskFeedback').className = 'task-feedback';
  document.querySelector('#taskFeedback').textContent = '';
  const mount = document.querySelector('#taskMount');
  if (completed) {
    const impact = taskImpacts[station.id];
    const record = state.taskRecords[station.id] || {attempts:1,runs:1,bestStars:3,lastStars:3};
    mount.innerHTML = `<div class="task-complete"><span>✓</span><div><strong>${station.spirit}</strong><small>SPIRIT MARK ACQUIRED</small></div></div><div class="task-score-slip"><div><span>最佳成绩</span><strong>${starText(record.bestStars)}</strong></div><dl><div><dt>最近一次</dt><dd>${record.lastStars || record.bestStars} 星</dd></div><div><dt>累计作答</dt><dd>${record.attempts} 次</dd></div><div><dt>完成轮次</dt><dd>${record.runs || 1} 次</dd></div></dl></div><div class="decision-summary"><span>本次决策总结</span><p>${impact.summary}</p></div><button class="task-action ghost" id="replayTask">再次挑战 · 刷新最佳</button>`;
    document.querySelector('#replayTask').addEventListener('click', () => renderTask(station, true));
    return;
  }
  beginTaskRun(station);
  if (task.type === 'causal') renderSequenceTask(station, mount, '检查因果链');
  if (task.type === 'deduction') renderDeductionTask(station, mount);
  if (task.type === 'routePuzzle') renderSequenceTask(station, mount, '拼合路线');
  if (task.type === 'calculation') renderCalculationTask(station, mount);
  if (task.type === 'sudoku') renderSudokuTask(station, mount);
  if (task.type === 'matching') renderMatchingTask(station, mount);
}

function renderSequenceTask(station, mount, actionLabel) {
  const order = [...station.task.start];
  const draw = () => {
    const routeClass = station.task.type === 'routePuzzle' ? ' route-puzzle-list' : '';
    mount.innerHTML = `<div class="puzzle-instruction"><span>拖动替代操作</span><b>使用箭头调整卡片顺序</b></div><div class="order-list${routeClass}">${order.map((item,index) => {
      const parts = item.split('｜');
      return `<div><i>${String(index + 1).padStart(2,'0')}</i><strong>${parts[0]}${parts.length > 1 ? `<small>${parts.slice(1).join(' · ')}</small>` : ''}</strong><span><button data-up="${index}" ${index === 0 ? 'disabled' : ''} aria-label="上移${parts[0]}">↑</button><button data-down="${index}" ${index === order.length - 1 ? 'disabled' : ''} aria-label="下移${parts[0]}">↓</button></span></div>`;
    }).join('')}</div><button class="task-action" id="checkSequence">${actionLabel}</button>`;
    mount.querySelectorAll('[data-up]').forEach(button => button.addEventListener('click', () => { const i=Number(button.dataset.up); [order[i-1],order[i]]=[order[i],order[i-1]]; draw(); }));
    mount.querySelectorAll('[data-down]').forEach(button => button.addEventListener('click', () => { const i=Number(button.dataset.down); [order[i+1],order[i]]=[order[i],order[i+1]]; draw(); }));
    document.querySelector('#checkSequence').addEventListener('click', () => {
      if (order.every((item,index) => item === station.task.items[index])) return finishTask(station);
      consequence(station.task.type === 'routePuzzle' ? '渡河日期或方向还没有正确衔接。先找最早的一渡，再观察“向西—向东—向西—向东”的变化。' : '因果链还没有接通。先找造成形势变化的原因，再连接决定、行动与结果。');
    });
  };
  draw();
}

function renderDeductionTask(station, mount) {
  const selected = new Set();
  mount.innerHTML = `<div class="clue-board"><span>史实线索</span>${station.task.clues.map((clue,index) => `<p><i>0${index + 1}</i>${clue}</p>`).join('')}</div><div class="deduction-options">${station.task.options.map((option,index) => `<button data-deduction="${index}"><i>${String.fromCharCode(65 + index)}</i><span>${option}</span><b>○</b></button>`).join('')}</div><div class="task-counter">已选择 <b id="deductionCount">0</b> / 2</div><button class="task-action" id="checkDeduction">验证结论</button>`;
  mount.querySelectorAll('[data-deduction]').forEach(button => button.addEventListener('click', () => {
    const index = Number(button.dataset.deduction);
    if (selected.has(index)) selected.delete(index);
    else if (selected.size < 2) selected.add(index);
    else return setTaskFeedback('只能选择两项，请先取消一项。', 'error');
    button.classList.toggle('selected', selected.has(index));
    button.querySelector('b').textContent = selected.has(index) ? '●' : '○';
    document.querySelector('#deductionCount').textContent = selected.size;
    setTaskFeedback('');
  }));
  document.querySelector('#checkDeduction').addEventListener('click', () => {
    if (selected.size !== 2) return setTaskFeedback('请先选满两项结论再验证。', 'error');
    const correct = station.task.answers.length === selected.size && station.task.answers.every(index => selected.has(index));
    correct ? finishTask(station) : consequence('至少有一项结论超出了史实线索。注意：“纠正方法”不等于否定一切，“独立思考”也不等于拒绝意见。');
  });
}

function renderCalculationTask(station, mount) {
  let stage = 0;
  const draw = () => {
    const item = station.task.stages[stage];
    mount.innerHTML = `<div class="calculation-sheet"><div><span>${item.label} · ${stage + 1}/2</span><b>${stage ? '120 ÷ 24 = ?' : '240 × 0.5 = ?'}</b></div><p>${item.q}</p><label><input id="calculationAnswer" type="number" inputmode="decimal" min="0" aria-label="计算答案"><em>${item.unit}</em></label></div><button class="task-action" id="checkCalculation">${stage ? '完成计算' : '提交第一步'}</button>`;
    const input = document.querySelector('#calculationAnswer');
    const submitCalculation = () => {
      if (input.value.trim() === '') return setTaskFeedback('请先输入计算结果。', 'error');
      if (Number(input.value) !== item.answer) return consequence(stage ? '用总路程120千米除以24小时，求平均每小时前进距离。' : '按照题目给出的换算关系，用240乘以0.5。');
      if (stage === station.task.stages.length - 1) return finishTask(station);
      stage += 1;
      setTaskFeedback('第一步正确：240里约为120千米。继续计算平均速度。', 'success');
      draw();
    };
    document.querySelector('#checkCalculation').addEventListener('click', submitCalculation);
    input.addEventListener('keydown', event => { if (event.key === 'Enter') submitCalculation(); });
  };
  draw();
}

function renderSudokuTask(station, mount) {
  const values = [...station.task.puzzle];
  const fixed = station.task.puzzle.map(Boolean);
  const draw = () => {
    mount.innerHTML = `<div class="sudoku-key"><span>1 粮食</span><span>2 药品</span><span>3 御寒</span><span>4 向导</span></div><div class="sudoku-grid" role="grid">${values.map((value,index) => `<button class="${fixed[index] ? 'fixed' : ''}" data-cell="${index}" ${fixed[index] ? 'disabled' : ''} aria-label="第${Math.floor(index/4)+1}行第${index%4+1}列">${value || '·'}</button>`).join('')}</div><div class="sudoku-tools"><button id="clearSudoku">清空重填</button><small>点击空格：· → 1 → 2 → 3 → 4</small></div><button class="task-action" id="checkSudoku">检查雪山密码</button>`;
    mount.querySelectorAll('[data-cell]:not(:disabled)').forEach(button => button.addEventListener('click', () => { const i=Number(button.dataset.cell); values[i]=(values[i]+1)%5; draw(); }));
    document.querySelector('#clearSudoku').addEventListener('click', () => { station.task.puzzle.forEach((value,index) => { values[index]=value; }); draw(); });
    document.querySelector('#checkSudoku').addEventListener('click', () => {
      if (values.some(value => !value)) return setTaskFeedback('还有空格没有填写。每行、每列和每个2×2区域都需要1—4。', 'error');
      values.every((value,index) => value === station.task.solution[index]) ? finishTask(station) : consequence('目前存在重复数字。分别检查每一行、每一列和四个2×2区域。');
    });
  };
  draw();
}

function renderMatchingTask(station, mount) {
  mount.innerHTML = `<div class="matching-board">${station.task.rows.map((row,index) => `<label><span><i>0${index + 1}</i>${row.label}</span><select data-match="${index}"><option value="">选择对应档案</option>${row.options.map(option => `<option value="${option}">${option}</option>`).join('')}</select></label>`).join('')}</div><button class="task-action" id="checkMatching">核对会师档案</button>`;
  document.querySelector('#checkMatching').addEventListener('click', () => {
    const answers = [...mount.querySelectorAll('[data-match]')].map(select => select.value);
    if (answers.some(answer => !answer)) return setTaskFeedback('还有档案没有完成配对。', 'error');
    answers.every((answer,index) => answer === station.task.rows[index].answer) ? finishTask(station) : consequence('至少有一条会师记录连接错误。注意区分会宁、将台堡以及三大主力胜利会合的月份。');
  });
  mount.querySelectorAll('[data-match]').forEach(select => select.addEventListener('change', () => {
    select.classList.toggle('has-value', Boolean(select.value));
    setTaskFeedback('');
  }));
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
    const actionButton = event.currentTarget;
    count = 0; remaining = station.task.seconds * 10; drawPlanks();
    actionButton.textContent = '点击铺设桥板';
    actionButton.onclick = null;
    const tap = () => {
      count += 1;
      document.querySelector('#bridgeCount').textContent = count;
      drawPlanks();
      if (count >= station.task.target) { clearInterval(activeTaskTimer); activeTaskTimer = null; finishTask(station); }
    };
    actionButton.addEventListener('click', tap);
    activeTaskTimer = setInterval(() => {
      if (!document.querySelector('#bridgeTime')) {
        clearInterval(activeTaskTimer); activeTaskTimer = null;
        return;
      }
      remaining -= 1;
      const timeNode = document.querySelector('#bridgeTime');
      if (timeNode) timeNode.textContent = `${(remaining / 10).toFixed(1)} 秒`;
      if (remaining <= 0) {
        clearInterval(activeTaskTimer); activeTaskTimer = null;
        actionButton.removeEventListener('click', tap);
        actionButton.textContent = '重新开始';
        consequence('通道未能及时铺通，主力渡河会受到影响。真正的行动还需要突击、铺板和火力掩护共同配合。');
        actionButton.addEventListener('click', () => renderBridgeTask(station, mount), {once:true});
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
  const panelOrder = ['facts','chain','words','task'];
  const panelNames = ['历史档案','因果链','精神线索','互动任务'];
  const panelIndex = Math.max(0, panelOrder.indexOf(id));
  document.querySelectorAll('.reading-tabs button').forEach(tab => tab.classList.toggle('is-active', tab.dataset.panel === id));
  document.querySelectorAll('.reading-panel').forEach(panel => panel.classList.toggle('is-active', panel.id === id));
  document.querySelector('#readingPanelCount').textContent = `${panelIndex + 1} / ${panelOrder.length}`;
  document.querySelector('#readingPanelName').textContent = panelNames[panelIndex];
  document.querySelector('#previousReadingPanel').disabled = panelIndex === 0;
  document.querySelector('#nextReadingPanel').textContent = panelIndex === panelOrder.length - 1 ? '返回路线 →' : '下一页 →';
}
document.querySelectorAll('.reading-tabs button').forEach(tab => tab.addEventListener('click', () => activatePanel(tab.dataset.panel)));
document.querySelector('#previousReadingPanel').addEventListener('click', () => {
  const order = ['facts','chain','words','task'];
  const current = order.findIndex(id => document.querySelector(`#${id}`).classList.contains('is-active'));
  if (current > 0) activatePanel(order[current - 1]);
  window.scrollTo(0,0);
});
document.querySelector('#nextReadingPanel').addEventListener('click', () => {
  const order = ['facts','chain','words','task'];
  const current = order.findIndex(id => document.querySelector(`#${id}`).classList.contains('is-active'));
  if (current < order.length - 1) activatePanel(order[current + 1]);
  else showView('route');
  window.scrollTo(0,0);
});

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

function renderFavorites() {
  document.querySelector('#favoriteSummary').textContent = `已获得 ${state.favorites.length} 条`;
  document.querySelector('#collectionEmpty').hidden = state.favorites.length > 0;
  const keywordMap = new Map(stations.flatMap(station => station.keywords.map(word => [word[0], {word, station}])));
  document.querySelector('#collectionList').innerHTML = state.favorites.map((item, index) => {
    const entry = keywordMap.get(item);
    if (!entry) return '';
    const wordIndex = entry.station.keywords.findIndex(word => word[0] === item);
    return `<details class="saved-card"><summary><div><span>SPIRIT CLUE ${String(index + 1).padStart(2,'0')} · ${entry.station.name}</span><strong>${item}</strong></div><b>＋</b></summary><div class="saved-detail"><p><i>历史证据</i>${spiritEvidence[entry.station.id][wordIndex]}</p><p><i>判断依据</i>${entry.word[1]}</p><small><i>今日行动</i>${entry.word[2]}</small></div></details>`;
  }).join('');
}

function renderSpiritKit() {
  const verifiedStations = stations.filter(station => state.completed.includes(station.id) && state.spiritJudgments[station.id]);
  const available = verifiedStations.flatMap(station => station.keywords.map(word => ({name:word[0],station:station.name})));
  state.spiritKit = state.spiritKit.filter(name => available.some(item => item.name === name)).slice(0,3);
  storage.setItem('sparkSpiritKit', JSON.stringify(state.spiritKit));
  const judgmentSummary = document.querySelector('#judgmentSummary');
  if (judgmentSummary) judgmentSummary.textContent = `已辨析 ${Object.keys(state.spiritJudgments).filter(id => state.spiritJudgments[id]).length} / 6 站`;
  document.querySelector('#kitCount').textContent = `${state.spiritKit.length} / 3`;
  document.querySelector('#kitSlots').innerHTML = Array.from({length:3}, (_,index) => state.spiritKit[index] ? `<button data-kit-remove="${state.spiritKit[index]}"><i>✦</i><strong>${state.spiritKit[index]}</strong><small>点击取出</small></button>` : `<div><i>${index + 1}</i><strong>等待装入</strong><small>选择一张精神卡</small></div>`).join('');
  document.querySelector('#kitOptions').innerHTML = available.map(item => `<button data-kit-add="${item.name}" ${state.spiritKit.includes(item.name) ? 'disabled' : ''}><span>${item.station}</span><strong>${item.name}</strong></button>`).join('') || '<p>完成站点任务并通过“精神辨析”后，线索将在这里出现。</p>';
  document.querySelectorAll('[data-kit-add]').forEach(button => button.addEventListener('click', () => {
    if (state.spiritKit.length >= 3) return toast('精神行囊最多装入三张卡');
    state.spiritKit.push(button.dataset.kitAdd); renderSpiritKit(); renderBadgesAndAchievement(); playTone('success');
  }));
  document.querySelectorAll('[data-kit-remove]').forEach(button => button.addEventListener('click', () => {
    state.spiritKit = state.spiritKit.filter(name => name !== button.dataset.kitRemove); renderSpiritKit(); renderBadgesAndAchievement();
  }));
}

function renderBadgesAndAchievement() {
  renderSpiritKit();
  const totalStars = stations.reduce((sum,station) => sum + (state.taskRecords[station.id]?.bestStars || 0),0);
  document.querySelector('#taskStarTotal').textContent = `${totalStars} / 18 星`;
  document.querySelector('#scoreLedger').innerHTML = stations.map(station => {
    const record = state.taskRecords[station.id];
    const scored = record && record.bestStars > 0;
    return `<article class="${scored ? 'scored' : ''}"><i>${String(station.id).padStart(2,'0')}</i><div><strong>${station.name}</strong><span>${scored ? starText(record.bestStars) : record ? '进行中 · ☆☆☆' : '尚未完成'}</span></div><small>${record ? `作答 ${record.attempts} 次` : '等待解锁'}</small></article>`;
  }).join('');
  document.querySelector('#badgeCount').textContent = `${state.completed.length} / 6`;
  document.querySelector('#badgeGrid').innerHTML = stations.map(station => {
    const earned = state.completed.includes(station.id);
    const record = state.taskRecords[station.id];
    return `<div class="spirit-badge ${earned ? 'earned' : ''}"><i>${earned ? '✦' : '·'}</i><strong>${station.spirit}</strong><small>${earned ? `${station.name} · ${record ? starText(record.bestStars) : ''}` : '尚未获得'}</small></div>`;
  }).join('');
  const stationStars = id => state.taskRecords[id]?.bestStars || 0;
  const judgmentCount = stations.filter(station => state.spiritJudgments[station.id]).length;
  const medals = [
    {name:'求实之章',mark:'实',earned:state.completed.includes(1) && state.completed.includes(2) && stationStars(1) + stationStars(2) >= 4,rule:'完成瑞金、遵义任务，两站合计至少4星'},
    {name:'智略之章',mark:'智',earned:state.completed.includes(2) && state.completed.includes(3) && stationStars(2) + stationStars(3) >= 4,rule:'完成遵义、赤水任务，两站合计至少4星'},
    {name:'勇毅之章',mark:'勇',earned:state.completed.includes(4) && state.completed.includes(5) && stationStars(4) + stationStars(5) >= 4,rule:'完成泸定、雪山草地任务，两站合计至少4星'},
    {name:'团结之章',mark:'合',earned:state.completed.includes(6) && state.highScore >= 60,rule:'完成会宁任务，十题远征最高达到60分'}
  ];
  const allCoreEarned = medals.every(medal => medal.earned);
  medals.push({name:'星火全章',mark:'星',earned:allCoreEarned && state.completed.length === 6 && state.highScore >= 80 && judgmentCount === 6 && state.spiritKit.length === 3,rule:'集齐前四章、完成六站辨析、远征达到80分，并选满三条精神行囊'});
  const nextGoal = [
    {index:0,progress:`瑞金、遵义已完成 ${[1,2].filter(id => state.completed.includes(id)).length}/2 站 · ${stationStars(1) + stationStars(2)}/4 星`},
    {index:1,progress:`遵义、赤水已完成 ${[2,3].filter(id => state.completed.includes(id)).length}/2 站 · ${stationStars(2) + stationStars(3)}/4 星`},
    {index:2,progress:`泸定、雪山草地已完成 ${[4,5].filter(id => state.completed.includes(id)).length}/2 站 · ${stationStars(4) + stationStars(5)}/4 星`},
    {index:3,progress:`会宁任务 ${state.completed.includes(6) ? '已完成' : '未完成'} · 十题远征 ${state.highScore}/60 分`},
    {index:4,progress:`核心奖章 ${medals.slice(0,4).filter(medal => medal.earned).length}/4 枚 · 辨析 ${judgmentCount}/6 站 · 远征 ${state.highScore}/80 分 · 行囊 ${state.spiritKit.length}/3`}
  ].find(goal => !medals[goal.index].earned);
  document.querySelector('#nextMedalGoal').innerHTML = nextGoal
    ? `<span>NEXT GOAL / 下一目标</span><strong>${medals[nextGoal.index].name}</strong><small>${nextGoal.progress}</small>`
    : '<span>ALL COMPLETE / 全部达成</span><strong>五枚挑战奖章已全部点亮</strong><small>你可以继续重做任务，刷新自己的最佳成绩。</small>';
  document.querySelector('#challengeMedalCount').textContent = `${medals.filter(medal => medal.earned).length} / 5`;
  document.querySelector('#challengeMedals').innerHTML = medals.map((medal,index) => `<article class="${medal.earned ? 'earned' : ''} ${index === medals.length - 1 ? 'final' : ''}"><i>${medal.earned ? medal.mark : '·'}</i><div><strong>${medal.name}</strong><p>${medal.rule}</p></div><span>${medal.earned ? '已获得' : '未解锁'}</span></article>`).join('');
  const achieved = medals[medals.length - 1].earned;
  const card = document.querySelector('#achievementCard');
  card.hidden = !achieved;
  if (achieved) {
    document.querySelector('#achievementMarks').innerHTML = medals.slice(0,4).map(medal => `<i title="${medal.name}">${medal.mark}</i>`).join('');
    document.querySelector('#achievementKit').innerHTML = `<span>任务挑战总成绩</span><strong>${totalStars}/18 星 · 十题远征 ${state.highScore}/100 分</strong>`;
    const selectedEntries = state.spiritKit.map(name => {
      const station = stations.find(item => item.keywords.some(word => word[0] === name));
      const word = station?.keywords.find(item => item[0] === name);
      return word ? `<article><i>✦</i><div><strong>${word[0]}</strong><p>${word[2]}</p></div></article>` : '';
    }).join('');
    document.querySelector('#achievementClues').innerHTML = selectedEntries || '<p class="achievement-clues-empty">从“我的精神行囊”选择三条线索后，这里将生成你的专属行动印记。</p>';
  }
}

const questions = [
  {id:1,station:'瑞金出发',q:'材料：“第五次反‘围剿’失败，中央苏区形势日益严峻。”由此推断，中央红军实行战略转移首先要解决什么问题？',a:['保存革命力量，摆脱被动局面','立即同所有敌军进行决战','留在原地等待形势自行改变'],correct:0,e:'战略转移是在严重危机下保存革命力量、寻找新道路的主动选择。'},
  {id:2,station:'瑞金出发',q:'将下列事件按因果顺序排列：①中央红军踏上长征路 ②第五次反“围剿”失利 ③中央苏区形势严峻 ④决定实行战略转移。',a:['②③④①','③②①④','②④③①'],correct:0,e:'反“围剿”失利使形势严峻，继而作出战略转移决定，最后付诸行动。'},
  {id:3,station:'瑞金出发',q:'有人说：“离开根据地就是放弃理想。”结合长征出发背景，哪一项反驳最有说服力？',a:['地点改变不等于目标改变，转移是为了保存力量继续斗争','只要出发得足够快，任何决定都正确','所有战略转移都会自动取得胜利'],correct:0,e:'判断是否坚定理想，要看根本目标是否坚持，而不能只看行动地点是否改变。'},
  {id:4,station:'瑞金出发',q:'出发时运输能力有限，必须减少不必要的辎重。这一选择最能说明长期行动首先需要什么？',a:['在目标与条件之间分清轻重缓急','尽量携带所有物品以避免取舍','只考虑眼前方便，不考虑后续路程'],correct:0,e:'资源有限时要围绕核心目标作出取舍，这既是判断力也是责任。'},
  {id:5,station:'瑞金出发',q:'小组项目遇到困难，哪种做法与长征出发体现的方法最接近？',a:['保留共同目标，重新评估条件并调整计划','因为原计划受阻而立即放弃目标','不分析原因，只把任务量继续增加'],correct:0,e:'坚定不是机械重复，而是在现实条件下继续寻找通向目标的道路。'},
  {id:6,station:'遵义会议',q:'遵义会议前，红军在长征初期遭受严重损失。会议首先总结经验、纠正错误，这说明转折产生的关键条件是什么？',a:['正视事实并根据实际调整领导和方法','暂时隐藏问题以保持表面一致','等到困难完全消失后再作决定'],correct:0,e:'遵义会议的重要启示是从实际出发，敢于总结失误并及时纠正。'},
  {id:7,station:'遵义会议',q:'下列哪组关系最准确地概括遵义会议的作用？',a:['危急局面—总结经验—调整领导—实现转折','物资充足—举行会议—停止行军—长征结束','路线顺利—拒绝讨论—维持原状—取得胜利'],correct:0,e:'会议发生在危急关头，通过总结经验和调整领导，使革命事业出现重要转折。'},
  {id:8,station:'遵义会议',q:'“坚持正确目标”与“纠正错误方法”之间是什么关系？',a:['二者可以统一，纠错是为了更好实现目标','二者互相矛盾，调整方法就是动摇目标','二者毫无关系，方法不会影响结果'],correct:0,e:'实事求是要求根据实际修正方法，这恰恰服务于坚定的目标。'},
  {id:9,station:'遵义会议',q:'如果只有“遵义会议召开于1935年1月”这一信息，尚不能直接证明它是生死攸关的转折。还需要哪类证据？',a:['会前困境、会议调整及会后局势变化','会议所在建筑的颜色和面积','参会人员当天的饮食清单'],correct:0,e:'判断历史事件意义，需要把背景、决策内容和后续影响连接起来。'},
  {id:10,station:'遵义会议',q:'学习方案连续两周效果不佳。哪种处理同时体现“独立自主”和“实事求是”？',a:['分析错因，参考建议后按自身情况调整','照搬同学方法，不检查是否适合自己','拒绝所有建议，也拒绝查看学习数据'],correct:0,e:'独立自主不是拒绝意见，而是在尊重事实的基础上形成自己的判断。'},
  {id:11,station:'四渡赤水',q:'地图上四渡赤水路线多次往返。如果只凭路线曲折就断定“红军迷失方向”，这一判断忽略了什么？',a:['敌军部署不断变化，路线调整具有战略目的','直线距离永远比安全和主动更重要','所有曲折路线都来自地图绘制误差'],correct:0,e:'路线要结合敌我态势解释；曲折机动是为了调动敌军、寻找战机。'},
  {id:12,station:'四渡赤水',q:'敌军判断红军将向北，红军却突然转向并再次渡河。这种行动主要利用了什么？',a:['制造信息差，使敌军部署落后于红军行动','固定路线，让敌军更容易预判','停止侦察，把结果完全交给运气'],correct:0,e:'灵活机动通过改变方向打乱敌军判断，从而争取主动。'},
  {id:13,station:'四渡赤水',q:'从“四渡赤水—南渡乌江—威逼贵阳—进军云南—巧渡金沙江”可以概括出怎样的行动逻辑？',a:['连续调动敌军，在运动中创造摆脱包围的机会','始终选择距离最短的直线路线','每次改变方向都意味着更换最终目标'],correct:0,e:'一系列机动围绕摆脱围追堵截这一目标展开，方法变化而目标稳定。'},
  {id:14,station:'四渡赤水',q:'面对三条路线：甲路最短但敌军集中，乙路较远但防守薄弱，丙路补给较好但已被识破。最符合四渡赤水思维的是？',a:['结合敌情与时机选择乙路，并随变化继续调整','只按距离选择甲路，不考虑敌军部署','坚持丙路，因为补给条件永远最重要'],correct:0,e:'战略判断不能只看单一条件，要综合敌情、时机、补给和目标。'},
  {id:15,station:'四渡赤水',q:'下列哪项最能证明四渡赤水不是“无计划地改变方向”？',a:['多次机动最终帮助红军跳出重兵包围','路线在地图上留下许多弯曲线段','行军经过了不同省份和河流'],correct:0,e:'判断行动是否有效，应看变化是否服务于目标以及最终结果。'},
  {id:16,station:'飞夺泸定桥',q:'红军需要迅速夺取泸定桥，根本原因是后有追兵、前有大渡河阻隔。这说明桥梁在行动中具有什么作用？',a:['控制关键通道，关系主力能否继续前进','只具有纪念意义，不影响行军','主要用于缩短会议时间'],correct:0,e:'泸定桥是跨越大渡河的重要通道，关系全军后续行动。'},
  {id:17,station:'飞夺泸定桥',q:'突击队攀桥、火力掩护、后续部队跟进三者之间最准确的关系是？',a:['分工不同但目标一致，缺少一环都会增加失败风险','突击队行动足以取代所有协同','后续部队只在胜利后出现，与夺桥无关'],correct:0,e:'飞夺泸定桥体现的不只是个人勇敢，也是明确分工下的集体协同。'},
  {id:18,station:'飞夺泸定桥',q:'如果突击速度很快，但掩护力量没有及时到位，最可能出现什么结果？',a:['突击队暴露在火力下，整体成功率下降','速度可以自动弥补所有协同缺口','后续部队无需过桥也能完成任务'],correct:0,e:'复杂任务中，局部速度必须与整体协同配合，不能只追求单项表现。'},
  {id:19,station:'飞夺泸定桥',q:'“明知危险仍然行动”并不等于盲目冒险。区分二者的关键是什么？',a:['是否有明确目标、必要性判断和协同准备','行动者是否完全感觉不到害怕','行动过程是否足够引人注目'],correct:0,e:'勇敢建立在责任、判断和准备之上；忽视条件的冲动不是勇敢。'},
  {id:20,station:'飞夺泸定桥',q:'班级限时完成一项复杂任务，哪种安排最接近飞夺泸定桥体现的协作方式？',a:['按能力分工、同步信息，并为关键环节提供支援','所有人重复同一工作，避免承担不同责任','让一名同学完成全部工作，其他人等待结果'],correct:0,e:'有效协作需要明确分工、相互支援和围绕共同目标同步行动。'},
  {id:21,station:'雪山草地',q:'雪山严寒缺氧，草地泥泞且补给困难。两种环境不同，却共同考验了红军的什么能力？',a:['在极端条件下保持组织、互助与持续行动','依靠固定方案解决所有环境问题','只凭个人体力而不需要集体支持'],correct:0,e:'环境不同，困难也不同，但都需要坚韧、组织和互助。'},
  {id:22,station:'雪山草地',q:'某队伍要穿越人烟稀少地区。若只能优先保障一项方案，哪项最符合长距离行军需要？',a:['控制负重并统筹食物、保暖、救护和队伍互助','把物资平均分成许多无关小类，不设优先级','只准备出发当天的食物，不考虑后续补给'],correct:0,e:'长距离行动需要统筹基本生存、医疗、气候和团队状况。'},
  {id:23,station:'雪山草地',q:'“把大目标拆成一个个可完成的小目标”为什么能帮助穿越长期困难？',a:['能持续确认进展、分配体力并及时调整','能让困难在没有行动时自动消失','能保证每一步都不会遇到任何风险'],correct:0,e:'分解目标不能消除风险，但有助于稳定节奏、观察进展和坚持行动。'},
  {id:24,station:'雪山草地',q:'同伴因疲劳掉队。只强调“每个人自己坚持”有什么局限？',a:['忽视团队成员相互依赖，可能削弱整体行动能力','能够确保队伍速度始终达到最快','可以减少所有人的物资消耗'],correct:0,e:'长征中的互助说明，集体坚韧不仅是个人意志，也是彼此支撑。'},
  {id:25,station:'雪山草地',q:'比较“困难很多所以无法前进”和“困难很多所以更要规划、互助”。两者最根本的差别是什么？',a:['是否把困难转化为需要分析和解决的问题','是否承认困难客观存在','是否知道雪山草地的名称'],correct:0,e:'长征精神不是否认困难，而是正视困难并组织行动克服困难。'},
  {id:26,station:'会宁会师',q:'红一、红二、红四方面军出发地点和行军路线不同，却最终会师。这一事实最能说明什么？',a:['共同目标能够凝聚经历和路径不同的力量','路线不同必然导致目标互相冲突','只有完全相同的经历才能形成团结'],correct:0,e:'团结并不要求过程完全相同，而是建立在共同理想和大局意识上。'},
  {id:27,station:'会宁会师',q:'下列事件按时间先后排序正确的是：①会宁会师 ②遵义会议 ③中央红军从瑞金等地出发 ④飞夺泸定桥。',a:['③②④①','②③①④','③④②①'],correct:0,e:'1934年出发，1935年1月遵义会议，1935年5月飞夺泸定桥，1936年10月会师。'},
  {id:28,station:'会宁会师',q:'为什么不能把长征简单理解为“中央红军从瑞金走到会宁的一条线”？',a:['多支红军从不同根据地出发，路线与到达时间各不相同','因为历史地图不能画出任何行军路线','因为所有红军始终沿完全相同的道路行军'],correct:0,e:'长征包括红一、红二、红四方面军和红二十五军等多支队伍的战略转移。'},
  {id:29,station:'会宁会师',q:'“会师”不仅是地理上的相遇。结合长征全程，它还意味着什么？',a:['分散力量重新汇聚，共同目标和大局意识得到体现','各支队伍从此不再需要任何分工','此前不同路线和历史经历失去意义'],correct:0,e:'会师体现力量汇聚与团结胜利，但并不抹去各支队伍不同的长征经历。'},
  {id:30,station:'会宁会师',q:'四支队伍路线图和六站研学路线看起来不同。面对这种差异，最合理的解释是？',a:['六站是学习用代表性节点，四支队伍路线呈现更完整的历史全景','两张图中必有一张完全错误','六站路线已经包含所有队伍经过的每一个地点'],correct:0,e:'学习路线经过筛选，帮助理解关键节点；它不能代替完整历史路线。'}
];

let quizSession = [];
let quizIndex = 0;
let score = 0;
let sessionWrong = [];
let quizCurrentOptions = [];
let quizMode = 'random';

function shuffled(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function renderQuizStatus() {
  document.querySelector('#quizHighScore').textContent = state.highScore;
  document.querySelector('#wrongQuestionCount').textContent = state.wrongQuestions.length;
  const wrongButton = document.querySelector('#startWrongReview');
  wrongButton.disabled = state.wrongQuestions.length === 0;
  wrongButton.textContent = state.wrongQuestions.length ? `错题专项练习 · ${state.wrongQuestions.length} 题` : '暂无错题';
}

function startQuiz(pool = questions, limit = 10, mode = 'random') {
  quizMode = mode;
  quizSession = shuffled(pool).slice(0, Math.min(limit, pool.length));
  quizIndex = 0;
  score = 0;
  sessionWrong = [];
  document.querySelector('#score').textContent = '0';
  document.querySelector('#quizResult').hidden = true;
  document.querySelector('#question').hidden = false;
  document.querySelector('#quizOptions').hidden = false;
  document.querySelector('#quizExplain').hidden = false;
  renderQuizStatus();
  renderQuestion();
}

function renderQuestion() {
  const item = quizSession[quizIndex];
  quizCurrentOptions = shuffled(item.a.map((answer,index) => ({answer,correct:index === item.correct})));
  document.querySelector('#questionNo').textContent = quizIndex + 1;
  document.querySelector('#questionTotal').textContent = quizSession.length;
  document.querySelector('#quizProgress').style.width = `${quizIndex / quizSession.length * 100}%`;
  document.querySelector('#quizStation').textContent = `${item.station} · QUESTION ${String(item.id).padStart(2,'0')}`;
  document.querySelector('#question').textContent = item.q;
  document.querySelector('#quizExplain').textContent = '';
  document.querySelector('#nextQuestion').hidden = true;
  document.querySelector('#quizOptions').innerHTML = quizCurrentOptions.map((option,index) => `<button data-index="${index}" data-correct="${option.correct}">${String.fromCharCode(65 + index)}. ${option.answer}</button>`).join('');
  document.querySelectorAll('#quizOptions button').forEach(button => button.addEventListener('click', answerQuestion));
}

function answerQuestion(event) {
  const selected = Number(event.currentTarget.dataset.index);
  const item = quizSession[quizIndex];
  const correct = quizCurrentOptions[selected].correct;
  document.querySelectorAll('#quizOptions button').forEach(button => button.disabled = true);
  event.currentTarget.classList.add(correct ? 'correct' : 'wrong');
  if (!correct) {
    document.querySelector('#quizOptions button[data-correct="true"]').classList.add('correct');
    sessionWrong.push(item.id);
    if (!state.wrongQuestions.includes(item.id)) state.wrongQuestions.push(item.id);
  } else {
    score += 10;
    state.wrongQuestions = state.wrongQuestions.filter(id => id !== item.id);
  }
  storage.setItem('sparkWrongQuestions', JSON.stringify(state.wrongQuestions));
  renderQuizStatus();
  document.querySelector('#score').textContent = score;
  document.querySelector('#quizExplain').textContent = item.e;
  document.querySelector('#nextQuestion').hidden = false;
  document.querySelector('#nextQuestion').innerHTML = quizIndex === quizSession.length - 1 ? '查看结果 <span>→</span>' : '下一题 <span>→</span>';
}

function finishQuiz() {
  const previousHighScore = state.highScore;
  if (quizMode === 'random') state.highScore = Math.max(state.highScore, score);
  storage.setItem('sparkHighScore', state.highScore);
  document.querySelector('#quizProgress').style.width = '100%';
  document.querySelector('#question').hidden = true;
  document.querySelector('#quizOptions').hidden = true;
  document.querySelector('#quizExplain').hidden = true;
  document.querySelector('#nextQuestion').hidden = true;
  const result = document.querySelector('#quizResult');
  result.hidden = false;
  const percent = quizSession.length ? Math.round(score / (quizSession.length * 10) * 100) : 0;
  const evaluation = percent >= 90 ? '理解扎实，能够根据材料作出判断。' : percent >= 80 ? '已达到最终奖章的挑战要求。' : percent >= 60 ? '基础达标，建议继续复习错题中的因果关系。' : '建议回到六站档案，再阅读史实和因果链。';
  result.innerHTML = `<span>${quizMode === 'wrong' ? 'WRONG ANSWER REVIEW' : 'CHALLENGE COMPLETE'}</span><strong>${score}</strong><p>本次得分 · 满分 ${quizSession.length * 10}<br>${evaluation}<br>本轮答错 ${sessionWrong.length} 题 · 待复习 ${state.wrongQuestions.length} 题 · 历史最高 ${state.highScore}</p><div><button id="restartQuiz">重新抽取10题</button><button id="retryWrong" ${state.wrongQuestions.length ? '' : 'disabled'}>错题重练 ${state.wrongQuestions.length}</button></div>`;
  document.querySelector('#restartQuiz').addEventListener('click', () => startQuiz());
  document.querySelector('#retryWrong').addEventListener('click', () => {
    const pool = questions.filter(item => state.wrongQuestions.includes(item.id));
    if (pool.length) startQuiz(pool, pool.length, 'wrong');
  });
  renderQuizStatus();
  renderBadgesAndAchievement();
  const resultMessage = quizMode === 'wrong' ? `错题复习完成，剩余 ${state.wrongQuestions.length} 题` : state.highScore > previousHighScore ? `挑战完成：刷新最高分 ${state.highScore}` : `挑战完成：${score} 分`;
  toast(resultMessage);
}

document.querySelector('#nextQuestion').addEventListener('click', () => {
  if (quizIndex < quizSession.length - 1) { quizIndex += 1; renderQuestion(); }
  else finishQuiz();
});

document.querySelector('#startWrongReview').addEventListener('click', () => {
  const pool = questions.filter(item => state.wrongQuestions.includes(item.id));
  if (pool.length) startQuiz(pool, pool.length, 'wrong');
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
  if (window.location.protocol === 'file:') {
    status.textContent = '应用资源已随安装包保存，无需联网即可使用';
    return;
  }
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
