

document.getElementById("st").onchange = change;
document.getElementById("add1").onclick = add;
document.getElementById("sub").onclick = sub;
var url = "https://script.google.com/macros/s/AKfycbx0xGKdu9XNdBmaQV9S1kUGB44f6boIPswobzhvHawe6ahkRSWJkoSwhW1cspUOh1o/exec";
var username = "";
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
    document.getElementById("u").style.opacity = "1";
    document.getElementById("ud").innerHTML = num+"日";
    day = num;
    
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
    document.getElementById("ca").style.display = "block";
    document.getElementById("ca").style.opacity = "1";
document.getElementById("u").style.display = "none";
document.getElementById("u").style.opacity = "0";
for(var i = 1; i <= count_add; i++){
    document.getElementById("s1").remove();
}
count_add = 0;
count3 = 0;
datas_write();
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
    console.log(JSON.stringify(datas));
    var params = {
        "method":"post",
        "mode":"no-cors",
        "Content-Type":"application/json",
        "body":JSON.stringify(datas)
    }
    url+='?username='+username;//セキュリティ面アウト
    fetch(url,params)
    .then(res=>{
        console.log(res);
        if(res.ok){
            console.log("success");
        }
    })
}