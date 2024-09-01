const i2c = require('i2c-bus');


//
function openI2C(address) {
    const dataChannel = i2c.openSync(1);

    writeI2C(dataChannel, address, (0x19), 7); // Sample rate
    writeI2C(dataChannel, address, (0x6B), 1); // Power Management
    writeI2C(dataChannel, address, (0x1A), 0); // Configuration
    writeI2C(dataChannel, address, (0x1B), 24); // Gyro configuration
    writeI2C(dataChannel, address, (0x38), 1); // Interrupt

    return dataChannel;
}

function closeI2C(dataChannel) {
    dataChannel.closeSync();
}

function writeI2C(dataChannel, ...configs) {
    dataChannel.writeByteSync(...configs);
}

function readI2CRaw(dataChannel, ...configs) {
    return dataChannel.readByteSync(...configs);
}
//


//
function readI2CAddress(dataChannel, channelAddress, dataAddress) {
    const high = readI2CRaw(dataChannel, channelAddress, dataAddress)
    const low = readI2CRaw(dataChannel, channelAddress, dataAddress + 1);
    const value = (high << 8) | low;

    if (value >= 0x8000) {
        return -((65535 - value) + 1);
    } else {
        return value;
    }
}

function readI2CData(dataChannel, channelAddress, dataMap) {
    return Object.keys(dataMap).reduce((acc, key) => {
        const address = Number('0x' + dataMap[key].toString(16));
        acc[key] = readI2CAddress(dataChannel, channelAddress, address);

        return acc;
    }, {});
}
//


module.exports = {
    openI2C,
    closeI2C,
    readI2CData,
    writeI2C
}