const { openPin, readPin, writeToPin, writePWMToPin } = require('./');

const digitalTest = async () => {
    const pin = openPin('4');

    await writeToPin(pin, 1);
    const value1 = await readPin(pin);
    console.log('Pin read:', value1);

    await writeToPin(pin, 0);
    const value2 = await readPin(pin);
    console.log('Pin read:', value2);
};

const servoTest = () => {
    /*
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

// TESTS
digitalTest();
servoTest();
