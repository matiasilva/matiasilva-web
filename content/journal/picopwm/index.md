+++
title = "Beginner's guide to PWM on the Pico"
date = 2021-03-15T13:23:47Z
tags = ["software", "electronics"]
summary = "Learn how to use the Rasberry Pi Pico's pulse width modulation blocks to produce analog-like signals for dimming LEDs, timers, and more!"
draft = false
+++

The Raspberry Pi Pico is an accessible ARM Cortex-based micro-controller for makers. It's jam-packed with cool stuff, one of which is its PWM blocks. In this brief guide I go over how the PWM functionality of the Pico works and a few PWM basics. This hopefully helps fill in more of the gaps that exist out there in the C/C++ programming guides for the Pico.

## What is PWM?

Pulse width modulation (PWM) is a technique used to create analog-like signals when working with digital devices, like micro-controllers. The output signal looks like a square wave since it can only take two possible values: logic high or logic low. These correspond to different voltage levels on different micro-controllers and on the Pico this corresponds to 0V and 3.3V.

There are two key parameters when it comes to PWM: frequency and duty cycle.

* **frequency**: how many cycles (ie, an on followed by an off or the smallest "unit" of the signal that repeats) take place every second
* **duty cycle**: the ratio of the on time to the total period of one signal cycle

You could, for example, create a crude PWM signal by just turning the Pico's GPIOs on and off and sleeping a few milliseconds in between. This could look something like:

```C
gpio_put(MY_PIN, HIGH);
sleep_ms(100);
gpio_put(MY_PIN, LOW);
sleep_ms(200);
```

Then, your duty cycle would be 33% since one full cycle spends 100ms high and 200ms low. There are many problems with the above approach: it's blocking, it's slow but most importantly the Pico has dedicated hardware to do this!

## PWM slices and registers

The Pico has 8 PWM slices, numbered 0-7, that have two channels each, numbered 0 and 1 (but you should use the `pwm_chan` enum values like `PWM_CHAN_A` in code). A slice is nothing but a dedicated "unit" of the PWM block with its own internal 16-bit counter and 16-bit compare registers (one for each channel). A channel is a usable output that can be attached to any of the available GPIOs on the Pico (included the onboard LED -> which is very useful for debugging). You can use all slices, one single slice, or none at all.

PWM is all about timing. The basic principle of operation is the following:

1. PWM slice is enabled by the user
2. The slice's internal counter counts up until it reaches either the wrap limit set by the user (called TOP) if set or the counter's limit (2^16 - 1 = 65535). After this, it "wraps back" to 0 and begins counting again. This is called a "free-running" counter.
3. At each increment of the internal counter, the counter value is compared to the value set in the compare register (this is called the "level"). If the counter value is greater than the channel's level, then the output drops to 0 until the counter wraps and it is set to logic high again. This repeats to give us nice square waves!

The counter is based on the system's clock. The Pico has a central system clock, called `sysclock` in the docs, that increments with every rising edge of the board's oscillator. By default, the system clock's frequency is 133MHz. You can set a division factor (also known as a prescaler on AVR systems) that sets the rate at which the internal clock increments. For example, a factor of 4 means that for every 4 system clock increments, the slice's clock increments by 1.

This way we can control the duty cycle by setting a different level and we can change the frequency by changing the dividing factor, which is by default at 1 (ie, in sync with sysclock). The clock's wrap value also has an effect on the signal's frequency.

Note: the Pico's PWM slices can also be used to measure input signals, but I won't get into that in this guide just yet!

## The C code

{{< notification type="info" >}}
The relevant part of the fantastic Pico C/C++ SDK documentation is "hardware_pwm" starting on page 155.
{{< /notification >}}

Naturally from the above explanation, a few parameters fall out: the channel level, the clock's wrap value and the dividing factor. The last two are configurable at the slice-level and the first is at the channel-level. Usually, we vary the channel level (to vary the duty cycle) but keep the slice's configuration constant once set. Therefore, the first step is to configure the slice.

After playing around with the SDK, I recommend using the slice configuration method, in which the two values mentioned before and a few others are encapsulated in a nice `struct`, which we pass to the slice on initialization. The other way is to individually set settings for a slice, which is OK for experimenting or if you're using one slice only, but using the config method is more robust, in my opinion.

One fun way to visualize the dividing factor's effect, is to set it to its max value of 255 and attach the the built-in LED to a PWM channel. This is the slowest possible setting for the PWM and I used it to figure out how to use the SDK as I don't have an oscilloscope. This could look something like:

```C
// set the built-in LED as a PWM pin
gpio_set_function(PICO_DEFAULT_LED_PIN, GPIO_FUNC_PWM);
// find out which slice our LED just got allocated
uint slice_num = pwm_gpio_to_slice_num(PICO_DEFAULT_LED_PIN);

// get a default config struct to modify
pwm_config config = pwm_get_default_config();
// optionally change the wrap value
// pwm_config_set_wrap(&config, 3);
// set the clock to increment only every 255 increments of sysclock
pwm_config_set_clkdiv(&config, 255.f);
// set a half duty cycle which is half of the counter's limit of 2^16
pwm_set_gpio_level(PICO_DEFAULT_LED_PIN, 0.5 * (1 << 16));
// initialize the PWM wiht our config and start it right after
pwm_init(slice_num, &config, true);
```

{{< notification type="danger" >}}
Make sure to add `hardware_pwm` to your `CMakeLists.txt` file so that your file knows where to find the Pico's PWM API. This looks like: `target_link_libraries(blink pico_stdlib hardware_pwm)`
{{< /notification >}}

Now all that's left is to compile the code and flash the board. I've covered how to do that in another journal entry using a Raspberry Pi 3B+, the Pico's SWD pins and GDB + OpenOCD.

## Conclusion

I hope this guide helped you understand how the Pico's PWM blocks work. Though I covered the Pico, the basic concepts are easily extendable to other micro-controller platforms (I came from Arduino myself). One notable difference is how thing the Pico's hardware APIs are, which is really cool! Make sure to read the C/C++ SDK documentation for more information on specific functions or even better, play around with PWM yourself!

If you find any incorrect information or want to suggest improvements, please open an issue/pull request.