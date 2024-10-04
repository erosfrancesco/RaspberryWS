# SocketBoard

The app setup 3 modules for managing the board by socket events.

> [!NOTE]
> All events are available once a connection has been extabilished. For that, see the `connection` socket docs.
> 
> Every socket packet should have a `widgetId` property, so that events can be filtered by connected widgets. This could be managed by room also, but for now that's a WIP.


## SHELL MODULE
  - CMD
    
    Send a shell command, listen for command output
    - send    `{ command, rootFolder }`
    - receive `{ command, output }`

## GPIO
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
  - Settings (open and read)
    - Opened Success
  - Data
  - Write
