$(loaded);
// console.log(localStorage.getItem(0))
function loaded() {
  showText();
  // ボタンをクリックしたときに実行するイベントを設定する
  $("#formButton").click(
    // コールバックとしてメソッドを引数にわたす
    function() {
      saveText();
      showText();
    });
  $("#sakujo").click(
    function(){
      localStorage.clear();
      showText();
    });
  $('.checkbo:checkbox').click(
    function(){
      
      checks();
    });

}

// 入力された内容をローカルストレージに保存する
function saveText() {
  // 時刻をキーにして入力されたテキストを保存する
  var text = $("#formText");
  var time = new Date();
  var val = text.val();
//表示する前にチェックテキストでチェックしてから入れる。
   if(checkText(val)) {
    localStorage.setItem(time, val);
    // テキストボックスを空にする
    text.val("");
  }
  // localStorage.setItem(time, text.val());
  // // テキストボックスを空にする
  // text.val("");
}

// ローカルストレージに保存した値を再描画する
function showText() {



  // すでにある要素を削除する
  var list = $("#list");
  list.children().remove();
  // ローカルストレージに保存された値すべてを要素に追加する
  var key, value, html = [];
  for(var i=0, len=localStorage.length; i<len; i++) {
    key = localStorage.key(i);
    value = localStorage.getItem(key);
    //表示する前にexcapeTextでエスケープする
    //listとチェックボックスをhtmlに入れる
    
    html.push($("<li id=\"list" + i + "\">").append(escapeText(value)+'<input type="checkbox" id="' + "cb" + i + '" value="'+i+'" class="checkbo" onclick="checks()">'));
    $("#list6").css('color','red');
   }
  list.append(html.reverse());
  
  
  //divの中にhtmlを古い順から追加していく。
  // list.append(html.reverse());
  
  checks();
  // checks();
  //更新前にチェックされていたものの文字の色を変える
  // for(var i =0;localStorage.length>i;i++){
  //   y = localStorage.getItem(i);
  //   console.log(y)
  //   if(!y){
  //     $("#list"+i).css('color','red');
  //   }
  // }
}



function escapeText(text) {
  var TABLE_FOR_ESCAPE_HTML = {
    "&": "&amp;",
    "\"": "&quot;",
    "<": "&lt;",
    ">": "&gt;"
  };
  return text.replace(/[&"<>]/g, function(match) {
    return TABLE_FOR_ESCAPE_HTML[match];
  });
}

// 入力チェックを行う
function checkText(text) {
  // 文字数が0または20以上は不可
  if (0 === text.length || 20 < text.length) {
    alert("文字数は1〜20字にしてください");
    return false;
  }

  // すでに入力された値があれば不可
  var length = localStorage.length;
  for (var i = 0; i < length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    // 内容が一致するものがあるか比較
    if (text === value) {
      alert("同じ内容は避けてください");
      return false;
    }
  }

  // すべてのチェックを通過できれば可
  return true;
}


//チェックボックスがチェックされた時にそれに対する文字の色を変える。
function checks(){
    for(var i=0;localStorage.length>i;i++){
      var x = $("#cb"+i).prop("checked")
      if(x){
      var  key = localStorage.key(i);
      var  value = localStorage.getItem(key);
        localStorage.removeItem(key);
        location.reload()
        // console.log("aaa")
      }
      // if(!x){
      //   $("#list"+i).css('color','black');
      //   // console.log("aaa")
      // }
    }
}
