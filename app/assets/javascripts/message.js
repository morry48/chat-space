$(function(){
  function buildHTML(message){
    var image = message.is_image_present ? `<img src='${message.image.url}' class='lower-message__image'> ` : ''
    var html = `<div class="message">
                  <div class="message__upper__info">
                    <div class="message__upper__info__taker">
                      ${message.user_name}
                    </div>
                    <div class="message__upper__info__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="message__text">
                    <p class="message__text__content">
                      ${message.content}
                    </p>
                    <p>
                      ${image}
                    </p>
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this)
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast')
      new_message.reset()
      $('.form__submit').prop('disabled', false)
    })
    .fail(function(){
      alert('error')
    })
  })
});
