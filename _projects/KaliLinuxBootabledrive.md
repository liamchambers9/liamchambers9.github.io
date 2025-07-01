---
layout: default
title: Building a Live Honeypot in Microsoft Azure
date: 2024-06-03
---
# How to Create a Bootable Kali Linux USB Drive with Persistence

Kali Linux is a powerful distribution packed with security and penetration testing tools. But what if you don’t want to dedicate your whole hard drive to it? This is where a bootable Kali Linux USB drive comes in.

---

## Advantages of a Kali Linux USB Drive

* **Safe Experimentation**: A bootable USB drive runs Kali Linux independently, leaving your existing setup untouched.
* **Portable Cybersecurity Toolkit**: You can carry Kali Linux in your pocket and have it running in a matter of minutes.
* **Customizable**: You are able to roll your own custom Kali Linux ISO image that includes only the security tools you need for specific tasks.
* **Persistent Workflow**: By configuring your Kali USB drive for persistence, you can save downloaded tools, configurations, and even test results across reboots. This significantly enhances productivity.

---

## What You Will Need

* A verified copy of the latest Kali Linux "Live Boot" ISO image.
* The free software, **Rufus**.
* A USB thumb drive, 4GB or larger (8GB+ recommended for persistence).

---

## Part 1: Downloading the ISO Image

1.  Go to the [Kali Linux official site](https://www.kali.org/).
2.  Select the **“Get KALI”** tab at the top.
3.  Scroll down to the **“Live Boot”** option.
4.  Download the most recent 64-bit image available (e.g., Kali 2024.1).

## Part 2: Downloading Rufus

Now we will need to make the drive bootable from the ISO image we just downloaded. Rufus is a free, open-source tool that will allow us to do so.

1.  Go to the [official Rufus site](https://rufus.ie/en/) and download the latest version.

---

## Part 3: Creating the Bootable Kali USB Drive

1.  Plug your USB drive into an available USB port on your Windows machine.
2.  Open **Rufus**. Under **“Device”**, select your USB drive from the dropdown list.
3.  Under **“Boot Selection"**, click **SELECT** and choose the Kali Linux ISO file you downloaded.
4.  Under **“Persistent partition size”**, use the slider to choose how much storage you would like to dedicate to persistence. This will vary depending on the size of your USB drive and your needs.
5.  Select the **START** button once ready.

> **Warning:** You will get a prompt stating that all data on the USB drive will be destroyed. Select “OK” to proceed.

Be prepared for this installation to take around 15 minutes to complete.

---

## Part 4: Rebooting into the BIOS

Now every machine is a little different, so the exact steps will be unique to your computer.

1.  We need to reboot the computer into the **BIOS** or **UEFI** settings. I recommend searching online for the specific key combination required for your computer model (common keys are `F2`, `F10`, `F12`, or `DEL`).
2.  Once in the BIOS, find the **Boot Priority** or **Boot Order** menu. Set the USB flash drive as the first priority, before the main Windows drive.
3.  Next, find the **Secure Boot** option (often under a "Security" or "Boot" tab) and **Disable** that feature.
4.  Save your changes and exit the BIOS. Your computer should now boot from the USB drive into the Kali Linux startup menu.

When you get to the screen below, make sure to select **“Live system (encrypted persistence)”**. This allows for the preservation of your data on the Kali Live USB drive across reboots.

*(Image by Kali.org)*

There you have it! I hope this tutorial was helpful. Make sure to use Kali Linux responsibly and ethically.
