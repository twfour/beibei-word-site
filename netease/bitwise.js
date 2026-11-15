const challenges=[
  {id:'clear',title:'x & ~x',tag:'T8 · 清零',file:'clear.cpp',hint:'课堂代码读取一个整数 x。讲义示例使用 x = 255。',input:'255',code:`#include <iostream>
using namespace std;
int main(){
    int x;
    cin >> x;
    cout << (x & ~x);
    return 0;
}`},
  {id:'odd',title:'筛选奇数',tag:'T9 · 最低位',file:'odd.cpp',hint:'课堂代码使用固定数组，无需标准输入。',input:'',code:`#include <iostream>
using namespace std;
int main(){
    int x[10] = {1,2,3,4,5,6,7,8,9,10};
    for(int i = 0; i < 10; i++){
        if(x[i] & 1) cout << x[i] << " ";
    }
    return 0;
}`},
  {id:'xor-swap',title:'异或交换',tag:'T11 · XOR',file:'xor_swap.cpp',hint:'课堂代码固定使用 a = 170、b = 85，无需标准输入。',input:'',code:`#include <iostream>
using namespace std;
int main(){
    int a = 170, b = 85;
    a = a ^ b;
    b = a ^ b;
    a = a ^ b;
    cout << a << " " << b;
    return 0;
}`},
  {id:'lowbit',title:'lowbit',tag:'T13 · x & -x',file:'lowbit.cpp',hint:'课堂资料示例输入 20，结果为 4。',input:'20',code:`#include <iostream>
using namespace std;
int main(){
    int x;
    cin >> x;
    cout << (x & -x);
    return 0;
}`},
  {id:'binary',title:'输出 32 位补码',tag:'T15 · 逐位取值',file:'binary.cpp',hint:'课堂代码读取一个 int，并输出其 32 位二进制补码。',input:'5',code:`#include <iostream>
using namespace std;
int main(){
    int n;
    cin >> n;
    for(int i = 31; i >= 0; i--)
        cout << ((n >> i) & 1);
    return 0;
}`},
  {id:'half-swap',title:'高低位交换',tag:'T16 · 移位',file:'half_swap.cpp',hint:'课堂代码读取一个 unsigned int。',input:'',code:`#include <iostream>
using namespace std;
int main(){
    unsigned int n;
    cin >> n;
    cout << ((n >> 16) + (n << 16));
    return 0;
}`},
  {id:'popcount',title:'统计 1 的个数',tag:'T14 · x & (x-1)',file:'popcount.cpp',hint:'资料推导示例使用 x = 13，二进制中有 3 个 1。',input:'13',code:`#include <iostream>
using namespace std;
int main(){
    int x, cnt = 0;
    cin >> x;
    while(x){
        x &= x - 1;
        cnt++;
    }
    cout << cnt;
    return 0;
}`}
];
const list=document.querySelector('#challenge-list'),code=document.querySelector('#portal-code'),input=document.querySelector('#stdin'),output=document.querySelector('#output'),fileName=document.querySelector('#file-name'),hint=document.querySelector('#input-hint'),status=document.querySelector('#run-status'),runButton=document.querySelector('#run-code'),drafts=new Map();let active=challenges[0];
function selectChallenge(item){if(active)drafts.set(active.id,code.value);active=item;code.value=drafts.get(item.id)||item.code;input.value=item.input;fileName.textContent=item.file;hint.textContent=item.hint;output.textContent='等待运行…';status.textContent='READY';status.classList.remove('is-error');document.querySelectorAll('.challenge').forEach(btn=>btn.classList.toggle('active',btn.dataset.id===item.id))}
challenges.forEach(item=>{const button=document.createElement('button');button.className='challenge';button.dataset.id=item.id;button.innerHTML=`<b>${item.title}</b>${item.tag}`;button.addEventListener('click',()=>selectChallenge(item));list.append(button)});
runButton.addEventListener('click',async()=>{if(!code.value.trim()){output.textContent='请先输入 C++ 源代码。';status.textContent='ERROR';status.classList.add('is-error');return}drafts.set(active.id,code.value);status.textContent='COMPILING';status.classList.remove('is-error');output.textContent='正在编译并运行…';runButton.disabled=true;const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),20000);try{const response=await fetch('https://wandbox.org/api/compile.json',{method:'POST',headers:{'Content-Type':'application/json'},signal:controller.signal,body:JSON.stringify({compiler:'gcc-13.2.0',code:code.value,stdin:input.value,options:'warning,boost-nothing'})});if(!response.ok)throw new Error(`编译服务返回 ${response.status}`);const result=await response.json(),compileText=[result.compiler_output,result.compiler_error].filter(Boolean).join('\n').trim(),runText=[result.program_output,result.program_error].filter(Boolean).join('\n').trim();if(result.compiler_error){output.textContent=`编译错误：\n${compileText}`;status.textContent='COMPILE ERROR';status.classList.add('is-error')}else if(result.status!=='0'){output.textContent=runText||result.program_message||`程序退出状态：${result.status}`;status.textContent='RUNTIME ERROR';status.classList.add('is-error')}else{output.textContent=`${compileText?`编译提示：\n${compileText}\n\n`:''}${runText||'（程序运行成功，没有输出）'}`;status.textContent='SUCCESS'}}catch(error){output.textContent=error.name==='AbortError'?'编译超时，请检查代码是否存在死循环。':`暂时无法连接编译服务：${error.message}`;status.textContent='ERROR';status.classList.add('is-error')}finally{clearTimeout(timer);runButton.disabled=false}});
document.querySelector('#copy-code').addEventListener('click',async event=>{try{await navigator.clipboard.writeText(code.value);event.currentTarget.textContent='已复制'}catch{event.currentTarget.textContent='复制失败'}setTimeout(()=>event.currentTarget.textContent='复制代码',1200)});document.querySelector('#reset-code').addEventListener('click',()=>{code.value=active.code;drafts.delete(active.id);output.textContent='已恢复课堂源码，等待运行…';status.textContent='READY';status.classList.remove('is-error');code.focus()});code.addEventListener('keydown',event=>{if(event.key!=='Tab')return;event.preventDefault();code.setRangeText('    ',code.selectionStart,code.selectionEnd,'end')});addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;document.querySelector('#progress').style.width=`${max?scrollY/max*100:0}%`},{passive:true});selectChallenge(active);
