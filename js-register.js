var url = "https://script.google.com/macros/s/AKfycbxpC6RDPFpslZtzAJf8V-HCkYqB2KhkwkYZasfM_rxLTG-_KbLbx68KYtLgFbyldwtc/exec";
var branch = "run";
function regi(){
    var branch = "run";
    ani();
    var name = document.getElementById("name").value;
    var num = document.getElementById("num").value;
 var data = [{
    "name":name,
    "num":num
 }];
 var  params = {
    "method":"post",
    "mode":"no-cors",
    "Content-Type":"application/json",
    "body":JSON.stringify(data)
 }

 var res = fetch(url,params);
setTimeout(()=>{
check(name+":"+num);
},5000)

}
var count_r = 0;
function check(data){
    var url ="https://script.google.com/macros/s/AKfycbxpC6RDPFpslZtzAJf8V-HCkYqB2KhkwkYZasfM_rxLTG-_KbLbx68KYtLgFbyldwtc/exec";//クエリパラメータつけること
    var username = data.substring(0,data.indexOf(":"));
    var num = data.substring(parseInt(data.indexOf(":"))+1,);
console.log("username:"+username);
console.log("NUM:"+num);
url+="?username="+username+"&num="+num;
console.log(url);
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
            console.log("STATUS:"+json_data[0])
            alert("登録が完了しました");
        }else if(json_data[0] == "yet"){
            alert("登録済みです");
            branch="stop";
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
}
        }
    })
}

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
