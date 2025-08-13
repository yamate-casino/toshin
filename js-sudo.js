var url = "";

function register(text){
    var username = document.getElementById("").value;
    var password = document.getElementById("").value;
    if(username.length == 0 || password.length == 0){
        alert("空欄があります");
        return;
    }
    url+='?branch='+text+'&username='+username+'password='+password;
    if(text == "login"){
        url+='&puls=ready';
    }
    
    fetch(url,{
        "method":"get",
        "mode":"no-cors"
    })
    .then(response=>{
        if(response.ok){
            return response.json()
        }
    })
    .then(json=>{
        if(json == "ready"){
            setTimeout(()=>{
                register("login")
            },1000)
        }else if(json == "register-ok"){
            alert("登録完了");
        }else{
            alert("エラー");
        }
    })

    .catch(e=>{
        console.log(e);
    })
}

function login(text){

}