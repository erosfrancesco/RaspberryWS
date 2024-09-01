const {
    openI2C,
    closeI2C,
    writeI2C,
    readI2CData
} = require('./');

const REG = {
    'ADDRESS': (0x68),	     // Address value i2cdetect command

    'POWER_MGMT': (0x6B),	 // Power Management register
    'SAMPLE_RATE': 0x19,     // Sample rate register
    'CONFIG': 0x1A,          // Sensor configuration register
    'GYRO_CONFIG': 0x1B,     // Gyro configuration register
    'INT_ENABLE': 0x38,      // Interrupt register


    'accelX': (0x3B),	     // Accelerometer registers
    'accelY': Number('0x' + '3D'),	     //
    'accelZ': (0x3F),	     //
    /*
    'temp': (0x41),	         //	Temperature registers
    'gyroX': Number('0x' + '43'),	     // Gyroscope registers
    'gyroY': (0x45),	     //
    'gyroZ': (0x47), 	     //
    /** */
};

const channel = openI2C(REG.ADDRESS);

writeI2C(channel, REG.ADDRESS, REG.POWER_MGMT, 1);
writeI2C(channel, REG.ADDRESS, REG.SAMPLE_RATE, 7);
writeI2C(channel, REG.ADDRESS, REG.CONFIG, 0);
writeI2C(channel, REG.ADDRESS, REG.GYRO_CONFIG, 24);
writeI2C(channel, REG.ADDRESS, REG.INT_ENABLE, 1);


const computeData = (data) => {
    return Object.keys(data).reduce((acc, key) => {
        const value = data[key];
        acc[key] = value / 16384.0;

        return acc;
    }, {});
}

const interval = setInterval(() => {
    const { ADDRESS, POWER_MGMT, SAMPLE_RATE, CONFIG, GYRO_CONFIG, INT_ENABLE, ...dataMap } = REG;
    const data = readI2CData(channel, ADDRESS, dataMap);

    console.log(computeData(data));
}, 400);

setTimeout(() => {
    clearInterval(interval);
    closeI2C(channel);
}, 2000);
/** */
