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
const { cleanup, setup } = require('./board');

io.sockets.on('connection', setup);

process.on('SIGINT', function () { // on ctrl+c
    cleanup();
    process.exit();
});
