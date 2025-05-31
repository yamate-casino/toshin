function load(){
    var date = new Date();
    month = date.getMonth()+1;
    date = date.getDate();
    console.log(month);  
    console.log(date);  
}
function send(){
 var datas = [{
    "date":"日付",
    "sche1":"受講予定",
    "sche2":"高マス予定",
    "shce3":"その他予定",
    "time":"登校時間"
 }]
 var params = {
    "method":"POST",
    "mode":"no-cors",
    "Content-Type":"application/json",
    "body":JSON.stringify(datas)
 }
}
