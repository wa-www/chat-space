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

function add_user_html(id,name){
  console.log(id);
  var addhtml = `
  <div class='chat-group-user' id=${ id }>
    <input name='group[user_ids][]' type='hidden' value=${id}>
    <p class='chat-group-user__name'>${name}</p>
    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
  </div>
  `
  // $("chat-group-form__field--right").append(addhtml);
  $('#user_append').append(addhtml);
}


  $('#user-search-field').on("keyup",function(){
    var input= $("#user-search-field").val();
    var group_id = $('.chat__group_id').val(); 
    console.log(input);
    console.log(group_id);

    $.ajax({
      type:'get',
      url:'/users', //処理してほしいコントローラーの送り先
      data: {keyword:input,group_users_id:group_id},
      dataType: 'json'
    })
    
    .done(function(results){
      console.log(results);
      $("#user-search-result").empty(); //検索結果を空にする
      if (results.length!==0){

        results.forEach(function(user){
          appendUser(user);   //あとで定義
        }); //eachの終わり

        }//ifの終わり
        else {
          appendErrMsgToHTML("一致するユーザーがいません"); //あとで定義
        }

    })
    .fail(function() {
      alert('検索に失敗しました');
    })

  });//インクリメンタルサーチ終了

  $(document).on("click", '.user-search-add', function () { //追加したボタンの子要素

    var id=$(this).attr("data-user-id");
    var name=$(this).attr("data-user-name");
    console.log(id);
    // var user_info={id:id,name:name};  
    $(this).parent().remove();

    add_user_html(id,name);


    });

    // $(document).on("click", ".user-search-add chat-group-user__btn chat-group-user__btn--add", function () { //追加したボタンのところ
    // $("chat-group-form__field--right").remove('div'); //元からある親要素
    // });
  $(document).on("click", '.user-search-remove', function () {
      $(this).parent().remove();

    });

});


