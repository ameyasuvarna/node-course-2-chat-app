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

  socket.emit('newMessage', {
    from: 'Ameya',
    text: 'Hey. What is going on.',
    createdAt: 123
  });

  socket.on('createMessage', (message) =>{
    console.log('createMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});



server.listen(port, () => {
  console.log(`Started up port ${port}`);
});
