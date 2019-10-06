$(function(){

var user_list=$("#user-search-result");
function appendUser(user){

    var html =`
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${user.name}</p>
      <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
    </div>   
    `
  user_list.append(html);
  }

function appendErrMsgToHTML(msg) {
  var html = `<li>
                <p class="chat-group-user__name">${msg}</p>
              </li>`
  user_list.append(html);
}

  $('#user-search-field').on("keyup",function(){
    var input= $("#user-search-field").val();
    console.log(input);

    $.ajax({
      type:'get',
      url:'/users', //処理してほしいコントローラーの送り先
      data: {keyword:input},
      dataType: 'json'
    })
    
    .done(function(userresults){
      console.log(userresults);
      $("#user-search-result").empty(); //検索結果を空にする
      if (userresults.length!==0){
        userresults.forEach(function(user){
          appendUser(user);   //あとで定義
        });
        }
        else {
          appendErrMsgToHTML("一致するユーザーがいません"); //あとで定義
        }
    })

    .fail(function() {
      alert('映画検索に失敗しました');
    })

  });
});