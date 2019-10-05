$(document).on('turbolinks:load', function() {

var html_source=$(".detail");


  function addHtml(aaa){

    if (aaa.content != null && aaa.image != null) {
    var html=`
    <div class="details">
    <div class="detail__user">
      ${aaa.user_name}
    </div>
    <div class="detail__date">
      <time>${aaa.created_at}</time>
    </div>
    <div class="detail__contents">
        ${aaa.content}
        <img src="${aaa.image}" width="128" height="128">
    </div>
    </div>`
    html_source.append(html)  

    }else if (aaa.content != "" && aaa.image == null){
      var html=`
      <div class="details">
      <div class="detail__user">
        ${aaa.user_name}
      </div>
      <div class="detail__date">
        <time>${aaa.created_at}</time>
      </div>
      <div class="detail__contents">
          ${aaa.content}
      </div>
      </div>`
      html_source.append(html)  

    }else if (aaa.content == "" && aaa.image != null){
      var html=`
      <div class="details">
      <div class="detail__user">
        ${aaa.user_name}
      </div>
      <div class="detail__date">
        <time>${aaa.created_at}</time>
      </div>
      <div class="detail__contents">
      <img src="${aaa.image}" width="128" height="128">
      </div>
      </div>
      `
      html_source.append(html)  
    }
  }

  $('#message_id').on('submit',function(e){
    e.preventDefault();

    var dt=new FormData($(this).get(0));

    var url = $(this).attr('action')
    console.log(url);
    $.ajax({
      url:url,
      type:"POST",
      data:dt,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      console.log(data);
      var createhtml=addHtml(data);
      $('.message-input').val('');
      $('.detail').animate({ scrollTop: $('.detail')[0].scrollHeight });
      $('.send').attr('disabled', false);
    })
    .fail(function(){
      alert('error');
      $('.send').attr('disabled', false);
    })

    })
  })
