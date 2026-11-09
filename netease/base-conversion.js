const challenges=[
  {id:'to-base',no:'01',title:'十进制转 r 进制',tag:'短除法',file:'to_base.cpp',question:'给定一个十进制非负整数 n 和目标进制 r，请输出 n 的 r 进制表示。当某一位的值大于 9 时，依次使用大写字母 A—F 表示 10—15。',inputFormat:'一行两个整数 n、r，满足 0 ≤ n，2 ≤ r ≤ 16。',outputFormat:'输出 n 转换后的 r 进制表示，不含前导零。',sample:'C2',hint:'输入：十进制非负整数 n 和目标进制 r（2—16），例如 194 16。',input:'194 16',code:`#include <bits/stdc++.h>
using namespace std;
char digit(int x){ return x < 10 ? char('0' + x) : char('A' + x - 10); }
int main(){
    long long n; int r;
    cin >> n >> r;
    if(n == 0){ cout << 0; return 0; }
    vector<int> a;
    while(n){
        a.push_back(n % r);
        n /= r;
    }
    for(int i = (int)a.size() - 1; i >= 0; i--)
        cout << digit(a[i]);
    return 0;
}`},
  {id:'palindrome',no:'02',title:'判断进制回文',tag:'对称比较',file:'palindrome.cpp',question:'把十进制非负整数 n 转换成 s 进制，然后判断转换结果是否为回文。回文是从左向右读和从右向左读完全相同的序列。',inputFormat:'一行两个整数 n、s，满足 0 ≤ n，2 ≤ s ≤ 16。',outputFormat:'若 s 进制表示是回文，输出 OK；否则输出 NO。',sample:'OK',hint:'输入：十进制非负整数 n 与进制 s，例如 585 2（输出 OK）。',input:'585 2',code:`#include <bits/stdc++.h>
using namespace std;
int main(){
    long long n; int s;
    cin >> n >> s;
    vector<int> a;
    if(n == 0) a.push_back(0);
    while(n){ a.push_back(n % s); n /= s; }
    for(int i = 0, j = (int)a.size() - 1; i < j; i++, j--){
        if(a[i] != a[j]){ cout << "NO"; return 0; }
    }
    cout << "OK";
    return 0;
}`},
  {id:'to-decimal',no:'03',title:'k 进制转十进制',tag:'位权累加',file:'to_decimal.cpp',question:'给定若干个 k 进制非负整数 s，把每个数转换成十进制。数字 10 以上使用大写字母表示；当读到 0 0 时结束，不处理该行。',inputFormat:'多行输入，每行包含字符串 s 和整数 k；最后一行为 0 0。',outputFormat:'每组数据输出一行，对应 s 的十进制值。',sample:'26\n617',hint:'每行输入进制数字 s 与进制 k；输入 0 0 结束。例如 1A 16。',input:'1A 16\n1151 8\n0 0',code:`#include <bits/stdc++.h>
using namespace std;
int value(char ch){ return isdigit(ch) ? ch - '0' : toupper(ch) - 'A' + 10; }
int main(){
    string s; int k;
    while(cin >> s >> k && !(s == "0" && k == 0)){
        long long ans = 0;
        for(char ch : s) ans = ans * k + value(ch);
        cout << ans << '\\n';
    }
    return 0;
}`},
  {id:'excel',no:'04',title:'Excel 表列序号',tag:'1-based 26 进制',file:'excel_column.cpp',question:'Excel 使用大写字母表示列名：A 对应第 1 列，Z 对应第 26 列，AA 对应第 27 列。给定一个列名，求它对应的列序号。',inputFormat:'输入一个只包含大写字母 A—Z 的字符串 s。',outputFormat:'输出一个整数，表示该 Excel 列名对应的序号。',sample:'28',hint:'输入一个大写 Excel 列名，例如 AB（输出 28）。',input:'AB',code:`#include <bits/stdc++.h>
using namespace std;
int main(){
    string s; cin >> s;
    long long ans = 0;
    for(char ch : s)
        ans = ans * 26 + (ch - 'A' + 1);
    cout << ans;
    return 0;
}`}
];

const list=document.querySelector('#challenge-list'),code=document.querySelector('#portal-code'),input=document.querySelector('#stdin'),output=document.querySelector('#output'),fileName=document.querySelector('#file-name'),hint=document.querySelector('#input-hint'),status=document.querySelector('#run-status'),runButton=document.querySelector('#run-code'),problemTag=document.querySelector('#problem-tag'),problemTitle=document.querySelector('#problem-title'),problemBody=document.querySelector('#problem-body'),problemInput=document.querySelector('#problem-input'),problemOutput=document.querySelector('#problem-output'),problemSample=document.querySelector('#problem-sample'),drafts=new Map();let active=challenges[0];
function selectChallenge(item){if(active)drafts.set(active.id,code.value);active=item;code.value=drafts.get(item.id)||item.code;input.value=item.input;fileName.textContent=item.file;hint.textContent=item.hint;problemTag.textContent=item.no;problemTitle.textContent=item.title;problemBody.textContent=item.question;problemInput.textContent=item.inputFormat;problemOutput.textContent=item.outputFormat;problemSample.textContent=item.sample;output.textContent='等待运行…';status.textContent='READY';status.classList.remove('is-error');document.querySelectorAll('.challenge').forEach(btn=>btn.classList.toggle('active',btn.dataset.id===item.id))}
challenges.forEach(item=>{const button=document.createElement('button');button.className='challenge';button.dataset.id=item.id;button.innerHTML=`<b>${item.title}</b>${item.tag}`;button.addEventListener('click',()=>selectChallenge(item));list.append(button)});
runButton.addEventListener('click',async()=>{if(!code.value.trim()){output.textContent='请先输入 C++ 源代码。';status.textContent='ERROR';status.classList.add('is-error');return}drafts.set(active.id,code.value);status.textContent='COMPILING';status.classList.remove('is-error');output.textContent='正在编译并运行…';runButton.disabled=true;const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),20000);try{const response=await fetch('https://wandbox.org/api/compile.json',{method:'POST',headers:{'Content-Type':'application/json'},signal:controller.signal,body:JSON.stringify({compiler:'gcc-13.2.0',code:code.value,stdin:input.value,options:'warning,boost-nothing'})});if(!response.ok)throw new Error(`编译服务返回 ${response.status}`);const result=await response.json(),compileText=[result.compiler_output,result.compiler_error].filter(Boolean).join('\n').trim(),runText=[result.program_output,result.program_error].filter(Boolean).join('\n').trim();if(result.compiler_error){output.textContent=`编译错误：\n${compileText}`;status.textContent='COMPILE ERROR';status.classList.add('is-error')}else if(result.status!=='0'){output.textContent=runText||result.program_message||`程序退出状态：${result.status}`;status.textContent='RUNTIME ERROR';status.classList.add('is-error')}else{output.textContent=`${compileText?`编译提示：\n${compileText}\n\n`:''}${runText||'（程序运行成功，没有输出）'}`;status.textContent='SUCCESS'}}catch(error){output.textContent=error.name==='AbortError'?'编译超时，请检查代码是否存在死循环。':`暂时无法连接编译服务：${error.message}`;status.textContent='ERROR';status.classList.add('is-error')}finally{clearTimeout(timer);runButton.disabled=false}});
document.querySelector('#copy-code').addEventListener('click',async event=>{try{await navigator.clipboard.writeText(code.value);event.currentTarget.textContent='已复制'}catch{event.currentTarget.textContent='复制失败'}setTimeout(()=>event.currentTarget.textContent='复制代码',1200)});document.querySelector('#reset-code').addEventListener('click',()=>{code.value=active.code;drafts.delete(active.id);output.textContent='已恢复示例代码，等待运行…';status.textContent='READY';status.classList.remove('is-error');code.focus()});code.addEventListener('keydown',event=>{if(event.key!=='Tab')return;event.preventDefault();code.setRangeText('    ',code.selectionStart,code.selectionEnd,'end')});addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;document.querySelector('#progress').style.width=`${max?scrollY/max*100:0}%`},{passive:true});selectChallenge(active);
