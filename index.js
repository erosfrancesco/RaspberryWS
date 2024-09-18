const http = require('http').createServer((req, res) => res.end());
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = 80;
http.listen(PORT, () => console.log('Server ready on port:', PORT));
//

//
const { onBoardConnected, onBoardExit } = require('./board');
const { handleShellSocket } = require('./shell');

io.sockets.on('connection', function (socket) {
    console.log('Client connected');
    onBoardConnected(socket);
    handleShellSocket(socket);

    socket.emit('connected');
});

process.on('SIGINT', function () { // on ctrl+c
    onBoardExit();
    process.exit();
});
