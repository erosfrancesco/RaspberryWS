# SocketBoard

The app setup 3 modules for managing the board by socket events.

> [!NOTE]
> All events are available once a connection has been extabilished. For that, see the `connection` socket docs.
> 
> Every socket packet should have a `widgetId` property, so that events can be filtered by connected widgets. This could be managed by room also, but for now that's a WIP.


## SHELL MODULE
A module for Shell connectivity. Under the hood it uses [child_process](https://nodejs.org/api/child_process.html)
  - CMD
    
    Send a shell command, listen for command output
    - send    `{ command, rootFolder }`
    - receive `{ command, output }`

## GPIO
A module for GPIO connectivity. Under the hood it uses [pigpio](https://www.npmjs.com/package/pigpio)

> [!CAUTION]
> Before app installation, check the setup of pigpio on your board.

  - OPEN

    Open GPIO pin, listen to receive confirmation.
    - send    `{ pin }`
    - receive `{ pin }`
  - READ(pin)
  
    Read from opened GPIO pin. Listen to receive data.
    - send
    - receive `{ data }`
  - Write(pin)
    
    Digital write to opened GPIO pin. Listen to receive confirmation.
    - send `data`
    - receive `{ data }`

  - Write PWM(pin)
    
    PWM write to opened GPIO pin. Listen to receive confirmation.
    the value can be from 0 to 256, and is written every 20 ms.
    - send `data`
    - receive `{ data }`

  TODOS: 
  - [ ] \(Optional) PWM write cycle management events
  - [ ] \(Optional) Servo events

## I2C

A module for I2C connectivity. Under the hood it uses [i2c-bus](https://www.npmjs.com/package/i2c-bus)

> [!CAUTION]
> Before app installation, check the setup of I2C on your board.

In order to manage I2C, a bit of settings are required, it's not exactly a plug-and-play. This module uses the object `i2cSettings`:

  - widgetId: - (duh)
  - address: - I2C Device address. (In case of the MPU6050 is 0x68, or 104). Could be useful to scan for devices: `sudo i2cdetect -y 1`
  - deviceSetup: - A list of `{address, value }`. On I2C startup, these values are written on their respective addresses
  - dataSchema: - A map of `[key]: address`. On I2C read, for every key (or label), read data on the corresponding address and build an object of this type: `{[key]: addressData}`
  - readFrequency - Read every ms.


  - Status
    
    Write settings on your board for I2C connection. Listen to receive updated settings
    - send `i2cSettings` (see above)
    - receive `i2cSettings` (see above)
      
  - Data

    Listen to receive data stream. It has the dataSchema defined in the settings.
  
  TODOS: 
  - [ ] \(Optional) Write events
