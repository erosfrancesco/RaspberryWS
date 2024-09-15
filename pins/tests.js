const { Gpio } = require('pigpio');
const { openPin, readPin, writeToPin, writePWMToPin } = require('./pins');

const tests = async () => {
    const pin = openPin('18');

    const value = await readPin(pin);
    console.log('Pin read:', value);
    
    /*
    // SERVO
    let pulseWidth = 500;
    let increment = 100;

    pin.servoWrite(0);

    setInterval(function () {
        pin.servoWrite(pulseWidth);
        console.log('Pulsewidth:', pulseWidth)

        pulseWidth += increment;
        if (pulseWidth >= 2000) {
            increment = -100;
        } else if (pulseWidth <= 1000) {
            increment = 100;
        }
    }, 100);
    /** */
}

tests()
