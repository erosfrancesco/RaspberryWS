# SocketBoard

On Socket connection the app setup 3 main modules for managing the board by socket events.
Every socket packet should have a widgetId property.

## SHELL MODULE
  - CMD: Send command, listen for command output
    - send    { widgetId, command, rootFolder }
    - receive { command, output, widgetId }

## GPIO
  - OPEN: Send to open GPIO pin, listen to receive confirmation.
    - send    { pin, widgetId }
    - receive { pin, widgetId }
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
