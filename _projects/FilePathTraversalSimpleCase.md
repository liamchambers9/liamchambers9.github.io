---
layout: default
title: File Path Traversal - Simple Case 
date: 2025-06-14
---

# Automating a Path Traversal Exploit with Python

In this writeup, I will be exploring a vulnerability known as **Path Traversal**, which is also commonly known as directory traversal. Simply put, a path traversal attack happens when an attacker can read and potentially even write to the server that is running the application. This means that an attacker could gain access to application code and data, credentials for back-end systems, and access to sensitive operating system files.

In many cases, an attacker can write to arbitrary files on a server, allowing them to modify application data or behavior, and ultimately take full control of the server.

*(Image by: Wallarm.com)*

While exploring this vulnerability, I wrote a Python script that works as an automated exploit for a File Path/Directory Traversal vulnerability. I’ll first start by explaining the script, then move into the actual code of the script, then break it down piece by piece.

---

## The Vulnerability Explained

Let's say in a given scenario a website lets you view images with a URL like this:

> `https://example.com/image?filename=cat.jpg`

The server’s code takes the filename (`cat.jpg`) and reads it from a directory like `/var/www/images/`. So, it’s actually reading `/var/www/images/cat.jpg`.

A **File Path Traversal** vulnerability exists if the server doesn’t properly sanitize the filename input. An attacker can manipulate the filename to “traverse” up the directory tree and access files outside of the internal images folder.

This python script attempts to do exactly that. Instead of a valid image name, it uses a sequence of `../` to move up from the web directory to the root directory (`/`) of the server’s file system. From there, it tries to read the common system file `/etc/passwd`.

---

## Breaking Down the Script

### Hack Steps:
1.  Inject a payload into the `filename` query parameter to retrieve the content of `/etc/passwd`.
2.  Extract the first line as proof of concept.

### Imports
The script begins by importing three necessary Python libraries:
* **`requests`**: This is the core tool used for making HTTP requests to communicate with the lab server.
* **`colorama`**: A library used to add colored text to the terminal output for better readability.
* **`re`**: The standard Python library for Regular Expressions, which are used for advanced pattern matching to parse the server’s response.

### Global Variable
A global variable `LAB_URL` is defined to store the unique URL for the PortSwigger lab instance. This must be updated by the user for the script to work on their specific lab.

### The `main()` Function
This is where the primary logic of the script resides. It starts by printing status messages to the user, indicating the injection parameter and the first step of the attack.

### The Attack Payload
The heart of the exploit is the `payload` variable, which is set to `../../../../../../etc/passwd`.
* **`../`**: This command-line symbol means “go up one directory level.”
* **`../../../../../../`**: By repeating this many times, the script tries to ensure it climbs all the way out of whatever web directory it’s in until it reaches the root directory (`/`).
* **`/etc/passwd`**: Once at the root, it specifies the path to this target file. `/etc/passwd` is a standard file on Linux systems that contains a list of users, making it a classic target for proving a successful path traversal.

### Making the Malicious Request
Using a `try...except` block for error handling, the script constructs the final malicious URL and sends an HTTP GET request to the server. The f-string format is used to combine the `LAB_URL` with the vulnerable endpoint `/image?filename=` and the payload.

### Parsing the Response
If the request is successful, the script processes the data received from the server.
* It accesses the raw text of the server’s response, which, if the attack worked, is the content of the `/etc/passwd` file.
* It then uses a regular expression (`re.findall`) to find and extract all lines from the text.
* Finally, it takes the first item from the list of matches, which corresponds to the first line of the `/etc/passwd` file (usually the line for the `root` user).

The script then prints this extracted first line as proof of success and lets the user know the lab should be solved.

### Script Execution
A standard Python construct, `if __name__ == "__main__":`, ensures that the `main()` function is called only when the script is executed directly from the command line.

---

This lab was very helpful in giving me a more solid understanding of the Path Traversal vulnerability and using a Python script to automate a potential attack process.

You can find the full, ready-to-run Python script **[here on my GitHub]((https://github.com/liamchambers9/websecurity-writeups/blob/main/Path%20traversal/File%20path%20traversal%2C%20simple%20case/main.py))**.
