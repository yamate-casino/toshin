var url = "https://script.google.com/macros/s/AKfycbz4hdeZuRQlKZ_feVpm7eM0fCLODx5D1_KQi5AacpknuoUIcRaU25pPnwHdqozC8Prr/exec";


function data_get(branch){
    var para = new URL(window.location.href);
para = para.searchParams;
var username = para.get("username");
var num = para.get("num");
    url = url+"?username="+username+"&num="+num;
    fetch(url,{
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
        if(branch == "get"){
            data_write(json);

        }
    })
}

function data_write(json){
    var text = "a";
    
    for(var i =1; i<=7; i++){
        var script = '<div class="block1" id="block1"><div class="c1" id="c1"><p class="schedule" id="schedu">日付</p><p class="schedule2" id="schedule2">5/18</p></div><div class="c1" id="c1"><p class="schedule" id="schedu">受講予定</p><select name="" id="juko" multiple>';
        var datas = json[0][text+i];
        for(var j of datas[0]["juko"]){
            script+='<option value="'+j+'">'+j+'</option>';
        }
        script+= '</select></div><div class="c1" id="c1"><p class="schedule" id="schedu">高マス予定</p><select name="" id="komasu" multiple></select>';
                for(var j of datas[0]["kmas"]){
            script+='<option value="'+j+'">'+j+'</option>';
        }
        script+='</select></div><div class="c1" id="c1"><p class="schedule" id="schedu">その他予定</p><input type="text" id="sonota" value="'+datas[0]["other"][0]+'" placeholder="その他予定"></div><div class="c1" id="c1"><p class="schedule" id="schedu">来校予定(校舎ならチェック)</p>';
        //<input type="checkbox" value=""><input type="number" value="'+datas[0]["time"][0]+'" placeholder="時間(例1700・0900)"></div><div class="c1" id="c1"><p class="schedule" id="schedu">変更申請</p><p class="schedule4" onclick="send("b'+i+'")">申請</p></div></div>';                        

        //謎エラーはいてる　６\13
        
        if(datas[0]["time"][0].indexOf("校舎") != -1){
            var t = datas[0]["time"][0].substring(parseInt(datas[0]["time"][0].indexOf("校舎"))+1,);
            console.log("time : "+t);
            script+='<input type="checkbox" value="" checked ><input type="number" value="'+t+'" placeholder="時間(例1700・0900)"></div><div class="c1" id="c1"><p class="schedule" id="schedu">変更申請</p><p class="schedule4" onclick="send("b'+i+'")">申請</p></div></div>';
        }
        document.getElementById("box").insertAdjacentHTML("beforeend",script);
    }
}