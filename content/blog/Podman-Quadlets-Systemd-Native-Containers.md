---
author: "hkcfs"
date: '2026-06-08'
title: 'Podman Quadlets Systemd Native Containers'
tags:
  - linux
  - containers
  - podman
  - systemd
  - automation
---

I’ve written about **Podman** before and why I think it’s better than Docker (daemonless is the way, folks). But recently, I’ve moved away from `podman-compose` for my permanent services. Why? Because **Quadlets** exist.

### What are Quadlets?
If you’ve ever tried to make a `systemd` unit file for a container, you know it’s a mess of `ExecStart` commands with fifty different flags. It’s ugly and hard to maintain. Quadlets are Podman’s answer to this. Instead of a shell script or a complex unit file, you write a simple `.container` file that looks like a standard `INI` config. Podman then "generates" the systemd service for you on the fly. 

### Why it’s better for "Junk" Hardware
On my **Dell J1900**, I want my services to start instantly on boot, handle dependencies (like "don't start the app until the DB is ready"), and auto-restart if they crash. `systemd` is built for exactly this. 

One of the best features of Quadlets is how it handles **Rootless Networking**. By default, Podman rootless containers use `slirp4netns`, which is a bit slow. But with Quadlets, you can easily configure `pasta` or other high-performance networking options without getting lost in the CLI flags.

### A Quick Example & Auto-Updates
Here’s a Quadlet for my `Filebrowser` instance. Notice the `AutoUpdate` label this is a game changer.

```ini
[Unit]
Description=Filebrowser Container
After=network-online.target

[Container]
Image=docker.io/filebrowser/filebrowser:latest
Volume=/mnt/data:/srv
Volume=/home/hkcfs/filebrowser.db:/database.db
PublishPort=8080:80
Label=io.containers.autoupdate=image

[Service]
Restart=always

[Install]
WantedBy=multi-user.target
```

With `Label=io.containers.autoupdate=image`, I can just run a simple `podman auto-update` timer in systemd, and my containers will stay updated without me ever touching them. It’s "set it and forget it" for my home NAS.

### The Verdict
If you’re running a small home server, stop wrestling with Docker Compose files that break after an update or require a daemon that eats 100MB of RAM just to exist. Quadlets make your containers feel like a part of the OS, not just something "bolted on." It’s cleaner, faster, and much easier to debug with `journalctl -u filebrowser`. 
