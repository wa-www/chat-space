$(document).on('turbolinks:load', function() {

var html_source=$(".detail");

  function addHtml(message){
    var message_sent = message.content ? message.content : "" ;
    var image_sent = message.image ? `<img src="${message.image}" width="128" height="128" class="image_present">` : "";

    var html=`
    <div class="details" data-group-id="${ message.group_id }" data-message-id="${ message.id}" >
    <div class="detail__user">
      ${message.user_name}
    </div>
    <div class="detail__date">
      <time>${message.created_at}</time>
    </div>
    <div class="detail__contents">
        ${message_sent}
        ${image_sent}
    </div>
    </div>`

    html_source.append(html)  
  }

  $('#message_id').on('submit',function(e){
    e.preventDefault();

    var dt=new FormData($(this).get(0));

    var url = $(this).attr('action')
    $.ajax({
      url:url,
      type:"POST",
      data:dt,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var createhtml=addHtml(data);
      $('.detail').animate({ scrollTop: $('.detail')[0].scrollHeight });
        $('#message_id')[0].reset();
      $('.send').attr('disabled', false);
    })
    .fail(function(){
      alert('error');
      $('.send').attr('disabled', false);
    })

    })
  })


$(function() {
//省略
  if(location.href.match(/\/groups\/\d+\/messages/)){
  setInterval(reloadMessages, 5000);
  }

  function reloadMessages() {

    // if($('.detail')[0]) {

    var groupId = $('.details').data('group-id');
    // var a='/groups/'+group_id+'/api/messages';
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.details:last').data('message-id');
    console.log(groupId);
    console.log(last_message_id);

  // } else {
  //   var last_message_id = 0;
  // }

    url = '/groups/' + groupId + '/api/messages';

    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: url,
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id,group_id:groupId}
    })
    .done(function(messages) {
      console.log(messages);
      //追加するHTMLの入れ物を作る
      var insertHTML = '';

    $(document).on('turbolinks:load', function() {
      if (messages !="null") {
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        messages.forEach(function(message){
          // insertHTML=addHtml(message);
          addHtml(message);  //これでaddHtmlのなかで追記される
          $('.detail').animate({scrollTop: $('.detail')[0].scrollHeight});
          console.log(message);
        })
      }else{
      }
  })

      //メッセージが入ったHTMLを取得

      //メッセージを追加

    })
    .fail(function() {
      console.log('エラー');
    });
  }; 
});