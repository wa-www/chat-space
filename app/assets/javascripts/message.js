$(document).on('turbolinks:load', function() {

var html_source=$(".detail");

  function addHtml(message){
    var message_sent =message.content ? message.content : ""
    var image_sent = message.image ? `<img src="${message.image}}" width="128" height="128" class="image_present">` : "";

    var html=`
    <div class="details">
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
