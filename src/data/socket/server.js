import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
});

let onlineUsers = [];
const findUser = userID => {
    return onlineUsers.find(user => user.id === userID);
};
const addUser = (userID, socketID) => {
    const user = findUser(userID);
    if (!user) {
        onlineUsers.push({ id: userID, socketID });
        console.log('a user adeded', onlineUsers);
    }
};
const removeUser = socketID => {
    onlineUsers = onlineUsers.filter(user => user.socketID !== socketID);
    console.log('a user removed', onlineUsers);
};

io.on('connection', socket => {
    socket.emit('SEND_DETAILS');
    socket.on('ADD_USER', userID => {
        addUser(userID, socket.id);
    });
    socket.on('JOIN_ROOM', roomID => {
        socket.join(roomID);
        console.log('a user joined a room', roomID);
    });
    socket.on('SEND_MESSEGE', (messege, receiverID) => {
        const user = findUser(receiverID);
        if (user) {
            socket.to(user.socketID).emit('RECEIVE_MESSEGE', messege);
            // io.to([])
            console.log(messege, user);
        } else {
            console.log('user is offline');
        }
        // socket.to(roomID).emit('RECEIVE_MESSEGE', messege);
    });
    console.log('a user is connected');
    console.log(onlineUsers);
    socket.on('disconnect', socket => {
        console.log('a user is disconnected');
        removeUser(socket.id);
    });
});

const port = process.env.PORT || 7000;
server.listen(port, () =>
    console.log(`socket server listening on port ${port}...`)
);
