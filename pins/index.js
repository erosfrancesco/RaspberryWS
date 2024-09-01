const { Gpio } = require('pigpio');

const directionMap = {
    'out': Gpio.OUTPUT,
    'output': Gpio.OUTPUT,
    'in': Gpio.INPUT,
    'input': Gpio.INPUT,
    'pwm': Gpio.INPUT
};

const openPin = (pin, direction = 'out') => {
    const mode = directionMap[direction] || Gpio.OUTPUT;
    return new Gpio(pin, { mode });
};

const readPin = async (openedPin) => {
    return await openedPin.digitalRead()
}

const writeToPin = async (openedPin, value) => {
    const digitalValue = Number(value);
    await openedPin.digitalWrite(digitalValue);
};

const writePWMToPin = (openedPin, value) => {
    const pwmValue = Number(value) % 256;
    return setInterval(() => {
        openedPin.pwmWrite(pwmValue);
    }, 20);
}


module.exports = {
    openPin,
    readPin,
    writeToPin,
    writePWMToPin
}