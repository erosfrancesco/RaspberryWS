const { openPin, readPin, writeToPin, writePWMToPin } = require('../board-methods');
const events = require('./events');

const pinout = {};
const pwmListeners = {};

// HANDLERS
const onPinRead = (socket, { pin, widgetId }) => () => {
    if (!pinout[pin]) {
        socket.emit('Error', '[' + events.READ(pin) + ']: No pin!');
        return;
    }

    readPin(pinout[pin]).then(data => {
        socket.emit(events.READ(pin), { data, widgetId });
    });
}

const onPinWrite = (socket, { pin, widgetId }) => (data) => {
    if (!pinout[pin]) {
        socket.emit('Error', '[' + events.WRITE(pin) + ']: No pin!');
        return;
    }

    writeToPin(pinout[pin], data);
    socket.emit(events.WRITE(pin), { data, widgetId });
}

const onPWMPinWrite = (socket, { pin, widgetId }) => (data) => {
    if (!pinout[pin]) {
        socket.emit('Error', '[' + events.PWM(pin) + ']: No pin!');
        return;
    }

    const listenerId = pwmListeners[pin];
    if (listenerId) {
        clearInterval(listenerId);
    }

    const id = writePWMToPin(pinout[pin], data);
    pwmListeners[pin] = id;
    socket.emit(events.PWM(pin), { data, widgetId });
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
    socket.on(events.OPEN, ({ pin, widgetId } = {}) => {
        console.log('PIN CONNECTED', pin, widgetId);

        if (!pin) {
            socket.emit('Error', '[' + events.OPEN + ']: No pin!');
            return;
        }

        pinout[pin] = pinout[pin] || openPin(pin);

        //
        socket.emit(events.OPEN, { pin, widgetId });

        socket.on(events.READ(pin), onPinRead(socket, { pin, widgetId }));
        socket.on(events.WRITE(pin), onPinWrite(socket, { pin, widgetId }));
        socket.on(events.PWM(pin), onPWMPinWrite(socket, { pin, widgetId }));
        // TODO: - Implement servo
    });
}

module.exports = {
    cleanup,
    setup
}