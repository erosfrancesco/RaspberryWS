# SocketBoard

On Socket connection the app setup 3 modules for managing the board by socket events.
> Every socket packet should have a `widgetId` property, so that events can be filtered by connected widgets.
> All events are available once a connection has been extabilished. For that, see the `connection` socket docs.


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
  - READ: Read from 
  - Write
    - Write Success
  - Write PWM
    - PWM Success

## I2C
  - Settings (open and read)
    - Opened Success
  - Data
  - Write
