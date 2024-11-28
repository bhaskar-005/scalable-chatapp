const { Server } = require('socket.io');
const express = require('express');
const http = require('http');
const {publish,subscribe} = require('./redis/pub_sub');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

let allConnectedUsers = {};

io.on('connection', (xocket) => {
    console.log('Connected:', xocket.id);
    
    subscribe('chat_channel',(msg)=>{
       xocket.emit('chat',JSON.parse(msg));
    })
    allConnectedUsers[xocket.handshake.query.userName]=xocket;
    
    xocket.on('chat', (msg) => {
        
        // xocket.broadcast.emit('chat', msg);
        if (allConnectedUsers[msg.recever]) {
            allConnectedUsers[msg.recever].emit('chat', msg);
        }else{
            //do db save
             publish('chat_channel', JSON.stringify(msg))
        }
        console.log('sender:', msg.sender);
        console.log('recever:', msg.recever);
        console.log('text:', msg.text);
    });
});

server.listen(3020, () => {
    console.log('Server listening on port 3020');
});
