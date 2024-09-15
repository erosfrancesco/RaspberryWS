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

    SERVO_WRITE: {
        EVENT: (pin) => 'pin-servo-' + pin,
        SUCCESS: (pin) => 'pin-success-servo-' + pin,
    },

    I2C: {
        SETTING: () => 'i2c-settings',
        DATA: () => 'i2c-data',
        WRITE: () => 'i2c-write',
    },

    I2C_OPEN: {
        EVENT: () => 'i2c-open',
        SUCCESS: () => 'i2c-success-open'
    },

    SHELL: {
        SEND: () => 'shell-send',
        OUTPUT: () => 'shell-output'
    }
};

module.exports = events;
