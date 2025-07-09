var url = "https://script.google.com/macros/s/AKfycbxPgr666297xQkeGKUTlC4So00jWlbcTlvoGl_y0sZptVooUNpmG2dlrpFYsMg97bqc/exec";
var username = '';
var num = '';
var load_status = 'no';
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
data_get("all");
    }else{
        alert("ログインしてください");
        location.href = "login.html";
        return;
    }
    
    }catch(e){
        alert("ログインしてください");
        location.href = "login.html";
        console.log(e);
        console.log("パラメータエラー");
        return;
    }

}
var count_r = 0;
function data_get(branch,c_name2){
    
    var url2 = url+"&branch="+branch;
    fetch(url2,{
        "method":"get",
        "mode":"cors"
    })
    .then(response =>{
        if(response.ok){
            return response.json()
        }
    })
    .then(json =>{
        console.log(json);
      if(branch == "all"){
        document.getElementById("block4").innerHTML = "";
        
        if(json[0] == '登録されている講座はありません'){
var text = '<div class="block5" id="block55"><p class="ti">'+json[0]+'</p></div>'
          document.getElementById("block4").insertAdjacentHTML("beforeend",text);
        }else if(json.length == 1 ){
          var text = '<div class="block5" id="block5"><p class="ti">'+json[0]+'</p><p class="schedule5" id='+"\""+json[0]+"\""+' onclick=del('+"\""+json[0]+"\""+')>削除</p></div>'
          document.getElementById("block4").insertAdjacentHTML("beforeend",text);
        }else{
         for(var c of json){
          var text = '<div class="block5" id="block5"><p class="ti">'+c+'</p><p class="schedule5" id='+"\""+c+"\""+' onclick=del('+"\""+c+"\""+')>削除</p></div>'
          document.getElementById("block4").insertAdjacentHTML("beforeend",text);
         }
        }  
         load_status = "yes";
      }else if(branch == "new"){
        var last = parseInt(json.length)-1;
        console.log("last"+last)
        if(c_name2 == json[last]){
            try{
            document.getElementById("block55").remove();
            }catch(e){
                
            }
          var text = '<div class="block5" id="block5"><p class="ti">'+c_name2+'</p><p class="schedule5" id='+"\""+c_name2+"\""+'onclick=del('+"\""+c_name2+"\""+')>削除</p></div>'
          document.getElementById("block4").insertAdjacentHTML("beforeend",text);
          document.getElementById("schedule2").innerHTML = "登録";
            ani("schedule2","s");
          alert("登録できました");
        }else{
          count_r++;
          if(count_r < 3){
            setTimeout(()=>{
                data_get("new");
            },2000);
          }else{
            alert("登録できませんでした");
            document.getElementById("schedule2").innerHTML = "登録";
              ani("schedule2","s");
            count_r = 0;
          }
        }
      }else if(branch == "del"){
        json = json[0];
        
        for(var c_name of json){
         if(c_name2 == c_name){
          alert("エラー");
          console.log("削除失敗");
          document.getElementById(c_name).innerHTML = "削除";
             ani(c_name,"s");
          return;
         }
        }
        alert("削除しました");
        location.href = "c_add.html?username="+username+"&num="+num;
      }
    })//ここいる？
    .catch(e =>{
        console.log(e);
        return "Error"
    })
}
var c_name = '';
function send(){
    if(load_status == "yes"){
    c_name = document.getElementById("c_name").value;    
    if(c_name.length > 0){
    post_data(c_name,"add");
    document.getElementById("schedule2").innerHTML = "登録中";
    ani("schedule2","nf");
    setTimeout(()=>{data_get("new",c_name);},2000);
    }else{
        alert("空欄です");
        return;
    }
    console.log(res.Response)
}else{
    alert("読込み中です。そのまま待機していてください");
    setTimeout(()=>{
        send();
    },2000)
}
}

function del(c_name){
    if(load_status == "yes"){
document.getElementById(c_name).innerHTML = "削除中";//id名が日本語だからうまく動かない可能性大URI化のほうがよきかも
 ani(c_name,"nf");
 post_data(c_name,"del");
 setTimeout(()=>{
data_get("del",c_name);
 },2000)
}else{
    alert("読込み中です。そのまま待機していてください");
    setTimeout(()=>{
        del(c_name);
    },2000)
}
}
function post_data(c_name,branch){
    var data = [{
        "c":c_name,
        "name":username,
        "num":num,
        "branch":branch
    }];
    var params = {
        "method":"post",
        "mode":"no-cors",
        "Content-Type":"application/json",
        "body":JSON.stringify(data)
    }
    
    fetch(url,params);
}
var count = 0;
function ani(id,branch){
if(branch == "nf"){
var r = setInterval(()=>{
    count++;
    if(count == 1){
$("#"+id).animate({
  "color":"black"
 },500);
    }else{
$("#"+id).animate({
  "color":"white"
 },500);
    count = 0;
    }
})
}else if(branch == "d"){
    var count = 0;
var r = setInterval(()=>{
count++;
if(count ==1){
 document.getElementById("small").innerHTML = "読み込み中.";
}else if(count == 2){
 document.getElementById("small").innerHTML = "読み込み中..";
}else if(count == 3){
 document.getElementById("small").innerHTML= "読み込み中...";
}else if(count == 4){
    document.getElementById("small").innerHTML = "読み込み中";
    count = 0
}
},500)

}else{
    clearInterval(r);
    document.getElementById(id).style.color = "white";
}
}
function jump(n){
    location.href = n+".html?username="+username+"&num="+num;
}
