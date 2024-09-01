from RPIO import PWM

pin = 18
servo = PWM.Servo()

# Set servo on GPIO17 to 1200µs (1.2ms)
servo.set_servo(pin, 1200)

# Set servo on GPIO17 to 2000µs (2.0ms)
servo.set_servo(pin, 2000)

# Clear servo on GPIO17
servo.stop_servo(pin)