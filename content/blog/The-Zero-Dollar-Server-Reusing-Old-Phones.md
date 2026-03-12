---
author: "hkcfs"
date: '2026-03-12'
title: 'The Zero Dollar Server Reusing Old Phones'
tags:
  - android
  - linux
  - postmarketos
  - recycling
  - low power
  - arm
---

We all have that one drawer. You know the one filled with old cables, a broken mouse, and at least three Android phones that are "too good to throw away" but "too slow to use." One of mine is an old Xiaomi with a cracked screen and a battery that lasts about two hours. 

Most people see a paperweight. I see a quad-core ARM processor and 3GB of RAM that’s just sitting there doing nothing. It even has a built-in battery that acts as a free UPS no more worrying about that 1-2 second power flicker I mentioned in my UPS post.

### Why Use a Phone?
Think about it. A phone is basically a specialized SBC (Single Board Computer). It has:
- A built-in UPS (the battery).
- Built-in Wi-Fi and Bluetooth.
- A display (for debugging).
- Decent power efficiency.

The main issue? The battery. If you leave a phone plugged in 24/7, the battery will eventually bloat and turn into a "spicy pillow." To fix this, I used a simple root-level script that limits the charge to 60%. If the battery hits 60%, it stops charging. If it drops to 50%, it starts again. 

### PostmarketOS vs. Termux
If you want a "real" Linux experience, check if your phone is supported by **postmarketOS**. It’s a real Linux distro (based on Alpine!) that runs on phones. 

For my "non-supported" devices, I use **Termux** with a **Proot-distro** running Alpine. It sounds complicated, but it’s basically a lightweight container inside Android. I can `apk add` whatever I need. I’m currently using my old Xiaomi as a dedicated **Uptime Kuma** and **MQTT broker**. 

### Offloading the Dell Junk
By moving my monitoring services and my smart home "brain" (Zigbee2MQTT) to this old phone, I’ve saved about 400MB of RAM on my main **Dell J1900 NAS**. On a machine with only 4GB, 400MB is a *lot* of breathing room. 

I’ve also set up a small `crontab` to reboot the phone once a week because, let's face it, Android drivers can be flaky. But otherwise, it's rock solid.

Don't let your old tech rot. Root it, wipe it, and make it work for you. It’s better for the planet, and honestly, there's something satisfying about running a production server on a device with a shattered screen that was destined for the bin.

