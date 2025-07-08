var alert_message = '';
var url1 = "https://script.google.com/macros/s/AKfycbz4hdeZuRQlKZ_feVpm7eM0fCLODx5D1_KQi5AacpknuoUIcRaU25pPnwHdqozC8Prr/exec";
var username = '';
var num = '';

var count = 0;
var count2 = 0;
var branch = "go";
function ani2(){

var r = setInterval(()=>{
   count2++;
if(count2 == 1){
document.getElementById("loding").innerHTML = "読込み中.";
document.getElementById("loding2").innerHTML = "読込み中.";
try{
document.getElementById("loding3").innerHTML = "読込み中.";
}catch{

}

}else if(count2 == 2){
document.getElementById("loding").innerHTML = "読込み中..";
document.getElementById("loding2").innerHTML = "読込み中..";
try{
document.getElementById("loding3").innerHTML = "読込み中..";
}catch{
   
}
}else if(count2 == 3){
document.getElementById("loding").innerHTML = "読込み中...";
document.getElementById("loding2").innerHTML = "読込み中...";
try{
document.getElementById("loding3").innerHTML = "読込み中...";
}catch{
   
}
}else if(count2 == 4){
   document.getElementById("loding").innerHTML = "読込み中";
   document.getElementById("loding2").innerHTML = "読込み中";
try{
document.getElementById("loding3").innerHTML = "読込み中";
}catch{
   
}
   count2 = 0;
}
},500)

}
function ani(){
   document.getElementById("b2").style.borderBottom = "2px solid white";
   document.getElementById("b3").style.borderBottom = "2px solid white";
   document.getElementById("center").style.display = "none";
   document.getElementById("center").style.opacity = "0";
   document.getElementById("log").style.display = "block";
   document.getElementById("log").style.opacity = "1";
   document.getElementById("block2").style.display = "none";
   document.getElementById("block2").style.opacity = "0";
var r = setInterval(()=>{
   count++;
   if(branch == "go" && count == 1){
      $("#b2").animate({
         "opacity":0
      },1000)
      $("#b3").animate({
         "opacity":0
      },1000)
      
   }else if(branch == "go" && count == 2){
      $("#b2").animate({
         "opacity":1
      },1000)
      $("#b3").animate({
         "opacity":1
      },1000)
      count=0;
   }else{
      clearInterval(r);
   }
})

}
function load_all(e){
 /*var cookies = document.cookie;
 cookies = cookies.split(";")
 for( var cookie of cookies){
   cookie = cookie.split("=");
   var key = cookie[0];
   var value = cookie[1];
   if(key == "username"){
      //URL作成処理→関数に渡す
   }
 }*/
//cookieかクエリパラメータで対処
url =  new  URL(window.location.href);
var params = url.searchParams;
    try{
    username = params.get("username");
    num = params.get("num");
    if(num.length > 0 && username.length > 0){
   document.getElementById("b2").innerHTML = username;  
   document.getElementById("b2").style.borderBottom = 'solid';
   document.getElementById("b2").style.borderColor = 'white';

   document.getElementById("center").style.display = "block";
   document.getElementById("center").style.opacity = "1";
   document.getElementById("block2").style.display = "block";
   document.getElementById("block2").style.opacity = "1";
   document.getElementById("log").style.display = "none";
   document.getElementById("log").style.opacity = "0";
   ani2();
   load_only("schedule_now");
    }else{
        alert("ログインしてください");
        ani();
        return;
    }
    
    }catch(e){
        alert("ログインしてください");
        ani();
        console.log(e);
        console.log("パラメータエラー");
        return;
    }
}
function load_only(branch){
   if(branch == "schedule_now"){
      url = url1+"?username="+username+"&num="+num;
   }else if(branch == "news"){
      url = "https://script.google.com/macros/s/AKfycbzjeZvVl3rbt4aJkeJ-wKIJLNghhXN2m84TOYZ8JsFaoYkYa4LLET_rl-iaw5FTFOTe/exec";
   }
      fetch(url,{//クエリパラメータで
      "method":"GET",
      "mode":"cors"
   })
   .then(response => {
      if(response.ok){
         return response.json()
      }
   })
   .then(jsondata =>{
      console.log("datas_get!!");
      console.log(jsondata);
         if(branch == "news"){
   load_news(jsondata);
   }else if(branch == "schedule_now"){
   load_schedule_now(jsondata);
   }
   })
   .catch(res =>{
      console.log(res);
      alert_to_gas(res);
      return;
   })


}
function load_schedule_now(json_data){
   
      var text = "a";   
      document.getElementById("box3").innerHTML = "";
      for(var i = 1; i<=7; i++){
         console.log(text+i);
         var datas = json_data[0][text+i];
         console.log("datas : "+datas);
         var script = '<div class="block1" id="block1"><div class="c1" id="c1"><p class="schedule" id="schedu">日付</p><p class="schedule2" id="schedule2">6/6</p></div>';//本来はここも反復処理

         script+='<div class="c1" id="c1"><p class="schedule" id="schedu">受講予定</p><div class="box4" id="box4">';
         for(var j of datas[0]["juko"]){

            script+='<p class="schedule2" id="schedule2">'+j+'</p>'
         }
         script+='</div></div><div class="c1" id="c1"><p class="schedule" id="schedu">高マス予定</p><div class="box5= id="box5">';
         for(var j of datas[0]["kmas"]){

            script+='<p class="schedule2" id="schedule2">'+j+'</p>'
         }
         script+='</div></div><div class="c1" id="c1"><p class="schedule" id="schedu">その他予定</p><div class="box6" id="box6">';
         for(var j of datas[0]["other"]){

            script+='<p class="schedule2" id="schedule2">'+j+'</p>'
         }
         script+='</div></div><div class="c1" id="c1"><p class="schedule" id="schedu">来校予定</p><p class="schedule2" id="schedule2">'+datas[0]["time"]+'</p></div></div>';
         document.getElementById("box3").insertAdjacentHTML("beforeend",script);
      }
   load_only("news");
}
function load_news(json_data){
   var count = 0;
for(var a of json_data){
count++;
if(count <= 3){
   document.getElementById("block1").innerHTML = "";
   var text1 = '<div class="block1" id="block1">'+a+'</div>';
document.getElementById("box1").insertAdjacentHTML("beforeend",text1);
}
}
text1 = '<div class="block11" id="block1" onclick=jump("news_e")>もっと詳しく→ </div>'
document.getElementById("box1").insertAdjacentHTML("beforeend",text1);
}
function alert_to_gas(text){
var data = [{
   "alert_message":text
}];
var params = {
   "method":"post",
   "mode":"no-cors",
   "Content-Type":"application/json",
   "body":JSON.stringify(data)
}
var res = fetch(params,url);
//resのレスポンス処理をどうするか
}
function jump(text){
   location.href = text+".html"+"?username="+username+"&num="+num;
}

//ログインしたらキーを発行・一時間のみ有効