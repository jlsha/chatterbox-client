// YOUR CODE HERE:
var app = {
  init: () => {

  },
  
  send: (message) => {
    $.ajax({
  // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (err) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', err);
      }
    });
  },
  
  fetch: () => {
    $.ajax({
  // This is the url you should use to communicate with the parse API server.
      type: 'GET',
      success: function (data) {
        console.log('chatterbox: Message got', data);
      },
      error: function (err) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to get message', err);
      }
    });
  }

};