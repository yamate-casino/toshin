var url = "https://script.google.com/macros/s/AKfycbzOZAq9JFJc5BpIG-4zERxHzwt8SeiV4Hle7wH2LPC9_QQThY9FJ2RpuGfGelEI2Ah3rw/exec";
var branch = "run";
function send(){
    branch = "run";
    ani();
    username = document.getElementById("name").value;
    num = document.getElementById("num").value;

    check(username,num);
}
//gas 最後のログインから一定時間で STATUSを変えるようにする
var count_r = 0;
function check(username,num){
console.log("username:"+username);
console.log("NUM:"+num);
url+="?username="+username+"&num="+num;
    fetch(url,{
        "mode":"get",
        "mode":"cors"
    })
    .then(response =>{
        if(response.ok){
            return response.json();
        }
    })
    .then(json_data=>{
        if(json_data[0] == "ok"){
            branch = "stop";
            var text1 = "username="+username+'; Max-Age = 3600'; //;これいるっけ
            var text2 = "num="+num+'; Max-Age = 3600';
            document.cookie = text1;
            document.cookie = text2;
            alert("ログインしました");
            var url = "index.html?username="+username+"&num="+num+"&status="+"login";
            location.href = url;
        }else{
            if(count_r < 3){
                document.getElementById("l").innerHTML = "ログイン中（読込みに時間がかかります）";
                document.getElementById("l").style.fontSize = "10px";
    count_r++;
    setTimeout(()=>{
check(username+":"+num);
    },2000)
}else{
                if(json_data[0] == "no"){
    var message = "ログインできませんでした";
    }else if(json_data[0] == "hint"){
        var message = "名前または生徒番号が間違っています"
    }
            alert(message);
            console.log("STATUS:"+json_data[0])
            branch = "stop";
            location.href="login.html";
}
            
        }
    })
}
var count = 0;
function ani(){
document.getElementById("loading").style.display = "block";
document.getElementById("loading").style.opacity = 1;
var s = setInterval(()=>{
    $("#bar").animate({
        "width":0,
        "left":"62.5vw"
    },1500)
    $("#bar").animate({
        "width":"25vw",
        "left":"50vw"
    },0)
    console.log(branch)
        if(branch == "stop"){
            document.getElementById("loading").style.display = "none";
            document.getElementById("loading").style.opacity = 0;
        clearInterval(s)
    }
},1500)

}

///リスクの個別性がでてきた→社会保険じゃなくて社会サービスにするべき
//スクールカウンセラー（児童の心理などに重きをおいている）とソーシャルワーカー（社会とのつながりに重きをおいている）の違い