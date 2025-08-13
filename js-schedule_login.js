var url2 = "https://script.google.com/macros/s/AKfycbx0xGKdu9XNdBmaQV9S1kUGB44f6boIPswobzhvHawe6ahkRSWJkoSwhW1cspUOh1o/exec";
var url = "";
var st = "lg";
document.getElementById("username").addEventListener("keydown",(e)=>{
    if(e.key == "Enter"){
        register(st);
    }
})
document.getElementById("pass").addEventListener("keydown",(e)=>{
    if(e.key == "Enter"){
        register(st);
    }
})
document.getElementById("mail").addEventListener("keydown",(e)=>{
    if(e.key == "Enter"){
        register(st);
    }
})
var count = 0;
function register(text){
    console.log("Start");
    ani();
    var username = document.getElementById("username").value;
    try{
    var password = document.getElementById("pass").value;    
    }catch(e){

    }
    if(text == "login"){
            if(username.length == 0 || password.length == 0){
        alert("空欄があります");
        stop();
        return;
            }
        document.getElementById("n").innerHTML = "Checking...";
        url+=url2+'?username='+username+'&password='+password+'&branch=login&puls=ready';
    }else if(text == "lg"){
            if(username.length == 0 || password.length == 0){
        alert("空欄があります");
        stop();
        return;
    }
        document.getElementById("n").innerHTML = "Logining...";
        url+=url2+'?username='+username+'&password='+password+'&branch=login';
    }else if(text == "register"){
        var mail = document.getElementById("mail").value;
            if(username.length == 0 || password.length == 0 || mail.length == 0){
        alert("空欄があります");
        stop();
        return;
    }
        document.getElementById("n").innerHTML = "Registering...";
        url+=url2+'?username='+username+'&password='+password+'&branch=register&mail='+mail;
    }else if(text == "check"){
        var mail = document.getElementById("mail").value;
        if(username.length == 0 || mail.length == 0){
            alert("空欄があります");
            stop();
            return;
        }
            url+=url2+'?username='+username+'&mail='+mail+'&branch=check';
    }
    
    fetch(url,{
        "method":"get",
        "mode":"cors"
    })
    .then(response=>{
        if(response.ok){
            return response.json();
        }
    })
    .then(json=>{
        console.log(json);
        if(json[0] == "ready"){
            setTimeout(()=>{
                register("login");
            },1000)
        }else if(json[0] == "register-ok"){
            alert("登録完了\n自動でログインします");
            stop();
            location.href = "schedule.html?username="+username;
        }else if(json[0] == "ok" ){
            alert("ログインしました");
            stop();
            location.href="schedule.html?username="+username;
        }else if(json[0] == "send"){
            alert("パスワードを登録されているメールアドレスに送信しました");
        }else if(json[0] == "yet"){
            alert("ユーザー名が既に登録されています");
            stop();
            return;
        }else{
            alert(json);
        }
        stop();
    })
    .catch(e=>{
        console.log(e);
        stop();
    })
    url="";
}
function change_screen(){
    document.getElementById("btn").remove();
    var text = '<button id="btn"onclick=register("register")>新規登録</button><p id="back" onclick="back()">ログイン画面に戻る</p>'
    document.getElementById("bt1").insertAdjacentHTML("beforeend",text);
    document.getElementById("mail").style.display = "block";
    document.getElementById("bt").style.display = "none";
    document.getElementById("h1").innerHTML = "東進衛星予備校藤沢駅南口校シフト管理　｜　新規登録";
    st = "register";
}
function back(){
    document.getElementById("btn").remove();
    document.getElementById("back").remove();
    document.getElementById("mail").style.display = "none";
    document.getElementById("bt").style.display = "block";
    document.getElementById("pass").style.display = "block";
    document.getElementById("h1").innerHTML = "東進衛星予備校藤沢駅南口校シフト管理　｜　ログイン"
        var text = '<button id="btn"onclick=register("lg")>ログイン</button>';
    document.getElementById("bt1").insertAdjacentHTML("beforeend",text);
    st = "lg";
}

function forget_password(){
    document.getElementById("h1").innerHTML = "東進衛星予備校藤沢駅南口校シフト管理　｜　パスワード発行"
    document.getElementById("mail").style.display = "block";
    document.getElementById("pass").style.display = "none";
    document.getElementById("bt").style.display = "none";
    document.getElementById("btn").remove();
    var text = '<button id="btn"onclick=register("check")>パスワードを確認</button><p id="back" onclick="back()">ログイン画面に戻る</p>'
    document.getElementById("bt1").insertAdjacentHTML("beforeend",text);
    st = "check";
    alert("メールアドレスは、新規登録時に登録したものを入力してください")
}
var branch = "run";
function stop(){
document.getElementById("f").style.display = "none";
document.getElementById("full").style.display = "none";
run = "stop";
}
function ani(){
branch = "run";
document.getElementById("f").style.display = "block";
document.getElementById("full").style.display = "block";
var s = setInterval(()=>{
    if(branch == "stop"){
        clearInterval(s);
    }else{
$("#n").animate({
    opacity:0
},625)
$("#n").animate({
    opacity:1
},625)
$("#n").animate({
    opacity:0
},625)
$("#n").animate({
    opacity:1
},625)
$("#b1").animate({
    width:0,
    left:'10vw'
},1000)
$("#b2").animate({
    width:0,
    left:'10vw',
    top:'10vw'
},1000)
$("#b3").animate({
    width:0
},1000)
$("#b4").animate({
    width:0,
    left:'0',
    top:'0'
},1000)

$("#b1").animate({
    width:0,
    left:'0'
},500)
$("#b2").animate({
    width:0,
    left:'10vw',
    top:'0'
},500)
$("#b3").animate({
    width:0,
    left:"10vw"
},500)
$("#b4").animate({
    width:0,
    left:'0',
    top:'9.9vw'
},500)

$("#b1").animate({
    width:'9.9vw',
    left:'0'
},1000)
$("#b2").animate({
    width:'10vw',
    left:'5vw',
    top:'4.85vw'
},1000)
$("#b3").animate({
    width:'10vw',
    left:'0vw'
},1000)
$("#b4").animate({
    width:'9.9vw',
    left:'-5vw',
    top:'4.85vw'
},1000)
    }
},2500);
}