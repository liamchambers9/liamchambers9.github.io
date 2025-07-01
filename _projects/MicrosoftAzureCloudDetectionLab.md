---
layout: default
title: "Microsoft Azure Cloud Detection Lab"
date: 2023-09-17
thumbnail: /assets/AzureDetectionlab.webp # Path to your thumbnail
---

# Building a Microsoft Azure Cloud Detection Lab

As a student studying information assurance and cybersecurity, I find it imperative to start getting experience in **Security Information and Event Management (SIEM)**. This is due to the fact that SIEM is a critical tool in the detection, analysis, and response to security incidents. This article is intended to document my experience of building out a Microsoft Azure Cloud Detection Lab.

This lab was explained by **CyberWox Academy** and was similarly followed along by me. If you are just getting started with your journey in Cybersecurity and interested in building incredible relationships with a great community, I strongly encourage you to [give them a visit](https://cyberwoxacademy.com/).

This lab will cover the following content:
* Create an Azure Resource Group
* Deploy a Windows 10 VM (Virtual Machine)
* Implement Network and Virtual machine Security Best Practices (Just-in-time access)
* Leverage Data Connectors for ingesting data into Microsoft Sentinel (Cloud Native SIEM) for evaluation
* Gain Insight into Windows Security Event Logs
* Fine-tune Windows Security Policies for Enhanced Protection
* Adjust Windows Security Policies
* Harness Kusto Query Language (KQL) for Log Exploration
* Create Custom Analytic Rules to Identify Microsoft Security Incidents

### My Topology: Microsoft Azure Cloud Security & Detection

---

## Acknowledgments

A huge thank you to the original content creator **Charles Quansah @CyberWox Academy**. Please make sure to [make a visit Here](https://cyberwoxacademy.com/).

The Resources used in this article came from the following:
* [Azure Cloud Detection Lab Project - Cyberwox Academy](https://youtu.be/Ttcv75dV-00)
* For troubleshooting/help with this lab, please join our discord server and I'll be glad to help!

---

## Part 1: Creating a free account with Azure

In order to get started in this lab exercise you must make an Azure account. An email address and credit card will be needed for the creation of this account, but otherwise, the process is free.

Here’s the link: [https://azure.microsoft.com/en-us/free/](https://azure.microsoft.com/en-us/free/)

---

## Part 2: Create a Resource Group

Once your Azure account has been created you will find yourself at the Azure Portal. From here, your first task will be to generate a Resource Group. A resource group in Azure is a container for related resources in a solution. You are now able to include either all the resources for the solution or only select resources in a group for easy deployment, management, deletion, or updates. This is what makes a resource group a fundamental component of resource management in Azure.

1.  At the Microsoft Azure Portal search for “**Resource Groups**” in the search bar.
2.  Select “**Create**”.
3.  Fill in the required fields:
    * **Subscription**: Select your Microsoft Azure Subscription
    * **Resource Group**: Give your Resource Group a Name
    * **Region**: Select a region (I recommend leaving it on default)
4.  Then select **Review + Create**.

On the Review + Create screen your Resource group will create a Validation Check. Once it has passed this, select **Create** to finish creating the Resource Group.

---

## Part 3: Create and Deploy a Windows 10 Virtual Machine

1.  At the upper left corner of the screen click the **Portal Menu**.
2.  Select “**Create a resource**”.
3.  Select “**Virtual machine**”.
4.  On the `Create a virtual machine` page fill in the following:
    * **Subscription**: This likely will stay default assuming you only have 1 subscription.
    * **Resource Group**: Select the Resource Group you’ve created from Part 2.
    * **Virtual Machine Name**: Give your VM a Name.
    * **Region**: Select a region (I recommend leaving it on default).
    * **Availability Options**: Leave Default.
    * **Availability Zone**: Leave Default.
    * **Security Type**: Leave Default.
    * **Image**: `Windows 10 Pro, version 22H2 — x64 Gen2` (free services eligible). (At the time of documentation 22H2 is the option, but this will change as Microsoft Releases newer patches of Windows 10).
    * **VM architecture**: Default.
    * **Run with Azure Spot Discount**: Leave unchecked.
    * **Size**: `Standard D2s v3 2 VCPUs 8GiB Memory` (Default).
    * **Username**: Create a username to use to log into this virtual machine.
    * **Password**: Create a password to use to log into this virtual machine.
    * **Public inbound ports**: `Allow Selected Ports` (Default).
    * **Select inbound ports**: `RDP 3389` (Default).
    * **Licensing**: Check the Box.
5.  Select **Review + Create**.

> ***Note:*** *If you wish to review all the remaining tabs please feel free to do so, but otherwise they can stay on the default settings.*

On the `Review + Create` Screen wait for the Validation to pass and then select **Create**. Your Virtual Machine is now being created. This process will likely take just a few moments to complete.

---

## Part 4: Network Security

Taking a look at the virtual machine we’ve just created, we can see valuable information such as the Resource group, Public IP address (which will be important when we connect to the virtual machine), and other key specifications about the machine.

If we click on the “**Networking Tab**” we will be able to see the Inbound port rules. Looking at the first rule RDP for port 3389 we can see that this connection will allow any RDP port into the virtual machine, which can be quite dangerous. With this virtual machine being out on the internet it makes this VM an attractive candidate for someone to scan and obtain the IP address leading to various attacks such as password spraying and brute-force types of attacks.

In order to mitigate this vulnerability we will be using **Microsoft Defender for Cloud**.

1.  From the search bar type `Microsoft Defender for Cloud`.
2.  Select your Subscription.
3.  Select **Upgrade**.

Once Upgrade is clicked a notification should appear indicating that the deployment of Microsoft Defender for Cloud has been Deployed Successfully (The notification may take a minute).

Next, you will arrive at the `Microsoft Defender for Cloud | Getting Started` screen. Select **Enable All Plans**. Then select **save**.

---

## Part 5: Using Just-In-Time Access

Let's check out the coverage that Microsoft Defender for Cloud gives us.

1.  From the sidebar scroll to the Cloud Security section.
2.  Select “**workload protections**”.

Workload protections give us a glance at our overall security posture. This allows us to gain a bird's-eye-view of what installs are covered, what installs are not covered, and compliance that is being met.

Okay, so we have a bird's-eye-view of our virtual machine’s security. Now we have to make sure that this virtual machine can enable authorized users only when it’s needed. Microsoft Defender for Cloud helps us with that by allowing **just-in-time (JIT) access** for Azure VMs. Just-in-time permits access only when it’s required, through designated ports, and for a restricted duration which helps prevent vulnerabilities associated with permanent firewall rules.

Now enable just-in-time (JIT) access to our virtual machine:

1.  Select the “**Search Bar**” and search for `virtual machines`.
2.  Select the virtual machine you’ve created.
3.  Select “**Connect**”.
4.  Select `Configure for this port`.
5.  Select “**Configure**”.

Shortly after, a notification should come on the screen saying “Just-in-time policy successfully configured”.

Now If we come back to the networking tab on our virtual machine the inbound port rules look a little different than before. Notice that “**Microsoft Defender For Cloud**” is now listed at port 3389. Now due to rule priority, RDP traffic is allowed for a certain amount of time only from the IP of your computer via port 3389.

Now it’s time to connect the just-in-time access to port 3389.

1.  Select “**Connect**”.
2.  Select “**Request access**”.
3.  Set the source IP to the “**Local machine IP**” option.
4.  Select “**Request access**”.

Shortly after “Request access” is selected you will get a confirmation notification that says “Request approved”.

As you can see the inbound port rules have once more been updated. This new Microsoft Defender JIT rule will allow traffic from only my IP to the virtual machine.

---

## Part 6: Log Analytics Workspace

When managing Log Data within Azure, it is essential to have a designated location for storing and processing this information. The **Log Analytics workspace** serves as the central repository for gathering and retaining log data originating from various Azure Resources.

1.  Search for `Log Analytics Workspaces`.
2.  Select “**Create Log Analytics Workspace**”.
3.  On the `Create Log Analytics Workspace Basics` section fill in the following:
    * **Subscription**: Default
    * **Resource Group**: Select the resource group created from Part 2
    * **Name**: Give a name to your Log Analytics Workspace
    * **Region**: Select a region (I recommend leaving it on default)
4.  Select **Review + Create**.
5.  Double-check and make sure correct information is given then select “**Create**”.

---

## Part 7: Deploy Microsoft Sentinel

Now that we have Log Analytics Workplace to act as the data repository and collection point, we can take advantage of **Microsoft Sentinel** which can leverage the data stored in Log Analytics Workspace to provide advanced security analytics, threat detection, and incident response capabilities. These two working together can form a very powerful security monitoring and management solution for Azure and hybrid environments.

1.  From the Home Screen search for “**Microsoft Sentinel**”.
2.  Select “**Create Microsoft Sentinel**”.
3.  Select the Log Analytics Workspace that you’ve previously created.
4.  Select “**Add**”.

To know Microsoft Sentinel has been added successfully you will receive the notification “Successfully added Microsoft Sentinel”.

---

## Part 8: Installing Data connectors for Microsoft Sentinel

Now we’ll need to install data connectors for Microsoft Sentinel. Data connectors are essentially pre-built custom configurations that enable the platform to ingest data from various sources. They’ll play a role in collecting security-related data for analysis and detection.

1.  From the Microsoft Sentinel screen select “**Data Connectors**” (Bottom left under configuration).
2.  Select “**More content at Content hub**”.
3.  Search for `Windows Security Events`.
4.  Select `Windows Security Events`.
5.  Select **Install**.
6.  Once installed you will receive a notification saying “1 item successfully installed”.
7.  Select “**Manage**”.
8.  Select “**Windows Security Events via AMA**”.
9.  Select “**Open connector Page**”.
10. Select “**+Create data collection rule**”.
11. **Rule name**: Give your Data collection a name.
12. **Subscription**: Use the subscription account you’ve been using.
13. **Resource Group**: Your project name.
14. Select: “**Next: Resources >**”.
15. Select “**Add resources**”.
16. Select the Resource Group that was created in Part 2 then select “**Apply**”.
17. Select **Next: “Collect”**.
18. Leave the setting Default then select **“Next: Review + Create”**.
19. Once your Data Collection Rule passes validation select “**Create**”.

You have now successfully created the Data Collection Rule.

---

## Part 9: Virtual Machine Setup via RDP

We now need to start the Virtual Machine.

1.  Search `virtual machine`.
2.  Select “**Start**”.
3.  Select the “**Connect**” tab.
4.  Find the Public IP Address for your Virtual Machine and take note of your IP Address (Or copy to your clipboard).
5.  Select “**Request access**”.
6.  Under **Source IP** make sure the “**Local Machine**” is selected.
7.  Select “**Request access**”.

> ***Note:*** *If you have not set RDP to Just-In-Time access to your local machine make sure to do it at this point or your connection to the Virtual machine may fail.*

You should get a notification stating “Request approved”.

Next we will remote into our Virtual Machine. On a Windows Device in the search bar search for “**Remote Desktop Connection**” and launch the Application. Once Remote Desktop Connection has launched enter your IP Address in the Computer Field then select connect. Follow the on screen prompts to enter your credentials that you set in Part 3 of this guide. Once you have successfully connected you will land on the Windows Desktop of your Virtual Machine.

> ***Note:*** *I had a bit of an issue getting my password to work although I was typing it correctly during this process. My work-around for this issue was to put in my Administrator account username first (although it's not required) then try to log in with the password.*

1.  Once connected from the Start Menu Search for & Launch **Event Viewer**.
2.  Select **Windows Logs > Security**.
3.  Each one of the `Audit Success` logs that you see represents a security event that is going on on the Virtual Machine.
4.  Use the Find Option and search for event `4624`.

> ***Note:*** *Every security event corresponds to a specific security ID, so in this case you can see **Security Event 4624** is the event of “An account was successfully logged in.” If you review the **General information** tab you are going to find quite a bit of detail regarding who logged in, what time they logged in, as well as many other details that can be helpful during investigation.*

This is where Security information and event management (SIEM) can play a heavy role. Instead of having to come into this Virtual Machine and pull this information from Windows Event Viewer, we are able to view this information straight from our SIEM.

If you would like to learn about other interesting Event ID Codes they can be found on Microsoft’s Website here: [https://learn.microsoft.com/en-us/windows/security/threat-protection/auditing/basic-audit-logon-events](https://learn.microsoft.com/en-us/windows/security/threat-protection/auditing/basic-audit-logon-events)

Now if we head back over to Microsoft Sentinel we can actually see that there has been some activity on the virtual machine (activity was generated by us).

---

## Part 10: Using KQL Search Language To Track Logs

We will now use the query language known as **Kusto Query Language (KQL)**. KQL was developed by Microsoft for querying and analyzing data. In this section we will be using Kusto Query Language in Azure SIEM to search for our event logs. If you’d like to learn more detailed information about KQL can be found here: [https://learn.microsoft.com/en-us/azure/data-explorer/kusto/query/](https://learn.microsoft.com/en-us/azure/data-explorer/kusto/query/)

1.  From the menu on the left of Microsoft Sentinel select “**Logs**”.
2.  On the Welcome Screen select the “**X**” in the upper right Corner.
3.  In the “*Type your query here or click one of the queries to start*” type the following command into the query box then select the “**Run**” button right above.

```kql
SecurityEvent
| where EventID == 4624
