const challenges=[
  {id:'to-base',title:'十进制转 r 进制',tag:'短除法',file:'to_base.cpp',hint:'输入：十进制非负整数 n 和目标进制 r（2—16），例如 194 16。',input:'194 16',code:`#include <bits/stdc++.h>
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
  {id:'palindrome',title:'进制回文',tag:'对称比较',file:'palindrome.cpp',hint:'按课堂代码依次输入十进制整数 n 与目标进制 s。',input:'',code:`#include <bits/stdc++.h>
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
  {id:'to-decimal',title:'k 进制转十进制',tag:'位权累加',file:'to_decimal.cpp',hint:'每行输入进制数字 s 与进制 k；输入 0 0 结束。',input:'1A 16\n0 0',code:`#include <bits/stdc++.h>
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
  {id:'excel',title:'Excel 列序号',tag:'1-based 26 进制',file:'excel_column.cpp',hint:'输入一个大写 Excel 列名，例如 AB（输出 28）。',input:'AB',code:`#include <bits/stdc++.h>
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

const list=document.querySelector('#challenge-list'),code=document.querySelector('#portal-code'),input=document.querySelector('#stdin'),output=document.querySelector('#output'),fileName=document.querySelector('#file-name'),hint=document.querySelector('#input-hint'),status=document.querySelector('#run-status'),runButton=document.querySelector('#run-code'),drafts=new Map();let active=challenges[0];
function selectChallenge(item){if(active)drafts.set(active.id,code.value);active=item;code.value=drafts.get(item.id)||item.code;input.value=item.input;fileName.textContent=item.file;hint.textContent=item.hint;output.textContent='等待运行…';status.textContent='READY';status.classList.remove('is-error');document.querySelectorAll('.challenge').forEach(btn=>btn.classList.toggle('active',btn.dataset.id===item.id))}
challenges.forEach(item=>{const button=document.createElement('button');button.className='challenge';button.dataset.id=item.id;button.innerHTML=`<b>${item.title}</b>${item.tag}`;button.addEventListener('click',()=>selectChallenge(item));list.append(button)});
runButton.addEventListener('click',async()=>{if(!code.value.trim()){output.textContent='请先输入 C++ 源代码。';status.textContent='ERROR';status.classList.add('is-error');return}drafts.set(active.id,code.value);status.textContent='COMPILING';status.classList.remove('is-error');output.textContent='正在编译并运行…';runButton.disabled=true;const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),20000);try{const response=await fetch('https://wandbox.org/api/compile.json',{method:'POST',headers:{'Content-Type':'application/json'},signal:controller.signal,body:JSON.stringify({compiler:'gcc-13.2.0',code:code.value,stdin:input.value,options:'warning,boost-nothing'})});if(!response.ok)throw new Error(`编译服务返回 ${response.status}`);const result=await response.json(),compileText=[result.compiler_output,result.compiler_error].filter(Boolean).join('\n').trim(),runText=[result.program_output,result.program_error].filter(Boolean).join('\n').trim();if(result.compiler_error){output.textContent=`编译错误：\n${compileText}`;status.textContent='COMPILE ERROR';status.classList.add('is-error')}else if(result.status!=='0'){output.textContent=runText||result.program_message||`程序退出状态：${result.status}`;status.textContent='RUNTIME ERROR';status.classList.add('is-error')}else{output.textContent=`${compileText?`编译提示：\n${compileText}\n\n`:''}${runText||'（程序运行成功，没有输出）'}`;status.textContent='SUCCESS'}}catch(error){output.textContent=error.name==='AbortError'?'编译超时，请检查代码是否存在死循环。':`暂时无法连接编译服务：${error.message}`;status.textContent='ERROR';status.classList.add('is-error')}finally{clearTimeout(timer);runButton.disabled=false}});
document.querySelector('#copy-code').addEventListener('click',async event=>{try{await navigator.clipboard.writeText(code.value);event.currentTarget.textContent='已复制'}catch{event.currentTarget.textContent='复制失败'}setTimeout(()=>event.currentTarget.textContent='复制代码',1200)});document.querySelector('#reset-code').addEventListener('click',()=>{code.value=active.code;drafts.delete(active.id);output.textContent='已恢复示例代码，等待运行…';status.textContent='READY';status.classList.remove('is-error');code.focus()});code.addEventListener('keydown',event=>{if(event.key!=='Tab')return;event.preventDefault();code.setRangeText('    ',code.selectionStart,code.selectionEnd,'end')});addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;document.querySelector('#progress').style.width=`${max?scrollY/max*100:0}%`},{passive:true});selectChallenge(active);
