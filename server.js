// const express = require('express')
// const path = require('path')
// const app = express()
// const server = require('http').createServer(app)
// const io = require('socket.io')

// app.use(express.static(path.join(__dirname +"/public")))

// io.on('connection', function(socket){
//     socket.on('newuser', function(Username){
//         socket.broadcast.emit('update', Username + 'joined the conversiton');
//     });
//     socket.on('exitUser', function(Username){
//         socket.broadcast.emit('update', Username + 'left the conversiton');
//     });
//     socket.on('chat', function(message){const express = require('express');
const express = require('express')
const path = require('path');
const http = require('http'); // Import the http module
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app); // Create a server using http module
const io = socketIo(server); // Pass the server instance to socket.io

app.use(express.static(path.join(__dirname, "public")));

io.on('connection', function(socket) {
    socket.on('newuser', function(username) {
        socket.broadcast.emit('update', username + ' joined the conversation');
    });
    socket.on('exitUser', function(username) {
        socket.broadcast.emit('update', username + ' left the conversation');
    });
    socket.on('chat', function(message) {
        io.emit('chat', message); // Emit the message to all clients including the sender
    });
});

const PORT = process.env.PORT || 5000; // Use the environment port or default to 5000
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//         socket.broadcast.emit('chat', message);
//     });
// })

// server.listen(5000);


