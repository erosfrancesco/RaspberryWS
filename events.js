const I2C = require('./i2c/events');
const PINS = require('./pins/events');

const events = {
    PINS,
    I2C,

    SHELL: {
        SEND: () => 'shell-send',
        OUTPUT: () => 'shell-output'
    }
};

module.exports = events;
