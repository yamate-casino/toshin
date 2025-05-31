var url = "https://script.google.com/macros/s/AKfycbxPgr666297xQkeGKUTlC4So00jWlbcTlvoGl_y0sZptVooUNpmG2dlrpFYsMg97bqc/exec";
var username = '';
var num = '';
function load_classes(){
    var url2 = new URL(window.location.href);
    try{
    url2 = url2.searchParams;
    username = url2.get("username");
    num = url2.get("num");
    url = url+"?username="+username+"&num="+num;
    if(num.length > 0 && username.length > 0){
           document.getElementById("b2").innerHTML = username;  
   document.getElementById("b2").style.borderBottom = 'solid';
   document.getElementById("b2").style.borderColor = 'white';
   data_get(username,num);
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
function get_classes(json){
    var time = new Date();
    var month = time.getMonth()+1;
    var date = time.getDate();
    
    time.setMonth(month,0);
    var last_d = time.getDate();   
 
    
 json = json[0];
 console.log(json);
 var text1 = '<select name="" id="juko" multiple>'
 if(json[1].length == 1){
  text1 += '<option value='+"\""+json+"\""+'>'+json+'</option>';
 }else if(json == "エラー"){
    alert("エラー");
 }else{
 for(var c of json){
    text1 += '<option value='+"\""+c+"\""+'>'+c+'</option>';
 }
}
text1 += '</select>';
for(var d = 1; d<=7; d++){
    if(date > last_d){
        month+=1;
        date = 1;
    }
 var day_data = month+"/"+date;
 var text = '<div class="block1" id="block1"><div class="c1" id="c1"><p class="schedule" id="schedu">日付</p><p class="schedule2" id="schedule2">'+day_data+'</p></div><div class="c1" id="c1"><p class="schedule" id="schedu">受講予定</p>'+text1+'</div><div class="c1" id="c1"><p class="schedule" id="schedu">高マス予定</p><select name="" id="komasu" multiple><option value="ぐんぐん">ぐんぐん</option></select></div><div class="c1" id="c1"><p class="schedule" id="schedu">その他予定</p><input type="text" id="sonota" value="" placeholder="その他予定"></div><div class="c1" id="c1"><p class="schedule" id="schedu">来校予定(校舎ならチェック)</p><input type="checkbox" value=""><input type="number" value="" placeholder="時間(例1700・0900)"></div></div>';
 document.getElementById("block4").insertAdjacentHTML("beforeend",text);
 date++;
}
document.getElementById("block5").innerHTML = "登録";
}
function data_get(username,num){

fetch(url,{
    "method":"GET",
    "mode":"cors"
})
.then(response =>{
    if(response.ok){
        return response.json()
    }
})
.then(json =>{
    get_classes(json);
})
.catch(e =>{
    console.log(e);
    alert("読込みエラー");
});
}

function send(){

}