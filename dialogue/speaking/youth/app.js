const methodMap=[
  ['01','释放心理','上台紧张、临时被点名','呼吸法、转移法、积极暗示'],
  ['02','会议发言','小组讨论、学生会议','观点组织与临场发言'],
  ['03','竞聘演说','班委、学生会、社团竞选','为什么＋凭什么＋干什么'],
  ['04','工作汇报','课堂展示、项目汇报、竞赛答辩','观点＋事实＋建议'],
  ['05','餐桌礼仪','欢迎、庆功、欢送、答谢','五点式／高＋谢＋祝'],
  ['06','述职报告','学生干部述职、优秀学生答辩','梳理、分类、提炼'],
  ['07','日常交际','正式介绍、实习沟通','二三一与五种聊天公式']
];

document.querySelector('#method-table').innerHTML=methodMap.map(item=>`<article class="method-row ${item[0]==='05'?'active':''}"><span>${item[0]}</span><h3>${item[1]}</h3><p>${item[2]}</p><b>${item[3]}</b>${item[0]==='05'?'<i>八场景已上线</i>':''}</article>`).join('');

const scenes={
  celebrate:{
    no:'01',title:'项目或竞赛庆功',context:'项目顺利结束后，代表团队向指导老师和队员致辞。',audience:'指导老师、项目成员、支持同学',tone:'有成绩感，但不把功劳都揽到自己身上',
    versions:{
      full:{label:'正式全文',time:'约 2 分钟',formula:'场＋益＋邀＋祝＋结',parts:[
        ['场','各位老师、同学，大家好。今天我们因为项目顺利完成聚在一起，我很荣幸能代表项目组说几句话。'],
        ['益','这次项目对我们来说，不只是一份最终成果。从最初确定方向，到中间反复修改方案，再到最后完成展示，我们真正经历了一次完整的团队协作。过程中有过意见不一致，也遇到过时间紧、任务重的困难，但大家没有把问题推给别人，而是一次次补位、调整，最后一起把事情做成了。'],
        ['邀','借这个机会，我想请大家一起把感谢送给指导老师。谢谢老师在关键节点帮我们校准方向，也谢谢每一位队员认真完成自己的部分。还要感谢那些没有站在台前、却为资料、设备和场地提供帮助的同学。'],
        ['祝','祝老师们工作顺利，也祝每位队员都能把这次项目中学到的判断、协作和坚持，带到下一次学习与比赛中。愿我们享受这次成绩，但不止步于这次成绩。'],
        ['结','再次谢谢大家。今天为共同完成的这件事庆祝，下一程，我们继续并肩努力。']
      ]},
      minute:{label:'1分钟版',time:'约 1 分钟',formula:'场＋益＋邀＋祝＋结',parts:[
        ['场','各位老师、同学，大家好。今天我们一起庆祝项目顺利完成。'],
        ['益','这次经历不仅带来了一份成果，也让我们学会了怎样在压力下分工、沟通和解决问题。'],
        ['邀','请允许我代表项目组，感谢指导老师在关键节点的帮助，也感谢每位队员一路认真投入、彼此补位。'],
        ['祝','祝老师们工作顺利，也祝大家把这次收获带进下一次挑战，取得更好的成绩。'],
        ['结','谢谢大家，愿我们记住这次并肩努力，也继续一起向前。']
      ]},
      quick:{label:'30秒应急版',time:'约 30 秒',formula:'高＋谢＋祝',parts:[
        ['高','今天能和大家一起庆祝项目完成，我特别高兴。'],
        ['谢','感谢老师一路指导，也感谢每位队员这段时间的投入和配合，这份成绩属于整个团队。'],
        ['祝','祝大家在接下来的学习和比赛中继续取得好成绩，我们下一次再一起把事情做好。']
      ]}
    }
  },
  welcome:{
    no:'02',title:'欢迎来访嘉宾',context:'代表学校、班级或学生组织，欢迎专家、老师或交流学生来访。',audience:'来访嘉宾、带队老师、参与学生',tone:'正式而不生硬，欢迎必须落到本次交流的具体意义',
    versions:{
      full:{label:'正式全文',time:'约 2 分钟',formula:'场＋益＋邀＋祝＋结',parts:[
        ['场','尊敬的各位老师、各位嘉宾，亲爱的同学们，大家好。非常欢迎各位来到我们学校参加今天的交流活动。我很荣幸代表参与活动的同学，向大家表示诚挚欢迎。'],
        ['益','对我们来说，这次来访不仅是一次见面，更是一次难得的学习机会。课堂和书本能帮助我们建立知识，而面对面的交流，可以让我们看到同一个问题还有不同的理解方式。我们也期待通过今天的分享，了解各位在学习、研究和实践中的真实经验。'],
        ['邀','接下来的活动中，希望同学们认真倾听、积极提问，也希望各位嘉宾不吝分享。我们已经为参观、交流和小组互动做了准备，期待大家在轻松、坦诚的氛围中充分沟通。'],
        ['祝','祝愿今天的活动顺利进行，也祝各位嘉宾在这里度过充实、愉快的一天。希望这次交流成为彼此进一步了解的开始，也为今后的合作留下更多可能。'],
        ['结','再次欢迎各位的到来。现在，让我们共同开启今天的交流。谢谢大家。']
      ]},
      minute:{label:'1分钟版',time:'约 1 分钟',formula:'场＋益＋邀＋祝＋结',parts:[
        ['场','尊敬的各位老师、嘉宾，亲爱的同学们，大家好。欢迎各位来到我们学校参加今天的交流活动。'],
        ['益','这次来访让我们有机会走出书本，了解不同的学习经验和思考方式。'],
        ['邀','希望同学们认真倾听、积极提问，也期待各位嘉宾与我们坦诚分享。'],
        ['祝','祝今天的活动顺利，也祝各位在这里度过充实愉快的一天，让这次见面成为更多交流的开始。'],
        ['结','再次欢迎大家的到来，谢谢。']
      ]},
      quick:{label:'30秒应急版',time:'约 30 秒',formula:'高＋谢＋祝',parts:[
        ['高','今天能代表同学们欢迎各位老师和嘉宾，我感到非常高兴。'],
        ['谢','感谢大家专程来到学校，与我们分享经验，也感谢老师们为这次活动所做的准备。'],
        ['祝','祝今天的交流顺利、充实，希望大家都能有所收获，也期待今后有更多见面的机会。']
      ]}
    }
  },
  farewell:{
    no:'03',title:'欢送老师或学姐',context:'老师、指导员或高年级学姐即将离开团队，由学生代表致欢送词。',audience:'被欢送者、老师、同学和团队成员',tone:'用具体共同经历表达感谢，不堆砌煽情词语',
    versions:{
      full:{label:'正式全文',time:'约 2 分钟',formula:'场＋益＋邀＋祝＋结',parts:[
        ['场','各位老师、同学，大家好。今天我们聚在一起，向即将离开团队的陈老师表达感谢与祝福。作为学生代表，我很珍惜这个机会，也有许多话想对您说。'],
        ['益','过去这段时间，您带给我们的不只是知识和任务安排。项目方向不清楚时，您帮助我们找到重点；展示前紧张时，您陪我们一遍遍修改；出现问题时，您先带着大家分析原因，而不是急着责备。正是这些具体时刻，让我们逐渐学会怎样认真做事、怎样与人合作，也怎样面对不够完美的自己。'],
        ['邀','今天，请允许我代表同学们向您认真地说一声谢谢。也想邀请在场的每一位同学，把从您身上学到的耐心、负责和专业，继续放进今后的学习与工作里。这样，您的影响就不会随着一次告别而结束。'],
        ['祝','祝您在新的岗位上一切顺利，继续做热爱的事情，也遇见更多值得投入的学生和伙伴。愿您工作有收获，生活有从容；无论走到哪里，都能记得这里始终有人惦念您。'],
        ['结','告别不是把共同经历留在过去，而是带着这份经历继续向前。陈老师，谢谢您。祝您一路顺遂，常回来看看。']
      ]},
      minute:{label:'1分钟版',time:'约 1 分钟',formula:'场＋益＋邀＋祝＋结',parts:[
        ['场','各位老师、同学，大家好。今天我们一起欢送即将离开团队的陈老师。'],
        ['益','您不仅教给我们知识，也在一次次项目修改和问题讨论中，教会我们认真、耐心和负责。'],
        ['邀','请允许我代表同学们向您说一声谢谢。我们也会把从您身上学到的东西，继续用在今后的学习和工作中。'],
        ['祝','祝您在新的岗位上一切顺利，工作有收获，生活有从容。'],
        ['结','陈老师，谢谢您陪伴我们走过这一段，祝您一路顺遂，也欢迎您常回来看看。']
      ]},
      quick:{label:'30秒应急版',time:'约 30 秒',formula:'高＋谢＋祝',parts:[
        ['高','今天能代表同学们为陈老师送行，我很荣幸，也很舍不得。'],
        ['谢','谢谢您一直耐心指导我们，在我们遇到困难时帮助我们找到方向。'],
        ['祝','祝您在新的岗位工作顺利、生活愉快。我们会记住您的教导，也欢迎您常回来看看。']
      ]}
    }
  }
};

Object.assign(scenes,window.youthExtraScenes||{});

const switcher=document.querySelector('#scene-switch');
const stage=document.querySelector('#scene-stage');
let activeScene='celebrate';
let activeVersion='full';

switcher.innerHTML=Object.entries(scenes).map(([key,scene],index)=>`<button type="button" role="tab" data-scene="${key}" class="${index===0?'active':''}"><span>${scene.no}</span><b>${scene.title}</b><small>${scene.context}</small></button>`).join('');

function renderScene(){
  const scene=scenes[activeScene];
  const version=scene.versions[activeVersion];
  stage.innerHTML=`<header class="stage-head"><div><span>SCENE ${scene.no}</span><h3>${scene.title}</h3><p>${scene.context}</p></div><dl><div><dt>听众</dt><dd>${scene.audience}</dd></div><div><dt>语气</dt><dd>${scene.tone}</dd></div></dl></header><div class="duration-tabs">${Object.entries(scene.versions).map(([key,item])=>`<button type="button" data-version="${key}" class="${key===activeVersion?'active':''}"><b>${item.label}</b><span>${item.time}</span></button>`).join('')}</div><div class="speech-layout"><aside><span>METHOD SOURCE</span><h4>原书第五章</h4><p>正式版本由“场＋益＋举＋祝＋干”迁移而来；将酒桌动作“举、干”改为青年正式场合中的“邀、结”。</p><div class="formula-badge">${version.formula}</div><a href="/dialogue/speaking/table/#toast">查看原方法 ↗</a></aside><div class="speech-copy"><div class="copy-toolbar"><span>${version.label} · ${version.time}</span><button type="button" id="copy-speech">复制全文</button></div>${version.parts.map(([tag,text])=>`<section><b>${tag}</b><p>${text}</p></section>`).join('')}<p class="delivery-note"><b>表达提醒</b> 不必背得一字不差。记住每个结构词后面的事实，现场按自己的语言说出来会更自然。</p></div></div>`;
  stage.querySelectorAll('[data-version]').forEach(button=>button.addEventListener('click',()=>{activeVersion=button.dataset.version;renderScene()}));
  document.querySelector('#copy-speech').addEventListener('click',async event=>{const text=version.parts.map(item=>item[1]).join('\n');try{await navigator.clipboard.writeText(text);event.currentTarget.textContent='已复制 ✓'}catch{event.currentTarget.textContent='请手动复制'}});
}

switcher.querySelectorAll('[data-scene]').forEach(button=>button.addEventListener('click',()=>{activeScene=button.dataset.scene;activeVersion='full';switcher.querySelectorAll('button').forEach(item=>item.classList.toggle('active',item===button));renderScene()}));
renderScene();
