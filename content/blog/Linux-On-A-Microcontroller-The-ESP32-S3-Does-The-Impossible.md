---
author: "hkcfs"
date: '2025-12-22'
title: 'Linux on a Microcontroller the ESP32 S3 Does the Impossible'
tags:
  - linux
  - esp32
  - microcontroller
  - embedded
  - minimalism
  - iot
  - buildroot
  - open-source
  - hardware hacking
	
---

You know, we spend a lot of time drooling over the latest CPUs with hundreds of gigabytes of RAM, or **fat, hungry Nvidia GPUs** with terabytes of VRAM. We talk about "edge computing" on Raspberry Pis or even fancy mini-PCs. But what if I told you that developers are now cramming a full Linux kernel onto a microcontroller? Yes, a microcontroller. The tiny chips typically found in smart light bulbs or simple sensors.

For a long time, the idea of running Linux on something like an **ESP32** was considered impossible, or at best, a crazy hack with no practical purpose. These chips have a few megabytes of RAM, not gigabytes. They are designed for simple, real-time tasks, not running a full operating system with all its bells and whistles. But sometimes, "impossible" is just a dare to the open-source community.

I'm here to tell you that the impossible has become a reality. People are running Linux on the **ESP32-S3**, and it's not just a boot screen; it's a functional, networked Linux system. This is a feat of engineering that makes my **16MB OpenWrt router** look like a server rack (I think it's a bit too much).

## The Hardware Hero: The ESP32-S3 (and its tiny brain)

Before we get into the Linux wizardry, let's appreciate the hardware: the **Espressif ESP32-S3**. This is a fantastic chip, primarily designed for IoT devices.

*   **CPU:** It sports a dual-core **Xtensa LX7** processor, running at speeds up to 240MHz. (For Linux, it often runs a bit slower, or is clocked down to save power).
*   **RAM:** Typically, these boards have internal SRAM measured in hundreds of kilobytes, plus external PSRAM which might range from 2MB, 4MB, 8MB, or sometimes even 16MB. We're talking megabytes, people. Not gigabytes.
*   **Connectivity:** Built-in Wi-Fi and Bluetooth.
*   **Purpose:** Usually, you'd program this with C/C++ using the ESP-IDF, or MicroPython, for low-level, real-time control.

> *The ESP32-S3 is like a highly efficient, specialized drone. It's built for specific, fast-response tasks, not for carrying a payload the size of a jumbo jet. The idea of loading Linux onto it is like asking that drone to carry a full-sized human.*

## The Unbelievable Feat: Linux Booting!

The breakthrough came from dedicated developers pushing the limits. One prominent figure, "rudi ;-)" on the ESP32 Forum, has been a key driver. Just check out his thread, aptly titled "[Boot Linux on ESP32-S3](https://esp32.com/viewtopic.php?t=33675)".

The initial success was met with excitement, but also a healthy dose of skepticism. As one forum user, "username," put it:

> "Lastly, though it boots, what can we really do with such limited ram?"

And that's the million-dollar question. What *can* you do with so little?

Looking at the terminal output from rudi's work (you can see similar outputs in the YouTube videos as well):

```
Linux buildroot 6.5.0-rc1 #2 PREEMPT Tue Aug 8 08:11:59 CEST 2023 xtensa GNU/Linux
Mem: 7.2M total, 4.1M used, 2.3M free, 884.0K buff/cache
CPU: 37% usr, 27% sys, 0% nic, 34% idle, 0% io, 0% irq, 0% sirq
Load average: 0.08 0.05 0.01 1/37 900
```
(As seen in the image on the ESP32 forum)

Let that sink in: **7.2MB total RAM detected, with 2.3MB free.** A full Linux kernel, running on literally a **4.9MB** megabytes of RAM. Most "minimal" Linux distributions for desktop PCs would consume 10-5x that just for the kernel. This is not just minimal; this is *microscopic*.

Initial clockspeeds often start around 160MHz, but developers quickly pushed it to the chip's limit. As rudi stated:
> "i heard you, - here you are 240 MHz," ... "sched_clock: 32 bits at 240MHz, resolution 4ns, wraps every 8947848189ns"

## What Can You *Actually* Do? (The "Limited RAM" Question, Answered Ingeniously)

So, with only a few megabytes of RAM, what's the point? You can't compile a big program locally. You can't run a web server hosting hundreds of pages. You can barely run `top` without it eating half your RAM.

This is where the true ingenuity comes in: **remote file systems and SSH**.

The ESP32 Linux port isn't meant to be a standalone powerhouse. It's designed to be a thin client to a more powerful server. As demonstrated in one of the YouTube videos (see "[Remote Build by ESP32-S3 SSH Client which runs #jcmvbkbc #esp32s3 #linux #esp32 S3 port](https://www.youtube.com/watch?v=S08Qx3x-y8Q)") and the forum post, the system can:

*   **Connect to Wi-Fi:** Yes, it uses `wpa_supplicant` just like a regular Linux machine to get online.
*   **Run an SSH Server:** You can `ssh` into the ESP32, giving you a proper Linux command line.
*   **Act as an SSH Client:** The ESP32 itself can then `ssh` out to other servers.
*   **Mount an NFS Share:** This is the game-changer. The ESP32 Linux client mounts a large, remote NFS (Network File System) share over Wi-Fi.
*   **Execute from Remote Storage:** This 100GB mounted share becomes its "executable space." You can then compile and run applications *from that remote share*.

This setup allows for:
*   **Rapid Development:** No more reflashing the ESP32's tiny flash memory after every code change. You compile on your powerful remote server, and the ESP32 simply executes the updated binary from the mounted NFS share. (only for linux not general baremetal code)
*   **Running Interpreted Languages:** The system can run **Lua** and **MicroPython**, even different versions simultaneously, executing them directly from the remote NFS share. (As demonstrated in this video: "[Run Linux on ESP32 - how to run the Linux kernel on an ESP32](https://www.youtube.com/watch?v=R3L0j9_d0D0)")
*   **Real Linux Tooling:** You get access to a full POSIX-compliant environment, `ls`, `cat`, `free`, `top`, and other basic Linux utilities, that run just barely.

The Linux kernel on ESP32-S3 is still very much an experimental, bleeding-edge project. It's not for the uninitiated yet.
