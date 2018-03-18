const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');
const {generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath)); //Serve up the Public folder

io.on('connection', (socket) => {
  console.log('New user connected');

  // //Send message to the individual user
  // socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));
  //
  // // Broadcasting - will send to all user except the socket itself
  // socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined the chat'));

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    // socket.leave('The Office Fans');

    // io.emit -> io.to('The Office Fans').emit
    // socket.broadcast.emit -> socket.boradcast.to('The Office Fans').emit
    // socket.emit

    //Send message to the individual user
    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));

    // Broadcasting - will send to all user except the socket itself
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

    callback();
  });

  socket.on('createMessage', (message, callback) =>{
    console.log('createMessage', message);

    //Socket.emit sends data to one connection
    //io.emit sends data to every connection
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback(); //Send acknowledgement
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');

    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  });

});

server.listen(port, () => {
  console.log(`Started up port ${port}`);
});
