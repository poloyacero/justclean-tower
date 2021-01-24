const socketio = require('socket.io-client');

const host = process.env.HOST || 'http://localhost:';
const port = process.env.PORT || 5000;
const namespace = '/api/v1/towers';

const socket = socketio.connect(host + port);

socket.on('connect', () => {
    socket.emit('room', namespace);
});

socket.on('welcome', (data) => {
    console.log('Data: ', data);
});

socket.on('create-tower', (data) => {
    console.log('CREATE', data);
});

socket.on('update-tower', (data) => {
    console.log('UPDATE', data);
});

socket.on('delete-tower', (data) => {
    console.log('DELETE', data);
});