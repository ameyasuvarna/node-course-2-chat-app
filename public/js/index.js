var socket = io(); //Initiating a request from the client to the server and keep connection open

socket.on('connect', function () {
  console.log('Connected to server');

  // socket.emit('createMessage', {
  //   from: 'Harsha',
  //   text: 'Hey. This is Harsha'
  // });
});

socket.on('disconnect', function () {
  console.log('Disconnect from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
});
