var alert_message = '';
var url = "";

function load_all(){
 var cookies = document.cookie;
 cookies = cookies.split(";")
 for( var cookie of cookies){
   cookie = cookie.split("=");
   var key = cookie[0];
   var value = cookie[1];
   if(key == "username"){
      //URL作成処理→関数に渡す
   }
 }
}
function load_only(branch){
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
      
     var dates = json_data["date"];
     var c_schedules = json_data["c_schedule"];
     var o_schedules = json_data["o_schedules"];
     var others = json_data["others"]
     var times = json_data["time"];
    var count = 0;
    for(var date of dates){
      var time = times[count]
      var text1 = '<div class="block1" id="block1"><div class="c1" id="c1"><p class="schedule" id="schedu">日付</p><p class="schedule2" id="schedule2">'+date+'</p></div><div class="c1" id="c1"><p class="schedule" id="schedu">受講予定</p><div class="box4" id="box4"></div></div><div class="c1" id="c1"><p class="schedule" id="schedu">高マス予定</p><div class="box5= id="box5"></div></div><div class="c1" id="c1"><p class="schedule" id="schedu">その他予定</p><div class="box6" id="box6"></div></div><div class="c1" id="c1"><p class="schedule" id="schedu">来校予定</p><p class="schedule2" id="schedule2">'+time+'</p></div></div>';
      document.getElementById("box3").insertAdjacentElement("beforeend",text1);
      //insertAdjaccentで挿入されたidに入力できないかもしれん
      for(var a of c_schedules[date]){
         var text2 = '<p class="schedule2" id="schedule2">'+a+'</p>';
         document.getElementById("box4").insertAdjacentElement("beforeend",text2);
      }
      for(var a of o_schedules[date]){
         var text2 = '<p class="schedule2" id="schedule2">'+a+'</p>';
         document.getElementById("box5").insertAdjacentElement("beforeend",text2);
      }
      for(var a of others[date]){
         var text2 = '<p class="schedule2" id="schedule2">'+a+'</p>';
         document.getElementById("box6").insertAdjacentElement("beforeend",text2);
      }
   count++; 
   }
}
function load_news(json_data){
     var news_e = json_data[0];
     var news_i = json_data[1];
     if(news_e.length > 3){
      for(var i = 0; i<3; i++){
var text1 = '<div class="block1" id="block1">'+news_e[i]+'/div>';
document.getElementById("box1").insertAdjacentElement("beforeend",text1);
      }
     }else{
      for(var a of news_e){
         var text1 = '<div class="block1" id="block1">'+a+'/div>';
document.getElementById("box1").insertAdjacentElement("beforeend",text1);
      }
     }
     if(news_i > 3){
      for(var i=0; i<3; i++){
         var text1 = '<div class="block1" id="block1">'+news_i[i]+'/div>';
      document.getElementById("box2").insertAdjacentElement("beforeend",text1)
      }
     }else{
     for(var a of news_i){
         var text1 = '<div class="block1" id="block1">'+a+'/div>';
document.getElementById("box2").insertAdjacentElement("beforeend",text1);
   
     }
     }

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
   location.href = text+".html";
}