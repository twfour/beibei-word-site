const questions=[
{cat:'校园生活',title:'给 Jack 介绍半学期的校园生活',prompt:'假如你是李华，你的英国好友 Jack 想了解你的校园生活。请写一封信，介绍这半个学期的学校生活；包含日常活动、最喜欢的学科与老师，以及遇到的问题。',req:['书信','约 70 词','要点完整'],model:`Dear Jack,
How time flies! I am enjoying my first term at junior high school. We do morning exercises every day, and I often play football with my classmates after school. My favourite subject is Chinese because our teacher tells us many interesting stories. However, I sometimes have too much homework and find maths difficult. I am learning to make a study plan, so things are getting better. School life is busy but colourful.
Love from,
Li Hua`,phrases:['find … difficult','make a study plan','busy but colourful']},
{cat:'家庭与房间',title:'欢迎 Linda 来北京寄宿',prompt:'英国中学生 Linda 将来北京做交换生并住在吴越家。请以吴越的身份写邮件，介绍姓名、年龄、爱好、家庭成员，以及房间里至少三样物品的位置。',req:['邮件','约 80 词','位置介词'],model:`Dear Linda,
I’m happy to know that you’ll come to Beijing and live with us. My name is Wu Yue. Wu is my family name, and I am twelve years old. I enjoy reading and playing basketball. There are five people in my family: my grandparents, my parents and me. You will stay in my room. There is a photo above the bed, some books are on the desk, and a basketball is under the chair. I hope you will feel at home here!
Hope to see you soon!
Yours,
Wu Yue`,phrases:['family name','above the bed','feel at home']},
{cat:'交换生书信',title:'向 Tom 介绍家庭与学校',prompt:'英国笔友 Tom 下个月将作为交换生住进你家并成为你的同学。写邮件介绍你的家庭和学校生活，至少覆盖思维导图中的两项信息。',req:['邮件','约 70 词','至少两项'],model:`Dear Tom,
I’m so happy to hear that you’ll be coming next month! There are three people in my family. My father is a doctor and my mother is a teacher. They are both friendly and look forward to meeting you. Our school has a large library, which is my favourite place because I love reading. After class, I usually play basketball with my friends. I’m sure you will soon enjoy life here.
Yours,
Li Hua`,phrases:['look forward to','which is …','enjoy life here']},
{cat:'家庭与朋友',title:'“我爱我家”英语演讲',prompt:'你是 703 班的李华，13 岁，爱好篮球。为“我爱我家”英语演讲比赛写一篇演讲稿：完成自我介绍，并结合家庭照片介绍家庭成员。',req:['演讲稿','约 60 词','家庭照片'],model:`Hi, I’m Li Hua. I’m thirteen years old and I’m in Class 703. Playing basketball is my favourite hobby. Now, please look at this family photo. My father is a doctor and my mother teaches Chinese. The little boy beside me is my brother, and the girl with long hair is my sister. We also have a lovely dog called Coco. We often exercise together at weekends. I love my warm and cheerful family.
Thank you for listening!`,phrases:['please look at','beside me','warm and cheerful']},
{cat:'交换生书信',title:'回复 Eric 的交换生邮件',prompt:'美国笔友 Eric 将来你的学校学习一周并住在你家。回复邮件，介绍你的家人、学校环境和可以一起参加的课后活动。',req:['邮件','约 80 词','可补充细节'],model:`Dear Eric,
I’m so happy to hear that you will come here. There are four people in my family, and everyone is excited to meet you. My mother cooks delicious Chinese food, while my father enjoys talking about sport. Our school is large and clean, with a big playground and several interesting clubs. After class, we can join the music club or play football together. At the weekend, I would also like to show you around the city.
I am sure we will have fun together. See you soon!
Yours,
Li Ping`,phrases:['be excited to','show you around','have fun together']},
{cat:'自我介绍',title:'欢迎 Summer School 访学同学',prompt:'英国 Summer School 的同学来校访学。请以初中生李华的身份介绍自己的年龄、家庭、兴趣、最喜欢的学科和房间等信息。',req:['介绍信','约 80 词','信息完整'],model:`Dear girls and boys,
I’m Li Hua, a thirteen-year-old student. I live with my parents and my younger sister. I am friendly and active, and I enjoy reading and playing basketball in my free time. Science is my favourite subject because I love discovering how things work. My room is small but comfortable, with a bookcase beside the window and several basketball posters on the wall. I hope we can learn from one another and become good friends.
Best wishes,
Li Hua`,phrases:['in my free time','how things work','learn from one another']},
{cat:'家庭与朋友',title:'My Best Friend',prompt:'以“My Best Friend”为题，介绍你最好的朋友。内容应包含姓名、年龄、外貌、家庭、爱好等，可适当发挥。',req:['人物介绍','约 60 词','第三人称'],model:`My Best Friend
My best friend is Lucy, a cheerful thirteen-year-old girl with bright eyes and long hair. She lives with her parents and a younger brother. Lucy loves reading adventure stories and drawing animals. At weekends, we often visit the library or cycle in the park. She listens to me when I have a problem and always makes me laugh. I feel lucky to have such a kind and dependable friend.`,phrases:['a …-year-old girl','make me laugh','dependable friend']},
{cat:'自我介绍',title:'新生交流会自我介绍',prompt:'你是七年级学生李华。根据表格信息，在学校新生交流会上用英语介绍自己的年龄、性格、爱好和梦想。',req:['发言稿','约 60 词','条理清楚'],model:`Hi, there! My name is Li Hua and I’m twelve years old. I’m friendly and outgoing, so I enjoy meeting new people. In my spare time, I play basketball and read science books. My dream is to become a scientist because I want to discover new things and help others. I’m excited about junior high school and hope to make friends with all of you. Thank you!`,phrases:['in my spare time','my dream is to','be excited about']},
{cat:'家庭与朋友',title:'推荐“最美家庭”',prompt:'班级举行“The Most Beautiful Family”评选。请给英语老师张老师写推荐信，介绍家庭成员的外貌、性格、爱好和共同活动，并说明推荐理由。',req:['推荐信','60–80 词','说明理由'],model:`Dear Ms Zhang,
I would like to recommend my family for “The Most Beautiful Family”. My father is tall and humorous, and he enjoys reading. My mother has long hair and loves cooking for us. I am active and keen on sport. Although we are all busy, we share housework and spend time together every weekend. We often walk in the park and talk about our week. We always support one another, which makes our home full of love.
Yours,
Li Hua`,phrases:['be keen on','share housework','support one another']},
{cat:'校园生活',title:'校园生活（二）',prompt:'以李华的身份给英国好友 Jack 写信，介绍半学期的校园生活。须覆盖表格中的日常活动、喜欢的课程和校园生活感受等要点。',req:['书信','约 70 词','覆盖表格'],model:`Dear Jack,
How time flies! Junior high school is quite different from primary school. We have more subjects, but the lessons are interesting. English is my favourite because I can learn about other cultures. At lunchtime, I chat with my new friends, and after school we practise volleyball on the playground. I still worry about some difficult homework, but my teachers are always ready to help. Every day brings something new, and I really enjoy my school life.
Love from,
Li Hua`,phrases:['be different from','be ready to help','bring something new']},
{cat:'家庭与朋友',title:'“我爱我家”演讲（二）',prompt:'你是 703 班李华，13 岁，喜欢篮球。写“我爱我家”主题演讲稿，先自我介绍，再展示家庭照片并介绍家人。',req:['演讲稿','约 60 词','完整开合'],model:`Hi, I’m Li Hua. I’m thirteen and study in Class 703. I’m a big basketball fan. Here is a photo of my family. The man in glasses is my father, and the woman next to him is my mother. They are patient and caring. My little sister loves music, while I love sport. We sometimes have different ideas, but we always help each other. To me, home is the happiest place in the world.
Thank you for listening!`,phrases:['a big … fan','next to him','to me']},
{cat:'自我介绍',title:'竞选学校形象大使',prompt:'学校英语节招募“形象大使”。请以李华身份写竞选稿，介绍个人信息、爱好与两项优势，并表达当选后的态度。',req:['竞选稿','约 60 词','优势明确'],model:`Hello, everyone! My name is Li Hua. I hope to be the image ambassador of our school. I’m thirteen and enjoy English stories, music and basketball. I believe I am right for the role for two reasons. First, I speak English confidently and enjoy meeting visitors. Second, I am helpful and work well with others. If I am chosen, I will introduce our school warmly and listen carefully to everyone’s ideas. Please give me a chance. Thank you!`,phrases:['be right for','work well with','give me a chance']},
{cat:'情景对话',title:'带 Peter 参观房间',prompt:'放学后，Peter 应邀参观 Teng Fei 的房间。围绕房间里的宠物、物品位置和共同爱好编写不少于六句的英语对话。',req:['情景对话','不少于 6 句','位置与爱好'],model:`Peter: Your room looks great, Teng Fei. Is that your pet’s basket?
Teng Fei: Yes. My cat, Mimi, usually sleeps there.
Peter: Where is she now?
Teng Fei: She’s hiding in the box under my desk.
Peter: How cute! I can also see a basketball beside your chair.
Teng Fei: Basketball is my favourite sport. Do you play it?
Peter: Yes, I do. Shall we play after we finish our homework?
Teng Fei: That sounds like a great idea!`,phrases:['usually sleeps','beside your chair','shall we …?']},
{cat:'家庭与朋友',title:'介绍朋友 Peter',prompt:'根据表格写短文介绍朋友 Peter：包括姓名、国籍、年龄、学校班级、性格、爱好以及家庭成员等信息。',req:['人物介绍','约 70 词','表格信息'],model:`Hello, everyone! I’m Li Hua. I have a good friend called Peter Brown. He comes from Ireland and is thirteen years old. He studies in Class 5, Grade 7 at Sunshine Middle School. Peter is friendly and always treats others kindly. In his free time, he enjoys swimming and drawing. His father is a teacher, his mother is a doctor, and his six-year-old sister is very cute. The family also has a playful dog, and they care for one another.`,phrases:['called Peter Brown','in his free time','care for one another']},
{cat:'自我介绍',title:'申请加入英语俱乐部',prompt:'学校英语俱乐部招募成员。写一封英文自荐信，介绍个人信息、英语能力、爱好、性格和优势，并表达加入愿望。',req:['自荐信','约 70 词','个人优势'],model:`Hello, everyone! I’m Li Hua, a twelve-year-old student who would love to join the English Club. I have studied English for several years and can communicate confidently. I also enjoy playing the electric guitar because music helps me relax. I’m outgoing, responsible and willing to help classmates with their English. By joining the club, I hope to improve my speaking, take part in interesting activities and share ideas with other English lovers. Thank you for considering my application.`,phrases:['would love to','be willing to','consider my application']},
{cat:'自我介绍',title:'写给新外教 Tony 的自我介绍',prompt:'新外教 Tony 即将到班。写一篇自我介绍，帮助他快速了解你并融入班级；可介绍性格、爱好、喜欢的学科和班级特点。',req:['自我介绍','约 50 词','自然得体'],model:`Hello, Tony! My name is Li Hua. I’m a friendly and outgoing boy who enjoys reading and playing basketball. English is my favourite subject because it allows me to communicate with people around the world. Our class is warm and lively, and we often help one another. We are all looking forward to learning with you. Welcome to our class!`,phrases:['allows me to','around the world','look forward to']},
{cat:'自我介绍',title:'七年级新生李明的发言稿',prompt:'你是七年级新生李明。根据表格，在英语课上介绍自己的性格、爱好、最喜欢的学科、对新生活的感受和目标。',req:['发言稿','约 60 词','所有提示'],model:`Hello, everyone! My name is Li Ming. I’m happy to stand here to introduce myself. I’m quiet at first, but I’m also kind and helpful. Swimming is my favourite hobby because it keeps me fit. I like science best as every lesson answers a new question. I feel excited about junior high school, although it may sometimes be challenging. This term, I hope to make new friends and become more confident in English. Thank you!`,phrases:['quiet at first','keep me fit','although …']},
{cat:'交换生书信',title:'给 Jenny 介绍自己的近况',prompt:'新学期过半，给美国朋友 Jenny 写邮件。根据表格介绍国籍、年龄、学校班级、校园设施、喜欢的运动和食物、父母职业及校园感受。',req:['邮件','60–80 词','信息完整'],model:`Dear Jenny,
I’m Li Hua, a thirteen-year-old student from China. I’m in Class 4, Grade 7 at Sunshine Middle School. Our school has two libraries, a dining hall and a large playground. Tennis is my favourite sport because it is exciting, and I also enjoy apples, rice and milk. My father is a teacher and my mother is a doctor. I’m happy here because my teachers and classmates are friendly. What is your school like?
I’m looking forward to your reply.
Yours,
Li Hua`,phrases:['a …-year-old student','what is … like?','look forward to']},
{cat:'交换生书信',title:'向 Tom 介绍生活（二）',prompt:'Tom 下月将作为交换生住进你家并和你成为同学。写邮件介绍家庭与学校生活，至少选择思维导图中的两项并适当发挥。',req:['邮件','约 70 词','至少两项'],model:`Dear Tom,
I’m delighted that you’ll stay with us next month. My parents are easy-going, and my younger brother is excited to meet you. We usually have dinner together and talk about our day. At school, you will find modern classrooms and many clubs. I belong to the football club, but we could also try the art club together. Don’t worry about being new—I’ll introduce you to my friends and help you settle in.
Yours,
Li Hua`,phrases:['be delighted that','belong to','settle in']},
{cat:'家庭与朋友',title:'推荐“最美家庭”（二）',prompt:'向张老师写推荐信，推荐自己的家庭参加“The Most Beautiful Family”评选。介绍成员特点、爱好、共同活动和互相关爱的表现。',req:['推荐信','60–80 词','推荐理由'],model:`Dear Ms Zhang,
I would like to recommend my family for “The Most Beautiful Family”. My father is humorous and loves books, while my mother is patient and enjoys cooking. I am an energetic sports lover. Every Sunday, we prepare lunch and clean the house together. When someone has a problem, the others listen and offer help. We may not be perfect, but kindness, respect and laughter fill our home. For these reasons, I believe my family deserves the title.
Yours,
Li Hua`,phrases:['while …','offer help','deserve the title']},
{cat:'自我介绍',title:'王梅的思维导图自我介绍',prompt:'假如你是王梅，根据思维导图介绍自己的姓名、年龄、家庭、兴趣、喜欢的学科和个人特点。须包含全部要点且不少于五句话。',req:['自我介绍','不少于 5 句','不得抄袭'],model:`My name is Wang Mei, and I’m twelve years old. I live with my parents and my elder brother. I’m a cheerful girl who is always ready to help others. I enjoy playing table tennis and listening to music after school. English is my favourite subject because I want to travel and make friends from different countries. At weekends, I often cook with my mother or visit the sports centre with my brother. I hope to become more independent this year.`,phrases:['be ready to','make friends from','become more independent']},
{cat:'家庭与朋友',title:'I Love My Family 公众号投稿',prompt:'为学校英语公众号投稿，从性格、爱好、共同活动三个方面介绍家人。结合图片内容，写“I Love My Family”主题短文。',req:['公众号投稿','60–80 词','三个方面'],model:`I Love My Family
Hello, everyone! I’m very happy to introduce my family to you. My father is friendly and loves playing basketball. My mother is patient, and growing flowers is her favourite hobby. My sister is creative and plays the guitar beautifully. I enjoy chess, so we all have different interests. At weekends, we often work in the garden, play games with our dog or prepare a meal together. These simple activities keep us close, and home is always full of laughter.`,phrases:['different interests','keep us close','full of laughter']},
{cat:'自我介绍',title:'王亚明在校报征集朋友',prompt:'新学期，王亚明想在新学校交朋友。为校报写一篇自我介绍，包含个人信息、性格、兴趣、擅长之处和对朋友的期待。',req:['校报投稿','不少于 60 词','征集朋友'],model:`Hello! My name is Wang Yaming, and I’m a new Grade 7 student. I’m friendly, curious and a little quiet when I first meet someone. I love reading detective stories and playing badminton. I’m also good at drawing, so I would be glad to design posters for school activities. I hope to meet a friend who is honest, positive and willing to try new things. If we share an interest, or if you simply want someone to talk to, please come and say hello!`,phrases:['when I first meet','be good at','come and say hello']},
{cat:'家庭与朋友',title:'李晨介绍自己的家庭',prompt:'假如你是李晨，根据思维导图介绍家庭成员、父母职业、兄弟情况和周末共同活动，并表达对家庭的感情。',req:['家庭介绍','不少于 60 词','全部信息'],model:`Hi, my name’s Li Chen. There are four people in my family: my parents, my brother and me. My father is a patient middle-school teacher, while my mother is a caring nurse. My brother and I are both students, although we study in different schools. At weekends, we enjoy spending time together. We may take a walk, play sport or watch an exciting film. My family always encourages me when life is difficult, so they are a very important part of my world.`,phrases:['there are …','spend time together','encourage me']},
{cat:'家庭与房间',title:'给 David 介绍自己与卧室',prompt:'给英国笔友 David 写邮件：介绍个人信息、家庭成员，并根据房间照片说明至少两样物品及其位置。',req:['邮件','约 60 词','至少两样物品'],model:`Dear David,
It’s lovely to write to you. I’m Li Hua, a fourteen-year-old student who enjoys basketball and music. There are six people in my family: my grandparents, my parents, my sister and me. My bedroom is small but tidy. My schoolbag is on the chair, and a lamp and several notebooks are on the desk. You can also see a guitar beside my bed. It is my favourite thing in the room. What is your bedroom like?
Yours,
Li Hua`,phrases:['it’s lovely to','small but tidy','beside my bed']},
{cat:'家庭与房间',title:'向 Tony 介绍家庭和房间',prompt:'Tony 将作为交换生在你家住两个月并使用你的房间。写信简单介绍家人，并根据图片详细介绍房间布局与物品位置。',req:['书信','约 60 词','详写房间'],model:`Dear Tony,
Welcome to my home. There are four people in my family: my parents, my sister and me. Everyone is looking forward to meeting you. You will stay in my clean and comfortable bedroom. A family photo hangs above the bed. There are some books and a computer on the desk, while a football is under it. I have cleared a shelf in the bookcase for your things, so I hope you will feel at home.
Hope you will have a good time here!
Li Hua`,phrases:['hangs above','clear a shelf','feel at home']},
{cat:'交换生书信',title:'回复英国笔友 Paul',prompt:'李平收到新笔友 Paul 的邮件。回复时介绍居住地、年龄、家庭成员、整洁的房间、物品位置和最喜欢的运动，并向对方提问。',req:['邮件','约 60 词','回复并提问'],model:`Dear Paul,
I’m very pleased to receive your email. I’m thirteen and live in Hangzhou, China. There are four people in my family: my parents, my little brother and me. Both of my parents are teachers. I keep my room tidy, with my books in the bookcase and my keys on the desk. Basketball is my favourite sport, and I often play it after class. What do you enjoy doing in your free time? I hope to hear from you soon.
Best wishes,
Li Ping`,phrases:['be pleased to','keep my room tidy','hear from you']}
];

const categories=['全部',...new Set(questions.map(q=>q.cat))];
const list=document.querySelector('#question-list');
const nav=document.querySelector('#question-nav');
const filters=document.querySelector('#filters');
const resultCount=document.querySelector('#result-count');
const search=document.querySelector('#search');
let activeCategory='全部';

const escapeHtml=value=>value.replace(/[&<>"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[char]));
questions.forEach((q,index)=>{
  const number=String(index+1).padStart(2,'0');
  const article=document.createElement('article');
  article.className='question-card'; article.id=`q${index+1}`;
  article.dataset.search=`${q.cat} ${q.title} ${q.prompt} ${q.model}`.toLowerCase(); article.dataset.category=q.cat;
  article.innerHTML=`<div class="card-head"><span class="number">${number}</span><div><p class="category">${escapeHtml(q.cat)} / PET WRITING</p><h2>${escapeHtml(q.title)}</h2></div></div><div class="brief"><p class="prompt">${escapeHtml(q.prompt)}</p><div class="requirements">${q.req.map(item=>`<span>${escapeHtml(item)}</span>`).join('')}</div></div><div class="answer-wrap"><button class="answer-toggle" type="button" aria-expanded="false" aria-controls="answer-${index+1}"><span>PET 级写作范例</span><span><small>MODEL ANSWER</small> <i>＋</i></span></button><div class="answer" id="answer-${index+1}" hidden><p class="model">${escapeHtml(q.model)}</p><div class="answer-foot"><div class="phrases">${q.phrases.map(item=>`<span>${escapeHtml(item)}</span>`).join('')}</div><button class="copy" type="button">COPY 范文</button></div></div></div>`;
  list.append(article);
  nav.insertAdjacentHTML('beforeend',`<a href="#q${index+1}" aria-label="第${index+1}题">${number}</a>`);
});

categories.forEach((cat,index)=>filters.insertAdjacentHTML('beforeend',`<button class="filter${index===0?' active':''}" type="button" data-category="${cat}">${cat}</button>`));

function applyFilters(){
  const query=search.value.trim().toLowerCase(); let visible=0;
  document.querySelectorAll('.question-card').forEach(card=>{const show=(activeCategory==='全部'||card.dataset.category===activeCategory)&&(!query||card.dataset.search.includes(query));card.hidden=!show;if(show)visible++});
  resultCount.textContent=`${visible} / ${questions.length} 题`;
  document.querySelector('.empty')?.remove();
  if(!visible)list.insertAdjacentHTML('beforeend','<p class="empty">没有找到相关题目，换个关键词试试。</p>');
}
filters.addEventListener('click',event=>{const button=event.target.closest('.filter');if(!button)return;activeCategory=button.dataset.category;filters.querySelectorAll('.filter').forEach(item=>item.classList.toggle('active',item===button));applyFilters()});
search.addEventListener('input',applyFilters);
list.addEventListener('click',async event=>{
  const toggle=event.target.closest('.answer-toggle');
  if(toggle){const answer=document.getElementById(toggle.getAttribute('aria-controls'));const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));answer.hidden=open}
  const copy=event.target.closest('.copy');
  if(copy){const text=copy.closest('.answer').querySelector('.model').textContent;try{await navigator.clipboard.writeText(text);copy.textContent='COPIED ✓';setTimeout(()=>copy.textContent='COPY 范文',1500)}catch{copy.textContent='请手动复制'}}
});

const progress=document.querySelector('#progress-bar');
addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${max?scrollY/max*100:0}%`},{passive:true});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){nav.querySelectorAll('a').forEach(a=>a.classList.toggle('active',a.hash===`#${entry.target.id}`))}}),{rootMargin:'-25% 0px -65%'});
document.querySelectorAll('.question-card').forEach(card=>observer.observe(card));
document.querySelector('#back-top').addEventListener('click',event=>{event.preventDefault();scrollTo({top:0,behavior:'smooth'})});
applyFilters();
