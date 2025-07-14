---
author: "hkcfs"
date: '2025-07-14'
title: 'My Pocket-Sized Powerhouse: Building an Alpine NAS on a Dell Junk'
tags:
  - linux
  - alpine
  - nas
  - docker
  - self-hosting
  - minimalism
  - low power
  - j1900
---

People often think you need a powerful, expensive computer to run a good home server or NAS (Network Attached Storage). They imagine big, noisy machines with lots of fast parts. But I'm here to share a story about a very old, weak computer that does a great job, showing that you can do a lot with less if you pick the right software.

My "NAS" is actually just an old Dell laptop. It's nothing special: it has an old **Intel J1900 processor**, which is about as powerful as a Raspberry Pi 3B+. It only has **4GB of RAM**. And get this: the internal hard drive port broke a long time ago, so I can only use external hard drives connected by USB. Plus, the main internet port stopped working, so I have to use a **USB-to-Ethernet adapter** for network access.

Sounds like trash, right? Most people would throw it away. But for me, it's a perfect example of what you can achieve with smart software and a focus on keeping things simple. This isn't just for storing files; it's a full home server running many useful programs, and it uses very little electricity.

## The Computer: An Old but Useful Machine

Let's look closer at the computer itself:
-   **CPU:** Intel J1900 (4 cores, 4 threads, low speed). This chip was made for basic computers that don't need fans, so it uses very little power. But it's not fast at all for big tasks.
-   **RAM:** 4GB DDR3. This is often the smallest amount of memory people suggest for any server, especially one running container programs like Docker. Managing this memory well is super important.
-   **Storage:** All my storage is on external hard drives connected through USB. This means the speed of moving data is limited by the USB ports, which are not as fast as internal connections like SATA.
-   **Network:** I use a USB-to-Ethernet adapter. This could sometimes cause problems with stability or speed if the adapter or its software isn't good.

This laptop wasn't built to be powerful. It was made for simple office work or just browsing the internet. But now, it's the core of my home data system, proving that you don't always need a lot of raw power.

## Alpine Linux: The Operating System for Small Computers

The real trick to making this work is the operating system: **Alpine Linux**. For computers with limited resources, Alpine is the best choice. Here’s why it was perfect for my setup:

-   **Very Small Size:** Alpine is incredibly tiny. It uses a different main system library (`musl libc` instead of `glibc`), which makes programs very small and keeps the basic system very compact. This means it uses very little disk space and, most importantly, very little RAM.
-   **Security First:** Alpine uses a specially hardened version of the Linux kernel and has strong security features built in. This makes it a very safe base for any server, reducing the ways hackers could get in.
-   **Great for Docker:** Alpine is well-known for working perfectly with Docker. Because it's so small, container images built on Alpine are also tiny, and its package manager (`apk`) is fast and efficient. This makes it very easy to run containerized applications.

Because Alpine is so small, when the laptop is just on and doing nothing, it uses only about **170MB of RAM**. Yes, on a 4GB RAM laptop, less than 200MB is used just for the operating system! This leaves a lot of memory free for the services I want to run.

## The Software Stack: Docker and My Favorite Programs

To run many programs on one machine without them getting in each other's way, I use **Docker**. Docker lets me put each program into its own isolated "box" called a container. This makes setting them up, updating them, and keeping them separate from the main system much easier.

Here are the important programs running on this small Dell NAS:

-   **Immich (Self-hosted Photo Backup):** This program is like a private version of Google Photos. It backs up all my pictures and videos from my phone and other devices. It has special AI features that can recognize faces, objects, and sort photos automatically.
    -   **Technical Detail:** Immich's AI features are very demanding. When it's doing a lot of work, like scanning a big batch of new photos, the J1900 CPU goes up to **99-100% usage**. The RAM used by all my services, which is usually around 800MB, can jump to **2.5GB or even 3GB** during these heavy AI tasks. It's not super fast, but it *does* get the job done in the background. It keeps processing my photos, making them organized and searchable. This shows how good Immich is at using resources and how Docker helps keep big programs from breaking the whole system.

-   **Kopia (Backup System):** This is my main program for backups. Kopia takes my important files, encrypts them (scrambles them so only I can read them), and stores them efficiently by only saving unique parts of files (`deduplication`). This saves a lot of disk space. It works perfectly on the external hard drive and also sends copies to my cloud storage for safekeeping.

-   **Filebrowser-quantum (Web File Manager):** This is a simple website I can open in my browser to look at and manage files on my external hard drive. It's very light and easy to use, much simpler than setting up a full file-sharing system.

-   **Portainer (Docker Control Panel):** This is a website interface that lets me manage all my Docker containers easily. I can start, stop, update, and check on my programs without typing lots of commands. It makes managing everything much more visual and user-friendly.

-   **Tailscale (Secure Remote Access):** This program is crucial for connecting to my NAS from anywhere, even when I'm not home. Tailscale creates a secure "virtual network" that connects my devices directly, like a private highway. This means I don't have to deal with complicated router settings (like "port forwarding") to get to my files and services securely.

As I mentioned, with *all* these programs usually running, the total RAM used is around **800MB**. Only when Immich's AI starts its heavy work does the RAM temporarily go higher, sometimes up to 3GB. This shows how well these programs and Alpine Linux manage memory.

## Power Use: Saving Money on Electricity

Besides how well it runs, how much electricity a 24/7 server uses is very important, especially where electricity costs a lot (like in many parts of Europe). The Dell J1900 NAS really shines here:

-   **When Idle:** It uses only **8 to 12 watts**. This includes the CPU, main board, RAM, and the external hard drive. This is incredibly low for a computer that's always on.
-   **When Working Hard:** Even when Immich is pushing the CPU to 99-100% doing AI tasks, the total electricity use only goes up to **22 to 25 watts**.

This means that even if it runs all day, every day, this NAS costs very little to power. It's a very affordable and environmentally friendly choice compared to bigger, more power-hungry servers or store-bought NAS devices.

## What This NAS Is NOT For (and Why That's Fine)

Let's be clear about what this small computer *cannot* do:

-   It won't let many people watch 4K movies at the same time.
-   It's not for hosting dozens of busy websites or big databases.
-   It can't run many virtual machines (like a Windows computer running inside your Linux server).
-   Immich's AI analysis will be slow, taking hours or days for huge photo libraries, but it finishes the job.

But for a personal home NAS, backing up photos, sharing files securely, and running essential private services for a small family or one person, it works amazingly well. It shows that you can get great results with less powerful hardware if you choose the right minimalist operating system and efficient containerized applications.

## Conclusion: Doing More With Less

This little Dell laptop, running Alpine Linux with Docker, is more than just a file server. It proves that you don't need to spend a lot of money or use a lot of electricity to have a strong, private, and capable home server.

It feels great to see all these programs running smoothly, knowing they're using only a small part of the computer's limited power. It's about being efficient, thinking about the environment, and taking control of your own data, even with old hardware. If you have an old, "weak" computer just sitting there, think about giving it a new purpose as a lean, efficient Alpine NAS. You might be very surprised by what it can do, and your wallet (and maybe even the planet) will thank you.
