---
author: "hkcfs"
date: '2025-01-15'
title: 'Artix Refind Clear Booster - most optmized setup'
tags:
  - linux
  - artix
  - bootloader
  - clear
  - kernel
  - booster
  - initramfs
  - refind
  - optmization

---

## Arch Linux – BTW

AAA, one of the most loved (cough, cough) OS, is not minimal anymore—or so I would say if I cared about systemd and all its nonsense. But I don't see any issue with it. Yes, you're right that systemd is more than just an init system, and with more unused code, more bugs may arise. Still, it's the most popular init system and has been for the last 5 years or so.

But today, we're not going to talk about systemd or Arch. Today is optimization day, where we optimize our Linux setup. One of the Linux distros we love to use is Arch, but what if Arch was made by the suckless team? We'd get something like [KISS Linux](https://kisslinux.org/). However, for a somewhat cohesive experience, we should look at Artix Linux. You can use any init system you wish; I went with [dinit](https://github.com/davmac314/dinit) as it is still the fastest, of course, after [sinit](https://core.suckless.org/sinit/) and many others like [tini](https://github.com/krallin/tini), [busybox init](https://busybox.net/about.html), [toybox init](https://github.com/landley/toybox), and so on.

After a clean install with your favorite filesystem, XFS, or Btrfs for some crazy people, or even F2FS, we will continue with its optimization.

### **FIRST: Basic Optimization**

In this section, I would like to focus on another more detailed resource: [ARU](https://github.com/ventureoo/ARU), the official Arch Linux guide on [Improving Performance](https://wiki.archlinux.org/title/Improving_performance), and the official Arch Linux boot process improvements on [Improving Performance/Boot Process](https://wiki.archlinux.org/title/Improving_performance/Boot_process). These are just a few examples.

For my own Intel Pentium N-series processor on a Dell system, I used the following `udev` rules:

```
/etc/udev/rules.d/60-ioschedulers.rules
# HDD
ACTION=="add|change", KERNEL=="sd[a-z]*", ATTR{queue/rotational}=="1", ATTR{queue/scheduler}="bfq"

# SSD
ACTION=="add|change", KERNEL=="sd[a-z]*|mmcblk[0-9]*", ATTR{queue/rotational}=="0", ATTR{queue/scheduler}="bfq"

# NVMe SSD
ACTION=="add|change", KERNEL=="nvme[0-9]*", ATTR{queue/rotational}=="0", ATTR{queue/scheduler}="none"
```

**Setup irqbalance**

Next, we'll set up [irqbalance](https://man.archlinux.org/man/irqbalance.1.en). `irqbalance` is a daemon that distributes hardware interrupts across CPU cores to improve performance, especially on multi-core systems.

Let's install irqbalance either from the main repo or from the AUR

```bash
pacman -S irqbalance
```

Now, just enable irqbalance, and here you go:

```bash
sudo systemctl enable irqbalance
```

#### **A zram Setup**

Now for a `zram` setup.
[zram](https://wiki.archlinux.org/title/Zram) creates a compressed block device in RAM, which can be used for swap. This is faster than using a traditional swap partition or file, especially on systems with limited storage, though it uses RAM.

We will use `zram-generator` to setup `zram` thought you can use other methords like `udev` or [`zramd`](https://aur.archlinux.org/packages/zramd/)

Let's install zram-generator first
```bash
pacman -S zram-generator
```

**Using zram-generator**

`zram-generator` provides `systemd-zram-setup@zramN.service` units to automatically initialize zram devices without users needing to enable or start the template or its instances.

To use it, install `zram-generator` and create `/etc/systemd/zram-generator.conf` with the following content:

```
[zram0]
zram-size = min(ram / 2, 4096)
compression-algorithm = zstd
```

`zram-size` is the size (in MiB) of the zram device. You can use `ram` to represent the total memory.

`compression-algorithm` specifies the algorithm used to compress data in the zram device. Running `cat /sys/block/zram0/comp_algorithm` gives the available compression algorithms (as well as the current one included in brackets).

Then, run `daemon-reload` and start your configured `systemd-zram-setup@zramN.service` instance (with `N` matching the numerical instance-ID; in the example, it is `systemd-zram-setup@zram0.service`).

You can check the swap status of your configured `/dev/zramN` device(s) by reading the unit status of your `systemd-zram-setup@zramN.service` instance(s), using `zramctl`, or using `swapon`.


These are some general settings.

Let's get into Arch. First, stop `NetworkManager-wait-online.service` if you don't want to wait until your system get's network, or you cam set up [`iwd`](https://wiki.archlinux.org/title/Iwd) instead of `NetworkManager` if possible.

Basics only, no extra tools considered as bloat.

#### **Configuring pacman.conf**

```
#
# /etc/pacman.conf
#
# See the pacman.conf(5) manpage for option and repository directives

#
# GENERAL OPTIONS
#
[options]
# The following paths are commented out with their default values listed.
# If you wish to use different paths, uncomment and update the paths.
#RootDir     = /
#DBPath      = /var/lib/pacman/
#CacheDir    = /var/cache/pacman/pkg/
#LogFile     = /var/log/pacman.log
#GPGDir      = /etc/pacman.d/gnupg/
#HookDir     = /etc/pacman.d/hooks/
HoldPkg     = pacman glibc
#XferCommand = /usr/bin/curl -L -C - -f -o %o %u
#XferCommand = /usr/bin/wget --passive-ftp -c -O %o %u
#CleanMethod = KeepInstalled
Architecture = auto

# Pacman won't upgrade packages listed in IgnorePkg and members of IgnoreGroup
#IgnorePkg   =
#IgnoreGroup =

#NoUpgrade   =
#NoExtract   =

# Misc options
#UseSyslog
Color
ILoveCandy
#NoProgressBar
CheckSpace
VerbosePkgLists
ParallelDownloads = 8

# By default, pacman accepts packages signed by keys that its local keyring
# trusts (see pacman-key and its man page), as well as unsigned packages.
SigLevel    = Required DatabaseOptional
LocalFileSigLevel = Optional
#RemoteFileSigLevel = Required

# NOTE: You must run `pacman-key --init` before first using pacman; the local
# keyring can then be populated with the keys of all official Artix Linux
# packagers with `pacman-key --populate artix`.

#
# REPOSITORIES
#   - can be defined here or included from another file
#   - pacman will search repositories in the order defined here
#   - local/custom mirrors can be added here or in separate files
#   - repositories listed first will take precedence when packages
#     have identical names, regardless of version number
#   - URLs will have $repo replaced by the name of the current repo
#   - URLs will have $arch replaced by the name of the architecture
#
# Repository entries are of the format:
#       [repo-name]
#       Server = ServerName
#       Include = IncludePath
#
# The header [repo-name] is crucial - it must be present and
# uncommented to enable the repo.
#

# The gremlins repositories are disabled by default. To enable, uncomment the
# repo name header and Include lines. You can add preferred servers immediately
# after the header, and they will be used before the default mirrors.

#[system-gremlins]
#Include = /etc/pacman.d/mirrorlist

[system]
Include = /etc/pacman.d/mirrorlist

#[world-gremlins]
#Include = /etc/pacman.d/mirrorlist

[world]
Include = /etc/pacman.d/mirrorlist

#[galaxy-gremlins]
#Include = /etc/pacman.d/mirrorlist

[galaxy]
Include = /etc/pacman.d/mirrorlist

[omniverse]
Server = https://artix.sakamoto.pl/omniverse/$arch
Server = https://eu-mirror.artixlinux.org/omniverse/$arch
Server = https://omniverse.artixlinux.org/$arch

# If you want to run 32-bit applications on your x86_64 system,
# enable the lib32 repositories as required here.

#[lib32-gremlins]
#Include = /etc/pacman.d/mirrorlist

[lib32]
Include = /etc/pacman.d/mirrorlist

# custom cf kernel repo
[repo-ck]
#Server = https://mirror.lesviallon.fr/$repo/os/$arch
Server = http://repo-ck.com/$arch

# Arch
[extra]
Include = /etc/pacman.d/mirrorlist-arch

[multilib]
Include = /etc/pacman.d/mirrorlist-arch

# enabling chaotic-aur
[chaotic-aur]
Include = /etc/pacman.d/chaotic-mirrorlist

# An example of a custom package repository. See the pacman manpage for
# tips on creating your own repositories.
#[custom]
#SigLevel = Optional TrustAll
#Server = file:///home/custompkgs
```

Okay, what was added? Custom repo like the official Arch repo. Some people believe it may cause issues, but after 2 years of using this system, I haven't encountered any problems.

Here is what was added:

```
Color
ILoveCandy
CheckSpace
VerbosePkgLists
ParallelDownloads = 8 # very important; configure according to your network speed
```

Now, the `makepkg.conf`:

```
#!/hint/bash
#
# /etc/makepkg.conf
#

#########################################################################
# SOURCE ACQUISITION
#########################################################################
#
#-- The download utilities that makepkg should use to acquire sources
#  Format: 'protocol::agent'
DLAGENTS=('file::/usr/bin/curl -qgC - -o %o %u'
          'ftp::/usr/bin/curl -qgfC - --ftp-pasv --retry 3 --retry-delay 3 -o %o %u'
          'http::/usr/bin/curl -qgb "" -fLC - --retry 3 --retry-delay 3 -o %o %u'
          'https::/usr/bin/curl -qgb "" -fLC - --retry 3 --retry-delay 3 -o %o %u'
          'rsync::/usr/bin/rsync --no-motd -z %u %o'
          'scp::/usr/bin/scp -C %u %o')

# Other common tools:
# /usr/bin/snarf
# /usr/bin/lftpget -c
# /usr/bin/wget

#-- The package required by makepkg to download VCS sources
#  Format: 'protocol::package'
VCSCLIENTS=('bzr::breezy'
            'fossil::fossil'
            'git::git'
            'hg::mercurial'
            'svn::subversion')

#########################################################################
# ARCHITECTURE, COMPILE FLAGS
#########################################################################
#
CARCH="x86_64"
CHOST="x86_64-pc-linux-gnu"

#-- Compiler and Linker Flags
#CPPFLAGS=""
CFLAGS="-march=native -mtune=native -O2 -pipe -fstack-protector-strong --param=ssp-buffer-size=4 -fno-plt \
        -Wp,-D_FORTIFY_SOURCE=2 -Wformat -Werror=format-security \
        -fstack-clash-protection -fcf-protection"
CXXFLAGS="${CFLAGS}"
LDFLAGS="-Wl,-O1,--sort-common,--as-needed,-z,relro,-z,now"
LTOFLAGS="-flto=auto"
RUSTFLAGS="-C opt-level=2 -C target-cpu=native"
#-- Make Flags: change this for DistCC/SMP systems
MAKEFLAGS="-j$(getconf _NPROCESSORS_ONLN) --quiet"
#-- Debugging flags
DEBUG_CFLAGS="-g"
DEBUG_CXXFLAGS="$DEBUG_CFLAGS"
#DEBUG_RUSTFLAGS="-C debuginfo=2"

#########################################################################
# BUILD ENVIRONMENT
#########################################################################
#
# Makepkg defaults: BUILDENV=(!distcc !color !ccache check !sign)
#  A negated environment option will do the opposite of the comments below.
#
#-- distcc:   Use the Distributed C/C++/ObjC compiler
#-- color:    Colorize output messages
#-- ccache:   Use ccache to cache compilation
#-- check:    Run the check() function if present in the PKGBUILD
#-- sign:     Generate PGP signature file
#
BUILDENV=(!distcc color !ccache check !sign)
#
#-- If using DistCC, your MAKEFLAGS will also need modification. In addition,
#-- specify a space-delimited list of hosts running in the DistCC cluster.
#DISTCC_HOSTS=""
#
#-- Specify a directory for package building.
BUILDDIR=/tmp/makepkg

#########################################################################
# GLOBAL PACKAGE OPTIONS
#   These are default values for the options=() settings
#########################################################################
#
# Makepkg defaults: OPTIONS=(!strip docs libtool staticlibs emptydirs !zipman !purge !debug !lto)
#  A negated option will do the opposite of the comments below.
#
#-- strip:      Strip symbols from binaries/libraries
#-- docs:       Save doc directories specified by DOC_DIRS
#-- libtool:    Leave libtool (.la) files in packages
#-- staticlibs: Leave static library (.a) files in packages
#-- emptydirs:  Leave empty directories in packages
#-- zipman:     Compress manual (man and info) pages in MAN_DIRS with gzip
#-- purge:      Remove files specified by PURGE_TARGETS
#-- debug:      Add debugging flags as specified in DEBUG_* variables
#-- lto:        Add compile flags for building with link time optimization
#
OPTIONS=(strip docs !libtool !staticlibs emptydirs zipman purge !debug !lto)

#-- File integrity checks to use. Valid: md5, sha1, sha224, sha256, sha384, sha512, b2
INTEGRITY_CHECK=(sha256)
#-- Options to be used when stripping binaries. See `man strip' for details.
STRIP_BINARIES="--strip-all"
#-- Options to be used when stripping shared libraries. See `man strip' for details.
STRIP_SHARED="--strip-unneeded"
#-- Options to be used when stripping static libraries. See `man strip' for details.
STRIP_STATIC="--strip-debug"
#-- Manual (man and info) directories to compress (if zipman is specified)
MAN_DIRS=({usr{,/local}{,/share},opt/*}/{man,info})
#-- Doc directories to remove (if !docs is specified)
DOC_DIRS=(usr/{,local/}{,share/}{doc,gtk-doc} opt/*/{doc,gtk-doc})
#-- Files to be removed from all packages (if purge is specified)
PURGE_TARGETS=(usr/{,share}/info/dir .packlist *.pod)
#-- Directory to store source code in for debug packages
DBGSRCDIR="/usr/src/debug"

#########################################################################
# PACKAGE OUTPUT
#########################################################################
#
# Default: put built package and cached source in build directory
#
#-- Destination: specify a fixed directory where all packages will be placed
#PKGDEST=/home/packages
#-- Source cache: specify a fixed directory where source files will be cached
#SRCDEST=/home/sources
#-- Source packages: specify a fixed directory where all src packages will be placed
#SRCPKGDEST=/home/srcpackages
#-- Log files: specify a fixed directory where all log files will be placed
#LOGDEST=/home/makepkglogs
#-- Packager: name/email of the person or organization building packages
#PACKAGER="John Doe <john@doe.com>"
#-- Specify a key to use for package signing
#GPGKEY=""

#########################################################################
# COMPRESSION DEFAULTS
#########################################################################
#
COMPRESSGZ=(pigz -c -f -n)
COMPRESSBZ2=(pbzip2 -c -f)
COMPRESSXZ=(xz -T "$(getconf _NPROCESSORS_ONLN)" -c -z --best -)
COMPRESSZST=(zstd -c -z -q --ultra -T0 -22 -)
COMPRESSLRZ=(lrzip -9 -q)
COMPRESSLZO=(lzop -q --best)
COMPRESSZ=(compress -c -f)
COMPRESSLZ4=(lz4 -q --best)
COMPRESSLZ=(lzip -c -f)

#########################################################################
# EXTENSION DEFAULTS
#########################################################################
#
PKGEXT='.pkg.tar.zst'
SRCEXT='.src.tar.gz'

#########################################################################
# OTHER
#########################################################################
#
#-- Command used to run pacman as root, instead of trying sudo and su
#PACMAN_AUTH=()
```

**Explanation of `CFLAGS` Options:**

- `-march=native`: Optimizes the code for the specific CPU architecture of the host machine.
- `-mtune=native`: Tunes the code for the specific CPU model of the host machine.
- `-O2`: Enables a moderate level of optimization.
- `-pipe`: Uses pipes rather than temporary files for communication between different compilation stages.
- `-fstack-protector-strong`: Adds stack protection to check for buffer overflows.
- `--param=ssp-buffer-size=4`: Sets the buffer size for stack protection.
- `-fno-plt`: Avoids using the Procedure Linkage Table for function calls.
- `-Wp,-D_FORTIFY_SOURCE=2`: Enables additional security checks.
- `-Wformat`: Enables warnings for printf-like functions.
- `-Werror=format-security`: Treats format security warnings as errors.
- `-fstack-clash-protection`: Adds protection against stack clash attacks.
- `-fcf-protection`: Adds control flow protection.

Yes, compression has been increased, and that is that, but it may significantly improve disk storage requirements.

Now, let's talk about the filesystem. Here, I am using Btrfs, but before that, XFS was the way to go. I still remember snapshots and other things, so Btrfs is the only option for me, until bcachefs is good. Here are my custom options; no new features were added, but IDR (I DON'T REMEMBER).

Here is my `fstab`:

```
# Static information about the filesystems.
# See fstab(5) for details.

# <file system> <dir> <type> <options> <dump> <pass>
# /dev/sda2 UUID=c386b909-59af-42d1-93a0-1d25fd117c87
LABEL=ROOT          	/         	btrfs     	rw,noatime,compress=zstd:5,nossd,space_cache=v2,autodefrag,commit=120,subvol=/artix/@	0 0

# /dev/sda2 UUID=c386b909-59af-42d1-93a0-1d25fd117c87
LABEL=ROOT          	/var      	btrfs     	rw,noatime,compress=zstd:5,nossd,space_cache=v2,autodefrag,commit=120,subvol=/artix/@var	0 0

# /dev/sda2 UUID=c386b909-59af-42d1-93a0-1d25fd117c87
LABEL=ROOT          	/home     	btrfs     	rw,noatime,compress=zstd:5,nossd,space_cache=v2,autodefrag,commit=120,subvol=/artix/@home	0 0

# /dev/sda2 UUID=c386b909-59af-42d1-93a0-1d25fd117c87
LABEL=ROOT          	/.snapshots	btrfs     	rw,noatime,compress=zstd:5,nossd,space_cache=v2,autodefrag,commit=120,subvol=/artix/@snapshots	0 0

# /dev/sda1 UUID=4089-8087
LABEL=EFIBOOT       	/boot     	vfat      	rw,relatime,fmask=0022,dmask=0022,codepage=437,iocharset=ascii,shortname=mixed,utf8,errors=remount-ro	0 0
```

**Explanation of Btrfs Options in `fstab`:**

- `noatime`: Disables the updating of access times on files and directories, which can improve performance.
- `compress=zstd:5`: Enables compression using the Zstandard algorithm at level 5.
- `nossd`: Disables SSD-specific optimizations.
- `space_cache=v2`: Enables the space cache version 2, which improves performance for free space tracking.
- `autodefrag`: Automatically defragments files as they are modified.
- `commit=120`: Sets the commit interval to 120 seconds, reducing the frequency of metadata writes.

Yes, I have cleanly divided into subvolumes, and there is another subvolume named `backup` which is not mounted by default. It is used to make a complete snapshot of the `artix` subvolume. This kind of `fstab` with the label is inspired by [Chris Titus (archtitus)](https://github.com/ChrisTitusTech/ArchTitus/).

And how can I forget about [Booster](https://wiki.archlinux.org/title/Booster), an init system? If you are not sure what I am talking about, check out this Arch Linux documentation for [initramfs](https://wiki.archlinux.org/title/Arch_boot_process#initramfs), which not only explains it very well but also provides you with other options to test. It's pretty good, but not as good as the Gentoo wiki, which is on another level.

Here is my `booster.yaml` config:

```
#universal: false
modules: btrfs,i915
compression: zstd
# zstd -9 -T0
#mount_timeout: 30s
#strip: true
#extra_files: fsck,fsck.btrfs #,vim,/usr/share/vim/vim82/
#vconsole: true
```

It is not very complex, but it works. Here, I am not using [booster-um](https://github.com/Zile995/booster-um) to make a custom UKI image for reasons, but the entire Booster initramfs works fine and has never caused issues like [mkinitcpio](https://wiki.archlinux.org/title/Mkinitcpio) or [dracut](https://wiki.archlinux.org/title/Dracut) in Arch Linux with the [Clear Linux kernel](https://github.com/clearlinux-pkgs/linux). I am using chaotic-aur to pull the kernel. Yes, I am not a neckbeard man waiting to compile the Linux kernel on an underpowered netbook-type laptop from the 2010s. But hey, it works. I have two kernels just as a safety measure, and I think everyone should too: my main Clear Linux kernel and the linux-lts. Before you mention it, I am on an Intel setup and have used custom kernels like [Liquorix](https://liquorix.net/) and [tkg](https://github.com/Frogging-Family/linux-tkg), but they were never that very stable and did not improve performance that much. The same cannot be said about the Clear Linux kernel, which did improve my system performance by 10-12%. Not massive, but still noticeable.

But the kernel is not the end-all-be-all; the options passed to the kernel are just as important. Here are my custom options:

```
root=LABEL=ROOT rootflags=subvol=/artix/@,noatime,compress=zstd:5,nossd,space_cache=v2,autodefrag,commit=120 rw loglevel=0 console=tty2 udev.log_level=0 vt.global_cursor_default=0 mitigations=off nowatchdog msr.allow_writes=on pcie_aspm=force module.sig_unenforce intel_idle.max_cstate=1 cryptomgr.notests initcall_debug intel_iommu=igfx_off no_timer_check noreplace-smp page_alloc.shuffle=1 rcupdate.rcu_expedited=1 tsc=reliable tpm_tis.interrupts=0
```

**Explanation of Kernel Options:**

- `root=LABEL=ROOT`: Specifies the root filesystem by label.
- `rootflags=subvol=/artix/@,noatime,compress=zstd:5,nossd,space_cache=v2,autodefrag,commit=120`: Sets various Btrfs options for the root filesystem.
- `rw`: Mounts the root filesystem as read-write.
- `loglevel=0`: Disables kernel log messages.
- `console=tty2`: Sets the console to tty2.
- `udev.log_level=0`: Disables udev log messages.
- `vt.global_cursor_default=0`: Disables the global cursor default.
- `mitigations=off`: Disables CPU mitigations (more on this below).
- `nowatchdog`: Disables the watchdog timer.
- `msr.allow_writes=on`: Allows writes to MSR registers.
- `pcie_aspm=force`: Forces PCIe ASPM (Active State Power Management).
- `module.sig_unenforce`: Disables module signature enforcement.
- `intel_idle.max_cstate=1`: Limits the maximum C-state for Intel CPUs.
- `cryptomgr.notests`: Disables cryptographic manager tests.
- `initcall_debug`: Enables initcall debugging.
- `intel_iommu=igfx_off`: Disables Intel IOMMU for integrated graphics.
- `no_timer_check`: Disables timer checks.
- `noreplace-smp`: Disables SMP replacement.
- `page_alloc.shuffle=1`: Enables page allocation shuffling.
- `rcupdate.rcu_expedited=1`: Enables expedited RCU updates.
- `tsc=reliable`: Marks the TSC (Time Stamp Counter) as reliable.
- `tpm_tis.interrupts=0`: Disables TPM TIS interrupts.

There is a controversial option, `mitigations=off`, which is very dangerous. For my old system, it hampers performance a lot, so I keep it disabled.

### **More Info on Mitigations:**

Mitigations are security features introduced to protect against various CPU vulnerabilities, such as Spectre and Meltdown. Disabling mitigations can improve performance but also exposes the system to these vulnerabilities. There are two main types of mitigations:

1. **Spectre Mitigations**: These protect against speculative execution side-channel attacks.
2. **Meltdown Mitigations**: These protect against out-of-order execution side-channel attacks.

Disabling mitigations is generally not recommended unless you are aware of the risks and have a specific reason to do so.

How can we forget about [rEFInd](https://wiki.archlinux.org/title/REFInd), a bootloader? If you want to know more about bootloaders, refer to the Gentoo article for great detail, but the Arch wiki is also great.

Though a bootloader is not important and does slow down the system, as I am not using the UKI image of the kernel, we will use a bootloader. I have installed the bootloader to `/ESP/BOOT/`, which is the default place where any UEFI system looks for it.

Some more miscellaneous configurations:

### **Changing the Journal's Size**

Systemd's system journal's size can go out of control. There are some things you can do to keep it in control. If you wish to, you can also completely disable this, but I like to keep some just for emergency purposes:

```bash
journalctl --vacuum-size=10M
journalctl --vacuum-time=2weeks
```

Never forget to install your CPU's microcode.

For Intel:

```bash
pacman -S intel-ucode
```

For AMD:

```bash
pacman -S amd-ucode
```

For other systems, I am not aware of, but you can look around. I do not believe there are any, but do quote me on that.

It is not all about your system. If you have slow internet or badly configured mirrors, it may cause issues on your system. Change the default mirror of Artix Linux to your specific country in the `/etc/pacman.d/mirrorlist`, and if you are on Arch or have the Arch mirror, run this:

```bash
iso=$(curl -4 ifconfig.co/country-iso) && reflector -a 48 -c $iso -f 5 -l 20 --sort rate --save /etc/pacman.d/mirrorlist
```

**Explanation of the Command:**

- `iso=$(curl -4 ifconfig.co/country-iso)`: Fetches the country ISO code using `curl`.
- `reflector -a 48 -c $iso -f 5 -l 20 --sort rate --save /etc/pacman.d/mirrorlist`: Uses `reflector` to update the mirrorlist with the fastest mirrors from the specified country.
  - `-a 48`: Sets the age of the mirrors to 48 hours.
  - `-c $iso`: Specifies the country ISO code.
  - `-f 5`: Sets the number of fallback mirrors.
  - `-l 20`: Limits the number of mirrors to 20.
  - `--sort rate`: Sorts the mirrors by rate.
  - `--save /etc/pacman.d/mirrorlist`: Saves the updated mirrorlist to the specified file.

### **Setup Swap in Arch Linux on `/opt/swap`**

To set up a swap file on `/opt/swap`, follow these steps:

1. Create the swap file:

```bash
sudo fallocate -l 2G /opt/swap
```

2. Set the correct permissions:

```bash
sudo chmod 600 /opt/swap
```

3. Set up the swap space:

```bash
sudo mkswap /opt/swap
```

4. Enable the swap file:

```bash
sudo swapon /opt/swap
```

5. Verify that the swap file is active:

```bash
sudo swapon --show
```

6. Make the change permanent by adding the following line to `/etc/fstab`:

```
/opt/swap none swap sw 0 0
```

### **Setup Swap in Arch Linux with Btrfs Using the Btrfs Command to Make a Swap File at `/opt/swaps`**

To set up a swap file on `/opt/swaps` using Btrfs, follow these steps:

1. Create the swap file:

```bash
sudo btrfs filesystem mkswapfile --size 2G --uuid clear /opt/swaps
```

2. Enable the swap file:

```bash
sudo swapon /opt/swaps
```

3. Verify that the swap file is active:

```bash
sudo swapon --show
```

4. Make the change permanent by adding the following line to `/etc/fstab`:

```
/opt/swaps none swap sw 0 0
```

For people who do not have an SSD or are not running a system from a USB flash drive, if you are, then stop using it as it may kill your USB drive faster. But what can I say? I have used a Linux install from my USB drive for 5 years, after which it failed. Your mileage may vary, but if you are using F2FS, trust me, the options in this are on another level. But if you are using a mini USB flash drive which has a very simple controller and does not have features like [wear leveling](https://en.wikipedia.org/wiki/Wear_leveling), then use something else. Something like [YAFFS](https://en.wikipedia.org/wiki/YAFFS) or [UBIFS](https://en.wikipedia.org/wiki/UBIFS) is great. Just have a look at the [flash file system](https://en.wikipedia.org/wiki/Flash_file_system) article on Wikipedia.

But on topic, then use these options and commands in Btrfs will help you a lot:

```bash
btrfs filesystem defragment -r -czstd /
```

**Explanation of the Command:**

- `btrfs filesystem defragment -r -czstd /`: Defragments the filesystem recursively with Zstandard compression.

Also, add this to your `fstab`:

```
autodefrag
```

### **Btrfs Scrub:**

The [Btrfs Wiki Glossary](https://btrfs.wiki.kernel.org/index.php/Glossary) says that Btrfs scrub is "[a]n online file system checking tool. Reads all the data and metadata on the file system and uses checksums and the duplicate copies from RAID storage to identify and repair any corrupt data."

Try to run this per week to check for any errors in Btrfs:

```bash
btrfs scrub start /
```

## Deduplication:

Not only for HDDs, but Btrfs deduplication can also be used.

Using copy-on-write, Btrfs is able to copy files or whole subvolumes without actually copying the data. However, whenever a file is altered, a new proper copy is created. Deduplication takes this a step further by actively identifying blocks of data that share common sequences and combining them into an extent with the same copy-on-write semantics.

Tools dedicated to deduplicating a Btrfs-formatted partition include [duperemove](https://github.com/markfasheh/duperemove) and [bees](https://github.com/Zygo/bees). One may also want to merely deduplicate data on a file-based level instead, using tools like `rmlint`, `rdfind`, `jdupes`, or `dduper`. For an overview of available features of those programs and additional information, have a look at the [upstream Wiki entry](https://btrfs.wiki.kernel.org/index.php/Deduplication).

### **Difference Between Bees and Duperemove:**

- **Bees** is a block-oriented userspace deduplication agent designed to scale up to large Btrfs filesystems. It is an offline dedupe combined with an incremental data scan capability to minimize the time data spends on disk from write to dedupe.

- **Duperemove** is a simple tool for finding duplicated extents and submitting them for deduplication. When given a list of files, it hashes their contents on an extent-by-extent basis and compares those hashes to each other, finding and categorizing extents that match each other. Optionally, a per-block hash can be applied for further duplication lookup. When given the `-d` option, duperemove will submit those extents for deduplication using the Linux kernel `FIDEDUPRANGE` ioctl.

Duperemove can store the hashes it computes in a 'hashfile'. If given an existing hashfile, duperemove will only compute hashes for those files that have changed since the last run. Thus, you can run duperemove repeatedly on your data as it changes without having to re-checksum unchanged data.

Duperemove can also take input from the `fdupes` program.

See the duperemove man page for further details about running duperemove.

**Deduplication:**

> Going by the definition in the context of filesystems, deduplication is a process of looking up identical data blocks tracked separately and creating a shared logical link while removing one of the copies of the data blocks. This leads to data space savings while increasing metadata consumption.

There are two main deduplication types:

1. **In-band (sometimes also called online)**: All newly written data are considered for deduplication before writing.
2. **Out-of-band (sometimes also called offline)**: Data for deduplication have to be actively looked for and deduplicated by the user application.

Both have their pros and cons. Btrfs implements only the out-of-band type.

Btrfs provides the basic building blocks for deduplication, allowing other tools to choose the strategy and scope of the deduplication. There are multiple tools that take different approaches to deduplication, offer additional features, or make trade-offs. The following table lists tools that are known to be up-to-date, maintained, and widely used.

| Name    | File Based | Block Based | Incremental |
|---------|------------|--------------|-------------|
| BEES    | No         | Yes          | Yes         |
| duperemove | Yes      | No           | Yes         |

**File-Based Deduplication:**

The tool takes a list of files and tries to find duplicates among data only from these files. This is suitable, for example, for files that originated from the same base image or source of a reflinked file. Optionally, the tool could track a database of hashes and allow deduplicating blocks from more files or use that for repeated runs and update the database incrementally.

**Block-Based Deduplication:**

The tool typically scans the filesystem and builds a database of file block hashes, then finds candidate files and deduplicates the ranges. The hash database is kept as an ordinary file and can be scaled according to the needs.

As the files change, the hash database may get out of sync, and the scan has to be done repeatedly.

**Safety of Block Comparison:**

The deduplication inside the filesystem is implemented as an ioctl that takes a source file, destination file, and the range. The blocks from both files are compared for an exact match before merging to the same range (i.e., there’s no hash-based comparison). Pages representing the extents in memory are locked prior to deduplication and prevent concurrent modification by buffered writes or mmapped writes. Blocks are compared byte by byte and not using any hash-based approach, i.e., the existing checksums are not used.

**Limitations, Compatibility:**

Files that are subject to deduplication must have the same status regarding COW, i.e., both regular COW files with checksums, or both NOCOW, or files that are COW but don’t have checksums (NODATASUM attribute is set).

If the deduplication is in progress on any file in the filesystem, the send operation cannot be started as it relies on the extent layout being unchanged.

### General Settings in Arch Linux to Improve Performance:

1. **Enable TRIM for SSDs**: Ensure that TRIM is enabled for your SSD to maintain performance. You can check if TRIM is enabled with:

```bash
sudo fstrim -v /
```

2. **Optimize Swappiness**: Reduce the swappiness value to make the system less aggressive in using swap space. Edit `/etc/sysctl.d/99-sysctl.conf` and add:

```bash
vm.swappiness=10
```

Then apply the changes:

```bash
sudo sysctl --system
```

3. **Use ZRAM**: ZRAM can help improve performance by using compressed RAM as swap space. Install `zramswap`:

```bash
sudo pacman -S zramswap
```

Then enable and start the `zramswap` service:

```bash
sudo systemctl enable zramswap
sudo systemctl start zramswap
```

4. **Optimize I/O Scheduler**: Choose an appropriate I/O scheduler for your storage device. For SSDs, `noop` or `deadline` is recommended. For HDDs, `cfq` is a good choice. You can set the I/O scheduler with:

```bash
echo cfq | sudo tee /sys/block/sda/queue/scheduler
```

5. **Enable Lazytime Mount Option**: Use the `lazytime` mount option to reduce write operations. Edit `/etc/fstab` and add `lazytime` to the mount options for your filesystems.

6. **Optimize Kernel Parameters**: Tune kernel parameters for better performance. Edit `/etc/sysctl.d/99-sysctl.conf` and add:

```bash
net.core.rmem_max=16777216
net.core.wmem_max=16777216
net.ipv4.tcp_rmem=4096 87380 16777216
net.ipv4.tcp_wmem=4096 16384 16777216
net.ipv4.tcp_window_scaling=1
net.ipv4.tcp_timestamps=1
net.ipv4.tcp_sack=1
```

Then apply the changes:

```bash
sudo sysctl --system
```

With some of these options, your own Artix system will be more performant—no guarantees.

These are just a few things, but for more performance information, please look at these resources:

- [Arch Linux: Improve Boot Time Performance](https://www.devroom.io/2024/02/08/arch-linux-improve-boot-time-performance/)
- [Arch Wiki: Improving Performance](https://wiki.archlinux.org/title/Improving_performance)
- [Arch Wiki: Sysctl - Virtual Memory](https://wiki.archlinux.org/title/Sysctl#Virtual_memory)
- [Arch Wiki: Swap - Performance](https://wiki.archlinux.org/title/Swap#Performance)
- [Arch Wiki: Core Dump - Disabling Automatic Core Dumps](https://wiki.archlinux.org/title/Core_dump#Disabling_automatic_core_dumps)
- [Arch Wiki: Improving Performance/Boot Process](https://wiki.archlinux.org/title/Improving_performance/Boot_process)
- [Reddit: Arch Linux Laptop Optimization Guide](https://www.reddit.com/r/archlinux/comments/rz6294/arch_linux_laptop_optimization_guide_for)
- [GitHub Gist: Arch Linux Optimization](https://gist.github.com/dante-robinson/cd620c7283a6cc1fcdd97b2d139b72fa)
