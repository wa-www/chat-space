$(function(){
  // console.log('ok');
var html_source=$(".detail");

  function addHtml(aaa){
    var html=`
    <div class="detail">
    <div class="detail__user">
      ${aaa.user_name}
    </div>
    <div class="detail__date">
      ${aaa.created_at}
    </div>
    <div class="detail__contents">
        ${aaa.content}
        ${aaa.image}
    </div>
  </div>
  
  `
  html_source.append(html)

  }


  $('#message_id').on('submit',function(e){
    e.preventDefault();
    // console.log(this);

    var dt=new FormData($(this).get(0));
    dt.append(this, $('input[type=file]')[0].files[0]); //いらない？

    // var dt = new FormData();
    // var text=$(this).text;
    // var file=$(this).file;
    // dt.append('text',text);
    // dt.append('file',file); //左と右が何？
    // console.log(dt);


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
      var html=addHtml(data);
    })
  })

})