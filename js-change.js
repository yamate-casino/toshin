var url = "https://script.google.com/macros/s/AKfycbz4hdeZuRQlKZ_feVpm7eM0fCLODx5D1_KQi5AacpknuoUIcRaU25pPnwHdqozC8Prr/exec";
var url2 = "https://script.google.com/macros/s/AKfycbxPgr666297xQkeGKUTlC4So00jWlbcTlvoGl_y0sZptVooUNpmG2dlrpFYsMg97bqc/exec";
var script = '';
var script2 = '';
var json = '';
var json2 = '';
function data_get2(){
 data_get("get",url);
 data_get("data_get",url2);
}
function data_get(branch,u){
    var para = new URL(window.location.href);
para = para.searchParams;
var username = para.get("username");
var num = para.get("num");
    u = u+"?username="+username+"&num="+num;
    fetch(u,{
        "method":"get",
        "mode":"cors"
    })
    .then(response =>{
        if(response.ok){
            return response.json()
        }
    })
    .then(js =>{
        console.log(js);
            if(branch == "get"){
                json = js;
            }else if(branch == "data_get"){
                json2 = js;
            }
            if(json.length > 0 && json2.length > 0){
                data_write();
            }
    })
    .catch(err =>{
        console.log(err);
    })
}


function data_write(){
    var text = "a";
    document.getElementById("box").innerHTML = "";  
    for(var i =1; i<=7; i++){
        script = '<div  class="block11" id="block1"><div class="c1" id="c1"><p class="schedule" id="schedu">現在の予定</p><p class="schedule2">現在の予定</p></div><div class="c1" id="c1"><p class="schedule" id="schedu">日付</p><p class="schedule2" id="schedule2">5/18</p></div><div class="c1" id="c1"><p class="schedule" id="schedu">受講予定</p>';
        var datas = json[0][text+i];
        for(var j of datas[0]["juko"]){
            script+='<p class="schedule2">'+j+'</p>';
        }
        script+= '</div><div class="c1" id="c1"><p class="schedule" id="schedu">高マス予定</p>';
                for(var j of datas[0]["kmas"]){
            script+='<p class="schedule2">'+j+'</p>';
        }
        script+='</div><div class="c1" id="c1"><p class="schedule" id="schedu">その他予定</p><p class="schedule2">'+datas[0]["other"][0]+'</p></div><div class="c1" id="c1"><p class="schedule" id="schedu">来校予定(校舎ならチェック)</p>';
        //<input type="checkbox" value=""><input type="number" value="'+datas[0]["time"][0]+'" placeholder="時間(例1700・0900)"></div><div class="c1" id="c1"><p class="schedule" id="schedu">変更申請</p><p class="schedule4" onclick="send("b'+i+'")">申請</p></div></div>';                        

        //謎エラーはいてる　６\13
        
        if(datas[0]["time"][0].indexOf("校舎") != -1){
            var t = datas[0]["time"][0].substring(parseInt(datas[0]["time"][0].indexOf("校舎"))+2,);
            console.log("time : "+t);
            script+='<input type="checkbox" value="" checked ><input type="number" value="'+t+'" placeholder="時間(例1700・0900)"></div></div>';
        }else if(datas[0]["time"][0] != "なし"){
            script+='<input type="checkbox" value=""><input type="number" value="'+data[0]["time"][0]+'" placeholder="時間(例1700・0900)"></div></div>';
        }else{
            script+='<input type="checkbox" value=""><input type="number" value="" placeholder="時間(例1700・0900)"></div></div>';
        }
        script2 = '<div class="block1" id="block1"><div class="c1" id="c1"><p class="schedule" id="schedu">予定変更</p><p class="schedule4" onclick="send('+i+')">申請</p></div><div class="c1" id="c1"><p class="schedule" id="schedu">日付</p><p class="schedule2" id="schedule2">5/18</p></div><div class="c1" id="c1"><p class="schedule" id="schedu">受講予定</p><select name="" id='+"\""+"juko"+i+"\""+' multiple>';
          
         for(var j2 of json2){
            script2 += '<option value='+"\""+j2+"\""+'>'+j2+'</option>';
          }
            script2+= '</select></div><div class="c1" id="c1"><p class="schedule" id="schedu">高マス予定</p><select name="" id="komasu" multiple><option value="ぐんぐん">ぐんぐん</option></select></div><div class="c1" id="c1"><p class="schedule" id="schedu">その他予定</p><input type="text" id="sonot'+i+'"value="" placeholder="その他予定"></input></div><div class="c1" id="c1"><p class="schedule" id="schedu">来校予定(校舎ならチェック)</p>';
        //<input type="checkbox" value=""><input type="number" value="'+datas[0]["time"][0]+'" placeholder="時間(例1700・0900)"></div><div class="c1" id="c1"><p class="schedule" id="schedu">変更申請</p><p class="schedule4" onclick="send("b'+i+'")">申請</p></div></div>';                        

            script2+='<input type="checkbox" id="cbox'+i+'"value=""><input type="number" value="" id="t'+i+'" placeholder="時間(例1700・0900)"></div></div>';//iのところは元々p 7/6
        document.getElementById("box").insertAdjacentHTML("beforeend",script);
        document.getElementById("box").insertAdjacentHTML("beforeend",script2);
    }
    
    
}

function send(p){
var datas = [{"a1":[{"pre":[{"juko":[],"kmas":[],"other":[],"time":[]}],"new":[{"juko":[],"kmas":[],"other":[],"time":[]}]}],"a2":[{"pre":[{}],"new":[{}]}],"a3":[{"pre":[{}],"new":[{}]}],"a4":[{"pre":[{}],"new":[{}]}],"a5":[{"pre":[{}],"new":[{}]}],"a6":[{"pre":[{}],"new":[{}]}],"a7":[{"pre":[{}],"new":[{}]}]}];
//空白判定忘れないように
var id_name = "juko"+p
var js = document.getElementById(id_name).selectedOptions;
for(var j of js){
    console.log(j.label);
datas[0]["a"+p][0]["new"][0]["juko"].push(j.label);
}
//datas[0]["a"+p][0]["new"][0]["kmas"].push("なし"); //今後改築
var o_d = document.getElementById("sonot"+p).value;
datas[0]["a"+p][0]["new"][0]["other"].push(o_d);    
if(document.getElementById("cbox"+p).checked == true && (document.getElementById("t"+p).value).length > 0){
datas[0]["a"+p][0]["new"][0]["time"].push("校舎"+document.getElementById("t"+p).value);
}else if((document.getElementById("t"+p).value).length > 0){
    datas[0]["a"+p][0]["new"][0]["time"].push("自宅"+document.getElementById("t"+p).value);
}
for(var j3 of json[0]["a"+p][0]["juko"]){
    datas[0]["a"+p][0]["pre"][0]["juko"].push(j3);
}
    datas[0]["a"+p][0]["pre"][0]["kmas"].push("なし");
    datas[0]["a"+p][0]["pre"][0]["other"].push(json[0]["a"+p][0]["other"][0]);//最後わんちゃん[0]いるかも
    datas[0]["a"+p][0]["pre"][0]["time"].push(json[0]["a"+p][0]["time"][0]);//最後わんちゃん[0]いるかも

console.log(datas);
datas = JSON.stringify(datas);
console.log(datas);
var params = {
    "method":"post",
    "mode":"no-cors",
    "Content-Type":"application/json",
    "body":datas
}
fetch(url,params)//GASで作ってからURLを更新すること

}