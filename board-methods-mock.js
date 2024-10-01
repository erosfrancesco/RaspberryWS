/**
 * 
 * This is a mock file for Raspberry PI only libraries, such as pigpio and i2c-bus
 * Exports all methods necessary for I2C and GPIO modules
 * 
 */

// GPIO
const Gpio = (pin, configs) => {
    this.digitalRead = () => { return 1; }
    this.digitalWrite = () => { }
    this.pwmWrite = () => { }

    return this;
};

const openPin = (pin) => {
    return new Gpio(pin, { mode: 'out' });
};

const readPin = async (openedPin) => {
    return await openedPin.digitalRead();
}

const writeToPin = async (openedPin, value) => {
    const digitalValue = Number(value);
    const res = await openedPin.digitalWrite(digitalValue);
    return res;
};

const writePWMToPin = (openedPin, value) => {
    const pwmValue = Number(value) % 256;
    return setInterval(() => {
        openedPin.pwmWrite(pwmValue);
    }, 20);
}


// I2C
const i2c = {
    openSync: (channel) => ({
        closeSync: () => { },
        writeByteSync: (...configs) => { },
        readByteSync: (...configs) => { },
    })
}

//
function openI2C(channel = 1) {
    return i2c.openSync(channel);
}

function closeI2C(dataChannel) {
    dataChannel.closeSync();
}

function writeI2C(dataChannel, ...configs) {
    return dataChannel.writeByteSync(...configs);
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
    writeI2C,

    openPin,
    readPin,
    writeToPin,
    writePWMToPin
}