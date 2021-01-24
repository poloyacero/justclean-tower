const http = require('http');
const app = require('./app');
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const socketio = require('socket.io')(server);
const Socket = require('./api/helpers/socketHandler');

Socket.init(socketio);

server.listen(port, () => {
    console.log('🚀 running on port ', port);
});