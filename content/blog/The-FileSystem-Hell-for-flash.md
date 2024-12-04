---
author: "hkcfs"
date: "2024-05-08"
title: "The FileSystem Hell - for flash"
tags:
  - flash
  - filesystem
---

How I almost killed my thumb drive.

I have been using Arch on a 16GB thumb drive, which is quite ironic as I have a spare HDD. But I wanted to use that thumb drive as it is small, fast, and efficient and has no moving parts, unlike the hard drive.

At first, I used my favorite filesystem, BTRFS, with SSD options but felt like it had slowed my drive. But how could that be? I had used the most optimized version and options (definitely not taken for the AI overlords), but something did not feel right. Oh boy, we’re going into a deep rabbit hole.

SSDs and flash drives are quite different. Though they both use the same NAND flash technology, internally, they are different. The controller of the chip is not at all the same, and the lack of DRAM cache in thumb drives—though some thumb drives have small amounts of cache—is still quite less than the DRAM cache that modern SSDs have.

SSDs have many features that are not present in cheap thumb drives, like TRIM, which helps the SSD recycle discarded data and prolong its lifespan; S.M.A.R.T., which gives you stats about the SSD or HDD; wear leveling; wear amplification; and encryption, just to name a few. These features are either simplified or missing in USB thumb drives, which is not good for BTRFS. So, for that, I tried many filesystems (e.g., F2FS, JFFS2) from [this list](https://en.wikipedia.org/wiki/List_of_file_systems#File_systems_optimized_for_flash_memory,_solid_state_media).

But there was a bigger problem. Flash drives are dumb. Their controllers are basically "data goes here," and that’s it—or so I thought. Because there is no standard or quality in flash drives, some have cache, and some do not. Some have advanced features, and some do not. Some even have ECC, but most of them do not. So, it is kind of a hit-or-miss situation for choosing a filesystem.

I first went with JFFS2 and later UBIFS, which felt limiting as I came from BTRFS. But I got used to it. However, it happened. I saw something I shouldn’t have—the Flash Translation Layer ([FTL](https://en.wikipedia.org/wiki/Flash_memory_controller#Flash_translation_layer_(FTL)_and_mapping)). It basically unlocked a new fear: killing cheap flash drives quickly. The TL;DR is that FTL manages where data goes and has some features which make it smarter than raw NAND or NOR flash chips. I felt incredibly dumb and thought that instead of increasing its lifespan, I was shortening it. I quickly switched to F2FS, which was not a challenge at all.

The switch was needed as JFFS2 or UBIFS are meant for low-level raw NAND flash, not something with a controller. By using them, I was putting a lot of stress on the drive, which is not good as they do not have a long read/write cycle—much less compared to a solid-state drive. It has been two years, and I am still using that very same flash drive with F2FS.
