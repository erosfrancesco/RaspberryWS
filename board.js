const PINS = require('./pins');
const I2C = require('./i2c');
const SHELL = require('./shell');


const cleanup = () => {
    PINS.cleanup();
    I2C.cleanup();
    SHELL.cleanup();
};

const setup = (socket) => {
    console.log('Client connected');

    PINS.setup(socket);
    I2C.setup(socket);
    SHELL.setup(socket);

    socket.on('disconnect', () => console.log('Client disconnected'))
};

module.exports = { setup, cleanup };