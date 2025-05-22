var url = "https://script.google.com/macros/s/AKfycbzOZAq9JFJc5BpIG-4zERxHzwt8SeiV4Hle7wH2LPC9_QQThY9FJ2RpuGfGelEI2Ah3rw/exec";
var branch = "run";
function send(){
    branch = "run";
    ani();
    username = document.getElementById("name").value;
    num = document.getElementById("num").value;

    check(username+":"+num);
}
//gas 最後のログインから一定時間で STATUSを変えるようにする
var count_r = 0;
function check(data){
    var username = data.substring(0,data.indexOf(":"));
    var num = data.substring(parseInt(data.indexOf(":"))+1,);
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
            var text1 = "username="+username; //;これいるっけ
            var text2 = "usernum="+num;
            var text3 = "status="+json_data[0];
            document.cookie = text1;
            document.cookie = text2;
            document.cookie = text3;
            alert("ログインしました");
            var url = "index.html?username="+username+"&num="+num+"&status="+"login";
            location.href = url;
        }else{
            if(count_r < 3){
    count_r++;
    setTimeout(()=>{
check(username+":"+num);
    },5000)
}else{
            alert(json_data[0]);
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