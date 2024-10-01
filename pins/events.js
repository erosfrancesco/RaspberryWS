const events = {
    OPEN: 'pin.open',
    READ: (pin) => 'pin.read.' + pin,
    WRITE: (pin) => 'pin.write.' + pin,
    PWM: (pin) => 'pin.pwm.' + pin,
    SERVO: (pin) => 'pin.servo.' + pin, // TODO: - Implement
};

module.exports = events;
