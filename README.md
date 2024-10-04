# SocketBoard

On Socket connection, these events are available:

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
