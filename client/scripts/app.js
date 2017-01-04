
  let userName = window.location.search.replace(/\D\username\D/, '');
  let app = {
    server: 'https://api.parse.com/1/classes/messages',
    messages: [],
    friends: {},

    init: () => {
      
      app.fetch();
      app.handleSubmit();
      app.clearMessages();
      app.getMessage();
      app.handleUsernameClick();
      $('#clear-messages').on('click', () => {
        app.clearMessages(); 
      });


    },
    send: (message) => {
      $.ajax({
    // This is the url you should use to communicate with the parse API server.
        url: app.server,
        type: 'POST',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: (data) => {
          console.log('chatterbox: Message sent', data);
        },
        error: (err) => {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message', err);
        }
      });
    },
    
    fetch: () => {
      $.ajax({
        url: app.server,
        type: 'GET',
        data: 'order=-createdAt', 
        success: (data) => {
          app.messages = data.results;
          app.renderMessage(data);
          console.log('chatterbox: Message got', data);
        },
        error: (err) => {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to get message', err);
        }
      });
    },

    clearMessages: () => {
      $('#chats').empty();
    },

    getMessage: () => {
      $('#get-messages').on('click', () => {
        $('#chats').empty();
        app.fetch();
      });
    },

    renderMessage: (message) => {
      let $message = $('<div></div>');
      $('#chats').append($message);
      if (message.hasOwnProperty('results')) {
        message.results.forEach((eachMessage) => {
          let $eachMessage = $('<div class="each-message"></div>');
          $eachMessage.append(`<div class="username">${eachMessage.username} :</div>`);
          let $messagetext = $('<div class="message"></div>');
          $messagetext.text(`${eachMessage.text}`);
          $message.append($eachMessage);
          $eachMessage.append($messagetext);
        });
      } else {
        let $eachMessage = $('<div class="each-message"></div>');
        $eachMessage.append('<div class=username>' + message.username + ' :</div>');
        $eachMessage.append('<div id="messagege"></div>');
        $('#message').text(`${message.text}`);
        $message.append($eachMessage);
      }
      app.filterUserMessage();
    },

    filterUserMessage: () => {
      $('.each-message').on('click', 'div.username', (e) => {

        console.log(e.target.innerText);
      });
    },

    renderRoom: (room) => {
      $('#roomSelect').append('<div>' + room + '</div>');
    },

    handleUsernameClick: () => {

    },

    handleSubmit: () => {
      $('#submit').on('click', function(event) {
        let message = $('#input-text').val();
        let roomName = $('#room-text').val();

        let messageObj = {
          username: userName,
          text: message,
          roomname: roomName
        };
        
        $('#input-text').val('');
        $('#room-text').val('');
        app.send(messageObj);
        app.clearMessages();
        app.fetch();
      });
    }
  };

  $(document).ready(function() {
    app.init();
  });





















