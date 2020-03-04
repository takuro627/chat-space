$(function(){
  
  var buildHTML = function(message) {
    if (message.content && message.image) {

      var html = `
      <div class="main-chat__list__message" data-message-id=${message.id}> 
        <div class="main-chat__list__message__upper">
          <div class="main-chat__list__message__upper__user-name">
            ${message.user_name} 
          </div> 
          <div class="main-chat__list__message__upper__date">
            ${message.created_at} 
          </div>
        </div> 
        <div class="main-chat__list__message__lower">
          <p class="main-chat__list__message__lower__content">
            ${message.content}
          </p>
          <img src="${message.image}" class="lower-message__image" >
        </div>
      </div>
      `
    } else if (message.content) {
      var html = `
      <div class="main-chat__list__message" data-message-id=${message.id}>
        <div class="main-chat__list__message__upper">
          <div class="main-chat__list__message__upper__user-name">
            ${message.user_name}
          </div>
          <div class="main-chat__list__message__upper__date">
            ${message.created_at} 
          </div>
        </div>
        <div class="main-chat__list__message__lower">
          <p class="main-chat__list__message__lower__content">
            ${message.content}
          </p>
        </div>
      </div>
      `
    } else if (message.image) {
      var html = `
      <div class="main-chat__list__message" data-message-id=${message.id}>
        <div class="main-chat__list__message__upper">
        <div class="main-chat__list__message__upper__user-name">
            ${message.user_name} 
          </div>
          <div class="main-chat__list__message__upper__date">
            ${message.created_at} 
          </div>
        </div>
        <div class="main-chat__list__message__lower">
          <img src="${message.image}" class="lower-message__image" >
        </div>
      </div>
      `
    };
    return html;
  };
  
  var reloadMessages = function() {
    var last_message_id = $('.main-chat__list__message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-chat__list').append(insertHTML);
        $('.main-chat__list').animate({ scrollTop: $('.main-chat__list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url:  url,
      type: 'POST',  
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-chat__list').append(html);
      $('.main-chat__list').animate({ scrollTop: $('.main-chat__list')[0].scrollHeight});
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
  
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }

});