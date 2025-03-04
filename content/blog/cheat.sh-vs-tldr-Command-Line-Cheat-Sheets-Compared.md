---
author: "hkcfs"
date: '2025-02-09'
title: 'Cheat.sh vs Tldr Command Line Cheat Sheets Compared'
tags:
- linux
- command line
- cheat.sh
- tldr
- productivity
- comparison

---

In the world of the command line, efficiency is king. We've already discussed `tldr` as a fantastic tool for quickly accessing simplified man page examples. But `tldr` isn't the only cheat sheet game in town. Enter **`cheat.sh` (or `cht.sh`)**, another powerful contender for your command-line quick-reference needs.

Both `cheat.sh` and `tldr` aim to solve the same problem: making command-line documentation more accessible and less time-consuming than traditional man pages. But they approach this goal in different ways, with distinct features and philosophies. So, which cheat sheet champion deserves a place in your terminal toolkit? Let's dive into a head-to-head comparison.

## tldr: Concise Community Examples (The Pocket Guide)

`tldr` is all about **simplicity and community**. It's a collection of concise, community-maintained cheat sheets focused on the most common use cases for command-line tools.

**Key features of `tldr`:**

- **Concise and Focused:** `tldr` pages are intentionally short and to the point. They prioritize clarity and brevity, giving you just the essential examples you need.
- **Community-Driven:** The content is created and maintained by a community of contributors, ensuring a wide range of commands are covered and kept up-to-date.
- **Client-Side Application:** `tldr` is typically used via a client application installed on your system. This client fetches the cheat sheets and displays them in your terminal.
- **Focus on Common Use Cases:** `tldr` pages primarily showcase the most frequent and practical applications of commands.
- **Multiple Clients:** Available in various languages (Python, Node.js, Go, etc.), offering flexibility in client choice.

**Pros of `tldr`:**

- **Extremely Easy to Use:** Installation and usage are very simple.
- **Highly Readable Output:** Cleanly formatted and easy to scan in the terminal.
- **Great for Beginners:** Less overwhelming than man pages or more complex cheat sheets.
- **Fast for Quick Lookups:** Ideal when you just need a fast reminder.

**Cons of `tldr`:**

- **Limited Scope:** By design, `tldr` pages are not exhaustive. They don't cover every option or edge case.
- **Less Detail:** Conciseness means less in-depth explanation. For complex commands or nuanced usage, you might still need to consult man pages.
- **Internet Dependency (Initial Fetch):** While `tldr` clients often cache pages, the initial fetch and updates require an internet connection.

### How to Use `tldr`

1.  **Installation:**  Install the `tldr` client for your operating system. Common methods include:

    - **Using `npm` (Node.js):**
      ```bash
      npm install -g tldr
      ```
    - **Using `pip` (Python):**
      ```bash
      pip install tldr
      ```
    - **Using your distribution's package manager (e.g., `pacman`, `apt`, `dnf`):**
      ```bash
      sudo pacman -S tldr  # Arch Linux
      sudo apt install tldr  # Debian/Ubuntu
      sudo dnf install tldr  # Fedora/CentOS
      ```

2.  **Basic Usage:** To get a `tldr` cheat sheet for a command, simply type `tldr` followed by the command name:

    ```bash
    tldr command
    ```
    For example, to see the `tldr` page for `tar`:
    ```bash
    tldr tar
    ```

3.  **Navigating Pages:**  Use your terminal's scroll keys (usually `Shift + Page Up/Down` or scroll wheel) to navigate longer `tldr` pages.

4.  **Updating Pages:**  To update the cached `tldr` pages (if your client supports it):

    ```bash
    tldr --update
    ```
    or check your client's specific update command.

## cheat.sh (cht.sh): The Feature-Rich, Web-Powered Encyclopedia (The Deep Dive)

`cheat.sh` takes a different approach. It's more like a **web-powered, feature-rich command-line encyclopedia**. Instead of a client-side application with pre-packaged cheat sheets, `cheat.sh` is primarily accessed via `curl` or `nc` directly from your terminal, fetching information from its online service in real-time.

**Key features of `cheat.sh`:**

- **Web-Based Service:** `cheat.sh` lives online and is accessed via simple command-line tools like `curl` or `netcat`.
- **Extensive Coverage:** `cheat.sh` boasts an incredibly broad range of topics, going far beyond just basic command-line tools. It covers programming languages, configuration files, DevOps tools, databases, and much more.
- **Detailed Examples:** Often provides more in-depth examples and explanations compared to `tldr`.
- **Language-Specific Cheatsheets:** Excellent support for programming languages, providing code snippets and syntax examples.
- **Editor Integration:** Can be integrated into various text editors and IDEs for in-context help.
- **Special Queries:** Supports special queries like `apropos`, `man`, `info`, and even stackoverflow searches directly from the command line.
- **Customization and Personalization:** Allows for some level of customization and even creating personal cheat sheets.

**Pros of `cheat.sh`:**

- **Vast Knowledge Base:** Covers a much wider range of topics than `tldr`.
- **More Detailed Information:** Examples are often more comprehensive and explanatory.
- **Language Support is a Major Strength:** Invaluable for programmers.
- **Web-Based Accessibility:** Works on any system with `curl` or `nc`, no client installation needed.
- **Powerful Search Capabilities:** Easy to search for specific commands or topics.

**Cons of `cheat.sh`:**

- **Output Can Be Noisy:** The output, while informative, can sometimes be less cleanly formatted than `tldr`, especially in the terminal.
- **Real-time Web Dependency:** Requires a constant internet connection to function. No offline caching by default (though some caching mechanisms exist).
- **Slightly Steeper Learning Curve (Initially):** While basic usage is simple, exploring all its features takes a bit more effort.
- **Less "Pocket Guide," More "Online Encyclopedia":** Can feel less focused than `tldr` for simple command lookups.

### How to Use `cheat.sh` (cht.sh)

Using `cheat.sh` is incredibly simple directly from your terminal, without needing to install a dedicated client:

1.  **Basic Usage with `curl`:**  To get cheat sheets, use `curl` followed by `cht.sh/command`.  Replace `command` with the tool you need help with.

    - For example, to get the `tar` cheat sheet:
      ```bash
      curl cht.sh/tar
      ```

2.  **Basic Usage with `netcat` (nc):** If `curl` is not available, you can use `netcat` ( `nc` ):

    ```bash
    nc cht.sh 80 <<<$'GET /tar HTTP/1.0\nHost: cht.sh'
    ```

3.  **Specifying Options or Subcommands:**  Append options or subcommands to the URL-like path to refine your search:

    ```bash
    curl cht.sh/tar/create  # tar specific to creating archives
    curl cht.sh/python/list comprehensions # Python list comprehensions
    curl cht.sh/go/range # Go range keyword
    ```

4.  **Language-Specific Help:**  Prefix your query with a programming language name to get language-specific cheat sheets:

    ```bash
    curl cht.sh/python tar  # Python examples related to tar
    curl cht.sh/js array # JavaScript array methods
    ```

5.  **Special Queries:**  `cheat.sh` supports special queries:

    - **`man:` for man pages:**
      ```bash
      curl cht.sh/man:ls  # Get the man page for `ls`
      ```
    - **`info:` for info pages:**
      ```bash
      curl cht.sh/info:grep # Get the info page for `grep`
      ```
    - **`apropos:` for searching commands by keyword:**
      ```bash
      curl cht.sh/apropos:disk space # Search commands related to disk space
      ```
    - **`stackoverflow:` for Stack Overflow searches:**
      ```bash
      curl cht.sh/stackoverflow:bash loop through files # Search Stack Overflow for "bash loop through files"
      ```

6.  **Listing Available Cheat Sheets:** To list all available cheat sheets (the list is very long!):

    ```bash
    curl cht.sh/:list
    ```

7.  **Getting Help for `cheat.sh` itself:**

    ```bash
    curl cht.sh/:help
    ```

## tldr vs cheat.sh: Side-by-Side Comparison

| Feature		  |`tldr` 								     | `cheat.sh` (cht.sh)			              |
|------------------|--------------------------------------------|----------------------------------------------|
| Data Source	  | Community-maintained, curated pages		| Web-based service, dynamically generated 	|
| Content Style	| Concise examples, focused use cases		| More detailed examples, broader scope		|
| Accessibility	| Client application (terminal)			  | Web-based (curl/nc), editor integration	  |
| Scope			| Primarily command-line tools 			  | Command-line tools, programming, DevOps, etc.|
| Offline Access   | Client often caches pages (partial offline)| Requires internet connection (mostly online) |
| Customization	| Limited client-side themes 				| More extensive, personal cheat sheets		|
| Learning Curve   | Very low 								  | Slightly higher (for advanced features)	  |
| Target Audience  | Beginners, users needing quick reminders   | Developers, system admins, power users 	  |

## When to Use Which: Choosing Your Cheat Sheet Weapon

So, which tool should you choose? It really depends on your needs and preferences:

* **Choose `tldr` if:**
    - You want a **super simple, fast, and clean** cheat sheet for common command-line tools.
    - You are a **beginner** or just need quick reminders for basic commands.
    - You prefer a **client-side application** and like the idea of community-curated content.
    - You value **offline access** to cheat sheets (after initial download).

* **Choose `cheat.sh` (cht.sh) if:**
    - You need a **vast and comprehensive** cheat sheet resource covering a wide range of topics beyond just basic commands.
    - You are a **developer** and need cheat sheets for programming languages, frameworks, and tools.
    - You prefer a **web-based, always up-to-date** resource accessible from any terminal with `curl` or `nc`.
    - You want **more detailed examples** and explanations.
    - You want **advanced features** like language-specific help, editor integration, and special queries.

**Personal Recommendation:**

For many users, **`tldr` is a great starting point** for its simplicity and ease of use. It's perfect for quickly looking up common command examples. As you become more advanced or need a wider range of information, **`cheat.sh` becomes incredibly powerful**, especially for developers and system administrators.

**Many power users actually use *both* `tldr` and `cheat.sh`**, leveraging `tldr` for quick, common lookups and `cheat.sh` for more in-depth information and broader topic coverage.

Ultimately, the best cheat sheet is the one that fits *your* workflow and helps you be more efficient at the command line. Experiment with both `tldr` and `cheat.sh`, and see which one (or both!) becomes your preferred command-line companion.
