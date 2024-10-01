const { openPin, readPin, writeToPin, writePWMToPin } = require('../board-methods.prod');
const events = require('./events');

const pinout = {};
const pwmListeners = {};

// HANDLERS
const onPinRead = (socket, pin) => () => {
    if (!pinout[pin]) {
        socket.emit('Error', '[' + events.PIN_READ.EVENT(pin) + ']: No pin!');
        return;
    }

    readPin(pinout[pin]).then(value => {
        socket.emit(events.PIN_READ.SUCCESS(pin), value);
    });
}

const onPinWrite = (socket, pin) => (value) => {
    if (!pinout[pin]) {
        socket.emit('Error', '[' + events.PIN_WRITE.EVENT(pin) + ']: No pin!');
        return;
    }

    writeToPin(pinout[pin], value);
    socket.emit(events.PIN_WRITE.SUCCESS(pin), value);
}

const onPWMPinWrite = (socket, pin) => (value) => {
    if (!pinout[pin]) {
        socket.emit('Error', '[' + events.PIN_PWM.EVENT(pin) + ']: No pin!');
        return;
    }

    const listenerId = pwmListeners[pin];
    if (listenerId) {
        clearInterval(listenerId);
    }

    const id = writePWMToPin(pinout[pin], value);
    pwmListeners[pin] = id;
    socket.emit(events.PIN_PWM.SUCCESS(pin), value);
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
    socket.on(events.PIN_OPEN.EVENT(), ({ pin, direction } = {}) => {
        console.log('PIN CONNECTED', pin)
        if (!pin) {
            socket.emit('Error', '[' + events.PIN_OPEN.EVENT() + ']: No pin!');
            return;
        }

        pinout[pin] = pinout[pin] || openPin(pin, direction)

        //
        socket.emit(events.PIN_OPEN.SUCCESS(pin), { direction });

        socket.on(events.PIN_READ.EVENT(pin), onPinRead(socket, pin));
        socket.on(events.PIN_WRITE.EVENT(pin), onPinWrite(socket, pin));
        socket.on(events.PIN_PWM.EVENT(pin), onPWMPinWrite(socket, pin));
    });
}

module.exports = {
    cleanup,
    setup
}