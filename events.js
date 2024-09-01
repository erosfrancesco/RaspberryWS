const events = {
    PIN_OPEN: {
        EVENT: () => 'pin-open',
        SUCCESS: (pin) => 'pin-success-open-' + pin,
    },

    PIN_READ: {
        EVENT: (pin) => 'pin-read-' + pin,
        SUCCESS: (pin) => 'pin-success-read-' + pin,
    },

    PIN_WRITE: {
        EVENT: (pin) => 'pin-write-' + pin,
        SUCCESS: (pin) => 'pin-success-write-' + pin,
    },

    PIN_PWM: {
        EVENT: (pin) => 'pin-pwm-' + pin,
        SUCCESS: (pin) => 'pin-success-pwm-' + pin,
    },

    I2C: {
        SETTING: () => 'i2c-settings',
        DATA: () => 'i2c-data',
        WRITE: () => 'i2c-write',
        OPEN: () => 'i2c-success-open'
    },
};

module.exports = { events };