const { openPin, readPin, writeToPin, writePWMToPin } = require('./pins');
const { openI2C, readI2CData } = require('./i2c');

const pinout = {};
const pwmListeners = {};
const i2cSettings = {};

// HANDLERS
const events = require('./events');

const onPinRead = (socket, pin) => {
    socket.on(events.PIN_READ.EVENT(pin), () => {
        if (!pinout[pin]) {
            socket.emit('Error', '[' + events.PIN_READ.EVENT(pin) + ']: No pin!');
            return;
        }

        readPin(pinout[pin]).then(value => {
            socket.emit(events.PIN_READ.SUCCESS(pin), value);
        });
    });
}

const onPinWrite = (socket, pin) => {
    socket.on(events.PIN_WRITE.EVENT(pin), (value) => {
        if (!pinout[pin]) {
            socket.emit('Error', '[' + events.PIN_WRITE.EVENT(pin) + ']: No pin!');
            return;
        }

        writeToPin(pinout[pin], value)
        socket.emit(events.PIN_WRITE.SUCCESS(pin), value);
    });
}

onPWMPinWrite = (socket, pin) => {
    socket.on(events.PIN_PWM.EVENT(pin), (value) => {
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
    });
}
//

//
const onBoardConnected = (socket) => {
    socket.on(events.PIN_OPEN.EVENT(), ({ pin, direction } = {}) => {
        if (!pin) {
            socket.emit('Error', '[' + events.PIN_OPEN.EVENT() + ']: No pin!');
            return;
        }

        pinout[pin] = pinout[pin] || openPin(pin, direction)

        //
        socket.emit(events.PIN_OPEN.SUCCESS(pin), { direction });

        onPinRead(socket, pin);
        onPinWrite(socket, pin);
        onPWMPinWrite(socket, pin);
    });

    //
    socket.on(events.I2C.SETTING(), ({ address, dataMap, readEvery }) => {
        i2cSettings.address = Number('0x' + address);
        i2cSettings.dataMap = Object.keys(dataMap).reduce((acc, key) => {
            acc[key] = Number('0x' + dataMap[key]);
            return acc;
        }, {});
        i2cSettings.readEvery = Number(readEvery);


        if (!i2cSettings.channel) {
            i2cSettings.channel = openI2C(i2cSettings.address);
        }

        if (i2cSettings.interval) {
            clearInterval(i2cSettings.interval);
        }

        if (readEvery) {
            i2cSettings.interval = setInterval(() => {
                const data = readI2CData(i2cSettings.channel, i2cSettings.address, i2cSettings.dataMap);

                socket.emit(events.I2C.DATA(), data);
            }, readEvery);
        }
    })

    socket.on(events.I2C.WRITE(), () => { });
}
//

const onBoardExit = () => {
    Object.keys(pinout).forEach((pin) => {
        pinout[pin].unexport(); // Unexport GPIO to free resources
    })

    Object.keys(pwmListeners).forEach((pin) => {
        const listenerId = pwmListeners[pin];
        clearInterval(listenerId);
    })

    if (i2cSettings.interval) {
        clearInterval(i2cSettings.interval);
    }
}

module.exports = {
    onBoardConnected,
    onBoardExit
}