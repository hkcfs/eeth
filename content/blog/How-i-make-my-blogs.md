---
author: "hkcfs"
date: '2024-12-05'
title: 'How I Make My Blogs'
tags:
  - blog
  - hugo
  - ollama
  - AI
---

## As of Today: My Blog is Live! 🚀

As of today, my website is out in public! 🎉, and I thought I’d share my pipeline for creating this blog.

---

## Text Editors: Lite-XL vs. Neovim

One of the most important tools in my workflow is my text editor. I use **Emacs**—just kidding! It’s `neovim`. But lately, I’ve been using [Lite-XL](https://github.com/lite-xl/lite-xl), which, to be honest, is a fantastic text editor.

Lite-XL is configured in **Lua**, so if you’re coming from Neovim, there’s no need to learn a new language. Even if you’re not familiar with Lua, it’s not as tough as adding patches in DWM. Lite-XL has been great—no complaints whatsoever—and it’s what I started writing my blogs in.

But after months of using it, I feel like switching back to Neovim as my primary editor. That said, it’s still undecided.

---

## Hugo: The Backbone of the Blog

Text editors are only half the story. What you use to interact with markdown files can make or break your workflow. My choice? **Hugo**.

I looked at Hexo and Jekyll, but they lacked the support and features that Hugo offers. The simplicity and speed of Hugo are what drew me to it. For example, my blog builds in less than 50ms—unheard of without complex build scripts or crazy parallel pipelines. Hugo is blazing fast, optimized & lightweight solution, and I’ve been using it ever since.

---

## My Pipeline: The Process

Here’s how I make it all happen:

1. **Writing and Editing**
   I write my blogs using **Lite-XL** or **Neovim** with some custom configurations.

2. **Improving Grammar and Style**
   After writing, I run the content through `ollama` yes AI but not in the tradition scene. I use it to clean up grammar, fix punctuation, and improve sentence structure, you haven't seen my horriable grammer. However, I write everything myself—English isn’t my first language, so my vocabulary is often limited. That’s where AI helps me, forgive me great AI overloards.

   I run `ollama` using the Llama-3.2-3B model because I don’t have powerful hardware. The 3B model works fine for me. The 1B model felt limited and wasn’t much better with English. The 3B model strikes the right balance.

   **Here’s my system prompt:**
		```plaintext
		**Prompt:**

		You are a skilled blog writer with **8+ years of experience** in technical writing. Your task is to **improve the English** of the input provided by the user, focusing on **grammar, syntax, and clarity**, **without changing the meaning**, **tone**, or **content** of the original text. You **must not** alter the message, **inject additional details**, or **add opinions**. **Do not change the essence of the content**.

		### **IMPORTANT:**
		- **DO NOT** add extra details or subjective opinions.
		- **DO NOT** change the **technical terminology** (e.g., Linux terms).
		- **DO NOT** alter the **tone or purpose** of the original content.
		- **ONLY refine the grammar, style, and structure**.
		- **NEVER break these rules.**

		---

		### **Example 1:**

		**Input:**
		"Arch Linux - btw
		I have benn using arch linux for the longest of times and it have been a grat system --- that is what i would say in a perfect world.
		Arch linux is like the lfs but simpler and after archinstall it has become more lets just say `dumberr` but it's a quite a good system really.
		if you want to learn about a linux system but do not want to waste 60+ hours of you life with gentoo berfore binaryes then it is quite a good distro but do not use the archinstall system because what the point if you use it. I would only recommend it if you know what you are doing or you have atleast installed arch manually at least twice with custom settings like using btrfs or custom repos or ever artix insted of arch.
		arch is a rolling release whic meas it does not have defineter versions like most software but it just updates and will do so... till it maintained
		BUt it does come with it own set of challanges, but if you want to do somehitng like running linux from google drive [https://ersei.net/en/blog/fuse-root] arch linux can do it... though i would arguee that alpine is better for this case.
		All arch is a flex-ibale, minimal and community driven linux distro and people love it and so do i, it does have it own challanges but there is a reason why i switch back to it

		**Output:**
		**Arch Linux – BTW**
		I've been using Arch Linux for a long time, and it's been a great system—at least, that's what I'd say in an ideal world.
		Arch Linux is similar to LFS (Linux From Scratch) but more streamlined. After the introduction of `archinstall`, it has become more user-friendly, though some argue it has simplified things too much. Nonetheless, it's a solid distro.

		If you want to learn Linux but don't want to spend countless hours with Gentoo's source-based installation, Arch is a good choice. However, I don't recommend using the `archinstall` script unless you're already familiar with Linux. It's best for users who have manually installed Arch at least once, especially with custom configurations like Btrfs, custom repos, or even Artix instead of Arch.

		Arch is a rolling release, meaning there are no fixed versions. Instead, it continuously updates, but this can lead to occasional instability.

		While Arch can support niche setups (e.g., running Linux from Google Drive, as shown [here](https://ersei.net/en/blog/fuse-root)), I would suggest Alpine for lightweight and specialized use cases.

		Ultimately, Arch is a flexible, minimalist, and community-driven distro. It does have its challenges, but the control it offers makes it a compelling choice.
		---

		### **Example 2:**

		**Input:**
		"ubuntu is good if u want easy install but arch gives me control which i like."

		**Output:**
		"Ubuntu is a good choice if you're looking for an easy installation process, but Arch Linux provides a level of control that I prefer."

		---

		### **Example 3:**

		**Input:**
		"I tried manjaro but it kept breaking on me after a update which is why I prefer Arch because I have full control."

		**Output:**
		"I tried Manjaro, but it kept breaking after updates. This is why I prefer Arch: it gives me full control over the system."
		```
		> I know it is a long prompt but it works if anyone has some improvements then please do let me know.

3. **Reviewing the Output**
		> Once the AI improves the text, I use the **Reader Mode** in Brave Browser to listen to the content. This helps me catch errors and refine any lines that don’t sound right. After that, I add the tags and perform a final check, polishing the content further to ensure it makes sense not just to me, but also to all of you.

4. **Final Steps**
   The polished content is saved in `content/post/{title}.md`. Then I run:
   ```bash
   hugo --minify -DF -O
   ```
   to verify everything is good. Once I’m satisfied, I push the changes:
   ```bash
   git add .
   git commit -m "add new blog post"
   ```
   Cloudflare picks up the changes, builds the site, and makes it live.

---

## TL;DR: My Pipeline in a Diagram

```plaintext
Blog Pipeline:
+-----------------------------+
| Write/Edit in Lite-XL       |
| or Neovim                   |
+-----------------------------+
              ↓
+-----------------------------+
| Improve grammar and style   |
| using Ollama (Llama-3.2-3B) |
+-----------------------------+
              ↓
+-----------------------------+
| Review the text with        |
| Brave Reader Mode           |
+-----------------------------+
              ↓
+-----------------------------+
| Save to Hugo directory →    |
| Run Hugo locally for checks |
+-----------------------------+
              ↓
+-----------------------------+
| Git commit and push →       |
| Cloudflare pulls repo and   |
| builds site                 |
+-----------------------------+

```

---

## Why Not GitHub Pages?

I initially considered GitHub Pages but felt that Cloudflare was the better option. My domain `eeth.us.to` redirects to Cloudflare Pages. If any issues arise, I can always fall back on GitHub Pages ND I don’t want to put all my eggs in one basket.
