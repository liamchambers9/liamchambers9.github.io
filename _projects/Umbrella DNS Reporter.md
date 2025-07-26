---
layout: default
title: "Umbrella DNS Reporter"
date: 2025-07-25
thumbnail: /assets/dns.jpg # Path to your thumbnail
---

I've recently been interested in gaining hands on expereince working with modern API authentication OAuth 2.0. This summer, I've come across the enterprise-grade security tool Cisco Umbrella and I finally have a weekend to sit down and homelab! 

My goal during this project is to build a custom reporting tool that can programatically pull DNS security logs from the Cisco Umbrella API. 


Key Learning Objectives I'm looking to extract of this lab are 

1. Implementing Modern API authentication (OAuth 2.0) 

2. Handle complex data flows 

3. Managing common API challenges 


I highly encourage anyone looking to gain a better understanding of modern APIs and working with OAuth to follow along. 

It's a known fact, learners get better by actually DOING the thing. By following along with me you will learn: 

- API Setup 
- Authentication 
- Handling Common Pitfalls 
- Data Processing

## Getting Started with the Cisco Umbella API: The Foundation 

# Understanding the API Landscape 

I'm going to break this down in a simple and easy way to undestand. Imagine the internet as a giant filing cabinet, Each file represents a "resource" like a list of users or a security policy. REST (Representational State Transfer) is a set of rules for how to interact with these resources using standard web requests. I like to think of it like standard actions that can be performed on these files. For example, you can: 

- GET: "Get" a file (retrieve information about users)
- POST: "Add" a new file (create a new security policy)
- PUT: "Update" an existing file (modify an existing policy)
- DELETE: "Remove" a file (delete a user from a list)

These requests are made through specific web addresses called "endpoints," like **api.umbrella.com/users** for interacting with user information. 
