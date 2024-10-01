const PINS = require('./pins');
const I2C = require('./i2c');
const SHELL = require('./shell');

const onBoardConnected = (socket) => {
    PINS.setup(socket);
    I2C.setup(socket);
    SHELL.setup(socket);

    console.log('Board Ready');
};

const cleanup = () => {
    PINS.cleanup();
    I2C.cleanup();
    SHELL.cleanup();
};

const setup = (socket) => {
    console.log('Client connected');
    onBoardConnected(socket);

    socket.emit('connected');
};

module.exports = { setup, cleanup };