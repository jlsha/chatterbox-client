
  let app = {
    init: () => {
      let getUserName = () => {
        
      };
    },
    
    send: (message) => {
      $.ajax({
    // This is the url you should use to communicate with the parse API server.
        url: 'https://api.parse.com/1/classes/messages',
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
    // This is the url you should use to communicate with the parse API server.
        type: 'GET',
        success: (data) => {
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

    renderMessage: (message) => {
      let $message = $('<div></div>');
      $('#chats').append($message);
      $message.append('<div class=username>' + message.username + '</div>');
      $message.append('<div>' + message.text + '</div>');
    },

    renderRoom: (room) => {
      $('#roomSelect').append('<div>' + room + '</div>');
    },

    handleUsernameClick: () => {

    },

    handleSubmit: () => {
      $('#submit').on('click', function(event) {
        let message = $('#input-text').val();
        console.log(message);
        let roomName = $('#room-text').val();
        console.log(roomName);

        let messageObj = {
          username: 'Jen',
          text: message,
          roomname: roomName
        };

        app.send(messageObj);
      });
    }
  };

  app.init();





















