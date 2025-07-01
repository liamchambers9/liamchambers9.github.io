---
layout: default
title: Building a Live Honeypot in Microsoft Azure
date: 2023-10-16
thumbnail: /assets/RDP.webp
---

# Building a Live Honeypot in Microsoft Azure

In this lab, I will be constructing a honeypot in Microsoft Azure. Simply put, a honeypot in cybersecurity is nothing more than a security mechanism that creates a virtual trap in a controlled and safe environment to lure attackers. We’ll use this intentionally compromised computer system to study how attackers work, examine different threats, and improve security policies.

This lab’s purpose is to learn how to collect honeypot attack log data, query it in a SIEM, and display it in a manner that is understandable. For this particular lab, the attack data will be displayed on a world map by event count and geolocation.

---

## Learning Objectives

* Configuration & Deployment of Azure resources such as virtual machines, Log Analytics Workspaces, and Azure Sentinel.
* Hands-on experience and working knowledge of a SIEM Log Management Tool (Microsoft’s Azure Sentinel).
* Create a Windows 11 Virtual Machine.
* Create a Log Analytics Workspace.
* Activate Microsoft Defender for Cloud.
* Utilize Microsoft Sentinel (SIEM).
* Remote Desktop into Windows 11 Virtual Machine.
* Review Event Viewer.
* Utilization of Kusto Query Language (KQL) to query logs.
* Display attack data on a dashboard with Workbooks (World Map).

### Honeypot Topology:
*(You can embed an image of your topology here if you have one)*

---

## Part 1: Create a Free Microsoft Azure Account

Due to creating an account for my previous lab, I already had an existing Microsoft Azure account. If you still need to set up your account, Microsoft does require you to link your credit card, but they also give you a free credit ($200.00) to use in your virtual environment within the first 30 days.

To create a free account use the following link: [https://azure.microsoft.com/en-us/free](https://azure.microsoft.com/en-us/free)

---

## Part 2: Create a Windows 11 Virtual Machine

1.  Use the Search Menu and search for and select **Virtual Machines** then select **Create > Azure Virtual Machine**.
2.  On the `Create Virtual Machine` screen, enter all the required information on the “Basics” tab.

    * **Instance details**
        * **Name your VM:** `honeypotlab`
        * **Select a recommended region:** `(US) East US`
        * **Availability options:** No infrastructure redundancy required
        * **Security type:** Standard
        * **Image:** `Windows 11 Pro, version 22H2 — x64 Gen2` (free services eligible)
        * **VM Architecture:** x64
        * **Size:** Default is okay (`Standard_B1s -1 vcpu, 1 GiB memory`)

    * **Administrator Account**
        * Create a username and password for the virtual machine.
        > **IMPORTANT NOTE:** These credentials will be used to log into the virtual machine.

    * **Inbound port rules**
        * **Public inbound ports:** Allow RDP (3389)

    * **Licensing**
        * Confirm licensing.

3.  Select **Next : Disks >**. Leave all defaults and select **Next : Networking >**.

4.  On the **Networking** tab:
    * Set **NIC network security group** to **Advanced**.
    * Click **Create new**.
    * A network security group contains security rules that allow or deny network traffic. We need to allow all traffic to our honeypot.
    * Remove the default inbound rule (`1000: default-allow-rdp`) by clicking the three dots.
    * Click **Add an inbound rule**:
        * **Destination port ranges:** `*` (wildcard for anything)
        * **Protocol:** Any
        * **Action:** Allow
        * **Priority:** `100` (a low number means high priority)
        * **Name:** `ALLOW_ALL_INBOUND`

5.  Select **Review + create**.

> Configuring the firewall to allow traffic from anywhere will make the VM easily discoverable by attackers on the internet.

---

## Part 3: Create a Log Analytics Workspace

The Windows Event Viewer logs will be ingested into Log Analytics workspaces in addition to custom logs with geographic data to map attacker locations.

1.  Search for “**Log analytics workspaces**” and select **Create Log Analytics workspace**.
2.  Put it in the same resource group as the VM (`honeypotlab`).
3.  Give it a desired name (e.g., `honeypot-log`).
4.  Use the same region (`East US`).
5.  Select **Review + create**.

---

## Part 4: Configure Microsoft Defender for Cloud

1.  Search for “**Microsoft Defender for Cloud**”.
2.  Scroll down to **Environment settings** > select your subscription name > select your log analytics workspace name (`honeypot-log`).
3.  Under **Settings | Defender Plans**:
    * Cloud Security Posture Management (CSPM): **ON**
    * Servers: **ON**
    * SQL servers on machines: **OFF**
    * Select **Save**.
4.  Under **Settings | Data Collection**:
    * Select “**All Events**”.
    * Select **Save**.

---

## Step 5: Connect Log Analytics Workspace to Virtual Machine

1.  Search for “**Log Analytics workspaces**”.
2.  Select your workspace name (`honeypot-log`) > **Virtual machines** > your virtual machine name (`honeypotlab`).
3.  Click **Connect**.

---

## Step 6: Configure Microsoft Sentinel

1.  Search for “**Microsoft Sentinel**”.
2.  Click **Create Microsoft Sentinel**.
3.  Select your Log Analytics workspace name (`honeypot-log`).
4.  Select “**Add**”.

---

## Part 7: Disable the Firewall in Virtual Machine

1.  Go to **Virtual Machines** and find the honeypot VM (`honeypotlab`).
2.  Copy the **Public IP address**.
3.  Log into the VM via **Remote Desktop Protocol (RDP)** with credentials from Part 2. Accept the certificate warning.
4.  Select “NO” for all "Choose privacy settings for your device".
5.  Select Start and search for `wf.msc` to open **Windows Defender Firewall**.
6.  Select “**Windows Defender Firewall Properties**”.
7.  Turn Firewall State to **OFF** for the Domain, Private, and Public Profiles.
8.  Select **Apply** and **OK**.
9.  From your host machine's command line, ping the VM to make sure it is reachable: `ping -t <VM_IP_ADDRESS>`

---

## Part 8: Scripting the Security Log Exporter

1.  In the VM, open **PowerShell ISE** as an administrator. Set up Microsoft Edge without signing in.
2.  Copy the PowerShell script from **[Josh Madakor's GitHub here](https://github.com/joshmadakor1/Sentinel-Lab/blob/main/Security_Log_Exporter.ps1)**.
3.  Select **New Script** in PowerShell ISE and paste the script.
4.  Save it to the Desktop and give it a name (e.g., `Log_Exporter`).
5.  Make an account with **[IP Geolocation API](https://ipgeolocation.io/)**. This is free for 1,000 API calls per day.
6.  Copy your API key once logged in and paste it into the script on line 2:
    ```powershell
    $API_KEY = "<YOUR_API_KEY_HERE>"
    ```
7.  Select **Save**.
8.  Run the Powershell ISE script (Green play button).

> The script will export failed RDP logon data from the Windows Event Viewer, enrich it with geographic data from the API, and create a new log file at `C:\ProgramData\failed_rdp.log`.

---

## Part 9: Create Custom Log in Log Analytics Workspace

1.  In the VM, open "Run" and type `C:\ProgramData` to open the folder.
2.  Open the file named `failed_rdp.log`, hit `CTRL + A` to select all, and `CTRL + C` to copy.
3.  Open notepad on your **Host PC**, paste the contents, and save it to your desktop as `failed_rdp.log`.
4.  In Azure, go to **Log Analytics Workspaces** > your workspace (`honeypot-log`) > **Custom logs** > **Add custom log**.
5.  **Sample:** Select the sample log you just saved (`failed_rdp.log`) and click **Next**.
6.  **Record delimiter:** Review the sample logs and hit **Next**.
7.  **Collection path:**
    * **Type:** Windows
    * **Path:** `C:\ProgramData\failed_rdp.log`
8.  **Details:**
    * Give the custom log a name: `FAILED_RDP_WITH_GEO`
    * Hit **Next** and then **Create**.

---

## Part 10: Query the Custom Log

1.  In your Log Analytics Workspace (`honeypot-log`), go to **Logs**.
2.  Run a query to see the available data. It may take some time for Azure to sync.
    ```kql
    FAILED_RDP_WITH_GEO_CL
    ```

---

## Part 11: Extract Fields from Custom Log

1.  Right-click any of the log results and select **Extract fields from “FAILED_RDP_WITH_GEO_CL”**.
2.  For each field in the `RawData`, highlight **ONLY** the value (e.g., the IP address, the country name).
3.  Name the **Field Title** appropriately (e.g., `sourcehost_CF`, `country_CF`).
4.  Under **Field Type**, select the correct data type.
5.  Select **Extract**.
6.  Repeat this for ALL available fields in RawData. Once the search results look correct, click **Save extraction**.

> **NOTE:** If a result is not highlighted correctly, select "Modify this highlight" and fix it. You can manage custom fields in `Custom logs > Custom fields`.

---

## Part 12: Map Data in Microsoft Sentinel

1.  Go to **Microsoft Sentinel** > **Workbooks** > **Add workbook**.
2.  Click **Edit** and remove the default widgets.
3.  Click **Add** > **Add query**.
4.  Copy/Paste the following KQL query and run it:
    ```kql
    FAILED_RDP_WITH_GEO_CL
    | summarize event_count=count() by sourcehost_CF, latitude_CF, longitude_CF, country_CF, label_CF, destinationhost_CF
    | where destinationhost_CF != "samplehost"
    | where sourcehost_CF != ""
    ```
5.  Change the **Visualization** dropdown menu to **Map**.
6.  Click **Map Settings** and configure the following:
    * **Layout Settings**
        * **Location info using:** Latitude/Longitude
        * **Latitude:** `latitude_CF`
        * **Longitude:** `longitude_CF`
        * **Size by:** `event_count`
    * **Color Settings**
        * **Coloring Type:** Heatmap
        * **Color by:** `event_count`
        * **Aggregation for color:** Sum of values
        * **Color palette:** Green to Red
    * **Metric Settings**
        * **Metric Label:** `label_CF`
        * **Metric Value:** `event_count`
7.  Select **Apply** and then **Save and Close**. Save the workbook as “Failed RDP World Map”.
8.  Continuously refresh the map to display additional incoming failed RDP attacks.

---

## Part 13: Deprovision Resources (VERY IMPORTANT)

At the end of this lab, your Virtual Machine must be shut down and deleted as the $200.00 credit will eventually run out.

1.  Search for “**Resource groups**” > select the name of your resource group (`honeypotlab`).
2.  Click **Delete resource group**.
3.  Type the name of the resource group (`honeypotlab`) to confirm deletion.
4.  Check the box for `Apply force delete for selected Virtual machines...`.
5.  Select **Delete**.

---

## Special Thanks

Just wanted to give a special thanks to **Josh Madakor** for making such awesome content on YouTube including this lab. Also, a thank you to Josh’s YouTube community for providing the workarounds needed.
