$(function(){
  function buildHTML(message){
    if (message.content && message.image.url){
    var image = message.is_image_present ? `<img src='${message.image.url}' class='lower-message__image'> ` : ''
    var html = '<div class="message" data-message-id=' + message.id + '>'+
                  '<div class="message__upper__info">' +
                   '<div class="message__upper__info__taker">'+
                      message.user_name  +
                    '</div>'  +
                    '<div class="message__upper__info__date">' +
                      message.created_at +
                    '</div>' +
                  '</div>' +
                  '<div class="message__text">' +
                    '<p class="message__text__content">' +
                      message.content  +
                    '</p>' +
                    '<img src="' + message.image.url + '" class="lower-message__image">' +
                  '</div>' +
                '</div>'
    } else if (message.content) {
      var html = '<div class="message" data-message-id=' + message.id + '>' +
        '<div class="message__upper__info">' +
          '<div class="message__upper__info__taker">' +
            message.user_name +
          '</div>' +
          '<div class="message__upper__info__date">' +
            message.created_at +
          '</div>' +
        '</div>' +
        '<div class="message__text">' +
          '<p class="message__text__content">' +
            message.content +
          '</p>' +
        '</div>' +
      '</div>'
    } else if (message.image.url) {
      var html = '<div class="message" data-message-id=' + message.id + '>' +
        '<div class="message__upper__info">' +
          '<div class="message__upper__info__taker">' +
            message.user_name +
          '</div>' +
          '<div class="message__upper__info__date">' +
            message.created_at +
          '</div>' +
        '</div>' +
        '<div class="message__text">' +
          '<img src="' + message.image.url + '" class="lower-message__image" >' +
        '</div>' +
      '</div>'
    };
    return html;
  };
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
      $("form")[0].reset();
      $('.form__submit').prop('disabled', false)
    })
    .fail(function(){
      alert('error')
    })
  });

  function reloadMessages(){
    var lastMessageId = $('.message').last().data('message-id');
    $.ajax({
      url:"./api/messages",
      type: 'get',
      dataType: 'json',
      data: {lastMessageId: lastMessageId}
    })
    .done(function(messages){
      var insertHTML='';
      messages.forEach(function(message){
        insertHTML = buildHTML(message);
        $('.messages').append(insertHTML);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast')
      });
    })
    .fail(function() {
      console.log('error');
    });
  };
  setInterval(reloadMessages,5000);
});
