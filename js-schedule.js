document.getElementById("st").onchange = change;
document.getElementById("add1").onclick = add;
function change(data){
    if(data.target.value == "朝勤務"){
   document.getElementById("start_t").value = "09:00";
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
    
    var count = 0;
    
    for(var n of dates){
        count++;
        
        if(document.getElementById("se").value == n){   
            for(var num = count; num <= 31; num+=7){//月によって31とか30とかを変えるようにプログラムすること
                    console.log("write")
                    datas[0][num].push(document.getElementById("start_t").value+"-"+document.getElementById("end_t").value);
                }
        }
    }
    console.log(datas);
    datas_write();
}
var count2 = 0;
function datas_write(){
    dac();
    for(var i = 1; i <= 31; i++){
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
            document.getElementById("s1").remove();
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
        var text = '<div class="s1" id="s1"><p>09:00～13:00</p><button id="dd'+count3+'"onclick="del('+day+","+count3+')">削除</button></div>';
        datas[0][day].push("09:00～13:00");
    }else if(num == 2){
        var text = '<div class="s1" id="s1"><p>014:00～18:00</p><button id="dd'+count3+'"onclick="del('+day+","+count3+')">削除</button></div>';
        datas[0][day].push("14:00～18:00");
    }else if(num == 3){
        var text = '<div class="s1" id="s1"><p>18:00～22:00</p><button id="dd'+count3+'"onclick="del('+day+","+count3+')">削除</button></div>';
        datas[0][day].push("18:00～22:00");
    }else if(num == 4){
        var text = '<div class="s1" id="s1"><p>'+document.getElementById("u_time").value+'</p><button id="dd'+count3+'"onclick="del('+day+","+count3+')">削除</button></div>';
        datas[0][day].push(document.getElementById("u_time").value);
    }
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