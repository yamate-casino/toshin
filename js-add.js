var url = "https://script.google.com/macros/s/AKfycbxPgr666297xQkeGKUTlC4So00jWlbcTlvoGl_y0sZptVooUNpmG2dlrpFYsMg97bqc/exec";
var url22 = "https://script.google.com/macros/s/AKfycbzbI8mIZO042dfiGIcA0EbwW_XrKhBaE4_n7q7rAisjuNHl-6OOmi1S9A_heFaQ_S2w/exec"

var username = '';
var num = '';
var datas  = '';
var a_status = 'no';
var count_a = 0;
function check(json,message){
    console.log(json);
    if(JSON.stringify(json) == datas){
        alert("登録が完了しました");
        document.getElementById("block6").innerHTML = "登録済み";
        document.getElementById("block4").style.display = "none";
    }else if(json[0] == "no"){
        alert("登録済みです");
        document.getElementById("block6").innerHTML = "登録済み";
        document.getElementById("block4").style.display = "none";
    }else if(json[0] == json[1] && message == "check"){
      a_status = "ok";
      document.getElementById("block6").innerHTML = "";
      var text = '<div class="block5" id="block5" onclick="send()">登録</div>';
      document.getElementById("block6").insertAdjacentHTML("beforeend",text);
    }else if(message == "check_add"){
        count_a++;
        setTimeout(()=>{
            if(count_a < 4){
                check(json,message);
            }else{
                alert("登録エラー");
                document.getElementById("block6").innerHTML = "登録エラー";
                return;
            }
            
        },1000)
    }else{
        alert("error");
    }
    
}

function load_classes(){
    var url2 = new URL(window.location.href);
    try{
    url2 = url2.searchParams;
    username = url2.get("username");
    num = url2.get("num");
    url = url+"?username="+username+"&num="+num+"&branch=no";
    if(num.length > 0 && username.length > 0){
           document.getElementById("b2").innerHTML = username;  
   document.getElementById("b2").style.borderBottom = 'solid';
   document.getElementById("b2").style.borderColor = 'white';
   data_get(username,num,"get_classes");
    }else{
        alert("ログインしてください");
        return;
    }
    
    }catch(e){
        alert("ログインしてください");
        console.log(e);
        console.log("パラメータエラー");
        return;
    }
}

var c_nums = "";
var class_names = [];
var class_status = [];
function get_classes(json){
    var time = new Date();
    var month = time.getMonth()+1;
    var date = time.getDate();
    
    time.setMonth(month,0);
    var last_d = time.getDate();   
 
    
 //json = json[0];
 console.log("get_classes:"+json);
var n_c = 1; //現在の受講コマ数

//現在の授業コマを記録するJSONを作る
c_nums = "[{";
for(var c of json){
    class_names.push(c);
    class_status.push("false");
    c_nums+='"'+c+'":[],';
}
c_nums = c_nums.substring(0,c_nums.length-1)+"}]";
c_nums = JSON.parse(c_nums);
for(var d = 1; d<=7; d++){
    if(date > last_d){
        month+=1;
        date = 1;
    }
 var day_data = month+"/"+date;

 var text1 = '<select name="" id='+"\""+"juko"+d+"\""+' multiple>'
 if(json == "登録されている講座はありません"){
    alert("講座を登録してください");
    document.getElementById("block6").innerHTML = "講座を登録してください";
    return;
 }else if(json == "エラー"){
    alert("エラー");
 }else{
    
 for(var c of json){
    text1 += '<option value="'+c+"第"+n_c+'講" id="'+c+":"+d+'" onclick=c_change("'+c+":"+d+'")>'+c+"第"+n_c+"講"+'</option>';
    c_nums[0][c].push(n_c);
}
}
text1 += '</select>';

 var text = '<div class="block1" id="block1"><div class="c1" id="c1"><p class="schedule" id="schedu">日付</p><p class="schedule2" id="schedule2">'+day_data+'</p></div><div class="c1" id="c1"><p class="schedule" id="schedu">受講予定</p>'+text1+'</div><div class="c1" id="c1"><p class="schedule" id="schedu">高マス予定</p><select name="" id="komasu" multiple><option value="ぐんぐん">ぐんぐん</option></select></div><div class="c1" id="c1"><p class="schedule" id="schedu">その他予定</p><input type="text" id="sonot'+d+'"value="" placeholder="その他予定"></input></div><div class="c1" id="c1"><p class="schedule" id="schedu">来校予定(校舎ならチェック)</p><input type="checkbox" id="checkb'+d+'"value="" checked></input><input type="number"  id="number'+d+'"value="" placeholder="時間(例1700・0900)"></input></div></div>';
 document.getElementById("block4").insertAdjacentHTML("beforeend",text);
 date++;

 console.log(c_nums);
}
document.getElementById("block6").innerHTML = "チェック中";
data_get(username,num,"check");
}


var count = 0;
function data_get(username,num,branch){
if(branch == "get_classes"){
    u = url;
}else if(branch == "check"){
    u = url22+"?username="+username+"&num="+num+"&branch=no";
}else if(branch == "check_add"){
     u = url22+"?username="+username+"&num="+num+"&branch=get";
}
console.log("status:"+branch);
console.log("url:"+u);
fetch(u,{
    "method":"GET",
    "mode":"cors"
})
.then(response =>{
    if(response.ok){
        return response.json()
    }
})
.then(json =>{
    console.log("json:"+json);
    if(branch == "get_classes"){
        get_classes(json);
    }else if(branch == "check"){
        check(json,"check");
    }else if(branch == "check_add"){
        check(json,"check_add");
    }
    
})
.catch(e =>{
    console.log(e);
    alert("読込みエラー");
        
        document.getElementById("block6").innerHTML = "読込みエラー";
    
});
}

function send(){
    if(a_status == "ok"){
datas = [{"a1":[{"juko":[],"kmas":[],"other":[],"time":[]}],"a2":[{"juko":[],"kmas":[],"other":[],"time":[]}],"a3":[{"juko":[],"kmas":[],"other":[],"time":[]}],"a4":[{"juko":[],"kmas":[],"other":[],"time":[]}],"a5":[{"juko":[],"kmas":[],"other":[],"time":[]}],"a6":[{"juko":[],"kmas":[],"other":[],"time":[]}],"a7":[{"juko":[],"kmas":[],"other":[],"time":[]}],"datas":[{"username":[],"num":[]}]}]

for(var i = 1; i <= 7; i++){
var id_name = "juko"+i;
var s_name = "sonot"+i;
var c_name = "checkb"+i;
var t_name = "number"+i;
var js = document.getElementById(id_name).selectedOptions;
//高マスは飛ばしてる
var sonota = document.getElementById(s_name).value;
if(sonota.length == 0){
    sonota = "なし";
}
var checkb = document.getElementById(c_name).checked;
var time = document.getElementById(t_name).value;


var d_n = "a"+i;
if(time.length == 0){
    time = "なし";
}else if(time.length > 0 && checkb == true){
  time = "校舎"+time;
}
datas[0][d_n][0]["other"].push(sonota);
datas[0][d_n][0]["kmas"].push("なし");
datas[0][d_n][0]["time"].push(time);
for(var a of js){
    console.log(a.label);
datas[0][d_n][0]["juko"].push(a.label);
}
if(js.length == 0){
    datas[0][d_n][0]["juko"].push("なし");
}
}
datas[0]["datas"][0]["username"].push(username);
datas[0]["datas"][0]["num"].push(num);
console.log(datas);
console.log(JSON.stringify(datas));

var params = {
    "method":"post",
    "mode":"no-cors",
    "Content-Type":"application/json",
    "body":JSON.stringify(datas)
}
document.getElementById("block5").innerHTML = "登録中";
fetch(url22,params);
setTimeout(()=>{
    data_get(username,num,"check_add");
},2000);

    }else{
        alert("読み込む中です");
    }
}
//曜日をどうするか問題

function jump(param){
    location.href = param+".html?username="+username+"$num="+num;
}

//選択ボックスクリック時に発火→現在の工数を変更する
function c_change(data){
    //総講座数をどのように判別するか 
    //console.log(class_status);
    var c_name = data.substring(0,data.indexOf(":"));
    var id_num = data.substring(data.indexOf(":")+1,);
    var count = -1  ;
    for(var a of class_names){
        count++;
        if(c_name == a){    
            var selectEle = document.getElementById("juko"+id_num).options[count].selected;
        }
    }
    console.log(selectEle);
        if(selectEle == true && c_nums[0][c_name][id_num-1] == c_nums[0][c_name][parseInt(id_num)]){
            for(var i = parseInt(id_num)+1; i <= 7 ; i++){ 
                c_nums[0][c_name][i-1] = c_nums[0][c_name][i-1] + 1 
                document.getElementById(c_name+":"+i).innerHTML = c_name+"第"+c_nums[0][c_name][i-1]+"講";
                document.getElementById(c_name+":"+i).value = c_name+"第"+c_nums[0][c_name][i-1]+"講";
            }
        }else if(selectEle == false && c_nums[0][c_name][id_num-1] != c_nums[0][c_name][parseInt(id_num)]){
            for(var i = parseInt(id_num)+1; i <= 7 ; i++){ 
                c_nums[0][c_name][i-1] = c_nums[0][c_name][i-1] - 1;
                document.getElementById(c_name+":"+i).innerHTML = c_name+"第"+c_nums[0][c_name][i-1]+"講";
                document.getElementById(c_name+":"+i).value = c_name+"第"+c_nums[0][c_name][i-1]+"講";
            }
        }
//iの定義が怪しい
        //前後の講数の一致がどうなのかで判断する
    }
    /*大幅改修中　7/29 
    for(var i = parseInt(id_num)+1; i <= 7; i++){
        //選択状態か否かで分岐
        if(selectEle == false && class_status[count] == "true"){
            c_nums[0][c_name][i-1] = c_nums[0][c_name][i-1] -1;
            
        }else if(selectEle == true && class_status[count] == "false"){
            c_nums[0][c_name][i-1] = c_nums[0][c_name][i-1] +1;
            
        }else{
            console.log(selectEle+":"+class_status[count]);
        }
        console.log("write" + c_nums[0][c_name][i-1])
        document.getElementById(c_name+":"+i).innerHTML = c_name+"第"+c_nums[0][c_name][i-1]+"講";
        document.getElementById(c_name+":"+i).value = c_name+"第"+c_nums[0][c_name][i-1]+"講";
        
    }
        if(selectEle == false && class_status[count] == "true"){
            class_status[count] = "false";
        }else if(selectEle == true && class_status[count] == "false"){
            class_status[count] = "true";
            
        }
console.log(class_status);

*/


//発火の番号は定数化して、valueから工数の変更をする
