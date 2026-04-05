---
author: "hkcfs"
date: '2026-04-05'
title: 'Tachyon Kernel Tuning My Intel Junk'
tags:
  - linux
  - kernel
  - optimization
  - tachyon
  - performance
  - j1900
---

For a long time, I was a big fan of the **Clear Linux** kernel. Intel’s optimizations were legendary they really knew how to make their own chips scream. But let’s be real: Clear Linux has been feeling a bit "dead" lately for the average home-labber. It’s too specialized, too opinionated, and a pain to maintain on non-Intel distros.

I needed something that worked on my Arch (~btw) and Alpine setups without the Clear Linux headache. Enter the **Tachyon** patchset.

### What is Tachyon?
Tachyon is a community-driven set of kernel patches focused on one thing: **responsiveness**. While the standard Linux kernel is built for "fairness" (making sure everyone gets a turn), Tachyon is built for the desktop and the small-scale server. It incorporates the best of the **BORE (Burst-Oriented Response Enhancer)** scheduler, which is a lifesaver for atom-based CPUs like mine.

### Why I Switched (The J1900 Struggle)
My **Dell J1900** is a 4-core processor, but it’s weak. If a background process like `du` or a heavy Docker build starts, the whole system used to stutter. With Tachyon, those stutters are almost gone. 

It manages the CPU "bursts" much more intelligently. If I’m trying to access my `Filebrowser` UI while Immich is scanning photos, Tachyon makes sure the UI stays snappy instead of hanging for 5 seconds. But a kernel isn't enough; you need to tune the `sysctl` parameters to match it. On my 4GB system, I use `zswap` with `lz4` compression instead of `zram`. This lets me overcommit my memory without the system grinding to a halt when it hits the swap file on the slow SSD.

### My Tuning Snippet
I compile my own kernel now (it takes about 4 hours on this junk, but it's worth it). Here are the key tweaks I live by:
- **Tickless Idle:** `CONFIG_NO_HZ_FULL=y`
- **Preemption:** `CONFIG_PREEMPT=y` (Full preemption for better UI latency)
- **Tachyon Specifics:** Enabling `SCHED_BORE` and setting the granularity to `1`.

I also add these to my `/etc/sysctl.conf`:
```text
vm.vfs_cache_pressure = 50
vm.swappiness = 100 # Trust zswap!
vm.dirty_ratio = 10
vm.dirty_background_ratio = 5
```

```bash
# How I verify BORE is working
dmesg | grep -i "bore"
# Output: BORE scheduler: Burst-Oriented Response Enhancer enabled
```

If you’re running on old hardware, the kernel is your biggest lever. Don't just settle for the generic `linux` or `linux-lts` packages. Try a community patchset like Tachyon or XanMod. Your "junk" hardware might actually feel fast for once.
