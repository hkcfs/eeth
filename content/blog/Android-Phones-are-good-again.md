---
author: "hkcfs"
date: '2024-12-03'
title: 'Android Phones Are Good Again'
tags:
  - android
  - mtkclient
  - bootloader
---

Recently, I came across [MTKCLIENT](https://github.com/bkerler/mtkclient), a fascinating reverse engineering project that aims to hack MediaTek SOCs at a low level. It provides direct access to a device's memory, enabling you to edit partitions, memory, and other critical aspects of the device. The project uses clever exploits within the SOC itself to achieve this.

MTKCLIENT works perfectly with older MediaTek processors, but when it comes to newer chips (like the 70, 80, and 90 series), it starts to struggle. These newer chips use a completely new protocol called **v6**, which is still less understood and developed compared to the older **v5** protocol.

## Why, you may ask?

Well, here's the thing: phone manufacturers have decided that letting users install whatever OS they want isn’t **“safe”** anymore. They’ll try to tell you it's for your own protection, especially when it comes to kids or whatever other reasons they come up with to make you believe that restricting your options is the right call.

It wasn’t that long ago—7 or 8 years, maybe—that you could buy any phone, set it up, and unlock the bootloader in 0 days of the purchasing it, take that you with your 7 days restriction. Fast forward to today, and try doing that with a Samsung. Good luck. Unlocking the bootloader on most modern phones is a pain, and with some brands, it’s just flat-out impossible. This whole situation is what led me to discover MTKClient, which is honestly an awesome tool.

Until phone makers fix this problem and let users have more control, I’ll stick to devices that make it easy to unlock the bootloader.

## What's the Deal with V6?

The latest MediaTek processors (such as the 70, 80, and 90 series) have introduced the **v6** protocol, which makes things trickier for those trying to modify the system. Unlike older chips, you can’t just flash these devices in the usual way. The **bootrom** (the code that runs during device startup) is **patched**, so you need to use a special **DA (Download Agent)** file and load it via the `--loader` option. This is essential if you're aiming to modify anything on these newer devices.

In some cases, the **preloader** (the software responsible for booting the device) might be disabled. However, you can work around this by using the **ADB reboot edl** command, which forces the device into **Emergency Download Mode (EDL)**, allowing you to flash or fix the device.

Not all devices are created equally. If your device is **UNFUSED**, you're in luck, as there are no hardware security locks in place. However, if your device has extra security features like **DAA** (Device Authentication Algorithm), **SLA** (Secure Loader Authentication), or **Remote-Auth** (Remote Authentication), things get significantly more complicated. These protocols make it much harder to modify the firmware without specialized tools or knowledge.

Currently, there's no public method to bypass these security measures for devices with DAA, SLA, or Remote-Auth enabled. If you have one of these devices, you're pretty much stuck unless you have access to advanced tools or some obscure communication methods. [Telegram](https://t.me/) you might have never heard it, yeah. telegram is the holy grale of all custom rom bootloader unlock adn what not `say goodbye` to **XDA form** and `say Hello` to Telegram.

For the **typical** user, the MTK GUI should suffice, but when dealing with v6, the command-line (CLI) is your only option.

## Using the MTKCLIENT (v5 devices)

### Requirements

1. **A MediaTek device with an unlocked bootloader** (or one that supports bootloader unlocking).
2. **MTKClient tool** installed on your system.
3. **USB Debugging** enabled on the device.
4. **OEM Unlocking** enabled in Developer Options.

### Step-by-Step Guide to Unlocking the Bootloader

#### 1. **Install MTKClient**
   - First, clone the MTKClient repository:

     ```bash
     git clone https://github.com/bkerler/mtkclient
     cd mtkclient
     pip3 install -r requirements.txt
     pip3 install .
     ```

   - On Linux, ensure that your user is added to the `plugdev` and `dialout` groups:

     ```bash
     sudo usermod -a -G plugdev $USER
     sudo usermod -a -G dialout $USER
     sudo cp mtkclient/Setup/Linux/*.rules /etc/udev/rules.d
     sudo udevadm control -R
     sudo udevadm trigger
     ```

   - On Windows, make sure **UsbDk** and the appropriate **MTK USB drivers** are installed.

---

#### 2. **Boot Your Device into BROM Mode**

To interact with the device at a low level, you must boot it into **BROM (Boot ROM) mode**:

- **For most devices**: Power off the device, then press and hold **Volume Up + Power** or **Volume Down + Power** while connecting it to your computer.
- Once in BROM mode, **release the buttons**. MTKClient should now detect the device.

---

#### 3. **Unlock the Bootloader**

To unlock the bootloader, you need to erase specific partitions and adjust security configurations:

1. **Erase Metadata and User Data**:
   - Unlocking the bootloader may require erasing critical partitions like metadata and user data. Run the following commands:
     ```bash
     python mtk.py e metadata,userdata
     ```

2. **Unlock the Bootloader**:
   - To unlock the bootloader, execute:
     ```bash
     python mtk.py da seccfg unlock
     ```

3. **Reboot the Device**:
   - Finally, reboot your device to apply the changes:
     ```bash
     python mtk.py reset
     ```

---
And like magic you the bootloader is unlock no need to wait for manufacture to give you a code (motorola) or wait weeks to unlock the device no one would do that, Right.

## **Reading the Entire Storage**

Once the bootloader is unlocked, you can begin reading the device's storage, including partitions and full flash dumps.

1. **Read Boot Partition**:
   - Dump the boot partition with:
     ```bash
     python mtk.py r boot boot.bin
     ```

2. **Read Preloader Partition** (if needed):
   - If you need to dump the preloader, use:
     ```bash
     python mtk.py r preloader preloader.bin --parttype=boot1
     ```

3. **Dump Entire Flash**:
   - To dump the entire flash memory (including all partitions), run:
     ```bash
     python mtk.py rf flash.bin
     ```

4. **Read Specific Flash Offsets**:
   - To read specific offsets, use:
     ```bash
     python mtk.py ro 0x128000 0x200000 flash.bin
     ```

5. **Read All Partitions**:
   - To dump all partitions into a folder, use:
     ```bash
     python mtk.py rl out
     ```

---

## **Working with File Systems**

MTKClient also allows you to mount the device's flash memory as a file system and interact with it directly.

1. **Mount Flash as a File System**:
   ```bash
   python mtk.py fs /mnt/mtk
   ```

2. **Browse or Modify Files**:
   - Once mounted, you can browse directories, read files, or even modify them directly on the device.

These are just a few of the things you can do with MTKClient. If you have the right skillset and knowledge, you might even be able to design your own custom payload.
