const Socket = {};
let serverSocket;

//event as namespace
Socket.publish = (event, action, data) => {
    serverSocket.sockets.in(event).emit(action, data);
};

connection = () => {
    serverSocket.sockets.on('connection', (socket) => {
        console.log('New Client: ', socket.id, 'connected');
        socket.emit('welcome', 'You are connected to the server');

        socket.on('room', (room) => {
            socket.join(room);
        });

        socket.on('disconnect', () => {
            console.log('Client ', socket.id + ' disconnected');
        });
    });
};

Socket.init = (socketio) => {
    serverSocket = socketio;
    connection();
};

module.exports = Socket;