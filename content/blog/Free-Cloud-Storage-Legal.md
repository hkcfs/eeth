---
author: "hkcfs"
date: "2024-09-06"
title: "Free Cloud Storage - Legal?"
tags:
  - rclone
  - backup
  - cloud storage
---

This is not an article about how to get free storage in the traditional sense but rather how to obtain semi-unlimited storage. Don’t think I’m about to talk about [Blomp](https://www.blomp.com/) or [Terabox](https://www.1024terabox.com/) or anything of that sort.

## The Problem with Free Storage
Who doesn’t want free storage? But entrusting your data to servers in unknown locations with no clear understanding of how your data is stored, all while being bombarded with ads, is a risky choice.

Here’s the truth: these providers have no incentive to keep your data safe or even intact—it’s *free*, after all. One day, you might log in only to find your data gone or, worse, your entire account deleted.

### A Safer Approach
If your data is critical, store it locally or pay for cloud storage. It’s one of the best options available. However, if you’re looking for free, reliable, and privacy-conscious storage, consider options like:
- [pCloud](https://www.pcloud.com/)
- [Mega](https://mega.nz/)

Yes, these platforms have their own controversies, but they’re still a better choice than unknown companies. Beware of providers that can change their Terms of Service whenever they wish—one day, they might decide to train AI models on your data without your consent.

If your data isn’t sensitive, you can take the risk with free providers. However, for critical files, encrypt them first using tools like:
- [Cryptomator](https://cryptomator.org/)
- [Borg](https://www.borgbackup.org/)
- [Kopia](https://kopia.io/)

These are complete backup solutions that include robust encryption. Personally, I’ve been using **Kopia** as my primary backup tool for a long time, and it has never let me down.

## Enter Rclone: The Game-Changer

[Rclone](https://rclone.org/) is a powerful tool for syncing files between cloud and local storage. One of its standout features is **union**, which allows you to merge multiple cloud accounts into one unified storage pool. This feature can effectively give you semi-unlimited storage by combining the free storage offered by multiple providers.

---

### Rclone Union Diagram

Here’s a simplified diagram explaining how Rclone’s **union** works:

```goat {class="cloud_storage_merge" caption="Cloud Storage Consolidation, merging process between two cloud platforms, demonstrating how Cloud A (50GB) and Cloud B (30GB) combine to create a unified storage solution of 80GB total capacity." desc=" Cloud A (50GB) + Cloud B (30GB) -> combine storage (80GB)"}

Cloud Storage Union:

    +-------------------+
    |    Cloud A (50GB) |
    +-------------------+
              |V
    +-------------------+
    |    Cloud B (30GB) |
    +-------------------+
              |V
    +-------------------+
    | Combined Storage  |
    |      (80GB)       |
    +-------------------+
```

Rclone treats the individual accounts (Cloud A and Cloud B) as parts of a single, larger storage unit. This seamless integration makes it possible to manage multiple accounts as if they were one.

---

### Setting Up Rclone Union

Here’s an example of how to set up **union** with two cloud providers:

1. **Install Rclone**: Follow the [installation guide](https://rclone.org/install/).
2. **Configure Individual Remotes**: Use `rclone config` to set up connections to your cloud providers (e.g., Google Drive and Dropbox).
3. **Create a Union Remote**: Add a new remote in your Rclone config file for the union. Example setup:

```config
[merged]
type = union
upstreams = gdrive: dropbox:
search_policy = ff
min_free_space = 100Mi
description = Combined cloud storage
action_policy = eplfs
create_policy = epmfs
```

---

### Explaining the Config Snippet

- **[merged]**: The name of the union remote.
- **upstreams**: The individual remotes being combined. Replace `gdrive:` and `dropbox:` with your actual remote names.
- **search_policy**: Defines how Rclone searches for files, using the *first found* policy there are other's avliable too.
- **min_free_space**: Ensures there’s at least 100 MiB free across the union before new files are uploaded.
- **action_policy** & **create_policy**: Decide where actions (like deleting or creating files) occur, prioritizing paths based on available space or existing files others are avliable too but, i can't understat it soo.

---

### Final Thoughts
Using Rclone’s **union** feature, I’ve successfully merged two cloud accounts into an 80GB virtual storage pool. This is a fantastic way to maximize free cloud storage if you’re willing to put in a bit of effort.

Remember, always encrypt sensitive files before uploading them to any cloud storage service. Tools like Rclone combined with encryption solutions can make free storage both effective and secure.
