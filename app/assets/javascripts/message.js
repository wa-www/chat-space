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
        ${message_sent}</br>
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


  if(location.href.match(/\/groups\/\d+\/messages/)){
  setInterval(reloadMessages, 5000);
  }

  function reloadMessages() {

    var groupId = $('.details').data('group-id');
    var last_message_id = $('.details:last').data('message-id');

    url = `/groups/${groupId}/api/messages`;

    $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id,group_id:groupId}
    })
    .done(function(messages) {

        messages.forEach(function(message){
          addHtml(message); 
          $('.detail').animate({scrollTop: $('.detail')[0].scrollHeight});
        })
    })
    .fail(function() {
      alert('エラー');
    });
  }; 
})