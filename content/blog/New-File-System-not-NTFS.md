---
author: "hkcfs"
date: "2024-08-17"
title: "New File System - Not NTFS"
tags:
  - filesystem
  - bcachefs
  - stratis
---

## Bcachefs
A copy-on-write (COW) file system for Linux aimed at people who want XFS speed with ZFS/BTRFS features. [Learn more](https://bcachefs.org/).

Bcachefs, a relatively new file system (though technically over 10 years old), has been gaining traction. So, naturally, I did the obvious thing: ignored it. However, after its merger into Kernel 6.7, I realized the hype might be overblown. I could be wrong, but for me, it feels like just another BTRFS for SSDs, with encryption and some ZFS features. It doesn’t bring anything new to the table.

Bcachefs isn’t as fast as it seems. It’s still in heavy development, and I don’t believe it’s very stable yet. While many people praise it, beyond the surface, it doesn’t seem revolutionary. Maybe it’s my bias toward BTRFS, but Bcachefs feels slower, especially with large numbers of small files. Where Bcache would excel with millions of small files, Bcachefs feels like it’s on the verge of crashing.

Although my experience with it hasn’t been great, I hope it improves so we have real competition for BTRFS.

## Stratis
An interesting toolset around XFS. Stratis simplifies configuring pools and filesystems with enhanced storage functionality, working within the existing Linux storage management stack. [Learn more](https://stratis-storage.github.io/).

Stratis takes a unique approach by not reinventing the wheel. Instead, it uses existing filesystems like XFS (which is very fast, though not feature-rich) and modernizes them.

However, Stratis tries to include every feature under the sun, which may be slowing it down. My testing indicates it’s the most unstable filesystem compared to XFS, BTRFS, or Bcachefs. Even though it’s a new project, it somehow manages to destabilize XFS—a filesystem known for its reliability.

Stratis feels like an overcomplicated ZFS. While it can be argued that BTRFS is also complex, it tries to acknowledge its complexity. Stratis, on the other hand, doesn’t make much sense to me. This might be due to my lack of experience with ZFS or OpenZFS, leaving me feeling lost.

Perhaps if a big player like Meta starts using Stratis, I might revisit it to see how it has evolved.
