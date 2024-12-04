---
author: "hkcfs"
date: "2024-07-30"
title: "BTRFS - the Best FileSystem"
tags:
  - linux
  - filesystem
  - btrfs
---

B.T.R.F.S., B-tree FS, Butter FS, or whatever you want to call it, I would argue, is one of the best filesystems, at least for me.

BTRFS is a filesystem just like any other, but its features compel users to try it. This is what has made me a lover of it. There is a reason why Facebook (Meta) uses it, and Oracle used to develop it.

One of the best things I love about BTRFS is snapshots and compression, which I live by. No longer are the days where updating Arch (~btw) feels like terror about to strike or a new package or massive update (e.g., KDE5 to KDE6) can kill or break your system.

I have an old Dell laptop with 4GB RAM and an Intel Pentium N-something—not powerful. It cannot even play unmodded Minecraft at 30 FPS or any powerful game. It does not have an HDD because, when I opened it for the very first time (it was my first laptop, and I had never opened a laptop or fixed a computer before), I broke the cable. The HDD was fine, but that garbage cable is so damn weak. I could just blow air on it, and it would break. So, I installed Arch Linux on a 16GB spare USB thumb drive, which—even if it breaks—it does not matter, as it’s a small USB drive:

```text
rw, noatime, compress=zstd:5, nossd, space_cache=v2, autodefrag, commit=120, subvolid=302, subvol=~~somethings~~
```

These are my options on the HDD, which I primarily used for data storage. I have been using it for the last two years, and it has served me well since then.

The thumb drive runs F2FS with compression and some other optimizations, which I took for AI. It runs quite well, and my minimal install of Arch only uses ~4GB compressed with multiple browsers and LabWC—all the comfort I want.
