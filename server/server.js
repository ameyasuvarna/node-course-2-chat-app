const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');
const {generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath)); //Serve up the Public folder

io.on('connection', (socket) => {
  console.log('New user connected');

  //Send message to the individual user
  socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));

  // Broadcasting - will send to all user except the socket itself
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined the chat'));

  socket.on('createMessage', (message, callback) =>{
    console.log('createMessage', message);

    //Socket.emit sends data to one connection
    //io.emit sends data to every connection
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server.'); //Send acknowledgement
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Started up port ${port}`);
});
