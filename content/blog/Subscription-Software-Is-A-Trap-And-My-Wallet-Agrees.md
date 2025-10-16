---
author: "hkcfs"
date: '2025-10-11'
title: 'Subscription Software Is A Trap (And My Wallet Agrees)'
tags:
  - software
  - subscriptions
  - saas
  - ownership
  - open-source
  - cost
---

I’m sure you’ve heard this phrase from some perpetually optimistic tech evangelist by now:

> "It's not a subscription, it's a service! You're paying for continuous updates, cloud sync, and cutting-edge features!"

And for a while, I bought it. Hook, line, and sinker. I thought I was being "modern," "agile," and "future-proof" by signing up for every shiny new SaaS tool that promised to streamline my life. But I’m here to tell you that this person, while maybe not "wrong and stupid and dumb" (sorry in advance if that person was you), is definitely missing the plot. For me, that phrase is just code for "we want your money forever, and you'll never truly own anything."

But first: what *is* software, really?
If you're new to the digital age, welcome! For the rest of you, you probably already have some concept of what "software" means. But the definition has gotten a bit blurry.

> "what is software in the context of ownership"

This was the first thought that popped into my head. Is software a digital tool you acquire and keep, like a physical book on your shelf? Or is it more like a streaming service you temporarily access, like a Netflix show that could disappear tomorrow? My take: it used to be the former; now, companies desperately want it to be the latter.

Let’s be slightly more specific:

Software ownership is the right to use a program indefinitely without recurring payments, typically including a specific version and its minor updates.

Subscription software is the right to *rent* access to a program and its ongoing updates for a recurring fee, where access ceases if payments stop.

What makes software *good*?
For me, good software is reliable, doesn't surprise me with hidden fees, respects my privacy, and *lets me do my work*. Particularly as someone who values control over my digital environment, constantly worrying about my access being revoked or features being locked away makes me profoundly uneasy.

With that out of the way, let’s focus on why subscribing to *everything* became my personal digital nightmare.

## The Endless Search (and Endless Billing Cycle)

My software journey started like everyone else’s. I’d devour blog posts about optimizing workflows or spot a cool app and think "this is it, this will finally organize me!" I’d spend hours building the perfect system, creating categories, tags, projects, and custom dashboards. Setting it up *felt* like work, so I must be productive, right?

Then reality hits. The app wants $9.99/month. Then another one for $4.99/month. And another. Soon, my monthly "productivity" budget was rivalling my grocery bill. The sync breaks. The company sells out and dies (or, more commonly, gets acquired and changes pricing). Or worse – I waste more time *managing the subscriptions and trying to optimize the system* than actually doing work.

## What Actually Happened With Each App

Here's a breakdown of my slow descent into subscription madness and why I clawed my way back out:

*   **Microsoft 365:**
    *   **The promise:** All the office tools, cloud storage, constant updates!
    *   **My reality:** I found myself barely using Word or Excel, mostly needing the file formats. The moment I stopped paying, my "owned" files became hostage to a paywall, or I lost access to the latest versions. The sheer amount of telemetry and cloud integration also made me feel like I was trading convenience for privacy. (Turns out, LibreOffice handles all my document needs just fine, for free.)

*   **Adobe Creative Cloud:**
    *   **The promise:** The industry standard for design, always up-to-date!
    *   **My reality:** An incredibly powerful suite... that I used for about 10% of its features. Paying $50-$60/month to open a PSD file once a week or crop a few photos felt like burning money. The installers are bloated, the background processes are invasive, and the moment you cancel, you lose access to *everything*. (My take: Affinity Photo and Designer are fantastic one-time purchases, and GIMP covers the rest.)

*   **Notion:**
    *   **The promise:** An entire life operating system! A second brain!
    *   **My reality:** Built an entire life operating system. Spent three weeks perfecting it, creating custom databases and templates. Used it for two days. Now it’s a graveyard of abandoned databases. The free tier is generous, but the moment you hit limits or want advanced features, you're back on the treadmill.

*   **Various Utility Apps (VPNs, Password Managers, Cloud Storage, etc.):**
    *   **The promise:** Essential tools for modern life! Security! Convenience!
    *   **My reality:** Each one added another $X/month to my bill. While many are genuinely useful, the cumulative cost became absurd. Some VPNs logged more than they let on. Some cloud storage providers changed their terms. I felt like I was renting my digital safety. (My take: Self-host your password manager with Vaultwarden, use OpenVPN or WireGuard on your own server, and Kopia for backups to *owned* storage, maybe with Mega as an encrypted offsite *copy*.)

## The Breaking Point

One month, I sat down and tallied up my "software budget." It was shocking. I was spending hundreds of dollars a year on software I barely used, features I didn't need, and services that left me feeling more like a data point than a user. It was the same feeling I got when I realized my **fat, hungry Nvidia GPU** was consuming more power than a small refrigerator when gaming, but now it was my *software* doing it to my wallet.

It was time for a purge.

## My Current System: Ownership and Open Source

Now, I run everything through a drastically different philosophy: **buy once, or use free and open-source software (FOSS).** That’s it. My desktop, my home server, my entire digital workflow has shifted.

*   **Office Suite:** LibreOffice for everything. Flawlessly compatible with MS Office files.
*   **Photo/Design:** Affinity Photo/Designer (one-time purchase) and GIMP (FOSS).
*   **Code Editor:** Neovim (FOSS).
*   **Operating System:** Linux (FOSS, obviously!).
*   **Cloud Storage:** Self-hosted Nextcloud on my **4GB Dell J1900 NAS**, backed up with Kopia to an external HDD, with an encrypted copy to a free Mega account. (I control the data, remember?).
*   **Password Manager:** Self-hosted Vaultwarden (FOSS).
*   **Ad Blocking:** Network-wide `adblock-lean` on my **16MB OpenWrt router** (FOSS).

This isn't just about saving money (though that's a huge bonus). It's about regaining control.

## Why This Actually Works

This approach has transformed my digital life.

*   **Predictable Costs:** My software budget is now mostly upfront, once-off purchases. No more surprise bills, no more features being locked behind new tiers. I know exactly what I'm paying for.
*   **True Ownership:** I own the software licenses. If a company goes bust, or changes its terms, or I lose internet access for a month, my tools still work. My files are still accessible. I am not dependent on their servers staying online or their business model remaining static.
*   **Enhanced Privacy:** FOSS and self-hosted solutions generally have far less telemetry and data collection. My data stays on *my* machines.
*   **Stability and Longevity:** Purchased software (like Affinity) gets updates, but I'm not forced into constant, potentially breaking changes. FOSS is built to last.
*   **Simplicity:** My system is leaner. Fewer background processes, less "cloud sync" magic happening without my explicit permission.

## What About [Insert Feature Here]?

"But what about continuous updates and new features?"
> I get security updates for FOSS. For purchased software, I get a version that works. If a truly game-changing feature comes out, I *might* consider buying the next major version. But the constant "new feature" churn often just adds complexity I don't need.

"But what about collaboration?"
> For professional collaboration, I use the tools my *employer* provides. For personal projects, shared docs are rare, and simple file sharing or git works fine.

"But the upfront cost is high!"
> Yes, buying Affinity Photo once is more than one month of Adobe. But it's less than 3-4 months, and then it's *free forever*. Do the math. FOSS, of course, has no upfront cost.

"But I need cloud sync for everything!"
> My self-hosted Nextcloud gives me cloud sync that *I* control. If I need a simple shared document, there are FOSS alternatives or I just email it.

## The Plot Twist

I’m more productive now than when I had dozens of fancy subscription apps. Turns out the best productivity system isn't the one with the most features or the slickest UI. It's the one that respects your autonomy, your privacy, and your wallet. It's the one you actually use without feeling like you're being held hostage. And for me, that means saying "no" to the endless subscription treadmill.

Try It Yourself
Ready to ditch the subscription hamster wheel? Here’s my suggestion:

*   **Audit Your Subscriptions:** Go through your bank statements. Tally up everything you pay for monthly or annually. Be honest about what you actually *need* versus what you "might use someday."
*   **Explore FOSS Alternatives:** For every paid subscription, check out free and open-source alternatives. [AlternativeTo](https://alternativeto.net/) is a great resource.
*   **Consider One-Time Purchases:** For professional tools, research software with perpetual licenses (like Affinity Suite).
*   **Think Self-Hosting:** If you're technically inclined, look into self-hosting services you use frequently (Nextcloud, Vaultwarden, Immich).

Give it a month. You might find that for most things, simple beats sophisticated, and ownership beats renting every single time. And if it doesn't work? Well, there's always another shiny new subscription app launching next week to pull you back in. Just remember: your wallet (and your sanity) will thank you for trying.
