document.getElementById("st").onchange = change;
document.getElementById("add1").onclick = add;
function change(data){
    if(data.target.value == "朝勤務"){
   document.getElementById("start_t").value = "09:00";
   document.getElementById("end_t").value = "13:00";
    }else if(data.target.value == "昼勤務"){
   document.getElementById("start_t").value = "14:00";
   document.getElementById("end_t").value = "18:00";
    }else if(data.target.value == "夜勤務"){
   document.getElementById("start_t").value = "18:00";
   document.getElementById("end_t").value = "22:00";
    }
}
var schedules = [{1:[],2:[],3:[]}];
function add(){
    var a = "koko";
    schedules[0][1].push(a);
    console.log(schedules);
}
document.getElementById("b1").onclick = up;
function up(){

}

document.getElementById("b1").onclick = pup;
function pup(){
    document.getElementById("u").style.display = "block";
    document.getElementById("u").style.opacity = "1";
}
