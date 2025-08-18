

document.getElementById("st").onchange = change;
document.getElementById("add1").onclick = add;
document.getElementById("sub").onclick = sub;
var url = "https://script.google.com/macros/s/AKfycbx0xGKdu9XNdBmaQV9S1kUGB44f6boIPswobzhvHawe6ahkRSWJkoSwhW1cspUOh1o/exec";
var username = "";
if(document.body.offsetWidth > 2000){
var text ='<link rel="stylesheet" href="css-schedule.css">';
}else{
var text = '<link rel="stylesheet" href="css-schedule2.css">';
}
document.getElementById("css_select").insertAdjacentHTML("beforeend",text);

try{
var params = new URLSearchParams(document.location.search);
username  = params.get("username");
if(username.length > 0){
document.getElementById("h4").innerHTML = username;
}else{
    alert("ログインしてください");
    location.href="schedule_login.html";
}
}catch(e){
    console.log(e);
    alert("ログインしてください");
    location.href="schedule_login.html";
}

var time = new Date();
var month = time.getMonth()+2;
var year = time.getFullYear();
var time2 = new Date(year,month-1,1);
var first_day = time2.getDay();
var time3 = new Date(year,month,0);
var after_last_date = time3.getDate();
var time4 = new Date(year,month-1,0);
var before_last_date = time4.getDate(); 
if(first_day == 0){
    first_day = 7;
}
//first_day = 1;

document.getElementById("month").innerHTML = month+"月";
document.getElementById("month").style.fontSize = "25px";

if(first_day == 1){

}else{
    for(var a = first_day; a >1; a--){
        var numb = before_last_date-a+2;
        var text = '<div class="b1"><p class="date2" id="date">'+numb+'</p><div class="d" id="ddd"></div></div>';
        document.getElementById("add_d").insertAdjacentHTML("beforeend",text);
    }
}
//<div class="b1" onclick="pup(1)"><p class="date" id="date">1</p><div class="d" id="d1"></div></div>
for(var i = 1; i<=after_last_date; i++){
    var text = '<div class="b1" onclick=pup('+i+')><p class="date" id="date">'+i+'</p><div class="d" id="d'+i+'"></div></div>';
    document.getElementById("add_d").insertAdjacentHTML("beforeend",text);
}
var branch = "go";
function start_ani(){
    var count = 0;
    var s = setInterval(()=>{
        count++;
        if(count == 1 && branch == "go"){
            document.getElementById("start_check2").innerHTML = "読込み中...";
        }else if(count == 2 && branch == "go"){
            count = 0;
            document.getElementById("start_check2").innerHTML = "しばらくお待ちください...";
        }else if(branch == "ok"){
            document.getElementById("start_check2").style.display = "none";
            document.getElementById("start_check").style.display = "none";
        }else if(branch == "no"){
            document.getElementById("start_check2").innerHTML = "シフト登録の許可がありません";
            document.getElementById("ca").style.display = "none";
            document.getElementById("bar").style.display = "none";
            document.getElementById("top").style.display = "none";
            clearInterval(s);
            return;
        }
    },2000)
}
function start(){
    start_ani();
    var url1 = url+"?branch=s_check&username="+username;
    fetch(url1,{
        "method":"get",
        "mode":"cors"
    })
    .then(response=>{
        if(response.ok){
            return response.json()
        }
    })
    .then(json=>{
        if(json == "ok"){
            branch = "ok";
        }else{
            alert("登録の許可がありません");
            document.getElementById("sub").style.display = "none";
            branch = "no";
        }
    })
}

function change(data){
    if(data.target.value == "朝勤務"){
   document.getElementById("start_t").value = "9:00";
   document.getElementById("end_t").value = "13:00";
    }else if(data.target.value == "昼勤務"){
   document.getElementById("start_t").value = "14:00";
   document.getElementById("end_t").value = "18:00";
    }else if(data.target.value == "夜勤務"){
   document.getElementById("start_t").value = "18:00";
   document.getElementById("end_t").value = "22:00";
    }
}
var datas = [{1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[],10:[],11:[],12:[],13:[],14:[],15:[],16:[],17:[],18:[],19:[],20:[],21:[],22:[],23:[],24:[],25:[],26:[],27:[],28:[],29:[],30:[],31:[],}];
var dates = ["月曜","火曜","水曜","木曜","金曜","土曜","日曜"];
function add(){
    var res = ""
    var count = 0;
    
    for(var n of dates){
        count++;
        
        if(document.getElementById("se").value == n){   
            for(var num = count; num <= after_last_date; num+=7){//月によって31とか30とかを変えるようにプログラムすること
                console.log("write")
                var count3 = 0;
                  if(datas[0][num].length > 0){
                    var count2 = -1;
                        for(var n of datas[0][num]){
                            count2++;
                            if(datas[0][num][count2] == document.getElementById("start_t").value+"～"+document.getElementById("end_t").value){
                               count3++;
                            }
                        }
                        if(count3 == 0){
                            datas[0][num].push(document.getElementById("start_t").value+"～"+document.getElementById("end_t").value);                        
                        }else{
                            res ="登録済みの時間があります  "
                        }
                    }else{
                        datas[0][num].push(document.getElementById("start_t").value+"～"+document.getElementById("end_t").value);
                    }
                   
                }
        }
    }
    console.log(datas);
    datas_write(res);
}
var count2 = 0;
function datas_write(res){
    dac();
    if(res){
        alert(res);     
    }
    for(var i = 1; i <= after_last_date; i++){
        var text = "d"+i;
        if(datas[0][i].length != 0){
            for(var d of datas[0][i]){
            var text2 = '<p id="dd">'+d+'</p>';
            document.getElementById(text).insertAdjacentHTML("beforeend",text2);
            }

        }
    }
    console.log("count2:"+count2);
}
var count = 0;
var pre_num = 0;
var day = 0;
var count3 = 0;
function pup(num){
    dac();
    var text = '';
    
    count++;
        document.getElementById("ca").style.display = "none";
    document.getElementById("ca").style.opacity = "0";
    document.getElementById("u").style.display = "block";
    document.getElementById("u").style.opacity = "0";
    document.getElementById("ud").innerHTML = num+"日";
    day = num;
$(".u").animate({
 "opacity":1
},100);

    
    if(count == 1 || pre_num == 0){

    }else{
        console.log("length:"+pre_num);
        for(var i = 1; i<=pre_num; i++){
            try{
            document.getElementById("s1").remove();
            }catch(e){
                console.log("ごめんめんどかった");
            }
        }        
    }
    var len = datas[0][num].length;
    if(len == 0){
        count = 0;
    }else{
        for(var d of datas[0][num]){
            count3++;
            var text = '<div class="s1" id="s1"><p>'+d+'</p><button id="dd'+count3+'"onclick="del('+day+","+count3+')">削除</button></div>';
            document.getElementById("s").insertAdjacentHTML("beforeend",text);
            pre_num = datas[0][num].length;
        }
    }
}


var count_add = 0;
function clos(){
$(".u").animate({
 "opacity":0
},100);
  setTimeout(()=>{
document.getElementById("ca").style.display = "block";
    document.getElementById("ca").style.opacity = "1";
document.getElementById("u").style.display = "none";
for(var i = 1; i <= count_add; i++){
    document.getElementById("s1").remove();
}
count_add = 0;
count3 = 0;
datas_write();
},105);
}

function add2(num){
    count_add++;
    count3++;
    if(num == 1){
        var text = '<div class="s1" id="s1"><p>9:00～13:00</p><button id="dd'+count3+'"onclick="del('+day+","+count3+')">削除</button></div>';
        var text2 = "9:00～13:00";
    }else if(num == 2){
        var text = '<div class="s1" id="s1"><p>14:00～18:00</p><button id="dd'+count3+'"onclick="del('+day+","+count3+')">削除</button></div>';
        var text2 = "14:00～18:00";
    }else if(num == 3){
        var text = '<div class="s1" id="s1"><p>18:00～22:00</p><button id="dd'+count3+'"onclick="del('+day+","+count3+')">削除</button></div>';
        var text2 = "18:00～22:00";
    }else if(num == 4){
        var text = '<div class="s1" id="s1"><p>'+document.getElementById("u_time").value+'</p><button id="dd'+count3+'"onclick="del('+day+","+count3+')">削除</button></div>';
        var text2 = document.getElementById("u_time").value;
    }
    for(var d of datas[0][day]){
        if(d == text2){
            alert("すでに登録済みです");
            return;
        }
    }
    datas[0][day].push(text2);
    document.getElementById("s").insertAdjacentHTML("beforeend",text);
    //count2+=1 //これなんでいるのかわからん
}
//各日ごとの配列かjsonデータを作成

/*function test1(){
    var texts = '';
    for(var i = 1; i <=31; i++){
        texts += '<div class="b1" onclick="pup('+i+')"><p class="date" id="date">'+i+'</p><div class="d" id="d'+i+'"></div></div>';

    }
console.log(texts);
}*/

function dac(){
    var d_n = 0;
    for(var i = 1; i<=31; i++){//月によって30か31とかをかえること
        d_n += datas[0][i].length;
        console.log("d_n:"+d_n);
    }
    for(var i = 1; i <= d_n; i++){
        console.log("i:"+i)
        try{
        document.getElementById("dd").remove();
        }catch(e){

        }
    }
}

function del(num,num2){
    console.log(datas[0][num])
    datas[0][num].splice(num2-1,1);
    document.getElementById("dd"+num2).innerHTML ="削除済";
    console.log(datas[0][num])
}



function daw(){
    var text = "d"
        for(var i = 1; i<=31; i++){//月によって30か31とかをかえること
            if(datas[0][i].length > 0){
                var text2 = '<p id="dd">'+d+'</p>';
                document.getElementById(text+i).insertAdjacentHTML("beforeend",text2);
            }
    }
}

//<div class="b1" onclick="pup(1)"><p class="date" id="date">1</p><div class="d" id="d1"></div></div><div class="b1" onclick="pup(2)"><p class="date" id="date">2</p><div class="d" id="d2"></div></div><div class="b1" onclick="pup(3)"><p class="date" id="date">3</p><div class="d" id="d3"></div></div><div class="b1" onclick="pup(4)"><p class="date" id="date">4</p><div class="d" id="d4"></div></div><div class="b1" onclick="pup(5)"><p class="date" id="date">5</p><div class="d" id="d5"></div></div><div class="b1" onclick="pup(6)"><p class="date" id="date">6</p><div class="d" id="d6"></div></div><div class="b1" onclick="pup(7)"><p class="date" id="date">7</p><div class="d" id="d7"></div></div><div class="b1" onclick="pup(8)"><p class="date" id="date">8</p><div class="d" id="d8"></div></div><div class="b1" onclick="pup(9)"><p class="date" id="date">9</p><div class="d" id="d9"></div></div><div class="b1" onclick="pup(10)"><p class="date" id="date">10</p><div class="d" id="d10"></div></div><div class="b1" onclick="pup(11)"><p class="date" id="date">11</p><div class="d" id="d11"></div></div><div class="b1" onclick="pup(12)"><p class="date" id="date">12</p><div class="d" id="d12"></div></div><div class="b1" onclick="pup(13)"><p class="date" id="date">13</p><div class="d" id="d13"></div></div><div class="b1" onclick="pup(14)"><p class="date" id="date">14</p><div class="d" id="d14"></div></div><div class="b1" onclick="pup(15)"><p class="date" id="date">15</p><div class="d" id="d15"></div></div><div class="b1" onclick="pup(16)"><p class="date" id="date">16</p><div class="d" id="d16"></div></div><div class="b1" onclick="pup(17)"><p class="date" id="date">17</p><div class="d" id="d17"></div></div><div class="b1" onclick="pup(18)"><p class="date" id="date">18</p><div class="d" id="d18"></div></div><div class="b1" onclick="pup(19)"><p class="date" id="date">19</p><div class="d" id="d19"></div></div><div class="b1" onclick="pup(20)"><p class="date" id="date">20</p><div class="d" id="d20"></div></div><div class="b1" onclick="pup(21)"><p class="date" id="date">21</p><div class="d" id="d21"></div></div><div class="b1" onclick="pup(22)"><p class="date" id="date">22</p><div class="d" id="d22"></div></div><div class="b1" onclick="pup(23)"><p class="date" id="date">23</p><div class="d" id="d23"></div></div><div class="b1" onclick="pup(24)"><p class="date" id="date">24</p><div class="d" id="d24"></div></div><div class="b1" onclick="pup(25)"><p class="date" id="date">25</p><div class="d" id="d25"></div></div><div class="b1" onclick="pup(26)"><p class="date" id="date">26</p><div class="d" id="d26"></div></div><div class="b1" onclick="pup(27)"><p class="date" id="date">27</p><div class="d" id="d27"></div></div><div class="b1" onclick="pup(28)"><p class="date" id="date">28</p><div class="d" id="d28"></div></div><div class="b1" onclick="pup(29)"><p class="date" id="date">29</p><div class="d" id="d29"></div></div><div class="b1" onclick="pup(30)"><p class="date" id="date">30</p><div class="d" id="d30"></div></div><div class="b1" onclick="pup(31)"><p class="date" id="date">31</p><div class="d" id="d31"></div></div>

function sub(){
  document.getElementById("sub").innerHTML = "送信中"
console.log(JSON.stringify(datas));
    var params = {
        "method":"post",
        "mode":"no-cors",
        "Content-Type":"application/json",
        "body":JSON.stringify(datas)
    }
    var url1 = url+'?username='+username;//セキュリティ面アウト
    fetch(url1,params)
    .then(res=>{
        console.log(res);
        if(res.ok){
            console.log("success");
alert("登録が完了しました\n(登録されているメールアドレスにも通知されます)")

        }else{
alert("シフト送信中にエラーが発生しました\n詳しくは管理者まで問い合わせてください")
}
    })
}
document.getElementById("w").onclick = w;
var schedule_datas = "";
var none = "";
function w(t){
    var c = 0;
    if(t == "n"){
        document.getElementById("blocks").remove();
    var text = '<div id="blocks"></div>';
    document.getElementById("ca").insertAdjacentHTML("beforeend",text);
    document.getElementById("bar").style.paddingLeft = "15vw";
    document.getElementById("ca").style.marginLeft = "15vw";

        var data = ["n"];
        var params = {
            "method":"post",
            "mode":"no-cors",
            "Content-Type":"application/json",
            "body":JSON.stringify(data)
        }
        fetch(yrl,params);
        alert("送信しました");
    }else if(t == "m"){
        document.getElementById("blocks").remove();
    var text = '<div id="blocks"></div>';
    document.getElementById("ca").insertAdjacentHTML("beforeend",text);
    document.getElementById("bar").style.paddingLeft = "15vw";
    document.getElementById("ca").style.marginLeft = "15vw";

        document.getElementById("pw").innerHTML = "読込み中";
        var data = ["m"];
        var params = {
            "method":"post",
            "mode":"no-cors",
            "Content-Type":"application/json",
            "body":JSON.stringify(data)
        }
        fetch(url,params);
        alert("送信しました");
        setTimeout(()=>{
            console.log("受信開始");
            var datas1 = "";
        var datas2 = "";
        var urls = ["?branch=s_register","?branch=s_name"];
        for(var i = 0; i<=1; i++){
            console.log("リクエスト"+i);
            var text = url+urls[i];
            console.log("URL:"+text);
            fetch(text,{
                "method":"get",
                "mode":"cors"
            })
            .then(response=>{
                if(response.ok){
                    return response.json()
                }
            })
            .then(json=>{
                console.log(json);
                if(json.length == 1 && json[0][31]){
                    schedule_datas = json;
                    c++;
                }else{
                    none = json;
                    c++;
                }
                if(c == 2){
                    document.getElementById("pw").innerHTML = "シフトの確認";
                    schedule_sudo();
                }
            })
            .catch(e=>{
                console.log(e);
            })
        }
        },2000);
        
    }else if(t == "y"){

    }else if(t == "fs"){
        
    }else if(t == "sn"){
                document.getElementById("blocks").remove();
    var text = '<div id="blocks"></div>';
    document.getElementById("ca").insertAdjacentHTML("beforeend",text);
    document.getElementById("bar").style.paddingLeft = "15vw";
    document.getElementById("ca").style.marginLeft = "15vw";

var text = '<div class="bar" id="bar"><p id="w">週間入力</p><select name="sw" id="sday"><option value="選択してください">選択してください</option><option value="月曜">月曜</option><option value="火曜">火曜</option><option value="水曜">水曜</option><option value="木曜">木曜</option><option value="金曜">金曜</option><option value="土曜">土曜</option><option value="日曜">日曜</option></select><select name="st" id="stime" ><option value="選択してください">選択してください</option><option value="朝勤務">朝勤務</option><option value="昼勤務">昼勤務</option><option value="夜勤務">夜勤務</option></select><select name="st" id="snumber" ><option value="選択してください">選択してください</option><option value="募集なし">募集なし</option><option value="1人">1人</option><option value="2人">2人</option></select><p class="add1" onclick=addd1()>追加</p></div><div class="ca" id="ca"><div class="b" id="b"><p>月</p><p>火</p><p>水</p><p>木</p><p>金</p><p>土</p><p>日</p></div><div class="add_d" id="add_d"></div><div class="sub" onclick="sub2()">決定</div></div>';
document.getElementById("blocks").insertAdjacentHTML("beforeend",text);
document.getElementById("bar").style.paddingLeft = "0";
document.getElementById("ca").style.marginLeft = "0";
var time = new Date();
var month = time.getMonth()+2;
var year = time.getFullYear();
var time2 = new Date(year,month-1,1);
var first_day = time2.getDay();
var time3 = new Date(year,month,0);
var after_last_date = time3.getDate();
var time4 = new Date(year,month-1,0);
var before_last_date = time4.getDate(); 
if(first_day == 0){
    first_day = 7;
}
//first_day = 1;

document.getElementById("month").innerHTML = month+"月";

if(first_day == 1){

}else{
    for(var a = first_day; a >1; a--){
        var numb = before_last_date-a+2;
        var text = '<div class="b1"><p class="date2" id="date">'+numb+'</p><div class="d" id="ddd"></div></div>';
        document.getElementById("add_d").insertAdjacentHTML("beforeend",text);
    }
}
//<div class="b1" onclick="pup(1)"><p class="date" id="date">1</p><div class="d" id="d1"></div></div>
for(var i = 1; i<=after_last_date; i++){
    var text = '<div class="b1" onclick=pup2('+i+')><p class="date" id="date">'+i+'</p><div class="d" id="d'+i+'"></div></div>';
    document.getElementById("add_d").insertAdjacentHTML("beforeend",text);
}


    }else if(document.getElementById("start_t").value == "ww"){
        document.getElementById("add_d").remove();
        document.getElementById("b").remove();
        document.getElementById("se").remove();
        document.getElementById("st").remove();
        document.getElementById("start_t").remove();
        document.getElementById("end_t").remove();
        document.getElementById("add1").remove();
        document.getElementById("sub").remove();
        document.getElementById("w").innerHTML = "管理者ページ";
        var text = '<p onclick=w("n") class="pw">新規シフト登録の許可</p><p onclick=w("m") class="pw" id="pw">シフトの確認</p><p onclick=w("fs") class="pw" id="fs">確定シフト</p><p onclick=w("sn") class="pw" id="sn">募集人数の設定</p><div id="blocks"></div>';
        document.getElementById("ca").insertAdjacentHTML("beforeend",text);

    }
}

function schedule_sudo(){
var t1 = '<div id="y" class="y"><p class="y_t">シフト未提出者</p></div>'
document.getElementById("blocks").insertAdjacentHTML("beforeend",t1);
for(var p of none){
    var t2 = '<p>'+p+'</p>';
    document.getElementById("y").insertAdjacentHTML("beforeend",t2);
}
for(var date = 1; date<=31; date++){
var text = '<div class="su1" id="su1"><p class="su_d">'+date+'日</p><div class="su_block1" id="su_block1"><p class="su_time">9:00～13:00</p><small>シフト希望</small><div class="names" id="names1'+date+'"></div><small>確定シフト</small><div class="namess" id="namess1'+date+'"></div></div><div class="su_block1" id="su_block1"><p class="su_time">14:00～18:00</p><small>シフト希望</small><div class="names" id="names2'+date+'"></div><small>確定シフト</small><div class="names" id="namess2'+date+'"></div></div><div class="su_block1" id="su_block1"><p class="su_time">18:00～22:00</p><small>シフト希望</small><div class="names" id="names3'+date+'"></div><small>確定シフト</small><div class="names" id="namess3'+date+'"></div></div><div class="su_block2" id="su_block1"><p class="su_time">その他の時間帯</p><div class="names" id="names4'+date+'"></div></div></div>';
document.getElementById("blocks").insertAdjacentHTML("beforeend",text);
for(var num = 1; num<=4; num++){
    var text2 = "names"+num+date;
    /*console.log(text2);
    console.log(schedule_datas[0]);
    console.log(schedule_datas[0][date]);
    console.log(schedule_datas[0][date][0]);
    console.log(schedule_datas[0][date][0][num]);
    console.log(schedule_datas[0][date][0][num].length);*/
    if(schedule_datas[0][date][0][num].length == 0){
        document.getElementById(text2).insertAdjacentHTML("beforeend","<p>希望者なし</p>");
    }else{
        var count = 0;
        for(var a of schedule_datas[0][date][0][num]){
            count++;
            if(a == "募集なし"){
                var text = '<p class="p2">'+a+'</p>';
                document.getElementById(text2).insertAdjacentHTML("beforeend",text);                
            }else{
                var text = '<p class="p1" id="p'+date+','+num+','+count+'" onclick=add3('+date+','+num+','+count+',0)>'+a+'</p>';
                document.getElementById(text2).insertAdjacentHTML("beforeend",text);
            }
        }   
    }
}
}
            var text = '<p class="fix" onclick=fixed()>確定</p>';
            document.getElementById(text2).insertAdjacentHTML("beforeend",text);
}
var count4 = 0;
var main_data = [{"1":[{"1":[],"2":[],"3":[],"4":[]}],"2":[{"1":[],"2":[],"3":[],"4":[]}],"3":[{"1":[],"2":[],"3":[],"4":[]}],"4":[{"1":[],"2":[],"3":[],"4":[]}],"5":[{"1":[],"2":[],"3":[],"4":[]}],"6":[{"1":[],"2":[],"3":[],"4":[]}],"7":[{"1":[],"2":[],"3":[],"4":[]}],"8":[{"1":[],"2":[],"3":[],"4":[]}],"9":[{"1":[],"2":[],"3":[],"4":[]}],"10":[{"1":[],"2":[],"3":[],"4":[]}],"11":[{"1":[],"2":[],"3":[],"4":[]}],"12":[{"1":[],"2":[],"3":[],"4":[]}],"13":[{"1":[],"2":[],"3":[],"4":[]}],"14":[{"1":[],"2":[],"3":[],"4":[]}],"15":[{"1":[],"2":[],"3":[],"4":[]}],"16":[{"1":[],"2":[],"3":[],"4":[]}],"17":[{"1":[],"2":[],"3":[],"4":[]}],"18":[{"1":[],"2":[],"3":[],"4":[]}],"19":[{"1":[],"2":[],"3":[],"4":[]}],"20":[{"1":[],"2":[],"3":[],"4":[]}],"21":[{"1":[],"2":[],"3":[],"4":[]}],"22":[{"1":[],"2":[],"3":[],"4":[]}],"23":[{"1":[],"2":[],"3":[],"4":[]}],"24":[{"1":[],"2":[],"3":[],"4":[]}],"25":[{"1":[],"2":[],"3":[],"4":[]}],"26":[{"1":[],"2":[],"3":[],"4":[]}],"27":[{"1":[],"2":[],"3":[],"4":[]}],"28":[{"1":[],"2":[],"3":[],"4":[]}],"29":[{"1":[],"2":[],"3":[],"4":[]}],"30":[{"1":[],"2":[],"3":[],"4":[]}],"31":[{"1":[],"2":[],"3":[],"4":[]}]}];
function add3(d,t,n,s){
    var text = "p"+d+','+t+','+n;
    var text2 = "namess"+t+d;
    var text3 = '<p class="p1" id="p'+d+','+t+','+n+'" onclick=del2('+d+','+t+','+n+',0)>'+document.getElementById(text).innerHTML+'</p>';
    document.getElementById(text).remove();
    document.getElementById(text2).insertAdjacentHTML("beforeend",text3);
    //main_data = JSON.parse(main_data);
    main_data[0][d][0][t].push(document.getElementById(text).innerHTML);
}
function del2(d,t,n,s){
    var text = "p"+d+','+t+','+n;
    var text2 = "names"+n+d;
    var text3 = '<p class="p1" id="p'+d+','+t+','+n+'" onclick=add3('+d+','+t+','+n+',0)>'+document.getElementById(text).innerHTML+'</p>';
    main_data[0][d][0][t].splice(n-1,1);
    document.getElementById(text).remove();
    document.getElementById(text2).insertAdjacentHTML("beforeend",text3);
}
function fixed(){
    console.log(main_data);
    var params = {
        "method":"post",
        "mode":"no-cors",
        "Content-Type":"application/json",
        "body":JSON.stringify(main_data)
    }
    var url2 = url+"?branch=ficed";
    fetch(url2,params);
}
var number_data = [{"1":[{"1":[],"2":[],"3":[],"4":[]}],"2":[{"1":[],"2":[],"3":[],"4":[]}],"3":[{"1":[],"2":[],"3":[],"4":[]}],"4":[{"1":[],"2":[],"3":[],"4":[]}],"5":[{"1":[],"2":[],"3":[],"4":[]}],"6":[{"1":[],"2":[],"3":[],"4":[]}],"7":[{"1":[],"2":[],"3":[],"4":[]}],"8":[{"1":[],"2":[],"3":[],"4":[]}],"9":[{"1":[],"2":[],"3":[],"4":[]}],"10":[{"1":[],"2":[],"3":[],"4":[]}],"11":[{"1":[],"2":[],"3":[],"4":[]}],"12":[{"1":[],"2":[],"3":[],"4":[]}],"13":[{"1":[],"2":[],"3":[],"4":[]}],"14":[{"1":[],"2":[],"3":[],"4":[]}],"15":[{"1":[],"2":[],"3":[],"4":[]}],"16":[{"1":[],"2":[],"3":[],"4":[]}],"17":[{"1":[],"2":[],"3":[],"4":[]}],"18":[{"1":[],"2":[],"3":[],"4":[]}],"19":[{"1":[],"2":[],"3":[],"4":[]}],"20":[{"1":[],"2":[],"3":[],"4":[]}],"21":[{"1":[],"2":[],"3":[],"4":[]}],"22":[{"1":[],"2":[],"3":[],"4":[]}],"23":[{"1":[],"2":[],"3":[],"4":[]}],"24":[{"1":[],"2":[],"3":[],"4":[]}],"25":[{"1":[],"2":[],"3":[],"4":[]}],"26":[{"1":[],"2":[],"3":[],"4":[]}],"27":[{"1":[],"2":[],"3":[],"4":[]}],"28":[{"1":[],"2":[],"3":[],"4":[]}],"29":[{"1":[],"2":[],"3":[],"4":[]}],"30":[{"1":[],"2":[],"3":[],"4":[]}],"31":[{"1":[],"2":[],"3":[],"4":[]}]}];

function addd1(){
var dates = ["月曜","火曜","水曜","木曜","金曜","土曜","日曜"];
var dates2 = ["朝勤務","昼勤務","夜勤務"];

var count = 0;
for(var n of dates){
        count++;
        
        if(document.getElementById("sday").value == n){   
            for(var num = count; num <= after_last_date; num+=7){//月によって31とか30とかを変えるようにプログラムすること
                console.log("write")
                var count4 = 0;
                 for(var d of dates2){
                    count4++;
                    if(d == document.getElementById("stime").value){
                        var num2 = count4;
                    }
                 }
                  if(number_data[0][num][0][num2].length > 0){
                        number_data[0][num][0][num2].splice(0,1);
                        number_data[0][num][0][num2].push(document.getElementById("snumber").value);
                    }else{
                        number_data[0][num][0][num2].push(document.getElementById("snumber").value);
                    }
                }   
        }
    }
    datas_write2();
}
function ad(text){
    console.log(number_data)
    var t = text.substring(1,2);
    var n = text.substring(2,)-1;
    var d = document.getElementById("u2d").innerHTML;
    d = d.substring(0,d.indexOf("日"));
    if(n == 0){
        n = "募集なし"
    }else{
        n = n+"人";
    }
    console.log(number_data[0][d][0][t]);
    console.log(number_data[0][d][0][t]);
    if(number_data[0][d][0][t].length == 0){
    number_data[0][d][0][t].push(n);
    }else{
        number_data[0][d][0][t].splice(0,1);
        number_data[0][d][0][t].push(n);
    }
    t = "stt"+t;
    document.getElementById(t).innerHTML = n;
}
var count_add = 0;
function clos2(){
    document.getElementById("ca").style.display = "block";
    document.getElementById("ca").style.opacity = "1";
document.getElementById("u2").style.display = "none";
document.getElementById("u2").style.opacity = "0";
datas_write2();
}
function pup2(num){
    var text = '';
    
    count++;
    document.getElementById("ca").style.display = "none";
    document.getElementById("ca").style.opacity = "0";
    document.getElementById("u2").style.display = "block";
    document.getElementById("u2").style.opacity = "1";
    document.getElementById("u2d").innerHTML = num+"日";
    day = num;
    for(var i = 1; i<=3; i++){
        var text = "stt"+i;
        if(number_data[0][num][0][i].length > 0){
        document.getElementById(text).innerHTML = number_data[0][num][0][i];//
        }else{
            document.getElementById(text).innerHTML = "未決定";
        }
    }
}
function datas_write2(){
        for(var b = 1; b<=3*31; b++){
            try{
            document.getElementById("dd").remove();
            }catch(e){

            }
        }
        var days = ["朝勤務","昼勤務","夜勤務"];
    for(var i = 1; i <= after_last_date; i++){
        var text = "d"+i;
            for(var a = 1; a<=3; a++){
            if(number_data[0][i][0][a].length > 0){
            var text2 = '<p class="dd"id="dd">'+days[a-1]+" : "+number_data[0][i][0][a]+'</p>';
            }else{
            var text2 = '<p class="dd" id="dd">'+days[a-1]+' : 未決定</p>';
            }
            document.getElementById(text).insertAdjacentHTML("beforeend",text2);
            }
    }
    console.log("count2:"+count2);
}

function sub2(){
    var url2 = url+"?branch=number_set";
    var params = {
        "method":"post",
        "mode":"no-cors",
        "Content-Type":"application/json",
        "body":JSON.stringify(number_data)
    }
    fetch(url2,params);
    alert("送信しました");
    document.getElementById("blocks").remove();
    var text = '<div id="blocks"></div>';
    document.getElementById("ca").insertAdjacentHTML("beforeend",text);
    document.getElementById("bar").style.paddingLeft = "15vw";
    document.getElementById("ca").style.marginLeft = "15vw";
}