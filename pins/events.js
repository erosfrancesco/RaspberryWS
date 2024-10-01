const events = {

    OPEN: (pin) => 'pin.open.' + pin,
    READ: (pin) => 'pin.read.' + pin,
    WRITE: (pin) => 'pin.write.' + pin,
    PWM: (pin) => 'pin.pwm.' + pin,
    SERVO: (pin) => 'pin.servo.' + pin, // TODO: - Implement


    /*
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
    }
    /** */
};

module.exports = events;
