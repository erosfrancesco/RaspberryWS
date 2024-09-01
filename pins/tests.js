const rpio = require('rpio');


const pin = 12;
const motor = rpio.open(pin, rpio.PWM);
rpio.pwmSetClockDivider(128);
rpio.pwmSetRange(pin, 8500);

rpio.pwmSetData(pin, 1000);

/*
const { Gpio } = require('pigpio');
const { openPin, readPin, writeToPin, writePWMToPin } = require('./pins');
/** */

const tests = async () => {
    /*
    const pin = new Gpio(18);
    // openPin('18');
    console.log(pin.getMode())

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