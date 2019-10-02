$(function(){
  // console.log('ok');
  $('#message_id').on('submit',function(e){
    e.preventDefault();
    // console.log(this);
    var formData = new FormData();
    var text=this.text;
    var file=this.file;
    formData.append('text',text);
    formData.append('file',file); //左と右が何？
    console.log(formData);
    var url = $(this).attr('action')
    $.ajax({
      url:url,
      type:"POST",
      data:formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
  })

})