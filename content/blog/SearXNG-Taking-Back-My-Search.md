---
author: "hkcfs"
date: '2026-02-15'
title: 'SearXNG Taking Back My Search'
tags:
  - self-hosting
  - privacy
  - searxng
  - podman
  - alpine
---

Is it just me, or has searching the internet become a complete chore? You type a query into Google or Bing, and the first four results are ads. The next three are "AI Overviews" that basically just hallucinate a summary of a Reddit thread from 2012. Below that? Pure SEO-optimized garbage sites written by bots for bots.

I got tired of it. I don't want "engagement." I just want my damn answers.

So, I did what any sane person with a **Dell J1900 junk laptop** would do: I self-hosted my own search engine. Specifically, **SearXNG**.

### What is SearXNG?
It's a "metasearch engine." It doesn't crawl the web itself; it asks Google, Bing, DuckDuckGo, and Wikipedia for you, strips out all the tracking, removes the ads, and gives you a clean list of results. It’s like a middleman that works for *you*, not the advertisers. 

The best part? You can actually prioritize "nerdy" sources. I’ve configured mine to weight results from GitHub, StackOverflow, and various Linux wikis higher than some random "Top 10" blog.

### Setting it up (The Podman Way)
Since I’m already deep into the **Podman** ecosystem (Arch ~btw), I set this up as a pod. On my 4GB RAM NAS, SearXNG uses almost nothing maybe 150MB when it's idling. 

I use a simple `Caddy` reverse proxy in front of it to handle HTTPS and `zstd` compression. Here’s a quick snippet of my `settings.yml` logic where I disable the garbage:

```yaml
# My settings.yml tweaks
search:
  safe_search: 0 # I'm an adult, thanks.
  autocomplete: "google"
engines:
  - name: google
    engine: google
    use_http: True
    weight: 0.5 # Lowering Google because it's mostly ads now
  - name: duckduckgo
    engine: duckduckgo
    weight: 2.0 # Give me the clean stuff
```

### The "Clean" Feeling
The first time I used it, it felt weird. No ads. No "people also ask" boxes taking up 50% of the screen. Just links. It reminded me of the internet back in 2008. 

The search is *fast* too. People think self-hosting search is slow, but when you strip away the 5MB of tracking scripts that Google loads, the raw HTML results fly over the wire. Plus, I don't have to deal with those "Prove you're a human" captchas every five minutes because I use a VPN. SearXNG handles the requests, so the engines just see my server's IP.

If you have a small server or even a Raspberry Pi, stop letting Google track your every thought. Set up SearXNG. It’s one of those "why didn't I do this sooner?" projects. Plus, it runs perfectly on my low-power junk without making the fans spin up. It's the ultimate productivity hack for 2026.
