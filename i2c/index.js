const {
    openI2C,
    readI2CData,
    writeI2C
} = require('../board-methods.prod');
const events = require('./events');

const i2c = {
    interval: null,
    channel: null
};

const i2cSettings = {
    address: null,
    dataStructure: null,
    readFrequency: null,
    deviceSetup: null,
    widgetId: null
};

//
const writeI2CWithChecks = (data) => {
    const { address, value } = data;
    writeI2C(i2c.channel, i2cSettings.address, address, value);
};

const writeDeviceSetup = () => {
    if (!i2cSettings.deviceSetup) {
        return;
    }

    if (!Array.isArray(i2cSettings.deviceSetup)) {
        return;
    }

    i2cSettings.deviceSetup.forEach(writeI2CWithChecks);
};

const startI2C = (socket) => {
    if (i2c.interval) {
        return i2c.interval;
    };

    i2c.channel = openI2C();
    writeDeviceSetup();

    i2c.interval = setInterval(() => {
        const data = readI2CData(i2c.channel, i2cSettings.address, i2cSettings.dataStructure);
        onData((data) => socket.emit(events.DATA, data));
    }, i2cSettings.readFrequency);
};
//

const onSettingsReceived = (socket) => (settings) => {
    const { widgetId } = settings || {};

    if (!widgetId) {
        return;
    }

    // If there is a configuration and the widgetId is different,
    // just return the settings
    // If not, setup the I2C

    if (i2cSettings.widgetId && widgetId !== i2cSettings.widgetId) {
        socket.emit(events.STATUS, {
            ...i2cSettings,
            widgetId
        });
        return;
    }

    // parse settings
    const address = Number('0x' + settings.address);
    const readFrequency = Number(settings.readFrequency);
    const dataStructure = {};
    Object.keys(settings.dataStructure).forEach(key => {
        dataStructure[key] = Number('0x' + settings.dataStructure[key]);
    });

    const deviceSetup = settings.deviceSetup.map((config) => {
        const address = Number('0x' + config.address);
        const value = Number(config.value);

        return { address, value };
    });

    // save settings
    i2cSettings.address = address;
    i2cSettings.dataStructure = dataStructure;
    i2cSettings.readFrequency = readFrequency;
    i2cSettings.deviceSetup = deviceSetup;
    i2cSettings.widgetId = settings.widgetId;

    socket.emit(events.STATUS, {
        ...i2cSettings
    });

    // In case address and readFrequency are not set up correctly,
    // don't start i2c and wait for proper configuration.
    if (!address || !readFrequency) {
        return;
    }

    startI2C(socket);
}


//
const setup = (socket) => {
    socket.on(events.STATUS, onSettingsReceived(socket));
}
const cleanup = () => {
    if (i2c.interval) {
        clearInterval(i2c.interval);
    }
}
//

module.exports = {
    cleanup,
    setup
}