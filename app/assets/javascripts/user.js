$(function(){

var user_list=$('#user-search-result');

function add_User_id(user_ids){
  $('.chat-group-user.clearfix.js-users').each(function(){
    var user_id = $(this).data("id");
    user_ids.push(user_id);
  });
  return user_ids;
}

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
  var addhtml = `
  <div class='chat-group-user clearfix js-users' data-id="${id}">
    <input name='group[user_ids][]' type='hidden' value=${id}>
    <p class='chat-group-user__name'>${name}</p>
    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
  </div>
  `
  $('#user_append').append(addhtml);
}


  $('#user-search-field').on("keyup",function(){
    var input= $("#user-search-field").val();
    var user_ids=[];

    add_User_id(user_ids);
    $.ajax({
      type:'get',
      url:'/users',
      data: {keyword:input,user_ids:user_ids},
      dataType: 'json'
    })
    
    .done(function(results){
      $("#user-search-result").empty();
      if (results.length!==0){
        results.forEach(function(user){
          appendUser(user);
        }); 
        }
        else {
          appendErrMsgToHTML("一致するユーザーがいません"); 
        }
    })

    .fail(function() {
      alert('検索に失敗しました');
    })
  });

  $(document).on("click", '.user-search-add', function () { 

    var id=$(this).data("user-id");
    var name=$(this).data("user-name");
    $(this).parent().remove();

    add_user_html(id,name);
    });

  $(document).on('click', '.user-search-remove', function () {
      $(this).parent().remove();
    });
});
