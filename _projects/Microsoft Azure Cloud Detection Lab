---
layout: default
title: "A Really Cool App I Built"
date: 2023-09-17
thumbnail: /assets/cool-app-thumb.png # Path to your thumbnail
---

As a student studying information assurance and cybersecurity, I find it imperative to start getting experience in Security Information and Event Management (SIEM). This is due to the fact that SIEM is a critical tool in the detection, analysis, and response to security incidents. This article is intended to document my experience of building out a Microsoft Azure Cloud Detection Lab. Before we get started this lab was explained by CyberWox Academy and was similarly followed along by me. If you are just getting started with your journey in Cybersecurity and interested in building incredible relationships with a great community I strongly encourage you to give them a visit.

This lab will cover the following content:

Create an Azure Resource Group

Deploy a Windows 10 VM (Virtual Machine)

Implement Network and Virtual machine Security Best Practices (Just-in-time access)

Leverage Data Connectors for ingesting data into Microsoft sentinel (Cloud Native SIEM) for evaluation

Gain Insight into Windows Security Event Logs

Fine-tune Windows Security Policies for Enhanced Protection

Adjust Windows Security Policies

Harness Kusto Query Language (KQL) for Log Exploration

Create Custom Analytic Rules to Identify Microsoft Security Incidents

My Topology: Microsoft Azure Cloud Security & Detection

Acknowledgments
A huge thank you to the original content creator Charles Quansah @CyberWox Academy. Please make sure to make a visit Here

The Resources used in this article came from the following:

Azure Cloud Detection Lab Project - Cyberwox Academy

For troubleshooting/help with this lab, please join our discord server and I'll be glad to help! Many security…

Part 1: Creating a free account with Azure
In order to get started in this lab exercise you must make an Azure account. An email address and credit card will be needed for the creation of this account, but otherwise, the process is free.

Here’s the link: https://azure.microsoft.com/en-us/free/

Part 2: Create a Resource Group
Once your Azure account has been created you will find yourself at the Azure Portal, from here your first task will be to generate a Resource Group. A resource group in Azure is a container for related resources in a solution. You are now able to include either all the resources for the solution or only select resources in a group for easy deployment, management, deletion, or updates. This is what makes a resource group a fundamental component of resource management in Azure.

At the Microsoft Azure Portal search for “Resource Groups” in the search bar

Select “Create”

Fill in the required fields:

Subscription: Select your Microsoft Azure Subscription

Resource: Group: Give your Resource Group a Name

Region: Select a region (I recommend leaving it on default)

Then select Review + Create

On the Review + Create screen your Resource group will create a Validation Check. Once it has passed this, select Create to finish creating the Resource Group.

Part 3: Create and Deploy a Windows 10 Virtual Machine
At the upper left corner of the screen click the Portal Menu

Select “Create a resource”

Select “Virtual machine”

On the Create a virtual machine page fill in the following:

Subscription: This likely will stay default assuming you only have 1 subscription

Resource Group: Select the Resource Group you’ve created from Part 2.

Virtual Machine Name: Give your VM a Name

Region: Select a region: (I recommend leaving it on default)

Availability Options: Leave Default

Availability Zone: Leave Default

Security Type: Leave Default

Image: Windows 10 Pro, version 22H2 — x64 Gen2 (free services eligible). (At the time of documentation 22H2 is the option, but this will change as Microsoft Releases newer patches of Windows 10)

VM architecture: Default

Run with Azure Spot Discount: Leave unchecked

Size: Standard D2s v3 2 VCPUs 8GiB Memory (Default)

Username: Create a username to use to log into this virtual machine

Password: Create a password to use to log into this virtual machine

Public inbound ports: Allow Selected Ports (Default)

Select inbound ports: RDP 3389 (Default)

Licensing: Check the Box

Select Review + Create

*Note if you wish to review all the remaining tabs please feel free to do so, but otherwise they can stay on the default settings.

On the Review + Create Screen wait for the Validation to pass and then select Create.

Your Virtual Machine is now being created. This process will likely take just a few moments to complete.

Part 4: Network Security
Taking a look at the virtual machine we’ve just created, we can see valuable information such as the Resource group, Public IP address (which will be important when we connect to the virtual machine), and other key specifications about the machine.

If we click on the “Networking Tab” we will be able to see the Inbound port rules. Looking at the first rule RDP for port 3389 we can see that this connection will allow any RDP port into the virtual machine, this can be quite dangerous. With this virtual machine being out on the internet it makes this VM an attractive candidate for someone to scan and obtain the IP address leading to various attacks such as password spraying and brute-force types of attacks.

In order to mitigate this vulnerability we will be using Microsoft Defender for Cloud

From the search bar type Microsoft Defender for Cloud

Select your Subscription

Select Upgrade

Once Upgrade is clicked a notification should appear indicating that the deployment of Microsoft Defender for Cloud has been Deployed Successfully (The notification may take a minute).

Next, you will arrive at the Microsoft Defender for Cloud | Getting Started screen. Select Enable All Plans.

Select save

Part 5: Using Just-In-Time Access
Let's checkout the coverage that Microsoft Defender for Cloud gives us.

From the sidebar scroll to the Cloud Security section

Select “workload protections”

Workload protections give us a glance at our overall security posture. This allows us to gain a bird's-eye-view of what installs are covered, what installs are not covered, and compliance that is being met.

Okay, so we have a bird's-eye-view of our virtual machine’s security. Now we have to make sure that this virtual machine can enable authorized users only when it’s needed, Microsoft Defender for Cloud helps us with that by allowing just-in-time (JIT) access for Azure VMs. Just-in-time permits access only when it’s required, through designated ports, and for a restricted duration which helps prevent vulnerabilities associated with permanent firewall rules.

Now enable just-in-time (JIT) access to our virtual machine

Select the “Search Bar” and search for virtual machines

Select the virtual machine you’ve created

Select “Connect”

Select Configure for this port

Select “Configure”

Shortly after a notification should come on the screen saying “Just-in-time policy successfully configured”.

Now If we come back to the networking tab on our virtual machine the inbound port rules look a little different than before.

Notice that “Microsoft Defender For Cloud” is now listed at port 3389. Now due to rule priority, RDP traffic is allowed for a certain amount of time only from the IP of your computer via port 3389.

Now it’s time to connect the just-in-time access to port 3389.

Select “Connect”

Select “Request access”

Set the source IP to the “Local machine IP” option

Select “Request access”

Shortly after “Request access” is selected you will get a confirmation notification that says “Request approved”

How about we check the security center rules now

As you can see the inbound port rules have once more been updated. This new Microsoft Defender JIT rule will allow traffic from only my IP to the virtual machine

Part 6: Log Analytics Workspace
When managing Log Data within Azure, it is essential to have a designated location for storing and processing this information. The Log Analytics workspace serves as the central repository for gathering and retaining log data originating from various Azure Resources.

Search for Log Analytics Workspaces

Select “Create Log Analytics Workspace”

On the Create Log Analytics Workspace Basics section fill in the following:

Subscription: Default

Resource Group: Select the resource group created from Part 2

Name: Give a name to your Log Analytics Workspace

Region: Select a region: (I recommend leaving it on default)

Select Review + Create

Double-check and make sure correct information is given then select “Create”

Part 7: Deploy Microsoft Sentinel
Now that we have Log Analytics Workplace to act as the data repository and collection point, We can take advantage of Microsoft Sentinel which can leverage the data stored in Log Analytics Workspace to provide advanced security analytics, threat detection, and incident response capabilities. These two working together can form a very powerful security monitoring and management solution for Azure and hybrid environments.

From the Home Screen search for “Microsoft Sentinel”

Select “Create Microsoft Sentinel”

Select the Log Analytics Workspace that you’ve previously created.

Select “Add”

To know Microsoft Sentinel has been added successfully you will receive the notification “Successfully added Microsoft Sentinel”

Part 8: Installing Data connectors for Microsoft Sentinel
Now we’ll need to install data connectors for Microsoft Sentinel. Data connectors are essentially pre-built custom configurations that enable the platform to ingest data from various sources. They’ll pay a role in collecting security-related data for analysis and detection.

From the Microsoft Sentinel screen select “Data Connectors” (Bottom left under configuration)

Select “More content at Content hub”

Search for Windows Security Events

Select Windows Security Events

Select Install

Once installed you will receive a notification saying “1 item successfully installed”

Select “Manage”

Select “Windows Security Events via AMA”

Select “Open connector Page”

Select “+Create data collection rule”

Rule name: Give your Data collection a name

Subscription: Use the subscription account you’ve been using

Resource Group: Your project name

Select: “Next: Resources >”

Select “Add resources”

Select the Resource Group that was created in Part 2 then select “Apply”

Select Next: “Collect”

Leave the setting Default then select “Next: Review + Create”

Once your Data Collection Rule passes validation select “Create”

You have now successfully created the Data Collection Rule

Part 9: Virtual Machine Setup via RDP
We now need to start the Virtual Machine

Search virtual machine

Select “Start”

Select the “Connect” tab

Find the Public IP Address for your Virtual Machine and take note of your IP Address (Or copy to your clipboard)

Select “Request access”

Under Source IP make sure the “Local Machine” is selected

Select “Request access”

*Note: If you have not set RDP to Just-In-Time access to your local machine make sure to do it at this point or your connection to the Virtual machine may fail.

You should get a notification stating “Request approved”

Next we will remote into our Virtual Machine. On a Windows Device in the search bar search for “Remote Desktop Connection” and launch the Application. Once Remote Desktop Connection has launched enter your IP Address in the Computer Field then select connect. Follow the on screen prompts to enter your credentials that you set in Part 3 of this guide. Once you have successfully connected you will land on the Windows Desktop of your Virtual Machine.

*Note: I had a bit of an issue getting my password to work although I was typing it correctly during this process. My work-around for this issue was to put in my Administrator account username first (although it's not required) then try to log in with the password.

Once connected from the Start Menu Search for & Launch Event Viewer

Select Windows Logs > Security

Each one of the Audit Success logs that you see represents a security event that is going on on the Virtual Machine

Use the Find Option and search for event 4624

*Note: Every security event corresponds to a specific security ID, so in this case you can see Security Event 4624 is the event of “An account was successfully logged in.” If you review the General information tab you are going to find quite a bit of detail regarding who logged in, what time they logged in, as well as many other details that can be helpful during investigation.

This is where Security information and event management (SIEM) can play a heavy role. Instead of having to come into this Virtual Machine and pull this information from Windows Event Viewer, we are able to view this information straight from our SIEM.

If you would like to learn about other interesting Event ID Codes they can be found on Microsoft’s Website here: https://learn.microsoft.com/en-us/windows/security/threat-protection/auditing/basic-audit-logon-events

Now if we head back over to Microsoft Sentinel we can actually see that there has been some activity on the virtual machine. (activity was generated by us)

Part 10: Using KQL Search Language To Track Logs
We will now use the query language known as Kusto Query Language (KQL). KQL was developed by Microsoft for querying and analyzing data. In this section we will be using Kusto Query Language in Azure SIEM to search for our event logs. If you’d like to learn more detailed information about KQL can be found here: https://learn.microsoft.com/en-us/azure/data-explorer/kusto/query/

From the menu on the left of Microsoft Sentinel select “Logs”

On the Welcome Screen select the “X: in the upper right Corner.

In the “Type your query here or click one of the queries to start” type the following command into the query box then select the “Run” button right above.

SecurityEvent
| where EventID == 4624
This query is essentially searching for logs from the security event table on our virtual machine and we want any log associated with 4624 (which is the successful login log) to show up

You are also able to filter the results to only show specific columns when we run this query, for example, if we wanted to see the categories of TimeGenerated, Computer, & AccountName the command would look like this.

SecurityEvent
| where EventID == 4624
| project TimeGenerated, Computer, AccountName
Let's run this query again with this additional part.

Now Microsoft Sentinel successfully displays the three categories that we’ve written in the query.

Part 11: Scheduled Local Security Policy Configuration
There are several different ways an environment can be compromised. For this lab, we’ll be looking at our vulnerabilities from a persistence point of view. Particularly how adversaries may abuse task scheduling functionalities to maintain their abusive foothold on our virtual machine/environment. Here’s a source to learn more about Scheduled Task/Job attacks and other various types of techniques that are used in cyber attacks: https://attack.mitre.org/techniques/T1053/

We’re now going to create a mock malicious task. To record this occurrence, we need to perform some extra preparatory tasks on our Virtual Machine. Complete the following steps below.

On your virtual machine select the start menu, search for “Local Security Policy” and launch the application

Select: “Advanced Audit Policy Configuration”

Select: “System Audit Policy Configuration”

Select: “System Audit Policies Configuration”

Select the “Object Access”

Open the “Audit Other Object Access Events”

Make sure that all 3 of the boxes are checked (Configure the following events, Success, Failure). Then select “Apply” and “OK” from the Local Security Policy.

Since we don’t want to cause chaos on our virtual machine, let’s create a mock malicious scheduled task.

On your virtual machine navigate to the start menu and search for Task Scheduler on your Virtual Machine

Open the Application

Select “Create Task”

In the Triggers section select “New…”

Next input your desired time of when you would like this event to happen. Since we want this event to take place soon lets set the time to be around 1–2 minutes from now.

Then press “OK”

Next, Select the Actions Tab then select “New…”

In the “New Action” window we will leave the action on Start a program as the task. Then select the Browse button and navigate to C:\Program Files\Internet Explorer\iexplore.exe

As you can see the “iexporer.exe” has been selected you will return to the New Action screen. Select “OK” to finish building this new action.

Alright, so now that we have successfully set up the scheduled task it is supposedly supposed to launch Internet Explorer. The only thing to do now is wait and see if it works.

Tip: If a lot of time has passed since the scheduled task has passed you may need to adjust the time on when the event will start to a future time so it has time to load.

Part 13: Formulating an Alert Rule
Returning to the Azure Portal, navigate to Microsoft Sentinel

Select “Logs”

We are now going to run a new query this time. Please note these queries were written by the original content creator and I give them all the credit.

Code snippet

SecurityEvent
| where EventID == 4698
| parse EventData with * '<Data Name="SubjectUserName">' User '</Data>' *
| parse EventData with * '<Data Name="TaskName">' NameofSceuduledTask '</Data>' *
| parse EventData with * '<Data Name="ClientProcessId">' ClientProcessID '</Data>' *
| project Computer, TimeGenerated, ClientProcessID, NameofSceuduledTask, User
Let’s look at our new query, we can see we get some specific details that will be helpful when logging an incident. Some of those details would be Computer Name When it happened, What the ClientID Process is, name of the scheduled task, and the username of the account that created the scheduled task. So we know now that our query works as we want it is time to create our rule.

Navigate and select “Analytics”

On the Microsoft Sentinel | Analytics page select Create > Scheduled Query Rule

On the tab “Analytics Rule Wizard General” complete the following

Name your Analytics Rule:

Description:

Severity: Default

Tactics & Techniques: Select Persistence & Scheduled Task/Job (Found under the sub-menu of Persistence)

Select “Next: Set Rule Logic”. This is where we will copy & paste our last query command into the Rule Query section.

Under the Alert Enhancement | Entity Mapping section, we are going to add 4 Entity Mapping entries by selecting “Add New Entity” 4 times. Once you have 4 Entity mappings configure it similarly to the image below

Under Query Scheduling set the following parameters:

Run Query Every 5 Minutes

Lookup Data From the Last 5 Hours

“Incident Settings & Automated Response” are the next two tabs we will leave those in the default settings and then move on to the “Review & Create” Tab. Once your Analytic Rule passes validation select Save.

We’ve now successfully created our Analytic Rule. Let us test it out. Now let’s go back to the Windows 10 Virtual machine and create a new Scheduled Task along with a schedule trigger a couple of minutes after it has been created.

Because the Analytic Rule isn’t waiting for the Scheduled task to trigger off the event we are looking for, The event should instantly show up in our Event Viewer on the Virtual Machine.

Being aware that Microsoft Sentinel will not check back in on this Analytic rule until 5 minutes have passed (since this was the specific criteria we made sure to set). From now on we just need to give Microsoft Sentinel a couple of minutes and then refresh it to see if an automated Alert & Incident has been triggered.

While refreshing the “Microsoft Sentinel | Overview” window we finally can get a view of our incidents.

Now you can select an incident and assign it to yourself. Add notes to the incident and then close out the incident since we know this event is a mock event.

By selecting “Investigate” we can visually see the incident and are able to better track where the incident came from

Part 14: Lab Cleanup Pay attention or….pay
Although we are using a free trial Azure Portal which is free for 30 days and up to $200.00 of credit we do not want to burn all our credit so the best practice is to clean up the lab we’ve created. When I say “Clean up” I really mean delete it. This includes deleting your Virtual Machine, its associated storage, and any other components that may incur charges.

Once again Thank you to Charles Quansah @ CyberWox Academy. Please make sure to give them a visit at https://cyberwoxacademy.com/

The resources utilized in this article were derived from the following:

https://youtu.be/Ttcv75dV-00
