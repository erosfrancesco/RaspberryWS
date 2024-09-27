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
    const pin = openPin('18');
    pin.servoWrite(0);
    let pulseWidth = 500;
    let increment = 100;

    setInterval(function () {
        pin.servoWrite(pulseWidth);
        console.log('Pulsewidth:', pulseWidth)

        pulseWidth += increment;
        if (pulseWidth >= 2500) {
            increment = -100;
        } else if (pulseWidth <= 1500) {
            increment = 100;
        }
    }, 100);
}

// TESTS
// digitalTest();
servoTest();


/** 
const pin = openPin('18');
let pulseWidth = 500;
let increment = 100;

pin.servoWrite(0);

setTimeout(() => {
    pin.servoWrite(1500);
}, 1000)

setTimeout(() => {
    pin.servoWrite(2500);
}, 2000)

setTimeout(() => {
    pin.servoWrite(0);
}, 2500)
/** */