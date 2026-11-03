const challenges=[
  {id:'score',title:'分数统计',tag:'桶计数',file:'score.cpp',hint:'格式：第一行 n m；第二行 n 个分数。',input:'5 10\n10 8 8 3 10',code:`#include <bits/stdc++.h>
using namespace std;
int main(){
    int cnt[1010] = {}, n, m, t;
    cin >> n >> m;
    for(int i = 1; i <= n; i++){
        cin >> t;
        cnt[t]++;
    }
    for(int i = 0; i <= m; i++)
        cout << cnt[i] << " ";
    return 0;
}`},
  {id:'cover',title:'区间覆盖',tag:'状态标记',file:'cover.cpp',hint:'格式：第一行区间数 n；随后每行 l r，端点均计入。',input:'3\n1 3\n3 5\n8 9',code:`#include <bits/stdc++.h>
using namespace std;
int main(){
    int n, l, r, a[10010] = {};
    cin >> n;
    while(n--){
        cin >> l >> r;
        for(int i = l; i <= r; i++) a[i] = 1;
    }
    int cnt = 0;
    for(int i = 0; i <= 10000; i++)
        if(a[i] == 1) cnt++;
    cout << cnt;
}`},
  {id:'shop',title:'智慧购物',tag:'最小值',file:'shopping.cpp',hint:'格式：第一行种类数 m、商品数 n；随后每行种类 k、价格 p。',input:'3 6\n1 12\n2 8\n1 9\n3 15\n2 6\n3 10',code:`#include <bits/stdc++.h>
using namespace std;
int main(){
    int a[100010] = {}, m, n;
    cin >> m >> n;
    for(int i = 1; i <= n; i++){
        int k, p; cin >> k >> p;
        if(a[k] == 0 || a[k] > p) a[k] = p;
    }
    int sum = 0;
    for(int i = 1; i <= m; i++) sum += a[i];
    cout << sum;
}`},
  {id:'char',title:'最多字符',tag:'字符映射',file:'frequency.cpp',hint:'格式：输入一个只含小写字母的非空字符串；同频时输出最后出现者。',input:'abacbc',code:`#include <bits/stdc++.h>
using namespace std;
int main(){
    string s; cin >> s;
    int cnt[30] = {};
    for(char ch : s) cnt[ch - 'a']++;
    int maxx = 0; char ans;
    for(char ch : s){
        if(cnt[ch - 'a'] >= maxx){
            maxx = cnt[ch - 'a']; ans = ch;
        }
    }
    cout << ans;
}`},
  {id:'odd',title:'输出奇数',tag:'vector',file:'odd.cpp',hint:'格式：第一行 n；第二行 n 个整数。负奇数也会保留。',input:'7\n2 -3 4 7 8 11 12',code:`#include <bits/stdc++.h>
using namespace std;
int main(){
    vector<int> a; int n, t; cin >> n;
    for(int i = 0; i < n; i++){
        cin >> t;
        if(t % 2 != 0) a.push_back(t);
    }
    bool first = true;
    for(int x : a){
        if(!first) cout << ",";
        cout << x; first = false;
    }
}`}
];

const list=document.querySelector('#challenge-list');
const code=document.querySelector('#portal-code');
const input=document.querySelector('#stdin');
const output=document.querySelector('#output');
const fileName=document.querySelector('#file-name');
const hint=document.querySelector('#input-hint');
const status=document.querySelector('#run-status');
let active=challenges[0];

function selectChallenge(item){
  active=item; code.textContent=item.code; input.value=item.input;
  fileName.textContent=item.file; hint.textContent=item.hint;
  output.textContent='等待运行…'; status.textContent='READY';
  document.querySelectorAll('.challenge').forEach(btn=>btn.classList.toggle('active',btn.dataset.id===item.id));
}
challenges.forEach(item=>{
  const button=document.createElement('button'); button.className='challenge'; button.dataset.id=item.id;
  button.innerHTML=`<b>${item.title}</b>${item.tag}`; button.addEventListener('click',()=>selectChallenge(item)); list.append(button);
});

function numbers(raw){return raw.trim().split(/\s+/).filter(Boolean).map(Number)}
function simulate(id,raw){
  if(!raw.trim())throw new Error('请输入测试数据');
  if(id==='char'){
    const s=raw.trim().split(/\s+/)[0]; if(!/^[a-z]+$/.test(s))throw new Error('请输入纯小写字母字符串');
    const count={}; for(const ch of s)count[ch]=(count[ch]||0)+1;
    let best=-1,ans=''; for(const ch of s)if(count[ch]>=best){best=count[ch];ans=ch} return ans;
  }
  const a=numbers(raw); if(a.some(Number.isNaN))throw new Error('输入中含有非数字内容');
  if(id==='score'){
    const [n,m,...values]=a;if(values.length<n)throw new Error(`还缺 ${n-values.length} 个分数`);
    const cnt=Array(Math.max(0,m)+1).fill(0);values.slice(0,n).forEach(x=>{if(x>=0&&x<=m)cnt[x]++});return cnt.join(' ');
  }
  if(id==='cover'){
    const [n,...v]=a;if(v.length<n*2)throw new Error('区间端点数量不足');const seen=new Set();
    for(let j=0;j<n;j++){let l=v[j*2],r=v[j*2+1];if(l>r)[l,r]=[r,l];for(let x=l;x<=r;x++)seen.add(x)}return String(seen.size);
  }
  if(id==='shop'){
    const [m,n,...v]=a;if(v.length<n*2)throw new Error('商品数据数量不足');const best=Array(m+1).fill(0);
    for(let j=0;j<n;j++){const k=v[j*2],p=v[j*2+1];if(k>=1&&k<=m&&(best[k]===0||best[k]>p))best[k]=p}return String(best.slice(1).reduce((x,y)=>x+y,0));
  }
  if(id==='odd'){
    const [n,...v]=a;if(v.length<n)throw new Error(`还缺 ${n-v.length} 个整数`);return v.slice(0,n).filter(x=>x%2!==0).join(',');
  }
}

document.querySelector('#run-code').addEventListener('click',()=>{
  status.textContent='RUNNING'; output.textContent='';
  setTimeout(()=>{try{output.textContent=simulate(active.id,input.value);status.textContent='SUCCESS'}catch(error){output.textContent=`输入错误：${error.message}`;status.textContent='ERROR'}},180);
});
document.querySelector('#copy-code').addEventListener('click',async event=>{
  try{await navigator.clipboard.writeText(active.code);event.currentTarget.textContent='已复制'}catch{event.currentTarget.textContent='复制失败'}
  setTimeout(()=>event.currentTarget.textContent='复制代码',1200);
});
document.querySelectorAll('[data-code-tab]').forEach(button=>button.addEventListener('click',()=>{
  const tab=button.dataset.codeTab;document.querySelectorAll('[data-code-tab]').forEach(x=>x.classList.toggle('active',x===button));
  document.querySelectorAll('[data-code-panel]').forEach(panel=>panel.hidden=panel.dataset.codePanel!==tab);
}));
addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;document.querySelector('#progress').style.width=`${max?scrollY/max*100:0}%`},{passive:true});
selectChallenge(active);
