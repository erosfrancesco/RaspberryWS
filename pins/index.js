const { openPin, readPin, writeToPin, writePWMToPin } = require('../board-methods.prod');
const events = require('./events');

const pinout = {};
const pwmListeners = {};

// HANDLERS
const onPinRead = (socket, pin) => () => {
    if (!pinout[pin]) {
        socket.emit('Error', '[' + events.READ(pin) + ']: No pin!');
        return;
    }

    readPin(pinout[pin]).then(value => {
        socket.emit(events.READ(pin), value);
    });
}

const onPinWrite = (socket, pin) => (value) => {
    if (!pinout[pin]) {
        socket.emit('Error', '[' + events.WRITE(pin) + ']: No pin!');
        return;
    }

    writeToPin(pinout[pin], value);
    socket.emit(events.WRITE(pin), value);
}

const onPWMPinWrite = (socket, pin) => (value) => {
    if (!pinout[pin]) {
        socket.emit('Error', '[' + events.PWM(pin) + ']: No pin!');
        return;
    }

    const listenerId = pwmListeners[pin];
    if (listenerId) {
        clearInterval(listenerId);
    }

    const id = writePWMToPin(pinout[pin], value);
    pwmListeners[pin] = id;
    socket.emit(events.PWM(pin), value);
}

// BOARD SETUP AND CLEAN
const cleanup = () => {
    // Unexport GPIO to free resources
    Object.keys(pinout).forEach((pin) => pinout[pin].unexport());
    // Clear all intervals
    Object.keys(pwmListeners).forEach((pin) => clearInterval(pwmListeners[pin]));
    // TODO: - Clear sockets
};

const setup = (socket) => {
    socket.on(events.OPEN(), ({ pin } = {}) => {
        console.log('PIN CONNECTED', pin)
        if (!pin) {
            socket.emit('Error', '[' + events.OPEN() + ']: No pin!');
            return;
        }

        pinout[pin] = pinout[pin] || openPin(pin);

        //
        socket.emit(events.OPEN, { pin });

        socket.on(events.READ(pin), onPinRead(socket, pin));
        socket.on(events.WRITE(pin), onPinWrite(socket, pin));
        socket.on(events.PWM(pin), onPWMPinWrite(socket, pin));
        // TODO: - Implement servo
    });
}

module.exports = {
    cleanup,
    setup
}