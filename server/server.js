const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath)); //Serve up the Public folder

io.on('connection', (socket) => {
  console.log('New user connected');

  //Send message to the individual user
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app',
    createdAt: new Date().getTime()
  });

  // Broadcasting - will send to all user except the socket itself
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined the chat',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (message) =>{
    console.log('createMessage', message);

    //Socket.emit sends data to one connection
    //io.emit sends data to every connection
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});



server.listen(port, () => {
  console.log(`Started up port ${port}`);
});
