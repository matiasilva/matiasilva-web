+++
title = "My first steps with the Pico"
date = 2021-03-16T20:54:43Z
tags = ["electronics"]
summary = "In this journal entry I document my first steps with the Raspberry Pi Pico. I go over how I stumbled upon the Pico, get the blink sketch working, and start a new LED panel project with the Pico. I talk about a few of the key concepts behind ADC too!"
draft = false
+++

*In this journal entry I document my first steps with the Raspberry Pi Pico. I go over how I stumbled upon the Pico, get the blink sketch working, and start a new LED panel project with the Pico. I talk about a few of the key concepts behind ADC too!*

## Introduction

It was by accident that I stumbled upon the Pico on its release date. I was working with a Raspberry Pi 3B+ and trying to use the UART console for a camera project when I found myself needing to look something up in the documentation, more specifically on what models the serial console is enabled and on what pins. As I don't have an extra wired keyboard and the networking situation in my room is complicated\*, my saving grace is that the Pi exposes the console via UART. To cut a long story short, I ended up on the boards page where I found an unfamiliar "pico" board. I'm a big fan of all things Pi, so I was pretty sure this wasn't just something old that skipped my eye. In fact, it was pure coincidence that that also happened to be the day when the Raspberry Pi Foundation/Trading released the Pico and their RP2040 silicon, which I spotted and quickly went on a googling spree to find out what was up with this new board.

I immediately ordered 4 from Pimoroni and anxiously waited for their arrival. It turns out, I couldn't wait so I woke up at 7AM the next morning, and cycled to Tesco (someone tweeted that there was one copy left of the Hackspace magazine which came with a free Pico!!). A few weeks later, and the barrage of university work has meant that I've been unable to tinker freely with this new toy until now. So here goes some self-documentation and the things I did to play around with the Pico!

\* I'm limited to using eduroam, or UniOfCam-IoT which, at my college, are both managed by the UIS and firewall inbound connections. This makes it impossible for me to talk to any of my devices from my laptop, which is on a *different* wired connection.

## Getting started & development environment

I was already familiar with the different approaches to programming the Pico, as the amazing getting started guides and documentation became my bedtime reading in the days after the Pico was released. As mentioned before, though, I didn't have the time to properly set up the tool chain and get something working, but I knew I wanted to try out the C/C++ SDK to improve my embedded systems skills and general Cortex programming.

Funny enough, in the weeks leading up to this post, I had switched to using the same 3B+ as my remote development with the VS Code remote extension that Just Works \*. Before my move to a separate Linux system, I was using Windows Subsystem for Linux (because developing *anything* on Windows is a rightful pain) which was OK, but still had some shortcomings, so in a way it's good that I waited!

Getting the tool chain installed was quite simple and straightforward, which is really good because my supervisor told me that the worst thing is to spend a week setting up the tool chain and then it doesn't work! I began with [this really well written blog post](https://www.raspberrypi.org/blog/how-to-blink-an-led-with-raspberry-pi-pico-in-c/) by Alasdair. I modified the setup bash script to account for the fact that this was a remote VS Code environment and not a standalone machine, and also set the `PICO_SDK_PATH` env var in the server's `settings.json` and I was ready to go! The only slight complication I encountered was building OpenOCD, which failed on the first go because the auto-generated `ltmain.sh` file kept popping up in my home directory and not in the dedicated build directory `~/pico/openocd` but after I moved it manually and reran, it compiled successfully\*\*.

\* I could go on for hours about this extension, because it's seriously resulted in a massive boost in my development productivity. The thing I like the most about it is the integrated terminal, which lets me open up bash sessions to my heart's content and positions them really neatly, so that I can edit code, view my working directory and type in commands, all on my 27-inch monitor! Another amazing thing is that I can define so-called workspaces, which connect to my machine (I got around my networking problems with a wired connection on my subnet) and open up different directories. So, for example, if I want to write a blog post in Markdown, I can just open the "writing" workspace, and I'm set! Also lets me configure different env vars for different workspaces -- anyway it's really cool. Thanks to the blog posts on running VS Code on the Pi that got me thinking about this as a possibility!

\*\* This was odd behavior and it turns out that it was the silliest and most absurd mistake. Lesson learned: don't name your install script `install.sh`! See [this comment](https://github.com/protocolbuffers/protobuf/issues/149#issuecomment-473092810) for an explanation.

## Blink

After writing the three necessary files and `make`'ing my `blink.c`, I was ready to upload. Trick was that because I set up my 3B+ to use Raspbian Lite, USB devices aren't automatically mounted as they are on the desktop version. I first thought about mounting this automatically with an `fstab` entry, but then I found something even better: `picotool`!

In any case, here's an extract from a forum post in case I ever need to mount the Pico manually:

```bash
$ dmesg | tail
[ 371.973555] sd 0:0:0:0: [sda] Attached SCSI removable disk
$ sudo mkdir -p /mnt/pico
$ sudo mount /dev/sda1 /mnt/pico
$ ls /mnt/pico/
INDEX.HTM INFO_UF2.TXT
$ sudo cp blink.uf2 /mnt/pico
$ sudo sync
$ sudo umount /mnt/pico
```

## CMake on VS Code

The CMake tools are fantastic, but unfortunately because I'm working on a remote machine, they don't source from `.bashrc` and thus are unaware of the SDK path. The solution is to open the extension settings and set the environment variables in the handy table. Alternatively, add this to the project-level, workspace-level or user-level `settings.json` file:

```json
"cmake.buildEnvironment": {
  "PICO_SDK_PATH": "/home/pi/pico/pico-sdk"
}
```

If that doesn't work, you'll also need to add it to the configuration and general environment variables.

## Intermission for book!

It was at around this point in my tinkering that I went to the Porters' Lodge and picked up the copy of "Practical Electronics for Inventors" that had just arrived. How exciting! It looks like a really cool book, and a quick skim already revealed a few things that I had to learn "the hard way".

Edit: the morning after I spent two hours reading the first chapters and it's really cool.

## Debugger

Now I decided that it was time to try out the debugger and OpenOCD. I followed all the instructions in the *Getting started guide*, and I got there! Really cool stuff, and being able to see the register values and set breakpoints will prove to be massively useful, instead of loosely scattered `printf` statements. One slight change I made was to open `minicom` on `serial0`, which is an alias to the serial point that is configured for your Pi. Since I'm using a 3B+ and the docs are using a 4, I assumed there was a difference as I didn't see `/dev/ttyACM0` in my list.

Here's the command I used:

`minicom -b 115200 -o -D /dev/serial0`

To exit minicom, you should press ctrl a, followed by z, followed by x then press enter.

## The journey to light

The main motivator behind my Pico tinkering has been my desire to set up an LED lighting system for my room. I have 4 5 meter LED strips (some individually addressable, others standard RGB) that I've been meaning to set up in my room and the Pico was a good excuse to get down and dirty with a C-based SDK.

The goal of the project is nothing too fancy: three knobs for each color component that will vary the color of the strips. I haven't planned this one out too much, but I expect to use the ADC and PWM capabilities of the Pico. Wiring will be done with some pretty nice single conductor 20 AWG wire I bought on Amazon.

With this in mind, I started prototyping. By this stage, I've got the SWD debugger fully set up so I don't need to keep unplugging and putting the Pico in `BOOTSEL` mode to flash it.

### Analog to digital converter

The three knobs are in reality potentiometers. This is a component that has three pins and varies its output voltage according to how far the knob has been turned by varying its resistance (it's a potential divider). This is an analog voltage so we need to make use of the Pico's ADC to get a useful reading that we can use to control the PWM output.

An analog-to-digital converter is a fancy component (sometimes standalone, but more often than not already in microcontrollers) that takes an analog voltage and converts it to a digital value.

Two important parameters are the reference voltage and the resolution. Higher resolutions take longer to sample but you gain greater granularity. The reference voltage sets an upper bound, so to speak, for the number the ADC spits out.

For example, if your reference is 3.3V (Pico's VREF) and the ADC has a 12-bit resolution and you measure 1024, then your measured voltage is `VREF * 1024/4096 = 0.825V`. The resolution sets the denominator and we can see how a greater resolution means finer voltage steps. The math above can be generalized to a conversion factor between a measured 12-bit number that goes from 0-4095 to a voltage from 0-VREF. The Pico SDK docs have the following:

```C
const float conversion_factor 3.3f / (1 << 12);
```

It's a simple division with the voltage reference in the numerator and the possible values the ADC can give on the bottom. The reason why it's not so straightforward is that it's a bitwise operation.

{{< notification type="info">}}

#### Quick primer on binary numbers

Binary numbers are in base 2, in other words they are made up of 1s and 0s. Conversion from binary to decimal is done by multiplying the 1s and 0s by the power each house/digit represents. For example, `0010` is `0*2^3 + 0*2^2 + 1*2^1 + 0*2^0` which is 2 in base 10. This lets us express any number in base 2 in base 10 (and vice versa), because a number is independent of the base used!

{{< /notification >}}

`(1 << 12)` is a smart trick that is equivalent to the number 4096. It's more readable/useful than saying "4096" because someone unfamiliar with the Pico ADC resolution won't understand. It's self-documentation,basically.

What it's actually doing is shifting a `1` 12 bits to the left which is 2^12. A 12-bit number has 12 bits, each representing digits from `2^0` all the way to `2^11` such that if we were to set all bits in the 12-bit number to 1, we'd get 4095. But recall that 0 is also a possibility, so a 12-bit number has 4096 possible values! This is one of those "tricks of the trade" that you end up picking up the more you play with this stuff.

#### How does it work?

GreatScott has a [great YouTube video](https://www.youtube.com/watch?v=EnfjYwe2A0w) explaining how ADCs work. Essentially, an ADC consists of a successive approximation register, a DAC (digital to analog converter) and a comparator.

The SAR tries to set its bits to 1 one at a time, starting at the MSB, then this "trial" bit gets fed to the DAC and the voltage it generates based on the SAR value is compared to the reference voltage. If it's less than the reference, then the "trial" was successful and the 1 gets stored in the register. It means we can keep on approximating as we're not quite there yet.

The approximating is done once the SAR voltage is greater than the reference. You can see how more bits means greater resolution, since our voltage steps will be smaller.

#### Practical limitations

I ran and compiled the [sample code for the ADC](https://github.com/raspberrypi/pico-examples/blob/master/adc/hello_adc/hello_adc.c) (make sure to include `hardware_adc`in your CMakeLists.txt file!) and got something like:

`Raw value: 0xfec, voltage: 3.283887 V`

You'll see that it doesn't actually get to 3.3V and neither does it get to 0. I didn't expect it to and for our purposes it's more than enough.

### Pulse width modulation

PWM is a fancy word for square wave. The square wave has a variable on time (how long it's held at HIGH) but a fixed frequency. The ratio of the on time to the total time of one period is the duty cycle. 

PWM is sometimes used for power efficiency but in this case we like it because it lets us give the LED strips an "analog" value for its inputs. A square wave is digital, so 0 to HIGH, but by varying the duty cycle, and having a high enough frequency, our eyes can be tricked into seeing different colors based on the duty cycle.

I've written up an entire guide on using PWM on the Pico, so make sure to check that out!

### Final result

After a few long hours of soldering, and code debugging, I was able to build my LED strip panel. I've written up a project page on that, so check that if interested! The code is freely available on GitHub too and it follows pretty much everything I've discussed here.

## Conclusion

This journal entry was about my first steps with the Raspberry Pi Pico. It might be useful for posterity or when I need to retrace my steps. If this helps someone, then that's a plus!
